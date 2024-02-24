import { useUserStore } from "@/stores/UserStore.js";
import axios from "axios";

export const backend = axios.create({
  // baseURL: 'http://localhost:3008',
  baseURL: 'http://teerawats-macbook-air.local:3008',
})

backend.interceptors.request.use(function (config) {
  const UserStore = useUserStore()

  if (UserStore.access_token) {
    config.headers.Authorization = 'Bearer ' + UserStore.access_token
  }

  return config
})