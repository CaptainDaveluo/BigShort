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
        fundItem:{
            default:null,
            type:cc.Prefab
        },
        holdItem:{
            default:null,
            type:cc.Prefab
        },
        fundContent:{
            default:null,
            type:cc.Node
        },
        storeContent:{
            default:null,
            type:cc.Node
        },
        messageView:{
            default:null,
            type:cc.Node
        },
        fundViewHeight: 0,
        storeViewHeight: 0,
        fundList:[],
        holdList:[]
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
    onLoad () {
        this.fundList = [{"name":"基金01A","price":1.21,"type":"债券型"},
        {"name":"基金01B","price":1.32,"type":"指数型"},
        {"name":"基金01C","price":0.87,"type":"股票型"},
        {"name":"基金01D","price":1.04,"type":"混合型"},
        {"name":"基金02B","price":0.92,"type":"指数型"},
        {"name":"基金03B","price":0.71,"type":"指数型"}]
        this.refreshGoodsListView();
        this.refreshStoreListView();
    },
    addStoreItem (name,price) {
        var existItem = false;
        for (var i=0;i<com.fundList.length;i++){
            var item = com.fundList[i];
            if (item["name"] == name) {
                item["number"] += 1000;
                existItem = true;
                this.refreshStoreListView();
                break;
            }
        }
        if (existItem == false) {
            var itemNode = cc.instantiate(this.holdItem);
            itemNode.getComponent("FundItem").fundName.string = name
            itemNode.getComponent("FundItem").earning.string =  "0%|" + price;
            itemNode.getComponent("FundItem").share.string = "1000";
            itemNode.getComponent("FundItem").cost = price;
            itemNode.getComponent("FundItem").scrollView = this.messageView;
            itemNode.getComponent("FundItem").delegate = this;
            itemNode.getComponent("FundItem").value = price;
            this.storeContent.addChild(itemNode);
            itemNode.y = this.storeViewHeight;
            this.storeViewHeight -= itemNode.height;
            
            var fundItem = {"name":name,"price":price,"number":1000,"value":price};
            com.fundList.push(fundItem);
        }
    },
    removeStoreItem (name) {
        for (var i=0;i<com.fundList.length;i++) {
            var item = com.fundList[i];
            if (item["name"] == name) {
                com.fundList.splice(i, 1);
                break;
            }
        }
        this.refreshStoreListView();
    },
    refreshGoodsListView () {
        this.fundContent.removeAllChildren();
        this.fundViewHeight = -20;
        for (var i=0;i<this.fundList.length;i++) {
            var item = this.fundList[i];
            var itemNode = cc.instantiate(this.fundItem);
            itemNode.getComponent("FundItem").fundName.string = item["name"];
            itemNode.getComponent("FundItem").price.string = item["price"];
            itemNode.getComponent("FundItem").type.string = item["type"];
            itemNode.getComponent("FundItem").value = item["value"];
            itemNode.getComponent("FundItem").scrollView = this.messageView;
            itemNode.getComponent("FundItem").delegate = this;

            this.fundContent.addChild(itemNode);
            itemNode.y = this.fundViewHeight;
            this.fundViewHeight -= itemNode.height;
        }
    },
    refreshStoreListView () {
        this.storeContent.removeAllChildren();
        this.storeViewHeight = -20;
        for (var i=0;i<com.fundList.length;i++) {
            var item = com.fundList[i];
            var itemNode = cc.instantiate(this.holdItem);
            itemNode.getComponent("FundItem").fundName.string = item["name"];
            itemNode.getComponent("FundItem").earning.string = item["price"] + "|" + item["price"];
            itemNode.getComponent("FundItem").share.string = "" + item["number"];
            itemNode.getComponent("FundItem").scrollView = this.messageView;
            itemNode.getComponent("FundItem").delegate = this;

            this.storeContent.addChild(itemNode);
            itemNode.y = this.storeViewHeight;
            this.storeViewHeight -= itemNode.height;
        }
    },
    onBackButtonTapped (event){
        cc.director.loadScene("main");
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
