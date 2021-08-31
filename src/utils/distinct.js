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
  
  if(isExist){
    return array.filter(originalItem => originalItem !== item);
  }

  return [...array, item];
};


// 数组交集
// NOTE: 虽然有更高效的实现当时，但是includes具有更好的语义化
export function intersection(array1, array2) {
  return array1.filter(v => array2.includes(v))
}

export function arraySort(array, sortType, keyPath) {
  return [...array].sort((previous, next) => {
    switch (sortType) {
      case SortPreset.Asc:
        return deepValues(previous, keyPath) - deepValues(next, keyPath);
    
      case SortPreset.Desc:
        return deepValues(next, keyPath) - deepValues(previous, keyPath);

      default:
        break;
    }
  });
}

export function deepValues(data = {}, keyPath){
  if(!keyPath) { return };
  return keyPath?.split(",").reduce((data, current) => {
    return data[current?.trim()];
  }, data);
}