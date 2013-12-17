ImgurClone.Collections.Comments = Backbone.Collection.extend({
	
	url: " /photos/" + this.photo_id + "/comments",
	model: ImgurClone.Models.Comment
	
});