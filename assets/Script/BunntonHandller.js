// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        targetButton:{
            default:null,
            type:cc.Button
        },
        buttonLabel:{
            default:null,
            type:cc.Label
        },
        scrollView:{
            default:null,
            type:cc.Node
        },
        cashLabel:{
            default:null,
            type:cc.Label
        },
        count: 0
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onWorkButtonTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        scrollViewHandller.printMessage("你通过工作得到了100元");
        com.cashNum += 100;
        
        this.cashLabel.string = "" + com.cashNum;
        com.timmerCount = 5;
        this.callback = function () {
            if (com.timmerCount == 0) {
                // 倒计时结束可以使用按钮
                this.buttonLabel.string = "工作";
                this.targetButton.interactable = true;
                this.unschedule(this.callback);
                return;
            }
            this.buttonLabel.string = "" + com.timmerCount + "s";
            com.timmerCount--;
        };
        this.schedule(this.callback, 1, 6, 0.1);
        //禁用按钮
        this.targetButton.interactable = false;
    },
    toCareerScene (event) {
        cc.director.loadScene("career");
    },
    toMarketScene (event) {
        cc.director.loadScene("market");
    }

    // update (dt) {},
});
