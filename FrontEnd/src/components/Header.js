const Header = ({ header }) => {
  const navList = [...header];
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
                  `<li class='history ${title === '홈' && 'active'}' route=#${route}>${title}</li>`,
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
