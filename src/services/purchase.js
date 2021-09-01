export function addPurchases(previousPurchases = {}, { sku, product }) {
  const targetPurchase = previousPurchases?.[sku];
  let nextWorkPurchases = {};

  if (targetPurchase && targetPurchase?.number) {
    nextWorkPurchases = {
      ...previousPurchases,
      [sku]: { ...targetPurchase, number: targetPurchase?.number + 1 },
    };
  } else {
    nextWorkPurchases = {
      ...previousPurchases,
      [sku]: { number: 1, product },
    };
  }

  return nextWorkPurchases;
}

export function removePurchases(sku, previousPurchases = {}) {
  // XXX: 副作用
  // TODO: 使用omit来替换delete的操作
  delete previousPurchases[sku];
  return previousPurchases;
}