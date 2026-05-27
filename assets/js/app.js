const recipes = {
  vafler: {
    title: 'Sprøde vafler med bær',
    category: 'Morgenmad',
    time: '20 min',
    difficulty: 'Nem',
    image: 'assets/img/vafler.svg',
    description: 'En rolig morgenmadsfavorit med sprøde kanter, frisk topping og et minimalistisk udtryk i prototypen.',
    ingredients: ['2 æg', '2 dl mælk', '150 g hvedemel', '1 tsk bagepulver', '1 spsk sukker', 'Friske bær', 'Skyr eller yoghurt'],
    steps: ['Pisk æg, mælk, mel, bagepulver og sukker sammen til en glat dej.', 'Varm vaffeljernet op og bag vaflerne gyldne.', 'Server med bær og en skefuld skyr eller yoghurt.']
  }
};


function setupNavigation() {
  const btn = document.querySelector('[data-menu-button]');
  const links = document.querySelector('[data-nav-links]');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('is-open'));
}



setupNavigation();
