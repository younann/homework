import axios from "axios";
interface UpdateUserPayload {
  email: string;
  displayName: string;
}
const api = axios.create({
  baseURL: "http://localhost:3030",
  withCredentials: true,
});

export const loginWithGoogle = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};

export const getCurrentUser = (userId: string) => {
  return api.get(`/users/${userId}`);
};

export const updateUser = (data: UpdateUserPayload, userId: string) => {
  return api.put(`/users/${userId}`, data);
};

export const getPortfolio = () => {
  return api.get("/users/portfolio");
};
export const addStockToPortfolio = (userId: string, symbol: string) => {
  if (userId) {
    axios.put(
      `http://localhost:3030/users/${userId}/portfolio`,
      { symbol },
      {
        withCredentials: true,
      }
    );
  }
  return symbol;
};

export const removeStockFromPortfolio = (userId: string, symbol: string) => {
  if (userId) {
    axios.put(
      `http://localhost:3030/users/${userId}/removeStock`,
      { symbol },
      {
        withCredentials: true,
      }
    );
  }
  return symbol;
};
