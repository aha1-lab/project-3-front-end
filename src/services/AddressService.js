import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/address`;

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

const addAddress = async (formData) =>{
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

const getAddressDestails = async (itemId) => {
  try {
    const response = await api.get(`/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address details:', error);
    throw error;
  }
};

const deleteAddress = async (itemId) => {
  try {
    await api.delete(`/${itemId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export {
  getAddressDestails,
  deleteAddress,
  getIndex,
  addAddress,
};
