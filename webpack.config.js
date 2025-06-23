const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "@icons": path.resolve(__dirname, "src/assets/icons"),
      "@logo": path.resolve(__dirname, "src/assets/logo"),

      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@container": path.resolve(__dirname, "src/container"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@data": path.resolve(__dirname, "src/data"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /url/, // *.svg?url → asset 처리 (문자열 경로)
            type: "asset/resource",
          },
          {
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"], // 기본: ReactComponent로 사용
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  mode: "development",
};
