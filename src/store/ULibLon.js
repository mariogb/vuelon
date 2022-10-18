"use strict";
exports.__esModule = true;
exports.uLibLon = void 0;
var buildHeaders = function () {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
        'Content-Type': 'application/json;charset=UTF-8'
    };
};
var backEnd = function () {
    var be0 = localStorage.getItem("BACKEND");
    if (be0 === null) {
        return 'localhost:8899';
    }
    return be0;
};
var putBackEnd = function (h) {
    localStorage.setItem("BACKEND", h);
};
var hws0 = function () {
    return localStorage.getItem("HTTPSCHEMA") === "true";
};
var httpSchema = function () {
    return hws0() === true ? "https" : "http";
};
var wsSchema = function () {
    return hws0() === true ? "wss" : "ws";
};
var setHttpSchema = function (v) {
    localStorage.setItem("HTTPSCHEMA", v + "");
};
function ULibLon() {
    return {
        backEnd: backEnd,
        httpSchema: httpSchema,
        wsSchema: wsSchema,
        buildHeaders: buildHeaders,
        setHttpSchema: setHttpSchema,
        putBackEnd: putBackEnd
    };
}
exports.uLibLon = ULibLon();
