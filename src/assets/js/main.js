import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import '../style/style.css';

// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

document.addEventListener('DOMContentLoaded', function () {

  if(document.querySelector(".blog")) {
    const swiper = new Swiper('.blog .swiper', {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: '1.5rem',
      breakpoints: {
        992: {
          slidesPerView: 2,
          spaceBetween: '1.5rem',
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: '1.5rem',
        },
      },
      navigation: {
        nextEl: '.blog .swiper-button-next',
        prevEl: '.blog .swiper-button-prev',
      }
    })
  }
});