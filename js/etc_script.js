// ハンバーガーメニューの切り替え
function toggleMenu() {
    var rightBox = document.querySelector('.right-box');
    var menuIcon = document.querySelector('.menu-icon img');
    rightBox.classList.toggle('active');
  
    // アイコンの切り替え
    if (rightBox.classList.contains('active')) {
        menuIcon.src = '../image/close.png';
    } else {
        menuIcon.src = '../image/menu.png';
    }
  }

  // ---/ハンバーガーメニュー---