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
        kline: {
            type:cc.Prefab,
            default:null
        },
        stockItem: {
            type:cc.Prefab,
            default:null
        },
        stockContent: {
            type:cc.Node,
            default:null
        },
        layout: {
            type:cc.Node,
            default:null
        },
        amountLabel: {
            type:cc.Label,
            default:null
        },
        cashNumLabel: {
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
        klineComponent:null,
        amount:0,
        stockList:[],
        stockViewHeight:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var kline = cc.instantiate(this.kline);
        this.layout.addChild(kline);
        kline.y = 80;
        this.klineComponent = kline.getComponent("KLine");
        this.klineComponent.initData();

        this.onLoadStockData();
        this.cashNumLabel.string = "金钱:"+com.cashNum;

        //让吐司框隐藏
        this.toastView.active = !this.toastView.active;
    },

    onPlusButtonTapped (event) {
        if(this.amount<5000)
            this.amount += 100;
        this.amountLabel.string = "" + this.amount;
    },
    onSubButtonTapped (event) {
        if(this.amount>0)
            this.amount -= 100;
        this.amountLabel.string = "" + this.amount;
    },

    onLoadStockData(){
        this.stockList = [{"code":"001023","price":1.21,"amount":0},
        {"code":"001024","price":1.32,"amount":0},
        {"code":"001025","price":0.87,"amount":0},
        {"code":"501024","price":1.04,"amount":0},
        {"code":"101024","price":0.92,"amount":0},
        {"code":"201024","price":0.71,"amount":0}];
        this.refreshGoodsListView();
    },

    refreshGoodsListView(){
        this.stockContent.removeAllChildren();
        this.fundViewHeight = -20;
        for (var i=0;i<this.stockList.length;i++){
            var item = this.stockList[i];
            var itemNode = cc.instantiate(this.stockItem);
            itemNode.getComponent("StockItem").stockCode.string = item["code"];
            itemNode.getComponent("StockItem").price.string = item["price"];
            itemNode.getComponent("StockItem").amount.string = item["amount"];
            itemNode.getComponent("StockItem").delegate = this;

            this.stockContent.addChild(itemNode);
            itemNode.y = this.stockViewHeight;
            this.stockViewHeight -= itemNode.height;
        }
    },
    onBackButtonTapped (event){
        cc.director.loadScene("main");
    },

    getAmount(){
        return this.amount;
    },

    refreshCashLabel() {
        this.cashNumLabel.string = "金钱:"+com.cashNum;
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
        cc.log("fade in");
        this.toastView.setScale(2);
        this.toastView.opacity = 0;
        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3,255),cc.scaleTo(0.3,1.0)),cbFadeIn);
        this.toastView.runAction(actionFadeIn);
    },

    onFadeInFinish : function () {
    },

    refreshKLineData(stockCode){
        this.klineComponent.initData(stockCode);
    },

    start () {

    },

    // update (dt) {},
});
