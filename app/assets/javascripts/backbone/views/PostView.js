var app = app || {};

// This view displays a post title, slug, and contents
app.PostView = Backbone.View.extend({
  // This is the main element to send our template into
  el: $('#main'),

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    // Generate the Handlebars template from our object
    var template = Handlebars.compile($('#post-view-template').html());
    // populate the template with model data and replace our main content with this new template view
    this.$el.html(template(this.model.toJSON()));
  }

});