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