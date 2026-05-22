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
  },
  hoensesalat: {
    title: 'Hønsesalat på ristet brød',
    category: 'Frokost',
    time: '15 min',
    difficulty: 'Nem',
    image: 'assets/img/hoensesalat.svg',
    description: 'Cremet hønsesalat med sprødt grønt, serveret som en enkel frokostret i et let layout.',
    ingredients: ['200 g tilberedt kylling', '2 spsk creme fraiche', '1 spsk mayonnaise', '1 tsk dijonsennep', 'Agurk og purløg', 'Ristet rugbrød', 'Salt og peber'],
    steps: ['Riv eller skær kyllingen i mindre stykker.', 'Rør creme fraiche, mayonnaise og sennep sammen.', 'Vend kylling og grønt i dressingen og smag til.', 'Server på ristet rugbrød med ekstra grønt.']
  },
  bolognese: {
    title: 'Klassisk bolognese',
    category: 'Aftensmad',
    time: '40 min',
    difficulty: 'Middel',
    image: 'assets/img/bolognese.svg',
    description: 'En varm og genkendelig aftensmad med fokus på overskuelige ingredienser og tydelige trin.',
    ingredients: ['400 g hakket oksekød', '1 løg', '2 fed hvidløg', '1 dåse hakkede tomater', '2 spsk tomatpuré', 'Pasta', 'Parmesan og basilikum'],
    steps: ['Sautér løg og hvidløg i en gryde.', 'Tilsæt kød og brun det grundigt.', 'Kom tomater og tomatpuré i gryden og lad saucen simre.', 'Kog pastaen og server med parmesan og basilikum.']
  },
  hummus: {
    title: 'Hummus med grøntsagsstænger',
    category: 'Snack',
    time: '10 min',
    difficulty: 'Nem',
    image: 'assets/img/hummus.svg',
    description: 'En hurtig snack med cremet hummus, sprødt grønt og et visuelt rent serveringsforslag.',
    ingredients: ['1 dåse kikærter', '1 spsk tahin', '1 fed hvidløg', '1 spsk citronsaft', '2 spsk olivenolie', 'Spidskommen', 'Gulerod og agurk'],
    steps: ['Blend kikærter, tahin, hvidløg, citronsaft og olie.', 'Smag til med salt, peber og spidskommen.', 'Skær grøntsager i stave og server sammen med hummus.']
  }
};

const extraRecipes = {
  smoothie: { title: 'Grøn smoothie bowl', category: 'Morgenmad', time: '8 min', difficulty: 'Nem', image: 'assets/img/smoothie.svg', description: 'Frisk og hurtig morgenmad med banan, spinat og knasende topping.' },
  salat: { title: 'Nordisk rugbrødssalat', category: 'Frokost', time: '12 min', difficulty: 'Nem', image: 'assets/img/salat.svg', description: 'Let frokost med rugbrødscrunch, æg og sæsonens grønt.' },
  groentsager: { title: 'Ovnbagte grøntsager', category: 'Aftensmad', time: '35 min', difficulty: 'Nem', image: 'assets/img/groentsager.svg', description: 'Farverig hverdagsret med urter, yoghurt-dressing og kerner.' },
  dadelkugler: { title: 'Dadelkugler med kakao', category: 'Snack', time: '12 min', difficulty: 'Nem', image: 'assets/img/dadelkugler.svg', description: 'Sød snack uden mange ingredienser, god til madpakken.' }
};

const allRecipes = { ...recipes, ...extraRecipes };

function setupNavigation() {
  const btn = document.querySelector('[data-menu-button]');
  const links = document.querySelector('[data-nav-links]');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('is-open'));
}

function setupSearchAndFilters() {
  const search = document.querySelector('[data-search]');
  const cards = Array.from(document.querySelectorAll('[data-card]'));
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const empty = document.querySelector('[data-empty]');
  if (!cards.length) return;

  let activeFilter = 'alle';
  const apply = () => {
    const query = (search?.value || '').toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const type = card.dataset.type || 'alle';
      const matchesQuery = !query || text.includes(query);
      const matchesFilter = activeFilter === 'alle' || type === activeFilter;
      const show = matchesQuery && matchesFilter;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.classList.toggle('is-visible', visible === 0);
  };

  search?.addEventListener('input', apply);
  filters.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach(btn => btn.classList.toggle('is-active', btn === button));
      apply();
    });
  });
  apply();
}

function setupFavorites() {
  const buttons = Array.from(document.querySelectorAll('[data-favorite]'));
  if (!buttons.length) return;
  const key = 'm6-favoritter';
  const get = () => JSON.parse(localStorage.getItem(key) || '[]');
  const set = value => localStorage.setItem(key, JSON.stringify(value));

  buttons.forEach(button => {
    const id = button.dataset.favorite;
    button.classList.toggle('is-active', get().includes(id));
    button.setAttribute('aria-label', 'Gem som favorit');
    button.addEventListener('click', event => {
      event.preventDefault();
      const list = get();
      const next = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
      set(next);
      button.classList.toggle('is-active', next.includes(id));
    });
  });
}

function setupRecipePage() {
  const container = document.querySelector('[data-recipe-page]');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'bolognese';
  const recipe = allRecipes[id] || recipes.bolognese;
  const img = document.querySelector('[data-recipe-image]');
  const title = document.querySelector('[data-recipe-title]');
  const category = document.querySelector('[data-recipe-category]');
  const desc = document.querySelector('[data-recipe-description]');
  const time = document.querySelector('[data-recipe-time]');
  const diff = document.querySelector('[data-recipe-difficulty]');
  const ingredients = document.querySelector('[data-ingredients]');
  const steps = document.querySelector('[data-steps]');

  document.title = `${recipe.title} | Madro`;
  img.src = recipe.image;
  img.alt = recipe.title;
  title.textContent = recipe.title;
  category.textContent = recipe.category;
  desc.textContent = recipe.description;
  time.textContent = recipe.time;
  diff.textContent = recipe.difficulty;
  ingredients.innerHTML = (recipe.ingredients || ['Ingrediensliste kan udvides i prototypen.']).map(item => `<li>${item}</li>`).join('');
  steps.innerHTML = (recipe.steps || ['Tilføj trin i JavaScript-datafilen.']).map(item => `<li>${item}</li>`).join('');
}

function setupShoppingList() {
  const button = document.querySelector('[data-add-shopping]');
  const status = document.querySelector('[data-shopping-status]');
  if (!button) return;
  button.addEventListener('click', () => {
    status.textContent = 'Ingredienserne er tilføjet til den lokale prototype-liste.';
  });
}

function setupAuthDemo() {
  const forms = Array.from(document.querySelectorAll('[data-demo-form]'));
  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      window.location.href = 'dashboard.html';
    });
  });
}

setupNavigation();
setupSearchAndFilters();
setupFavorites();
setupRecipePage();
setupShoppingList();
setupAuthDemo();
