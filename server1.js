//var express = require('express');
var app = require('express')();
var url = require('url');
var path=require('path');
var stringSimilarity = require('string-similarity');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var formidable = require('formidable');
var fs = require('fs');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//app.engine( 'ejs', engine );
//({bin:"F:\\xampp\\php\\php.exe"});
//app.engine('php', phpnode);

app.set('views','./views');
 var ans;
 io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var lang=msg.language
    
    var song=msg.name.replace(/[+]/g, "_");
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("soura");
  //var myobj = { name: "Company Inc", address: "Highway 37" };
  var matches
  if(lang=='bengali')
{ 
	var bensongnames=fs.readFileSync('bengalinames.txt','utf8');
    var bensongs=bensongnames.split("\n");
    matches = stringSimilarity.findBestMatch(song,bensongs);
    song=matches.bestMatch.target
	dbo.collection("bensongs").findOne({name: song }, function(err, result) {
    if (err)throw err;
    if(!result)
      io.emit('chat message',{status:"not found"});
    else
     io.emit('chat message', {name: ""+song,content:result.dist.toString(),songs:bensongs.toString(),status:"found"});
    db.close();
  });
}
if(lang=='hindi')
{ 
	var hinsongnames=fs.readFileSync('hindinames.txt','utf8');
    var hinsongs=hinsongnames.split("\n");
    matches = stringSimilarity.findBestMatch(song,hinsongs);
    song=matches.bestMatch.target
	dbo.collection("hinsongs").findOne({name: song }, function(err, result) {
    if (err) throw err;
    if(!result)
      io.emit('chat message',{status:"not found"});
    else
    io.emit('chat message', {name: ""+song,content:result.dist,songs:hinsongs.toString(),status:"found"});
    db.close();
  });
}

});


//     var lang=msg.language
//     var song=msg.name
//     var songnames=fs.readFileSync('webdemonames.txt','utf8');
//     var songs=songnames.split("\n");
//      var hindisongs=[]
//     var bengalisongs=[]
//     var bc=0
//     var hc=0
//     for(var i=0;i<songs.length;i++)
//     {
//       if(songs[i].indexOf("Songs_bengali_")!=-1)
//       {
//           bengalisongs[bc]=songs[i].replace("Songs_bengali_",'')
//           bc++
//       }
//       if(songs[i].indexOf("Songs_hindi_")!=-1)
//       {
//           hindisongs[hc]=songs[i].replace("Songs_hindi_",'')
//           hc++
//       }
//     }
//    //console.log(bengalisongs.length+"\n"+hindisongs.length+"\n"+lang);
//    var matches
//    if(lang=='bengali')
//       matches = stringSimilarity.findBestMatch(song,bengalisongs);
//     if(lang=='hindi')
//       matches = stringSimilarity.findBestMatch(song,hindisongs);
// console.log(matches.bestMatch.target)
//     var name=matches.bestMatch.target
//     //var contents = fs.readFileSync('distmatrix.txt', 'utf8');
//     var readline = require('readline');
// var stream = require('stream');
// if(msg.read)
// {
// var instream = fs.createReadStream('distancematrix.txt');
// var outstream = new stream;
// var rl = readline.createInterface(instream, outstream);
// var c=0
// var bengdist=[]
// var hinddist=[]
// rl.on('line', function(line) {
//    if(c<=2383)
//    {
//       bengdist[c]=line.split(" ").slice(0,2384).toString()
//       c++
//    }
//    else
//     {
//       hinddist[c-2384]=line.split(" ").slice(2384,6913).toString()
//       c++
//     }
//   // process line here
// });


// rl.on('close', function() {
//   // do something on finish here
//   console.log(hinddist.length)
//   var index=0
// if(lang=='hindi')
// {
//    for(var i=0;i<hindisongs.length;i++)
//    {
//     if(name==hindisongs[i])
//     {
//       index=i;break;
//     }
//    }
// }
// if(lang=='bengali')
// {
//    for(var i=0;i<bengalisongs.length;i++)
//    {
//     if(name==bengalisongs[i])
//     {
//       index=i;break;
//     }
//    }
// }
// // console.log(index)
// // console.log(hinddist[index])
// //   console.log(bengdist[0].length+" "+hinddist[0].length)
//   //console.log(hinddist[index])
//   connection.query("SELECT link FROM "+lang+" WHERE name=\""+name+"\";", function(err, rows, fields) {
// //console.log(contents);
//    if (!err)
//      {
//       //res.send(rows);
//       //console.log(rows.length)
//       if(rows.length>0)
//       {
//         console.log('The solution is: ', rows[0].link);
//       if(lang=='hindi')
//         {
//           var distancereq=hinddist[index].split(",");
//           console.log(distancereq.length)
//           distancereq=distancereq.slice(0,100)
//           //console.log(distancereq.length)
//           // var senddist=hinddist[index].substring(0,100)
//           // console.log(senddist.length)
//           // var buf = Buffer.from(senddist, 'utf8');
//           //  console.log(buf.byteLength)
//           io.emit('chat message', {name: ""+name,content:distancereq.toString(), songs:hindisongs.toString(),pos:""+index,status: "found"});
//         }
//       else
//         {
//           var distancereq=bengdist[index].split(",");
//           console.log(distancereq.length)
//           distancereq=distancereq.slice(0,100)
//           // var buf = Buffer.from(bengdist[index], 'utf8');
//           // console.log(buf.byteLength)
//           io.emit('chat message', {name: ""+name, content:distancereq.toString(), songs:bengalisongs.toString(),pos:""+index,status: "found"});
//       }//console.log('message sent: '+contents);
//       ans=rows[0].path;
//     }
//       else
//       {
//         io.emit('chat message',{status:"not found"})
//       }
//     }
//    else
//      console.log('Error while performing Query.');
//    });
// });


//      } 
    
    

    
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
//app.use("/public", express.static(__dirname + "/public"));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "start.html" );
}) 
app.get('/search', function (req, res) {
   res.sendFile( __dirname + "/" + "search.html" );
}) 
app.get('/show', function (req, res) {

   res.sendFile( __dirname + "/" + "d3circle.html" );
   //res.send('<p>Song Name: ' + req.query['song_name']+'</p>');
})
var server = http.listen(8086, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})

