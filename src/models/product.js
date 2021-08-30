import { SortPreset, noop } from '@/utils/preset';
import { getProductsService } from '@/services/product';

export default {

  namespace: 'product',

  state: {
    products: [],
  },

  effects: {
    *getProducts({ payload }, { call, put }) {
      const products = yield call(getProductsService);
      yield put({ type: 'save', payload: { products } });
    }
  },

  reducers: {
    filterProducts(state, action){},

    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};


export class GetProductActionEffect {
  type = 'product/getProducts';
  
  payload = {};

  constructor(options = {}) {
    const { limit, offset, ...restParams } = { limit: 10, offset:1, ...options };
    this.payload = { limit, offset };
    this.extract = restParams;
  };
}

export class FilterActionPure {
  type = 'product/filterProducts';

  payload = {};
  constructor(rules = []){
    this.payload = { rules };
  };
}

export class SortActionPure {
  type = 'product/sortProducts';
  payload = {};

  constructor(sort = SortPreset.Nil, rule = noop){
    this.payload = { sort, rule };
  }
}