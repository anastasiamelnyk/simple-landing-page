document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const mobNavBtn = document.querySelector('.header__nav-button');
  const mainNav = document.querySelector('.main-nav');
  const mobNavArr = [mobNavBtn, mainNav];
  const docHeight = document.documentElement.clientHeight;


  //remove no-js class if js is on
  html.classList.remove('no-js');


  //functions to open and close mobile nav
  const closeMobNav = () => {
    mobNavArr.forEach(el => {
      el.classList.remove('mob-nav-opened');
      el.classList.add('mob-nav-closed');
    });
  };
  const openMobNav = () => {
    mobNavArr.forEach(el => {
      el.classList.add('mob-nav-opened');
      el.classList.remove('mob-nav-closed');
    });
  };


  //remove class 'mob-nav-opened', add 'mob-nav-closed' on page load
  closeMobNav();

  //open and close mobile nav on button click
  mobNavBtn.addEventListener('click', () => {
    if (mobNavBtn.classList.contains('mob-nav-closed') && mainNav.classList.contains('mob-nav-closed')) {
      openMobNav();
    } else if (mobNavBtn.classList.contains('mob-nav-opened') && mainNav.classList.contains('mob-nav-opened')) {
      closeMobNav();
    }
  });
});
