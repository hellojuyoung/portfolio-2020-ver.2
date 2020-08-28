$(document).ready(function () {
  var follower = $(".cursor-follower");

  function followingCursor(e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    follower.css({
      left: mouseX + 10 + "px",
      top: mouseY + 10 + "px",
    });
  }

  //마우스커서 이미지 따라다니기
  $(window).on("mousemove", followingCursor);

  //find clickbtn
  var clickBtn = $("a, .publish-list .tit, button");

  //click 가능한 태그에 마우스 오버시 커서 이미지 변경
  clickBtn.on("mouseover", function () {
    follower.addClass("click");
  });

  clickBtn.on("mouseleave", function () {
    follower.removeClass("click");
  });
});

//window resize
$(window).resize(function () {
  scrollMenu();
  setModalContHeight();
  setMobileIntroHeight();
});

var windowTop;
var windowH;
var navH;


//keyword rolling
function rollingKeyword() {
  let keyBox = $(".random-key-box .keyword");
  let keywords = ["Juyoung Shin", "Web Publisher", "Web Designer", "Cat Lover", "Hard Worker"];
  let keywordIdx = 0;

  let typingBool = false;
  let typingIdx = 0;
  let keyLength = keywords.length;

  let typingTxt = keywords[keywordIdx];
  typingTxt = typingTxt.split("");
  if (typingBool == false) {
    typingBoll = true;
    var setType = setInterval(typing, 100);
  }

  function typing() {
    if (typingIdx < typingTxt.length) {
      keyBox.append(typingTxt[typingIdx]);
      typingIdx++;
    } else {
      if (keywordIdx >= keyLength - 1) {
        keywordIdx = 0;
      } else {
        keywordIdx++;
      }

      typingIdx = 0;
      typingBool = false;
      typingTxt = keywords[keywordIdx];

      clearInterval(setType);
      setTimeout(function () {
        keyBox.html('');
        setType = setInterval(typing, 100);
      }, 3000);
    }
  }

  //changeKey = setInterval(function () {
  //  var random = Math.floor(Math.random() * keywords.length);
  //  //keyBox.text(keywords[random]);

  //  let typingBool = false;
  //  let typingIdx = 0;
  //  let keyBoxIdx = 0;

  //  let thisKeyword = keywords[random];
  //  let keyLength = thisKeyword.length;
  //  thisKeyword = thisKeyword.split("");

  //  if (typingBool == false) {
  //    typingBool = true;
  //    var typInt = setInterval(typing, 100);
  //  }

  //  function typing() {
  //    if (typingIdx < keyLength) {
  //      $(".keyword").append(thisKeyword[typingIdx]);
  //      typingIdx++;
  //    } else {
  //      typingIdx = 0;
  //      typingBool = false;
  //      thisKeyword = keyBox;

  //      clearInterval(typInt);

  //      setTimeout(function () {
  //        keyBox.html('');
  //        typInt = setInterval(typing, 100);
  //      }, 1000);
  //    }
  //  }
  //}, 5000);
}


//nav 스크롤 이벤트
function navOnTop() {
  $(window).scroll(function () {
    windowTop = $(window).scrollTop();

    var introH = $(".intro").height();

    navH = $("#nav").height();

    if (windowTop >= introH) {
      $("#nav").addClass("fix");
      $("#about").css("marginTop", navH + "px");
    } else {
      $("#nav").removeClass("fix");
      $("#about").css("marginTop", 0);
    }
  });
}

//prevent a href="#"
function preventScroll() {
  $('a[href="#"]').click(function (event) {
    event.preventDefault();
  });
}

