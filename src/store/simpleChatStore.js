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
exports.simpleChatStore = void 0;
var main_1 = require("./main");
var SimpleChatStore = /** @class */ (function (_super) {
    __extends(SimpleChatStore, _super);
    function SimpleChatStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleChatStore.prototype.data = function () {
        return {
            websocks: {},
            users: {},
            callings: {},
            candidates: {},
            losP1: {}
        };
    };
    SimpleChatStore.prototype.registerWS = function (payload) {
        var d = this.state;
        var wsid = payload.wsid;
        d.websocks[wsid] = payload.ws;
        d.users[wsid] = {};
        d.callings[wsid] = {};
        d.candidates[wsid] = {};
        d.losP1[wsid] = {};
    };
    SimpleChatStore.prototype.registerUser = function (wsid, payload) {
        this.state.users[wsid][payload.from_uid] = payload;
    };
    SimpleChatStore.prototype.unregisterUser = function (wsid, from_uid) {
        if (this.state.users[wsid][from_uid] !== undefined) {
            this.state.users[wsid][from_uid]['close'] = true;
        }
    };
    SimpleChatStore.prototype.sendTT1Candidate = function (payload) {
        var wsid = payload.channel + "/" + payload.channelid;
        var wss0 = this.state.websocks[wsid];
        if (wss0 !== undefined) {
            wss0.send(JSON.stringify({ action: 'sendT1Candidate', payload: payload }));
        }
    };
    SimpleChatStore.prototype.registerCalling = function (wsid, payload) {
        this.state.callings[wsid][payload.from_uid] = payload;
    };
    SimpleChatStore.prototype.unregisterCalling = function (wsid, from_uid) {
        this.state.callings[wsid][from_uid] = undefined;
    };
    SimpleChatStore.prototype.registerT1Candidate = function (wsid, payload) {
        this.state.candidates[wsid][payload.from_uid] = payload;
    };
    SimpleChatStore.prototype.registerWebRealLon = function (wsid, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.state.losP1[wsid][payload.to_uid] = payload.pc1;
            resolve(1);
        });
    };
    SimpleChatStore.prototype.sendWRTDescription = function (wsid, payload) {
        var wss0 = this.state.websocks[wsid];
        if (wss0 !== undefined) {
            wss0.send(JSON.stringify({ action: 'sendWRTDescription', payload: payload }));
        }
    };
    SimpleChatStore.prototype.sendWRTDescription2_to1 = function (wsid, payload) {
        var wss0 = this.state.websocks[wsid];
        if (wss0 !== undefined && wss0.readyState === 1) {
            wss0.send(JSON.stringify({
                action: "sendWRTDescription2_to1",
                'payload': payload
            }));
        }
    };
    SimpleChatStore.prototype.sendResponseTT2Candidate = function (wsid, payload) {
        var wss0 = this.state.websocks[wsid];
        if (wss0 !== undefined && wss0.readyState === 1) {
            wss0.send(JSON.stringify({
                action: 'sendTT2Candidate',
                'payload': payload
            }));
        }
    };
    // sendT2Candidate(wsid:string,payload:any) {
    //     const wss0:WebSocket = this.state.websocks[wsid]
    //     if (wss0 !== undefined && wss0.readyState === 1) {
    //         wss0.send(JSON.stringify({
    //             action: 'sendT2Candidate',
    //             'payload': payload
    //         }))
    //     }
    // }
    SimpleChatStore.prototype.recibidoWRTDescription2to1 = function (wsid, payload) {
        var elP1 = this.getState().losP1[wsid][payload.from_uid]; //WRLT2
        var remoteDescription = payload.description;
        elP1.setRemoteDescription(remoteDescription).then(function () {
        }, function (e) {
            console.log("!!!!!!!!!! EEEE en seRemoteDescriptin", e);
        });
    };
    SimpleChatStore.prototype.sendTT2Candidate = function (wsid, payload) {
        var elP1 = this.getState().losP1[wsid][payload.from_uid]; //WRLT2
        elP1.addIceCandidate(payload.candidate);
    };
    SimpleChatStore.prototype.putOnPc2RemoteDescription = function (pc2, wsid, uid) {
        var elCall0 = this.state.callings[wsid][uid];
        var elCall = Object.assign({}, elCall0);
        return new Promise(function (resolve, reject) {
            pc2.setRemoteDescription(elCall.description).then(function () {
                resolve(1);
            }, function (err00) {
                console.log("EEEEEE EEE EEE ", err00);
                reject(err00);
            });
        });
    };
    return SimpleChatStore;
}(main_1.Store));
exports.simpleChatStore = new SimpleChatStore();
