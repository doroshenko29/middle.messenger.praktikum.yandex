import Sinon, {createSandbox} from 'sinon';
import Block from "./block";

describe('Block', () => {
    const sandbox = createSandbox();
    class TestComponent extends Block {
        render() {
            return this.compile('<div></div>', {})
        }

        override show() {
        
        }

        override hide() {}
    }

    let render: ReturnType<typeof sandbox.spy>;
    let component: Block;
    beforeEach(() => {
        component = new TestComponent({someProp: 'someValue'});
        render = sandbox.spy(component, 'render');
    })

    it('render не вызывается, если props не изменяли', () => {
        component.setProps({someProp: 'someValue'});
        Sinon.assert.notCalled(render);
    })

    it('render вызывается единожды, если изменить props', () => {
        component.setProps({someProp: 'otherValue'});
        Sinon.assert.calledOnce(render);
    })
})
