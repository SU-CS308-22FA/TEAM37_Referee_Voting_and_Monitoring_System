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
export const handledelete = async (formdata, id) => {    
  try {
    const response1 = await HTTP.delete(`/users/${id}`, formdata);
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
export const handleSignin = async (data) => {
  
    const { data: res } = await HTTP.post("/users/signin", data);
    console.log(res);
    sessionStorage.setItem("token", res.data);
    sessionStorage.setItem("user", JSON.stringify(res.user));
    window.location = "/";  
}
export const handleSignup = async (data) => {
  
  const { data: res } = await HTTP.post("/users/signup", data);
  console.log(res.message);
  
}