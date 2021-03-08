import icons from 'url:../../img/icons.svg'; //Parcel 2
import View from './view.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // 1. Page 1 and others
    if (this._data.page === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // 2. Page 1 and only
    if (numPages === 1) {
      return ``;
    }
    // 3. Last page
    if (this._data.page === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
    }
    // 4. Any other page
    if (this._data.page > 1 && this._data.page < numPages) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
  }
}

export default new RecipeView();
