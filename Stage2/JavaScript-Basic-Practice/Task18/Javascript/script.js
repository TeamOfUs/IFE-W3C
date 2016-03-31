var array = [],
    input = document.getElementById("input");

function show() {
    var containner = document.getElementById("container");
    containner.innerHTML = "";
    for (var i=0;i<array.length;i++){
        var child = document.createElement("div");
        child.setAttribute("class","output");
        child.innerHTML = array[i];
        document.getElementById("container").appendChild(child);
    }

}

(function(){
    var unshift = document.getElementById("unshift"),
        shift = document.getElementById("shift"),
        pop = document.getElementById("pop"),
        push = document.getElementById("push");

        unshift.onclick = function(){

            var value = input.value;
            array.unshift(value);
            show();
        }
        shift.onclick = function(){
            array.shift();
            show();
        }

        pop.onclick = function(){
            array.pop();
            show();
        }

        push.onclick = function(){
            var value = input.value;
            array.push(value);
            show();
        }

})();
