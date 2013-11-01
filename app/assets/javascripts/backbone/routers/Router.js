var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index', // root path (/)
    'posts/:slug': 'getPost'
  },

  // Index action: renders the AppView with the collection of test posts
  index: function() {
    // Create our main index view and give it our seed/test collection
    var posts = new app.Posts();

    // posts.fetch().done(function() {
    //   app.app_view = new app.AppView({collection: posts});
    //   // Render the view
    //   app.app_view.render();
    // });

    posts.fetch();
    app.app_view = new app.AppView({collection: posts});
    // Render the view
    app.app_view.render();
  },

  // GetPost action: renders an individual post view
  getPost: function(slug) {
    // Get our post by slug (the "id")
    var post = new app.Post({slug: slug});

    // post.fetch().done(function() {
    //   // Create the view and set the model.
    //   var post_view = new app.PostView({model: post});
    //   // Render the view!
    //   post_view.render();
    // });

    post.fetch();
    // Create the view and set the model.
    var post_view = new app.PostView({model: post});
    // Render the view!
    post_view.render();
  }
});
