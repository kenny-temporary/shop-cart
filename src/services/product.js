import request from "../utils/request";

export function query() {
  return request("/api/users");
}

export function getProductsService() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      // TODO: 替换真实数据
      resolve([
        {
          type: ["XL", "L", "M", "P"],
          name: "product001",
        },
        {
          type: ["XL", "L"],
          name: "product002",
        },
      ]);
    }, 3000);
  });
}
