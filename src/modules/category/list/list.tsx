import React, { useState, useEffect } from 'react';
import { Radio, Tree, Divider } from 'antd';

import * as cateSvc from '../../../services/category.service';
import { CategoryModel } from '../../../models/category';
import { DataNode } from 'antd/lib/tree';

import './list.scss'

const List = () => {

  useEffect(() => {
    cateSvc.getList();
    const cate$ = cateSvc.categories$.subscribe(
      _ => onCategoriesChange()
    );
    return () => {
      cate$.unsubscribe();
    }
  }, []);

  const [categories, setCategories] = useState<DataNode[]>([])
  const onCategoriesChange = async () => {

    const tree = cateSvc.getTreeData('id', 'title');
    setCategories(tree);
  }

  return (
    <div className="category d-flex flex-column h-100">

      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="c">刷新</Radio.Button>
        <Radio.Button value="a">添加</Radio.Button>
        <Radio.Button value="b">编辑</Radio.Button>
        <Radio.Button value="d">删除</Radio.Button>
      </Radio.Group>
      <Divider className="my-2" />

      <Tree
        className="overflow-auto"
        treeData={categories}
        showLine
        blockNode={true}
        titleRender={
          (node: TreeDataModel) => <div className="aaaaaaaaaaaaaaaaa">{node.code + '、' + node.title + ' - ' + node.id}</div>
        } />
    </div>
  )
}

export default List;

interface TreeDataModel extends DataNode, CategoryModel {

}