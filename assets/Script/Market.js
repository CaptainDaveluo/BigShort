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
        goodsItem:{
            default:null,
            type:cc.Prefab
        },
        storeItem:{
            default:null,
            type:cc.Prefab
        },
        goodsContent:{
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
        goodsViewHeight: 0,
        storeViewHeight: 0,
        goodsList:[]
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

    onLoad () {
        this.goodsList = [{"name":"大米","price":10},
        {"name":"牛奶","price":20},
        {"name":"烟草","price":60},
        {"name":"钢材","price":200},
        {"name":"铁矿石","price":500},
        {"name":"铜矿石","price":1000}]
        this.refreshGoodsListView();
        this.refreshStoreListView();
    },
    addStoreItem (name,price) {
        var existItem = false;
        for (var i=0;i<com.storeList.length;i++){
            var item = com.storeList[i];
            if (item["name"] == name) {
                item["number"] += 1;
                existItem = true;
                this.refreshStoreListView();
                break;
            }
        }
        if (existItem == false) {
            var itemNode = cc.instantiate(this.storeItem);
            itemNode.getComponent("GoodsItem").goodsName.string = name
            itemNode.getComponent("GoodsItem").price.string = price + "|" + price;
            itemNode.getComponent("GoodsItem").number.string = "1";
            itemNode.getComponent("GoodsItem").scrollView = this.messageView;
            itemNode.getComponent("GoodsItem").delegate = this;
            this.storeContent.addChild(itemNode);
            itemNode.y = this.storeViewHeight;
            this.storeViewHeight -= itemNode.height;
            
            var goodsItem = {"name":name,"price":price,"number":1};
            com.storeList.push(goodsItem);
        }
    },
    removeStoreItem (name) {
        for (var i=0;i<com.storeList.length;i++) {
            var item = com.storeList[i];
            if (item["name"] == name) {
                com.storeList.splice(i, 1);
                break;
            }
        }
        this.refreshStoreListView();
    },
    refreshGoodsListView () {
        this.goodsContent.removeAllChildren();
        this.goodsViewHeight = -20;
        for (var i=0;i<this.goodsList.length;i++) {
            var item = this.goodsList[i];
            var itemNode = cc.instantiate(this.goodsItem);
            itemNode.getComponent("GoodsItem").goodsName.string = item["name"]
            itemNode.getComponent("GoodsItem").price.string = item["price"];
            itemNode.getComponent("GoodsItem").scrollView = this.messageView;
            itemNode.getComponent("GoodsItem").delegate = this;

            this.goodsContent.addChild(itemNode);
            itemNode.y = this.goodsViewHeight;
            this.goodsViewHeight -= itemNode.height;
        }
    },
    refreshStoreListView () {
        this.storeContent.removeAllChildren();
        this.storeViewHeight = -20;
        for (var i=0;i<com.storeList.length;i++) {
            var item = com.storeList[i];
            var itemNode = cc.instantiate(this.storeItem);
            itemNode.getComponent("GoodsItem").goodsName.string = item["name"]
            itemNode.getComponent("GoodsItem").price.string = item["price"] + "|" + item["price"];
            itemNode.getComponent("GoodsItem").number.string = "" + item["number"];
            itemNode.getComponent("GoodsItem").scrollView = this.messageView;
            itemNode.getComponent("GoodsItem").delegate = this;

            this.storeContent.addChild(itemNode);
            itemNode.y = this.storeViewHeight;
            this.storeViewHeight -= itemNode.height;
        }
    },
    onBackButtonTapped (event){
        cc.director.loadScene("main");
    },

    start () {

    },

    // update (dt) {},
});
