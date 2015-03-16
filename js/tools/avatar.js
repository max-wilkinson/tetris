/**
    ADAPTED FROM:
    GitHub-Style Avatar Generator
    by Colin Reeder
*/

(function() {
    Avatar = function(name){
        this.name   = name;
        this.size   = 3;
    }

    Avatar.prototype = {
        name:   null,
        size:   null,

        render: function(){
            var genHash = function(s) {
                var hash = 0;
                if (s.length === 0) {return hash;}
                for (var i = 0; i < s.length; i++) {
                    var char = s.charCodeAt(i);
                    hash = ((hash<<5)-hash)+char;
                    hash = hash & hash;
                }
                return hash;
            };
            
            var addZeroes = function(ns, nd) {
                //Shortest useful for loop ever.
                for(;0<nd-ns.length;ns="0"+ns){}return ns;
            };
        
            var op = addZeroes(Math.abs(genHash(this.name)).toString(16),8);
            //debug("hash of "+this.name+" is "+op);
            
            var clr = color(parseInt(op.substring(0,2),16), parseInt(op.substring(2,4),16), parseInt(op.substring(4,6),16));
            //debug(this.name+"'s color is rgb("+red(clr)+", "+green(clr)+", "+blue(clr)+")");
            fill(clr);
            noStroke();
            randomSeed(parseInt(op.substring(6,8),16));
            
            var mult = 400/((SIZE*2)-1);
            for(var x = 0; x < SIZE; x++) {
                for(var y = 0; y < SIZE*2; y++) {
                    if(random()<0.5) {
                        rect(x*mult,y*mult,mult,mult);
                        rect(400-(x+1)*mult,y*mult,mult,mult);
                    }
                }
            }
        }
    }

    window.Avatar = Avatar;
})();