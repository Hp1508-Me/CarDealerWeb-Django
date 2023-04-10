/*!
 * Bootstrap-submenu v2.0.4 (https://vsn4ik.github.io/bootstrap-submenu/)
 * Copyright 2014-2017 Vasily A. (https://github.com/vsn4ik)
 * Licensed under the MIT license
 */

"use strict";
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  function b(b) {
    (this.$element = a(b)),
      (this.$menu = this.$element.closest(".dropdown-menu")),
      (this.$main = this.$menu.parent()),
      (this.$items = this.$menu.children(".dropdown-submenu")),
      this.init();
  }
  function c(b) {
    (this.$element = a(b)),
      (this.$main = this.$element.parent()),
      (this.$menu = this.$main.children(".dropdown-menu")),
      (this.$subs = this.$main.siblings(".dropdown-submenu")),
      (this.$items = this.$menu.children(".dropdown-submenu")),
      this.init();
  }
  function d(b) {
    (this.$element = a(b)),
      (this.$main = this.$element.parent()),
      (this.$menu = this.$main.children(".dropdown-menu")),
      (this.$items = this.$menu.children(".dropdown-submenu")),
      this.init();
  }
  (b.prototype = {
    init: function () {
      this.$element.on("keydown", a.proxy(this, "keydown"));
    },
    close: function () {
      this.$main.removeClass("open"), this.$items.trigger("hide.bs.submenu");
    },
    keydown: function (a) {
      27 == a.keyCode &&
        (a.stopPropagation(),
        this.close(),
        this.$main.children("a, button").trigger("focus"));
    },
  }),
    a.extend(c.prototype, b.prototype, {
      init: function () {
        this.$element.on({
          click: a.proxy(this, "click"),
          keydown: a.proxy(this, "keydown"),
        }),
          this.$main.on("hide.bs.submenu", a.proxy(this, "hide"));
      },
      click: function (a) {
        a.preventDefault(), a.stopPropagation(), this.toggle();
      },
      hide: function (a) {
        a.stopPropagation(), this.close();
      },
      open: function () {
        this.$main.addClass("open"), this.$subs.trigger("hide.bs.submenu");
      },
      toggle: function () {
        this.$main.hasClass("open") ? this.close() : this.open();
      },
      keydown: function (b) {
        32 == b.keyCode && b.preventDefault(),
          a.inArray(b.keyCode, [13, 32]) != -1 && this.toggle();
      },
    }),
    (d.prototype = {
      init: function () {
        this.$menu.off("keydown.bs.dropdown.data-api"),
          this.$menu.on("keydown", a.proxy(this, "itemKeydown")),
          this.$menu.find("li > a").each(function () {
            new b(this);
          }),
          this.$menu.find(".dropdown-submenu > a").each(function () {
            new c(this);
          }),
          this.$main.on("hidden.bs.dropdown", a.proxy(this, "hidden"));
      },
      hidden: function () {
        this.$items.trigger("hide.bs.submenu");
      },
      itemKeydown: function (b) {
        if (a.inArray(b.keyCode, [38, 40]) != -1) {
          b.preventDefault(), b.stopPropagation();
          var c = this.$menu.find("li:not(.disabled):visible > a"),
            d = c.index(b.target);
          if (38 == b.keyCode && 0 !== d) d--;
          else {
            if (40 != b.keyCode || d === c.length - 1) return;
            d++;
          }
          c.eq(d).trigger("focus");
        }
      },
    });
  var e = a.fn.submenupicker;
  return (
    (a.fn.submenupicker = function (b) {
      var c = this instanceof a ? this : a(b);
      return c.each(function () {
        var b = a.data(this, "bs.submenu");
        b || ((b = new d(this)), a.data(this, "bs.submenu", b));
      });
    }),
    (a.fn.submenupicker.Constructor = d),
    (a.fn.submenupicker.noConflict = function () {
      return (a.fn.submenupicker = e), this;
    }),
    a.fn.submenupicker
  );
});
// (function (factory) {
//   if (typeof define === "function" && define.amd) {
//     // AMD. Register as an anonymous module
//     define(["jquery"], factory);
//   } else if (typeof exports === "object") {
//     // Node/CommonJS
//     module.exports = factory(require("jquery"));
//   } else {
//     // Browser globals
//     factory(jQuery);
//   }
// })(function ($) {
//   class DropdownSubmenu {
//     constructor(element) {
//       this.element = element.parentElement;
//       this.menuElement = this.element.querySelector(".dropdown-menu");

