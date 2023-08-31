import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refresh } from '../redux/actions/authActions';
import NavigationService from '../functions/NavigationService';
import store from '../redux';
import { LOGOUT, SET_NICKNAME } from '../redux/constants/userConstants';
import {getIncoming} from "../redux/actions/userActions";

const { dispatch } = store;

const $host = axios.create({
  baseURL: 'http://195.24.67.42'
});

const $authHost = axios.create({
  baseURL: 'http://195.24.67.42'
});

const authIntterceptor = async (config) => {
  config.headers.authorization = `Bearer ${await AsyncStorage.getItem('token')}`;
  console.log(await AsyncStorage.getItem('token'))
  return config;
};

$authHost.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    await refresh().catch(async () => {
      if (await AsyncStorage.getItem('token') || await AsyncStorage.getItem('refreshToken') || store.getState('user')?.user?.isAuth) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        dispatch({ type: LOGOUT });
        dispatch({ type: SET_NICKNAME, payload: false });
        NavigationService.navigate('Start');
        await getIncoming();
      }
    });
  }
  throw error;
});

$authHost.interceptors.request.use(authIntterceptor);


export {
  $host,
  $authHost,
};
