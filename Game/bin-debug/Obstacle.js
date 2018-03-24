// TypeScript file
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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super.call(this) || this;
        _this.draw();
        return _this;
    }
    Obstacle.prototype.draw = function () {
        // this.graphics.lineStyle(1, 0x009393);
        // this.graphics.beginFill(0xCE0000);
        // this.graphics.moveTo(100,100);
        // this.graphics.lineTo(200,200);
        // this.graphics.lineTo(200,100);
        // this.graphics.lineTo(50,0);
        // this.graphics.lineTo(100,100);
        // this.graphics.endFill();
    };
    return Obstacle;
}(egret.Sprite));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map