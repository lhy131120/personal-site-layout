// swiper 
import Swiper from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// gsap

import {gsap} from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer, ScrollTrigger);

// css
import '../style/style.css';

document.addEventListener('DOMContentLoaded', function() {

  if(document.querySelector('.blog')) {
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
})