"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var qs = require("querystring");
var superagent = require("superagent");
var xml2js_1 = require("xml2js");
function login(serverIp, mac, ip, qstr) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, UserName, Password, AidcAuthAttr3, AidcAuthAttr4, AidcAuthAttr5, AidcAuthAttr6, AidcAuthAttr7, AidcAuthAttr8, baseUrl, agent, res, resCode, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = qs.parse(qstr), UserName = _a.UserName, Password = _a.Password, AidcAuthAttr3 = _a.AidcAuthAttr3, AidcAuthAttr4 = _a.AidcAuthAttr4, AidcAuthAttr5 = _a.AidcAuthAttr5, AidcAuthAttr6 = _a.AidcAuthAttr6, AidcAuthAttr7 = _a.AidcAuthAttr7, AidcAuthAttr8 = _a.AidcAuthAttr8;
                    baseUrl = "58.53.199.144:8001";
                    agent = superagent.agent();
                    return [4 /*yield*/, agent
                            .get(baseUrl)
                            .set({
                            "User-Agent": "CDMA+WLAN(Maod)"
                        })
                            .query({
                            userip: ip,
                            wlanacname: "",
                            nasip: serverIp,
                            usermac: mac,
                            aidcauthtype: 0
                        })];
                case 1:
                    res = _b.sent();
                    xml2js_1.parseString(res.text, function (err, result) {
                        config = {
                            LoginURL: result.WISPAccessGatewayParam.Redirect[0].LoginURL[0],
                            AidcAuthAttr1: result.WISPAccessGatewayParam.Redirect[0].AidcAuthAttr1[0],
                            AidcAuthAttr2: result.WISPAccessGatewayParam.Redirect[0].AidcAuthAttr2[0]
                        };
                    });
                    return [4 /*yield*/, agent
                            .post(config.LoginURL)
                            .set({
                            "User-Agent": "CDMA+WLAN(Maod)",
                            "Content-Type": "application/x-www-form-urlencoded"
                        })
                            .send({
                            UserName: UserName,
                            Password: Password,
                            AidcAuthAttr1: config.AidcAuthAttr1,
                            AidcAuthAttr3: AidcAuthAttr3,
                            AidcAuthAttr4: AidcAuthAttr4,
                            AidcAuthAttr5: AidcAuthAttr5,
                            AidcAuthAttr6: AidcAuthAttr6,
                            AidcAuthAttr7: AidcAuthAttr7,
                            AidcAuthAttr8: AidcAuthAttr8,
                            createAuthorFlag: 0
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, parseStringAsy(res.text)];
                case 3:
                    resCode = _b.sent();
                    result = {
                        messageType: resCode.WISPAccessGatewayParam.AuthenticationReply[0].MessageType[0],
                        // 50 认证成功
                        responseCode: resCode.WISPAccessGatewayParam.AuthenticationReply[0].ResponseCode[0],
                        replyMessage: resCode.WISPAccessGatewayParam.AuthenticationReply[0].ReplyMessage[0],
                        logoffURL: resCode.WISPAccessGatewayParam.AuthenticationReply[0].LogoffURL[0]
                    };
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.login = login;
function logout(loginOffStr) {
    return __awaiter(this, void 0, void 0, function () {
        var agent, res, resCode, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agent = superagent.agent();
                    return [4 /*yield*/, agent.get(loginOffStr).set({
                            "User-Agent": "CDMA+WLAN(Maod)"
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, parseStringAsy(res.text)];
                case 2:
                    resCode = _a.sent();
                    result = {
                        MessageType: resCode.WISPAccessGatewayParam.LogoffReply[0].MessageType[0],
                        ResponseCode: resCode.WISPAccessGatewayParam.LogoffReply[0].ResponseCode[0]
                    };
                    // MessageType 成功：130， 失败：130
                    // ResponseCode  成功：150  失败：255
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.logout = logout;
function parseStringAsy(text) {
    return new Promise(function (resolve, reject) {
        xml2js_1.parseString(text, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
