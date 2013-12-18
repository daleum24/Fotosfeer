ImgurClone.Views.VotesView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("votes-container")
		this.photoUservotes = this.model.get("uservotes")
		this.uservotesCount = 0
		var that = this;
		
		if (this.photoUservotes.length > 0){
			this.photoUservotes.forEach(function(uservote){
				that.uservotesCount += +(uservote.escape("value"))
			});
		}
		this.currentUserVote = this.photoUservotes.where({user_id: ImgurClone.user_id})
	
		
	  var events = ["add", "change"];
	     _(events).each(function (event) {
	       that.listenTo(that.photoUservotes, event, that.render);
	     });	
	},
	
	events: {
		"click #upvote-button": "upvote",
		"click #downvote-button": "downvote"
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
		this.$el.html(this.template({ count: this.uservotesCount, currentUserVote: this.currentUserVote }))
		
		return this
	}
});