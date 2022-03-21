import { User } from "@monitor/types";
import { Component, createContext, createResource, Resource, Setter, useContext } from "solid-js";
import { client } from "..";

export type UserState = {
  userResource: Resource<false | User | undefined>;
  user: () => User;
  setUser: Setter<false | User | undefined>;
  logout: () => void;
  username: () => string | undefined;
};

const UserContext = createContext<UserState>();

export const UserProvider: Component = (p) => {
  const [user, { mutate }] = createResource(() => client.getUser());
  const logout = async () => {
    client.logout();
    mutate(false);
  };
  const username = () => {
    if (user()) {
      return (user() as User).username;
    } else {
      return undefined;
    }
  };
  const context: UserState = {
    userResource: user,
    user: () => user() as User,
    setUser: mutate,
    logout,
    username,
  };
  return (
    <UserContext.Provider value={context}>{p.children}</UserContext.Provider>
  );
};

export function useUser(): UserState {
  return useContext(UserContext) as UserState;
}