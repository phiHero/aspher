import axios from 'axios';
import { _loginUser } from '../../src/interface/_custom';

export const LoginService = async (user: _loginUser) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/auth/login`, user);
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } else {
      throw new Error('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  } catch (error) {
    console.log(error);
  }
};
