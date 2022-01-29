import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // tao header chung cho moi request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Khi token ko tồn tại trong LocalStorge thì tất cả các request về sau sẽ ko có cái token đó nữa trong header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
