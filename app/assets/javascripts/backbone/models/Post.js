var app = app || {};

// Create a model for the posts
app.Post = Backbone.Model.extend({
  // Let's look up our blog post by slug instead of id
  idAttribute: 'slug',
  // Posts have a title and content, and here we set default values
  defaults: {
    title: 'New post'
  },

  urlRoot: '/posts'

});
