module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'react-app.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
	    },
        {
            test: /\.mp3$/,
            loader: 'file-loader',
            options: {
                name: 'static/sounds/[name].[hash:8].[ext]'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};