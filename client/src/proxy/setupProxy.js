//Any request sent by the front-end to/API will be proxied to http://localhost:4000 
//And the/API prefix in the request path will be removed.

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};


