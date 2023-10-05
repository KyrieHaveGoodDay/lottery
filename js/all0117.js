
$(function () {

  setTimeout(() => {
    $('.loading_mask').addClass('fadeOut').show().delay(100).fadeOut(0);
    page1Ani();
  }, 300);

  // ie GG
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    $('.ie-mask').removeClass('none');
  }

  // variables
  let $title = $('.game__first--title .titleAll'),
    $chaco = $('.game__first--title .chaco'),
    $mainMask = $('.game__main--mask'),
    $heart = $('.game__first--title .heart'),
    $gameFooter = $('.game__footer'),
    $btns = $('.game__first--btns a'),
    $cookies = $('.cookie'),
    $openR = $('.open-r'),
    $openL = $('.open-l'),
    $result = $('.result'),
    $resultInner = $('.result__inner')
  let index = 0;
  let tl1 = gsap.timeline({ delay: 0.5 });

  // page1 動畫
  function page1Ani() {
    tl1.from($title, { duration: 0.2, stagger: 0.1, opacity: 0 })
      .from($title, { duration: 1, stagger: 0.2, y:'-120px', ease: "elastic.out(1, 0.3)" }, 0)
      .from($chaco, { duration: 0.6, stagger: 0.2, opacity: 0, ease: "back.out(1.7)" }, 0.6)
      .from('.light1', { duration: 2, rotate:360 , repeat:-1 ,ease:'none' }, 0.6)
      .from('.light2', { duration: 2, rotate:'-360' , repeat:-1 ,ease:'none' }, 0.6)
  }

  $('.btn__start').on('click', function () {
    $('.game__first').css('pointer-events', 'none')
    // tl1.timeScale(2).reverse();
    gsap.to($gameFooter, { duration: 0.6, y: '100%', delay: 0.5 });
    gsap.to($btns, { duration: 1, stagger: 0.2, y: '-100%', opacity: 0, ease: "power3.out", delay: 0.2 })
    setTimeout(() => {
      $('.game__first').fadeOut(300)
      gameStart();
    }, 700);
  })

  // 開始遊戲場景動畫
  function gameStart() {
    // let objdata = resultData.length-1;
    // console.log(resultData[objdata]);

    // gsap.from($('.game__main--bg'), { duration: 2.5, scale: 0.6, ease: "power3.out", delay: 0.3 })
    $cookies.each(function () {
      let item = $(this);
      cookieAni(item);
    })
  }
  CustomEase.create("custom1", "M0,0 C0.14,0 0.382,0.3 0.474,0.47 0.556,0.622 0.68,0.963 0.688,1 0.696,0.985 0.734,0.952 0.784,0.952 0.842,0.952 0.858,0.985 0.872,0.998 0.883,0.994 0.904,0.97 0.94,0.97 0.972,0.97 1,1 1,1 ")
  function cookieAni(item) {
    let rdu = R(10, 20) / 10;
    let rdl = R(20, 80) / 100;
    let tl = gsap.timeline({ delay: rdl });

    

    tl.from(item, { duration: 0.8, opacity: 0 })
      .from(item, { duration: 1.2, scale: 2, ease: "bounce.out" }, 0.2)
      .from(item, {
        duration: rdu, x: 0, y: 0, rotate: -300, onComplete: function () {
          item.removeClass('pointer-none')
        }
      }, 0.2)
    
  }
  
  // 點擊紅包
  $cookies.on('click', function () {
    
    // call function
    let datas = allData();
    let str = '';
    // 判斷回傳的結果
    if (typeof datas === "object"){
      // 成功要到api
      $('.WinContent').text(datas[0].text)
      for(let i = 1; i <= datas.length - 1; i++){
        str = `<div>${datas[i].text}</div>`
        $('.OtherContent').append(str)
      }
    }else{
      // 失敗
      $('#success , #fail img').css('display','none')
      $('.OtherContent').text(datas)
    }
    
    
    // Start 點擊其中一個紅包的動畫
    $(this).css({ 'z-index': 20, 'pointer-events': 'none' });
    $mainMask.css('display', 'block')
    $('.open').css('display', 'block')
    let tl = gsap.timeline();
    

    tl.to($mainMask, { duration: 0.6, opacity: 1 })
      .to($(this), { duration: 0.6, top: '50%', left: '50%', x: '-50%', y: '-50%' }, 0)
      .to($(this), { duration: 0.05, rotation: 10, repeat: 6, yoyo: true }, 0.8)
      .to($(this), { duration: 0.1, opacity: 0 ,onComplete: function () {
        setTimeout(() => {
          // 啟動結果頁
          result();
        }, 300);
      }}, 1.2)
      
  })
  // End 點擊其中一個紅包的動畫



  function allData(){
    // 假資料
    let resultData = [
      {
        // 預期第一個為中獎結果
        text: '新年到好運到',
      },
      {
        text: '燒燒香求康復1',
      },
      {
        text: '燒燒香求康復2',
      },
      {
        text: '燒燒香求康復3',
      },
      
    ]

    try {
      // 預期在這...串接api
      
      // 回傳陣列
      return resultData;
    } catch (error) {
      // 回傳失敗的內容
      return '資料似乎出了問題...'
    }
   
  }



  
  //結果燈箱
  function result() {
    $('.open').css('display', 'none');
    $result.css('display', 'flex');
    gsap.to($resultInner, { duration: 0.5, opacity: 1, y: 0 })
    gsap.to($gameFooter, { duration: 0.5, y: 0 })

  }

  // 隨機整數 包含 min & mix
  function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  
  // 禁用手指雙擊縮放
  let lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默認的處理方式(阻止下拉滑動的效果)
  }, { passive: false }); //passive 參數不能省略，用來兼容ios和android

});


