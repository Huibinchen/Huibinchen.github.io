//类声明
class Snake{
    //属性
    constructor(ctx){
        this.ctx = ctx;
        this.w = 10;
        this.h = 10;
        this.movespeed = 3;
        this.moveDirection = "right";
        this.bodys = [
            [20, 0],
            [10, 0],
            [0, 0]
        ];
        this._init();
        this.food = [];
    }
    //键盘操作小蛇行走方向
    _init(){
        document.addEventListener("keydown",(e) =>{
            switch(e.keyCode){
                case 37 :
                    if(this.moveDirection == "right") return;
                    this.moveDirection = "left";
                    break;
                case 38 :
                    if(this.moveDirection == "down") return;
                    this.moveDirection = "up";
                    break;
                case 39 :
                    if(this.moveDirection == "left") return;
                    this.moveDirection = "right";
                    break;
                case 40 :
                    if(this.moveDirection == "up") return;
                    this.moveDirection = "down";
                    break;
            }
        })
    }
    //绘制小蛇移动的区域
    drawGrid(){
        var ctx = this.ctx;
        for(var i = 0; i < 50; i++){
            ctx.beginPath();
            ctx.moveTo(0,10 * i);
            ctx.lineTo(500,10 * i);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(10 * i,0);
            ctx.lineTo(10 * i, 500);
            ctx.stroke();
            ctx.strokeStyle  = "#c7c7c7";
        }

    }
    //绘制蛇的形态
    draw(){
        var ctx = this.ctx;
        ctx.clearRect(0, 0, 600, 600);
        this.drawGrid();
        this.drawFood();
        let bodys = this.bodys;
        for(let i = 0 ; i < bodys.length; i++){
            let body = bodys[i];
            ctx.save();
            ctx.fillRect(body[0],body[1],this.w,this.h);
            ctx.fillStyle = "blue";
            ctx.restore();
            ctx.save();
            ctx.strokeRect(body[0], body[1], this.w, this.h);
            ctx.restore();
        }
    }
    //让小蛇动起来
    move(){
        this.putInFood();
        var fn;
        this.timeId = setTimeout(fn = () =>{
            //移除尾巴一个单位
            this.bodys.pop();
            //头部前进一个单位
            var firstBody = this.bodys[0];
            switch(this.moveDirection){
                case "left":
                    var newFirstBody = [firstBody[0] - 10,firstBody[1]];
                    this.bodys.unshift(newFirstBody);
                    break;
                case "right":
                    var newFirstBody = [firstBody[0] + 10,firstBody[1]];
                    this.bodys.unshift(newFirstBody);
                    break;
                case "up" :
                    var newFirstBody = [firstBody[0],firstBody[1] - 10];
                    this.bodys.unshift(newFirstBody);
                    break;
                case "down" :
                    var newFirstBody = [firstBody[0],firstBody[1] + 10];
                    this.bodys.unshift(newFirstBody);
                    break;
            }
            this.draw();
            this.eatFood();
            this.timeId = setTimeout(fn,2000/this.movespeed);
            this.isDead();
        },0)
    }
    //投放食物
    putInFood(){
        while (true){
            var x = randomInt(0,49) * 10;
            var y = randomInt(0,49) * 10;
            var flge = false;
            for(let i = 0; i < this.bodys.length; i++){
                let body = this.bodys[i];
                if(x == body[0] && y == body[1]){
                    flge = true;
                    break;
                }
            }
            if(!flge){
                this.food = [x,y];
                break;
            }
        }
    }
    //绘制食物
    drawFood(){
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(this.food[0],this.food[1],10,10);
        ctx.restore();
        ctx.save();
        ctx.strokeRect(this.food[0],this.food[1],10,10);
        ctx.restore();
    }
    //吃食物
    eatFood(){
        var firstBody = this.bodys[0];
        var food = this.food;
        if(food[0] == firstBody[0] && food[1] == firstBody[1]){
            this.bodys.push(food);
            this.putInFood();
            this.movespeed += .5;
        }
    }
    isDead(){
        var f = this.bodys[0];
        if(f[0] < 0 || f[1] < 0 || f[0] > 500 || f[1] > 500){
            this.dead();
        }

        // for(let i = 1; i < this.bodys.length; i++){
        //     let body = this.bodys[i];
        //     if(f[0] == body[0] && f[1] == body[1]){
        //         this.dead();
        //     }
        // }
    }
    dead(){
        clearTimeout(this.timeId);
        alert("游戏结束" + this.timeId);
        this.bodys = [[20, 0],
            [10, 0],
            [0, 0]];
        this.moveDirection = "right";
        this.moveSpeed = 3;
    }
}
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var snake = new Snake(ctx);
//游戏区域 + 网格
snake.drawGrid();
//绘制小蛇形态
snake.draw();
//让小蛇动起来
snake.move();



//自封装的随机函数
function randomInt(from,to){
    return parseInt(Math.random() * (to - from + 1) + from);
}