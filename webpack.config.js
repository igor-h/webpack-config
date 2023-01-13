const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => {
    const {mode} = argv;
    const isProduction = mode === 'production';

    const backendUrl = isProduction
    ? 'https://fierce-shelf-74800.herokuapp.com/api/notes' // for production
    : 'http://localhost:3001/api/notes' // for localhost


    return {
        // entry: './src/index.js', // this is like this by default
        output: {
            filename: isProduction 
                ? '[name].[contentHash].js'  // add has to our build files name, to avoid cache
                : 'main.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new webpack.DefinePlugin({
                // Define global const that can be used in the build app.
                BACKEND_URL: JSON.stringify(backendUrl)
            }),
            new HtmlWebPackPlugin({template: 'src/index.html'})
        ],
        devServer: {
            open: true, // open the browser when run webServer
            port: 3000,  // default port 8080
            compress: true
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic'
                            }
                        ]
                    ]
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader', // resolver la syntaxis del código css
                        'css-loader' // resolver los imports & required 
                    ]
                }
            ]
        }
    }
}
