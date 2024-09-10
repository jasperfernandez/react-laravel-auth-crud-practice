import { createContext, useEffect, useState } from 'react';

interface IAppContext {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const defaultState = {
  token: null,
  setToken: () => null,
  user: null,
  setUser: () => null,
};

export const AppContext = createContext<IAppContext>(defaultState);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    }
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
