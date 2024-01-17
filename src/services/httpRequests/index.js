import axios from 'axios';

// const usersURL = 'https://api.enxsis.com/api/v1/users';

// export default async function UserData() {
//   try {
//     const res = await fetch(usersURL);
//     const data = await res.json();
//     // console.log('=======>>>>. the ddata', data.data.users.length);
//     return data;
//   } catch (err) {
//     console.error('Error:', err);
//     throw err;
//   }
// }

const setupApiInterceptor = async (url, headers, data = {}, method = 'get') => {
  // Make the API request synchronously (not using await)
  try {
    // Make the API request synchronously (using await)
    const response = await axios({
      method,
      url,
      headers: { ...headers },
      data,
    });

    console.log('API response:', response.data.data);
    // Optionally, you can return the response data
    return response.data.data;
  } catch (error) {
    console.log('API error:', error);
    // Optionally, you can throw the error or handle it in some way
    throw error;
  }
};

export default setupApiInterceptor;

// const data = async () => {
//   try {
//     const response = await axios(usersURL,{method});
//     console.log('the data is', response.data.data);
//   } catch (err) {
//     console.log('the error ', err);
//   }
// };

// export default data;
