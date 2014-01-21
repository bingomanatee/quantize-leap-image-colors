var Canvas = require('canvas');
var fs = require('fs');
var TILE_SIZE = 50;

module.exports = function(filename, colors, done){
    var COLOR_COUNT = colors.length;

    var canvas2 = new Canvas(TILE_SIZE * COLOR_COUNT, TILE_SIZE);
    var ctx = canvas2.getContext('2d');

    var x = 0;
    colors.forEach(function(color){
        var r = color[0]
            , g = color[1]
            , b = color[2]
            , val = r << 16 | g << 8 | b
            , str = '#' + val.toString(16);

        ctx.fillStyle = str;
        ctx.fillRect(x, 0, TILE_SIZE, TILE_SIZE);
        x += TILE_SIZE;
    });

    var out = fs.createWriteStream(filename);

    var inStream = canvas2.pngStream();
    inStream.pipe(out);
    inStream.on('end', function(){
        console.log('palette created');
        done();
    })
}