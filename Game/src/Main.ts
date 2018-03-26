//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
class Main extends egret.DisplayObjectContainer {
    //游戏房间界面
    public room:Room;
    //游戏主界面
    public game:Game;
    //网络
    public net:Net;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.net = new Net(this);
        this.net.connectToServer();
        this.room = new Room(this);
        this.game = new Game(this);
    }
    private onAddToStage(): void {
        this.runGame().catch(e => {
            console.log(e);
        })
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
    }

    private async runGame()
    {
        await this.loadResource();
    }

    private async loadResource()
    {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e)
        {
            console.error(e);
        }
    }

    private onGroupComplete()
    {
        this.initializeAsync();
        egretfb.EgretFBInstant.startGameAsync().then(() => {
            this.room.init();
            egret.log("start game");
        });
        //this.game.init();
        //this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private initializeAsync(): void {
        egretfb.EgretFBInstant.initializeAsync().then(function () {
            egret.log("getLocale:", egretfb.EgretFBInstant.getLocale());
            egret.log("getPlatform:", egretfb.EgretFBInstant.getPlatform());
            egret.log("getSDKVersion", egretfb.EgretFBInstant.getSDKVersion());
            egret.log("getSupportedAPIs", egretfb.EgretFBInstant.getSupportedAPIs());
            egret.log("getEntryPointData", egretfb.EgretFBInstant.getEntryPointData());
        })
        setTimeout(function () {
            egretfb.EgretFBInstant.setLoadingProgress(100);
        }, 1000);
    }
    private update(): void {
        this.game.update();
    }
}