//       this.init();
//     }

//     init() {
//       $(this.element).off("keydown.bs.dropdown.data-api");

//       this.menuElement.addEventListener("keydown", this.itemKeydown.bind(this));

//       const dropdownItemNodeList =
//         this.menuElement.querySelectorAll(".dropdown-item");

//       Array.from(dropdownItemNodeList).forEach((element) => {
//         element.addEventListener(
//           "keydown",
//           this.handleKeydownDropdownItem.bind(this)
//         );
//       });

//       $(this.menuElement).on(
//         "keydown",
//         ".dropdown-submenu > .dropdown-item",
//         this.handleKeydownSubmenuDropdownItem.bind(this)
//       );
//       $(this.menuElement).on(
//         "click",
//         ".dropdown-submenu > .dropdown-item",
//         this.handleClickSubmenuDropdownItem.bind(this)
//       );
//       $(this.element).on("hidden.bs.dropdown", () => {
//         this.close(this.menuElement);
//       });
//     }

//     handleKeydownDropdownItem(event) {
//       // 27: Esc
//       if (event.keyCode !== 27) {
//         return;
//       }

//       event.target.closest(".dropdown-menu").previousElementSibling.focus();
//       event.target.closest(".dropdown-menu").classList.remove("show");
//     }

//     handleKeydownSubmenuDropdownItem(event) {
//       // 32: Spacebar
//       if (event.keyCode !== 32) {
//         return;
//       }

//       // NOTE: Off vertical scrolling
//       event.preventDefault();

//       this.toggle(event.target);
//     }

//     handleClickSubmenuDropdownItem(event) {
//       event.stopPropagation();

//       this.toggle(event.target);
//     }

//     itemKeydown(event) {
//       // 38: Arrow up, 40: Arrow down
//       if (![38, 40].includes(event.keyCode)) {
//         return;
//       }

//       // NOTE: Off vertical scrolling
//       event.preventDefault();

//       event.stopPropagation();

//       const itemNodeList = this.element.querySelectorAll(
//         ".show > .dropdown-item:not(:disabled):not(.disabled), .show > .dropdown > .dropdown-item"
//       );

//       let index = Array.from(itemNodeList).indexOf(event.target);

//       if (event.keyCode === 38 && index !== 0) {
//         index--;
//       } else if (event.keyCode === 40 && index !== itemNodeList.length - 1) {
//         index++;
//       } else {
//         return;
//       }

//       itemNodeList[index].focus();
//     }

//     toggle(element) {
//       const dropdownElement = element.closest(".dropdown");
//       const parentMenuElement = dropdownElement.closest(".dropdown-menu");
//       const menuElement = dropdownElement.querySelector(".dropdown-menu");
//       const isOpen = menuElement.classList.contains("show");

//       this.close(parentMenuElement);

//       menuElement.classList.toggle("show", !isOpen);
//     }

//     close(menuElement) {
//       const menuNodeList = menuElement.querySelectorAll(".dropdown-menu.show");

//       Array.from(menuNodeList).forEach((element) => {
//         element.classList.remove("show");
//       });
//     }
//   }

//   // For AMD/Node/CommonJS used elements (optional)
//   // http://learn.jquery.com/jquery-ui/environments/amd/
//   $.fn.submenupicker = function (elements) {
//     const $elements = this instanceof $ ? this : $(elements);

//     return $elements.each(function () {
//       let data = $.data(this, "bs.submenu");

//       if (!data) {
//         data = new DropdownSubmenu(this);

//         $.data(this, "bs.submenu", data);
//       }
//     });
//   };

//   return DropdownSubmenu;
// });
