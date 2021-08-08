const Detail = ({ detail }) => {
  const { category = '', type = '', imgList = '', textList = '', media } = detail;

  return `<div class='detailContainer'>
    <h2 class='a11yHidden'>기사본문</h2>
    <div class='detailHeader'>
      <span>[${category}]${type && `[` + type + `]`}}</span>
      <h3>title</h3>
      <span>by ${media}</span>
      ${imgList.map(item => {
        return `<img src="${url}"/>`;
      })}
      ${textList.map(item => {
        return `<p>
                  ${item.text}
              </p>`;
      })}
    </div>
  </div>`;
};

export default Detail;
