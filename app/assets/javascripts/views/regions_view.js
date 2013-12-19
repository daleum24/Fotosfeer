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
		var value = $(event.currentTarget).find(":selected").val()
		
		if (value === "select-region"){
			var currentZoom = ImgurClone.RegionMap.getZoom()
			var zoomOut = currentZoom - 2 
			 
			ImgurClone.RegionMap.zoomOut(zoomOut)
			ImgurClone.RegionMap.panTo([0,0])
			// ImgurClone.RegionMap.zoomOut(zoomOut/2)
		} else if (value === "add-region") {
			console.log("wait....")
		}  else {
			var region = ImgurClone.RegionsCollection.get(value)
			var southWest = [ region.escape("south_bound"), region.escape("west_bound") ]
			var northEast = [ region.escape("north_bound"), region.escape("east_bound") ]
			ImgurClone.RegionMap.fitBounds([ southWest, northEast ])
		}
		
	},
	
	render: function(){
		this.$el.append(this.regionsTemplate({myRegions: ImgurClone.RegionsCollection}))
		this.$el.append($("<div id='region-map' class='dark' ></div>"))
		return this
	}
})