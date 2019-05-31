var com = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        // defaults, set visually when attaching this script to the Canvas
    },

    // use this for initialization
    onLoad: function () {
        //cc.game.addPersistRootNode(this.scrollView);
        var label = cc.find("Canvas/layout/CashLabel");
        label.getComponent(cc.Label).string = "" + com.cashNum;
        if (com.timmerCount > 0) {
            this.continueTimmer();
        }
    },
    continueTimmer() {
        var workButton = cc.find("Canvas/workButton");
        var buttonLabel = cc.find("Canvas/workButton/Background/Label");
        this.callback = function () {
            if (com.timmerCount == 0) {
                // 倒计时结束可以使用按钮
                buttonLabel.getComponent(cc.Label).string = "工作";
                workButton.getComponent(cc.Button).interactable = true;
                this.unschedule(this.callback);
                return;
            }
            buttonLabel.getComponent(cc.Label).string = "" + com.timmerCount + "s";
            com.timmerCount--;
        };
        this.schedule(this.callback, 1, 6, 0.1);
        workButton.getComponent(cc.Button).interactable = false;
    },
    strat: function(){
        
        
    },

    // called every frame
    update: function (dt) {
    },
});
