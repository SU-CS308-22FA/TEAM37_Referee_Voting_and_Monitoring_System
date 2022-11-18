import axios from "axios";



const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});

export const handleSignin = async (data) => {
  
  const { data: res } = await HTTP.post("/users/signin", data);
  console.log(res);
  sessionStorage.setItem("token", res.token);
  sessionStorage.setItem("user", JSON.stringify(res.user));
   

}
export const handleSignup = async (data) => {

  const { data: res } = await HTTP.post("/users/signup", data);
  console.log(res.message);

}
export const handleEdit = async (data, id) => {    
    
    const { data: res } = await HTTP.put(`/users/${id}`, data);
    console.log(res);
    sessionStorage.setItem("user", JSON.stringify(res.user));
    console.log(res.user);
    
}
export const handleDelete = async (data, id) => {    
  const { data: res } = await HTTP.delete(`/users/${id}`, data);
    console.log(res);
    sessionStorage.setItem("user", JSON.stringify(res.user));
    console.log(res.user);
}
