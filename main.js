var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Переменные в которых содержатся данные с размерами холста
var width = canvas.width;
var height = canvas.height;

// Переменная с размером одного блока
var blockSize = 10;

// Переменные в которых содержатся данные с размерами холста в блоках
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

drawBorder();

// Рисование счетчика очков
var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счет: " + score, blockSize, blockSize);
};
drawScore();

//  Текст при проигровании
var gameOver = function () {
    //clearInterval(interval);
    ctx.font = "60px Courier";
    ctx.fillstyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 2, height / 2);
}
gameOver();

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

// Закрашивание блоков 
var sampleBlock = new block(3, 4);
sampleBlock.drawSquare("LightBlue");

// Рисование яблок
Block.prototype.drawCircle = function (color) {
    var centreX = this.col * blockSize + blockSize / 2;
    var centreY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centreX, centreY, blockSize / 2, true);
};

// Закрашивание яблок
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen");