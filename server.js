const express = require('express');
const path = require('path');
const { stringify } = require('querystring');
const { check } = require('./checkDetail.js');
const app = express();
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

app.set('port', process.env.PORT || 3000);
app.set('front', process.env.FRONT || path.join(__dirname, './FrontEnd'));

app.use('/', express.static(path.join(app.get('front'), '/')));

app.use(express.json());

//디테일페이지 데이터 송신
app.get('/api/detail/:url', async (req, res) => {
  const url = req.params.url;
  const [media, idx] = url.split('&');
  let data = JSON.stringify(await check(`https://hub.zum.com/${media}/${idx}`));
  res.send(data);
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

//랭킹 데이터 송신
app.get('/api/best', (req, res) => {
  const best = data['best'];
  res.send(best);
});

//서브페이지 데이터 송신
app.get('/api/content/:category', (req, res) => {
  const category = req.params.category;
  res.send(data[category]);
});

//페이지 라우팅
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.format({
    'text/html': () => {
      if (!data[page]) {
        res.status(406).type('html').send(`<div class="error">
        <span class="errorText errorText1">404</span>
        <span class="errorText errorText2">Not Found</span>
        <span class="errorText errorText3">The resource requested could not be found on this server</span>
        </div>`);
      } else {
        res.sendFile(path.join(app.get('front'), '/public/index.html'));
      }
      res.sendFile(path.join(app.get('front'), '/public/index.html'));
    },
    'application/json': () => {
      res.send(data[page]);
    },
  });
});
//메인페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(app.get('front'), '/public/index.html'));
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is listening.....');
});
