import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cart`;

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


const getPersonCart = async()=>{
    try {
        const response = await api.get("/")
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addProductToCart = async (formData)=>{
    try {
        const response = await api.post(`/`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updateProductToCart = async (itemInCartId,formData)=>{
    try {
        const response = await api.put(`/${itemInCartId}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const removeFormCart = async (itemId)=>{
  try {
      const response = await api.delete(`/oneItem/${itemId}`);
      return response.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

const removeAllFormCart = async (itemId)=>{
    try {
        const response = await api.delete(`/all`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
export {
  getPersonCart,
  addProductToCart,
  removeFormCart,
  updateProductToCart,
  removeAllFormCart,
};
