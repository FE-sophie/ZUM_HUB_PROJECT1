const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};

const check = url => {
  getHTML(url).then(({ data }) => {
    const $ = cheerio.load(data, { decodeEntities: true });
    const title = $('h2.main_title')[0].children[0].data;
    const category = $('a#btn_category')[0].children[0].data;
    const media = $('a#btn_media')[0].children[0].data;
    const contentList = $('div.article_body')[0].children;
    // console.log(contentList);
    let htmlData = {
      title,
      category,
      media,
      contentList,
    };
    return htmlData;
  });
};

export default check;
