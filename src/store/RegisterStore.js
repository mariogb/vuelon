"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.registerStore = void 0;
var axios_1 = require("axios");
var main_1 = require("./main");
var ULibLon_1 = require("./ULibLon");
var RegisterStore = /** @class */ (function (_super) {
    __extends(RegisterStore, _super);
    function RegisterStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegisterStore.prototype.data = function () {
        return {
            registerUser: {},
            registerUserError: {}
        };
    };
    RegisterStore.prototype.doRegister = function (u) {
        var h = "".concat(ULibLon_1.uLibLon.httpSchema(), "://\" + ").concat(ULibLon_1.uLibLon.backEnd(), "/register");
        var s0 = this;
        axios_1["default"].post(h, { user: u }).then(function (response) {
            var d = response.data;
            console.log(d);
        })["catch"](function (e) {
            if (e.response === undefined) {
                alert(e.message);
                //  return
            }
            if (e.status === 401) {
                alert("401");
            }
            if (e.response) {
                s0.state.registerUserError['error'] = e.response.data;
            }
            console.log(e);
        });
    };
    return RegisterStore;
}(main_1.Store));
exports.registerStore = new RegisterStore();
