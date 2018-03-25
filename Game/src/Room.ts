class Room {

	private main : Main;
	private baseUI : egret.DisplayObjectContainer;

	public constructor(main : Main)
    {
        this.main = main;
    }

	public init()
	{
		var baseUI : egret.DisplayObjectContainer = this.baseUI = new egret.DisplayObjectContainer();

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
			headBg.width = 100;
			headBg.height = 100;
			baseUI.addChild(headBg);

			//角色头像
			
			headBg.touchEnabled = true;
			headBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
			baseUI.addChild(headBg);
		}

		this.main.stage.addChild(baseUI);
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

		//给服务器发送准备就绪消息，传参isReady
	}

	//邀请朋友
	private inviteFriend(event:egret.Event)
	{
		
	}
}