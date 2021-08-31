class PersistentPlugin {
  name = "PersistentPlugin";
  match = "";

  processor(reducer, state, action) {
    return reducer(state, action);
  }
}

class ReducerContext {
  strategies = {};

  use(strategies = []) {
    strategies?.map(
      (strategy) => (this.strategies[strategy?.match] = strategy)
    );
  }

  dispatch(reducer, state, action) {
    const type = action?.type;
    const flow = Object.keys(this.strategies || {}).reduce((iterate, current) => {
      const matched = this.strategies[current].match(type);
      return matched ? [...iterate, this.strategies[current]] : iterate;
    }, []);

    return flow?.[0](reducer, state, action);
  }
}
