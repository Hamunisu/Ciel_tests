 // ハンバーガーメニューの切り替え
 function toggleMenu() {
    var rightBox = document.querySelector('.right-box');
    var menuIcon = document.querySelector('.menu-icon img');
    var overlay = document.getElementById('overlay');
  
    rightBox.classList.toggle('active');
    overlay.classList.toggle('visible');
  
    // アイコンの切り替え
    if (rightBox.classList.contains('active')) {
        menuIcon.src = '../image/close.png';
    } else {
        menuIcon.src = '../image/menu.png';
    }
  }
  
  function closeMenu() {
    var rightBox = document.querySelector('.right-box');
    var menuIcon = document.querySelector('.menu-icon img');
    var overlay = document.getElementById('overlay');
  
    rightBox.classList.remove('active');
    overlay.classList.remove('visible');
    menuIcon.src = '../image/menu.png';
  }
  
  // ---/ハンバーガーメニュー---