import axios from "axios";

export default function Request() {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_ACCESS_TOKEN}`,
    },
  });
}
