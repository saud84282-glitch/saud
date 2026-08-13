// Paste the URL created by Deploy > New deployment > Web app in Google Apps Script.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWeUmaT089sfveR_9VXtfD7h7oBX8PABH6sRlgj4ROKwRtC0Xgf8YjdBCuFYiUK1ijHw/exec';

const contactForm = document.querySelector('#contactForm');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = contactForm.querySelector('.form-message');
  const button = contactForm.querySelector('button');

  if (GOOGLE_APPS_SCRIPT_URL === 'PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE') {
    message.textContent = 'Please add your deployed Google Apps Script Web App URL.';
    return;
  }

  button.disabled = true;
  button.textContent = 'Sending…';
  message.textContent = '';
  try {
    const data = new URLSearchParams(new FormData(contactForm));
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'POST', body: data });
    const result = await response.json();
    if (result.status !== 'success') throw new Error(result.message);
    message.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    message.textContent = 'Unable to send right now. Please email saud84282@gmail.com.';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Send inquiry <span>↗</span>';
  }
});
