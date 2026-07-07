import { api } from './api';
import { storeToken, getToken, removeToken, storeUser, removeUser, getUser } from './storageService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    await storeToken(token);
    await storeUser(user);
    
    return { token, user };
  },

  async signup(credentials: SignupCredentials) {
    console.log('AuthService: Attempting signup with:', credentials);
    try {
      const response = await api.post('/auth/signup', credentials);
      console.log('AuthService: Signup response:', response.data);
      const { token, user } = response.data;
      
      await storeToken(token);
      await storeUser(user);
      
      return { token, user };
    } catch (error) {
      console.error('AuthService: Signup error:', error);
      throw error;
    }
  },

  async logout() {
    await removeToken();
    await removeUser();
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await getToken();
    return !!token;
  },

  async getCurrentUser() {
    try {
      // First try to get from storage
      const storedUser = await getUser();
      if (!storedUser) return null;

      // Verify with backend
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      // If token is invalid, clear storage
      await this.logout();
      return null;
    }
  }
};