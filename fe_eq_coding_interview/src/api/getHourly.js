import { axiosInstance } from './baseApi';
export async function getEventHourlyApi() {
  return await axiosInstance.get('/events/hourly');
}
export async function geteDailyApi() {
  return await axiosInstance.get('/events/daily');
}
