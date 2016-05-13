(function(){
    function $ (element){
        return document.querySelector(element);
    }
    function floatFactory(element){
        return new Float(element);
    }
    function maskFactory(element){
        return new Mask(element);
    }
    function Float(element){
        this.ifshow=false;
        this.el=element;
    }
    function Mask(element){
        this.ifshow=false;
        this.el=element;
    }
    Float.prototype = {
        constructor:Float,
        init:function(){
            addListener();
        },
        show:function(){
            el.style.display = 'block';
            mask.show();
        },
        hide:function(){
            el.style.display = 'none';
            mask.hide();
        },
        addListener:function(){
            $("#clost").addEventListener('click',this.closeHandler());
        },
        closeHandler:function(){
            this.hide();
        }
    };
    Mask.prototype = {
        constructor:Mask,
        init:function(){
            addListener();
        },
        show:function(){
            el.style.display = 'block';
        },
        hide:function(){
            el.style.display = 'none';
        },
        addListener:function(){
            el.addEventListener('click',this.clickhandler());
        },
        clickHandler:function(){
            float.hide();
        }
    };
    
    function pop(){
        float.ifshow=true;
    }
    
    function init(){
        float = floatFactory($("#pop-out"));
        mask = maskFactory($("#mask"));
        $("#btn-alert").addEventListener("click",pop(),false);
    }
    
    var float = {},
        mask = {};

    Object.defineProperty(float,'ifshow',{
        set : function(){
            if(this.ifshow == true){
                this.show();
            }else{
                this.hide();
            }
        }
    });
    Object.defineProperty(mask,'ifshow',{
       set : function(){
            if(this.ifshow == true){
                this.show();
            }else{
                this.hide();
            }
       } 
    });
    
    init();    
})()