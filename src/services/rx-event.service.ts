import { Subject } from 'rxjs/internal/Subject';


class RxEventService {
  private events: { [key: string]: Subject<any>; } = {};
  private values: { [key: string]: any } = {};
  private static instance = new RxEventService();

  constructor() {
  }

  public static getInstance() {
    return this.instance;
  }

  on(eventName: string) {
    if (!this.events[eventName] || this.events[eventName].isStopped) {
      this.events[eventName] = new Subject<any>();
    }
    return this.events[eventName];
  }

  publish(eventName: string, val: any) {
    if (!this.events[eventName] || this.events[eventName].isStopped) {
      this.events[eventName] = new Subject<any>();
    }
    this.values[eventName] = val;
    this.events[eventName].next(val);
  }
}
export default RxEventService
//  new RxEventService();

// import xhr from './xhr/'

// /**
//  * 对应后端涉及到用户认证的 API
//  */
// class UserService {

//   checkLogin () {
//     return xhr({ url: '/user' })
//   }

//   /**
//    * @param  {Object} userData
//    * @return {Promise}
//    */
//   login (userData) {
//     return xhr({
//       method: 'post',
//       url: '/login',
//       body: userData
//     })
//   }

//   logout () {
//     return xhr({ url: '/logout' })
//   }

// }

// // 实例化后再导出
// export default new UserService()
