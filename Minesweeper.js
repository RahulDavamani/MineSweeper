var data = $("td");
var value = [];
var gameover = true;
var rtClick = false;
var data;

// converting 1D data to 2D value
for (var i = 0; i < 10; i++) {
   value.push(data.splice(0, 10))
}


createArray();
open();
mark();

$("button").on("click",function() {
   showBomb();
   createArray();
   stopTimer();
   gameover = true;
   $("td").removeClass("open")
   $("td").removeClass("rtClick")
   $("td").removeClass("mine")
   $("body").css("background", "blue")
   $("button").css("color", "steelblue")
   $("button").text("NEW GAME")
   $("#result").text("_")
   $("#result").css("color", "#272727")
   $("#time").text("00:00")
   time = 0
})

// function to create array with minees and values
function createArray(){

   // randomizing the mines

   for (var i = 0; i < 10; i++) {
      var x = Math.floor(Math.random()*9);
      var y = Math.floor(Math.random()*9);
      if (value[x][y].textContent === "0") {
         i--;
      }else{
         value[x][y].textContent = "0";
      }

   }

   // giving values to non-mine boxes
   for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
         // count of mine aound it
         var c = 0;
         // selecting non- mine boxes
         if(value[i][j].textContent !== "0"){
            // check for cornor boxes
            if(i!==0 && j!==0)
               if(value[i-1][j-1].textContent==="0")
                   c++;
            if(i!==0)
               if(value[i-1][j].textContent==="0")
                   c++;
            if(i!==0 && j!==9)
               if(value[i-1][j+1].textContent==="0")
                   c++;
            if(j!==0)
               if(value[i][j-1].textContent==="0")
                   c++;
            if(j!==9)
               if(value[i][j+1].textContent==="0")
                   c++;
            if(i!==9 && j!==0)
               if(value[i+1][j-1].textContent==="0")
                   c++;
            if(i!==9)
               if(value[i+1][j].textContent==="0")
                   c++;
            if(i!==9 && j!==9)
               if(value[i+1][j+1].textContent==="0")
                   c++;
            if(c===0){
               value[i][j].textContent = ""
            }else{
               value[i][j].textContent = c;
            }
         }
      }
   }
}

// to play the game
function open(){
   $("td").on("click",function (ev){
      if (!timer) {
         startTimer();
      }
      if (gameover && !$(this).hasClass("rtClick")) {
         $(this).addClass("open");
         var rowIndex = ev.target.parentElement.rowIndex;
         var cellIndex = ev.target.cellIndex;
         noOfOpen();
         if($(this).text()==="0"){
            stopTimer();
            gameover = false;
            $(this).html("<i class=\"fa fa-bomb\"></i>")
            $("body").css("background","red")
            $("button").text("PLAY AGAIN?")
            $("#result").text("MINE FOUND")
            $("#result").css("color", "red")
            showBomb();
         }else if ($(this).text()==="") {
            openBlank(rowIndex,cellIndex);
         }
      }
   })
}

// to open blank spaces
function openBlank(r,c){

      // check for cornor boxes
      if(r!==0 && c!==0){
         value[r-1][c-1].classList.add("open")

      }

      if(r!==0){
         value[r-1][c].classList.add("open")

      }

      if(r!==0 && c!==9){
         value[r-1][c+1].classList.add("open")

      }

      if(c!==0){
         value[r][c-1].classList.add("open")

      }

      if(c!==9  && value[r][c+1].className !== "open"){
         value[r][c+1].classList.add("open")

      }

      if(r!==9 && c!==0){
         value[r+1][c-1].classList.add("open")

      }

      if(r!==9){
         value[r+1][c].classList.add("open")

      }

      if(r!==9 && c!==9){
         value[r+1][c+1].classList.add("open")

      }

      value[r][c].textContent = " "

      // repeat
      if(r!==0 && c!==0){

         if(value[r-1][c-1].textContent === ""){
            openBlank(r-1,c-1);
         }

      }

      if(r!==0){

         if(value[r-1][c].textContent === "") {
            openBlank(r-1,c);
         }

      }

      if(r!==0 && c!==9){

         if(value[r-1][c+1].textContent === ""){
            openBlank(r-1,c+1);
         }

      }

      if(c!==0){

         if(value[r][c-1].textContent === ""){
            openBlank(r,c-1);
         }

      }

      if(c!==9  && value[r][c+1].className !== "open"){

         if(value[r][c+1].textContent === ""){
            openBlank(r,c+1);
         }

      }

      if(r!==9 && c!==0){

         if(value[r+1][c-1].textContent === ""){
            openBlank(r+1,c-1);
         }

      }

      if(r!==9){

         if(value[r+1][c].textContent === ""){
            openBlank(r+1,c);
         }

      }

      if(r!==9 && c!==9){

         if(value[r+1][c+1].textContent === ""){
            openBlank(r+1,c+1);
         }
      }
}

function mark(){
   $( "td" ).contextmenu(function(ev) {
     if (!$(this).hasClass("open")) {
       if ($(this).hasClass('rtClick')) {
         $(this).removeClass("rtClick")
         $(this).html(data)
       }
       else{
         data = $(this).html()
         $(this).html("<i class=\"fa fa-flag\"></i>")
         $(this).addClass("rtClick")
       }
     }
   });
}

function showBomb(){
   stopTimer();
   for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
         if (value[i][j].textContent === "0") {
            value[i][j].innerHTML = "<i class=\"fa fa-bomb\"></i>"
            value[i][j].classList.add("mine")
         }
      }
   }
}

function noOfOpen(){
   if (document.querySelectorAll(".open").length === 90) {
      gameover = false
      $("body").css("background","green")
      $("button").text("PLAY AGAIN?")
      $("#result").text("YOU WON")
      $("#result").css("color", "green")
      stopTimer();
      showBomb();
   }
}

document.addEventListener('contextmenu', event => event.preventDefault());


var time = 0;
var interval;
var start;
var end;
var timer = false;
var minutes;
var seconds;

function startTimer(){
   timer = true;
   start = Date.now();
   interval = setInterval(update,1000)
}

function stopTimer(){
   clearInterval(interval);
   interval = null;
   timer = false;
}

function update(){
   end = Date.now();
   time = Math.round(time + (end - start)/1000);
   start = end;
   minutes = (Math.floor(time/60)).toString();
   seconds = (time%60).toString();
   if (seconds.length < 2) {
      seconds = '0' + seconds;
   }
   if (minutes.length < 2) {
      minutes = '0' + minutes;
   }
   $("#time").text(minutes + ":" + seconds);
}
