const axios = require("axios");
const api = () => {
  // configure axios instance
    const access_token = process.env.ACCESS_TOKEN;
    const URI = process.env.API_URL;
    let headers = {
        Authorization: "Bearer " + access_token,
    }
    
  axios.defaults = Object.assign(axios.defaults, {
    baseURL: URI,
  });
    
  const _api = axios.create({
    baseURL: URI,
    timeout: 90000,
  });
    

     _api.interceptors.request.use((request) => {
       request.headers.Authorization = `Bearer ${access_token}`;
       return request;
     });

     _api.interceptors.response.use(
       (request) => {
         request.headers.Authorization = `Bearer ${access_token}`;
         return request;
       },
       (error) => {
       
         return Promise.reject(error);
       }
     );

  const getPosts = async (day) =>
    _api.get("posts", {
      params: {
        day: day,
      },
    });

  return {
    getPosts,
  };
};

module.exports = api();
