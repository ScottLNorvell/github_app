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
//= require colorbrewer
//= require_tree .

var data;
var date = $('select').val();

function mainPageLoad() {
    $('.title').addClass('animated bounceInDown');
    $('#octocat').addClass('animated bounceInLeft');
}

function animateMainExit() {
    $('.title').addClass('animated bounceOutUp');
    $('#octocat').addClass('animated bounceOutRight');
    animateCanvasIn();
}

function animateCanvasIn() {
    $('#container').empty();
    $('#canvas').addClass('animated bounceInDown');
    $('#main').hide();
    $('#canvas').show();
    loadGraph();
}

function changeDate() {
    var date = $('select').val();
    animateCanvasIn();
}

function loadGraph() {
    var url = "/get_fork_day/" + date;
  $.getJSON(url, function(data) {
    var repos = data.repos;
    console.log(repos)
    var HEIGHT = 550,
        WIDTH = 700,
        format = d3.format(",d"),
        color = d3.scale.ordinal()  //.category20b();
                .range(colorbrewer.Blues[9])
    var bubble = d3.layout.pack()
        .sort(null)
        .size([WIDTH, HEIGHT])
        .padding(1.5);

    var svg = d3.select("#container").append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("class","bubble")
        .style("background", "white")
        .style("border", 'solid 5px #030059');
    

    var node = svg.selectAll(".node")
        .data(bubble.nodes({children: repos})
        .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + WIDTH/2 + "," + HEIGHT/2 + ")"; })
        
    
    node.append("title")
        .text(function(d) { return d.name + ": " + d.language; });

    node.append("circle")
        .style("fill", function(d) { return color(d.value); })
        // .attr("r", 0)
        .on('click', function(d) { window.location.href = d.repo_url })
        // .on('mouseover', function(d) {  })
        // .transition()
        // .duration(1000)
        .attr("r", function(d) { return d.r; });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.name.substring(0, d.r / 4); })
        .style("opacity", 0)
        .on('click', function(d) { window.location.href = d.repo_url })
        .transition()
        .delay(500)
        .style("opacity", 1)

    node.transition()
        .delay(500)
        .duration(1000)
        .ease('elastic')
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


  });
}

