const Best = ({ best }) => {
  const dataList = [...best];
  return `<section class="container best">
            <h2>실시간 TOP 12</h2>    
            <div class="wrapper">
                <ul class="clearfix">
                    ${dataList
                      .map(({ idx, mediaName, title, url }, i) => {
                        return `<li class="articleItem">
                                    <span>${i + 1}</span>
                                    <article id="${idx}"class="bestArticle">
                                            <a href="${url}">
                                                <h4 class="a11yHidden">랭킹${i + 1}위 기사</h4>
                                                <p>${title}</p>
                                                <span>by ${mediaName}</span>
                                            </a>
                                    </article>
                                </li>
                                `;
                      })
                      .join('')}
                </ul>
        </div>
    </section>
      `;
};
export default Best;
