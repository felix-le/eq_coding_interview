import { axiosInstance } from './baseApi';
export async function getEventHourlyApi() {
  return await axiosInstance.get('/events/hourly');
}
export async function getEDailyApi() {
  return await axiosInstance.get('/events/daily');
}
