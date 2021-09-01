class Storage {
  cached = [];

  constructor(options) {
    this.options = {
      serialization: true,
      prefix: "@@purchase/",
      ...options,
    };
  }

  getPrefix() {
    return this.options.prefix;
  }

  set(key, value) {
    const result = this.serializate(value);
    const namespace = this.addPrefix(key);

    window.localStorage.setItem(namespace, result);

    // 缓存namespace下的
    this.cached = [...this.cached, namespace];
  }

  get(key) {
    const result = window.localStorage.getItem(key);
    return this.deserializate(result);
  }

  remove(key) {
    window.localStorage.removeItem(key);

    if (this.getPrefix()) {
      this.cached = this.cached?.filter(namespace => namespace !== key);
    }
  }

  clear() {
    window.localStorage.clear();
  }

  removeNamespaceAllItem(prefix) {
    this.cached?.forEach((namespace) => {
      if (namespace?.startsWith(prefix)) {
        this.remove(namespace);
      }
    });
  }

  serializate(value) {
    const { serialization } = this.options;
    if (serialization) {
      return JSON.stringify(value);
    }
    return value;
  }

  deserializate(value) {
    const { serialization } = this.options;
    return serialization ? JSON.parse(value) : value;
  }

  addPrefix(key) {
    const prefix = this.getPrefix();
    return prefix ? `${prefix}${key}` : key;
  }
}


export default Storage;