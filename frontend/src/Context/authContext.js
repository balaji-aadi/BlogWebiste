import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))
    // const [post, setPost] = useState([]);

    const login = async (username,password) => {
        const res = await axios.post('http://localhost:5000/api/user/login', {username,password},{withCredentials:true})
        setCurrentUser(res.data);
    }

    const logout = async () => {
        await axios.post('http://localhost:5000/api/user/logout', {}, {withCredentials:true, credentials: "include"})
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}