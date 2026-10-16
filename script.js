const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('[data-service]').forEach((link) => {
  const service = link.dataset.service;
  const message = `Ol%C3%A1%21%20Gostaria%20de%20consultar%20o%20valor%20de%20${encodeURIComponent(service)}%20do%20meu%20computador.`;
  link.href = `https://wa.me/5575983385316?text=${message}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.getElementById('quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    'Olá! Conheci a Los Hermanos Tech pelo site e gostaria de solicitar um orçamento.',
    `Nome: ${data.get('name')}`,
    `Equipamento: ${data.get('equipment')}`,
    `Servi%C3%A7o: ${data.get('service')}`,
    `Descri%C3%A7%C3%A3o: ${data.get('problem')}`,
  ].join('\n');
  window.open(`https://wa.me/5575983385316?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();
