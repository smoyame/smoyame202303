"use strict";
exports.__esModule = true;
//* -------------------------------------------------------------------------- *//
//*                              Initial + Imports                             *//
//* -------------------------------------------------------------------------- *//
var gsap_1 = require("gsap");
var CSSRulePlugin_1 = require("../node_modules/gsap/CSSRulePlugin");
var CustomEase_1 = require("../node_modules/gsap/CustomEase");
var ScrollTrigger_1 = require("../node_modules/gsap/ScrollTrigger");
var SplitText_1 = require("../node_modules/gsap/SplitText");
var ScrollSmoother_1 = require("../node_modules/gsap/ScrollSmoother");
var ScrollToPlugin_1 = require("../node_modules/gsap/ScrollToPlugin");
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger, ScrollSmoother_1.ScrollSmoother, CSSRulePlugin_1.CSSRulePlugin, CustomEase_1.CustomEase, SplitText_1.SplitText, ScrollToPlugin_1.ScrollToPlugin);
CustomEase_1.CustomEase.create("growIn", "M0,0 C0.072,0.516 0.234,0.794 0.312,0.866 0.384,0.932 0.448,1 1,1 ");
CustomEase_1.CustomEase.create("charIn", "M0,0 C0.104,0.182 0.502,0.802 1,1 ");
// -------------------------------------------------------------------------- //
//                              MEDIA QUERY MATCH                             //
// -------------------------------------------------------------------------- //
var windowQuery = window.matchMedia("(min-width: 980px)");
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
    var thediffX = Math.round(mouse_1.x - pos_1.x);
    var thediffY = Math.round(mouse_1.y - pos_1.y);
    var theAngle = (Math.atan2(thediffY, thediffX) * 180) / Math.PI;
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
    var disabledCards = document.querySelectorAll(".proj-card__wip");
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
    disabledCards.forEach(function (disabledCard) {
        disabledCard.addEventListener("mouseenter", function () {
            var className = "disabled-notif";
            cursor_1.classList.add(className);
        });
        disabledCard.addEventListener("mouseleave", function () {
            var className = "disabled-notif";
            cursor_1.classList.remove(className);
        });
    });
}
//* -------------------------------------------------------------------------- *//
//*                                    GSAP                                    *//
//* -------------------------------------------------------------------------- *//
ScrollSmoother_1.ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1
});
//* -------------------------------------------------------------------------- *//
//*                            Base values and anims                           *//
var stdInY = 150;
var stdDelay = 0.125;
var stdDuration = 1.25;
var stdEaseIn = "growIn";
var stdStagger = 0.02;
var fadeInUp = function (element) {
    gsap_1.gsap.from(element, {
        duration: stdDuration,
        y: stdInY,
        opacity: 0,
        ease: stdEaseIn,
        delay: stdDelay
    });
};
//* -------------------------------------------------------------------------- *//
//*                              SplitText Effects                             *//
//* -------------------------------------------------------------------------- *//
//*                               HERO - ANIMATION                             *//
if (document.querySelector(".main__hero-text") !== null) {
    var theElement = ".main__hero-text";
    var splitHeroText = new SplitText_1.SplitText(theElement, {
        type: "chars, lines",
        linesClass: "splitLine splitLine++",
        charsClass: "splitChar splitChar++"
    });
    var hero_1 = document.querySelector(".main__hero");
    var homeSplitTextTL_1 = gsap_1.gsap.timeline({ delay: stdDelay });
    var animateChars = function (chars, ease, overlap) {
        var yPercTravel = 75;
        homeSplitTextTL_1.from(chars, {
            opacity: 0,
            yPercent: yPercTravel,
            ease: "growIn",
            onComplete: function () {
                hero_1.classList.remove("noevents");
            },
            stagger: {
                each: 0.035,
                ease: ease
            }
        }, overlap);
    };
    var chars = splitHeroText.chars;
    var lines = splitHeroText.lines;
    var lineAllChars = document.querySelectorAll(".splitChar");
    var lineA = lines[0];
    var lineAchars = document.querySelectorAll(".hero-text__larger--chunk-a .splitChar");
    var lineB = lines[1];
    var lineBchars = document.querySelectorAll(".hero-text__larger--chunk-b .splitChar");
    animateChars(lineAchars, "linear", "<");
    animateChars(lineBchars, "power1.in", "<.6");
    /* -------------------------------------------------------------------------- */
    /*                             MOUSEROVER EFFECTS                             */
    //
    var randomDegrees_1 = function () {
        var random = Math.random() * 22.5;
        var randomRadian = Number(random.toPrecision(4));
        var randomSide;
        var getSide = function () {
            var random = Math.random() * 2;
            if (random <= 1) {
                return -1;
            }
            else {
                return 1;
            }
        };
        randomSide = getSide();
        var degrees = randomSide * randomRadian;
        return degrees;
    };
    var heightIncr_1 = function () {
        var random = Math.random() * 20;
        var randomHeight = Number(random.toPrecision(4));
        return randomHeight;
    };
    var randomColor_1 = function () {
        var colors = ["poder", "alertness", "disfruta", "vibing", "pensive", "zesty"];
        var randomIndex = Math.floor(Math.random() * 6);
        var getRandomColor = colors[randomIndex];
        return getRandomColor;
    };
    //* -------------------------------------------------------------------------- *//
    if (windowQuery) {
        lineAllChars.forEach(function (element) {
            var uniqueClass = element.classList[1];
            var charTL = gsap_1.gsap.timeline({ paused: true });
            charTL.to(".".concat(uniqueClass), {
                yPercent: -40 - heightIncr_1(),
                rotation: randomDegrees_1(),
                color: "var(--main-".concat(randomColor_1()),
                repeat: 1,
                yoyo: true
            }, "<50%");
            element.addEventListener("mouseenter", function () {
                charTL.timeScale(0.75);
                charTL.play();
            });
            element.addEventListener("mouseout", function () {
                charTL.timeScale(1.5);
                charTL.resume();
                if (charTL.progress() == 1) {
                    charTL.reverse();
                }
                else {
                    return;
                }
            });
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                            SCROLL AWAY FROM HERO                           */
    gsap_1.gsap.to(theElement, {
        scale: 0.8725,
        opacity: 0,
        y: -100,
        scrollTrigger: {
            trigger: ".main__hero",
            start: "bottom 85%",
            end: "bottom top",
            scrub: 1,
            markers: true
        }
    });
}
