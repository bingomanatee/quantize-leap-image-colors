var util = require('util');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Canvas = require('canvas');
var request = require('request');
var palette = require('palette');
var fs = require('fs');

var COLOR_COUNT = 5;

module.exports = function (url, callback) {

    var buffer = new Buffer(0);

    var handle = request.get(url, {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
           // 'Accept-Encoding': 'gzip,deflate,sdch',
            'Accept-Language': 'en-US,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': 'cdn.filepicker.io',
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36'
        }
    });

    handle.on('data', function(data){
        buffer = Buffer.concat([buffer,data]);
    });

    handle.on('error', function(err){
        callback(err);
    });

    handle.on('end', function(){

        var img = new Canvas.Image();

        img.src = buffer;
        var canvas = new Canvas(img.width, img.height);
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        var colors = palette(canvas, COLOR_COUNT);


        callback(null, colors);
    });

/*    ,
    function (err, res, data) {
        console.log('loading %s', url);

        fs.writeFileSync('img.jpeg', data, {encoding: 'utf8'});

        img.src = data.toString();

    }

    */

};