import EventBus from "../utils/eventBus";

type Indexed<T = unknown> = {
    [key in string]: T;
};

export enum StoreEvents {
    Updated = 'updated',
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if ((rhs[p] as object).constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as never);
    return merge(object as Indexed, result);
}

class Store extends EventBus {
    private state: Indexed = {};
  
    public getState<T>(): Indexed<T> {
      return this.state as Indexed<T>;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);

      this.emit(StoreEvents.Updated);
    };
  } 

  export default new Store(); 
