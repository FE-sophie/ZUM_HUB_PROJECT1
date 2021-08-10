const express = require('express');
const path = require('path');
// import { getHTML } from 'checkData.js';
// const cors = require('cors');
const app = express();
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

app.get('/api/best', (req, res) => {
  const best = data['best'];
  res.send(best);
});

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

//서브페이지 라우팅
app.get('/api/content/:category', (req, res) => {
  const category = req.params.category;
  res.send(data[category]);
});

//페이지 라우팅
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.send(data[page]);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(app.get('front'), '/public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is listening.....');
});
