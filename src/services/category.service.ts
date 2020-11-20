import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { CategoryModel } from '../models/category';

const getList = (): Promise<CategoryModel[]> => {
  const url = enviroment.apiUrl + '/category/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const cates = res.data;
      resolve(cates);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const getById = (id: number): Promise<CategoryModel> => {
  const url = `${enviroment.apiUrl}/category/${id}/`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

export { getList, getById };