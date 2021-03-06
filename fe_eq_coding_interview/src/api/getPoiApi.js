import { axiosInstance } from './baseApi';
export async function getPoiApi() {
  return await axiosInstance.get('/poi');
}
