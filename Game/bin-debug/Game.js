// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game(main) {
        this.anchorPosX = 0;
        this.anchroPosY = 0;
        this.main = main;
        this.backgroundLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.UILayer = new egret.Sprite();
    }
    Game.prototype.init = function () {
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
    };
    Game.prototype.update = function () {
        this.world.step(33 / 1000);
        this.debugDraw.drawDebug();
    };
    Game.prototype.createWorld = function () {
        //egret.MainContext.instance.stage.move
        var wrd = new p2.World();
        //wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 500];
        this.world = wrd;
    };
    Game.prototype.createGround = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.position[1] = stageHeight - 100;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);
    };
    Game.prototype.createBodies = function () {
        //var boxShape: p2.Shape = new p2.Rectangle(100, 50);
        var boxShape = new p2.Box({ width: 100, height: 50 });
        var boxBody = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        //var boxShape: p2.Shape = new p2.Rectangle(50, 50);
        var boxShape = new p2.Box({ width: 50, height: 50 });
        var boxBody = new p2.Body({ mass: 1, position: [200, 180], angularVelocity: 1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    };
    Game.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite = new egret.Sprite();
        this.main.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map