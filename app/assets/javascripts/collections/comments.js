ImgurClone.Collections.Comments = Backbone.Collection.extend({
	
	url: " /photos/" + this.id + "/comments",
	model: ImgurClone.Models.Comment
	
});