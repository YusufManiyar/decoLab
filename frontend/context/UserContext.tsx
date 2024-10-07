import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserData } from '../utils/api'; // Function to fetch user data

interface UserProfile {
  websiteUrl: string;
  industry: string[];
  location: string;
  socialLinks: {
    twitterHandle: string;
    telegram?: string;
    github?: string;
  };
  teamMembers: {
    name: string;
    role: string;
    contactEmail: string;
    linkedin?: string;
  }[];
  additionalInfo: {
    logo?: string;
    bio?: string;
  };
}

interface User {
  email: string;
  name: string;
  profile: UserProfile;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};