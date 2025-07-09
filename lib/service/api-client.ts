import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { CanceledError };
