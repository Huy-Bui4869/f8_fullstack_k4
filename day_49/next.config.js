/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @import "./src/assets/parts/_variable.scss";
      @import "./src/assets/parts/_mixin.scss";
      @import "./src/assets/parts/_basic.scss";
    `,
  },
};
