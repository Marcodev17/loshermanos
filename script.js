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
    `Serviço: ${data.get('service')}`,
    `Descrição: ${data.get('problem')}`,
  ].join('\n');
  window.open(`https://wa.me/5575983385316?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

const priceCatalog = [
  { id: 'computadores', groups: [
    { title: 'Formatação e armazenamento', rows: [['Formatação simples / limpa','R$ 60','R$ 100'],['Formatação com backup de dados','R$ 110','R$ 150'],['Combo: instalação física de SSD + formatação','R$ 130','R$ 180'],['Clonagem de sistema (HD para SSD)','R$ 80','R$ 130']] },
    { title: 'Limpeza e manutenção preventiva', rows: [['Limpeza básica / preventiva','R$ 30','R$ 40'],['Limpeza completa (geral / detox)','R$ 80','R$ 110'],['Limpeza completa + cable management','R$ 120','R$ 150'],['Manutenção / limpeza de PC gamer high-end','R$ 160','R$ 210'],['Troca específica de pasta térmica (CPU ou GPU)','R$ 10','R$ 30']] },
    { title: 'Reparo de hardware e soldagem', rows: [['Mão de obra de troca de peça (modular)','R$ 30','R$ 50'],['Soldagem de conectores (power jack, USB, HDMI, SATA)','R$ 90','R$ 130'],['Substituição de componentes SMD (capacitores / mosfets)','R$ 80','R$ 130'],['Reconstrução / soldagem de trilhas rompidas','R$ 110','R$ 180'],['Reflow de CI / recondicionamento de pinos de socket','R$ 80','R$ 150'],['Reballing de BGA (chipset / GPU dedicada)','R$ 230','R$ 350']] },
    { title: 'Sistemas operacionais e software', rows: [['Migração de versão do sistema (ex.: Win 10 → Win 11)','R$ 90','R$ 120'],['Troca de plataforma (Windows ↔ Linux)','R$ 100','R$ 140'],['Configuração de dual boot','R$ 150','R$ 190'],['Migração de arquitetura de disco (Legacy/MBR → UEFI/GPT)','R$ 120','R$ 160'],['Instalação e configuração de SO para servidores','R$ 250','R$ 350']] },
    { title: 'Atendimento externo', rows: [['Atendimento a domicílio / deslocamento','Grátis dentro da cidade','Zona rural: R$ 30–50']] }
  ]},
  { id:'celulares', note:'Cada aparelho é diferente. Avaliamos o modelo e o problema para passar um orçamento certinho. Displays e baterias são orçados conforme o aparelho e a peça necessária.', groups:[
    {title:'Serviços principais', labels:['Mínimo','Média praticada'], rows:[['Formatação / remoção de conta Google / software','R$ 40','R$ 60–90'],['Troca de conector de carga','R$ 70','R$ 90–130'],['Troca de bateria','R$ 90','R$ 150–280'],['Troca de tela (display / frontal)','R$ 100','R$ 180–450'],['Banho químico (oxidação / aparelho molhado)','R$ 80','R$ 120–200'],['Reparo de placa (microsolda básica)','R$ 150','R$ 250–450']]},
    {title:'Outros serviços', labels:['A partir de'], rows:[['Tampa traseira','R$ 50'],['Vidro traseiro','R$ 100'],['Carcaça / chassis Android','R$ 90'],['Carcaça / chassis iPhone','R$ 180'],['Troca de lente de câmera','R$ 40'],['Módulo de câmera','R$ 80'],['Troca de auricular / alto-falante','R$ 50'],['Desbloqueio de conta Google (FRP)','R$ 50'],['Aplicação de película 3D / hidrogel','R$ 15']]}
  ]},
  { id:'sites', note:'Valores de partida. O orçamento final depende do escopo, das integrações e do conteúdo. Custos de domínio e hospedagem são cobrados à parte.', groups:[{title:'Criação de sites', labels:['Mínimo','Média praticada'], rows:[['Landing page / página de vendas','R$ 400','R$ 500–1.200'],['Site institucional (pequena empresa)','R$ 600','R$ 1.200–2.500'],['Catálogo digital / vitrine para WhatsApp','R$ 500','R$ 1.000–2.000'],['Loja virtual (e-commerce básico)','R$ 1.200','R$ 2.500–5.000']]}]}
];

const panelHost = document.getElementById('price-panels');
function renderPrices() {
  panelHost.innerHTML = priceCatalog.map((category) => `<section class="price-panel" id="panel-${category.id}" role="tabpanel" aria-labelledby="tab-${category.id}" ${category.id !== 'computadores' ? 'hidden' : ''}>${category.groups.map((group) => `<div class="price-group"><h3>${group.title}</h3><div class="price-list">${group.rows.map(([name, ...prices]) => {
    const labels = group.labels || ['Mínimo', 'Estimado'];
    const message = encodeURIComponent(`Olá! Vi no site o serviço '${name}' e gostaria de um orçamento.`);
    return `<article class="price-row"><h4>${name}</h4><div class="price-values">${prices.map((price, index) => `<span><small>${labels[index] || 'Preço'}</small><b>${price}</b></span>`).join('')}</div><a class="price-quote" href="https://wa.me/5575983385316?text=${message}" target="_blank" rel="noopener noreferrer" aria-label="Orçar ${name} pelo WhatsApp">Orçar ↗</a></article>`;
  }).join('')}</div></div>`).join('')}${category.note ? `<p class="price-note">${category.note}</p>` : ''}</section>`).join('');
}
renderPrices();

const priceTabs = [...document.querySelectorAll('.price-tab')];
function activatePriceTab(id, moveFocus = false) {
  priceTabs.forEach((tab) => {
    const active = tab.dataset.priceTab === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(`panel-${tab.dataset.priceTab}`).hidden = !active;
    if (active && moveFocus) tab.focus();
  });
}
priceTabs.forEach((tab, index) => tab.addEventListener('click', () => activatePriceTab(tab.dataset.priceTab)));
document.querySelector('[role="tablist"]').addEventListener('keydown', (event) => {
  if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const current = priceTabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? priceTabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + priceTabs.length) % priceTabs.length;
  activatePriceTab(priceTabs[next].dataset.priceTab, true);
});
document.querySelectorAll('[data-price-tab]:not(.price-tab)').forEach((link) => link.addEventListener('click', () => activatePriceTab(link.dataset.priceTab)));

document.getElementById('year').textContent = new Date().getFullYear();
