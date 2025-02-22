import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    // 'x-auth-keyy':"Tocken-123",
    //'API-Key': process.env.DATA_API_KEY, //if it have apiKey
  },
  httpsAgent: new (require("https").Agent)({
    //Disable SSL Verification (Not Recommended for Production):
    rejectUnauthorized: false,
  }),
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (reqest) => {
    return reqest;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
