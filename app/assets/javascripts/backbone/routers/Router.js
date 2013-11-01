var app = app || {};

// This is our router/controller for our app
app.Router = Backbone.Router.extend({
  // This is a simple object of routes.  The key is the route, and the value is the action
  routes: {
    '': 'index',
  },

  initialize: function() {

  },
    
  // Index action: renders the AppView with the collection of test posts
  index: function() {
    app.app_view = new app.AppView();
    // Render the view
    app.app_view.render();
  }
});
