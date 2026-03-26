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
    "#ips",
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


        $('.offerings-carousel').owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
          ],
          dots: false,
          autoplay: false,
       
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 2
            },
            992: {
              items: 3
            }
          }
        });

        // Initialize Owl Carousel for video testimonials
        $('.video-testimonials-carousel').owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
          ],
          dots: false,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 2
            },
            992: {
              items: 3
            }
          }
        });


        // IP's section hover video play functionality
        $(document).on('mouseenter', '.owl-carousel .offering-card .bg-video', function() {
          console.log('Mouse entered IP card');
          var $video = $(this).find('video');
          console.log('Found video:', $video.length);
          if ($video.length > 0) {
            console.log('Attempting to play video');
            $video[0].play().catch(function(error) {
              console.log('Hover play error:', error);
            });
          }
        });

        $(document).on('mouseleave', '.owl-carousel .offering-card .bg-video', function() {
          console.log('Mouse left IP card');
          var $video = $(this).find('video');
          if ($video.length > 0) {
            console.log('Pausing video');
            $video[0].pause();
          }
        });

        // Video testimonials play/pause functionality
        $('.video-wrapper .play-button').on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          var $videoWrapper = $(this).closest('.video-wrapper');
          var $video = $videoWrapper.find('video');
          var $allVideoWrappers = $('.video-wrapper');
          var $allVideos = $('.video-wrapper video');
          
          console.log('Video testimonial play button clicked', $video.length);
          
          if ($video.length > 0) {
            if ($videoWrapper.hasClass('playing')) {
              // Pause current video
              $video[0].pause();
              $videoWrapper.removeClass('playing');
              console.log('Video testimonial paused');
            } else {
              // Pause all other videos first
              $allVideos.each(function() {
                if (!$(this).closest('.video-wrapper').is($videoWrapper)) {
                  this.pause();
                  $(this).closest('.video-wrapper').removeClass('playing');
                }
              });
              
              // Play current video
              $video[0].play().then(function() {
                $videoWrapper.addClass('playing');
                console.log('Video testimonial playing');
              }).catch(function(error) {
                console.log('Video testimonial play error:', error);
                try {
                  $video[0].play();
                  $videoWrapper.addClass('playing');
                } catch(err) {
                  console.log('Alternative play failed:', err);
                }
              });
            }
          }
        });

        // Video wrapper click functionality
        $('.video-wrapper').on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          var $playButton = $(this).find('.play-button');
          var $videoWrapper = $(this);
          
          console.log('Video wrapper clicked, triggering play button');
          
          // Add visual feedback
          $videoWrapper.addClass('clicked');
          setTimeout(function() {
            $videoWrapper.removeClass('clicked');
          }, 200);
          
          // Trigger play button click
          $playButton.trigger('click');
        });

});
