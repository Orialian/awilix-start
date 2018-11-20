/*
 *@Description基础请求类
 *@Date 2015-04-06
 */
// var request = require('request');
// var WEB_CONFIG = require('./webConfig'),
//     encryptTools = require('./authCode').encryptTools;
// var generateUrlParams = encryptTools.generateUrlParams,
//     encryptParams = encryptTools.encryptParams;

// var APP_ID = 'www2';

// var _safeFactory = function(params) {
//     // request settings
//     var ifEncrypt = params.encrypt && true || false;

//     var hostUrl = (params.host || WEB_CONFIG.coreUrl) + params.url;
//     var reqOptions = {
//         url: hostUrl,
//         json: true,
//         timeout: WEB_CONFIG.intServiceReqTimeout
//     };
//     if (!params.post) {
//         if (ifEncrypt) {
//             reqOptions.url += generateUrlParams(encryptParams({
//                 params: JSON.stringify(params.query),
//                 version: WEB_CONFIG.version,
//                 client: WEB_CONFIG.client,
//                 accessflag: WEB_CONFIG.accessflag,
//                 appid: APP_ID
//             }))
//         } else
//             reqOptions.url += '?params=' + JSON.stringify(params.query) +
//             '&version=' + WEB_CONFIG.version +
//             '&client=' + WEB_CONFIG.client +
//             '&accessflag=' + WEB_CONFIG.accessflag;
//         //console.log(reqOptions.url);
//     } else {
//         reqOptions.url += '?version=' + WEB_CONFIG.version +
//             '&client=' + WEB_CONFIG.client +
//             '&accessflag=' + WEB_CONFIG.accessflag;

//         if (ifEncrypt)
//             reqOptions.formData = encryptParams(params.query);
//         else
//             reqOptions.formData = params.query;
//     }

//     var callback = params.success;
//     var errCallback = params.error;
//     var requestCallback = function(err, res, body) {
//         var _body = {
//             msg: "服务器错误！"
//         };
//         if (err) {
//             var reqInfo = JSON.stringify(reqOptions, null, 4);
//             if (err.code === 'ETIMEDOUT') {
//                 console.error(err + ', fail to request api: ' + reqInfo);
//             }
//         } else if (!body && res.statusCode === 200) {
//             console.warn('Http no error, statusCode: 200, no body.');
//         }
//         try {
//             if (body instanceof Object || err) { //当body为字符串的时候request并不会传递err。
//                 _body = body;
//                 if (body.code == "200") {
//                     //console.timeEnd(reqOptions.url);
//                     callback(err, res, _body);
//                 } else {
//                     //console.timeEnd(reqOptions.url);
//                     //console.log(body);
//                     callback(new Error('Http no error, statusCode not  200'), res, _body);
//                 }
//             } else {
//                 //console.timeEnd(reqOptions.url);
//                 console.error('Response Error: ' + reqOptions.url, err);
//                 callback(new Error('Fail to parse http response to json, url:' + reqOptions.url + ', http status: ' + res.statusCode + ' body:' + body), res, _body);
//             }
//         } catch (e) {
//             //console.timeEnd(reqOptions.url);
//             console.error('Request Callback Error: ' + reqOptions.url, e);
//             errCallback && errCallback(e, res, _body);
//         }
//     };

//     // send the request
//     //console.time(reqOptions.url);
//     if (params.post)
//         request.post(reqOptions, requestCallback);
//     else
//         request(reqOptions, requestCallback);

// };

// module.exports = _safeFactory;


safeRequest({
    url: webConfig.urls.userauth,
    query: params,
    success: function (error, response, body) {
         if (!error) {
             req.data.userauth = body;
         }
         next();
    },
    error: function () {
       next();
    }
});