// TypeScript file

class ConvexObstacle extends Obstacle
{
    posX:number;
    posY:number;
    vertices:number[][];
    public constructor(world : p2.World, path:string, vertices:number[][], x: number, y : number, outlineColor:number)
    {
        var minX = vertices[0][0] + x;
        var minY = vertices[0][1] + y;
        var maxX = vertices[0][0] + x;
        var maxY = vertices[0][1] + y;
        for(var i = 0; i < vertices.length; i++)
        {
            if (vertices[i][0] + x < minX) minX = vertices[i][0] + x;
            if (vertices[i][0] + x > maxX) maxX = vertices[i][0] + x;
            if (vertices[i][1] + y < minY) minY = vertices[i][1] + y;
            if (vertices[i][1] + y > maxY) maxY = vertices[i][1] + y;
        }
        var rect:egret.Rectangle = new egret.Rectangle(minX,minY,maxX - minX,maxY - minY);
        super(world,path,rect,outlineColor, false);
        this.vertices = vertices;
        this.posX = x;
        this.posY = y;

        this.createShape();
        
        this.customMask = new egret.Shape;
        
        this.customMask.graphics.clear();
        var lastIdx = vertices.length - 1;
        this.customMask.graphics.beginFill(this.outlineColor);
        this.customMask.graphics.moveTo(vertices[lastIdx][0] + this.posX,vertices[lastIdx][1] + this.posY);
        for(var i = 0; i < vertices.length; i++)
            this.customMask.graphics.lineTo(vertices[i][0] + this.posX,vertices[i][1] + this.posY);
        this.customMask.graphics.endFill();
        this.addChild( this.customMask );

        this.mask = this.customMask;

    }

    public createShape()
    {
        if (this.body == null)
        {
            var shape : p2.Shape = new p2.Convex({vertices : this.vertices});
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
        var lastIdx = this.vertices.length - 1;
        graphic.moveTo(this.vertices[lastIdx][0] + this.posX,this.vertices[lastIdx][1] + this.posY);
        for(var i = 0; i < this.vertices.length; i++)
            graphic.lineTo(this.vertices[i][0] + this.posX,this.vertices[i][1] + this.posY);
    }
}