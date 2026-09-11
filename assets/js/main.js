(function ($) {
  "use strict";

  function initTyped() {
    if ($('.typed').length && typeof Typed !== 'undefined') {
      var items = $('.typed').data('typed-items');
      if (items) {
        new Typed('.typed', {
          strings: items.split(','),
          loop: true,
          typeSpeed: 55,
          backSpeed: 30,
          backDelay: 1800
        });
      }
    }
  }

  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 70 });
    }
  }

  function setActiveNav() {
    var scrollPos = $(window).scrollTop() + 180;
    $('section[id]').each(function () {
      var top = $(this).offset().top;
      var bottom = top + $(this).outerHeight();
      if (scrollPos >= top && scrollPos <= bottom) {
        var id = $(this).attr('id');
        $('.nav-menu li').removeClass('active');
        $('.nav-menu a[href="#' + id + '"]').parent().addClass('active');
      }
    });
  }

  $(document).on('click', '.nav-menu a[href^="#"]', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top }, 650, 'swing');
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function () {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).on('click', function (e) {
    if ($('body').hasClass('mobile-nav-active') && !$(e.target).closest('#header, .mobile-nav-toggle').length) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
    }
  });

  $(window).on('scroll', function () {
    setActiveNav();
    if ($(this).scrollTop() > 250) $('.back-to-top').fadeIn(200);
    else $('.back-to-top').fadeOut(200);
  });

  $('.back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 650);
  });

  $(function () {
    initTyped();
    initAOS();
    setActiveNav();
  });
})(jQuery);
