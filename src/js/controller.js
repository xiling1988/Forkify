import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return; // guard clause
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    recipeView.addHandlerServing(controlServings);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // 3 Render Search Results
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlPagination = function (goToPage) {
  console.log('Pag Controller');
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // recipeView.addHandlerServing(controlServings);
};

init();

// controlRecipes();

// window.addEventListener('hashchange', controlRecipes); //Callback functions without the calling parenthesis!!!
// window.addEventListener('load', controlRecipes); //Callback functions without the calling parenthesis!!!

// in order not to have to make eventlisteners for every event that has the same callback function(hashchange, load, ect...) we can put all events into an array and loop over it with the eventlistener method:
