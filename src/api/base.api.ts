export default abstract class BaseAPI {
    create(_args?: unknown) { throw new Error('Not implemented'); }

    request(_args?: unknown) { throw new Error('Not implemented'); }

    update(_args?: unknown) { throw new Error('Not implemented'); }

    delete(_args?: unknown) { throw new Error('Not implemented'); }
}
