import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let http: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
          requests.push(request);
        });
    
        http = new HTTPTransport('https://test/api');
    });

    afterEach(() => {
        xhr.restore();
        requests = [];
    });

    describe('GET запрос', () => {
        let request: SinonFakeXMLHttpRequest;
        beforeEach(() => {
            http.get('/example', {
                data: {
                    first: '1',
                    second: '2',
                },
                headers: {
                    Host: 'test',
                }
            });
            [request] = requests;
        });
        
        it('должен отправляться с методом GET', () => {
            expect(request.method).to.eq('GET');
        });

        it('должен отправляться единожды', () => {
            expect(requests.length).to.equal(1);
        });

        it('должен отправляться с конкретным url', () => {
            expect(request.url).to.eq('https://test/api/example?first=1&second=2');
        });

        it('должен содержать withCredentials', () => {
            expect(request.withCredentials).to.eq(true);
        });
    })

    describe('POST запрос', () => {
        let request: SinonFakeXMLHttpRequest;
        beforeEach(() => {
            http.post('', {
                data: {
                    name: 'John',
                    age: '50',
                }
            });
            [request] = requests;
        });
        
        it('должен отправляться с методом POST', () => {
            expect(request.method).to.eq('POST');
        });

        it('должен отправляться единожды', () => {
            expect(requests.length).to.equal(1);
        });

        it('должен отправляться с url без querry', () => {
            expect(request.url).to.eq('https://test/api');
        });

        it('должен содержать тело запроса', () => {
            expect(request.requestBody).to.deep.equal({
                name: 'John',
                age: '50',
            });
        });
        
        it('должен содержать withCredentials', () => {
            expect(request.withCredentials).to.eq(true);
        });
    })

    describe('PUT запрос', () => {
        let request: SinonFakeXMLHttpRequest;
        beforeEach(() => {
            http.put('/this/is/put/example/test/long', {
                data: new FormData(),
            });
            [request] = requests;
        });
        
        it('должен отправляться с методом PUT', () => {
            expect(request.method).to.eq('PUT');
        });

        it('должен отправляться единожды', () => {
            expect(requests.length).to.equal(1);
        });

        it('должен отправляться с url без querry', () => {
            expect(request.url).to.eq('https://test/api/this/is/put/example/test/long');
        });

        it('должен отправлять FormData', () => {
            expect(request.requestBody).instanceOf(FormData);
        });
        
        it('должен содержать withCredentials', () => {
            expect(request.withCredentials).to.eq(true);
        });
    })

    describe('DELETE запрос', () => {
        let request: SinonFakeXMLHttpRequest;
        beforeEach(() => {
            http.delete('/user/2');
            [request] = requests;
        });
        
        it('должен отправляться с методом DELETE', () => {
            expect(request.method).to.eq('DELETE');
        });

        it('должен отправляться единожды', () => {
            expect(requests.length).to.equal(1);
        });

        it('должен отправляться с url без querry', () => {
            expect(request.url).to.eq('https://test/api/user/2');
        });
        
        it('должен содержать withCredentials', () => {
            expect(request.withCredentials).to.eq(true);
        });
    })
})
