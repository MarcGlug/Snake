window.onload = function(){

    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");

    const fps = 10;
    const pix = 30;
    var score = 0;
    var food;
    var snake;
    
    class Apple {
        constructor(){
            this.x = Math.round(Math.random()*29)*pix;
            this.y = Math.round(Math.random()*19)*pix;
        }

        drawFood(){
            ctx.fillStyle = "white";
            ctx.fillRect(this.x,this.y,pix,pix);
        }
    }

    class Snake {
        constructor(){
            this.x = 10*pix;
            this.y = 10*pix;
            this.direction = "Right";
        }
        
        drawSnake(){
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y,pix,pix);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.x, this.y,pix,pix);
        }

        moveSnake(){
            switch(this.direction){
                case "Left": 
                    this.x == 0 ? this.x = cvs.width - pix : this.x -= pix;
                    break;
                case "Right": 
                    this.x == cvs.width - pix ? this.x = 0 : this.x += pix;
                    break;
                case "Up": 
                    this.y == 0 ? this.y = cvs.height - pix : this.y -= pix;
                    break;
                case "Down": 
                    this.y == cvs.height - pix ? this.y = 0 : this.y += pix;
                    break;
            }
        }

        setDirection(e){
            if(e.keyCode >= 37 && e.keyCode <=40){ // on vérifie que l'input vient des fleches directionnelles
                snake.direction = e.key.slice(5); //on récupère la direction en enlevant le prefixe "Arrow"
            }
        }
    }

    createFood();
    snake = new Snake;
    setInterval(draw,1000/fps);
    document.addEventListener("keydown", snake.setDirection);
    
    
    /**
     * Fonction qui dessine le jeu
     */
    function draw(){

        ctx.clearRect(0,0,cvs.width, cvs.height);
        checkIfsSnakeEatFood(snake, food);
        document.getElementById("score").innerHTML = score; 
        snake.drawSnake();
        food.drawFood();
        snake.moveSnake();
    }
    
    function createFood(){
        food = new Apple();
    }

    function checkIfsSnakeEatFood(snake, food){
        if(snake.x == food.x && snake.y == food.y){
            createFood();
            score++;
        }
    }

}

