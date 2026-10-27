const form = document.querySelector('form');
const button = form.querySelector('button');
const message = document.getElementById('message');
let busy = false;
function updateButton() {
  button.disabled = busy || !Array.from(form.querySelectorAll('input')).every(input => input.value.trim()) || !form.checkValidity();
}
form.addEventListener('input', updateButton);
form.addEventListener('change', updateButton);
window.addEventListener('pageshow', updateButton);
form.addEventListener('submit', async event => {
  event.preventDefault();
  updateButton();
  if (button.disabled) return;
  busy = true;
  updateButton();
  message.textContent = 'Please wait…';
  try {
    const response = await fetch(form.getAttribute('action'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await response.json();
    message.textContent = response.ok ? data.message : data.error;
    if (response.ok) form.reset();
  } catch { message.textContent = 'Unable to connect. Please try again.'; }
  finally { busy = false; updateButton(); }
});
updateButton();
