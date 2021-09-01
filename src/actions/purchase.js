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
      product,
    };
  }
}

export class MinusPurchaseActionEffect {
  type = "purchase/minusProductToPurchases";
  payload = {
    sku: ''
  }
  constructor(sku) {
    this.payload = { sku };
  }
}

export class RemovePurchaseActionEffect {
  type = "purchase/removeProductFromPurchases";
  payload = {
    sku: "",
    type: "",
  };
  constructor(sku, type = PurchaseActionsPreset.Remove) {
    this.payload = { type: type, sku };
  }
}

export class ClearPurchaseActionEffect {
  type = "purchase/clearPurchases";
}

export class ClosePurchasePanelPure {
  type = "purchase/closePanel";
}