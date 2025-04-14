document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  burger.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('open');
    overlay.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const domesticBtn = document.getElementById('domesticBtn');
  const internationalBtn = document.getElementById('internationalBtn');
  const domesticContent = document.getElementById('domesticContent');
  const internationalContent = document.getElementById('internationalContent');

  domesticBtn.addEventListener('click', () => {
    domesticBtn.classList.add('active');
    internationalBtn.classList.remove('active');
    domesticContent.classList.remove('hidden');
    internationalContent.classList.add('hidden');
  });
  
  internationalBtn.addEventListener('click', () => {
    internationalBtn.classList.add('active');
    domesticBtn.classList.remove('active');
    internationalContent.classList.remove('hidden');
    domesticContent.classList.add('hidden');
  });

  const domesticSwapButton = document.getElementById('domesticSwapButton');
  const departureInput = document.getElementById('departure');
  const arrivalInput = document.getElementById('arrival');

  domesticSwapButton.addEventListener('click', () => {
    const temp = departureInput.value;
    departureInput.value = arrivalInput.value;
    arrivalInput.value = temp;
  });

  const internationalSwapButton = document.getElementById('internationalSwapButton');
  const iDepartureInput = document.getElementById('i_departure');
  const iArrivalInput = document.getElementById('i_arrival');

  internationalSwapButton.addEventListener('click', () => {
    const tempInternational = iDepartureInput.value;
    iDepartureInput.value = iArrivalInput.value;
    iArrivalInput.value = tempInternational;
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (document.activeElement.id === 'domesticSwapButton' || document.activeElement.id === 'internationalSwapButton')) {
    event.preventDefault();
  }
});