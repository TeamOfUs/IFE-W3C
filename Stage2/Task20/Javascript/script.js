var array = [],
    input = document.getElementById("input"),
    textfind = document.getElementById("text-find"),
    btnfind = document.getElementById("btn-find");

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

function sliceText(text){
    var textArray = text.split(/[,，、 \n\t\r]+/);
    return textArray;
}

function findText(text){
    var child = document.getElementById("container").childNodes;
    var reg = new RegExp("["+text+"]");
    for (var i=0;i<array.length;i++){
         if(reg.test(array[i])){
             child[i].setAttribute("style","background-color:green");
         }
    }
}

(function(){
    var unshift = document.getElementById("unshift"),
        shift = document.getElementById("shift"),
        pop = document.getElementById("pop"),
        push = document.getElementById("push"),
        find = document.getElementById("find");

        unshift.onclick = function(){
            var value = input.value,
                textArray = sliceText(value);
            for(var i=textArray.length-1;i>=0;i--){
                array.unshift(textArray[i]);
            }
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
            var value = input.value,
                textArray = sliceText(value);
            for(var i=0;i<textArray.length;i++){
                array.push(textArray[i]);
            }
            show();
        }

        btnfind.onclick = function(){
            var value = textfind.value;
            findText(value);
        }
})();
