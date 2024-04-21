var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Переменные в которых содержатся данные с размерами холста
var width = canvas.width;
var height = canvas.height;

// Переменная с размером одного блока
var blockSize = 10;

// Переменные в которых считают размер поля в блоках
var widhtInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// Счетчик очков
var score = 0;

var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

// Рисование холста
var drawBorder = function () {
    ctx.fillstyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};



// Рисование счетчика очков
var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счет: " + score, blockSize, blockSize);
};


//  Текст при проигровании
var gameOver = function () {
    //clearInterval(interval);
    ctx.font = "60px Courier";
    ctx.fillstyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 2, height / 2);
}


// Размер блока
var block = function (col, row) {
    this.col = col;
    this.row = row;
};

// Размеры змейки
block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,blockSize,blockSize);
};

/*
// Закрашивание блоков 
var sampleBlock = new block(3, 4);
sampleBlock.drawSquare("LightBlue");
*/

// Рисование яблок
Block.prototype.drawCircle = function (color) {
    var centreX = this.col * blockSize + blockSize / 2;
    var centreY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centreX, centreY, blockSize / 2, true);
};

/*
// Закрашивание яблок
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen");
*/

// Функция которая сравнивает расположение головы и яблока
Block.prototype.equal = function(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

/*
// Координаты яблока и головы
var apple = new Block(2, 5);
var head = new Block(3, 5);
head.equal(apple);
*/

// 3 клетки где появляется змейка и сторона направления
var Snake = function () {
    this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
    ];
this.direction = "right";
this.nextDirection = "right";
};

// Закрашивание каждой клетки где находится змейка
Snake.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
    }
};

// Создается функция.
// В переменной head хранятся координаты головы змейки.
// Потом говорим что текущее направление равно следующему направлению.
// Если направление будет направо, то будет добавлена одна колонка.
// Если направление будет вниз, то будет добавлен один ряд.
// Если направление будет влево, то будет отнята одна колонка.
// Если направление будет вверх, то будет отнят один ряд.
// Если голова поподает на ту клетку где находится яблоко, то прибавляется +1 к score и яблокок перемещается на другую клетку.
// Иначе однимется одна клетка.
Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }
    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }
    this.segments.unshift(newHead);
    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

// Если змейка находится на 0 клетке слева или сверху либо на 39 клетке справа или снизу то она врежется а код проверит координаты и закончит игру
// Если змейка врежется в себя то код это заметит так как он проверяет клетку головы и все остальные клетки на которых находится змейка
// При проигрыше все значения возращаются обратно
Snake.prototype.checkCollision = function (head) {
    var leftCollision = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === widhtInBlocks - 1);
    var bottomCollision = (head.row === heightInBlocks - 1);
    var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    var selfCollision = false;
    for (var i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;//true
};

// При нажатии клавиши код определяет её по коду, если названия клавиши не будет в переменной direction то будет undefined
//а если эта  клавиша будет то направление змейки поменяется
var direction = {
    37: "left",
    38: "up",
    39:"right",
    40: "down"
};
$("body").keydown(function (event) {
    var newDirection = direction[event.keydown] 
        if (newDirection !== undefined) {
            Snake.setDirection(newDirection);
}}); 

// Если игрок захочет повернуться назад то эта функция этого не даст сделать 
// В функции записаны все недопустимые движения и код проверяет, если игрок все таки нажмет клавишу то ничего не произойдет и напрвление в setDirection заменяться не будет
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "left") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
   return; }
   this.nextDirection = newDirection;
};