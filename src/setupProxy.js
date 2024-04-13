const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/kopis",
    createProxyMiddleware({
      target: "http://www.kopis.or.kr",
      changeOrigin: true,
      secure: false,
    })
  );
};
