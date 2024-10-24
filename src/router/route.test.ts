import sinon from "sinon";
import { expect } from "chai";
import Router from ".";
import Block from "../blocks/block";

describe('Route', () => { 
    class TestComponent extends Block {
        override render() {
            return '' as unknown as DocumentFragment;
        }

        override show() {}

        override hide() {}
    }
    let router: Router;
    const getContentFake: HTMLElement = sinon.fake.returns(document.createElement('div'))();

    beforeEach(() => {
        router = new Router(getContentFake);
        router
            .use('/', TestComponent)
            .use('/testRoute', TestComponent)
            .use('/testLastRoute', TestComponent)
            .start()
    });

    it('Вызываем Router. Инстанс не пересоздался', () => {
        // eslint-disable-next-line no-new
        new Router(sinon.fake.returns(document.createElement('a'))())
        
        // дизейблим проверки, чтобы достучаться до protected
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        expect((router as any)._rootQuery).eq(getContentFake)
    })

    it('При входе история имеет одно значение и оно соответствует стартовому', () => { 
        expect(window.history.length).to.eq(1);
        expect(window.location.pathname).to.eq('/')
    })

    it('Должен корректно осуществляться переход к testRoute через строку браузера', () => {
        router.go('/testRoute')
        expect(window.history.length).to.eq(2);
        expect(window.location.pathname).to.eq('/testRoute')
    })

    it('Должен корректно осуществляться переход к testLastRoute через строку браузера', () => {
        router.go('/testLastRoute')
        expect(window.history.length).to.eq(3);
        expect(window.location.pathname).to.eq('/testLastRoute');
    })
})
