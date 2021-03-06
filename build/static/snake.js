const score = document.getElementById('score');

                        const board = document.getElementById('snake');
                        const board_context = board.getContext("2d");

                        let dx = 20;
                        let dy = 0;

                        let food_x;
                        let food_y;

                        let snake = [
                            {
                                x: 20,
                                y: 20
                            }, 
                            {
                                x: 0,
                                y: 20
                            }
                        ];
                        
                        function drawSnakePart(snakePart) {
                            board_context.fillStyle = "#B37AF8";
                            board_context.strokeStyle = "#461E76 ";
                            board_context.fillRect(snakePart.x, snakePart.y, 20, 20);
                            board_context.strokeRect(snakePart.x, snakePart.y, 20, 20);
                        }

                        function drawSnake() {
                            snake.forEach(drawSnakePart);
                        }

                        function clearCanvas() {
                            img = new Image();
                            src = img.src = "static/public/bg.png";
                            board_context.fillStyle = board_context.createPattern(img, 'repeat');
                            board_context.fillRect(0, 0, 500, 500);
                        }

                        function moveSnake() {
                            const head = {
                                x: snake[0].x + dx,
                                y: snake[0].y + dy
                            }
                            snake.unshift(head);
                            if(snake[0].x === food_x && snake[0].y === food_y) {
                                generateFood();
                                score.innerText = parseInt(score.innerHTML) + 1;
                            } else
                                snake.pop();
                        }

                        function changeDirection(event) {
                            const UP_KEY = 38;
                            const DOWN_KEY = 40;
                            const LEFT_KEY = 37;
                            const RIGHT_KEY = 39;

                            const keyPressed = event.keyCode;

                            if(changingDirection)
                                return;
                            
                            changingDirection = true;

                            if(keyPressed == UP_KEY) {
                                dx = 0;
                                dy = -20;
                            }

                            if(keyPressed == DOWN_KEY) {
                                dx = 0;
                                dy = 20;
                            }

                            if(keyPressed == LEFT_KEY) {
                                dx = -20;
                                dy = 0;
                            }

                            if(keyPressed == RIGHT_KEY) {
                                dx = 20;
                                dy = 0;
                            }
                        }

                        function death() {
                            for(let i = 1; i < snake.length; i++) {
                                const collision = (snake[i].x == snake[0].x) && (snake[i].y == snake[0].y);
                                if(collision) {
                                    alert('coll');
                                    return true;
                                }
                            }
                            const hitLeftWall = snake[0].x < 0;  
                            const hitRightWall = snake[0].x > 500 - 20;
                            const hitTopWall = snake[0].y < 0;
                            const hitBottomWall = snake[0].y > 500 - 20;
                            
                            return hitLeftWall ||  hitRightWall || hitTopWall || hitBottomWall;
                        }

                        generateFood();
                        document.addEventListener("keydown", changeDirection);

                        function randomFood(x, y) {
                            return Math.round((Math.random() * (x - y) + y) / 20) * 20;
                        }

                        function generateFood() {
                            food_x = randomFood(0, 500 - 20);
                            food_y = randomFood(0, 500 - 20);
                            snake.forEach(function has_eaten(part) {
                                if((part.x == food_x) && (part.y == food_y))
                                    generateFood();
                            });
                        }

                        function drawFood() {
                            board_context.fillStyle = '#ff0061';
                            board_context.strokeStyle = '#ff0000';
                            board_context.fillRect(food_x, food_y, 20, 20);
                            board_context.strokeRect(food_x, food_y, 20, 20);
                        }

                        function play() {

                            if(death()) {
                                snake 
                                board_context.fillStyle = '#300C5D';
                                board_context.fillRect(0, 0, 500, 500);
                                board_context.fillStyle = 'white';
                                board_context.font = '25px Open Sans';
                                board_context.fillText("Woops. You're dead.", 140, 475);
                                score.innerText = 0;
                                setTimeout(function() {
                                    dx = 20;
                                    dy = 0;
                                    snake = [
                                        {
                                            x: 20,
                                            y: 20
                                        }, 
                                        {
                                            x: 0,
                                            y: 20
                                        }
                                    ];
                                    board_context.clear();
                                    play();
                                }, 2000);
                            }
                            
                            changingDirection = false;

                            setTimeout(function onTick() {
                                clearCanvas();
                                drawFood();
                                moveSnake();
                                drawSnake();
                                play();
                            }, 100)
                        }

                        play();