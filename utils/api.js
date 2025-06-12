import axios from "axios";
const API_URL = process.env.API_URL;
// "http://manageexpenses-env.eba-vt7w8k7k.ap-south-1.elasticbeanstalk.com";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/account/register/`, userData);
    return response.data; // return data directly
  } catch (error) {
    // Throw backend errors if present, else throw generic error
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    // throw error;
  }
};

export const loginUser = async (userData) => {
  // const response = await axios.post(`${API_URL}/account/api/token/`, userData);
  try {
    const response = await axios.post(
      `${API_URL}/account/api/token/`,
      userData
    );
    return response.data; // return data directly
  } catch (error) {
    // Throw backend errors if present, else throw generic error
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    // throw error;
  }
};

export const createExpense = async (expenseData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/expense/listcreate/`,
      expenseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // return data directly
  } catch (error) {
    // Throw backend errors if present, else throw generic error
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    // throw error;
  }
};

export const deleteExpense = async (token, id) => {
  try {
    await axios.delete(`${API_URL}/expense/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
  }
};

export const updateExpense = async (data, token, id) => {
  try {
    const response = await axios.patch(`${API_URL}/expense/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // return data directly
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
  }
};

export const getExpenses = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/expense/listcreate/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // return data directly
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
  }
};
