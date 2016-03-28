//todo List
//show()和showTag()做成一个闭包。

var array =
    tagarray = [],
    input = document.getElementById("input"),
    containner = document.getElementById("container"),
    tagContainner = document.getElementById("tag-container"),
    confirm = document.getElementById("confirm"),
    tagText = document.getElementById("tagText");

function show() {
    containner.innerHTML = "";
    for (var i=0;i<array.length;i++){
        var child = document.createElement("div");
        child.setAttribute("class","output");
        child.innerHTML = array[i];
        document.getElementById("container").appendChild(child);
    }
}
function showTag(){
    tagContainner.innerHTML = "";
    for (var i=0;i<tagarray.length;i++){
        var child = document.createElement("div");
        child.setAttribute("class","output tags");
        child.innerHTML = tagarray[i];
        document.getElementById("tag-container").appendChild(child);
    }
    addTagHandler();
}
function addTagHandler(){
    var tags = document.getElementsByClassName("tags");
    for(var i=0;i<tags.length;i++){
        tags[i].onmouseover = function(){
            if(this.childNodes.length==1){
                console.log("1");
                var deletedTag = document.createElement("span");
                deletedTag.innerHTML = "删除";
                this.appendChild(deletedTag);
            }
        }
        tags[i].onmouseout = function(){
            this.childNodes[1].remove();
        }
        tags[i].onclick = function(){
            this.remove();
            for(var i=0;i<tagarray.length;i++){
                if(tagarray[i]==this.innerText[0]){
                    tagarray.splice(i,1);
                }
            }
        }
    }

}

function repectItem(){
        if(!document.getElementById("repectError")){
            var child = document.createElement("span");
            child.setAttribute("style","color:red");
            child.setAttribute("id","repectError");
            child.innerHTML = "该元素已经存在";
            document.getElementById("tag-container").appendChild(child);
        }
}
function sliceText(text){
    var textArray = text.split(/[,，、 \n\t\r]+/);
    return textArray;
}
(function(){
        confirm.onclick = function(){
            array = sliceText(input.value);
            show();
        }
        tagText.onkeyup = function(event){
            if(event.keyCode===32||event.keyCode===229||event.keyCode===188||event.keyCode===13){
                var tagTextValue = tagText.value;
                tagTextValue.trim;
                 if(event.keyCode===32||event.keyCode===229||event.keyCode===188){
                     tagTextValue = tagTextValue.slice(0,-1);
                 }
                tagText.value="";
                if(tagarray.length>9){
                    tagarray = tagarray.slice(0,9);
                }
                for(var i=0;i<tagarray.length;i++){
                    if(tagTextValue===tagarray[i]){
                        repectItem();
                        return;
                    }
                }
            tagarray.unshift(tagTextValue);
            showTag();
            }
        }
})();
