(function ($) {
  "use strict";


  /*--------------------------------------------------------------
    RegisterPlugin, ScrollTrigger, SplitText
  --------------------------------------------------------------*/
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false
  });




  // Preloader
  $('#preloader').delay(200).fadeOut('slow');






  // AOS Animation
  if ($("[data-aos]").length) {
    AOS.init({
      duration: '1200',
      disable: 'false',
      easing: 'ease',
      mirror: true
    });
  }

  // ===Datepicker===
  if ($("#datepicker").length) {
    $("#datepicker").datepicker();
  }


  $('input[name="time"]').ptTimeSelect();



  // Main Slider One
  if ($(".main-slider__carousel").length > 0) {
    const MainSliderCarousel = new Swiper('.main-slider__carousel', {
      "slidesPerView": 1,
      "spaceBetween": 0,
      "effect": 'fade',
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": "#main-slider-pagination",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": "#main-slider__swiper-button-next",
        "prevEl": "#main-slider__swiper-button-prev"
      },
      "autoplay": {
        "delay": 8000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "992": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "1200": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "1320": {
          "spaceBetween": 0,
          "slidesPerView": 1
        }
      },
    });
  }



  // Main Slider Two
  if ($(".main-slider-two__carousel").length > 0) {
    const MainSliderTwoCarousel = new Swiper('.main-slider-two__carousel', {
      "slidesPerView": 1,
      "spaceBetween": 0,
      "effect": 'fade',
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": "#main-slider-two-pagination",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": "#main-slider-two__swiper-button-next",
        "prevEl": "#main-slider-two__swiper-button-prev"
      },
      "autoplay": {
        "delay": 8000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "992": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "1200": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "1320": {
          "spaceBetween": 0,
          "slidesPerView": 1
        }
      },
    });
  }



  // Services One Carousel
  if ($(".services-one__carousel").length > 0) {
    const TestimonialTwoCarousel = new Swiper('.services-one__carousel', {
      "slidesPerView": 1,
      "spaceBetween": 30,
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": ".services-one-dot-style1",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": ".swiper-button-prev1",
        "prevEl": ".swiper-button-next1"
      },
      "autoplay": {
        "delay": 6000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 30,
          "slidesPerView": 2
        },
        "992": {
          "spaceBetween": 30,
          "slidesPerView": 3
        },
        "1200": {
          "spaceBetween": 30,
          "slidesPerView": 4
        },
        "1320": {
          "spaceBetween": 30,
          "slidesPerView": 4
        }
      },
    });
  }

  // Project One
  if ($(".project-one__carousel").length > 0) {
    const ProjectTwoCarousel = new Swiper('.project-one__carousel', {
      "slidesPerView": 4,
      "spaceBetween": 30,
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": ".swiper-dot-style1",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": ".swiper-button-prev1",
        "prevEl": ".swiper-button-next1"
      },
      "autoplay": {
        "delay": 8000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 30,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 30,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 30,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 30,
          "slidesPerView": 2
        },
        "992": {
          "spaceBetween": 30,
          "slidesPerView": 3
        },
        "1200": {
          "spaceBetween": 30,
          "slidesPerView": 3
        },
        "1320": {
          "spaceBetween": 30,
          "slidesPerView": 4
        },
        "1730": {
          "spaceBetween": 30,
          "slidesPerView": 4
        }
      },
    });
  }

  // Testimonial One
  if ($(".testimonial-one__carousel").length) {
    $(".testimonial-one__carousel").owlCarousel({
      loop: true,
      margin: 60,
      nav: false,
      dots: true,
      smartSpeed: 600,
      autoplay: true,
      autoplayTimeout: 7000,
      navText: [
        '<span class="icon-arrow-right"></span>',
        '<span class="icon-arrow-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1320: {
          items: 2,
        },
      },
    });
  }


  // ===Project Two Carousel===
  if ($(".project-two__carousel").length) {
    $(".project-two__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      smartSpeed: 500,
      autoplay: false,
      autoplayTimeout: 7000,
      navText: [
        '<span class="icon-right-arrow"></span>',
        '<span class="icon-right-arrow1"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
        1320: {
          items: 1,
        },
      },
    });
  }

  // ===Project Three===
  if ($(".project-two__single-box li").length) {
    $(".project-two__single-box li").each(function () {
      let self = $(this);

      self.on("mouseenter", function () {
        console.log($(this));
        $(".project-two__single-box li").removeClass("active");
        $(this).addClass("active");
      });
    });
  }


  //Client Testimonial Carousel
  if ($('.testimonial-two__carousel').length && $('.testimonial-two__thumb-carousel').length) {

    var bigimage = $(".testimonial-two__carousel");
    var thumbs = $(".testimonial-two__thumb-carousel");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: true,
        dots: false,
        loop: true,
        navText: [
          '<i class="icon-left-arrow" aria-hidden="true"></i>',
          '<i class="icon-right-arrow" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function () {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: false,
        navText: [
          '<i class="icon-left-arrow" aria-hidden="true"></i>',
          '<i class="icon-right-arrow" aria-hidden="true"></i>'
        ],
        smartSpeed: 700,
        slideBy: 4,
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 500, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 500, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 500, true);
      }
    }

    thumbs.on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 500, true);
    });
  }



  // Brand One Carousel
  if ($(".brand-one__carousel").length > 0) {
    const BrandOneCarousel = new Swiper('.brand-one__carousel', {
      "slidesPerView": 5,
      "spaceBetween": 10,
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": "#swiper-dot-style1",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": "#swiper-button-prev1",
        "prevEl": "#swiper-button-next1"
      },
      "autoplay": {
        "delay": 8000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 0,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 10,
          "slidesPerView": 2
        },
        "992": {
          "spaceBetween": 10,
          "slidesPerView": 3
        },
        "1200": {
          "spaceBetween": 10,
          "slidesPerView": 4
        },
        "1320": {
          "spaceBetween": 10,
          "slidesPerView": 5
        }
      },
    });
  }




  // Services Three Carousel
  if ($(".services-three__carousel").length > 0) {
    const swiper = new Swiper('.services-three__carousel', {
      "slidesPerView": 1,
      "spaceBetween": 0,
      "speed": 600,
      "loop": true,
      "pagination": {
        "el": "#swiper-dot-style1",
        "type": "bullets",
        "clickable": true
      },

      "navigation": {
        "nextEl": "#swiper-button-prev1",
        "prevEl": "#swiper-button-next1"
      },
      "autoplay": {
        "delay": 6000
      },
      "breakpoints": {
        "0": {
          "spaceBetween": 20,
          "slidesPerView": 1
        },
        "375": {
          "spaceBetween": 20,
          "slidesPerView": 1
        },
        "575": {
          "spaceBetween": 20,
          "slidesPerView": 1
        },
        "768": {
          "spaceBetween": 30,
          "slidesPerView": 2
        },
        "992": {
          "spaceBetween": 30,
          "slidesPerView": 2
        },
        "1200": {
          "spaceBetween": 30,
          "slidesPerView": 3
        },
        "1320": {
          "spaceBetween": 30,
          "slidesPerView": 3
        }
      },
    });
  }

  // ===Projects Details Carousel===
  if ($(".projects-details__img-carousel").length) {
    $(".projects-details__img-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      smartSpeed: 500,
      autoplay: false,
      autoplayTimeout: 7000,
      navText: [
        '<span class="icon-back"></span>',
        '<span class="icon-next"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
        1320: {
          items: 1,
        },
      },
    });
  }




  /* ================================
    Project Three Animmation Js Start
    ================================ */

  if (document.querySelector(".project-three__inner")) {

    ScrollTrigger.matchMedia({
      "(min-width: 1199px)": function () {

        const sections = gsap.utils.toArray(".project-three__single");
        const wrap = document.querySelector(".project-three__inner");


        // Initial setup (GPU smooth)
        gsap.set(sections, {
          scale: 1
        });

        sections.forEach((section, index) => {
          const isLast = index === sections.length - 1;

          gsap.to(section, {
            scale: isLast ? 1 : 0.82,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 14%",
              end: "bottom 80%",
              scrub: true,
              pin: true,
              pinSpacing: false,
              endTrigger: wrap,
              anticipatePin: 1,
              fastScrollEnd: true,
              markers: false
            }
          });
        });

      }
    });

  }

  // ===Tab One===
  if ($(".tab-box").length) {
    $(".tab-box .tabs-button-box .tab-btn-item").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).hasClass("tab-active")) {
        return false;
      } else {
        $(".tab-box .tabs-button-box .tab-btn-item").removeClass("active-btn");
        $(this).addClass("active-btn");
        $(".tab-box .tabs-content-box .tab").removeClass("tab-active");
        $(target).addClass("tab-active");
      }
    });
  }



  // ===Marquee===
  if ($(".marquee_mode").length) {
    $('.marquee_mode').marquee({
      speed: 20,
      gap: 20,
      delayBeforeStart: 0,
      direction: 'left',
      duplicated: true,
      pauseOnHover: true,
      startVisible: true,
    });
  }


  //Image Reveal Animation
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, {
        autoAlpha: 1,
      });
      tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });
    });
  }




  // custom coursor
  if ($(".custom-cursor").length) {

    var cursor = document.querySelector('.custom-cursor__cursor');
    var cursorinner = document.querySelector('.custom-cursor__cursor-two');
    var a = document.querySelectorAll('a');

    document.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });

    document.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + 'px';
      cursorinner.style.top = y + 'px';
    });

    document.addEventListener('mousedown', function () {
      cursor.classList.add('click');
      cursorinner.classList.add('custom-cursor__innerhover')
    });

    document.addEventListener('mouseup', function () {
      cursor.classList.remove('click')
      cursorinner.classList.remove('custom-cursor__innerhover')
    });

    a.forEach(item => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('custom-cursor__hover');
      });
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('custom-cursor__hover');
      });
    })
  }



  //Progress Count Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
        accY: -50
      }
    );
  }



  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
        accY: 0
      }
    );
  }



  // Accrodion
  if ($(".accrodion-grp").length) {
    var accrodionGrp = $(".accrodion-grp");
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accrodion");
      Self.addClass(accrodionName);
      Self.find(".accrodion .accrodion-content").hide();
      Self.find(".accrodion.active").find(".accrodion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accrodion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".accrodion-grp." + accrodionName)
                .find(".accrodion")
                .removeClass("active");
              $(".accrodion-grp." + accrodionName)
                .find(".accrodion")
                .find(".accrodion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accrodion-content").slideDown();
            }
          });
      });
    });
  }



  $(".contact-form-validated").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: false,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        Phone: {
          required: false,
          minlength: 6
        },
        phone: {
          required: false,
          minlength: 6
        },
        message: {
          required: false,
          minlength: 10
        }
      },
      messages: {
        name: {
          required: "Please enter your name.",
          minlength: "Name must be at least 2 characters."
        },
        email: {
          required: "Please enter your email.",
          email: "Please enter a valid email address."
        },
        Phone: {
          required: "Please enter your phone number.",
          minlength: "Please enter a valid phone number."
        },
        phone: {
          required: "Please enter your phone number.",
          minlength: "Please enter a valid phone number."
        },
        message: {
          required: "Please enter your message.",
          minlength: "Message must be at least 10 characters."
        }
      },
      submitHandler: function (form) {
        var $form = $(form);
        var $submitBtn = $form.find('button[type="submit"], input[type="submit"]');
        var originalBtnText = $submitBtn.val() || $submitBtn.text();
        var loadingText = $submitBtn.data("loading-text") || "Sending...";
        var $result = $form.find(".result");

        $submitBtn.prop("disabled", true).addClass("loading");
        if ($submitBtn.is("button")) $submitBtn.data("original-text", originalBtnText).text(loadingText);
        else if ($submitBtn.is("input")) $submitBtn.data("original-val", originalBtnText).val(loadingText);
        $result.removeClass("success error").text("");

        $.ajax({
          url: $form.attr("action"),
          type: "POST",
          data: $form.serialize(),
          success: function (response) {
            $result.text(response).addClass("success");
            $form.find('input[type="text"], input[type="email"], input[type="tel"], textarea').val("");
          },
          error: function (xhr) {
            var msg = "An error occurred. Please try again later.";
            if (xhr.responseText && xhr.responseText.trim().length > 0) {
              msg = xhr.responseText.trim();
            } else if (xhr.status === 0) {
              msg = "Network error. Please check your connection.";
            } else if (xhr.status >= 500) {
              msg = "Server error. Please try again later.";
            }
            $result.text(msg).addClass("error");
          },
          complete: function () {
            $submitBtn.prop("disabled", false).removeClass("loading");
            if ($submitBtn.is("button")) $submitBtn.text($submitBtn.data("original-text") || originalBtnText);
            else if ($submitBtn.is("input")) $submitBtn.val($submitBtn.data("original-val") || originalBtnText);
          }
        });
        return false;
      }
    });
  });



  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }




  //Chat Popup
  if ($('#chat-popup').length) {

    //Show Popup
    $('.chat-toggler').on('click', function () {
      $('#chat-popup').addClass('popup-visible');
    });
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $('#chat-popup').removeClass('popup-visible');
      }
    });
    //Hide Popup
    $('.close-chat,.chat-popup .overlay-layer').on('click', function () {
      $('#chat-popup').removeClass('popup-visible');
    });
  }


  function dynamicCurrentMenuClass(selector) {
    let fileName = window.location.pathname.split("/").pop() || ""; // Default to index.html if no file name


    // Remove existing 'current' classes to avoid duplicates
    selector.find("li").removeClass("current");

    // Iterate through all <li> elements, including nested ones
    selector.find("li").each(function () {
      let anchor = $(this).find("a").first(); // Get the first <a> in the <li>
      if (anchor.length && anchor.attr("href") === fileName) {
        $(this).addClass("current"); // Add 'current' to the matching <li>
        // Add 'current' to parent <li> if it exists (for dropdowns)
        let parentLi = $(this).closest("li.dropdown");
        if (parentLi.length) {
          parentLi.addClass("current");
        }
      }
    });

    // If no match is found, add 'current' to the first top-level <li> (Home)
    if (!selector.find("li.current").length) {
      selector.children("li").first().addClass("current");
    }
  }

  // Run the function if the main menu exists
  if ($(".main-menu__list").length) {
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }


  if ($(".main-menu__list").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu__list").outerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }
  if ($(".sticky-header__content").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".sticky-header__content");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }



  //Header Search
  if ($('.searcher-toggler-box').length) {
    $('.searcher-toggler-box').on('click', function (e) {
      e.preventDefault();
      $('body').addClass('search-active');
    });


    $('.close-search').on('click', function () {
      $('body').removeClass('search-active');
    });


    $('.search-popup .color-layer').on('click', function () {
      $('body').removeClass('search-active');
    });

  }


  // Odometer

  if ($(".odometer").length) {
    var odo = $(".odometer");
    odo.each(function () {
      $(this).appear(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }



  // WOW Animation

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }


  //Tabs Box

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }




  // ===Portfolio===
  function projectMasonaryLayout() {
    if ($(".masonary-layout").length) {
      $(".masonary-layout").isotope({
        layoutMode: "masonry"
      });
    }
    if ($(".post-filter").length) {
      $(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($(".post-filter.has-dynamic-filters-counter").length) {
      // var allItem = $('.single-filter-item').length;
      var activeFilterItem = $(".post-filter.has-dynamic-filters-counter").find(
        "li"
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this)
          .children(".filter-text")
          .append('<span class="count">' + count + "</span>");
      });
    }
  }


  // Smooth Menu Scroll

  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "90";
        } else {
          var headerH = "90";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
              scrollTop: $(target.attr("href")).offset().top - headerH + "px"
            },
            200,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        anchor.removeClass("current-menu-ancestor");
        anchor.removeClass("current_page_item");
        anchor.removeClass("current-menu-parent");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        var sections = $(this).attr("href");
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            var Sectionid = $(sections).attr("id");
            $(".one-page-scroll-menu").find("li").removeClass("current");
            $(".one-page-scroll-menu").find("li").removeClass("current-menu-ancestor");
            $(".one-page-scroll-menu").find("li").removeClass("current_page_item");
            $(".one-page-scroll-menu").find("li").removeClass("current-menu-parent");
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }






  /*-- Handle Scrollbar --*/
  function handleScrollbar() {
    const bodyHeight = $("body").height();
    const scrollPos = $(window).innerHeight() + $(window).scrollTop();
    let percentage = (scrollPos / bodyHeight) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    $(".scroll-to-top .scroll-to-top__inner").css("width", percentage + "%");
  }




  // Animation gsap 
  function title_animation() {
    var tg_var = jQuery('.sec-title-animation');
    if (!tg_var.length) {
      return;
    }
    const quotes = document.querySelectorAll(".sec-title-animation .title-animation");

    quotes.forEach(quote => {

      //Reset if needed
      if (quote.animation) {
        quote.animation.progress(1).kill();
        quote.split.revert();
      }

      var getclass = quote.closest('.sec-title-animation').className;
      var animation = getclass.split('animation-');
      if (animation[1] == "style4") return

      quote.split = new SplitText(quote, {
        type: "lines,words,chars",
        linesClass: "split-line"
      });
      gsap.set(quote, {
        perspective: 400
      });

      if (animation[1] == "style1") {
        gsap.set(quote.split.chars, {
          opacity: 0,
          y: "90%",
          rotateX: "-40deg"
        });
      }
      if (animation[1] == "style2") {
        gsap.set(quote.split.chars, {
          opacity: 0,
          x: "50"
        });
      }
      if (animation[1] == "style3") {
        gsap.set(quote.split.chars, {
          opacity: 0,
        });
      }
      quote.animation = gsap.to(quote.split.chars, {
        scrollTrigger: {
          trigger: quote,
          start: "top 90%",
        },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: .02
      });
    });
  }
  ScrollTrigger.addEventListener("refresh", title_animation);





  // ===Price Filter===
  function priceFilter() {
    if ($(".price-ranger").length) {
      $(".price-ranger #slider-range").slider({
        range: true,
        min: 0,
        max: 5000,
        values: [0, 3000],
        slide: function (event, ui) {
          $(".price-ranger .ranger-min-max-block .min").val("" + ui.values[0]);
          $(".price-ranger .ranger-min-max-block .max").val("" + ui.values[1]);
        },
      });
      $(".price-ranger .ranger-min-max-block .min").val(
        "" + $(".price-ranger #slider-range").slider("values", 0)
      );
      $(".price-ranger .ranger-min-max-block .max").val(
        "" + $(".price-ranger #slider-range").slider("values", 1)
      );
    }
  }



  // Quantity Number JS

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });






  // ===Checkout Payment===
  if ($(".checkout__payment__title").length) {
    $(".checkout__payment__item").find(".checkout__payment__content").hide();
    $(".checkout__payment__item--active").find(".checkout__payment__content").show();

    $(".checkout__payment__title").on("click", function (e) {
      e.preventDefault();

      $(this)
        .parents(".checkout__payment")
        .find(".checkout__payment__item")
        .removeClass("checkout__payment__item--active");
      $(this).parents(".checkout__payment").find(".checkout__payment__content").slideUp();

      $(this).parent().addClass("checkout__payment__item--active");
      $(this).parent().find(".checkout__payment__content").slideDown();
    });
  }





  // Product All Tab
  if ($(".product__all-tab").length) {
    $(".product__all-tab .tabs-button-box .tab-btn-item").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).hasClass("actve-tab")) {
        return false;
      } else {
        $(".product__all-tab .tabs-button-box .tab-btn-item").removeClass("active-btn-item");
        $(this).addClass("active-btn-item");
        $(".product__all-tab .tabs-content-box .tab-content-box-item").removeClass(
          "tab-content-box-item-active"
        );
        $(target).addClass("tab-content-box-item-active");
      }
    });
  }



  // Shop Details Carousel

  if ($("#shop-details-one__thumb").length) {
    let ShopDetailsThumb = new Swiper("#shop-details-one__thumb", {
      slidesPerView: 3,
      spaceBetween: 0,
      speed: 1400,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      loop: true,
      autoplay: {
        delay: 5000
      }
    });

    let ShopDetailsCarousel = new Swiper("#shop-details-one__carousel", {
      observer: true,
      observeParents: true,
      loop: true,
      speed: 1400,
      mousewheel: false,
      slidesPerView: 1,
      autoplay: {
        delay: 5000
      },
      thumbs: {
        swiper: ShopDetailsThumb
      },
      pagination: {
        el: '#testimonials-one__carousel-pagination',
        type: 'bullets',
        clickable: true
      },

      "navigation": {
        "nextEl": "#product-details__swiper-button-next",
        "prevEl": "#product-details__swiper-button-prev"
      },
    });
  }



  // Related Products Carousel
  if ($(".related-products__carousel").length) {
    $(".related-products__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: false,
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 2000,
      navText: [
        '<span class="icon-left-arrow"></span>',
        '<span class="icon-right-arrow"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 3,
        },
        1320: {
          items: 4,
        },
      },
    });
  }



  // window load event
  $(window).on("load", function () {

    projectMasonaryLayout();
    title_animation();
    priceFilter();



    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }





    // Curved Circle
    if ($(".main-slider__curved-circle").length) {
      $(".main-slider__curved-circle").circleType({
        position: "absolute",
        dir: 1,
        radius: 88,
        forceHeight: true,
        forceWidth: true,
      });
    }








  });



  // window scroll event

  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 300;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }

    OnePageMenuScroll();

  });

  $(window).on("scroll", function () {
    handleScrollbar();
    if ($(".sticky-header--one-page").length) {
      var headerScrollPos = 130;
      var stricky = $(".sticky-header--one-page");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("active");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("active");
      }
    }

    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });



  $('select:not(.ignore)').niceSelect();



})(jQuery);