import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../lib/api/penny-wise';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then((data) => {
        if (!isMounted) return;
        setAuth(data?.user ? { user: data.user } : null);
      })
      .catch(() => {
        if (isMounted) setAuth(null);
      })
      .finally(() => {
        if (isMounted) setReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = useCallback(async (value) => {
    const user = value?.user ?? value ?? (await getCurrentUser())?.user;

    if (!user) {
      setAuth(null);
      return null;
    }

    setAuth({ user });
    return user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setAuth(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, ready }}>
      {children}
    </AuthContext.Provider>
  );
}
