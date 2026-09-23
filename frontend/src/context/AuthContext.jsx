import { createContext, useEffect } from 'react';
import { useState } from 'react';

//eslint-disable-next-line
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const STORAGE_KEY = 'penny-wise.auth';

  function readAuth() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  const [auth, setAuth] = useState(() => readAuth());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      setAuth(readAuth());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const AUTH_EVENT = 'penny-wise.auth-changed';
  //eslint-disable-next-line
  const notifyAuthChanged = () => window.dispatchEvent(new Event(AUTH_EVENT));

  useEffect(() => {
    const resync = () => setAuth(() => readAuth());
    window.addEventListener(AUTH_EVENT, resync);
    return () => window.removeEventListener(AUTH_EVENT, resync);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, readAuth, STORAGE_KEY }}>
      {children}
    </AuthContext.Provider>
  );
};
