import { SortPreset } from "./preset";
export function multidimensionalDistinct(array = []) {
  return array.reduce((iterate, current) => {
    return Array.from(new Set([...iterate, ...current]));
  }, []);
}

// 扁平化数组, 相对于其他方法：Set的性能相对较好
// TODO: 使用for...of代替Set? 优化性能 ?
export function distinct(firstArray = [], secondArray = []) {
  return Array.from(new Set([...firstArray, ...secondArray]));
}

// NOTE: 将对象数组中的指定项，组装成新的数组返回
export function aggregateIntoArray(array = [], itemKey = "") {
  return array.reduce((iterate, current) => {
    return [...iterate, current?.[itemKey]];
  }, []);
}

// NOTE: 存在删除，不存在添加
export function switchArrayItem(array = [], item) {
  const isExist = array.includes(item);

  if (isExist) {
    return array.filter((originalItem) => originalItem !== item);
  }

  return [...array, item];
}

// 数组交集
// NOTE: 虽然有更高效的实现当时，但是includes具有更好的语义化
export function intersection(array1, array2) {
  return array1.filter((v) => array2.includes(v));
}

// 可按照路径字符进行排序
export function arraySort(array, sortType, keyPath) {
  return [...array].sort((previous, next) => {
    switch (sortType) {
      case SortPreset.Asc:
        return deepValues(previous, keyPath) - deepValues(next, keyPath);

      case SortPreset.Desc:
        return deepValues(next, keyPath) - deepValues(previous, keyPath);

      default:
        return deepValues(previous, keyPath);
    }
  });
}

// 按照路径字符返回指定的值
export function deepValues(data = {}, keyPath) {
  if (!keyPath) {
    return;
  }
  return keyPath?.split(".").reduce((data, current) => {
    return data[current?.trim()];
  }, data);
}

/**
 * @param { Object } obj 原对象
 * @param { String } keyPath 每一项下面的路径path，只用“.”进行拼接
 * @param { Function } process (value, item) => newValue 对每一项的值需要进行怎么样的数量, 默认不做处理
 * @returns totail
 *
 * ```javascript
 * // example
 * const obj = {
 *  a: { num: 10 },
 *  b: { num: 20 }
 * };
 *
 * const sum = objectIterateSum(obj, '.num', value => value * 10);
 * console.log(sum); // 300
 * ```
 */
export function objectIterateSum(
  obj = {},
  keyPath,
  process = (value, item) => value
) {
  return Object.keys(obj)?.reduce((iterate, current) => {
    // 组合pathString = 当前的key+inputPathString
    const composePath = `${current}${keyPath}`;

    // 计算本次的增量
    const incremental = process(deepValues(obj, composePath), obj[current]);

    return iterate + incremental;
  }, 0);
}
