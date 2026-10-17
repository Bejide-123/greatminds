"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { isUserInfo, type UserInfo } from "@/lib/auth/user-info";

type UserContextValue = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
  error: string | null;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setCurrentUser] = useState<UserInfo | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userRequestVersion = useRef(0);
  const router = useRouter();

  const setUser = useCallback((nextUser: UserInfo | null) => {
    userRequestVersion.current += 1;
    setCurrentUser(nextUser);
    if (nextUser) setError(null);
  }, []);

  useEffect(() => {
    let active = true;
    const requestVersion = userRequestVersion.current;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load the signed-in user.");
        }

        const result: unknown = await response.json();
        if (
          typeof result !== "object" ||
          result === null ||
          !("user" in result) ||
          (result.user !== null && !isUserInfo(result.user))
        ) {
          throw new Error("The user service returned an invalid response.");
        }

        if (active && requestVersion === userRequestVersion.current) {
          setCurrentUser(result.user);
        }
      } catch (loadError) {
        if (active && requestVersion === userRequestVersion.current) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load the signed-in user."
          );
        }
      }
    }

    void loadUser();
    return () => {
      active = false;
    };
  }, []);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Unable to log out. Please try again.");
      }

      setUser(null);
      router.replace("/auth");
      router.refresh();
    } catch (logoutError) {
      setError(
        logoutError instanceof Error
          ? logoutError.message
          : "Unable to log out. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  }, [router, setUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, isLoggingOut, error }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside a UserProvider.");
  }
  return context;
}
