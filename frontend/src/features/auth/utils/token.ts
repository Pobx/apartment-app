import { AuthUser, KeycloakJwtPayload } from '../types';

export function parseJwt(token: string): KeycloakJwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as KeycloakJwtPayload;
  } catch (e) {
    console.error('Failed to parse JWT token', e);
    return null;
  }
}

export function buildUserFromPayload(
  payload: KeycloakJwtPayload | null,
  fallbackUsername: string
): AuthUser {
  const roles = payload?.realm_access?.roles || [];
  const username = payload?.preferred_username || fallbackUsername;
  const isAdmin = roles.includes('admin') || username === 'admin';
  const isStaff = roles.includes('staff') || username === 'staff';

  return {
    username,
    name:
      payload?.name ||
      (isAdmin ? 'ผู้จัดการระบบ' : isStaff ? 'เจ้าหน้าที่ดูแลตึก' : username),
    email: payload?.email || '',
    roles,
    isAdmin,
    isStaff,
  };
}

export function getStoredUser(): AuthUser | null {
  const token = localStorage.getItem('access_token');
  const userJson = localStorage.getItem('user_profile');
  if (!token || !userJson) return null;
  try {
    return JSON.parse(userJson) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthStorage(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_profile');
}
