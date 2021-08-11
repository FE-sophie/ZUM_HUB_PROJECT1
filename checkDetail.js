const axios = require('axios');
const cheerio = require('cheerio');
const { contents } = require('cheerio/lib/api/traversing');

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};

const check = async url => {
  return getHTML(url).then(({ data }) => {
    // const $ = cheerio.load(data, { decodeEntities: true });
    //html 본문 추출
    const html = cheerio.load(data).html();
    const contentsHtml = html
      .split('<!-- 메인 컨텐츠 -->')[1]
      .split('<!-- 컨텐츠 추가 정보 -->')[0];

    while (true) {
      if (!contentsHtml.includes('data-src')) return contentsHtml;
      contentsHtml = contentsHtml.replace('data-src', 'src');
    }
  });
};
exports.check = check;
