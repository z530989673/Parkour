// TypeScript file

class Player
{
    private game : Game;
    private world : p2.World;
    private body: p2.Body;
    
    private startJump : boolean = false;
    private jumpTwice : boolean = false;
    private onGround : boolean = true;

    public originPosX : number;
    public originPosY : number;
    
    public GetPosX() : number{
        return this.body.position[0];
    }

    public GetPosY() : number{
        return this.body.position[1];
    }

    public GetOffsetPosX() : number{
        return this.body.position[0] - this.originPosX;
    }

    public GetOffsetPosY() : number{
        return this.body.position[1] - this.originPosY;
    }

    public constructor(game : Game)
    {
        this.game = game;
        this.world = this.game.world;
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact, this);
        this.createBody();
    }

    private createBody(): void 
    {
        this.originPosX = 100;
        this.originPosY = egret.MainContext.instance.stage.stageHeight - 100;
        var boxShape: p2.Shape = new p2.Circle({radius: 50});
        this.body = new p2.Body({ mass: 1, position: [this.originPosX, this.originPosY], angularVelocity: 1 });
        this.body.addShape(boxShape);
        this.world.addBody(this.body);
    }

    private onBeginContact(event) : void 
    {
        //var bodyA : p2.Body = event.bodyA;
        //var bodyB : p2.Body = event.bodyB;

        //if(bodyB.id == this.circleBody.id && bodyA.id == this.groundBody.id)
        {
            this.startJump = false;
            this.jumpTwice = false;
            this.onGround = true;
        }
    }
    
    public jump(e:egret.TouchEvent):void
    {   
        if(!this.startJump)
        {
            this.startJump = true;
            this.body.velocity = [this.body.velocity[0], (this.body.velocity[1] > 0 ? this.body.velocity[1] : 0) - 400];
        }
        else
        {
            if(!this.jumpTwice)
            {
                this.jumpTwice = true;
                this.body.velocity = [this.body.velocity[0], (this.body.velocity[1] < 0 ? this.body.velocity[1] : 0) - 400];
            }
        }

        this.game.switchJumpButton('button_2_png');
    } 

    public jumpEnd(e:egret.TouchEvent):void
    {
        this.game.switchJumpButton('button_1_png');
    }

    private maxSpeed : number = 500
    private correctForce : number = 250
    private judgeCircleBodyVelocity() : void
    {
        if (this.body.velocity[0] < this.maxSpeed)
            this.body.applyForce([this.correctForce, 0], [0, 0]);
        else if (this.body.velocity[0] > this.maxSpeed)
            this.body.applyForce([-this.correctForce, 0], [0, 0]);
    }

    private onEndContact(event) : void
    {
        var bodyA : p2.Body = event.bodyA;
        var bodyB : p2.Body = event.bodyB;

        //if(bodyA.id == this.groundBody.id)
        {
            this.onGround = false;
        }
    }

    public update() : void
    {
        this.judgeCircleBodyVelocity();
    }
} 