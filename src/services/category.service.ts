import { BehaviorSubject } from 'rxjs';

import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { CategoryModel } from '../models/category';
import { AntdTreeModel } from '../models/antd-tree';
import { DataNode } from 'antd/lib/tree';

const categories$ = new BehaviorSubject<CategoryModel[]>([]);
const cateSelect$ = new BehaviorSubject<CategoryModel>({});
const action$ = new BehaviorSubject<'add' | 'edit'>('add');

const getList = (): Promise<CategoryModel[]> => {
  const url = enviroment.apiUrl + '/category/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const cates = res.data;
      categories$.next(cates);
      resolve(cates);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const getTreeData = (keyField = 'id', titleField = 'title'): DataNode[] => {
  const cates = categories$.getValue();
  const treeData = cates.map(
    cate => Object.assign({
      key: cate[keyField],
      title: cate[titleField],
    }, cate)
  );
  return treeData.filter(root => {
    const childArr = treeData.filter(cate => cate.parentId === root.id);
    if (childArr.length) {
      root['children'] = childArr;
    }
    if (!root.parentId) {
      return root;
    }
  });
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

const add = (model: CategoryModel): Promise<CategoryModel> => {
  const url = `${enviroment.apiUrl}/category/`;
  return new Promise((resolve, reject) => {
    axios.post(url, model).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

const edit = (model: CategoryModel): Promise<CategoryModel> => {
  const url = `${enviroment.apiUrl}/category/${model.id}/`;
  return new Promise((resolve, reject) => {
    axios.put(url, model).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

export {
  getList, getTreeData, getById, add, edit,
  categories$, cateSelect$, action$
};