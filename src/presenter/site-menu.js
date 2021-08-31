import SiteMenuView from '../view/site-menu.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class SiteMenu {
  constructor(siteMenuContainer) {
    this._siteMenuContainer = siteMenuContainer;

    this._siteMenuComponent = new SiteMenuView();

    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }
}
