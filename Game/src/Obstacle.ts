// TypeScript file

class Obstacle extends egret.Sprite {
    
    main : BasicBitmap;
    rect : egret.Rectangle;
    outline : egret.Sprite;
    outlineColor : number;

    public shape : p2.Shape = null;
    public body : p2.Body = null;
    public world : p2.World;
    
    public constructor(world : p2.World, path:string, rect:egret.Rectangle, outlineColor:number) {
        super();
        this.world = world;

        this.rect = rect;
        this.main = new BasicBitmap(path, this.rect);
        this.outline = new egret.Sprite();
        this.outlineColor = outlineColor;

        this.addChild(this.main);
        this.addChild(this.outline);

        if (this.shape == null && this.body == null)
        {
            this.shape = new p2.Box({width: rect.width, height: rect.height});
            this.body = new p2.Body();
            this.body.position = [rect.x + rect.width / 2, rect.y + rect.height / 2];
            this.body.type = p2.Body.STATIC;

            this.body.addShape(this.shape);
            
            this.world.addBody(this.body);
        }
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.drawOutline, this);
    }

    public drawOutline()
    {
        var graphic = this.outline.graphics;
        graphic.clear();
        
        graphic.lineStyle(5, this.outlineColor);
        graphic.drawRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
    }
}