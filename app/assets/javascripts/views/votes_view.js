ImgurClone.Views.VotesView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("votes-container")
		this.fetchFavorites();
		this.fetchVotes();
	},
	
	events: {
		"click #upvote-button": "upvote",
		"click #downvote-button": "downvote",
		"click #favorite-button": "favorite"
	},
	
	fetchFavorites: function(){
		this.photoFavorites = this.model.get("favorites")
		if (this.photoFavorites){
			this.currentUserFavorite = this.photoFavorites.where({user_id: ImgurClone.user_id})
		}
	},
	
	fetchVotes: function(){
		this.photoUservotes = this.model.get("uservotes")
		if (this.photoUservotes){
			this.currentUserVote = this.photoUservotes.where({user_id: ImgurClone.user_id})
		}
	},
	
	determineVotePercentage: function(){
		var upvotes = this.model.get("uservotes").where({ value: 1 })
		var downvotes = this.model.get("uservotes").where({ value: -1 })

		var progress = upvotes.length/(upvotes.length + downvotes.length) * 100
		var percentage = ((progress + "%") === "NaN%") ? "0%" : (progress + "%")
		return percentage
	},
	
	updateUpvotesBar: function(){
		var percentage = this.determineVotePercentage();
		$('#upvotes-bar').css('width', percentage);
	},
	
	favorite: function(event){
		event.preventDefault();
		var that = this;
		this.currentUserFavorite = this.photoFavorites.where({user_id: ImgurClone.user_id})
		
		if ( $("#favorite-button").hasClass("favorite-clicked") ){
			that.currentUserFavorite[0].destroy({
				url: "/favorites/"+that.currentUserFavorite[0].get("id"),
				success: function(model, response){
					var photo_id = that.currentUserFavorite[0].get("photo_id")
					var photo = ImgurClone.PhotosCollection.get(photo_id)
					
					ImgurClone.FavoritePhotosCollection.remove(photo)
					
					$("#favorite-button").toggleClass("favorite-clicked")
					$("#favorite-button").val("Favorite")
				}
			})
		} else {
			that.photoFavorites.create({ favorite: { user_id: ImgurClone.user_id, photo_id: that.model.get("id") } }, {
				url: "/photos/" + that.model.get("id") + "/favorites",
				success: function(model, response){
	
					var photo_id = model.get("photo_id")
					var photo = ImgurClone.PhotosCollection.get(photo_id)
					
					ImgurClone.FavoritePhotosCollection.add(photo)
					$("#favorite-button").toggleClass("favorite-clicked")
					$("#favorite-button").val("Unfavorite")
				}
			})
		}
	},
	
	
	upvoteSuccess: function(){
		$("#upvote-button").toggleClass("upvote-clicked")
		$("#downvote-button").removeClass("downvote-clicked")
		this.updateUpvotesBar();
	},
	
	upvote: function(event){
		event.preventDefault();
		var that = this;
		if ($(event.currentTarget).hasClass("upvote-clicked")){
			this.model.save({},{
				url: "/photos/" + this.model.escape("id") + "/cancelvote",
				method: "POST",
				success: function(){
					that.upvoteSuccess();
				}
			});				
		} else {
			this.model.save({},{
				url: "/photos/" + this.model.escape("id") + "/upvote",
				method: "POST",
				success: function(){
					that.upvoteSuccess();
				}
			});
		}
	},
	
	downvoteSuccess: function(){
		$("#downvote-button").toggleClass("downvote-clicked")
		$("#upvote-button").removeClass("upvote-clicked")
		this.updateUpvotesBar();
	},
	
	downvote: function(event){
		event.preventDefault();
		var that = this;
		if ($(event.currentTarget).hasClass("downvote-clicked")){
			this.model.save({},{
				url: "/photos/" + this.model.escape("id") + "/cancelvote",
				method: "POST",
				success: function(){
					that.downvoteSuccess();
				}
			});				
		} else {
			this.model.save({},{
				url: "/photos/" + this.model.escape("id") + "/downvote",
				method: "POST",
				success: function(){
					that.downvoteSuccess();
				}
			});
		}
	},
	
	template: JST['votes_view'],
	
	render: function(){
		this.$el.html(this.template({ count: this.uservotesCount, currentUserVote: this.currentUserVote, currentUserFavorite: this.currentUserFavorite, percentage: this.determineVotePercentage() }))
		return this
	}
});












