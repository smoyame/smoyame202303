// -------------------------------------------------------------------------- //
//                              MEDIA QUERY MATCH                             //
// -------------------------------------------------------------------------- //

let windowQuery = window.matchMedia("(min-width: 980px)");
import { gsap } from "gsap";

//* -------------------------------------------------------------------------- *//
//*                                   CURSOR                                   *//
//* -------------------------------------------------------------------------- *//

if (windowQuery) {
	// ▶ cojea gabriel - thanks a bunch dude - cursor ◀
	const cursor: HTMLElement = document.querySelector("#cursor");
	const cursorCircle: HTMLElement = cursor.querySelector(".cursor__circle");

	const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
	const pos = { x: 0, y: 0 }; // cursor's coordinates
	const speed = 0.4; // between 0 and 1

	const updateCoordinates = (e: { clientX: number; clientY: number }) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

	window.addEventListener("mousemove", updateCoordinates);

	let getAngle = (diffX, diffY) => {
		return (Math.atan2(diffY, diffX) * 180) / Math.PI;
	};

	let getSqueeze = (diffX, diffY) => {
		const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
		const maxSqueeze = 0.45;
		const accelerator = 1500;
		return Math.min(distance / accelerator, maxSqueeze);
	};

	const updateCursor = () => {
		const diffX = Math.round(mouse.x - pos.x);
		const diffY = Math.round(mouse.y - pos.y);

		pos.x += diffX * speed;
		pos.y += diffY * speed;

		const angle = getAngle(diffX, diffY);
		const squeeze = getSqueeze(diffX, diffY);

		const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
		const rotate = "rotate(" + angle + "deg)";
		const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

		cursor.style.transform = translate;
		cursorCircle.style.transform = rotate + scale;
	};

	let loop = () => {
		updateCursor();
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);

	const cursorModifiers = document.querySelectorAll("[data-cursor-class]");
	cursorModifiers.forEach((cursorModifier) => {
		cursorModifier.addEventListener("mouseenter", function () {
			const className = this.getAttribute("data-cursor-class");
			cursor.classList.add(className);
		});

		cursorModifier.addEventListener("mouseleave", function () {
			const className = this.getAttribute("data-cursor-class");
			cursor.classList.remove(className);
		});
	});
}

gsap.from(".container", {
	duration: 1,
	opacity: 0,
});
