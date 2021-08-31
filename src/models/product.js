import { getProductsService } from "@/services/product";
import {
  multidimensionalDistinct,
  aggregateIntoArray,
  switchArrayItem,
  intersection,
} from "@/utils/distinct";

export default {
  namespace: "product",

  state: {
    products: [],
    specifications: [],
    selected: [],
    originProducts: [],
  },

  effects: {
    *getProducts(_, { call, put }) {
      const { data } = yield call(getProductsService);

      const products = data?.products || [];
      const availableSizes = aggregateIntoArray(products, "availableSizes");
      const specifications = multidimensionalDistinct(availableSizes);

      yield put({
        type: "save",
        payload: {
          products,
          specifications,
          originProducts: products,
        },
      });
    },
  },

  reducers: {
    filterProducts(state, { payload }) {
      const selected = switchArrayItem(state?.selected, payload?.specification);

      const products =
        selected.length <= 0
          ? state?.originProducts
          : state?.originProducts?.reduce((acc, product) => {
              /** 选中和availableSizes存在交集 */
              const commoned = intersection(selected, product?.availableSizes);
              return commoned?.length > 0 ? [...acc, product] : acc;
            }, []);
      return { ...state, selected, products };
    },

    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
