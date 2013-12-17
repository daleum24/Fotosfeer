ImgurClone.Models.Comment = Backbone.Model.extend({
	url: function(){ 
			return "/photos/" + this.get("photo_id") + "/comments"
		},
});