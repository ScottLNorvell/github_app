// Control the include order of our backbone app js files

//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

$(function() {
  // create the app's router from the Router construct
  app.router = new app.Router();
  // start our backbone history
  Backbone.history.start();

});
