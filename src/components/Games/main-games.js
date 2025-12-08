// $(function () {
//   document.addEventListener('DOMContentLoaded', () => {
// 		const audio1 = document.getElementById('myAudio');
// 		const audio2 = document.getElementById('myAudio-1');
// 		const audio3 = document.getElementById('myAudio-3');
// 		const audio4 = document.getElementById('myAudio-4');

// 		// Зберігаємо час відтворення для кожного аудіофайлу
// 		const audioTimes = {};

// 		// Отримуємо всі елементи з класом "hover-element"
// 		const hoverElements = document.querySelectorAll('.hover-element');

// 		// Додаємо обробник події "hover" для кожного елемента
// 		hoverElements.forEach((element) => {
// 			element.addEventListener('mouseenter', () => {
// 				const audioId = element.getAttribute('data-audio');
// 				if (audioId && document.getElementById(audioId)) {
// 					const audioElement = document.getElementById(audioId);
// 					audioElement.currentTime = audioTimes[audioId] || 0;
// 					audioElement.play().catch(function () {
// 						console.error("Помилка відтворення аудіо");
// 					});

// 					// Вимикаємо audio4 при ховері на .trail-2
// 					if (audioId === 'myAudio-3' && audio4) {
// 						audio4.muted = true;
// 					}
// 				}
// 			});

// 			element.addEventListener('mouseleave', () => {
// 				const audioId = element.getAttribute('data-audio');
// 				if (audioId && document.getElementById(audioId)) {
// 					const audioElement = document.getElementById(audioId);
// 					audioTimes[audioId] = audioElement.currentTime;
// 					audioElement.pause();

// 					// Включаємо audio4 при виході з .trail-2
// 					if (audioId === 'myAudio-3' && audio4) {
// 						audio4.muted = false;
// 					}
// 				}
// 			});
// 		});

// 		// Додаємо обробник події "mouseleave" для елемента .trail
// 		const trailElement = document.querySelector('.trail');

// 		if (trailElement) {
// 			trailElement.addEventListener('mouseleave', () => {
// 				if (audio4) {
// 					audio4.src = "img/mario-smert.mp3";
// 					audio4.play().catch(function () {
// 						console.error("Помилка відтворення аудіо myAudio-4");
// 					});
// 				}
// 			});
// 		}
// 	});

// 	document.addEventListener('DOMContentLoaded', () => {
// 		const trail8 = document.querySelector('.trail-8'); // Знаходимо елемент з класом .trail-8
// 		const posAbsoluteElements = document.querySelectorAll(
// 			'.pos-absolute, .pos-absolute-2, .pos-absolute-3, .btn'
// 		); // Знаходимо всі елементи з класами .pos-absolute, .pos-absolute-2, .pos-absolute-3

// 		// Додаємо обробник події "mouseenter" для .trail-8
// 		trail8.addEventListener('mouseenter', () => {
// 			// Додаємо клас .off-2 до всіх елементів .pos-absolute, .pos-absolute-2, .pos-absolute-3
// 			posAbsoluteElements.forEach((element) => {
// 				element.classNameList.add('off-2');
// 			});
// 		});

// 		// Додаємо обробник події "mouseleave" для .trail-8
// 		trail8.addEventListener('mouseleave', () => {
// 			// Видаляємо клас .off-2 у всіх елементів .pos-absolute, .pos-absolute-2, .pos-absolute-3
// 			posAbsoluteElements.forEach((element) => {
// 				element.classNameList.remove('off-2');
// 			});
// 		});


// 	});

// 	document.addEventListener('DOMContentLoaded', () => {

// 		const trails = document.querySelectorAll('.trail'); // Знаходимо всі елементи з класом .trail
// 		const posAbsoluteElements = document.querySelectorAll(
// 			'.marik, .btn, .snow'); // Знаходимо всі елементи з класами .marik і .btn

// 		trails.forEach((trail) => {
// 			// Додаємо обробник події "mouseenter" для кожного .trail
// 			trail.addEventListener('mouseenter', () => {
// 				// Додаємо клас .off-3 до всіх елементів .marik і .btn
// 				posAbsoluteElements.forEach((element) => {
// 					element.classNameList.add('off-3');
// 				});
// 			});

// 			// Додаємо обробник події "mouseleave" для кожного .trail
// 			trail.addEventListener('mouseleave', () => {
// 				// Видаляємо клас .off-3 у всіх елементів .marik і .btn
// 				posAbsoluteElements.forEach((element) => {
// 					element.classNameList.remove('off-3');
// 				});
// 			});
// 		});
// 	});



// 	document.addEventListener('DOMContentLoaded', () => {
// 		const toggleSnowButton = document.getElementById('toggleSnowAnimation');
// 		const figureElement = document.querySelector('.figure');
// 		let isFigureActive = false;

// 		toggleSnowButton.addEventListener('click', () => {
// 			if (!isFigureActive) {
// 				isFigureActive = true;
// 				setTimeout(() => {
// 					figureElement.classNameList.add('figure-active'); // З'явлення через 7 секунд
// 					setTimeout(() => {
// 						figureElement.classNameList.remove(
// 							'figure-active'); // Зникнення через 5 секунд
// 						isFigureActive = false;
// 					}, 7000);
// 				}, 7000);
// 			}
// 		});
// 	});



