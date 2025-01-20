import { writable } from 'svelte/store';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export const user = writable<User | null>(null);

// Initialize the auth store from localStorage on page load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const userData = JSON.parse(stored);
      user.set(userData);
    } catch {
      localStorage.removeItem('user');
    }
  }
}

export const auth = {
  login: (username: string, password: string): boolean => {
    try {
      // Demo credentials
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        const userData = { id: '1', username: 'admin', role: 'admin' as const };
        user.set(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  logout: () => {
    try {
      user.set(null);
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  
  checkAuth: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const stored = localStorage.getItem('user');
      if (!stored) return false;

      const userData = JSON.parse(stored);
      if (!userData || !userData.id || !userData.username || !userData.role) {
        localStorage.removeItem('user');
        return false;
      }
      
      user.set(userData);
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('user');
      return false;
    }
  }
};