//* -------------------------------------------------------------------------- *//
//*                              Initial + Imports                             *//
//* -------------------------------------------------------------------------- *//
import { gsap } from "gsap";
import { CSSRulePlugin } from "../node_modules/gsap/CSSRulePlugin";
import { CustomEase } from "../node_modules/gsap/CustomEase";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger";
import { SplitText } from "../node_modules/gsap/SplitText";
import { ScrollSmoother } from "../node_modules/gsap/ScrollSmoother";
import { ScrollToPlugin } from "../node_modules/gsap/ScrollToPlugin";

gsap.registerPlugin(
	ScrollTrigger,
	ScrollSmoother,
	CSSRulePlugin,
	CustomEase,
	SplitText,
	ScrollToPlugin
);

CustomEase.create("growIn", "M0,0 C0.072,0.516 0.234,0.794 0.312,0.866 0.384,0.932 0.448,1 1,1 ");
CustomEase.create("charIn", "M0,0 C0.104,0.182 0.502,0.802 1,1 ");

// -------------------------------------------------------------------------- //
//                              MEDIA QUERY MATCH                             //
// -------------------------------------------------------------------------- //

let windowQuery = window.matchMedia("(min-width: 980px)");

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
	let thediffX = Math.round(mouse.x - pos.x);
	let thediffY = Math.round(mouse.y - pos.y);
	let theAngle = (Math.atan2(thediffY, thediffX) * 180) / Math.PI;

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
	const disabledCards = document.querySelectorAll(".proj-card__wip");
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

	disabledCards.forEach((disabledCard) => {
		disabledCard.addEventListener("mouseenter", function () {
			const className = "disabled-notif";
			cursor.classList.add(className);
		});

		disabledCard.addEventListener("mouseleave", function () {
			const className = "disabled-notif";
			cursor.classList.remove(className);
		});
	});
}

//* -------------------------------------------------------------------------- *//
//*                                    GSAP                                    *//
//* -------------------------------------------------------------------------- *//

ScrollSmoother.create({
	smooth: 1,
	effects: true,
	smoothTouch: 0.1,
});

//* -------------------------------------------------------------------------- *//
//*                            Base values and anims                           *//

const stdInY = 150;
const stdDelay = 0.125;
const stdDuration = 1.25;
const stdEaseIn: string = "growIn";
const stdStagger: number = 0.02;

let fadeInUp = (element: string) => {
	gsap.from(element, {
		duration: stdDuration,
		y: stdInY,
		opacity: 0,
		ease: stdEaseIn,
		delay: stdDelay,
	});
};

//* -------------------------------------------------------------------------- *//
//*                              SplitText Effects                             *//
//* -------------------------------------------------------------------------- *//
//*                               HERO - ANIMATION                             *//

if (document.querySelector(".main__hero-text") !== null) {
	const theElement = ".main__hero-text";
	const splitHeroText = new SplitText(theElement, {
		type: "chars, lines",
		linesClass: "splitLine splitLine++",
		charsClass: "splitChar splitChar++",
	});

	const hero = document.querySelector(".main__hero");

	const homeSplitTextTL = gsap.timeline({ delay: stdDelay });
	let animateChars = (chars: any, ease: string, overlap: string) => {
		const yPercTravel = 75;
		homeSplitTextTL.from(
			chars,
			{
				opacity: 0,
				yPercent: yPercTravel,
				ease: "growIn",
				onComplete: () => {
					hero.classList.remove("noevents");
				},
				stagger: {
					each: 0.035,
					ease: ease,
				},
			},
			overlap
		);
	};

	const chars = splitHeroText.chars;
	const lines = splitHeroText.lines;

	const lineAllChars: NodeListOf<Element> = document.querySelectorAll(".splitChar");
	const lineA = lines[0];
	const lineAchars: NodeListOf<Element> = document.querySelectorAll(
		".hero-text__larger--chunk-a .splitChar"
	);

	const lineB = lines[1];
	const lineBchars: NodeListOf<Element> = document.querySelectorAll(
		".hero-text__larger--chunk-b .splitChar"
	);

	animateChars(lineAchars, "linear", "<");
	animateChars(lineBchars, "power1.in", "<.6");

	/* -------------------------------------------------------------------------- */
	/*                             MOUSEROVER EFFECTS                             */

	//
	let randomDegrees = () => {
		let random = Math.random() * 22.5;
		let randomRadian = Number(random.toPrecision(4));

		let randomSide: number;
		let getSide = () => {
			let random = Math.random() * 2;
			if (random <= 1) {
				return -1;
			} else {
				return 1;
			}
		};

		randomSide = getSide();
		let degrees = randomSide * randomRadian;
		return degrees;
	};

	let heightIncr = () => {
		let random = Math.random() * 20;
		let randomHeight = Number(random.toPrecision(4));
		return randomHeight;
	};

	let randomColor = () => {
		let colors = ["poder", "alertness", "disfruta", "vibing", "pensive", "zesty"];
		let randomIndex = Math.floor(Math.random() * 6);
		let getRandomColor = colors[randomIndex];
		return getRandomColor;
	};

	//* -------------------------------------------------------------------------- *//

	if (windowQuery) {
		lineAllChars.forEach((element) => {
			let uniqueClass = element.classList[1];
			let charTL = gsap.timeline({ paused: true });

			charTL.to(
				`.${uniqueClass}`,
				{
					yPercent: -40 - heightIncr(),
					rotation: randomDegrees(),
					color: `var(--main-${randomColor()}`,
					repeat: 1,
					yoyo: true,
				},
				"<50%"
			);

			element.addEventListener("mouseenter", () => {
				charTL.timeScale(0.75);
				charTL.play();
			});

			element.addEventListener("mouseout", () => {
				charTL.timeScale(1.5);
				charTL.resume();
				if (charTL.progress() == 1) {
					charTL.reverse();
				} else {
					return;
				}
			});
		});
	}

	/* -------------------------------------------------------------------------- */
	/*                            SCROLL AWAY FROM HERO                           */

	gsap.to(theElement, {
		scale: 0.8725,
		opacity: 0,
		y: -100,
		scrollTrigger: {
			trigger: ".main__hero",
			start: "bottom 85%",
			end: "bottom top",
			scrub: 1,
			markers: true,
		},
	});
}
