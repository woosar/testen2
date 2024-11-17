import axios from 'axios';
import { IConfig } from '../types.ts';

const API_URL = 'http://localhost:3000/api/items';
const API_URL_TRANSACTIONS = 'http://localhost:3000/api/transactions';
const API_URL_CATEGORIES = 'http://localhost:3000/api/categories';
const API_URL_CONFIG = 'http://localhost:3000/api/config';

export const getItems = async (queryParams = {}) => {
  try {
    const response = await axios.get(API_URL, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getTransactions = async (queryParams = {}) => {
  try {
    const response = await axios.get(API_URL_TRANSACTIONS, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getCategories = async (queryParams = {}) => {
  try {
    const response = await axios.get(API_URL_CATEGORIES, {
      params: queryParams,
    });
    return response.data[0];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getConfig = async (queryParams = {}): Promise<IConfig> => {
  try {
    const response = await axios.get(API_URL_CONFIG, {
      params: queryParams,
    });
    return response.data[0];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
