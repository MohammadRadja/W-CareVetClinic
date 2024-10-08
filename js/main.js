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
    // Fungsi untuk menangani perilaku dropdown berdasarkan ukuran layar
    function handleDropdownToggle() {
      if ($(window).width() < 768) {
        // Panggil fungsi untuk menangani dropdown pada tampilan mobile
        handleMobileDropdown();
      } else {
        // Panggil fungsi untuk menangani dropdown pada tampilan desktop
        handleDesktopDropdown();
      }
    }

    // Fungsi untuk menangani dropdown pada tampilan mobile
    function handleMobileDropdown() {
      // Hapus event handler sebelumnya dan tambahkan event handler untuk dropdown pada tampilan mobile
      $("nav .dropdown > a")
        .off("click")
        .on("click", function (e) {
          e.preventDefault();
          var $dropdown = $(this).parent();
          var dropdownMenuHeight = $dropdown
            .find(".dropdown-menu")
            .outerHeight();

          if ($dropdown.hasClass("show")) {
            closeDropdown($dropdown);
          } else {
            openDropdown($dropdown, dropdownMenuHeight);
          }
        });

      // Tambahkan event handler untuk mengatur perilaku #gallery-menu saat dropdown dihover pada tampilan mobile
      $("#gallery-menu").hover(
        function () {
          openGalleryMenu();
        },
        function () {
          closeGalleryMenu();
        }
      );
    }

    // Fungsi untuk menangani dropdown pada tampilan desktop
    function handleDesktopDropdown() {
      // Hapus event handler sebelumnya dan tambahkan event handler untuk dropdown pada tampilan desktop
      $("nav .dropdown")
        .off("mouseenter mouseleave")
        .hover(
          function () {
            showDesktopDropdown($(this));
          },
          function () {
            closeDropdown($(this));
          }
        );
    }

    // Fungsi untuk membuka dropdown
    function openDropdown($dropdown, dropdownMenuHeight) {
      $dropdown.addClass("show");
      $dropdown.find("> a").attr("aria-expanded", true);
      $dropdown.find(".dropdown-menu").addClass("show");
      $("#gallery-menu")
        .addClass("dropdown-show")
        .css("margin-top", dropdownMenuHeight);
    }

    // Fungsi untuk menutup dropdown
    function closeDropdown($dropdown) {
      $dropdown.removeClass("show");
      $dropdown.find("> a").attr("aria-expanded", false);
      $dropdown.find(".dropdown-menu").removeClass("show");
      $("#gallery-menu").removeClass("dropdown-show").css("margin-top", 0);
    }

    // Fungsi untuk menampilkan #gallery-menu saat dropdown dihover pada tampilan desktop
    function showDesktopDropdown($dropdown) {
      var dropdownMenuHeight = $dropdown.find(".dropdown-menu").outerHeight();
      $dropdown.addClass("show");
      $dropdown.find("> a").attr("aria-expanded", true);
      $dropdown.find(".dropdown-menu").addClass("show");
      $("#gallery-menu").addClass("dropdown-show");
    }

    // Fungsi untuk menampilkan #gallery-menu
    function openGalleryMenu() {
      var $galleryMenu = $("#gallery-menu");
      var dropdownMenuHeight = $galleryMenu.outerHeight();
      $galleryMenu
        .addClass("dropdown-show")
        .css("margin-top", dropdownMenuHeight);
    }

    // Fungsi untuk menyembunyikan #gallery-menu
    function closeGalleryMenu() {
      var $galleryMenu = $("#gallery-menu");
      $dropdown.find("> a").attr("aria-expanded", false);
      $dropdown.find(".dropdown-menu").removeClass("show");
      // Hapus kelas dropdown-show dari #gallery-menu
      $galleryMenu.removeClass("dropdown-show");
    }

    // Inisialisasi handler untuk dropdown toggle
    handleDropdownToggle();

    // Re-inisialisasi handler dropdown toggle saat ukuran window berubah
    $(window).resize(function () {
      handleDropdownToggle();
    });

    //Tutup dropdown saat hover diluar dropdown
    $(document).on("mouseleave click", function (e) {
      if (
        !$(e.target).closest(".dropdown").length &&
        !$(e.target).is("#gallery-menu")
      ) {
        closeDropdown($(".dropdown.show")).stop(true, true);
      }
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
