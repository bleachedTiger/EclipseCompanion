import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [lastDraw, setLastDraw] = useState(0);

  const triggerRefetch = () => setLastDraw((n) => n + 1);

  return (
    <SessionContext.Provider value={{ lastDraw, triggerRefetch }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}