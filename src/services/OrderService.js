import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

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


const getOrders = async()=>{
    try {
        const response = await api.get("/")
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createOrder = async (formData)=>{
    try {
        const response = await api.post(`/`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getOrdersDetails = async(orderId)=>{
    try {
        const response = await api.get(`/order/${orderId}`)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createOrderProduct = async (formData)=>{
    try {
        const response = await api.post(`/orderProduct`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


const getOrderProduct = async (orderId)=>{
    try {
        const response = await api.get(`/orderProduct/${orderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// const updateProductToCart = async (itemInCartId,formData)=>{
//     try {
//         const response = await api.put(`/${itemInCartId}`, formData);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

// const removeFormCart = async (itemId)=>{
//   try {
//       const response = await api.delete(`/${itemId}`);
//       return response.data;
//   } catch (error) {
//       console.log(error);
//       throw error;
//   }
// }

export {
    getOrders,
    createOrder,
    createOrderProduct,
    getOrdersDetails,
    getOrderProduct,
};
