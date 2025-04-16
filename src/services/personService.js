import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/persons`;

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getIndex = async () => {
  try {
    const response = await api.get("/")
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addPerson = async (formData) =>{
  try {
    const response = await api.post(
      BASE_URL,
      formData);
      return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPersonDetails = async (userId) => {
  try {
    const response = await api.get(`/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

const getUserDestails = async () => {
  try {
    const response = await api.get(`/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

const updateUserDetails = async (userId, formData) => {
  try {
    const response = await api.put(`/${userId}`,formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};



export {
  getPersonDetails,
  getIndex,
  addPerson,
  getUserDestails,
  updateUserDetails,
};