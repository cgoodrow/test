export function createReducer(initialState = null, actions = {}) {
    return (state = initialState, action) => {
      if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
        return actions[action.type](state, action);
      }
      return state;
    };
  }

  export const normalizeById = (array) => array.reduce((acc, value) => (acc[value.id] = value, acc), {});

  export const denormalizeArray = array => {return (array && Object.values(array).map(item => item))};