var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Buat nyimpan pattern dari game nya
var userClickedPattern=[];
var gameStarted = false; // Buat ngecek game nya udah dimulai atau belum, kalau ada input dari keyboard gamenya baru mulai 
var level = 0;

$(document).keypress(function(){ // Buat nge detect pencetan keyboard di seluruh dokumen
    if(!gameStarted){
        $("#level-title").text("Level "+level); // Buat nampilin level di title pertama kali saat game dimulai
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id"); // Buat ngambil ID dari button yang di klik
    userClickedPattern.push(userChosenColour); // Buat nyusun pattern dari player nya
    
    playSound(userChosenColour); // Buat memainkan suara dari warna yang dipilih
    animatePress(userChosenColour); // Buat animasi warna ketika button nya di klik

    checkAnswer(userClickedPattern.length-1) // Kita cek jawaban dari player nya, lenght nya dikurang 1 karena index dari 0
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ // Kita cek apakah pattern dari game sama dengan pattern dari player
        if (userClickedPattern.length === gamePattern.length){ // Jika input pattern udah sama dengan pattern dari game nya, maka kita lanjut ke level selanjutnya
            setTimeout(function(){
            nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong"); // Buat ngeplay suara ketika salah tebak
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
       
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        restart();
    }
};

function nextSequence() {

    userClickedPattern=[]; // Buat ngereset pattern dari player nya, jadinya ia harus nginput pattern dari awal ampe akhir berurutan

    level ++; // Buat nambah level
    $("#level-title").text("Level "+level); // Buat nampilin level di title

    var randomNumber = Math.floor(Math.random()*4); // Ga pake +1 karena ntar yg 0 ga dapat
    var randomChosenColor = buttonColors[randomNumber]; // Buat ngambil warna dari array buttonColors
    gamePattern.push(randomChosenColor); // Buat nyusun pattern dari game nya dan player harus mengikuti pattern ini atau ga kalah

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // Pakai JQuery ID selector untuk animasi warna
    playSound(randomChosenColor); // Pakai fungsi playSound untuk memainkan suara dari warna yang dipilih
};

function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
};

function restart(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}