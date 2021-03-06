var app = app || {};

// The main view of the application
app.AppView = Backbone.View.extend({
  // Base the view on a specific existing element
  el: $('#main'),

  // Let's initialize this view by populating the template and caching a selector
  initialize: function() {
    // Populate the main container with our appView template
  },

  // let's render the sub tempaltes for our main app
  render: function() {
    this.collection.each(function(click) {
    var template = Handlebars.compile($('#app-view-template').html());
    var html = template(click.toJSON());
    this.$el.append(html);
  }, this);
    // Returning the object is a good practice so we can do chaining
    return this;
  }
});

