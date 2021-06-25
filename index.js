//Simple Web Scrapper from IMDB Website
var request  = require('request');
var cheerio = require('cheerio');

const json2csv = require('json2csv').Parser;
const fs = require('fs');




var url = "https://www.imdb.com/search/title/?groups=top_1000&ref_=adv_prv";

var items=[]
request(url, function(err,response,html){

if(!err){
    var $ = cheerio.load(html);
    var allItems = $(".lister-list").children();
    
    allItems.each(function(index){
     
      //items.push($(".lister-list").children().eq(index).children().eq(2).find("h3").text().replace(/(\r\n|\n|\r| )/gm, ""));

      var moviename = $(".lister-list").children().eq(index).children().eq(2).find("h3").text().replace(/(\r\n|\n|\r| )/gm, "");
      var year = $(".lister-list").children().eq(index).children().eq(2).find("span.lister-item-year").text().replace(/(\r\n|\n|\r| )/gm, "");
      var duration = $(".lister-list").children().eq(index).children().eq(2).find("span.runtime").text().replace(/(\r\n|\n|\r| )/gm, "");
      var genre = $(".lister-list").children().eq(index).children().eq(2).find("span.genre").text().replace(/(\r\n|\n|\r| )/gm, "");
      var ratings = $(".lister-list").children().eq(index).children().eq(2).find("strong").text().replace(/(\r\n|\n|\r|)/gm, "");



items.push({
    moviename,year,duration,genre,ratings
})


    });
    console.log("Succesfully Scrapped the data");
    console.log(items)
    const j2cp = new json2csv()
const csv = j2cp.parse(items)


fs.writeFileSync("./imdb.csv",csv);

console.log("Succesfully saved the data in csv file");
   
    
}

});

