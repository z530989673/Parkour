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

class Main extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
     
    private onAddToStage(event:egret.Event){
         
        var factor: number = 50;        
        var sh: number = (egret.MainContext.instance.stage.stageHeight) / factor;
        var sw: number = (egret.MainContext.instance.stage.stageWidth) / factor;
        //创建world
        var world: p2.World = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        //创建地面       
        var gshape: p2.Plane = new p2.Plane();
        var gbody: p2.Body = new p2.Body({
                position:[0,-sh/2]
            });
        gbody.addShape(gshape);
        world.addBody(gbody);
        //添加显示对象   
        var ground: egret.DisplayObject = this.createGround();
        gbody.displays = [ground];
        this.addChild(ground);
         
         
        //添加长方形刚体
        var boxShape: p2.Shape = new p2.Box({x:2,y:1});
        var boxBody: p2.Body = new p2.Body({ mass: 1,position: [sw / 2,0],angularVelocity: 3 });
        boxBody.addShape(boxShape);
        world.addBody(boxBody);
        //添加长方形刚体的显示对象   
        var display: egret.DisplayObject = this.createSprite();
        display.width = (<p2.Box>boxShape).width * factor;
        display.height = (<p2.Box>boxShape).height * factor;
        display.anchorOffsetX = display.width / 2
        display.anchorOffsetY = display.height / 2;
        //同步egret对象和p2对象
        boxBody.displays = [display];
        this.addChild(display);
         
        //添加帧事件侦听
        egret.Ticker.getInstance().register(function(dt) {
            //使世界时间向后运动
            world.step(dt / 1000);
            ground.x = gbody.position[0] * factor;
            ground.y = sh - gbody.position[1] * factor;
            ground.rotation = 360 - gbody.angle * 180 / Math.PI;
             
            display.x = boxBody.position[0] * factor;
            display.y = sh - boxBody.position[1] * factor;
            display.rotation = 360 - boxBody.angle * 180 / Math.PI;
            if(boxBody.sleepState == p2.Body.SLEEPING) {
                display.alpha = 0.5;
            }else {
                display.alpha = 1;
                    }
        },this);       
    }
     
    private createGround(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x2d78f4);
        result.graphics.drawRect(0,0,600,40);
        result.graphics.endFill();
        return result;
    }  
      
 
    private createSprite(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,80,40);
        result.graphics.endFill();
        return result;
    }
}