// TypeScript file

class Obstacle extends egret.Sprite {
    
    main : BasicBitmap;
    rect : egret.Rectangle;
    outline : egret.Sprite;
    outlineColor : number;

    protected customMask : egret.Shape = null;

    public body : p2.Body = null;
    public world : p2.World;
    
    public constructor(world : p2.World, path:string, rect:egret.Rectangle, outlineColor:number, createShape:boolean = true) {
        super();
        this.world = world;

        this.rect = rect;
        this.main = new BasicBitmap(path, this.rect);
        this.outline = new egret.Sprite();
        this.outlineColor = outlineColor;

        this.addChild(this.main);
        this.addChild(this.outline);
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.drawOutline, this);

        if (createShape)
            this.createShape();
    }

    public createShape()
    {
        if (this.body == null)
        {
            var shape : p2.Shape = new p2.Box({width: this.rect.width, height: this.rect.height});
            this.body = new p2.Body();
            this.body.position = [this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2];
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
        graphic.drawRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
    }
}