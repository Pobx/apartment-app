import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthUser, KeycloakTokenResponse } from '../types';
import {
  parseJwt,
  buildUserFromPayload,
  getStoredUser,
  clearAuthStorage,
} from '../utils/token';

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || '';
const REALM = 'apartment-realm';
const CLIENT_ID = 'apartment-web';

export interface LoginParams {
  username: string;
  password: string;
}

export async function loginWithKeycloak({
  username,
  password,
}: LoginParams): Promise<AuthUser> {
  const tokenEndpoint = `${KEYCLOAK_URL}/auth/realms/${REALM}/protocol/openid-connect/token`;

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('client_id', CLIENT_ID);
  body.append('username', username.trim());
  body.append('password', password);

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      error_description?: string;
    };
    throw new Error(
      errorData.error_description || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'
    );
  }

  const data = (await response.json()) as KeycloakTokenResponse;
  const payload = parseJwt(data.access_token);
  const user = buildUserFromPayload(payload, username);

  localStorage.setItem('access_token', data.access_token);
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }
  localStorage.setItem('user_profile', JSON.stringify(user));

  return user;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() =>
    getStoredUser()
  );

  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginWithKeycloak,
    onSuccess: (user) => {
      setCurrentUser(user);
      queryClient.clear();
    },
  });

  const logout = () => {
    clearAuthStorage();
    setCurrentUser(null);
    queryClient.clear();
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as Error | null,
    logout,
  };
}
