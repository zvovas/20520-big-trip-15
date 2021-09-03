import SiteMenuView from '../view/site-menu.js';
import NewEventButtonView from '../view/new-event-button.js';
import {render} from '../utils/render.js';
import {FilterType, MenuItem, RenderPosition, UpdateType} from '../const.js';

export default class SiteMenu {
  constructor(newButtonContainer, siteMenuContainer, boardPresenter, statisticsPresenter, filtersPresenter, filtersModel) {
    this._newButtonContainer = newButtonContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._boardPresenter = boardPresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._filtersPresenter = filtersPresenter;
    this._filtersModel = filtersModel;

    this._siteMenuComponent = new SiteMenuView();
    this._newEventButtonComponent = new NewEventButtonView();

    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._newButtonContainer, this._newEventButtonComponent, RenderPosition.BEFOREEND);

    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._handleNewEventFormClose = this._handleNewEventFormClose.bind(this);

    this._siteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);
    this._newEventButtonComponent.setMenuClickHandler(this._handleSiteMenuClick);
  }

  _handleNewEventFormClose() {
    this._newEventButtonComponent.getElement().disabled = false;
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.ADD_NEW_EVENT:
        this._statisticsPresenter.destroy();
        this._boardPresenter.destroy();
        this._filtersModel.setFilter(UpdateType.RESET, FilterType.EVERYTHING);
        this._boardPresenter.createEvent(this._handleNewEventFormClose);
        this._boardPresenter.init();
        this._newEventButtonComponent.getElement().disabled = true;
        this._filtersPresenter.init();
        this._siteMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      case MenuItem.TABLE:
        this._statisticsPresenter.destroy();
        this._boardPresenter.init();
        this._filtersPresenter.init();
        this._siteMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      case MenuItem.STATS:
        this._boardPresenter.destroy();
        this._statisticsPresenter.init();
        this._filtersPresenter.init(true);
        this._siteMenuComponent.setMenuItem(MenuItem.STATS);
        break;
    }
  }
}
