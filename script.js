document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ローディング画面の処理
    =========================================== */
    const loadingOverlay = document.getElementById('loading');
    const loadingBar = document.getElementById('loading-bar');
  
    let progress = 0;
  
    // 模擬的にプログレスバーを滑らかに進めるアニメーション
    const progressInterval = setInterval(() => {
      progress += 4;
      if (loadingBar) {
        loadingBar.style.width = `${progress}%`;
      }
  
      if (progress >= 100) {
        clearInterval(progressInterval);
        // バーが100%になってから少し余韻を残してふんわり消す
        setTimeout(() => {
          if (loadingOverlay) {
            loadingOverlay.classList.add('loaded');
          }
        }, 300);
      }
    }, 40);
  
    // ページの全素材（GIF画像など）が完全読み込み完了した際にも確実に消すバックアップ処理
    window.addEventListener('load', () => {
      if (loadingBar) loadingBar.style.width = '100%';
      setTimeout(() => {
        if (loadingOverlay) {
          loadingOverlay.classList.add('loaded');
        }
      }, 300);
    });
  
  
    /* ==========================================
       2. スマホ用ハンバーガーメニュー開閉処理
    =========================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
    // メニューを開く
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
    }
  
    // メニューを閉じる（バツボタン）
    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    }
  
    // メニュー内のリンクをクリックしたら自動でメニューを閉じる
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
        }
      });
    });
  
    // メニューの外側（暗がり等）をタップした時も閉じる使いやすさ配慮
    document.addEventListener('click', (e) => {
      if (
        mobileMenu &&
        mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        mobileMenu.classList.remove('active');
      }
    });
  
  
   
    /* ==========================================
     3. スライドショー処理（修正後：矢印ボタン・自動再生・ドット）
  =========================================== */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  // ★矢印ボタンを取得
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentSlide = 0;
  let slideInterval;
  const SLIDE_SPEED = 3500; // 切り替え速度（ミリ秒）

  // 安全装置：スライドが存在しない場合は処理を抜ける
  if (slides.length === 0) return;

  // スライドを表示するコア関数
  function showSlide(index) {
    // ループ処理
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // すべてのスライドとドットをリセット
    slides.forEach(slide => (slide.style.display = 'none'));
    dots.forEach(dot => dot.classList.remove('active'));

    // 対象を表示
    slides[currentSlide].style.display = 'block';
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  // ★次のスライドへ進む関数（ボタン用）
  function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval(); // 手動操作したらタイマーをリセット
  }

  // ★前のスライドへ戻る関数（ボタン用）
  function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval(); // 手動操作したらタイマーをリセット
  }

  // 自動再生タイマーを開始する関数
  function startInterval() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, SLIDE_SPEED);
  }

  // タイマーをリセットする関数（手動操作時に呼ぶ）
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  /* --- イベントリスナーの登録 --- */

  // ★矢印ボタンのクリックイベント
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // ドットクリック時のイベント
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });

  // 初期化：最初のスライドを表示し、自動再生を開始
  showSlide(0);
  startInterval();
  
  });