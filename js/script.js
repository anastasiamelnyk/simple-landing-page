"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var html = document.querySelector('html');
  var mobNavBtn = document.querySelector('.header__nav-button');
  var mainNav = document.querySelector('.main-nav');
  var mobNavArr = [mobNavBtn, mainNav]; //remove no-js class if js is on

  html.classList.remove('no-js'); //functions to open and close mobile nav

  var closeMobNav = function closeMobNav() {
    mobNavArr.forEach(function (el) {
      el.classList.remove('mob-nav-opened');
      el.classList.add('mob-nav-closed');
    });
  };

  var openMobNav = function openMobNav() {
    mobNavArr.forEach(function (el) {
      el.classList.add('mob-nav-opened');
      el.classList.remove('mob-nav-closed');
    });
  }; //remove class 'mob-nav-opened', add 'mob-nav-closed' on page load


  closeMobNav(); //open and close mobile nav on button click

  mobNavBtn.addEventListener('click', function () {
    if (mobNavBtn.classList.contains('mob-nav-closed') && mainNav.classList.contains('mob-nav-closed')) {
      openMobNav();
    } else if (mobNavBtn.classList.contains('mob-nav-opened') && mainNav.classList.contains('mob-nav-opened')) {
      closeMobNav();
    }
  });
});