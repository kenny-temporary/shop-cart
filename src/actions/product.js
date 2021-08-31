import { SortPreset, noop } from '@/utils/preset';

// actions
export class GetProductActionEffect {
  type = "product/getProducts";
  payload = {};
  constructor(options = {}) {
    const { limit, offset, ...restParams } = {
      limit: 10,
      offset: 1,
      ...options,
    };
    this.payload = { limit, offset };
    this.extract = restParams;
  }
}

export class FilterActionPure {
  type = "product/filterProducts";
  payload = {};
  constructor(specification = '') {
    this.payload = { specification };
  }
}

export class SortActionPure {
  type = "product/sortProducts";
  payload = {};
  constructor(sort = SortPreset.Nil, rule = noop) {
    this.payload = { sort, rule };
  }
}