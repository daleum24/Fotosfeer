ImgurClone.Views.RegionsView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("regions-container")
	},
	
	regionsTemplate: JST['regions_header'],
	
	events:{
		"change .region-select": "display_region"
	},
	
	display_region: function(event){
		event.preventDefault();
		alert("holy fuck!!")
	},
	
	render: function(){
		this.$el.append(this.regionsTemplate({myRegions: ImgurClone.RegionsCollection}))
		this.$el.append($("<div id='region-map' class='dark' ></div>"))
		return this
	}
})