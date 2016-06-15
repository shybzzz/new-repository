/**
 * Created by Admin on 29.08.2015.
 */

self.addEventListener('message', function (e) {
    var data = e.data;
    var reorganized = [];
    for (var y = 0; y < data.length; y++) {
        var row = data[y];
        for (var x = 0; x < row.length; x++) {
            var value = row[x];
            value && reorganized.push({
                x: x,
                y: y,
                z: value,
                style: value
            })
        }
    }
    postMessage(reorganized);
});