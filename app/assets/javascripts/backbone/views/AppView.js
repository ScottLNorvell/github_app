var app = app || {}

// The main view of the application
app.AppView = Backbone.View.extend({
  // Base the view on a specific existing element
  el: $('#main'),

  // Let's initialize this view by populating the template and caching a selector
  initialize: function() {
    // Populate the main container with our appView template
    this.$el.html($('#app-view-template').html());
  }

});
