import path from "node:path";

const dirname = import.meta.dirname;

const config = {
  mode: "production",
  entry: "./sw/sw.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: { configFile: "tsconfig.sw.json" },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: [".ts", ".js"] },
  output: {
    filename: "sw.js",
    path: path.resolve(dirname, "public"),
  },
};

export default config;
