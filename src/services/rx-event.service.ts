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
export default RxEventService;
