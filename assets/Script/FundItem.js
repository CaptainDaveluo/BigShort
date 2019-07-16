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
        fundName:{
            default:null,
            type:cc.Label
        },
        price:{
            default:null,
            type:cc.Label
        },
        earning:{
            default:null,
            type:cc.Label
        },
        type:{
            default:null,
            type:cc.Label
        },
        share:{
            default:null,
            type:cc.Label
        },
        scrollView:{
            default:null,
            type:cc.Node
        },
        delegate:{
            default:null,
            type:cc.Component
        },
        cost:0,
        value:0
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
    onBuyButtonTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        var total = parseFloat(this.price.string)*1000; 
        if (com.cashNum < total){
            var message = "金钱不足,您当前仅有" + com.cashNum +"现金，购买需要" + total + "现金";
            scrollViewHandller.printMessage(message);
        } else {
            var message = "你买入了" + this.fundName.string + "1000份，确认净值为:" + this.price.string +"总价:"+total;
            scrollViewHandller.printMessage(message);
            com.cashNum -= total;
            this.delegate.addStoreItem(this.fundName.string,this.price.string);
        }
    },
    onSellButtonTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        var total = this.value * parseInt(this.share.string);
        var message = "你出售了" + this.fundName.string + "总价为:" + total;
        com.cashNum += total;
        this.delegate.removeStoreItem(this.fundName.string);
        scrollViewHandller.printMessage(message);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
