ImgurClone.Models.Photo = Backbone.Model.extend({
	parse: function(response) {
	    response["comments"] = new ImgurClone.Collections.Comments(response["comments"]);
			response["uservotes"] = new ImgurClone.Collections.Uservotes(response["uservotes"]);
	    return response;
	  },
});