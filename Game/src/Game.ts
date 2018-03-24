// TypeScript file

class Game
{
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private anchorPosX = 0;
    private anchroPosY = 0;
    private main:Main;

    public backgroundLayer : egret.Sprite;
    public mainLayer : egret.Sprite;
    public UILayer :egret.Sprite;
    
    private circleBody: p2.Body;
    private groundBody: p2.Body;
    private baseUI: egret.DisplayObjectContainer;

    public constructor(main : Main)
    {
        this.main = main;
        this.backgroundLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.UILayer = new egret.Sprite();
    }

    public init(): void {

        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
        this.createUI();
    }

    public update() : void{
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
        this.judgeCircleBodyVelocity();
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
        this.main.addChild(sprite);
        this.debugDraw.setSprite(sprite);
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
        this.main.stage.addChild(baseUI);
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