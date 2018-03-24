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
    }

    public update() : void{
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
    }

   private createWorld(): void {
        //egret.MainContext.instance.stage.move
        var wrd: p2.World = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
    } 
    private createGround(): void {
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.position[1] = stageHeight - 100;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);


        this.world.addBody(groundBody);
    }
    private createBodies(): void {
        //var boxShape: p2.Shape = new p2.Rectangle(100, 50);
        var boxShape: p2.Shape = new p2.Box({width: 100, height: 50});
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);

        //var boxShape: p2.Shape = new p2.Rectangle(50, 50);
        var boxShape: p2.Shape = new p2.Box({width: 50, height: 50});
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 180], angularVelocity: 1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    }
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.main.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
}