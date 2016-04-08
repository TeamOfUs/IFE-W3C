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
    myconsole = document.getElementById("logs");

var commander = Commander.getInstance();

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
    var id = id,
        power = 100,
        state ="",
        runInterval ,
        stopInterval ,
        powerUpInterval ,
        deg = 0;
    function runShip(id){
        if(state=="run"){
            return;
        }
        var ship = document.getElementById("ship"+id);
            state = "run";
            distance = 300-(id*20);
            runInterval = setInterval(function(){
            deg++;
            ship.setAttribute("style","transform: rotate("+deg+"deg);"+"transform-origin:50% "+distance+"px;");
        },50);
            stopInterval = setInterval(function(){
            power--;
            ship.innerHTML = power;
            if(power==0){
                stopShip(id);
                clearInterval(runInterval);
                clearInterval(stopInterval);
                powerUp(id);
            }
        },100);
    }
    function stopShip(id){
        var ship = document.getElementById("ship"+id);
        clearInterval(runInterval);
        clearInterval(stopInterval);
        
    }
    function destroyShip(id){
        var ship = document.getElementById("ship"+id);
        ship.remove();
    }
    function powerUp(id){
        var ship = document.getElementById("ship"+id);
        powerUpInterval = setInterval(function(){
            power++;
            ship.innerHTML = power;
            if(power==100){
                clearInterval(powerUpInterval);
            }
        },50);
    }
    return {
        getId : function(){
            return id;
        },
        getState : function(){
            return state;
        },
        receive : function(command){
            if(command.id == this.getId()){
                logs.output(this.getId()+"号战舰接收到命令"+command.command);
                switch (command.command){
                    case "run":
                        runShip(command.id);
                        break;
                    case "stop":
                        stopShip(command.id);
                        break;
                    case "destroy":
                        destoryShip(command.id);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}






//ShipFactory 工厂模式
var Factory = (function(){
    var ships = [];
    return {
        createShip : function() {
            if(ships.length>=4){
                btnCreateDisabled();
                logs.output("飞船数量已经达到上限！")
                return false;
            }
            if(ships.length===0){
                ships[0] = new Ship(0);
                return 0;
            }
            for(var i=0;i<ships.length+1&&i<4;i++){
                if(!ships[i]){
                    ships[i] = new Ship(i);
                    return i;
                }
            }
        },
        getShips : function(){
            return ships;
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
        drawShip(id);
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

function getShipIdFromDivClass(event){
    return event.currentTarget.parentElement.className;
}
function btnCreateDisabled(){
    create.setAttribute("disabled","true");
}
function btnCreateEnabled(){
    create.setAttribute("disabled","false");
}
function newShipController(id){
    spaceController = document.createElement("div");
    spaceController.setAttribute("class",id);
    controller.appendChild(spaceController);
    spaceController.innerHTML = "战舰"+id+"号控制中心"+"<button class=\"btn btn-run\">出击！</button><button class=\"btn btn-stop\">休息！</button><button class=\"btn btn-destroy\">去死吧！</button>";
}
function ifMissing(){
    return (Math.random()*10)>3;
}

function drawShip(id){
    var ship = document.createElement("div");
    ship.setAttribute("class","ship "+id);
    ship.setAttribute("id","ship"+id);
    ship.innerHTML = 100;
    monitor.appendChild(ship);
}
function runShip(id){}
function stopShip(id){}
function destoryShip(id){
    document.getElementById("ship"+id).remove();
}

var Mediator = {
    MediatorShips : [],
    update : function(){
        this.MediatorShips = Factory.getShips();
    },
    boardcast : function(command){
        this.update();
        if(ifMissing()){
            setTimeout(function(){
                for(var i=0;i<Mediator.MediatorShips.length;i++){
                    Mediator.MediatorShips[i].receive(command);
                }  
            },1000);
        }else{
            logs.output("Command Missing(指挥官不知道)");
            return;
        }
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


//            var ship = document.getElementById(i.toString());
//            var deg = 0;
//            setInterval(function(){
//                deg++;
//                ship.setAttribute("style","transform: rotate("+deg+"deg)");
//            },50);