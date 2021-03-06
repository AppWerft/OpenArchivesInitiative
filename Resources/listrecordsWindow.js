var HEIGHT = 50;
module.exports = function(e) {
	var requestId;
	function refreshList() {
		counter = 0;
		$.progressView.children[0].visible = false;
		$.Refresher.setRefreshing(true);
		function getTimestamp(foo) {
			var bar;
			switch (granularity) {
			case "YYYY-MM-DDThh:mm:ssZ":
				bar = foo.toISOString();
				break;
			case "YYYY-MM-DD":
				bar = foo.format("YYYY-MM-DD");
				break;
			}
			return bar;
		}

		var options = {
			set : setSpec,
			from : (fromButton.getTitle() != "From") ? Moment(fromButton.getTitle()).toISOString() : undefined,
			until : (untilButton.getTitle() != "Until") ? Moment(untilButton.getTitle()).toISOString() : undefined,
		};
		requestId = Provider.ListRecords(options, onLoad, onError);
		listView.setSections([]);
	}

	var OAI = require("de.appwerft.oaipmh");
	var ab = require("com.alcoapps.actionbarextras");
	var from,
	    until = Moment().format("YYYY-MM-DD");
	var url = e.url;
	var id = e.id;
	var Provider = OAI.createProvider({
		url : url,
		timeout : 60000
	});
	var counter = 0;
	var id = id;
	var setSpec = e.setSpec;
	var $ = Ti.UI.createWindow({
		title : e.label
	});
	$.progressView = require("progressView")();
	$.addEventListener("open", function() {
		$.activity.onCreateOptionsMenu = function(m) {
			m.menu.clear();
			var icon = Ti.Android.R.drawable.ic_menu_manage;
			if (icon > 0)
				searchMenuItem = m.menu.add({
					icon : icon,
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				}).addEventListener("click", function() {
					$.Refresher.animate({
						top : HEIGHT
					});
					toolView.animate({
						top : 0
					});
				});
		};

		$.activity.actionBar.displayHomeAsUp = true;
		ab.setSubtitle("List of Records");
		ab.setStatusbarColor("#003");

		$.activity.actionBar.onHomeIconItemSelected = function(_e) {
			$.close();
		};

		
	});
	$.open();
	var toolView = Ti.UI.createView({
		height : HEIGHT,
		top : -HEIGHT
	});
	toolView.add(Ti.UI.createView({
		left : 0,
		top : 5,
		width : "50%"
	}));
	toolView.add(Ti.UI.createView({
		right : 0,
		top : 5,
		width : "50%"
	}));
	$.add(toolView);
	var fromButton = Ti.UI.createButton({
		title : "From",
		left : 5,
		width : Ti.UI.FILL,
		right : 5,
		top : 0,
		color : "white",

	});
	var untilButton = Ti.UI.createButton({
		title : "Until",
		right : 5,
		left : 5,
		top : 0,
		color : "white",
		width : Ti.UI.FILL

	});
	toolView.children[0].add(fromButton);
	toolView.children[1].add(untilButton);
	fromButton.addEventListener("click", require("onbuttonclick"));
	untilButton.addEventListener("click", require("onbuttonclick"));
	fromButton.addEventListener("change", refreshList);
	untilButton.addEventListener("change", refreshList);
	var url = e.url;
	$.Refresher = require("com.rkam.swiperefreshlayout").createSwipeRefresh({
		view : Ti.UI.createListView({
			backgroundColor : "#003",
			templates : {
				'main' : require('TEMPLATES').main,
				'deleted' : require('TEMPLATES').deleted,
			},
			defaultItemTemplate : 'main',
			sections : [],
			searchAsChild : false
		}),
		top : 0
	});
	var listView = $.Refresher.view;
	$.Refresher.addEventListener("refreshing", function() {
		$.Refresher.setRefreshing(false);
	});
	$.add($.Refresher);
	$.Refresher.setRefreshing(true);
	$.addEventListener("close", function() {
		console.log("⬇︎⬇︎⬇︎");
		$.progressView.children[0].hide();
		Provider.abort(requestId);
		onLoad = null;
	});
	var onLoad = function(e) {
		counter++;
		$.Refresher.setRefreshing(false);

		var recordList = e["OAI-PMH"].ListRecords;
		if (recordList) {
			var resumption = recordList.resumptionToken;
			//  {"cursor":50,"content":"ISFvYWlfZGMhMTAw","completeListSize":12762}
			if (resumption) {
				$.progressView.children[0].visible = true;
				ab.setSubtitle("List of Records (" + resumption.cursor + "/" + resumption.completeListSize + ")");
				var progress = 100.0*parseInt(resumption.cursor) / parseInt(resumption.completeListSize);
				resumption.cursor && resumption.completeListSize && $.progressView.children[0].setProgress(progress);
			} else
				$.progressView.children[0].hide();
		}

		if (!recordList) {
			Ti.UI.createNotification({
				message : e["OAI-PMH"].error.content,
				duration : 5000
			}).show();
			return;
		}
		var count = recordList.record.list.length;
		//	ab.setSubtitle("List of Records (" + count + ")");
		listView.appendSection( sectionView = Ti.UI.createListSection({
			headerTitle : "Page: " + counter,
			items : recordList.record.list.map(function(r) {
				return require("recordrow")(r, url);
			})
		}));
	};
	var onError = function(err) {
		$.Refresher.setRefreshing(false);
		Ti.UI.createNotification({
			duration : 5000,
			message : err.message
		}).show();
	};
	refreshList();
	listView.addEventListener('click', function(e) {
		e.url = url;
		require("record")(e);
	});
	listView.addEventListener("itemclick", require("record"));
	$.add($.progressView);
	//$.add($.progessView);
};
