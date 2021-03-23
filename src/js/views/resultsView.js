import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Could not find results for query. Try again!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(result => this._generateMarkupPreview(result))
      .join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    // console.log(result);
    return `<li class="preview">
              <a class="preview__link ${
                result.id === id ? 'preview__link--active' : ''
              }" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data"> 
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                </div>
              </a>
            </li>`;
  }
}

export default new ResultsView();
