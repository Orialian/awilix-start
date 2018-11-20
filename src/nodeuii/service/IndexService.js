/**
 * @fileOverview 实现index的数据模型
 * @author yuanzhijia@yidengxuetang.com
 */
const path = require("path");
/**
 * IndexModel类，生成一段异步的数据
 * @class
 */
class IndexService{
    /**
     * @constructor
     * @param {string} app koa2的上下文环境
     */
    constructor(app){
        this.app = app;
    }
    /**
     * 获取具体的API的接口数据
     * @returns {Promise}返回的异步处理结果
     * @example
     * return new Promise
     * getData()
     */
    getData(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("Hello Action");
            },1000);
        })
    }
}
export default IndexService;