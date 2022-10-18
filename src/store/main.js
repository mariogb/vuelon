"use strict";
exports.__esModule = true;
exports.Store = void 0;
var vue_1 = require("vue");
var Store = /** @class */ (function () {
    function Store() {
        var data = this.data();
        this.setup(data);
        this.state = (0, vue_1.reactive)(data);
        return this;
    }
    Store.prototype.setup = function (data) { };
    Store.prototype.getState = function () {
        // TODO the readonly state should only be used in dev environment... otherwise just return the state
        return (0, vue_1.readonly)(this.state);
    };
    return Store;
}());
exports.Store = Store;
