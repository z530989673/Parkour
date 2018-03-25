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
        this.createWorld();
        this.player = new Player(this);
    }

    public init(): void {

        this.createLayer();
        this.followPlayer();
        this.createGround();
        this.createDebug();
        this.createUI();
    }

    public createLayer() : void{
        this.backgroundLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.main.stage.addChild(this.backgroundLayer);
        this.main.stage.addChild(this.mainLayer);
    }

    public update() : void{
        this.followPlayer();
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
        this.player.update();
    }

    public followPlayer() : void{
        this.anchorPosX = this.player.GetPosX() - this.main.stage.stageWidth * this.CameraRefPrecentX;
        var dif = this.player.GetPosY() - this.anchorPosY;
        if (dif < this.main.stage.stageHeight * this.CameraRefPrecentYUp)
            this.anchorPosY = this.player.GetPosY() - this.main.stage.stageHeight * this.CameraRefPrecentYUp;
        else if (dif > this.main.stage.stageHeight * this.CameraRefPrecentYDown)
            this.anchorPosY = this.player.GetPosY() - this.main.stage.stageHeight * this.CameraRefPrecentYDown;
        this.mainLayer.x = - this.anchorPosX;
        this.mainLayer.y = - this.anchorPosY;
    }

    private createWorld(): void {
        var wrd: p2.World = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
    }

    private createGround(): void {
        var obs = new Obstacle(this.world, 'bg_jpg',new egret.Rectangle(1000,500,200,200),0x000000);
        this.mainLayer.addChild(obs);
        var cirObs = new CircleObstacle(this.world, 'bg_jpg',500,500,100,0x000000);
        this.mainLayer.addChild(cirObs);

        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        
        var groundShape: p2.Shape = new p2.Box({width: 5000, height: 100});
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        var pivotX = 500;
        var pivotY = stageHeight-50;
        var vertices:number[][] = 
        [
            [0,    -200],
            [200,  0],
            [-200, 0]
        ];
        var triObs = new ConvexObstacle(this.world, 'bg_jpg', vertices, pivotX, pivotY, 0x000000);
        this.mainLayer.addChild(triObs);

        var triangleShape: p2.Convex = new p2.Convex({vertices:vertices});

        pivotX = 1500;
        pivotY = stageHeight-50;
        var vertices1:number[][] = 
        [
            [0,     -500],
            [400,  0],
            [-400, 0]
        ];

        var triObs1 = new ConvexObstacle(this.world, 'bg_jpg', vertices1, pivotX, pivotY, 0x000000);
        this.mainLayer.addChild(triObs1);
        
        var groundBody: p2.Body = this.groundBody = new p2.Body();
        groundBody.position = [0, stageHeight];
        groundBody.type = p2.Body.STATIC;
        groundBody.addShape(groundShape);

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
        var jumpButton:egret.Bitmap = this.jumpButton = new egret.Bitmap();
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