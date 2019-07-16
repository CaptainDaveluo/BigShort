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
        stockCode:{
            default:null,
            type:cc.Label
        },
        price:{
            default:null,
            type:cc.Label
        },
        amount:{
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
    onBuyButtonTapped (event) {
        var amount = this.delegate.amount;
        var price = parseFloat(this.price.string);
        if (com.cashNum < amount*price) {
            this.delegate.showToast("金额不足");
        } else {
            this.amount.string = parseInt(this.amount.string)+amount;
            com.cashNum -= amount* price;
            this.delegate.refreshCashLabel();
            
            var flag = false;
            for (var i=0;i<com.stockList.length;i++) {
                var stock = com.stockList[i];
                if (stock['code'] == this.stockCode.string){
                    stock['amount'] += amount
                    flag = true;
                }
            }
            if (flag == false) {
                var stock = {'code':this.stockCode.string,"amount":amount};
                com.stockList.push(stock);
            }
        }
    },
    onSellButtonTapped (event) {
        if (this.amount.string != "0") {
            this.amount.string = "0";
            var amount = this.delegate.amount;
            com.cashNum += amount* parseFloat(this.price.string);
            this.delegate.refreshCashLabel();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart',this.onEventStart,this);
    },

    onEventStart(){
        this.delegate.refreshKLineData(this.stockCode.string);
    },

    start () {

    },

    // update (dt) {},
});
