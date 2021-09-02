import { getProductsService } from "@/services/product";
import { SortPreset } from "@/utils/preset";
import { filterProductsService } from "@/services/product";
import {
  multidimensionalDistinct,
  aggregateIntoArray,
  arraySort,
} from "@/utils/distinct";

export default {
  namespace: "product",

  state: {
    products: [],
    specifications: [],
    selected: [],
    currentSort: SortPreset.Nil,
    spinStatus: false,
  },

  effects: {
    *getProducts(_, { call, put }) {
      yield put({ type: "save", payload: { spinStatus: true } });

      const { data } = yield call(getProductsService);
      const products = data?.products || [];

      const availableSizes = aggregateIntoArray(products, "availableSizes");
      const specifications = multidimensionalDistinct(availableSizes);

      yield put({
        type: "save",
        payload: { products, specifications, spinStatus: false },
      });
    },

    *filterProducts({ payload }, { call, select, put }) {
      yield put({ type: "save", payload: { spinStatus: true } });

      const { data } = yield call(getProductsService);
      const state = yield select((state) => state?.product);
      let { products, selected } = filterProductsService(
        data?.products,
        state?.selected,
        payload?.specification
      );

      // NOTE: 过滤时候存在筛选
      if (state?.currentSort !== SortPreset.Nil) {
        products = arraySort(products, state?.currentSort, "price");
      }

      yield put({
        type: "save",
        payload: { selected, products, spinStatus: false },
      });
    },

    *sortProducts({ payload }, { call, select, put }) {
      yield put({ type: "save", payload: { spinStatus: true } });

      const { data } = yield call(getProductsService);
      const state = yield select((state) => state?.product);

      if (payload?.sort === SortPreset.Nil) {
        const { products } = filterProductsService(
          data?.products,
          state?.selected,
          SortPreset.Nil
        );
        yield put({
          type: "save",
          payload: { products, currentSort: SortPreset.Nil, spinStatus: false },
        });
        return;
      }

      // 正常排序
      const products = arraySort(state?.products, payload?.sort, "price");
      yield put({
        type: "save",
        payload: { products, currentSort: payload?.sort, spinStatus: false },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
