'use strict';

function JsonFake() {

    var maxLength, maxDepth;

    var r0 = ['Name', 'Key', 'Value', 'String', 'Foo', 'Bar'],
        r1 = ['Another', 'Other', 'Different', 'Amazing', 'Stupid', 'Silly', 'Dumb', 'Surprising', 'Wonderful'];

    function random( min, max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomString() {
        return r1[ random(0, r1.length - 1) ] + ' ' + r0[ random(0, r0.length - 1) ];
    }

    function randomKey( obj, key, inc ) {
        key = key || randomString();
        var trueKey = key + (inc ? ' ' + (inc + 1) : '');

        if (obj.hasOwnProperty(trueKey)) {
            trueKey = randomKey(obj, key, inc ? inc + 1 : 1);
        }
        return trueKey;
    }

    function generateNode( _type, _depth ) {
        var e, i;
        var length = random(1, maxLength),
            type = _type === undefined ? random(0, 5) : _type,
            depth = _depth || 1;

        if (depth >= maxDepth) {
            type = random(3, 5);
        }

        switch (type) {
            case 0:
                e = [];
                for (i = length; i--; ) {
                    e[i] = generateNode( undefined, depth + 1 );
                }
            break;
            case 1:
                e = {};
                for (i = length; i--; ) {
                    e[ randomKey(e) ] = generateNode( undefined, depth + 1 );
                }
            break;
            case 2:
                e = randomString();
            break;
            case 3:
                e = random(0, 1000);
            break;
            case 4:
                e = true;
            break;
            case 5:
                e = false;
            break;
        }

        return e;
    }

    this.generate = function( _maxDepth, _maxLength ) {
        maxDepth = _maxDepth || 3;
        maxLength = _maxLength || 5;

        return generateNode(random(0, 1)); // parent node not a string
    };

}
