const path = require('path');
module.exports = {
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env']
                    }
                },
                // options: {
                //     sourceMap: true,
                // },
                exclude: /node_modules/,
            },
        ]
    }
}