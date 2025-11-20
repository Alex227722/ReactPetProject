// $(function () {

//   $(document).bind("mouseup touchend", function (e) {
//     closeElement(e, '.header__burger-menu', '.header__burg-btn');
//   });

//   const fontWeightSelector = document.getElementById('font-weight');
//   const fontStyleSelector = document.getElementById('font-style');
//   // const fontSizeSelector = document.getElementById('font-size');
//   const fontSizeSelectorSlider = document.getElementById('font-size-slider');
//   // const colorSelector = document.getElementById('color');
//   const colorPicker = document.getElementById('color-picker');
//   const editor = document.getElementById('editor');

//   // Встановлюємо початкові значення
//   fontWeightSelector.addEventListener('change', () => {
//     editor.style.fontWeight = fontWeightSelector.value;
//   });

//   fontStyleSelector.addEventListener('change', () => {
//     editor.style.fontStyle = fontStyleSelector.value;
//   });

//   fontSizeSelector.addEventListener('change', () => {
//     editor.style.fontSize = fontSizeSelector.value;
//   });

//   colorSelector.addEventListener('change', () => {
//     editor.style.color = colorSelector.value;
//   });


//   fontSizeSelectorSlider.addEventListener('input', () => {
//     const fontSize = fontSizeSelectorSlider.value + 'px';
//     editor.style.fontSize = fontSize;
//   });

//   colorPicker.addEventListener('input', () => {
//     editor.style.color = colorPicker.value;
//   });

//   $('#font-weight').on('change', function () {
//     $('#editor').css('font-weight', $(this).val());
//   });

//   $('#font-style').on('change', function () {
//     $('#editor').css('font-style', $(this).val());
//   });

//   $('#font-size').on('change', function () {
//     $('#editor').css('font-size', $(this).val());
//   });

//   $('#color').on('change', function () {
//     $('#editor').css('color', $(this).val());
//   });


//   $('#font-size-slider').on('input', function () {
//     const fontSize = $(this).val() + 'px';
//     $('#editor').css('font-size', fontSize);
//   });

//   $('#color-picker').on('input', function () {
//     $('#editor').css('color', $(this).val());
//   });



//   $(document).on('click', '.show__password', function () {
//     var $targetInput = $(this).prev('input');
//     if ($targetInput.attr('type') == 'password') {
//       $targetInput.attr('type', 'text');
//     } else {
//       $targetInput.attr('type', 'password');
//     }
//     return false;
//   });


//   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
//   let vh = window.innerHeight * 0.01;
//   // Then we set the value in the --vh custom property to the root of the document
//   document.documentElement.style.setProperty('--vh', `${vh}px`);

//   // We listen to the resize event
//   window.addEventListener('resize', () => {
//     // We execute the same script as before
//     let vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//   });


//   function closeElement(e, element, toggler) {
//     var el = $(element);
//     var elBtn = $(toggler);
//     if (!el.is(e.target) && el.has(e.target).length === 0 && !elBtn.is(e.target) && elBtn.has(e.target).length === 0) {
//       el.removeClass('active');
//     }
//   }

//   jQuery(document).ready(function () {
//     jQuery(window).scroll(function () {
//       if (jQuery(this).scrollTop() > 700) {
//         jQuery('.btn-top').css({
//           'opacity': '0.7',
//           'visibility': 'visible',
//           'pointer-events': 'auto',
//         });
//       } else {
//         jQuery('.btn-top').css({
//           'opacity': '0',
//           'visibility': 'hidden',
//           'pointer-events': 'none',
//         });
//       }
//     });
//     jQuery('.btn-top').click(function () {
//       jQuery('body,html').animate({
//         scrollTop: 0
//       }, 1200, function () {
//         $('.btn-top').removeClass('active');
//       });
//       return false;
//     });
//   });


