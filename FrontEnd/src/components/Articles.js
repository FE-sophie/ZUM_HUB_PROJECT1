const Articles = (sectionTitle, dataList, sectionName) => {
  return `<section class="articleContainer clearfix">
        <h2>#${sectionTitle}</h2>
        <ul>
        ${dataList
          .map(({ idx, imageUrl, title, summaryContent, mediaName }) => {
            return `
            <li>
              <article id="${sectionName}ID${idx}" class="article">
                <img class="articleImg"src="${imageUrl}" alt="${title}"/>
                <h3 class="articleTitle">${title}</h3>
                <p>${summaryContent}</p>
                <span>by ${mediaName}</span>
                <span class="bookmark">★<span>즐겨찾기추가</span></span>
            </article>
            </li>`;
          })
          .join('')}
          </ul>
      </section>`;
};
export default Articles;