ImgurClone.Collections.Uservotes = Backbone.Collection.extend({
	
	url: function(){ 
			return "/photos/" + this.get("photo_id") + "/user_votes"
		},
		
	model: ImgurClone.Models.Uservote
	
});