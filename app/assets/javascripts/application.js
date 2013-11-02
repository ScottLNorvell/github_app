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
var data;

function loadGraph() {
  $.getJSON("/get_fork_day/date", function(data) {
    var repos = data.repos;
    var HEIGHT = 500,
        WIDTH = 1000,
        format = d3.format(",d"),
        color = d3.scale.category20b();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([WIDTH, HEIGHT])
        .padding(1.5);

    var svg = d3.select("#container").append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("class","bubble")
        .style("background", "white")
        .style("border", 'solid 5px grey');
    

    var node = svg.selectAll(".node")
        .data(bubble.nodes({children: repos})
        .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        // .transition()
        // .duration(1000)
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.name + ": " + d.language; });

    node.append("circle")
        // .transition()
        // .duration(1000)
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.value); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.name.substring(0, d.r / 4); });
  
  });
}

