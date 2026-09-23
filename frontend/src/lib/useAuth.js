import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within "<AuthProvider/>"');
  }
  const { auth, setAuth, readAuth, STORAGE_KEY } = ctx;

  const signIn = useCallback(
    ({ token, user }) => {
      const value = { token, user };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      setAuth(() => readAuth());
    },
    [STORAGE_KEY, setAuth, readAuth],
  );
  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }, [STORAGE_KEY, setAuth]);

  return { auth, ready: true, signIn, signOut };
}
