exports.main = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : "#003"
	},
	childTemplates : [{
		type : "Ti.UI.View",
		properties : {
			height : Ti.UI.SIZE,
			layout : "vertical",
			right : 20,
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				left : 10,
				height : Ti.UI.SIZE,
				top : 5,
				touchEnabled : false,
				textAlign : 'left',
				width : Ti.UI.FILL,
				color : "#c8c8c8",
				font : {
					fontSize : 20,
					fontWeight : "bold"
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'subtitle',
			properties : {
				left : 10,
				height : Ti.UI.SIZE,
				touchEnabled : false,
				textAlign : 'left',
				width : Ti.UI.FILL,
				color : "white",
				bottom : 10,
				font : {
					fontSize : 14
				}
			}
		}]
	}, {
		type : "Ti.UI.Label",
		properties : {
			right : 5,
			color : "white",
			opacity:0.5,
			text : "⟩",
			font : {
				fontWeight : "bold",
				fontSize : 22
			},
			width : 10
		}
	}]
};

exports.idents = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : "#003"
	},
	childTemplates : [{
		type : "Ti.UI.View",
		properties : {
			height : 45,
			right : 20,
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				left : 10,
				height : Ti.UI.SIZE,
			
				touchEnabled : false,
				textAlign : 'left',
				width : Ti.UI.FILL,
				color : "#c8c8c8",
				font : {
					fontSize : 18,
					fontWeight : "bold"
				}
			}
		}]
	}, {
		type : "Ti.UI.Label",
		properties : {
			right : 5,
			color : "white",
			opacity:0.5,
			text : "⟩",
			font : {
				fontWeight : "bold",
				fontSize : 22
			},
			width : 10
		}
	}]
};
exports.deleted = {
	properties : {
		height : 15,
		backgroundColor : "#f00"
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			text : "deleted",
			left : 10,
			height : Ti.UI.SIZE,
			touchEnabled : false,
			textAlign : 'left',
			width : Ti.UI.FILL,
			color : "#c8c8c8",
		}
	}]
};
