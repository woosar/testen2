import axios from 'axios';
import { IConfig, ITransaction } from '../types.ts';
import { IPurchase } from '../models/Purchase.ts';
import { IAccount } from '../models/Account.ts';

const API_URL = 'http://192.168.178.20:3000/api/items';
const API_URL_TRANSACTIONS = 'http://192.168.178.20:3000/api/transactions';
const API_URL_CATEGORIES = 'http://192.168.178.20:3000/api/categories';
const API_URL_CONFIG = 'http://192.168.178.20:3000/api/config';
const API_URL_PURCHASES = 'http://192.168.178.20:3000/api/purchases';
const API_URL_ACCOUNTS = 'http://192.168.178.20:3000/api/accounts';

export const getItems = async (queryParams = {}) => {
  try {
    const response = await axios.get(API_URL, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getTransactions = async (
  queryParams = {}
): Promise<ITransaction[]> => {
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
    console.error('Error fetching asd:', error);
    throw error;
  }
};

export const getPurchases = async (queryParams = {}): Promise<IPurchase[]> => {
  try {
    const response = await axios.get(API_URL_PURCHASES, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw error;
  }
};

export const getAccounts = async (queryParams = {}): Promise<IAccount[]> => {
  try {
    const response = await axios.get(API_URL_ACCOUNTS, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
