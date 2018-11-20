const pluginName = 'HtmlAfterPlugin';
const assetHelp = (data)=>{
    let css = [], js = [];
    const dir = {
        js: item => `<script src="${item}"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for(let jsItem of data.js) {
        js.push(dir.js(jsItem))
    }
    for(let cssItem of data.css) {
        css.push(dir.css(cssItem))
    }
    return {
        css, js
    }
}
class HtmlAfterPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData=>{
          let _html = htmlPluginData.html;
          _html = _html.replace(/common:/g, '../../');
          _html = _html.replace(/components:/g, '../../../');
          const result = assetHelp(htmlPluginData.assets);
          _html = _html.replace('<!-- injectcss -->', result.css.join(''));
          _html = _html.replace('<!-- injectjs -->', result.js.join(''));
          htmlPluginData.html = _html;
      })
    });
  }
}
module.exports = HtmlAfterPlugin;