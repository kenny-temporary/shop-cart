import Storage from "@/utils/storage";

const storage = new Storage({
  prefix: "$$purchase/",
  serialization: true,
});

export { storage };
export function persistencePurchases(reducer, state, action) {
    const { type } = action;

    switch (type) {
        case "purchase/addProductToPurchases/@@end":
        case "purchase/removeProductFromPurchases/@@end":
        case "purchase/minusProductToPurchases/@@end":
            const currentWorkPurchaseModelState = reducer(state, action)?.purchase;

            storage.set('purchases', currentWorkPurchaseModelState?.purchases);
            storage.set('pannelStatus', currentWorkPurchaseModelState?.openPannel);
            storage.set('totailPrice', currentWorkPurchaseModelState?.totailPrice);
            break;

        // NOTE: 注意我们在存储storage的时候只能清楚订单相关的, 不可以其余持久化的数据清除了
        case "purchase/clearPurchases/@@end":
            storage.removeNamespaceAllItem(storage?.getPrefix());
            break;

        case "purchase/closePanel":
            const nextWorkPurchasesState = reducer(state, action)?.purchase;
            storage.set("pannelStatus", nextWorkPurchasesState?.openPannel);
    
            break;
        default:
            break;
    }
}
