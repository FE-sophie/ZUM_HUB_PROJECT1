// import { getBestDataApi, getMainDataApi } from '../modules/api/dataApi.js';
import Store from './Store.js';

export const POST_BOOKMARK = 'ADD_BOOKMARK';
export const GET_APP_VIEW = 'GET_APP_VIEW';
export const GET_SUB_VIEW = 'GET_SUB_VIEW';
export const GET_DETAIL_VIEW = 'GET_DETAIL_VIEW';
export const GET_LOADING = 'GET_LOADING';
export const NOT_FOUND = 'NOT_FOUND';

const reducer = (state, action) => {
  switch (action.type) {
    case NOT_FOUND:
      return { ...state, error: true };
    case GET_LOADING:
      return { ...state, loading: action.payload, error: false };
    case POST_BOOKMARK:
      if (action.payload.error) return { ...state, error: true };
      localStorage.setItem('bookmark', action.payload);
      return { ...state, sub: { ...state.sub, bookmark: action.payload }, error: false };
    case GET_APP_VIEW:
      return { ...state, main: action.payload.main, best: action.payload.best, error: false };
    case GET_SUB_VIEW:
      const { path, data } = action.payload;
      if (path === 'bookmark') {
        const data = localStorage.getItem('bookmark');
        return { ...state, sub: { ...state.sub, bookmark: data }, error: false };
      }
      return { ...state, sub: { ...state.sub, [path]: data }, error: false };
    case GET_DETAIL_VIEW:
      return { ...state, detail: action.payload, error: false };
    default:
      return state;
  }
};
const mainObj = { main: { life: [], food: [], trip: [], culture: [] } };

const initialState = {
  header: [
    { title: '홈', route: '/' },
    { title: '라이프', route: '/life' },
    { title: '푸드', route: '/food' },
    { title: '여행', route: '/trip' },
    { title: '컬처', route: '/culture' },
    { title: '즐겨찾기', route: '/bookmark' },
  ],
  main: mainObj,
  sub: { life: [], food: [], trip: [], culture: [], bookmark: [] },
  best: [],
  detail: '',
  error: false,
  loading: false,
};

const appStore = Store.createStore(initialState, reducer);

export default appStore;
