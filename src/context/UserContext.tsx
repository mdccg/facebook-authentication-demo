import { ReactNode, createContext, useEffect, useState } from 'react';

type UserContextType = {
  token: string;
  userName: string;
  profilePicture: string;
  setToken: (token: string) => void;
  setUserName: (userName: string) => void;
  setProfilePicture: (profilePicture: string) => void;
}

const initialValue: UserContextType = {
  token: localStorage.getItem('token') || '',
  userName: localStorage.getItem('userName') || '',
  profilePicture: localStorage.getItem('profilePicture') || '',
  setToken: () => {},
  setUserName: () => {},
  setProfilePicture: () => {}
};

export const UserContext = createContext(initialValue);

type UserContextProviderProps = {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string>(initialValue.token);
  const [userName, setUserName] = useState<string>(initialValue.userName);
  const [profilePicture, setProfilePicture] = useState<string>(initialValue.profilePicture);
  
  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('profilePicture', profilePicture);
  }, [token, userName, profilePicture]);

  return (
    <UserContext.Provider value={{ token, userName, profilePicture, setToken, setUserName, setProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;