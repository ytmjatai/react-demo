import { BehaviorSubject } from 'rxjs';

import enviroment from '../../config/environment';
import axios from './axios-interceptor';
import { ICategory } from '../models/category';
import { ICommomTreeData } from '../models/antd-tree';

const categories$ = new BehaviorSubject<ICategory[]>([]);
const cateSelect$ = new BehaviorSubject<ICategory>({});
const action$ = new BehaviorSubject<'add' | 'edit'>('add');

const getList = (): Promise<ICategory[]> => {
  const url = enviroment.apiUrl + '/category/'
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const cates = res.data;
      categories$.next(cates);      
      resolve(cates);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

const getTreeData = (
  keyField = 'id',
  titleField = 'title'
): ICommomTreeData[] => {
  const cates = JSON.parse(JSON.stringify(categories$.getValue()));
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

const getDisableTreeData = (
  keyField = 'id',
  titleField = 'title'
): ICommomTreeData[] => {
  const cateSelect = cateSelect$.getValue();
  const data = JSON.parse(JSON.stringify(categories$.getValue()));
  const cates = data.map(cate => {
    if (cateSelect.id === cate.id) {
      cate['disabled'] = true;
      cate['selectable'] = false;
    }
    return cate;
  })
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


const getById = (id: number): Promise<ICategory> => {
  const url = `${enviroment.apiUrl}/category/${id}/`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

const add = (model: ICategory): Promise<ICategory> => {
  const url = `${enviroment.apiUrl}/category/`;
  return new Promise((resolve, reject) => {
    axios.post(url, model).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

const edit = (model: ICategory): Promise<ICategory> => {
  const url = `${enviroment.apiUrl}/category/${model.id}/`;
  return new Promise((resolve, reject) => {
    axios.put(url, model).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

const del = (id: number): Promise<ICategory> => {
  const url = `${enviroment.apiUrl}/category/${id}/`;
  return new Promise((resolve, reject) => {
    axios.delete(url).then((res: any) => {
      const cate = res.data;
      resolve(cate);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

export {
  getList, getTreeData, getDisableTreeData, getById,
  add, edit, del,
  categories$, cateSelect$, action$
};
