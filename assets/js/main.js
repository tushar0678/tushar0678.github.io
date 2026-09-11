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

  function applyHeroLayoutFix() {
    var style = document.getElementById('hero-layout-hard-fix');
    if (!style) {
      style = document.createElement('style');
      style.id = 'hero-layout-hard-fix';
      document.head.appendChild(style);
    }

    style.textContent = `
      /* FINAL HERO LAYOUT: reserve a completely separate lane for the right visual. */
      .hero-section { overflow: hidden !important; }
      .hero-section .hero-container {
        position: relative !important;
        z-index: 5 !important;
        width: 52% !important;
        max-width: 690px !important;
        padding-right: 0 !important;
      }
      .hero-section h1 {
        position: relative !important;
        z-index: 6 !important;
        width: 100% !important;
        max-width: 690px !important;
        white-space: normal !important;
        overflow: visible !important;
        font-size: clamp(42px, 3.55vw, 52px) !important;
        letter-spacing: -1.8px !important;
      }
      .hero-section h1 span {
        white-space: normal !important;
        display: inline !important;
      }
      .hero-section:after {
        right: 2.5% !important;
        left: auto !important;
        width: min(31%, 450px) !important;
        min-width: 0 !important;
        max-width: 450px !important;
        height: 400px !important;
        z-index: 1 !important;
      }
      @media (max-width: 1250px) {
        .hero-section .hero-container { width: 51% !important; max-width: 610px !important; }
        .hero-section h1 { font-size: clamp(40px, 3.45vw, 48px) !important; }
        .hero-section:after { width: min(30%, 390px) !important; }
      }
      @media (max-width: 1050px) {
        .hero-section:after { display: none !important; }
        .hero-section .hero-container { width: 100% !important; max-width: 760px !important; }
        .hero-section h1 { max-width: 760px !important; }
      }
      @media (max-width: 900px) {
        .hero-section { padding-left: 7% !important; padding-right: 7% !important; }
        .hero-section h1 { font-size: clamp(38px, 8vw, 48px) !important; letter-spacing: -1px !important; }
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
    applyHeroLayoutFix();
    initTyped();
    initAOS();
    setActiveNav();
  });
})(jQuery);
