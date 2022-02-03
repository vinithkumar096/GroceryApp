import { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "uuid";
import { getAllUsers, addUser } from "../helpers/methods";

export const AuthContext = createContext({
    user: null,
    refresh: () => {},
    loading: false,
    error: null,
    login: (email, password) => {},
    register: ({ name, email, password, password2 }) => {},
    logout: () => {},
})

export default function AuthProvider({ children }) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    const login = async (email, password) => {
      if (!email) {
        alert("Email cannot be empty");
        return;
      }
      if (!password) {
        alert("Password cannot be empty");
        return;
      }
      const users = await getAllUsers();
      const authUser = users.filter(user => user.email.toLowerCase() === email.toLowerCase())
      if (authUser.length < 1) {
        alert("No such user!");
        return
      } else if (authUser.length === 1) {
        const user = authUser[0];
        if (user.password !== password){
          alert("Wrong password!")
          return
        }
      }
      setUser(authUser[0]);
      return AsyncStorage.setItem("user", JSON.stringify(user))
    }

    const register = async ({ name, email, password, password2 }) => {
      if (password !== password2) {
        alert("The passwords do not match!");
        return;
      }
      const users = await getAllUsers();
      const authUser = users.filter(user => user.email.toLowerCase() === email.toLowerCase())
      if (authUser.length > 0) {
        alert("User with that email already exists!")
        return
      }
      const data = {
        id: uuid.v4(),
        name,
        email,
        isAdmin: true
      }
      await addUser({...data, password})
      setUser(data)
      return AsyncStorage.setItem("user", JSON.stringify(data))
    }

    const logout = () => {
      setUser(null)
      return AsyncStorage.removeItem("user")
    }

    const load = useCallback(() => {
        setLoading(true);
        AsyncStorage.getItem("user").then(data => {
            if (data){
              setUser(JSON.parse(data));
            }
        }).catch(e => {
            console.log(e);
            setError(e);
        }).finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, refresh: load, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);