// TypeScript file

class CircleObstacle extends Obstacle
{
    posX:number;
    posY:number;
    r:number;
    public constructor(world : p2.World, path:string, x:number, y:number, r:number, outlineColor:number)
    {
        var rect:egret.Rectangle = new egret.Rectangle(x-r,y-r,2*r,2*r);
        super(world,path,rect,outlineColor, false);
        this.posX = x;
        this.posY = y;
        this.r = r;
        this.createShape();
        
        this.customMask = new egret.Shape;
        this.customMask.graphics.clear();
        this.customMask.graphics.beginFill(this.outlineColor);
        this.customMask.graphics.drawCircle(this.posX,this.posY,this.r);
        this.customMask.graphics.endFill();
        this.addChild( this.customMask );

        this.mask = this.customMask;

    }

    public createShape()
    {
        if (this.body == null)
        {
            var shape : p2.Shape = new p2.Circle({radius : this.r});
            this.body = new p2.Body();
            this.body.position = [this.posX, this.posY];
            this.body.type = p2.Body.STATIC;

            this.body.addShape(shape);
            
            this.world.addBody(this.body);
        }
    }
    
    public drawOutline()
    {
        var graphic = this.outline.graphics;
        graphic.clear();
        
        graphic.lineStyle(5, this.outlineColor);
        graphic.drawCircle(this.posX,this.posY,this.r);
    }
}