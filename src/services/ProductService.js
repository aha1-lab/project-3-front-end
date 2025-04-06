import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

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

const getIndex = async (sort) => {
  try {
    // console.log(sort)
    // const response = await api.get(`${sort}`)
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/products${sort}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const addProduct = async (formData) =>{
  try {
    const response = await api.post(
      BASE_URL,
      formData);
      return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductDetails = async (itemId) => {
  try {
    const response = await api.get(`${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

const deleteProduct = async (itemId) => {
  try {
    await api.delete(`/${itemId}`);
  } catch (error) {
    console.log(error);
  }
};

const updateProductDetails = async (itemId, formData)=>{
  try {
    const response = await api.put(`/${itemId}`,formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}



export {
  getProductDetails,
  deleteProduct,
  getIndex,
  addProduct,
  updateProductDetails,
};
