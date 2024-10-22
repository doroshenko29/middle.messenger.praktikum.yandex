import { JSDOM, DOMWindow } from 'jsdom';
import sinon, { SinonFakeXMLHttpRequestStatic } from 'sinon';

const jsdom = new JSDOM('<body></body>', {
    url: 'http://example.org/'
});

const xhr = sinon.useFakeXMLHttpRequest();

(global.window as unknown as DOMWindow) = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
(global.XMLHttpRequest as unknown as SinonFakeXMLHttpRequestStatic) = xhr;
