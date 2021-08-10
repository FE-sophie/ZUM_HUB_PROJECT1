import axios from 'axios';
import cheerio from 'cheerio';

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};

getHTML()
  .then(html => {
    let divList = [];
    const $ = cheerio.load(html.data);
    console.log($);
    const $bodyList = $.querySelector('div#container .contents').children('div');

    $bodyList.each((i, elem) => {
      divList[i] = {
        title: $bodyList.querySelector('h2.main_title').text(),
        url: $bodyList.querySelector('a#btn_media').attr('href'),
        category: $bodyList.querySelector('a#btn_category').text(),
        body: $bodyList.querySelector('article_wrap'),
        url: $bodyList.querySelector('a#btn_media').attr('href'),
      };
    });
    return divList;
  })
  .then(res => res);

export default checkData;
