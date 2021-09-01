import { PurchaseActionsPreset } from "@/utils/preset";

export class AddPurchaseActionEffect {
  type = "purchase/addProductToPurchases";
  payload = {
    sku: "",
    product: {},
  };
  constructor(sku, product) {
    this.payload = { 
        sku,
        product
    };
  }
}

export class DelPurchaseActionEffect {
    type = "purchase/removeProductFromPurchases";
    payload = {
        sku: "",
        type: PurchaseActionsPreset.Decrease,
    }
    constructor(sku, type){
        this.payload = { type: type, sku }
    }
}

export class ClearPurchaseActionEffect {
    type = "purchase/clearPurchases";
}