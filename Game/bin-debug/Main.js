var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.startJump = false;
        _this.jumpTwice = false;
        _this.onGround = true;
        _this.maxSpeed = 500;
        _this.correctForce = 250;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.game = new Game(_this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        this.runGame().catch(function (e) {
            console.log(e);
        });
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.game.init();
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.onGroupComplete = function () {
        this.createUI();
    };
    Main.prototype.createWorld = function () {
        var wrd = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact, this);
    };
    Main.prototype.createGround = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var groundShape = new p2.Box({ width: 5000, height: 100 });
        var pivotX = 500;
        var pivotY = -50;
        var vertices = [
            [pivotX + 0, pivotY + -200],
            [pivotX + 200, pivotY + 0],
            [pivotX + -200, pivotY + 0]
        ];
        var triangleShape = new p2.Convex({ vertices: vertices });
        pivotX = 1500;
        pivotY = -50;
        var vertices = [
            [pivotX + 0, pivotY + -500],
            [pivotX + 400, pivotY + 0],
            [pivotX + -400, pivotY + 0]
        ];
        var triangleShape2 = new p2.Convex({ vertices: vertices });
        var groundBody = this.groundBody = new p2.Body();
        groundBody.position = [0, stageHeight];
        groundBody.type = p2.Body.STATIC;
        groundBody.addShape(groundShape);
        groundBody.addShape(triangleShape);
        groundBody.addShape(triangleShape2);
        this.world.addBody(groundBody);
    };
    Main.prototype.createBodies = function () {
        var boxShape = new p2.Circle({ radius: 50 });
        var circleBody = this.circleBody = new p2.Body({ mass: 1, position: [100, egret.MainContext.instance.stage.stageHeight - 100], angularVelocity: 1 });
        circleBody.addShape(boxShape);
        this.world.addBody(circleBody);
    };
    Main.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    };
    Main.prototype.createUI = function () {
        var baseUI = this.baseUI = new egret.DisplayObjectContainer();
        var jumpButton = new egret.Bitmap();
        jumpButton.texture = RES.getRes('button_1_png');
        jumpButton.width = 200;
        jumpButton.height = 200;
        jumpButton.x = 100;
        jumpButton.y = 500;
        jumpButton.touchEnabled = true;
        jumpButton.pixelHitTest = true;
        jumpButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);
        jumpButton.addEventListener(egret.TouchEvent.TOUCH_END, this.jumpEnd, this);
        baseUI.addChild(jumpButton);
        this.stage.addChild(baseUI);
    };
    Main.prototype.loop = function () {
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
        this.judgeCircleBodyVelocity();
    };
    Main.prototype.update = function () {
        this.game.update();
    };
    Main.prototype.jump = function (e) {
        if (!this.startJump) {
            this.startJump = true;
            this.circleBody.velocity = [this.circleBody.velocity[0], (this.circleBody.velocity[1] > 0 ? this.circleBody.velocity[1] : 0) - 400];
        }
        else {
            if (!this.jumpTwice) {
                this.jumpTwice = true;
                this.circleBody.velocity = [this.circleBody.velocity[0], (this.circleBody.velocity[1] < 0 ? this.circleBody.velocity[1] : 0) - 400];
            }
        }
        this.baseUI.getChildAt(0).texture = RES.getRes('button_2_png');
    };
    Main.prototype.jumpEnd = function (e) {
        this.baseUI.getChildAt(0).texture = RES.getRes('button_1_png');
    };
    Main.prototype.onBeginContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (bodyB.id == this.circleBody.id && bodyA.id == this.groundBody.id) {
            this.startJump = false;
            this.jumpTwice = false;
            this.onGround = true;
        }
    };
    Main.prototype.onEndContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (bodyA.id == this.groundBody.id) {
            this.onGround = false;
        }
    };
    Main.prototype.judgeCircleBodyVelocity = function () {
        if (this.circleBody.velocity[0] < this.maxSpeed)
            this.circleBody.applyForce([this.correctForce, 0], [0, 0]);
        else if (this.circleBody.velocity[0] > this.maxSpeed)
            this.circleBody.applyForce([-this.correctForce, 0], [0, 0]);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map