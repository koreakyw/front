import axios from 'axios';
import boardService from './boardService';

const api = axios.create({
  baseURL: 'http://landmaster.test/api/',
  timeout: 3600
}, { withCredentials: true });

export default api;
export {
  boardService
};