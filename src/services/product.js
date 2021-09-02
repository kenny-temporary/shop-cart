import request from "@/utils/request";
import { SortPreset } from "@/utils/preset";
import { switchArrayItem, intersection } from "@/utils/distinct";

export function getProductsService() {
  return request("/products.json");
}

export function filterProductsService(
  originProducts,
  previousSelected,
  specification
) {
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
