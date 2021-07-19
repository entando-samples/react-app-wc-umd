const path = require("path");
const PACKAGE = require('./package.json');
const version = PACKAGE.version;
const name = PACKAGE.name;

function parseName(name){
  let slashIndex = name.indexOf("/")
  let orgName = name.substr(1,slashIndex-1)
  let projectName = name.substr(slashIndex+1)
  return {
    orgName: orgName,
    projectName: projectName
  }
}



module.exports = (webpackConfigEnv, argv) => {
  const projectDetails = parseName(name)
  return _webpackConfig({
    orgName: projectDetails.orgName,
    projectName: projectDetails.projectName,
    webpackConfigEnv,
    argv,
  });
};

function _webpackConfig(opts) {
  let argv = opts.argv || {};

  let isProduction = argv.p || argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(
        process.cwd(),
        `src/${opts.orgName}-${opts.projectName}.js`
    ),
    output: {
      filename: `${opts.orgName}-${opts.projectName}-${version}.js`,
      libraryTarget: "umd",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: opts.projectName,
      devtoolNamespace: `${opts.projectName}`,
      publicPath: "",
    },
    externals: {
      "react-dom": "ReactDOM",
      react: "React",
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve("babel-loader", { paths: [__dirname] }),
          },
        },
        {
          //https://forum.freecodecamp.org/t/using-external-css-in-a-web-component-with-webpack/326307/3
          test: /(?<!\.style).css$/,
          include: [/node_modules/, /src/],
          use: [
            {
              loader: require.resolve("style-loader", { paths: [__dirname] }),
            },
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: false
              },
            },
          ],
        },
        {
          test: /\.style\.css$/,
          include: [/node_modules/, /src/],
          use: [
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: false
              },
            },
          ],
        },
        {
          test: /\.(bmp|png|svg|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          type: "asset/resource",
        },
        {
          test: /\.html$/i,
          exclude: /node_modules/,
          type: "asset/source",
        },
      ],
    },
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      firewall: false,
      static: path.join(__dirname, "public"),
      client: {
        host: "localhost",
      },
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".wasm", ".json"],
    },
  };
}
