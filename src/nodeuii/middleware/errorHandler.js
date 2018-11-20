const errorHandler = {
    error(app,logger){
        app.use(async(ctx,next)=>{
            try {
                await next()
            } catch (error) {
                logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = "😢网站挂掉了"
            }
        })
        app.use(async(ctx,next)=>{
            await next();
            if(404 != ctx.status) return;
            ctx.status = 404;
            //打电话 发短信 发邮件
            logger.error("我的天啊404👻");
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
        });
    }
}
export default errorHandler;