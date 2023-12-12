import { useContext, createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
};

export type UserProps = {
  user: User;
  setUser: (user: User) => void;
};

export const UsersContext = createContext<UserProps>({
  user: {} as User,
  setUser: () => {},
});

export const useUsersContext = () => useContext(UsersContext);
