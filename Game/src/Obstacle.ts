// TypeScript file

class Obstacle extends egret.Sprite {
    
    main : BasicBitmap;
    rect : egret.Rectangle;
    outline : egret.Sprite;
    outlineColor : number;
    
    public constructor(path:string, rect:egret.Rectangle, outlineColor:number) {
        super();

        this.rect = rect;
        this.main = new BasicBitmap(path, this.rect);
        this.outline = new egret.Sprite();
        this.outlineColor = outlineColor;

        this.addChild(this.main);
        this.addChild(this.outline);
        
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