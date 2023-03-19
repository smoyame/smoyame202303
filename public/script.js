// -------------------------------------------------------------------------- //
//                              MEDIA QUERY MATCH                             //
// -------------------------------------------------------------------------- //
var windowQuery = window.matchMedia("(min-width: 980px)");
// ***** Cursor ***** //
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
    function getAngle(diffX, diffY) {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
    }
    function getSqueeze(diffX, diffY) {
        var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        var maxSqueeze = 0.45;
        var accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }
    var updateCursor_1 = function () {
        var diffX = Math.round(mouse_1.x - pos_1.x);
        var diffY = Math.round(mouse_1.y - pos_1.y);
        pos_1.x += diffX * speed_1;
        pos_1.y += diffY * speed_1;
        var angle = getAngle(diffX, diffY);
        var squeeze = getSqueeze(diffX, diffY);
        var scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
        var rotate = "rotate(" + angle + "deg)";
        var translate = "translate3d(" + pos_1.x + "px ," + pos_1.y + "px, 0)";
        cursor_1.style.transform = translate;
        cursorCircle_1.style.transform = rotate + scale;
    };
    function loop() {
        updateCursor_1();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
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
