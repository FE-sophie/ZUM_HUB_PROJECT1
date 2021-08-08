import axios from 'axios';
import cheerio from 'cheerio';

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};

getHTML().then(html => {
  let divList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('div#content').children('article.entry');
  $bodyList.each((i, elem) => {
    titlelist[i] = {
      title: $(this).find('div.list-row div.list-body a.list'),
    };
  });
});

export default checkData;
