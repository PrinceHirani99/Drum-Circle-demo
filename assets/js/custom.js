$(document).ready(function () {
  jQuery(window).scroll(function () {
    var sticky = jQuery("header"),
      scroll = jQuery(window).scrollTop();
    if (scroll >= 20) sticky.addClass("fixed");
    else sticky.removeClass("fixed");
  });

  $(".btn-menu").on("click", function () {
    $(".rightside").toggleClass("show");
    $(".btn-menu").toggleClass("active");
  });
  $(".main-menu li a").on("click", function (e) {
    $(".rightside").removeClass("show");
    $(".btn-menu").removeClass("active");
  });

  // $(".main-menu li a").on("click", function(e) {
  //     var href = $(this).attr('href');
  //     if(href && href.startsWith('#') && href.length > 1 && $(href).length){
  //         e.preventDefault();
  //         var headerOffset = 110;
  //         var targetTop = $(href).offset().top - headerOffset;

  //         $('html, body').stop().animate({ scrollTop: targetTop }, 650, 'swing');
  //     }
  //     $(".main-menu li a").removeClass("active");
  //     $(this).addClass("active");
  //     $('.rightside').removeClass('show');
  //     $('.btn-menu').removeClass('active');
  // });

  $(".accordion .accordion-item").on("click", function (e) {
    $(".accordion .accordion-item").removeClass("active");
    $(this).addClass("active");
  });

  var sectionIds = [
    "#banner",
    "#offerings",
    "#trusted",
    "#testimonials",
    "#faq",
    "#contact-us",
  ];
  function updateActiveLink() {
    var scrollTop = $(window).scrollTop();
    var winH = $(window).height();
    var docH = $(document).height();
    var headerOffset = $("header").hasClass("fixed") ? 90 : 130;
    var current = null;
    for (var i = 0; i < sectionIds.length; i++) {
      var id = sectionIds[i];
      var $sec = $(id);
      if ($sec.length) {
        var top = $sec.offset().top - headerOffset - 1;
        var bottom = top + $sec.outerHeight(true);
        if (scrollTop >= top && scrollTop < bottom) {
          current = id;
        }
      }
    }
    if (!current && scrollTop + winH + 2 >= docH) {
      if ($("#contact-us").length) current = "#contact-us";
    }
    if (!current) {
      current = sectionIds[0];
    }
    if (current) {
      $(".main-menu li a").removeClass("active");
      $(".main-menu li a[href='" + current + "']").addClass("active");
    }
  }

  $(window).on("scroll", updateActiveLink);
  $(window).on("load resize", updateActiveLink);
});
