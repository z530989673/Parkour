// TypeScript file

class Game
{
    private debugDraw: p2DebugDraw;
    public world: p2.World;
    public anchorPosX = 0;
    public anchorPosY = 0;
    public CameraRefPrecentX = 0.4;
    public CameraRefPrecentYUp = 0.6;
    public CameraRefPrecentYDown = 0.65;
    public marginY = 300;
    private main:Main;

    public backgroundLayer : egret.Sprite;
    public mainLayer : egret.Sprite;
    private baseUI: egret.DisplayObjectContainer;
    private jumpButton : egret.Bitmap;
    
    private groundBody: p2.Body;
    private player : Player;

    public constructor(main : Main)
    {
        this.main = main;
        this.backgroundLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.createWorld();
        this.player = new Player(this);
    }

    public init(): void {

        this.followPlayer();
        this.createGround();
        this.createDebug();
        
        this.createUI();
    }

    public update() : void{
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
        this.player.update();
        this.followPlayer();
    }

    public followPlayer() : void{
        this.anchorPosX = this.player.GetPosX() - this.main.stage.stageWidth * this.CameraRefPrecentX;
        var dif = this.player.GetPosY() - this.anchorPosY;
        if (dif < this.main.stage.stageHeight * this.CameraRefPrecentYUp)
            this.anchorPosY = this.player.GetPosY() - this.main.stage.stageHeight * this.CameraRefPrecentYUp;
        else if (dif > this.main.stage.stageHeight * this.CameraRefPrecentYDown)
            this.anchorPosY = this.player.GetPosY() - this.main.stage.stageHeight * this.CameraRefPrecentYDown;
    }

    private createWorld(): void {
        var wrd: p2.World = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
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

    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this);
        var sprite: egret.Sprite = new egret.Sprite();
        this.main.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
    
    private createUI(): void {
        var baseUI:egret.DisplayObjectContainer = this.baseUI = new egret.DisplayObjectContainer();
        baseUI.addChild(jumpButton);
        this.main.stage.addChild(baseUI);
    }

   

    public jump(e:egret.TouchEvent):void{
        this.player.jump(e);
    }

    public jumpEnd(e:egret.TouchEvent):void{
        this.player.jumpEnd(e);
    }

    public switchJumpButton(button :string) : void{
        this.jumpButton.texture = RES.getRes(button);
    }
}