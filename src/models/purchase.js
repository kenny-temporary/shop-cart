import {
  addPurchases,
  removePurchases,
  minusPurchases,
  clearPurchases,
} from "@/services/purchase";
import { objectIterateSum } from "@/utils/distinct";

function calcPurchasesTotalPrice(purchases = {}, key = "number") {
  const totalPrice = objectIterateSum(purchases, `.${key}`, (value, item) => {
    return value * item?.product?.price;
  });
  return totalPrice;
}

export default {
  namespace: "purchase",

  state: {
    purchases: {},
    totailPrice: 0,
    openPannel: false,
  },

  effects: {
    *addProductToPurchases({ payload }, { put, select }) {
      // NOTE: 这个过程一般发生在server，but现在仅能模拟一个数据返回
      const purchases = yield select((state) => state?.purchase?.purchases);
      const nextWorkPurchases = addPurchases(purchases, payload);
      const totailPrice = calcPurchasesTotalPrice(nextWorkPurchases);

      yield put({
        type: "save",
        payload: {
          purchases: nextWorkPurchases,
          totailPrice,
          openPannel: true,
        },
      });
    },

    *removeProductFromPurchases({ payload }, { put, select }) {
      const purchases = yield select((state) => state?.purchase?.purchases);
      const nextWorkPurchases = removePurchases(purchases, payload?.sku);
      const totailPrice = calcPurchasesTotalPrice(nextWorkPurchases);

      yield put({
        type: "save",
        payload: { purchases: nextWorkPurchases, totailPrice },
      });
    },

    *minusProductToPurchases({ payload }, { put, select }) {
      const purchases = yield select((state) => state?.purchase?.purchases);
      const nextWorkPurchases = minusPurchases(purchases, payload?.sku);
      const totailPrice = calcPurchasesTotalPrice(nextWorkPurchases);
      yield put({
        type: "save",
        payload: { purchases: nextWorkPurchases, totailPrice },
      });
    },

    *clearPurchases(_, { put }) {
      const nextWorkPurchases = clearPurchases();
      yield put({
        type: "save",
        payload: {
          purchases: nextWorkPurchases,
          totailPrice: 0,
          openPannel: false,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action?.payload };
    },

    closePanel(state){
      return { ...state, openPannel: false };
    }
  },
};
