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
class Main extends egret.DisplayObjectContainer {

    public game:Game;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.game = new Game(this);
    }
    private onAddToStage(): void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        this.game.init();
    }
    
    private update(): void {
        this.game.update();
    }
    private types: string[] = ["box", "circle"]
    private addOneBox(e: egret.TouchEvent): void {
        // var positionX: number = Math.floor(e.stageX);
        // var positionY: number = Math.floor(e.stageY);
        // var shape: p2.Shape;
        // var body = new p2.Body({ mass: 1, position: [positionX, positionY], type:p2.Body.STATIC, angularVelocity: 1 });

        // var shapeType = this.types[Math.floor((Math.random() * this.types.length))];
        // //shapeType = "particle";
        // switch (shapeType) {
        //     case "box":
        //         //shape = new p2.Rectangle(Math.random() * 150 + 50, 100);
        //         shape = new p2.Box({width: Math.random() * 150 + 50, height: 100});
        //         break;
        //     case "circle":
        //         //shape = new p2.Circle(50);
        //         shape = new p2.Circle({radius: 50});
        //         break;
        //     // case "capsule":
        //     //     //shape = new p2.Capsule(50, 10);
        //     //     shape = new p2.Capsule({length: 50, radius: 10});
        //     //     break;
        //     // case "line":
        //     //     //shape = new p2.Line(150);
        //     //     shape = new p2.Line({length: 150});
        //     //     break;
        //     // case "particle":
        //     //     shape = new p2.Particle();
        //     //     break;
        // }
        // body.addShape(shape);
        // this.world.addBody(body);
    }
}