//   jQuery(document).ready(function () {
//     jQuery(window).scroll(function () {
//       if (jQuery(this).scrollTop() > 700) {
//         jQuery('#play').css({
//           'opacity': '0.7',
//           'visibility': 'visible',
//           'pointer-events': 'auto',
//         });
//       } else {
//         jQuery('#play').css({
//           'opacity': '0',
//           'visibility': 'hidden',
//           'pointer-events': 'none',
//         });
//       }
//     });
//   });


//   const nextBlocks = document.querySelectorAll('.next-block');
//   const sections = document.querySelectorAll('section'); // або всі ваші секції, до яких потрібно прокручувати
//   const headerHeight = document.querySelector('.header__top').offsetHeight;

//   function scrollToElement(element) {
//     window.scrollTo({
//       top: element.offsetTop - headerHeight + 5,
//       behavior: 'smooth'
//     });
//   }

//   function setActiveLink() {
//     let currentSection = null;

//     // Проходимо по кожному розділу та перевіряємо, який з них зараз на екрані
//     sections.forEach(section => {
//       const rect = section.getBoundingClientRect();
//       if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
//         currentSection = section;
//       }
//     });

//     // Якщо знайдена поточна видима секція, додаємо клас active до відповідного елемента меню
//     // nextBlocks.forEach(nextBlock => {
//     //   const targetId = nextBlock.dataset.target;
//     //   const targetSection = document.getElementById(targetId);

//     //   if (targetSection === currentSection) {
//     //     nextBlock.classList.add('active');
//     //   } else {
//     //     nextBlock.classList.remove('active');
//     //   }
//     // });
//   }

//   nextBlocks.forEach(nextBlock => {
//     nextBlock.addEventListener('click', function (event) {
//       event.preventDefault();
//       const targetId = nextBlock.dataset.target;
//       const targetSection = document.getElementById(targetId);
//       if (targetSection) {
//         scrollToElement(targetSection);

//         // Видаляємо активний клас з усіх елементів
//         nextBlocks.forEach(block => block.classList.remove('active'));

//         // Додаємо клас active до натиснутого елемента
//         nextBlock.classList.add('active');
//       }
//     });
//   });

//   // Відслідковуємо прокручування для оновлення активного елемента
//   window.addEventListener('scroll', setActiveLink);

//   // Спочатку викликаємо функцію, щоб відразу відобразити правильний активний елемент при завантаженні сторінки
//   setActiveLink();

//   document.querySelector('.next-block-arrow').addEventListener('mouseenter', function () {
//     document.querySelector('.fill').classList.add('active');
//   });

//   document.querySelector('.next-block-arrow').addEventListener('mouseleave', function () {
//     document.querySelector('.fill').classList.remove('active');
//   });



//   $('.btn-top').on("click", function (event) {
//     $('.dark').removeClass('active');
//     $('body').removeClass('noscroll');
//     $(this).toggleClass('active');
//   });

//   $('.header__burg-btn, .header-catalog__index').click(function (event) {
//     $('.header__burger-menu').toggleClass('active');
//     $('.header__burg-btn-close svg').addClass('active');
//     $('.dark-7').toggleClass('active');
//     $('body').toggleClass('noscroll');
//   });


//   $('.header__burg-btn-close, .next-block').click(function (event) {
//     $('.header__burger-menu').toggleClass('active');
//     $('.header__burg-btn-close svg').removeClass('active');
//     $('.dark-7').removeClass('active');
//     $('body').removeClass('noscroll');
//   });
  
//   $('.next-block').click(function (event) {
//     $('.header__burger-menu').removeClass('active');
//     $('.header__burg-btn-close svg').removeClass('active');
//     $('.dark-7').removeClass('active');
//     $('body').removeClass('noscroll');
//   });

//   $('.dark, .dark-7').click(function (event) {
//     $(this).removeClass('active');
//     $('body').removeClass('noscroll');
//     $('.header__catalog-menu').css({
//       'pointer-events': 'auto',
//     });
//   });

