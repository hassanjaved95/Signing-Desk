import axios from 'axios';
import config from 'Constants/AppConfig';

var axiosObj = axios.create({
   // baseURL: 'http://reactify.theironnetwork.org/data/',
   baseURL: config.apiBaseUrl + '/',
   timeout: 180000
});

var token = '';
var user = JSON.parse(localStorage.getItem('user') || "{}");
if (user) {
   const profile = user.profile;
   if (profile) {
      token = profile.user.token;
   }
}

axiosObj.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axiosObj.interceptors.request.use((config) => {
   console.log('Request config:', config);
   return config;
}, (error) => {
   return Promise.reject(error);
});

axiosObj.interceptors.response.use((config) => {
   console.log('response resceived:', config);
   return config;
}, (error) => {
   return Promise.reject(error);
});

var methods = {
   get: async function (endPoint, data) {
      try {
         return await axiosObj.get(endPoint, {
            params: data
         });
      } catch (error) {
         return error;
      }
   },
   put: async function (endPoint, data) {
      try {
         return await axiosObj.put(endPoint, data);
      } catch (error) {
         return error;
      }

   },
   post: async function (endPoint, data) {
      try {
         var response = await axiosObj.post(endPoint, data);
         console.log("post response: ", response);
         return response;
      } catch (error) {
         console.log("post Error: ", error);

         return error;
      }

   },
   delete: async function (endPoint, data) {
      try {
         return await axiosObj.delete(endPoint, { data });
      } catch (error) {
         return error;
      }
   }
}

export default methods;
