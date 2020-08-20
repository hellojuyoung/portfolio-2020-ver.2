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
  var clickBtn = $('a, .publish-list .tit, button');

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
  setModalContHeight();
  setMobileIntroHeight();
});

var windowH;

//nav 스크롤 이벤트
function navOnTop() {
  $(window).scroll(function () {
    var windowTop = $(window).scrollTop();
    var introH = $(".intro").height();
    var navH = $("#nav").height();

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
  var navigator = $(".navigation li");
  var idContent = $(".scroll-cont");
  var scrollArea = $("html, body");

  //해당 섹션 스크롤!
  $(function () {
    navigator.on("click", function () {
      var thisIdx = $(this).index(),
        target = idContent.eq(thisIdx),
        targetPosition = target.offset().top - 100;

      scrollArea.stop().animate({
        scrollTop: targetPosition
      }, 500);

      //a href="#"
      return false;
    });
  });



  //스크롤시 nav list에 class 추가
  $(window).on("scroll", function () {

    windowH = $(window).height();

    var windowTop = $(window).scrollTop();
    var pageH = $("html, body").height();
    var navH = $("#nav").height();

    var endOfScroll = pageH - windowH - 100;

    $.each(idContent, function (idx) {
      var target = idContent.eq(idx),
        //i = target.index(),
        targetTop = target.offset().top - navH - 10;

      var introH = $(".intro").height();

      //contact 화면 최하단 스크롤시 클래스 추가
      if (windowTop >= endOfScroll) {
        $(".navigation li").last().addClass("on").siblings().removeClass("on");
      }

      //
      if (targetTop <= windowTop) {
        navigator.removeClass('on');
        navigator.eq(idx).addClass('on');
      }
      if (!(introH <= windowTop)) {
        navigator.removeClass('on');
      }

    })

  });
}



//scrollTop 이벤트
function scrollTop() {
  $(window).scroll(function () {
    var windowTop = $(window).scrollTop();

    if (windowTop >= 1000) {
      $(".scroll-top-wrap").addClass("on");
    } else {
      $(".scroll-top-wrap").removeClass("on");
    }

  });

  $(".scroll-top-wrap").on("click", function () {
    $("html, body").animate({
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
  $(".modal").find("on").removeClass("on");
}


//modal .design-img height = window height
function setModalContHeight() {
  windowH = $(window).height();

  $(".design-img").css("height", windowH + "px");
}

//mobile .intro height setting
function setMobileIntroHeight() {
  windowH = $(window).height();
  var windowW = $(window).width();
  var navH = $("#nav").height();

  if (windowW <= 1024) {
    $(".intro").css("height", windowH - navH + "px");
  } else {
    $(".intro").css("height", 850);
  }
}


//publish 리스트 스크롤 애니메이션
function showUpList() {
  var delayPosition = 200;
  var windowheight;

  $(window).on('resize', function () {
    insertTargetPosition();
  });

  $(window).on('scroll', function () {
    var position = $(window).scrollTop() + windowheight - delayPosition;

    $('.accordian>li').each(function () {
      if (!$(this).hasClass('on') && $(this).data('offsetTop') < position) {
        $(this).addClass('on');
        $(this).removeClass('ready');
      }
    });
  });

  //target position
  function insertTargetPosition() {
    windowheight = $(window).height();
    $('.accordian>li').each(function () {
      $(this).data('offsetTop', ($(this).offset().top));
    });
  }

  insertTargetPosition();

}






//run!
$(document).ready(function () {
  navOnTop();
  scrollTop();
  scrollMenu();
  showUpList();
  setModalContHeight();
  setMobileIntroHeight();
});