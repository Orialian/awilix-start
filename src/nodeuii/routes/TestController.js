import {
    route,
    GET,
    POST
} from 'awilix-koa';

@route('/data')
class TestController {
    constructor({
        indexService
    }) {
        this.indexService = indexService;
    }

    @route('/')
    @GET()
    async testAction(ctx, next) {
        ctx.body = await ctx.render('index/pages/test.html')
    }
}
export default TestController;