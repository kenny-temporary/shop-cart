import { getProductsService } from "@/services/product";
import { SortPreset } from "@/utils/preset";
import {
  multidimensionalDistinct,
  aggregateIntoArray,
  switchArrayItem,
  intersection,
  arraySort,
} from "@/utils/distinct";

function filterProductsFunc(originProducts, previousSelected, specification) {
  // 选项中存在即删除，不存在即添加
  const selected =
    specification === SortPreset.Nil
      ? previousSelected
      : switchArrayItem(previousSelected, specification);

  const products =
    selected.length <= 0 /** 当选项被取消为空时, 恢复所有的商品数据 */
      ? originProducts
      : /** 当被选中的规格选项和商品中的size存在交集时，需要该商品 */
        originProducts?.reduce((acc, product) => {
          const commoned = intersection(selected, product?.availableSizes);
          return commoned?.length > 0 ? [...acc, product] : acc;
        }, []);

  return { products, selected };
}

export default {
  namespace: "product",

  state: {
    products: [],
    specifications: [],
    selected: [],
    originProducts: [],
    currentSort: SortPreset.Nil,
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
      let { products, selected } = filterProductsFunc(
        state?.originProducts,
        state?.selected,
        payload?.specification
      );

      // 存在排序的情况下, 添加的商品也是会按照上一次的方式进行排序的
      if (state?.currentSort !== SortPreset.Nil) {
        products = arraySort(products, state?.currentSort, "price");
      }

      return { ...state, selected, products };
    },

    sortProducts(state, { payload }) {
      // 重置排序
      if (payload?.sort === SortPreset.Nil) {
        const { products } = filterProductsFunc(
          state?.originProducts,
          state?.selected,
          SortPreset.Nil
        );
        return { ...state, products, currentSort: SortPreset.Nil };
      }

      // 正常排序
      const products = arraySort(state?.products, payload?.sort, "price");
      return { ...state, products, currentSort: payload?.sort };
    },

    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
