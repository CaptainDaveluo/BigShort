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
        greenBlock:{
            type:cc.Prefab,
            default:null
        },
        redBlock:{
            type:cc.Prefab,
            default:null
        },
        layout:{
            type:cc.Node,
            default:null
        },
        graphic:{
            type:cc.Node,
            default:null
        },
        open:[],
        close:[],
        highest:0,
        lowest:0,
        points:[],
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
    getHighst() {
        var openPrice = Math.max.apply(null,this.open);
        var closePrice = Math.max.apply(null,this.close);
        return openPrice > closePrice ? openPrice : closePrice;
    },
    getLowest() {
        var openPrice = Math.min.apply(null,this.open);
        var closePrice = Math.min.apply(null,this.close);
        return openPrice < closePrice ? openPrice : closePrice;
    },
    initData(stockCode = "001023") {
        var stockList = com.stockList;
        for (var i=0;i<stockList.length;i++){
            if (stockCode == stockList[i]['code']){
                this.open = stockList[i]['open'];
                this.close = stockList[i]['close'];
            }
        }
        this.lowest = this.getLowest();
        this.highest = this.getHighst();
        this.removeAllBlocks();
        this.renderKLine();
    },
    renderKLine() {
        for (var i=0; i < this.open.length; i++) {
            this.addBlock(this.open[i],this.close[i]);
        }
        this.drawLines();
    },
    //添加一日K线记录
    addBlock(openPrice,closePrice) {
        var height = this.highest - this.lowest;
        //收盘价低于开盘价
        var item = null;
        if (closePrice < openPrice) {
            item = cc.instantiate(this.greenBlock);
            item.height = (openPrice - closePrice)/height * 200;
            item.y = (closePrice - this.lowest)/height * 200;
        } else {
            item = cc.instantiate(this.redBlock);
            item.height = (closePrice - openPrice)/height * 200;
            item.y = (closePrice - this.lowest)/height * 200;
        }
        item.width = 20;
        this.points.push(item);
        this.layout.addChild(item);
    },
    ////TODO 删除所有阴阳柱
    removeAllBlocks() {
        for (var i=0; i< this.points.length; i++) {
            var item = this.points[i];
            item.removeFromParent();
            item.destroy();
        }
        this.points.length=0;
    },
    drawLines() {
        var graphics = this.graphic.getComponent(cc.Graphics);
        graphics.clear();
        var firstPoint = this.points[0];
        graphics.fillColor = cc.Color.WHITE;
        graphics.moveTo(20 + firstPoint.x,firstPoint.y);
        for (var i=1;i<this.points.length;i++) {
            var p = this.points[i];
            graphics.lineTo(20 + p.x + i*30,p.y);
        }
        graphics.stroke();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
