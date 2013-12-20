ImgurClone.Views.VotesView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("votes-container")
		this.photoUservotes = this.model.get("uservotes")
		this.photoFavorites = this.model.get("favorites")
		if (this.photoUservotes){
			this.currentUserVote = this.photoUservotes.where({user_id: ImgurClone.user_id})
		}
		
		if (this.photoFavorites){
			this.currentUserFavorite = this.photoFavorites.where({user_id: ImgurClone.user_id})
		}

		this.uservotesCount = 0
		
		if (this.photoUservotes.length > 0){
			this.photoUservotes.forEach(function(uservote){
				that.uservotesCount += +(uservote.escape("value"))
			});
		}
		
	},
	
	events: {
		"click #upvote-button": "upvote",
		"click #downvote-button": "downvote",
		"click #favorite-button": "favorite"
	},
	
	favorite: function(event){
		event.preventDefault();
		var that = this;
		this.currentUserFavorite = this.photoFavorites.where({user_id: ImgurClone.user_id})
		if ( $("#favorite-button").hasClass("favorite-clicked") ){
			that.currentUserFavorite[0].destroy({
				url: "/favorites/"+that.currentUserFavorite[0].get("id"),
				success: function(){
					$("#favorite-button").toggleClass("favorite-clicked")
					$("#favorite-button").val("Favorite")
				}
			})
		} else {
			that.photoFavorites.create({ favorite: { user_id: ImgurClone.user_id, photo_id: that.model.get("id") } }, {
				url: "/photos/" + that.model.get("id") + "/favorites",
				success: function(response){
					// ImgurClone.FavoritePhotosCollection.add(response)
					$("#favorite-button").toggleClass("favorite-clicked")
					$("#favorite-button").val("Unfavorite")
				}
			})
		}
	},
	
	upvote: function(event){
		event.preventDefault();
		var that = this;
		if ($(event.currentTarget).hasClass("upvote-clicked")){
			$.ajax({
				url: "/photos/" + this.model.escape("id") + "/cancelvote",
				method: "POST",
				success: function(){
					
					var new_vote_count = Number($("#count").html()) - 1
					$(event.currentTarget).toggleClass("upvote-clicked")
					$("#downvote-button").removeClass("downvote-clicked")
					
					$("#count").html(new_vote_count)
					
				}
			});				
		} else {
			$.ajax({
				url: "/photos/" + this.model.escape("id") + "/upvote",
				method: "POST",
				success: function(){
					
					if ($("#downvote-button").hasClass("downvote-clicked")){
						var new_vote_count = Number($("#count").html()) + 2
					} else {
						var new_vote_count = Number($("#count").html()) + 1
					}
					
					$(event.currentTarget).toggleClass("upvote-clicked")
					$("#downvote-button").removeClass("downvote-clicked")
					$("#count").html(new_vote_count)
				}
			});
		}
	},
	
	downvote: function(event){
		event.preventDefault();
		var that = this;
		if ($(event.currentTarget).hasClass("downvote-clicked")){
			$.ajax({
				url: "/photos/" + this.model.escape("id") + "/cancelvote",
				method: "POST",
				success: function(){
					$(event.currentTarget).toggleClass("downvote-clicked")
					$("#upvote-button").removeClass("upvote-clicked")
					var new_vote_count = Number($("#count").html()) + 1
					$("#count").html(new_vote_count)
				}
			});				
		} else {
			$.ajax({
				url: "/photos/" + this.model.escape("id") + "/downvote",
				method: "POST",
				success: function(){
					
					if ($("#upvote-button").hasClass("upvote-clicked")){
						var new_vote_count = Number($("#count").html()) - 2
					} else {
						var new_vote_count = Number($("#count").html()) - 1
					}
					
					$(event.currentTarget).toggleClass("downvote-clicked")
					$("#upvote-button").removeClass("upvote-clicked")
					$("#count").html(new_vote_count)
				}
			});
		}
	},
	
	template: JST['votes_view'],
	
	render: function(){
		this.$el.html(this.template({ count: this.uservotesCount, currentUserVote: this.currentUserVote, currentUserFavorite: this.currentUserFavorite }))
		
		return this
	}
});