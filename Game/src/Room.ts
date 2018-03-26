class Room {

	private main : Main;
	private baseUI : egret.DisplayObjectContainer;
	private roomId : number;

	public constructor(main : Main)
    {
        this.main = main;
    }

	public init()
	{
		var baseUI : egret.DisplayObjectContainer = this.baseUI = new egret.DisplayObjectContainer();

		//测试用
		//创建房间
		var createRoom : egret.Bitmap = new egret.Bitmap();
		createRoom.texture = RES.getRes("button_jpeg");
		createRoom.x = 800;
		createRoom.y = 50;
		createRoom.width = 100;
		createRoom.height = 100;
		createRoom.touchEnabled = true;
		createRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
		baseUI.addChild(createRoom);

		//加入房间
		var joinRoom : egret.Bitmap = new egret.Bitmap();
		joinRoom.texture = RES.getRes("button_jpeg");
		joinRoom.x = 800;
		joinRoom.y = 250;
		joinRoom.width = 100;
		joinRoom.height = 100;
		joinRoom.touchEnabled = true;
		joinRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinRoom, this);
		baseUI.addChild(joinRoom);

		var messageText : egret.TextField = this.messageText = new egret.TextField();
		messageText.text = "";
		messageText.x = 600;
		messageText.y = 0;
		messageText.size = 50;
		this.baseUI.addChild(messageText);
		//

		//游戏名
		var gameName : egret.TextField = new egret.TextField();
		gameName.text = "球球大作战";
		gameName.size = 150;
		gameName.x = 100;
		gameName.y = 50;
		baseUI.addChild(gameName);

		//游戏角色底框
		var selfplayerBg : egret.Bitmap = new egret.Bitmap();
		selfplayerBg.texture = RES.getRes("button_1_png");
		selfplayerBg.x = 350;
		selfplayerBg.y = 300;
		selfplayerBg.width = 220;
		selfplayerBg.height = 220;
		baseUI.addChild(selfplayerBg);

		//游戏角色皮肤
		var selfPlayerSkin : egret.Bitmap  = this.curPlayerSkin = new egret.Bitmap();
		selfPlayerSkin.texture = RES.getRes("sb_jpeg");//默认为烧饼
		selfPlayerSkin.x = 360;
		selfPlayerSkin.y = 300;
		selfPlayerSkin.width = 200;
		selfPlayerSkin.height = 200;
		baseUI.addChild(selfPlayerSkin);

		//游戏角色选择（朝左）
		var selectSkinLeft : egret.Bitmap = new egret.Bitmap();
		selectSkinLeft.texture = RES.getRes("triangle_jpeg");
		selectSkinLeft.x = 250;
		selectSkinLeft.y = 420;
		selectSkinLeft.width = 50;
		selectSkinLeft.height = 50;
		selectSkinLeft.rotation = -90;
		selectSkinLeft.touchEnabled = true;
		selectSkinLeft.pixelHitTest = true;
		selectSkinLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectSkinLeft, this);
		baseUI.addChild(selectSkinLeft);

		//游戏角色选择（朝右）
		var selectSkinRight : egret.Bitmap = new egret.Bitmap();
		selectSkinRight.texture = RES.getRes("triangle_jpeg");
		selectSkinRight.x = 650;
		selectSkinRight.y = 370;
		selectSkinRight.width = 50;
		selectSkinRight.height = 50;
		selectSkinRight.rotation = 90;
		selectSkinRight.touchEnabled = true;
		selectSkinRight.pixelHitTest = true;
		selectSkinRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectSkinRight, this);
		baseUI.addChild(selectSkinRight);

		//准备按钮
		var readyButton : egret.Bitmap = new egret.Bitmap();
		readyButton.texture = RES.getRes("button_jpeg");
		readyButton.x = 360;
		readyButton.y = 550;
		readyButton.width = 200;
		readyButton.height = 100;
		readyButton.touchEnabled = true;
		readyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ready, this);
		baseUI.addChild(readyButton);

		//准备文字
		var readyText : egret.TextField = this.readyText = new egret.TextField();
		readyText.text = "准备";
		readyText.x = 380;
		readyText.y = 570;
		readyText.size = 50;
		baseUI.addChild(readyText);

		//玩家角色头像区域
		for (var i = 0; i < 4; ++i)
		{
			//角色底框
			var headBg : egret.Bitmap = new egret.Bitmap();
			headBg.texture = RES.getRes("button_1_png");
			var temp = i % 2;
			headBg.x = 900 + temp * 300;
			headBg.y = 200 + (i - temp) * 100;
			headBg.width = 200;
			headBg.height = 200;
			headBg.touchEnabled = true;
			headBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
			baseUI.addChild(headBg);

			//角色头像
			var head : egret.Bitmap = new egret.Bitmap();
			//存在玩家
			if (i < this.main.game.playerArray.length)
			{
				switch(this.main.game.playerArray[i].skinId)
				{
					case 0:
						head.texture = RES.getRes("sb_jpeg");
						break;
					case 1:
						head.texture = RES.getRes("zb_jpeg");
						break;
					case 2:
						head.texture = RES.getRes("zh_jpeg");
						break;
				}
			}
			else
			{
				head.texture = RES.getRes("add_jpeg");
			}

			var temp = i % 2;
			headBg.x = 900 + temp * 300;
			headBg.y = 200 + (i - temp) * 100;
			headBg.width = 150;
			headBg.height = 150;
			headBg.touchEnabled = true;
			headBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
			baseUI.addChild(headBg);
		}

		this.refreshReadyState();

		this.main.stage.addChild(baseUI);
	}

	//角色准备状态
	private refreshReadyState()
	{
		for (var i = 0; i < 4; ++i)
		{
			//存在玩家
			if (i < this.main.game.playerArray.length)
			{
				if (this.main.game.playerArray[i].readyState)
				{
					var readyState : egret.TextField = new egret.TextField();
					readyState.text = "已准备"
					var temp = i % 2;
					readyState.x = 900 + temp * 300;
					readyState.y = 200 + (i - temp) * 100;
					readyState.width = 150;
					readyState.height = 150;
					readyState.touchEnabled = true;
					readyState.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
					this.baseUI.addChild(readyState);
				}
			}	
		}
	}

	private selectSkinLeft(event:egret.Event)
	{
		this.selectSkin(true);
	}

	private selectSkinRight(event:egret.Event)
	{
		this.selectSkin(false);
	}

	private curPlayerSkinId : number = 0;
	private curPlayerSkin : egret.Bitmap;
	private selectSkin(left:boolean)
	{
		if (left)
			this.curPlayerSkinId--;
		else
			this.curPlayerSkinId++;

		if (this.curPlayerSkinId < 0)
			this.curPlayerSkinId = 2;
		else if (this.curPlayerSkinId > 2)
			this.curPlayerSkinId = 0;

		switch(this.curPlayerSkinId)
		{
			case 0:
				this.curPlayerSkin.texture = RES.getRes("sb_jpeg");
				break;
			case 1:
				this.curPlayerSkin.texture = RES.getRes("zb_jpeg");
				break;
			case 2:
				this.curPlayerSkin.texture = RES.getRes("zh_jpeg");
				break;
		}
		//给服务器发送切换头像消息，传参curPlayerSkinId
	}

	private isReady : boolean = false;
	private readyText : egret.TextField;
	//准备
	private ready(event:egret.Event)
	{
		this.isReady = !this.isReady;
		if (this.isReady)
			this.readyText.text = "已就绪";
		else
			this.readyText.text = "准备";

		this.main.net.sendCmd("standby", [this.isReady, this.main.game.player.character.id]); 
	}

	//邀请朋友
	private inviteFriend(event:egret.Event)
	{
		//Net.instance.sendCmd()
	}

	//创建房间
	private createRoom(event:egret.Event)
	{
		this.main.net.sendCmd("create", []);
	}

	//加入房间
	private joinRoom(event:egret.Event)
	{
		this.main.net.sendCmd("join", [this.roomId]);
	}

	//进入游戏场景
	private enterGame()
	{
		this.main.net.sendCmd("enter_game", []);
	}

	private messageText : egret.TextField;
	//收到创建房间消息
	public handleCreateRoom(args)
	{
		this.messageText.text = "创建房间成功ID = " + args[0];
		this.roomId = args[0];
	}

	//收到加入房间消息
	public handleJoinRoom(args)
	{
		this.messageText.text = "加入房间成功";
		this.roomId = args[0];
		var count = (args as Array<any>).length - 1;

		for (var i = 0, length = count / 3; i < length; ++i)
		{
			var isvalid : boolean = false;
			for (var j = 0, length = this.main.game.playerArray.length; j < length; ++j)
			{
				if(this.main.game.playerArray[j].id == args[1 + i * 3])
				{
					isvalid = true;
					break;
				}
			}

			if (!isvalid)
			{
				var character = new Character();
				character.id = args[1 + i * 3];
				character.skinId = args[2 + i * 3];
				character.readyState = args[3 + i * 3];
			}
		}
	}

	//准备
	public handleReady(args)
	{
		for (var i = 0, length = this.main.game.playerArray.length; i < length; ++i)
		{
			if (this.main.game.playerArray[i] == args[1])
			{
				this.main.game.playerArray[i].readyState == args[0];
				break;
			}
		}
		this.refreshReadyState();
	}

	//进入游戏场景
	public handleEnterGame()
	{
		this.main.stage.removeChild(this.baseUI);

		this.main.game.init();
        this.main.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private update(): void {
        this.main.game.update();
    }
}