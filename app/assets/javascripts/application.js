// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
// = require turbolinks
//= require underscore
//= require handlebars
//= require backbone
//= require backbone/app
//= require d3
//= require_tree .

// function offset(div){
//     $('body').animate({ scrollTop: div.top - 100 }, 700, "easeOutExpo");
// }

// $(function(){
// 	$("#octocat").on('click', function(){
// 		offset($('#canvas').offset());
// 	});
// });
function loadGraph() {
  $.getJSON("/get_fork_day/date", function(data) {
    var array = data.repos
    var svg = d3.select("#container").append("svg")
        .attr("width", 1000)
        .attr("height", 500)
        .style("background", "white")
        .style("border", 'solid 5px grey');

    svg.selectAll("circle")
      .data(array)
      .enter()
      .append("circle")
      .attr('cy', function(d) {
        return (d.total_forks / (Math.random() * 4)) % 500
      })
      .attr('cx', function(d){
        return (d.total_forks / (Math.random() * 4)) % 1000
      })
      .attr('r', function(d){
        return d.forked_today * 2
      })

      .attr('fill', 'purple')
      .append('text')
      .text(function(d) {return d.name} )
      .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .style("color", "black");
  });
}

