const {
    join
} = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    output: {
        path: join(__dirname, '../dist/assets/'),
        filename: "scripts/[name].bundle.js"
    },
    plugins: [

        new CopyWebpackPlugin([{
            from: join(__dirname, '../' + "/src/webapp/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        new CopyWebpackPlugin([{
            from: join(__dirname, '../' + "/src/webapp/components"),
            to: '../components'
        }], {
            copyUnmodified: true,
            ignore: ['*.js', '*.css', '.DS_Store']
        })

    ]
}