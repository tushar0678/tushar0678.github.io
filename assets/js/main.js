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

  function fixHeroLayout() {
    var style = document.getElementById('hero-layout-fix');
    if (!style) {
      style = document.createElement('style');
      style.id = 'hero-layout-fix';
      document.head.appendChild(style);
    }

    style.textContent = `
      /* Keep the hero copy and engineering panel in separate visual lanes. */
      .hero-section { padding-left: 6%; padding-right: 4%; }
      .hero-container { width: 58%; max-width: 760px; padding-right: 18px; }
      .hero-section h1 {
        white-space: nowrap;
        font-size: clamp(42px, 3vw, 50px);
        letter-spacing: -2.2px;
        max-width: 100%;
      }
      .hero-section h1 span { white-space: nowrap; }
      .hero-section:after {
        right: 3.5%;
        width: 35%;
        max-width: 500px;
        min-width: 360px;
        height: 400px;
        z-index: 1;
      }
      @media (max-width: 1199px) {
        .hero-container { width: 56%; max-width: 700px; }
        .hero-section h1 { font-size: clamp(40px, 3.6vw, 48px); }
        .hero-section:after { right: 3%; width: 37%; min-width: 330px; }
      }
      @media (max-width: 900px) {
        .hero-container { width: 100%; max-width: none; padding-right: 0; }
        .hero-section h1 { white-space: normal; letter-spacing: -1px; }
      }
    `;
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
    fixHeroLayout();
    initTyped();
    initAOS();
    setActiveNav();
  });
})(jQuery);
