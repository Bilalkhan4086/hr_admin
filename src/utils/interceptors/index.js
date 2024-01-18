import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const setupApiInterceptor = async (urlPath, headers, data = {}, method = 'get') => {
  // Make the API request synchronously (not using await)
  try {
    // Make the API request synchronously (using await)
    const fullUrl = `${BASE_URL}${urlPath}`;
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data,
    });

    console.log('API response:', response.data.data);

    return response.data.data;
  } catch (error) {
    console.log('API error:', error);
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post('/auth/refreshToken', {
            RefreshToken: refreshToken,
          });

          localStorage.setItem('access-token', refreshResponse?.data?.data?.token);

          // Create a new object with updated headers
          const updatedHeaders = {
            ...headers,
            Authorization: `Bearer ${refreshResponse?.data?.data?.token}`,
          };

          // Recursive call to setupApiInterceptor with updated headers
          return setupApiInterceptor(url, updatedHeaders, data, method);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          throw refreshError;
        }
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export default setupApiInterceptor;
