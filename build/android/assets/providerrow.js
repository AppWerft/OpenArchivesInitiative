module.exports=function(e,i){var a=e.replace("http://","").replace(/\/.*/g,"").replace(/\:.*/g,""),t=Ti.UI.createLabel({text:i,left:10,height:50,top:5,touchEnabled:!1,textAlign:"left",width:Ti.UI.FILL,color:"#c8c8c8",font:{fontSize:20,fontWeight:"bold"}}),o=Ti.UI.createLabel({text:a,left:10,height:22,touchEnabled:!1,textAlign:"left",width:Ti.UI.FILL,color:"white",bottom:10,font:{fontSize:16}}),n=Ti.UI.createTableViewRow({height:90,hasChild:!0,backgroundColor:"#000033",url:e,id:a,label:i,title:t.text});return n.add(t),n.add(o),n};