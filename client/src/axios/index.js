import axios from "axios";

const HTTP = axios.create({
  baseURL: "https://git.heroku.com/rvms-308.git",
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
export const handledelete = async (formdata, id) => {    
  try {
    const response1 = await HTTP.delete(`/users/${id}`, formdata);
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}