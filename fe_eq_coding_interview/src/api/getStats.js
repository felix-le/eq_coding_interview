import { axiosInstance } from './baseApi';

export async function getStatsHourlyApi() {
  return await axiosInstance.get('/stats/hourly');
}

export async function getStatsDailyApi() {
  return await axiosInstance.get('/stats/daily');
}
