"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_asus_OneDrive_Desktop_nodejs_proxyzen_next_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\asus\\\\OneDrive\\\\Desktop\\\\nodejs\\\\proxyzen-next\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_asus_OneDrive_Desktop_nodejs_proxyzen_next_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhc3VzJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDbm9kZWpzJTVDcHJveHl6ZW4tbmV4dCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYXN1cyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q25vZGVqcyU1Q3Byb3h5emVuLW5leHQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2tEO0FBQy9IO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJveHl6ZW4vPzI3ZjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYXN1c1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG5vZGVqc1xcXFxwcm94eXplbi1uZXh0XFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxub2RlanNcXFxccHJveHl6ZW4tbmV4dFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n// app/api/auth/[...nextauth]/route.ts\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFzQztBQUNOO0FBQ1E7QUFFeEMsTUFBTUUsVUFBVUYsZ0RBQVFBLENBQUNDLGtEQUFXQTtBQUNNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJveHl6ZW4vLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXG5pbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJ1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"(rsc)/./lib/db.ts\");\n// lib/auth.ts\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/auth/login\",\n        error: \"/auth/login\"\n    },\n    providers: [\n        // ── Google OAuth ─────────────────────────────────────────\n        ...process.env.GOOGLE_CLIENT_ID ? [\n            (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n                clientId: process.env.GOOGLE_CLIENT_ID,\n                clientSecret: process.env.GOOGLE_CLIENT_SECRET\n            })\n        ] : [],\n        // ── Email / Password ─────────────────────────────────────\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"E-posta\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Şifre\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const { rows } = await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].query(\"SELECT * FROM users WHERE email = $1\", [\n                    credentials.email.toLowerCase().trim()\n                ]);\n                const user = rows[0];\n                if (!user) return null;\n                if (!user.password_hash) return null;\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password_hash);\n                if (!ok) return null;\n                await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].query(\"UPDATE users SET last_login=NOW() WHERE id=$1\", [\n                    user.id\n                ]);\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    image: user.avatar_url,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        // Google ile giriş → DB'ye kaydet / güncelle\n        async signIn ({ user, account }) {\n            if (account?.provider === \"google\") {\n                const { rows } = await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].query(\"SELECT * FROM users WHERE google_id=$1 OR email=$2\", [\n                    account.providerAccountId,\n                    user.email\n                ]);\n                if (rows.length) {\n                    await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].query(\"UPDATE users SET google_id=$1, avatar_url=$2, last_login=NOW() WHERE id=$3\", [\n                        account.providerAccountId,\n                        user.image,\n                        rows[0].id\n                    ]);\n                    user.role = rows[0].role;\n                    user.id = rows[0].id;\n                } else {\n                    const ins = await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].query(`INSERT INTO users (email, name, avatar_url, google_id, email_verified, role)\n             VALUES ($1,$2,$3,$4,true,'user') RETURNING id, role`, [\n                        user.email,\n                        user.name,\n                        user.image,\n                        account.providerAccountId\n                    ]);\n                    user.role = ins.rows[0].role;\n                    user.id = ins.rows[0].id;\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFDdENQLEtBQUtJLEVBQUUsR0FBR1MsSUFBSWpCLElBQUksQ0FBQyxFQUFFLENBQUNRLEVBQUU7Z0JBQzFCO1lBQ0Y7WUFDQSxPQUFPO1FBQ1Q7UUFFQSxNQUFNVSxLQUFJLEVBQUVDLEtBQUssRUFBRWYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JlLE1BQU1YLEVBQUUsR0FBS0osS0FBS0ksRUFBRTtnQkFDcEJXLE1BQU1SLElBQUksR0FBRyxLQUFjQSxJQUFJO1lBQ2pDO1lBQ0EsT0FBT1E7UUFDVDtRQUVBLE1BQU10QyxTQUFRLEVBQUVBLE9BQU8sRUFBRXNDLEtBQUssRUFBRTtZQUM5QixJQUFJdEMsUUFBUXVCLElBQUksRUFBRTtnQkFDZnZCLFFBQVF1QixJQUFJLENBQVNJLEVBQUUsR0FBS1csTUFBTVgsRUFBRTtnQkFDbkMzQixRQUFRdUIsSUFBSSxDQUFTTyxJQUFJLEdBQUdRLE1BQU1SLElBQUk7WUFDMUM7WUFDQSxPQUFPOUI7UUFDVDtJQUNGO0FBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3h5emVuLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWIvYXV0aC50c1xuaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSdcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXG5pbXBvcnQgZGIgZnJvbSAnLi9kYidcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6ICdqd3QnIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAgJy9hdXRoL2xvZ2luJyxcbiAgICBlcnJvcjogICAnL2F1dGgvbG9naW4nLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICAvLyDilIDilIAgR29vZ2xlIE9BdXRoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIC4uLihwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEID8gW1xuICAgICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgICBjbGllbnRJZDogICAgIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxuICAgICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUISxcbiAgICAgIH0pXG4gICAgXSA6IFtdKSxcblxuICAgIC8vIOKUgOKUgCBFbWFpbCAvIFBhc3N3b3JkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiAgICB7IGxhYmVsOiAnRS1wb3N0YScsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICfFnmlmcmUnLCAgIHR5cGU6ICdwYXNzd29yZCcgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGxcblxuICAgICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KFxuICAgICAgICAgICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJDEnLFxuICAgICAgICAgIFtjcmVkZW50aWFscy5lbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKV1cbiAgICAgICAgKVxuICAgICAgICBjb25zdCB1c2VyID0gcm93c1swXVxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXG4gICAgICAgIGlmICghdXNlci5wYXNzd29yZF9oYXNoKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmRfaGFzaClcbiAgICAgICAgaWYgKCFvaykgcmV0dXJuIG51bGxcblxuICAgICAgICBhd2FpdCBkYi5xdWVyeSgnVVBEQVRFIHVzZXJzIFNFVCBsYXN0X2xvZ2luPU5PVygpIFdIRVJFIGlkPSQxJywgW3VzZXIuaWRdKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6ICAgIHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogIHVzZXIubmFtZSxcbiAgICAgICAgICBpbWFnZTogdXNlci5hdmF0YXJfdXJsLFxuICAgICAgICAgIHJvbGU6ICB1c2VyLnJvbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgY2FsbGJhY2tzOiB7XG4gICAgLy8gR29vZ2xlIGlsZSBnaXJpxZ8g4oaSIERCJ3llIGtheWRldCAvIGfDvG5jZWxsZVxuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQgfSkge1xuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnZ29vZ2xlJykge1xuICAgICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IGRiLnF1ZXJ5KFxuICAgICAgICAgICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGdvb2dsZV9pZD0kMSBPUiBlbWFpbD0kMicsXG4gICAgICAgICAgW2FjY291bnQucHJvdmlkZXJBY2NvdW50SWQsIHVzZXIuZW1haWxdXG4gICAgICAgIClcbiAgICAgICAgaWYgKHJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgYXdhaXQgZGIucXVlcnkoXG4gICAgICAgICAgICAnVVBEQVRFIHVzZXJzIFNFVCBnb29nbGVfaWQ9JDEsIGF2YXRhcl91cmw9JDIsIGxhc3RfbG9naW49Tk9XKCkgV0hFUkUgaWQ9JDMnLFxuICAgICAgICAgICAgW2FjY291bnQucHJvdmlkZXJBY2NvdW50SWQsIHVzZXIuaW1hZ2UsIHJvd3NbMF0uaWRdXG4gICAgICAgICAgKVxuICAgICAgICAgIDsodXNlciBhcyBhbnkpLnJvbGUgPSByb3dzWzBdLnJvbGVcbiAgICAgICAgICB1c2VyLmlkID0gcm93c1swXS5pZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlucyA9IGF3YWl0IGRiLnF1ZXJ5KFxuICAgICAgICAgICAgYElOU0VSVCBJTlRPIHVzZXJzIChlbWFpbCwgbmFtZSwgYXZhdGFyX3VybCwgZ29vZ2xlX2lkLCBlbWFpbF92ZXJpZmllZCwgcm9sZSlcbiAgICAgICAgICAgICBWQUxVRVMgKCQxLCQyLCQzLCQ0LHRydWUsJ3VzZXInKSBSRVRVUk5JTkcgaWQsIHJvbGVgLFxuICAgICAgICAgICAgW3VzZXIuZW1haWwsIHVzZXIubmFtZSwgdXNlci5pbWFnZSwgYWNjb3VudC5wcm92aWRlckFjY291bnRJZF1cbiAgICAgICAgICApXG4gICAgICAgICAgOyh1c2VyIGFzIGFueSkucm9sZSA9IGlucy5yb3dzWzBdLnJvbGVcbiAgICAgICAgICB1c2VyLmlkID0gaW5zLnJvd3NbMF0uaWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgICA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4ucm9sZSA9ICh1c2VyIGFzIGFueSkucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcblxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCAgID0gdG9rZW4uaWRcbiAgICAgICAgOyhzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxufVxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJHb29nbGVQcm92aWRlciIsImJjcnlwdCIsImRiIiwiYXV0aE9wdGlvbnMiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwicHJvdmlkZXJzIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInJvd3MiLCJxdWVyeSIsInRvTG93ZXJDYXNlIiwidHJpbSIsInVzZXIiLCJwYXNzd29yZF9oYXNoIiwib2siLCJjb21wYXJlIiwiaWQiLCJpbWFnZSIsImF2YXRhcl91cmwiLCJyb2xlIiwiY2FsbGJhY2tzIiwiYWNjb3VudCIsInByb3ZpZGVyIiwicHJvdmlkZXJBY2NvdW50SWQiLCJsZW5ndGgiLCJpbnMiLCJqd3QiLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n// lib/db.ts\n\nconst pool = global._pgPool ?? new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString: process.env.DATABASE_URL,\n    max: 20,\n    idleTimeoutMillis: 30000,\n    connectionTimeoutMillis: 2000\n});\nif (true) global._pgPool = pool;\nconst db = {\n    query: (text, params)=>pool.query(text, params),\n    pool\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLFlBQVk7QUFDYTtBQU16QixNQUFNQyxPQUFPQyxPQUFPQyxPQUFPLElBQUksSUFBSUgsb0NBQUlBLENBQUM7SUFDdENJLGtCQUFrQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0lBQzFDQyxLQUFLO0lBQ0xDLG1CQUFtQjtJQUNuQkMseUJBQXlCO0FBQzNCO0FBRUEsSUFBSUwsSUFBeUIsRUFBY0gsT0FBT0MsT0FBTyxHQUFHRjtBQUVyRCxNQUFNVSxLQUFLO0lBQ2hCQyxPQUFPLENBQVVDLE1BQWNDLFNBQzdCYixLQUFLVyxLQUFLLENBQUlDLE1BQU1DO0lBQ3RCYjtBQUNGLEVBQUM7QUFFRCxpRUFBZVUsRUFBRUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3h5emVuLy4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL2RiLnRzXG5pbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIF9wZ1Bvb2w6IFBvb2wgfCB1bmRlZmluZWRcbn1cblxuY29uc3QgcG9vbCA9IGdsb2JhbC5fcGdQb29sID8/IG5ldyBQb29sKHtcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLFxuICBtYXg6IDIwLFxuICBpZGxlVGltZW91dE1pbGxpczogMzAwMDAsXG4gIGNvbm5lY3Rpb25UaW1lb3V0TWlsbGlzOiAyMDAwLFxufSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbC5fcGdQb29sID0gcG9vbFxuXG5leHBvcnQgY29uc3QgZGIgPSB7XG4gIHF1ZXJ5OiA8VCA9IGFueT4odGV4dDogc3RyaW5nLCBwYXJhbXM/OiBhbnlbXSkgPT5cbiAgICBwb29sLnF1ZXJ5PFQ+KHRleHQsIHBhcmFtcyksXG4gIHBvb2wsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRiXG4iXSwibmFtZXMiOlsiUG9vbCIsInBvb2wiLCJnbG9iYWwiLCJfcGdQb29sIiwiY29ubmVjdGlvblN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9VUkwiLCJtYXgiLCJpZGxlVGltZW91dE1pbGxpcyIsImNvbm5lY3Rpb25UaW1lb3V0TWlsbGlzIiwiZGIiLCJxdWVyeSIsInRleHQiLCJwYXJhbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5Cnodejs%5Cproxyzen-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();