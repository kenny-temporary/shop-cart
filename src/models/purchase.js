import {
  addPurchases,
  removePurchases,
  minusPurchases,
  clearPurchases,
} from "@/services/purchase";
import { objectIterateSum } from "@/utils/distinct";
import { storage } from "@/services/persistence";

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

    *updatePurchases(_, { put, select }) {
      const purchases = yield select((state) => state?.purchase?.purchases);

      const prefix = storage.getPrefix();
      const persistencePurchases = storage.get(prefix + "purchases");

      if (purchases && Object.keys(purchases).length === 0 && persistencePurchases) {
        const openPannel = storage.get(prefix + "pannelStatus");
        const totailPrice = storage.get(prefix + 'totailPrice');

        yield put({
          type: "save",
          payload: {
            purchases: persistencePurchases,
            openPannel,
            totailPrice
          },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action?.payload };
    },

    switchPanel(state) {
      return { ...state, openPannel: !state?.openPannel };
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "updatePurchases" });
    },
  },
};
