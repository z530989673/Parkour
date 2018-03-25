// TypeScript file

class ConvexObstacle extends Obstacle
{
    vertices:number[][];
    public constructor(world : p2.World, path:string, vertices:number[][], outlineColor:number)
    {
        var minX = vertices[0][0];
        var minY = vertices[0][1];
        var maxX = vertices[0][0];
        var maxY = vertices[0][1];
        for(var i = 0; i < vertices.length; i++)
        {
            if (vertices[i][0] < minX) minX = vertices[i][0];
            if (vertices[i][0] > maxX) maxX = vertices[i][0];
            if (vertices[i][1] < minY) minY = vertices[i][1];
            if (vertices[i][1] > maxY) maxY = vertices[i][1];
        }
        var rect:egret.Rectangle = new egret.Rectangle(minX,minY,maxX - minX,maxY - minY);
        super(world,path,rect,outlineColor, false);
        this.vertices = vertices;

        this.createShape();
        
        this.customMask = new egret.Shape;
        
        var lastIdx = vertices.length - 1;
        this.customMask.graphics.beginFill(this.outlineColor);
        this.customMask.graphics.moveTo(vertices[lastIdx][0],vertices[lastIdx][1]);
        for(var i = 0; i < vertices.length; i++)
            this.customMask.graphics.lineTo(vertices[i][0],vertices[i][1]);
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
            this.body.position = [0, 0];
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
        graphic.moveTo(this.vertices[lastIdx][0],this.vertices[lastIdx][1]);
        for(var i = 0; i < this.vertices.length; i++)
            graphic.lineTo(this.vertices[i][0],this.vertices[i][1]);
    }
}