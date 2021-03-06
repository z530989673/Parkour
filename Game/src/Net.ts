// import { load } from "protobuff";
class Net
{
    private static Host = "47.98.36.83";
    private static Port = 8888;

    private main : Main;
    
    public constructor(main : Main)
    {
        this.main = main;
    } 
    
    private webSocket: egret.WebSocket;
    private timer: egret.Timer;
    public connectToServer(): void {
        console.log("开始连接服务器");
        this.webSocket = new egret.WebSocket();
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.connect(Net.Host, Net.Port);
        console.log("成功连接服务器");
        
    }
    
    private heartbeat() : void
    {
        this.sendCmd("heartbeat", []);
    }
    
    public sendCmd(cmd, args) : void
    {
        var msg = cmd + ":" + args.join(":");
        this.sendMsg(msg);
    }
    
    public receiveCmd(msg) :void
    {    
        console.log("receiveCmd：" + msg);
        var args = msg.split(":");
        var cmd = args[0];
        args = args.slice(1, -1);

        this.handleMessage(cmd, args);
    }
    
    public sendMsg(msg): void{
        this.webSocket.writeUTF(msg);
    } 
    
    private onSocketOpen(): void {
        var cmd = "create";
        console.log("连接成功，发送数据：" + cmd);
        this.timer = new egret.Timer(1000,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.heartbeat, this);
        this.timer.start();
    }
    
    private onReceiveMessage(e: egret.Event): void {
        var msg = this.webSocket.readUTF();
        this.receiveCmd(msg);
    }

    private handleMessage(cmd, args): void {
        switch(cmd)
        {
            case "login":
                this.handleLoginin(args);
            break;
            case "room_msg":
                this.handleCreateRoom(args);
            break;
            case "join":
                this.handleJoinRoom(args);
            break;
            case "ready":
                this.handleReady(args);
            break;
        }
    }

    private handleLoginin(args)
    {
        this.main.game.player.character.id = args;
        this.sendCmd("login", [this.main.game.player.character.id]);
    }

    private handleCreateRoom(args)
    {
        this.main.room.handleCreateRoom(args);
    }

    private handleJoinRoom(args)
    {
        this.main.room.handleJoinRoom(args);
    }

    private handleReady(args)
    {
        this.main.room.handleReady(args);
    }
}