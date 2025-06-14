import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

interface UserData {
  uid: string;
  name: string | null;
  email: string | null;
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  login: async () => {},
  logout: async () => {},
  refreshUserData: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          setUser(firebaseUser);
          await fetchUserData(firebaseUser);
        } else {
          // User is signed out
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        setUserData(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (firebaseUser: User) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          uid: firebaseUser.uid,
          name: data.name || firebaseUser.displayName,
          email: data.email || firebaseUser.email,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
        });
        
        // Update last login time
        await setDoc(userDocRef, {
          ...data,
          lastLoginAt: new Date(),
        }, { merge: true });
      } else {
        // Create new user document
        const newUserData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          createdAt: new Date(),
          lastLoginAt: new Date(),
        };
        
        await setDoc(userDocRef, newUserData);
        setUserData(newUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    // This will be handled by the login screen
    // The auth state change will automatically update the context
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  const value: AuthContextType = {
    user,
    userData,
    isAuthenticated: !!user,
    isLoading,
    isInitialized,
    login,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};