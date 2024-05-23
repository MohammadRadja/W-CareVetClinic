(function ($) {
  "use strict";

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // //direct content
  // document.getElementById("row").addEventListener("click", function () {
  //   window.location.href = "../services.html"; // Mengarahkan ke URL yang ditentukan
  // });

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Scrollax
  $.Scrollax();

  var carousel = function () {
    $(".carousel-testimony").owlCarousel({
      autoplay: true,
      autoHeight: true,
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      dots: true,
      navText: [
        '<span class="ion-ios-arrow-back">',
        '<span class="ion-ios-arrow-forward">',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  };
  carousel();

  //Navbar & Dropdown
  $(document).ready(function () {
    // Fungsi untuk menangani toggle dropdown berdasarkan ukuran tampilan
    function handleDropdownToggle() {
      // Tentukan fungsi yang akan dipanggil berdasarkan ukuran layar
      var hoverFunction =
        $(window).width() < 768
          ? handleDropdownHoverMobile
          : $(window).width() > 768
          ? handleDropdownHoverDesktop
          : handleDropdownClose;

      // Pasang event handler hover pada dropdown
      $("nav .dropdown").hover(hoverFunction, handleDropdownClose);
    }

    // Fungsi untuk menangani hover dropdown untuk tampilan mobile
    function handleDropdownHoverMobile() {
      var $this = $(this);
      var dropdownMenuHeight = $this.find(".dropdown-menu").outerHeight();

      // Buka dropdown saat dihover
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      $this.find(".dropdown-menu").addClass("show");

      // Atur margin-top dari #gallery-menu
      $("#gallery-menu")
        .addClass("dropdown-show")
        .css("margin-top", dropdownMenuHeight);
    }

    // Fungsi untuk menangani hover dropdown untuk tampilan desktop
    function handleDropdownHoverDesktop() {
      var $this = $(this);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      $this.find(".dropdown-menu").addClass("show");
    }

    // Fungsi untuk menangani hover untuk dihilangkan
    function handleDropdownClose() {
      var $this = $(this);

      // Tutup dropdown saat hover out
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      $this.find(".dropdown-menu").removeClass("show");

      // Reset margin-top dari #gallery-menu
      $("#gallery-menu").removeClass("dropdown-show").css("margin-top", 0);
    }

    // Inisialisasi handler toggle dropdown
    handleDropdownToggle();

    // Re-inisialisasi handler toggle dropdown saat ukuran window berubah
    $(window).resize(function () {
      // Hapus event handler sebelumnya
      $("nav .dropdown > a").off("click");
      $(document).off("click");
      $("nav .dropdown").off("mouseenter mouseleave");

      // Inisialisasi kembali handler berdasarkan ukuran window yang baru
      handleDropdownToggle();
    });
  });

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
          $(".scroll-to-target").addClass("open");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
          $(".scroll-to-target").removeClass("open");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  var counter = function () {
    $(".ftco-counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step =
            $.animateNumber.numberStepFactories.separator(",");
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            // console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  $(".appointment_date").datepicker({
    format: "m/d/yyyy",
    autoclose: true,
  });
  $(".appointment_time").timepicker();
})(jQuery);

// Gallery Filter
$(window).on("load", function () {
  var $container = $("#gallery");
  if ($container.length > 0) {
    $container.isotope({
      itemSelector: ".ftco-animate",
      filter: "*",
      layoutMode: "fitRows", // Use 'fitRows' for masonry layout
    });
  }
  $("#filters a").on("click", function () {
    var $this = $(this);
    if ($this.hasClass("selected")) {
      return false;
    }
    var $optionSet = $this.parent(); // Menggunakan parent() untuk memilih elemen parent yang benar
    $optionSet.find(".selected").removeClass("selected");
    $this.addClass("selected");
    var selector = $(this).attr("data-filter");
    if ($container.length > 0) {
      $container.isotope({
        filter: selector,
      });
    }
    return false;
  });
});
