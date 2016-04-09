//commander instance 单例模式 
var Commander = (function(){
    var commander ;
    function init(){
        return {
            launchShip : function () {
                return Factory.createShip();
            },
            runShip : function (id) {
                Mediator.boardcast({
                    id :id,
                    command :"run"
                })
            },
            stopShip : function (id) {
                Mediator.boardcast({
                    id :id,
                    command :"stop"
                })
                
            },
            destroyShip : function (id) {
                Mediator.boardcast({
                    id :id,
                    command :"destroy"
                })
            }
        }
    }
    return {
      getInstance : function () {
          if(!commander) {
              commander = init();
          }
          return commander;
      }  
    }
})();

var run = document.getElementsByClassName("btn-run"),
    stop = document.getElementsByClassName("btn-stop"),
    destroy = document.getElementsByClassName("btn-destroy"),
    create = document.getElementById("create"),
    canvas = document.getElementById("canvas-monitor"),
    monitor = document.getElementById("monitor"),
    ctx = canvas.getContext('2d'),
    myconsole = document.getElementById("logs"),
    commander = Commander.getInstance();

(function(){
    drawEarth(ctx);
    addhandler();
})()

//canvas
function drawEarth(ctx){
    ctx.beginPath();
    ctx.arc(350,350,200,0,360*Math.PI/180,false);
    ctx.fill();
}

//定义飞船的构造函数
function Ship (id) {
    //保护私有变量
    var id = id,
        state="stop",
        power = 100,
        runInterval=null ,
        stopInterval=null ,
        powerUpInterval=null ,
        deg = 0;
    this.runShip=function (){
        if(state=="run"){
            return;
        }
        var ship = document.getElementById("ship"+id),
            distance = 300-(id*20);
            state = "run",
            runInterval = setInterval(function(){
                deg++;
                ship.setAttribute("style","transform: rotate("+deg+"deg);"+"transform-origin:50% "+distance+"px;");
             },50);
            stopInterval = setInterval(function(){
                power--;
                ship.innerHTML = power;
                if(power==0){
                    this.stopShip(id);
                    clearInterval(runInterval);
                    clearInterval(stopInterval);
                    this.powerUp(id);
            }
            },100);
    },
    this.stopShip=function (){
        var ship = document.getElementById("ship"+id);
        state="stop";
        clearInterval(runInterval);
        clearInterval(stopInterval);
    },
    this.destroyShip=function (){
        var ship = document.getElementById("ship"+id),
            controller = document.getElementsByClassName(id);
        ship.remove();
        controller[0].remove();
        Factory.deleteShip(id);
        btnCreateEnabled();
    },
    this.powerUp=function (){
        var ship = document.getElementById("ship"+id),
        powerUpInterval = setInterval(function(){
            power++;
            ship.innerHTML = power;
            if(power==100){
                clearInterval(powerUpInterval);
            }
        },50);
    },
    this.receive=function(command){
        if(command.id == id){
            logs.output(id+"号战舰接收到命令"+command.command);
            switch (command.command){
                case "run":
                    this.runShip();
                    break;
                case "stop":
                    this.stopShip();
                    break;
                case "destroy":
                    this.destroyShip();
                    break;
                default:
                    break;
            }
        }
    }
}

//造船厂
var Factory = (function(){
    var ships = [],
        length = 0;
    return {
        createShip : function() {
            if(length>=4){
                btnCreateDisabled();
                logs.output("飞船数量已经达到上限！")
                return false;
            }
            if(ships.length===0){
                ships[0] = new Ship(0);
                length++;
                return 0;
            }
            for(var i=0;i<ships.length+1&&i<4;i++){
                if(!ships[i]){
                    ships[i] = new Ship(i);
                    length++;
                    return i;
                }
            }
        },
        getShips : function(){
            return ships;
        },
        deleteShip : function(id){
            length--;
            delete ships[id];
        },
        getLength : function(){
            return length;
        }
    }
})()


//监听事件
function addhandler(){
    //btn-create
    create.onclick = function(){
        var id = commander.launchShip();
        if(id === false){
            return ;
        }
        newShipController(id);
        drawShip_dom(id);
        addhandler();
    }
    for(var i=0;i<run.length;i++){
        destroy[i].onclick = function(event){
            commander.destroyShip(getShipIdFromDivClass(event));
        }
        run[i].onclick = function(event){
            commander.runShip(getShipIdFromDivClass(event));
        }
        stop[i].onclick = function(event){
            commander.stopShip(getShipIdFromDivClass(event));
        }

    }
}
//一些功能函数
function getShipIdFromDivClass(event){
    return event.currentTarget.parentElement.className;
}
function btnCreateDisabled(){
    create.setAttribute("disabled","true");
}
function btnCreateEnabled(){
    create.removeAttribute("disabled");
}
function newShipController(id){
    spaceController = document.createElement("div");
    spaceController.setAttribute("class",id);
    controller.appendChild(spaceController);
    spaceController.innerHTML = "战舰"+id+"号控制中心"+"<button class=\"btn btn-run\">出击！</button><button class=\"btn btn-stop\">休息！</button><button class=\"btn btn-destroy\">去死吧！</button>";
}
function drawShip_dom(id){
    var ship = document.createElement("div");
    ship.setAttribute("class","ship");
    ship.setAttribute("id","ship"+id);
    ship.innerHTML = 100;
    monitor.appendChild(ship);
}

//Mediator传播中介
var Mediator = {
    MediatorShips : Factory.getShips(),
    ifMissing:function(){
        return (Math.random()*10)>3;
    },
    update : function(){
        this.MediatorShips = Factory.getShips();
    },
    boardcast : function(command){
        this.update();
        if(this.ifMissing()){
            this.boardcastCommand(command);
        }else{
            logs.output("Command Missing(指挥官不知道)");
            return;
        }
    },
    boardcastCommand:function (command){
    setTimeout(function(){
        for(var i=0;i<Mediator.MediatorShips.length;i++){
            if(Mediator.MediatorShips[i])
            Mediator.MediatorShips[i].receive(command);
        }  
        },1000);
    }
}
//控制台输出
var logs = {
    output : function(msg){
        messageElement = document.createElement("p");
        messageElement.innerHTML = msg;
        myconsole.appendChild(messageElement);
    }
}