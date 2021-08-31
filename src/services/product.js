import request from "@/utils/request";

export function getProductsService() {
  return request('/products.json');
}