var messagesEl = document.querySelector('.messages');
var typingSpeed = 20;
var loadingText = '<span><b>•</b><b>•</b><b>•</b></span>';
var messageIndex = 0;
var getCurrentTime = function () {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var current = hours + minutes * 0.01;
  if (current >= 5 && current < 19) return 'Have a nice day! 👌';
  if (current >= 19 && current < 22) return 'Have a nice evening 🌇';
  if (current >= 22 || current < 5) return 'Have a good night! 🌝';
};

var messages = [
  'Hi 👋',
  "I'm Tai, a software engineer at <a target='_blank' href='https://flownetworks.io/'>Flow</a>",
  "I'm living in Ho Chi Minh 🇻🇳",
  "I love dog 🦮, football ⚽ and running 🏃",
  "I'm passionate about web and technologies 👨‍💻",
  "I'm able to work in both frontend and backend",
  "Contact me at: <a href='mailto:1112264.lptai@gmail.com'>1112264.lptai@gmail.com</a> 📬",
  "Or find my resume <a target='_blank' href='https://phuctaile.com/resume'>here</a> 👈",
  getCurrentTime(),
  '✍️ taile',
];

var getFontSize = function () {
  return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
};

var pxToRem = function (px) {
  return px / getFontSize() + 'rem';
};

var bubbleAnimations = function (el) {
  return {
    start: anime({
      targets: el,
      width: [pxToRem(0), pxToRem(el.offsetWidth + getFontSize())],
      marginLeft: ['-2.5rem', '0rem'],
      marginTop: ['2.5rem', '0rem'],
      duration: 300,
      easing: 'easeOutElastic',
    }),
    loop: anime({
      targets: el,
      scale: [1.05, 0.95],
      duration: 300,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    }),
    loading: anime({
      targets: el.querySelectorAll('b'),
      scale: 1.25,
      opacity: [0.5, 1],
      duration: 100,
      loop: true,
      direction: 'alternate',
      delay: function (i) {
        return i * 100 + 50;
      },
    }),
  };
};

var sendMessage = function (message, position) {
  var loadingDuration = message.length * typingSpeed + 500;
  var bubbleEl = document.createElement('div');
  var hiddenEl = document.createElement('div');
  var brEl = document.createElement('br');
  var fragment = document.createDocumentFragment();
  bubbleEl.classList.add('bubble');
  bubbleEl.classList.add('loading');
  bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
  hiddenEl.classList.add('bubble');
  hiddenEl.classList.add('hidden');
  hiddenEl.classList.add(position === 'right' ? 'right' : 'left');
  bubbleEl.innerHTML = loadingText;
  hiddenEl.innerHTML = '<span>' + message + '</span>';
  fragment.appendChild(bubbleEl);
  fragment.appendChild(hiddenEl);
  fragment.appendChild(brEl);
  messagesEl.appendChild(fragment);
  if (bubbleEl.offsetTop + bubbleEl.offsetHeight > messagesEl.offsetHeight) {
    anime({
      targets: messagesEl,
      scrollTop: window.innerHeight,
      duration: 750,
    });
  }
  var animations = bubbleAnimations(bubbleEl);
  setTimeout(function () {
    animations.loop.pause();
    animations.loading.restart({
      opacity: 0,
      scale: 0,
      loop: false,
      direction: 'forwards',
      update: function (a) {
        if (a.progress >= 50 && bubbleEl.classList.contains('loading')) {
          bubbleEl.classList.remove('loading');
          bubbleEl.innerHTML = hiddenEl.innerHTML;
          anime({
            targets: bubbleEl.querySelector('span'),
            opacity: [0, 1],
            duration: 300,
          });
        }
      },
    });
    anime({
      targets: bubbleEl,
      scale: 1,
      width: [pxToRem(bubbleEl.offsetWidth), pxToRem(hiddenEl.offsetWidth + getFontSize())],
      height: [pxToRem(bubbleEl.offsetHeight), pxToRem(hiddenEl.offsetHeight)],
      duration: 800,
      easing: 'easeOutElastic',
    });
    hiddenEl.parentNode.removeChild(hiddenEl);
  }, loadingDuration - 50);
};

var sendMessages = function () {
  var message = messages[messageIndex];
  if (!message) return;
  sendMessage(message);
  ++messageIndex;
  setTimeout(sendMessages, message.length * typingSpeed + anime.random(900, 1200));
};

sendMessages();
