"use strict";
// -------------------------------------------------------------------------- //
//                              MEDIA QUERY MATCH                             //
// -------------------------------------------------------------------------- //
exports.__esModule = true;
var windowQuery = window.matchMedia("(min-width: 980px)");
var gsap_1 = require("gsap");
//* -------------------------------------------------------------------------- *//
//*                                   CURSOR                                   *//
//* -------------------------------------------------------------------------- *//
if (windowQuery) {
    // ▶ cojea gabriel - thanks a bunch dude - cursor ◀
    var cursor_1 = document.querySelector("#cursor");
    var cursorCircle_1 = cursor_1.querySelector(".cursor__circle");
    var mouse_1 = { x: -100, y: -100 }; // mouse pointer's coordinates
    var pos_1 = { x: 0, y: 0 }; // cursor's coordinates
    var speed_1 = 0.4; // between 0 and 1
    var updateCoordinates = function (e) {
        mouse_1.x = e.clientX;
        mouse_1.y = e.clientY;
    };
    window.addEventListener("mousemove", updateCoordinates);
    var getAngle_1 = function (diffX, diffY) {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
    };
    var getSqueeze_1 = function (diffX, diffY) {
        var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        var maxSqueeze = 0.45;
        var accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    };
    var updateCursor_1 = function () {
        var diffX = Math.round(mouse_1.x - pos_1.x);
        var diffY = Math.round(mouse_1.y - pos_1.y);
        pos_1.x += diffX * speed_1;
        pos_1.y += diffY * speed_1;
        var angle = getAngle_1(diffX, diffY);
        var squeeze = getSqueeze_1(diffX, diffY);
        var scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
        var rotate = "rotate(" + angle + "deg)";
        var translate = "translate3d(" + pos_1.x + "px ," + pos_1.y + "px, 0)";
        cursor_1.style.transform = translate;
        cursorCircle_1.style.transform = rotate + scale;
    };
    var loop_1 = function () {
        updateCursor_1();
        requestAnimationFrame(loop_1);
    };
    requestAnimationFrame(loop_1);
    var cursorModifiers = document.querySelectorAll("[data-cursor-class]");
    cursorModifiers.forEach(function (cursorModifier) {
        cursorModifier.addEventListener("mouseenter", function () {
            var className = this.getAttribute("data-cursor-class");
            cursor_1.classList.add(className);
        });
        cursorModifier.addEventListener("mouseleave", function () {
            var className = this.getAttribute("data-cursor-class");
            cursor_1.classList.remove(className);
        });
    });
}
gsap_1.gsap.from(".container", {
    duration: 1,
    opacity: 0
});
