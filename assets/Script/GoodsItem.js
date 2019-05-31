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
        goodsName:{
            default:null,
            type:cc.Label
        },
        price:{
            default:null,
            type:cc.Label
        },
        number:{
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onBuyButtonTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        var total = parseFloat(this.price.string); 
        if (com.cashNum < total){
            var message = "金钱不足,您当前仅有" + com.cashNum +"现金，购买需要" + total + "现金";
            scrollViewHandller.printMessage(message);
        } else {
            var message = "你买入了" + this.goodsName.string + "一份，单价为:" + this.price.string;
            scrollViewHandller.printMessage(message);
            com.cashNum -= total;
            this.delegate.addStoreItem(this.goodsName.string,this.price.string);
        }
    },
    onSellButtonTapped (event) {
        var scrollViewHandller = this.scrollView.getComponent("ScrollViewHandller");
        var total = parseFloat(this.price.string) * parseInt(this.number.string);
        var message = "你出售了" + this.goodsName.string + "总价为:" + total;
        com.cashNum += total;
        this.delegate.removeStoreItem(this.goodsName.string);
        scrollViewHandller.printMessage(message);
    },

    start () {

    },

    // update (dt) {},
});
