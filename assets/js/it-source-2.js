/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
(function () {
  "use strict";

  var Itsource_2 = {
    init: function () {
      this.Basic.init();
    },

    Basic: {
      init: function () {
        this.preloader();
        this.Animation();
        this.StickeyHeader();
        this.MobileMenu();
        this.BackgroundImage();
        this.counterUp();
        this.scrollTop();
        this.videoBox();
        this.CarouselSlider();
      },
      preloader: function () {
        jQuery(window).on("load", function () {
          jQuery("#preloader").fadeOut("slow", function () {
            jQuery(this).remove();
          });
        });
      },
      Animation: function () {
        if ($(".wow").length) {
          var wow = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: true,
            live: true,
          });
          wow.init();
        }
      },
      StickeyHeader: function () {
        jQuery(window).on("scroll", function () {
          if (jQuery(window).scrollTop() > 100) {
            jQuery(".it-nw-header-area").addClass("it-nw-header-sticky");
          } else {
            jQuery(".it-nw-header-area").removeClass("it-nw-header-sticky");
          }
        });
        $(".it-nw-main-navigation ul li a").on("click", function () {
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            var target = $(this.hash);
            target = target.length
              ? target
              : $('[name="DCSext.Level"' + this.hash.slice(1) + "]");
            if (target.length) {
              $("html, body").animate(
                {
                  scrollTop: target.offset().top - 50,
                },
                1000
              );
              return false;
            }
          }
        });
      },
      MobileMenu: function () {
        $(".it_nw_open_it_nw_mobile_menu").on("click", function () {
          $(".it_nw_it_nw_mobile_menu_wrap").toggleClass(
            "it_nw_it_nw_mobile_menu_on"
          );
        });

        $(".it_nw_open_it_nw_mobile_menu").on("click", function () {
          $("body").toggleClass("it_nw_it_nw_mobile_menu_overlay");
        });
        if ($(".mobile_menu-dropdown li.dropdown ul").length) {
          $(".mobile_menu-dropdown li.dropdown").append(
            '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
          );
          $(".mobile_menu-dropdown li.dropdown .dropdown-btn").on(
            "click",
            function () {
              $(this).prev("ul").slideToggle(500);
            }
          );
        }
        $(".dropdown-btn").on("click", function () {
          $(this).toggleClass("toggle-open");
        });
      },
      BackgroundImage: function () {
        $("[data-background]").each(function () {
          $(this).css(
            "background-image",
            "url(" + $(this).attr("data-background") + ")"
          );
        });
      },
      scrollTop: function () {
        $(window).on("scroll", function () {
          if ($(this).scrollTop() > 200) {
            $(".scrollup").fadeIn();
          } else {
            $(".scrollup").fadeOut();
          }
        });

        $(".scrollup").on("click", function () {
          $("html, body").animate(
            {
              scrollTop: 0,
            },
            800
          );
          return false;
        });
      },
      counterUp: function () {
        if ($(".counter").length) {
          jQuery(".counter").counterUp({
            delay: 50,
            time: 2000,
          });
        }
      },
      videoBox: function () {
        jQuery(".video_box").magnificPopup({
          disableOn: 200,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      },
      CarouselSlider: function () {
        $(".it-nw-project-slider-area").owlCarousel({
          margin: 30,
          responsiveClass: true,
          nav: true,
          dots: false,
          loop: true,
          center: true,
          autoplay: false,
          navText: [
            "<i class='fas fa-arrow-left'></i>",
            "<i class='fas fa-arrow-right'></i>",
          ],
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1,
            },
            400: {
              items: 1,
            },
            600: {
              items: 1,
            },
            700: {
              items: 2,
            },
            1000: {
              items: 2,
            },
          },
        });
        $(".it-nx-testimonial-slider").owlCarousel({
          margin: 30,
          responsiveClass: true,
          nav: false,
          dots: true,
          autoplay: false,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1,
            },
            400: {
              items: 1,
            },
            600: {
              items: 1,
            },
            700: {
              items: 1,
            },
            1000: {
              items: 2,
            },
          },
        });
        $(".it-nw-blog-slider").owlCarousel({
          margin: 30,
          responsiveClass: true,
          nav: false,
          dots: true,
          autoplay: false,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1,
            },
            400: {
              items: 1,
            },
            600: {
              items: 1,
            },
            700: {
              items: 1,
            },
            1000: {
              items: 2,
            },
          },
        });
      },
    },
  };
  jQuery(document).ready(function () {
    Itsource_2.init();
  });
})();

$("input:checkbox").change(function () {
  console.log("changed");
  if ($(this).is(":checked")) {
    $("#menuu").addClass("menu-active");
  } else {
    $("#menuu").removeClass("menu-active");
  }
});

// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll(".item"),
  controls = document.querySelectorAll(".control"),
  headerItems = document.querySelectorAll(".item-header"),
  descriptionItems = document.querySelectorAll(".item-description"),
  activeDelay = 0.76,
  interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach((control) =>
      control.addEventListener("click", (e) => {
        slider.clickedControl(e);
      })
    );
    controls[current].classList.add("active");
    items[current].classList.add("active");
  },
  nextSlide: () => {
    // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add("active");
    items[current].classList.add("active");
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => {
    // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add("active");
    items.forEach((item, index) => {
      if (index === dataIndex) {
        // Add active class to corresponding slide
        item.classList.add("active");
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => {
    // Remove active classes
    items.forEach((item) => item.classList.remove("active"));
    controls.forEach((control) => control.classList.remove("active"));
  },
  transitionDelay: (items) => {
    // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach((item) => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
        delay;

      item.classList.value === "item-header"
        ? (seconds = 0.015)
        : (seconds = 0.007);

      children.forEach((child) => {
        // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains("active")
            ? (delay = count * seconds + activeDelay)
            : (delay = count * seconds);
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  },
};

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();
$(function () {
  $(".typed").typed({
    strings: [
      "Insurance",
      "Banking",
      "Retail",
      "Finance",
      "Telecom and Media",
      "Transportation",
    ],
    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
    stringsElement: null,
    // typing speed
    typeSpeed: 30,
    // time before typing starts
    startDelay: 1200,
    // backspacing speed
    backSpeed: 20,
    // time before backspacing
    backDelay: 500,
    // loop
    loop: true,
    // false = infinite
    loopCount: 5,
    // show cursor
    showCursor: false,
    // character for cursor
    cursorChar: "|",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: "html",
    // call when done callback function
    callback: function () {},
    // starting callback function before each string
    preStringTyped: function () {},
    //callback for every typed string
    onStringTyped: function () {},
    // callback for reset
    resetCallback: function () {},
  });
});

particlesJS("particles-js", {
  particles: {
    number: {
      value: 380,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

particlesJS("particles-test", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

requestAnimationFrame();
