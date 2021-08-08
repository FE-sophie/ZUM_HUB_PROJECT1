// const fetch = require('node-fetch');

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
    mainList.forEach(async sectionName => {
      dataList[sectionName] = await getDataApi(sectionName, 'main');
    });
    return dataList;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

export const getDataApi = async (pathName, pageType) => {
  let data = [];
  try {
    const res = await request.get(`http://localhost:3000/api/content/${pathName}`);
    data = await res.json();
    data = pageType === 'sub' ? data.splice(0, 12) : data.splice(0, 3);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getBestDataApi = async () => {
  let best = [];
  try {
    const res = await request.get('http://localhost:3000/api/best');
    best = await res.json();
    best = best.splice(0, 12);
    return await best;
  } catch (error) {
    console.log(error);
  }
};
export const postBookMarkApi = async ([route, id]) => {
  let bookmark = [];
  try {
    const res = await request.post('http://localhost:3000/api/bookmark', { route, id });
    bookmark = await res.json();
    return bookmark;
  } catch (error) {
    console.log(error);
  }
};
export const getDetailApi = async url => {
  let detail = {};
  try {
    const res = await request.get(url);
    detail = await res.json();
  } catch (error) {
    console.log(error);
  }
};