// 	document.addEventListener('DOMContentLoaded', () => {
// 		const toggleSnowButton = document.getElementById('toggleSnowAnimation');
// 		const audio5 = document.getElementById('myAudio-5'); // Отримуємо аудіо-елемент

// 		let snowFalls = new SnowFalls({
// 			color: ['blue', 'green'],
// 			count: 100,
// 		});

// 		let audioPlaying = false; // Додали змінну, що відстежує, чи відтворюється аудіо

// 		toggleSnowButton.addEventListener('click', () => {
// 			snowFalls.toggleAnimation();

// 			// Перевірка чи аудіо відтворюється, і відповідно вмикаємо або вимикаємо
// 			if (audioPlaying) {
// 				audio5.pause(); // Вимикаємо аудіо
// 			} else {
// 				audio5.play(); // Увімкнемо аудіо
// 			}
// 			audioPlaying = !audioPlaying; // Змінюємо стан відтворення аудіо
// 		});
// 	});

// 	function SnowFalls(ob) {
// 		this.param = {
// 			count: 10,
// 			color: ['blue'],
// 			minSize: 12,
// 			maxSize: 44,
// 			letter: '*',
// 			speed: 0.5,
// 		};
// 		for (a in ob)
// 			if (a in this.param) this.param[a] = ob[a];
// 		this.param.color = [...this.param.color];
// 		this.param.letter = [...this.param.letter];
// 		this.width = Math.max(document.body.clientWidth, innerWidth);
// 		this.height = Math.max(document.body.clientHeight, innerHeight);
// 		this.el = [];

// 		this.createSnowflakes = () => {
// 			for (var i = 0; i < this.param.count; i++) {
// 				this.el[i] = document.createElement('div');
// 				this.el[i].innerHTML = this.param.letter[
// 					parseInt(Math.random() * this.param.letter.length)
// 				];
// 				this.el[i].style.position = 'fixed';
// 				this.el[i].style.top = '-50px';
// 				this.el[i].style.left = 0;
// 				this.el[i].top = 0 - Math.random() * this.height;
// 				this.el[i].crds = 0;
// 				this.el[i].left_radius = Math.random() * (15 - 5) + 5;
// 				this.el[i].left_sped = 0.00001 + Math.random() / 55;
// 				this.el[i].left_x = parseInt(Math.random() * this.width);
// 				this.el[i].left = 0;
// 				this.el[i].style.color = this.param.color[
// 					parseInt(this.param.color.length * Math.random())
// 				];
// 				this.el[i].style.fontSize =
// 					parseInt(Math.random() * (this.param.maxSize - this.param.minSize) + this.param.minSize) + 'px';
// 				this.el[i].style.opacity = 1;
// 				this.el[i].classNameList.add('snowflake'); // Додаємо клас для сніжинок
// 				document.body.appendChild(this.el[i]);
// 			}
// 		};

// 		this.animationHandle = null;
// 		this.isAnimationRunning = false;

// 		this.toggleAnimation = function () {
// 			this.isAnimationRunning = !this.isAnimationRunning;
// 			if (!this.isAnimationRunning) {
// 				cancelAnimationFrame(this.animationHandle);
// 				document.querySelectorAll('.snowflake').forEach((snowflake) => {
// 					document.body.removeChild(snowflake); // Видаляємо сніжинки
// 				});
// 			} else {
// 				this.createSnowflakes(); // Відновлюємо створення сніжинок
// 				this.animation();
// 			}
// 		};

// 		this.animation = function () {
// 			if (!this.isAnimationRunning) return;

// 			for (var i = 0, l = this.el.length; i < l; i++) {
// 				this.el[i].crds += this.el[i].left_sped;
// 				this.el[i].left = this.el[i].left_x + this.el[i].left_radius * Math.sin(this.el[i].crds);
// 				this.el[i].top += this.param.speed;
// 				if (this.el[i].top > this.height) {
// 					this.el[i].top = -50;
// 					this.el[i].left = parseInt(Math.random() * this.width);
// 				}
// 				this.el[i].style.top = this.el[i].top + 'px';
// 				this.el[i].style.left = this.el[i].left + 'px';
// 				this.el[i].left = Math.random() * this.width;
// 			}
// 			this.animationHandle = requestAnimationFrame(this.animation.bind(this));
// 		};
// 	}

// 	document.addEventListener('DOMContentLoaded', () => {
// 		const toggleSnowButton = document.getElementById('toggleSnowAnimation');
// 		let snowFalls;

// 		toggleSnowButton.addEventListener('click', () => {
// 			if (!snowFalls) {
// 				snowFalls = new SnowFalls({
// 					color: ['blue', 'green'],
// 					count: 10,
// 				});
// 				snowFalls.createSnowflakes(); // Створюємо сніжинки при першому кліку
// 			}
// 			snowFalls.toggleAnimation();
// 		});
// 	});
// });