const express = require('express');
const path = require('path');
const app = express();
// import check from 'checkDetail.js';
// const cors = require('cors');

app.set('port', process.env.PORT || 3000);
app.set('front', process.env.FRONT || path.join(__dirname, './FrontEnd'));

app.use('/', express.static(path.join(app.get('front'), '/')));

let { food, life, rank, culture, trip, bookmark, best } = require('./data.js');
const data = {
  food,
  life,
  rank,
  culture,
  trip,
  best,
  bookmark,
};
app.use(express.json());
// app.use(cors());

//디테일페이지 데이터 송신
app.get('/api/detail/:url', (req, res) => {
  const url = req.params.url;
  check(url).then(data => res.send(data));
});

//랭킹 데이터 송신
app.get('/api/best', (req, res) => {
  const best = data['best'];
  res.send(best);
});

//북마크 추가 요청
app.post('/api/bookmark', (req, res) => {
  const { route, id } = req.body;
  if (bookmark.find(el => +id === el.idx)) {
    res.send(bookmark);
    return;
  }
  let newBookmark = data[route].find(el => +id === el.idx);
  bookmark = [...bookmark, newBookmark];

  res.send(bookmark);
});

//서브페이지 데이터 송신
app.get('/api/content/:category', (req, res) => {
  const category = req.params.category;
  res.send(data[category]);
});

//페이지 라우팅
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.send(data[page]);
});

//메인페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(app.get('front'), '/public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is listening.....');
});