//   // Функція для перемикання теми
//   function toggleTheme(isNight) {
//     if (isNight) {
//       $("#fullpage").addClass("night");
//       $(".time-circle").addClass("switched");
//       $('body').addClass('active');
//     } else {
//       $("#fullpage").removeClass("night");
//       $(".time-circle").removeClass("switched");
//       $('body').removeClass('active');
//     }
//   }

//   // Відновлення теми при завантаженні сторінки
//   $(document).ready(function () {
//     const isNight = localStorage.getItem('theme') === 'night'; // Отримуємо тему з localStorage
//     toggleTheme(isNight); // Встановлюємо тему відповідно до збереженого стану

//     // Перемикання теми при кліку
//     $(".time-circle").click(function () {
//       const isCurrentlyNight = $("#fullpage").hasClass("night");

//       if (isCurrentlyNight) {
//         toggleTheme(false); // Перемикаємо на денну тему
//         localStorage.setItem('theme', 'day'); // Зберігаємо в localStorage
//       } else {
//         toggleTheme(true); // Перемикаємо на нічну тему
//         localStorage.setItem('theme', 'night'); // Зберігаємо в localStorage
//       }
//     });
//   });


//   const swiperSmall = new Swiper('#swiper-box', {
//     slidesPerView: 1,
//     speed: 800,
//     spaceBetween: 10,
//     loop: false,
//     pagination: {
//       el: '#swiper-box .swiper-pagination',
//       type: 'progressbar',
//     },
//     navigation: {
//       nextEl: '#swiper-box .swiper-button-next',
//       prevEl: '#swiper-box .swiper-button-prev'
//     },
//   });


//   const swiperBig = new Swiper('#swiper-big-box', {
//     slidesPerView: 1,
//     speed: 800,
//     spaceBetween: 10,
//     loop: false,
//     // effect: 'cube',
//     // fadeEffect: {
//     //   crossFade: true
//     // },
//     pagination: {
//       el: '#swiper-box .swiper-pagination',
//       type: 'progressbar',
//     },
//     // navigation: {
//     //   nextEl: '#swiper-box .swiper-button-next',
//     //   prevEl: '#swiper-box .swiper-button-prev'
//     // },
//   });

//   // Synchronize the sliders
//   swiperSmall.controller.control = swiperBig;
//   swiperBig.controller.control = swiperSmall;


//   $(function () {
//     $('.js-select').select2({
//       selectOnClose: true,
//       dropdownParent: $('.controls')
//     });
//   });


//   document.getElementById('downloadBtn').addEventListener('click', function () {
//     const checkboxes = document.querySelectorAll('.form-check-input:checked');

//     if (checkboxes.length === 0) {
//       alert('Please select at least one file.');
//       return;
//     }

//     const zip = new JSZip();
//     const formats = ['.ttf', '.woff', '.woff2', '.eot'];
//     const fetchPromises = [];

//     checkboxes.forEach(checkbox => {
//       const fileName = checkbox.value;

//       formats.forEach(format => {
//         const fullFileName = `${fileName}${format}`;
//         const filePath = `./font/${fullFileName}`; 

//         // Add each fetch promise to the array
//         const fetchPromise = fetch(filePath)
//           .then(response => {
//             if (response.ok) {
//               return response.blob();
//             } else {
//               console.error(`File not found: ${fullFileName}`);
//               return null;
//             }
//           })
//           .then(blob => {
//             if (blob) {
//               zip.file(fullFileName, blob);
//             }
//           })
//           .catch(error => console.error(`Error fetching file: ${error}`));

//         fetchPromises.push(fetchPromise);
//       });
//     });

//     // Wait for all fetch requests to finish
//     Promise.all(fetchPromises).then(() => {
//       zip.generateAsync({ type: 'blob' }).then(function (content) {
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(content);
//         link.download = 'HAVRYL.zip'; // Set the desired file name

//         // Ensure the download works properly
//         document.body.appendChild(link); // Required for Firefox
//         link.click();
//         document.body.removeChild(link); // Clean up
//       });
//     }).catch(error => console.error('Error generating zip:', error));
//   });


// });