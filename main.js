
'use strict';
var recipyIdArray= [];
var apiKey = "892f8e0cde9c4deaba3bfd23da1bd214";
var sourceLink = [];
var time=[];

$('#search').click(function() {
 // event.preventDefault();
    var recipIng = $('#ingredent').val();
    var recipyUrl ="https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
    $.ajax({
        async: true,
        crossDomain: true,
        //Search Recipes by Ingredients
        url: recipyUrl + recipIng +'&apiKey='+ apiKey ,
        method: "GET",
        headers: {
        },
        success: function(response){
          console.log("-------------------First----------------------------");
           OnSuccess(response);
        },
        error: function(error) {
            console.log('error');
            console.log(error);
        },
        statusCode: {
            200: function (response) {
              console.log('200');
            },
            201: function (response) {
              console.log('201');
            },
            400: function (response) {
              console.log('400');
            },
            404: function (response) {
              console.log('404');
            }
         },
    });

function OnSuccess(response) {
  console.log("-------------------Second----------------------------");
  console.log(response);
  var recipyArray = response;
  for (let i = 0; i < recipyArray.length; i++) {
  console.log("-------------------3----------------------------");
  recipyIdArray[i]=recipyArray[i].id;
  callfunction(recipyIdArray[i]);
  setTimeout(function(){
  console.log("************sourceLink********************"+ sourceLink[i]);
  $('#recipyTable').append(`<tr> <td> ${recipyArray[i].title} </td> `+
  `<td> <img class="imageclass" src=${recipyArray[i].image} ></td> `+ 
  `<td>${time[i]} minutes </td> ` +
  `<td> <a href=${sourceLink[i]} target="_blank">more information</a>
   </td> `+
  `</tr>`
  );
  
}, 2000);
  }
  $('#ingredent').val('');

}
// to find the link and the time of specific recipy.
function callfunction(recipyId)
{  console.log("-------------------4----------------------------");
  console.log("ID in the second function ",recipyId);
  $.ajax({
    async: true,
    crossDomain: true,
    url:`https://api.spoonacular.com/recipes/${recipyId}/information?includeNutrition=false&apiKey=${apiKey}`,
    method: "GET",
     headers: {
     },   
    success: function(response){
      console.log("-------------------5----------------------------");
      console.log(response.title);
      console.log(response);
      console.log(response.readyInMinutes);
      time.push(response.readyInMinutes);
      sourceLink.push(response.sourceUrl);
      console.log("-------------------6----------------------------");
     },
    error: function(error) {
        console.log('error second url');
        console.log(error);
    },
    statusCode: {
        200: function (response) {
          console.log('200');
        },
        201: function (response) {
          console.log('201');
        },
        400: function (response) {
          console.log('400');
        },
        404: function (response) {
          console.log('404');
        }
     },
});

}
});
