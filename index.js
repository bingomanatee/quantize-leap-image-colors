var u2p = require('./lib/url_to_palette');
var id = require('./lib/image_data');
var util = require('util');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var dp = require('./lib/draw_palette');

var data = {};


var q = async.queue(function(app, done){


    u2p(app.double_tile_image_url, function(err, colors){
        if (err){
            console.log('colors of %s: (error)', app.slug);
            data[app.slug] = false;
            done();
        } else {
            console.log('colors of %s: %s', app.slug, JSON.stringify(colors));
            data[app.slug] = colors;
            dp('palettes/' + app.slug + '.png', colors, done);
        }
    });

}, 6);

q.drain = function(){
    fs.writeFile('colors.json', JSON.stringify(data), function(){
        console.log('colors written');
    })
}

q.push(_.compact(_.pluck(id, 'search_result')));