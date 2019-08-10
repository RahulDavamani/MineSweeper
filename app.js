var express = require("express");
var app     = express();
var PORT    = 3000;

app.use(express.static(__dirname));

app.get("/", function(req, res){
   res.sendFile('/Minesweeper.html', {root:__dirname});
});

app.listen(PORT, function(){
   console.log("The Server Started");
});