"use strict";
exports.__esModule = true;
exports.doSave = exports.doList = exports.convertToLDCObject = void 0;
var axios_1 = require("axios");
var ULibLon_1 = require("./ULibLon");
var buildHeaders = function () {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
        'Content-Type': 'application/json;charset=UTF-8'
    };
};
var mapToListLon = function (m) {
    var list0 = m.l;
    var list2 = [];
    var ns = m.names;
    for (var idx in list0) {
        var e = list0[idx];
        var e2 = {};
        for (var jdx = 0; jdx < ns.length; jdx++) {
            e2[ns[jdx]] = e[jdx];
        }
        list2.push(e2);
    }
    return list2;
};
var convertToLDCObject = function (dc, data) {
    var l_ = mapToListLon(data);
    return {
        dc: dc,
        l: l_,
        names: data.names,
        offset: data.offset,
        total: data.total,
        max: data.max
    };
};
exports.convertToLDCObject = convertToLDCObject;
var doList = function (payload) {
    var p0 = payload.params;
    var lp = [];
    for (var p in p0) {
        if (p0[p] !== null && typeof (p0[p]) === "object") {
            p0[p].forEach(function (e) {
                lp.push(p + "=" + e);
            });
        }
        else {
            lp.push(p + "=" + p0[p]);
        }
    }
    return new Promise(function (resolve, reject) {
        var h = "".concat(ULibLon_1.uLibLon.httpSchema(), "://").concat(ULibLon_1.uLibLon.backEnd(), "/pg/payload.dc/l?").concat(lp.join("&"));
        var headers = buildHeaders();
        axios_1["default"].get(h, { headers: headers }).then(function (response) {
            resolve((0, exports.convertToLDCObject)(payload.dc, response.data));
        })["catch"](function (error) {
            reject(error);
        });
    });
};
exports.doList = doList;
var doSave = function (payload) {
    return new Promise(function (resolve, reject) {
        var h = "".concat(ULibLon_1.uLibLon.httpSchema(), "://").concat(ULibLon_1.uLibLon.backEnd(), "/pg/").concat(payload.dc, "/sou");
        var headers = buildHeaders();
        axios_1["default"].put(h, payload.item, { headers: headers, data: payload.item }).then(function (response) {
            resolve(response.data);
        })["catch"](function (error) {
            if (error.response) {
                console.log("error.response");
                console.log(error.response);
            }
            else if (error.request) {
                console.log("error.request");
                console.log(error.request);
            }
            else {
                console.log("no se que paso");
            }
            reject(error);
        });
    });
};
exports.doSave = doSave;
