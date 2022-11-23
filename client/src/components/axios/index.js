import axios from "axios";
import jwt_decode from "jwt-decode";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});

export const handleGoogle = async (data) => {
  try {
    var userObject = jwt_decode(data.credential);
    const { data: res } = await HTTP.post("/users/Gsignin", userObject);
    console.log(res);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    window.location = "/";
  } catch (error) {
    console.log(error.message);
  }
};

export const handleSignin = async (data) => {
  const { data: res } = await HTTP.post("/users/signin", data);
  console.log(res);
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));
};

export const handleSignup = async (data) => {
  const { data: res } = await HTTP.post("/users/signup", data);
  console.log(res.message);
};

export const handleEdit = async (data, id) => {
  const { data: res } = await HTTP.put(`/users/${id}`, data);
  console.log(res);
  localStorage.setItem("user", JSON.stringify(res.user));
  console.log(res.user);
};

export const handleDelete = async (data, id) => {
  const { data: res } = await HTTP.delete(`/users/${id}`, data);
  console.log(res);
  localStorage.setItem("user", JSON.stringify(res.user));
  console.log(res.user);
};

export const sendVerifyEmail = async (data) => {
  const { data: res } = await HTTP.post("/users/sendMeMail", data);
  console.log(res.message);
};
