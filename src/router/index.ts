import Block from "../blocks/block";
import ErrorPage from "../pages/error";
import { INullable } from "../utils/INullable";
import Route from "./Route";

export default class Router {
    protected routes: Array<Route>;

    protected history: History;

    protected _currentRoute: INullable<Route>;
    
    protected _rootQuery: HTMLElement; 

    private static __instance: Router;

    constructor(rootQuery: HTMLElement = Router.__instance._rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: new () => Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
      window.onpopstate = (event: PopStateEvent) => {
        this._onRoute((event.currentTarget as Window).location.pathname)
      }
      this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        if(route == null) {
          return;
        }
        route.render();
    }

    go(pathname: string) {
      const route = this.getRoute(pathname);
      if(!route) {
        return;
      }
      this._onRoute(pathname)
      this.history.pushState({}, "HistoryState", pathname);
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname)) || new Route("error", ErrorPage, {
          rootQuery: this._rootQuery,
          errorCode: "404",
          errorText: 'Страница не найдена',
        });
    }
}
