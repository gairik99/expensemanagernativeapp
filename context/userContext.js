import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    accessToken: "",
    refreshToken: "",
  });

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from AsyncStorage", error);
      }
    };
    loadUser();
  }, []);

  // Save user to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to save user to AsyncStorage", error);
      }
    };
    saveUser();
  }, [user]);

  // Clear user
  const clearUser = async () => {
    try {
      setUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        accessToken: "",
        refreshToken: "",
      });
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to clear user data", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
