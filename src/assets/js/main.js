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
			gsap.fromTo(
				col,
				{ opacity: 0 },
				{ opacity: 1, duration: .75, stagger: index * 80, ease: "power2.inOut", onComplete: () => {
          if (index === heroCols.length - 1 && col.querySelector(".hero-main-text")) {
						const div = col.querySelector(".hero-main-text");
            const intro = document.querySelector(".hero .intro");
						gsap.fromTo(div, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .75 }, ">.25");
            gsap.fromTo(intro, {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: .75}, ">.15");
					}
        } }
			);
		});

    gsap.utils.toArray("section").forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=20%",
        end: "bottom top",
        onEnter: () => {
          section.classList.add("loaded");
        },
        onLeaveBack: () => {
          section.classList.remove("loaded");
        },
      });
    });

    gsap.utils.toArray(".services .service-item").forEach(item => {
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom-=20%",
        end: "bottom bottom-=40%",
        markers:true,
        onEnter: (self) => {
          setTimeout(() => {
            self.trigger.classList.add("show");
          }, 100);
          // gsap.fromTo(self.trigger.children[0], {opacity: 0, x: -10}, {opacity: 1, x: 0, duration: 1}, "-=.5");
          // gsap.fromTo(self.trigger.children[1], {opacity: 0, x: 10}, {opacity: 1, x: 0, duration: 1}, "-=.5");
        },
        onLeaveBack: (self) => {
          setTimeout(() => {
						self.trigger.classList.remove("show");
					}, 100);
        }
      })
    })
    
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
