export interface AuthUser {
  username: string;
  name: string;
  email: string;
  roles: string[];
  isAdmin: boolean;
  isStaff: boolean;
}

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}

export interface KeycloakJwtPayload {
  preferred_username?: string;
  name?: string;
  email?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: Record<string, { roles: string[] }>;
  exp?: number;
  iat?: number;
}
