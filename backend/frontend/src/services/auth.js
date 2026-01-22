/**
 * Authentication Service - Manages user authentication state
 */

// Save tokens to localStorage
export const saveAuthTokens = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Clear tokens (logout)
export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Save user info
export const saveUserInfo = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user info
export const getUserInfo = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Clear user info
export const clearUserInfo = () => {
  localStorage.removeItem('user');
};

