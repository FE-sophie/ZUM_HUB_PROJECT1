const Header = ({ header }, active) => {
  const navList = [...header];
  const titleList = {
    home: '홈',
    life: '라이프',
    food: '푸드',
    trip: '여행',
    culture: '컬처',
    bookmark: '즐겨찾기',
  };
  active = active ? active : 'home';
  const render = navList => {
    return `<header class="header">
        <div class="logoWrapper">
          <h1 class='logo'>
              <span class="zLogo"><span class="a11yHidden">ZUM</span></span>
              <span class="hLogo"><span class="a11yHidden">허브</span></span>
          </h1>
        </div>
        <nav>
          <ul class='navBar clearfix'>
            ${navList
              .map(
                ({ title, route }) =>
                  `<li class='history ${
                    title === titleList[active] && 'active'
                  }' route=#${route}>${title}</li>`,
              )
              .join('')}
          </ul>
        </nav>
      </header>
      `;
  };

  return render(navList);
};

export default Header;
