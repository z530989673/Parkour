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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var factor = 50;
        var sh = (egret.MainContext.instance.stage.stageHeight) / factor;
        var sw = (egret.MainContext.instance.stage.stageWidth) / factor;
        //创建world
        var world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        //创建地面       
        var gshape = new p2.Plane();
        var gbody = new p2.Body({
            position: [0, -sh / 2]
        });
        gbody.addShape(gshape);
        world.addBody(gbody);
        //添加显示对象   
        var ground = this.createGround();
        gbody.displays = [ground];
        this.addChild(ground);
        //添加长方形刚体
        var boxShape = new p2.Box({ x: 2, y: 1 });
        var boxBody = new p2.Body({ mass: 1, position: [sw / 2, 0], angularVelocity: 3 });
        boxBody.addShape(boxShape);
        world.addBody(boxBody);
        //添加长方形刚体的显示对象   
        var display = this.createSprite();
        display.width = boxShape.width * factor;
        display.height = boxShape.height * factor;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        //同步egret对象和p2对象
        boxBody.displays = [display];
        this.addChild(display);
        //添加帧事件侦听
        egret.Ticker.getInstance().register(function (dt) {
            //使世界时间向后运动
            world.step(dt / 1000);
            ground.x = gbody.position[0] * factor;
            ground.y = sh - gbody.position[1] * factor;
            ground.rotation = 360 - gbody.angle * 180 / Math.PI;
            display.x = boxBody.position[0] * factor;
            display.y = sh - boxBody.position[1] * factor;
            display.rotation = 360 - boxBody.angle * 180 / Math.PI;
            if (boxBody.sleepState == p2.Body.SLEEPING) {
                display.alpha = 0.5;
            }
            else {
                display.alpha = 1;
            }
        }, this);
    };
    Main.prototype.createGround = function () {
        var result = new egret.Sprite();
        result.graphics.beginFill(0x2d78f4);
        result.graphics.drawRect(0, 0, 600, 40);
        result.graphics.endFill();
        return result;
    };
    Main.prototype.createSprite = function () {
        var result = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0, 0, 80, 40);
        result.graphics.endFill();
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map