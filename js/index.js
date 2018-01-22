$(document).ready(function() {
  
  $("#sField").keyup(function(event){
    if(event.keyCode == 13){
        $("#clicMe").click();
    }
});
  
  $("#clicMe").on("click", function() {
    var theCall = {};
    var wikiURL =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    wikiURL += document.getElementById("sField").value;

    $.ajax({
      url: wikiURL,
      dataType: "jsonp",
      headers: { "Api-User-Agent": "fCC_CodePen_Gersho" },
      type: "POST",

      success: function(result) {
       manageResult(result);
      },
      error: function(errMsg) {
        $("#result").html(errMsg);
      }
    });

    function manageResult(json) {
      if(!json.hasOwnProperty("query")){
         $("#result").html("<div class='centerplz'>No result Found</div>");
         return;
         };
     
      var content = "";
      
      for (var data in json.query.pages) {
        //do magic
        content +=
          "<div class='card'><div class='card-block'><h4 class='card-title'>" + json.query.pages[data].title + "</h4><p class='card-text'>" + json.query.pages[data].extract + "</p><a href='"+json.query.pages[data].fullurl+"' class='card-link'>Go to Article</a> <a href='"+json.query.pages[data].fullurl+"' target=# class='card-link'>Open in new Tab</a></div></div>";
      } //fin for in
      $("#result").html(content);
    } // fin function manageResult

    
       
    
  }); // end onclic
});