//nav tab 클릭 이벤트
function scrollMenu() {
  navH = $("#nav").height();

  var navigator = $(".navigation li");
  var idContent = $(".scroll-cont");
  var scrollArea = $("html, body");

  //해당 섹션 스크롤!
  $(function () {
    navigator.on("click", function () {
      var thisIdx = $(this).index(),
        target = idContent.eq(thisIdx),
        targetPosition = target.offset().top - navH;

<<<<<<< HEAD
      scrollArea.stop().animate({
=======
      scrollArea.stop().animate(
        {
>>>>>>> 988490d65d934b36c76857aa49e1c232948492f9
          scrollTop: targetPosition + 1,
        },
        500
      );

      //a href="#"
      return false;
    });
  });

  //스크롤시 nav list에 class 추가
  $(window).on("scroll", function () {
    windowH = $(window).height();
    windowTop = $(window).scrollTop();

    var pageH = $("html, body").height();
    var endOfScroll = pageH - windowH - 100;

    $.each(idContent, function (idx) {
      var target = idContent.eq(idx),
        //i = target.index(),
        targetTop = target.offset().top - navH;

      var introH = $(".intro").height();

      //contact 화면 최하단 스크롤시 클래스 추가
      if (windowTop >= endOfScroll) {
        $(".navigation li").last().addClass("on").siblings().removeClass("on");
      }

      //
      if (targetTop <= windowTop) {
        navigator.removeClass("on");
        navigator.eq(idx).addClass("on");
      }
      if (!(introH <= windowTop)) {
        navigator.removeClass("on");
      }
    });
  });
}

//scrollTop 이벤트
function scrollTop() {
  $(window).scroll(function () {
    windowTop = $(window).scrollTop();

    if (windowTop >= 1000) {
      $(".scroll-top-wrap").addClass("on");
    } else {
      $(".scroll-top-wrap").removeClass("on");
    }
  });

  $(".scroll-top-wrap").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );

    return false;
  });
}

//publish 아코디언 리스트
function accordianList(self) {
  var targetList = $(self).parents(".list-bar");
  var targetDesc = targetList.siblings(".list-info");

  var findOnList = $("#publish").find(".list-bar.on");
  var findOnDesc = $("#publish").find(".list-info.on");

  targetList.toggleClass("on");

  if (targetDesc.hasClass("on")) {
    targetDesc.removeClass("on");
    findOnList.removeClass("on");
    findOnDesc.removeClass("on");
  } else {
    findOnList.removeClass("on");
    findOnDesc.removeClass("on");
    targetDesc.addClass("on");
  }
}

//modal show
function showModal(self) {
  var finder = self;
  var findModalId = $(finder).attr("href");

  $(".modal, .dimmed").addClass("on");
  $(".modal").find(findModalId).addClass("on");
}

//modal hide
function closeModal() {
  $(".modal, .dimmed").removeClass("on");
  $(".modal").find(".on").removeClass("on");
}

//modal .design-img height = window height
function setModalContHeight() {
  windowH = $(window).height();

  $(".design-img").css("height", windowH + "px");
}

//mobile .intro height setting
function setMobileIntroHeight() {
  navH = $("#nav").height();
  windowH = $(window).height();

  var windowW = $(window).width();

  if (windowW <= 1024) {
    $(".intro").css("height", windowH - navH + "px");
  } else {
    $(".intro").css("height", 850);
  }
}

//publish 리스트 스크롤 애니메이션
function showUpList() {
  var delayPosition = 200;
  $(window).on("resize", function () {
    insertTargetPosition();
  });

  $(window).on("scroll", function () {
    var position = $(window).scrollTop() + windowH - delayPosition;

    $(".accordian>li").each(function () {
      if (!$(this).hasClass("on") && $(this).data("offsetTop") < position) {
        $(this).addClass("on");
        $(this).removeClass("ready");
      }
    });
  });

  //target position
  function insertTargetPosition() {
    windowH = $(window).height();
    $(".accordian>li").each(function () {
      $(this).data("offsetTop", $(this).offset().top);
    });
  }

  insertTargetPosition();
}

//run!
$(document).ready(function () {
  rollingKeyword();
  navOnTop();
  scrollTop();
  scrollMenu();
  showUpList();
  setModalContHeight();
  setMobileIntroHeight();
});
