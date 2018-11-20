import {
    route,
    GET,
    POST
} from 'awilix-koa';

@route('/')
class IndexController {
    constructor({
        indexService
    }) {
        this.indexService = indexService;
    }

    @route('')
    @GET()
    async indexAction(ctx, next) {
        const result = await this.indexService.getData();
        ctx.body = {
            result
        };
    }

    @route('test')
    @GET()
    async testAction(ctx, next) {
        ctx.body = await ctx.render('index/pages/test.html')
    }
}
export default IndexController;