import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});

export const login = async (formData) =>
  await HTTP.post("/users/signin", formData);

export const register = async (formData) =>
  await HTTP.post("/users/signup", formData);

export const handleEdit = async (formdata, id) => {    
    try {
      const response = await HTTP.put(`/users/${id}`, formdata);
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
}