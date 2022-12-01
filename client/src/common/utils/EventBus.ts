export interface Registry {
  removeListener: () => void;
}

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  addListener(event: string, callback: Function): Registry;
}

class EventBus implements IEventBus {
  private subscribers: Record<string, Record<string, Function>>;
  private static nextId = 0;
  private static instance?: EventBus = undefined;

  private constructor() {
    this.subscribers = {};
  }

  public static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new EventBus();
    }

    return this.instance;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event];

    if (!subscriber) {
      return;
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg));
  }

  public addListener(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][id] = callback;

    return {
      removeListener: () => {
        delete this.subscribers[event][id];
        if (!Object.keys(this.subscribers[event]).length) {
          delete this.subscribers[event];
        }
      },
    };
  }

  private getNextId(): number {
    return EventBus.nextId++;
  }
}

export default EventBus.getInstance();
