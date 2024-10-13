import Block from "../blocks/block";
import isEqual from "../utils/isEqual";

interface IRouteProps {
	rootQuery: HTMLElement;
    [key: string]: unknown;
}

export default class Route {
    protected _block: Block | null = null;

    protected _pathname: string;

    protected _blockClass: new (_args?: unknown) => Block;

    protected _props: IRouteProps;

    constructor(pathname: string, view: new (_args?: unknown) => Block, props: IRouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide(this._props.rootQuery);
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
        }

        this._block!.show(this._props.rootQuery);
    }
}
