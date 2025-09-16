import { useState, useCallback, useEffect } from "react";

let logoutTimer: ReturnType<typeof setTimeout>;

/* ---------------- Types ---------------- */
type LoginFn = (
  uid: string,
  role: number,
  tokens: string,
  email: string,
  expirationDate?: Date
) => void;

interface UseAuthReturn {
  token: string | null;
  login: LoginFn;
  logout: () => void;
  userId: string | null;
  userRole: number | null;
  userEmail: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setRole] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = useCallback<LoginFn>(
    (uid, role, tokens, email, expirationDate) => {
      console.log("Auth hook login called with:", { uid, role, tokens: tokens ? "exists" : "missing", email, expirationDate });
      
      setToken(tokens);
      setUserId(uid);
      setRole(role);
      setUserEmail(email);

      const tokenExpiration =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // default 24h
      setTokenExpirationDate(tokenExpiration);

      localStorage.setItem("userId", uid);
      localStorage.setItem("userRole", String(role));
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", tokens);
      localStorage.setItem("expiration", tokenExpiration.toISOString());
      
      console.log("Auth state and localStorage updated");
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    setUserEmail(null);

    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const uuid = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiration");

    console.log("Auth hook auto-login check:", {
      uuid,
      role,
      email,
      token: token ? "exists" : "missing",
      expiry,
      isExpired: expiry ? new Date(expiry) <= new Date() : "no expiry"
    });

    if (token && expiry && new Date(expiry) > new Date()) {
      console.log("Auto-login triggered");
      login(uuid!, Number(role), token, email!, new Date(expiry));
    } else {
      console.log("Auto-login not triggered - missing token or expired");
    }
  }, [login]);

  return { token, login, logout, userId, userRole, userEmail };
};
