// Control the include order of our backbone app js files
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

$(function() {
  // create the app's router from the Router construct
  app.router = new app.Router();

  $('#canvas').hide();
  // start our backbone history
  Backbone.history.start();

  mainPageLoad();

  $('#octocat').on('click', function() { animateMainExit(); });
  $('#button').on('click', function() { changeDate(); });
});
