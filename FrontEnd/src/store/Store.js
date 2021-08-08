const createStore = (initialState, reducer) => {
  let state = initialState;

  const events = {};

  //상태 변화 시 실행할 함수
  const subscribe = (actionType, eCallBack) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eCallBack);
  };
  const publish = (actionType, params) => {
    if (!events[actionType]) return;
    events[actionType].map(func => func(params));
  };

  const dispatch = (action, params) => {
    state = reducer(state, action);
    publish(action.type, params);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const Store = {
  createStore,
};

export default Store;
