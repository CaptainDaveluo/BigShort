var com = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        cashLabel:{
            default:null,
            type:cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
    },

    // use this for initialization
    onLoad: function () {
        //cc.game.addPersistRootNode(this.scrollView);
        cc.log(com.cashNum);
        cc.log(this.cashLabel);
    },
    strat: function(){
        
        
    },

    // called every frame
    update: function (dt) {
    },
});
