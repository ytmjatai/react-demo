import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { IAuthor } from '../models/author';
import { Subject } from 'rxjs';

const authors$ = new Subject();

const getList = (): Promise<IAuthor[]> => {
  const url = enviroment.apiUrl + '/author/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const authors = res.data;
      authors$.next(authors);
      resolve(authors);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const getById = (id: number): Promise<IAuthor> => {
  const url = `${enviroment.apiUrl}/author/${id}/`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const author = res.data;
      resolve(author);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const add = (model: IAuthor): Promise<IAuthor> => {
  const url = `${enviroment.apiUrl}/author/`;
  return new Promise((resolve, reject) => {
    axios.post(url, model).then((res: any) => {
      console.log(res);
      const author = res.data;
      resolve(author);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

export { getList, getById, add, authors$ };