import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://laravel-backend-url/api',
//     // Add JWT token here
//     headers: {
//         Authorization: `Bearer ${yourToken}`
//     }
// });

const axiosInstance = axios.create({
    baseURL: 'https://65efc415ead08fa78a50e705.mockapi.io/api',
});

export default axiosInstance;
