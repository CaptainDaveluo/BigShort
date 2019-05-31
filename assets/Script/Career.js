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
        scrollView:{
            default:null,
            type:cc.Node
        },
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

    onCareerTrainningTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        if (com.cashNum >= 500) {
            scrollViewHandller.printMessage("通过培训支付了500元，您的工作技能得到了提升");
            com.cashNum -= 500;
        } else {
            scrollViewHandller.printMessage("您当前的现金不足，先去打工再来提升自己吧!");
        }
    },
    onBackButtonTapped (event) {
        cc.director.loadScene("main");
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
