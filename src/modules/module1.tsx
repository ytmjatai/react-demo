import React from 'react';
import enviroment from '../../config/environment';
import axios from '../services/axios-interceptor';

class Module1 extends React.Component {


 componentDidMount() {

  const url = enviroment.apiUrl + '/book/'
    axios.get(url,  ).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <p>列表</p>
    );
  }


}
// const Module1 = () => (
//   <div>module1</div>
// );
export default Module1;