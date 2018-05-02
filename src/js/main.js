import { generateCustomEvent } from './module/customEvent';

const btnSelector = '.js-popup-btn';

function receivePopupMessage(event) {
  let posData = '';

  if (event.data) {
    posData = JSON.parse(event.data);
  }

  generateCustomEvent(posData.method, posData.params);
}

function showPayOnlinePaymentForm(url) {
  try {
    const payFrame = document.createElement('iframe');
    payFrame.id = 'payonlineframe';
    payFrame.width = '100%';
    payFrame.height = '100%';
    payFrame.style.position = 'fixed';
    payFrame.style.left = 0;
    payFrame.style.top = 0;
    payFrame.style.zIndex = '9999';
    payFrame.setAttribute('src', url);

    document.body.appendChild(payFrame);
    document.body.style.overflow = 'hidden';
  } catch (e) {
    generateCustomEvent('payOnlineError', e);
  }
}

function hidePayOnlinePaymentForm(iFrame) {
  if (iFrame) {
    iFrame.parentNode.removeChild(iFrame);
  }
}

const btns = document.querySelectorAll(btnSelector);

for (let i = 0; i < btns.length; i += 1) {
  const btn = btns[i];

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const url = btn.getAttribute('href');

    if (url) {
      showPayOnlinePaymentForm(url);
    }
  });
}

if (window.addEventListener) {
  window.addEventListener('message', receivePopupMessage, false);
} else if (window.attachEvent) {
  window.attachEvent('onmessage', receivePopupMessage);
}

window.addEventListener('popupFormClose', () => {
  const iFrame = document.querySelector('iframe');
  hidePayOnlinePaymentForm(iFrame);
});

window.addEventListener('popupPaymentDone', () => {
  const iFrame = document.querySelector('iframe');
  hidePayOnlinePaymentForm(iFrame);

  setTimeout(() => {
    alert('Спасибо за оплату');
  }, 100);
});
