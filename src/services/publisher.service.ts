import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { IPublisher } from '../models/publisher';

const getList = (): Promise<IPublisher[]> => {
  const url = enviroment.apiUrl + '/publisher/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const publishers = res.data;
      resolve(publishers);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const getById = (id: number): Promise<IPublisher> => {
  const url = `${enviroment.apiUrl}/publisher/${id}/`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const publisher = res.data;
      resolve(publisher);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const add = (model: IPublisher): Promise<IPublisher> => {
  const url = `${enviroment.apiUrl}/publisher/`;
  return new Promise((resolve, reject) => {
    axios.post(url, model).then((res: any) => {
      const publisher = res.data;
      resolve(publisher);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

export { getList, getById, add };