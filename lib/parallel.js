function parallel(functions, cb) {
    var out = {},
    count,
    cbcount=0;
    
    if(Object.prototype.toString.call(functions) === "[object Array]") {
        count = functions.length;
    } else {
        count = Object.keys(functions).length;
    }
    
    for(var i in functions) {
        if(functions.hasOwnProperty(i)) {
            (function(i){ //store i in closure
                functions[i](function(){
                    out[i] = arguments;
                    cbcount++;
                    if(cbcount === count) {
                        cb(undefined, out);
                    }
                });
            }(i));
        }
    }
}

module.exports = parallel;