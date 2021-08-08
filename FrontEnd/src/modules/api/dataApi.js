import appStore, { GET_LOADING, NOT_FOUND } from '../../store/appStore.js';
const { dispatch } = appStore;

const request = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
};
export const getMainDataApi = async ({ main }) => {
  const mainList = Object.keys(main);
  let dataList = {};
  try {
    dispatch({ type: GET_LOADING, payload: true });
    mainList.forEach(async sectionName => {
      dataList[sectionName] = await getDataApi(sectionName, 'main');
      dispatch({ type: GET_LOADING, payload: false });
    });
    return dataList;
  } catch (error) {
    console.log(`Error:${error}`);
    // dispatch({ type: NOT_FOUND });
  }
};

export const getDataApi = async (pathName, pageType) => {
  let data = [];
  try {
    dispatch({ type: GET_LOADING, payload: true });
    const res = await request.get(`http://localhost:3000/api/content/${pathName}`);
    data = await res.json();
    dispatch({ type: GET_LOADING, payload: false });
    data = pageType === 'sub' ? data.splice(0, 12) : data.splice(0, 3);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
    // dispatch({ type: NOT_FOUND });
  }
};

export const getBestDataApi = async () => {
  let best = [];
  try {
    dispatch({ type: GET_LOADING, payload: true });
    const res = await request.get('http://localhost:3000/api/best');
    best = await res.json();
    dispatch({ type: GET_LOADING, payload: false });
    best = best.splice(0, 12);
    return await best;
  } catch (error) {
    console.log(error);
    // dispatch({ type: NOT_FOUND });
  }
};
export const postBookMarkApi = async ([route, id]) => {
  let bookmark = [];
  try {
    dispatch({ type: GET_LOADING, payload: true });
    const res = await request.post('http://localhost:3000/api/bookmark', { route, id });
    bookmark = await res.json();
    dispatch({ type: GET_LOADING, payload: false });
    return bookmark;
  } catch (error) {
    console.log(error);
    dispatch({ type: NOT_FOUND });
  }
};
export const getDetailApi = async url => {
  let detail = {};
  try {
    // dispatch({ type: GET_LOADING, payload: true });
    const res = await request.get(url);
    detail = await res.json();
    // dispatch({ type: GET_LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: NOT_FOUND });
  }
};
