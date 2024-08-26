"use client";
import React, { createContext, useContext, useState } from "react";

interface User {
  board_games: string[];
  created_at: string;
  email: string;
  id: string;
  premium_user: boolean;
  user_id: string;
}

interface InitialState {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface ContextProps {
  children: React.ReactNode;
}

const initialState: InitialState = {
  user: undefined,
  setUser: () => {},
};

const UserContext = createContext<InitialState>(initialState);

export function UserContextProvider({ children }: ContextProps) {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
