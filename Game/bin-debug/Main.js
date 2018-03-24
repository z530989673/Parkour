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
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);
        this.game.init();
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
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