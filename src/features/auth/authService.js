import axios from "axios";
import { API_URL } from "../constants";
// const API_URL = `${import.meta.env.VITE_URL}/api/users/`
// const API_URL = 'http://localhost:8080/api/users/'
// console.log("FROM AUTH", API_URL);

const login = async (userData) => {
   const response = await axios.post(API_URL + "/api/users/login", userData);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }
   return response.data;
};

const register = async (userData) => {
   const response = await axios.post(API_URL + "/api/users/register", userData);
   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }
   return response.data;
};

 const getAllUsers = async (token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(API_URL + "/api/users/get_users", config);
//   console.log(response)
   return response.data;
};

const getCurrentUser = async (token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(API_URL + "/api/users/current_user", config);
   return response.data;
};

const getUserById = async (userId) => {
   try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`);
      // console.log(response)
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.message || 'Failed to fetch user');
   }
};

const logout = () => localStorage.removeItem("user");

const authService = {
   login,
   logout,
   register,
   getAllUsers,
   getCurrentUser,
   getUserById
};

export default authService;
