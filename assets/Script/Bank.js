// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var com = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        loanNumEditBox:{
            type:cc.EditBox,
            default:null
        },
        depositNumEditBox: {
            type:cc.EditBox,
            default:null
        },
        cashNumLabel: {
            type:cc.Label,
            default:null
        },
        restLoanAmount: {
            type:cc.Label,
            default:null
        },
        toastView: {
            type:cc.Node,
            default:null
        },
        toastContent: {
            type:cc.Label,
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //让吐司框隐藏
        this.toastView.active = !this.toastView.active;

        this.cashNumLabel.string = "金钱:" + com.cashNum;
        
    },
    onBorrowing (event) {
        var amount = parseInt(this.loanNumEditBox.string);
        if (com.loanOfCredit + amount <= com.lineOfCredit) {
            com.loanOfCredit += amount;
            var restAmount = com.lineOfCredit - com.loanOfCredit;
            this.restLoanAmount.string = restAmount + "";
            com.cashNum += amount;
            cc.log(com.cashNum);
            this.refreshCashLabel();
            this.showToast("成功贷款金额:"+amount);
        } else {
            this.showToast("贷款额度不足,请先还清贷款");
        }
    },

    start () {

    },
    showToast(message) {
        this.toastContent.string = message;
        this.toastView.active = !this.toastView.active;
        var showToastTime = 1;
        this.startFadeIn();
        this.callback = function() {
            if(showToastTime == 0) {
                this.toastView.active = !this.toastView.active;
                this.unschedule(this.callback);
                return;
            }
            showToastTime--;
        }
        this.schedule(this.callback, 1, 1, 0.1);
    },

    startFadeIn() {
        this.toastView.setScale(2);
        this.toastView.opacity = 0;
        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3,255),cc.scaleTo(0.3,1.0)),cbFadeIn);
        this.toastView.runAction(actionFadeIn);
    },

    onFadeInFinish : function () {
    },

    refreshCashLabel() {
        this.cashNumLabel.string = "金钱:"+com.cashNum;
    },


    // update (dt) {},
});
