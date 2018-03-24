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
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private circleBody: p2.Body;
    private groundBody: p2.Body;
    private baseUI: egret.DisplayObjectContainer;

    public game:Game;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.game = new Game(this);
    }
    private onAddToStage(): void {
        this.runGame().catch(e => {
            console.log(e);
        })
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        
        this.game.init();
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
    }

    private async runGame()
    {
        await this.loadResource();
    }

    private async loadResource()
    {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e)
        {
            console.error(e);
        }
    }

    private onGroupComplete()
    {
        this.createUI();
    }

    private createWorld(): void {
        var wrd: p2.World = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact, this);
    }
    private createGround(): void {
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        
        var groundShape: p2.Shape = new p2.Box({width: 5000, height: 100});
        var pivotX = 500;
        var pivotY = -50;
        var vertices:number[][] = 
        [
            [pivotX + 0,    pivotY +  -200],
            [pivotX + 200,  pivotY +  0],
            [pivotX + -200, pivotY +  0]
        ];

        var triangleShape: p2.Convex = new p2.Convex({vertices:vertices});

        pivotX = 1500;
        pivotY = -50;
        var vertices:number[][] = 
        [
            [pivotX + 0,    pivotY +  -500],
            [pivotX + 400,  pivotY +  0],
            [pivotX + -400, pivotY +  0]
        ];

        var triangleShape2: p2.Convex = new p2.Convex({vertices:vertices});
        
        var groundBody: p2.Body = this.groundBody = new p2.Body();
        groundBody.position = [0, stageHeight];
        groundBody.type = p2.Body.STATIC;
        groundBody.addShape(groundShape);
        groundBody.addShape(triangleShape);
        groundBody.addShape(triangleShape2);

        this.world.addBody(groundBody);
    }
    
    private createBodies(): void 
    {
        var boxShape: p2.Shape = new p2.Circle({radius: 50});
        var circleBody: p2.Body = this.circleBody = new p2.Body({ mass: 1, position: [100, egret.MainContext.instance.stage.stageHeight - 100], angularVelocity: 1 });
        circleBody.addShape(boxShape);
        this.world.addBody(circleBody);
    }

    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }

    private createUI(): void {
        var baseUI:egret.DisplayObjectContainer = this.baseUI = new egret.DisplayObjectContainer();
        var jumpButton:egret.Bitmap = new egret.Bitmap();
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
    }

    private loop(): void {
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
        this.judgeCircleBodyVelocity();
    }

    private update(): void {
        this.game.update();
    }  

    private startJump : boolean = false;
    private jumpTwice : boolean = false;
    private jump(e:egret.TouchEvent):void
    {   
        if(!this.startJump)
        {
            this.startJump = true;
            this.circleBody.velocity = [this.circleBody.velocity[0], (this.circleBody.velocity[1] > 0 ? this.circleBody.velocity[1] : 0) - 400];
        }
        else
        {
            if(!this.jumpTwice)
            {
                this.jumpTwice = true;
                this.circleBody.velocity = [this.circleBody.velocity[0], (this.circleBody.velocity[1] < 0 ? this.circleBody.velocity[1] : 0) - 400];
            }
        }

        (this.baseUI.getChildAt(0) as egret.Bitmap).texture = RES.getRes('button_2_png');
    } 

    private jumpEnd(e:egret.TouchEvent):void
    {
        (this.baseUI.getChildAt(0) as egret.Bitmap).texture = RES.getRes('button_1_png');
    }

    private onGround : boolean = true;
    private onBeginContact(event) : void 
    {
        var bodyA : p2.Body = event.bodyA;
        var bodyB : p2.Body = event.bodyB;

        if(bodyB.id == this.circleBody.id && bodyA.id == this.groundBody.id)
        {
            this.startJump = false;
            this.jumpTwice = false;
            this.onGround = true;
        }
    }

    private onEndContact(event) : void
    {
        var bodyA : p2.Body = event.bodyA;
        var bodyB : p2.Body = event.bodyB;

        if(bodyA.id == this.groundBody.id)
        {
            this.onGround = false;
        }
    }

    private maxSpeed : number = 500
    private correctForce : number = 250
    private judgeCircleBodyVelocity() : void
    {
        if (this.circleBody.velocity[0] < this.maxSpeed)
            this.circleBody.applyForce([this.correctForce, 0], [0, 0]);
        else if (this.circleBody.velocity[0] > this.maxSpeed)
            this.circleBody.applyForce([-this.correctForce, 0], [0, 0]);
    }
}
