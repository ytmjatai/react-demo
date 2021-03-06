import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { IBook } from '../models/book';

const getList = (): Promise<IBook[]> => {
  const url = enviroment.apiUrl + '/book/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const books = res.data;
      resolve(books);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const getById = (id: number): Promise<IBook> => {
  const url = `${enviroment.apiUrl}/book/${id}/`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const book = res.data;
      resolve(book);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

export { getList, getById };