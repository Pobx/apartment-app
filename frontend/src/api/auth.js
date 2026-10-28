// Keycloak Authentication Service for Apartment Web SPA

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || '';
const REALM = 'apartment-realm';
const CLIENT_ID = 'apartment-web';

// Helper to decode JWT without external library
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
}

export async function loginWithCredentials(username, password) {
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error_description || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
  }

  const data = await response.json();
  const payload = parseJwt(data.access_token) || {};
  
  const roles = payload.realm_access?.roles || [];
  const user = {
    username: payload.preferred_username || username,
    name: payload.name || (username === 'admin' ? 'ผู้จัดการระบบ' : 'เจ้าหน้าที่ดูแลตึก'),
    email: payload.email || '',
    roles: roles,
    isAdmin: roles.includes('admin') || username === 'admin',
    isStaff: roles.includes('staff') || username === 'staff',
  };

  localStorage.setItem('access_token', data.access_token);
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }
  localStorage.setItem('user_profile', JSON.stringify(user));

  return user;
}

export function getCurrentUser() {
  const token = localStorage.getItem('access_token');
  const userJson = localStorage.getItem('user_profile');
  if (!token || !userJson) {
    return null;
  }
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_profile');
}
