// swiper
import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

// gsap

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer, ScrollTrigger);

// css
import "../style/style.css";

document.addEventListener("DOMContentLoaded", function () {
	// Common Function - Header Scroll
	if (document.querySelector(".header")) {
		const header = document.querySelector(".header");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: header,
				start: "bottom+=30 top",
				end: "bottom+=10 top",
				scrub: 1,
				onEnter: () => {
					setTimeout(() => {
						header.classList.add("sticky");
					}, 300);
				},
				onEnterBack: () => {
					setTimeout(() => {
						header.classList.remove("sticky");
					}, 100);
				},
			},
		});
	}

	const main = document.querySelector("main");
	main.classList.contains("home") ? homeScrollAnimation() : insideScrollAnimation();

	function homeScrollAnimation() {
		const heroCols = document.querySelectorAll(".hero .row .col");
		heroCols.forEach((col, index) => {
			if (index === 0) {
				gsap.fromTo(col, { opacity: 0, x: "-5" }, { opacity: 1, x: 0, duration: 1.2, ease: "power2.inOut" });
			} else {
				gsap.fromTo(
					col,
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 1.2,
						ease: "power2.inOut",
						onComplete: () => {
							const h1 = col.querySelector(".hero-main-text h1");
							const p = col.querySelector(".hero-main-text p");
              const intro = document.querySelector(".hero .intro");
							gsap.fromTo(h1, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
							gsap.fromTo(p, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=.35");
							gsap.fromTo(intro, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .85 }, "-=.25");
						},
					}
				);
			}
		});

		// section control add
		// const sections = gsap.utils.toArray("main section");
		// sections.forEach((section) => {
		// 	const tl = gsap.timeline({
		// 		scrollTrigger: {
		// 			trigger: section,
		// 			start: "top 80%",
		// 			end: "bottom 20%",
		// 			scrub: true,
		// 			toggleClass: "loaded",
		// 			// markers: true
		// 		},
		// 	});
		// });

		const sections = document.querySelectorAll("section");
		const serviceItems = document.querySelectorAll(".services-list .service-item");
		const serviceButton = document.querySelectorAll(".services .flex-wrap");
		const jobsListCards = document.querySelectorAll(".section-jobs-case-list .card");
    const contacItems = document.querySelectorAll(".contact-list .contact-item"); 

		observeInterSectionRatio(sections, "loaded", 0.23);
		observeInterSectionRatio(serviceItems, "show", 0.7);
		observeInterSectionRatio(serviceButton, "show", 0.45);
		observeInterSectionRatio(jobsListCards, "show", 0.45, true);
		observeInterSectionRatio(contacItems, "show", 0.45, true);
	}

	function observeInterSectionRatio(items, _class, threshold, timeout = false) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, index) => {
					if (entry.intersectionRatio < threshold) return;
					const addClass = () => {
						entry.target.classList.add(_class);
						observer.unobserve(entry.target);
					};
					timeout ? setTimeout(addClass, index * 200) : addClass();
				});
			},
			{ threshold }
		);

		items.forEach((item) => observer.observe(item));
	}

	function insideScrollAnimation() {
		console.log("inside");
	}

	// Common Function - Back To Top Button
	const backTopBtn = document.querySelector(".back-top");
	if (backTopBtn) {
		window.addEventListener("scroll", function () {
			if (window.scrollY > 200) {
				backTopBtn.classList.add("show");
			} else {
				backTopBtn.classList.remove("show");
			}
		});

		backTopBtn.addEventListener("click", function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});
	} else {
		console.warn("Back to Top button not found in the DOM.");
	}

	// Index Page - Swiper
	if (document.querySelector(".blog")) {
		const swiper = new Swiper(".blog .swiper", {
			modules: [Navigation, EffectFade],
			slidesPerView: 1,
			spaceBetween: 24,
			breakpoints: {
				992: {
					slidesPerView: 3,
					spaceBetween: 24,
					effect: "slide",
				},
			},
			navigation: {
				nextEl: ".blog .swiper-button-next",
				prevEl: ".blog .swiper-button-prev",
			},
		});
	}
});
