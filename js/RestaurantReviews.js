$(document).ready(function () {
    
    $.getScript("js/Config.js");
    $.getScript("js/common.js");
//    var searchNamesUrl = "php/RestaurantReviews.php?action=searchNames";
    var currentRestaurant = null;
    var currentSearchString = "";    
    
//display name ondropdown list after get res
    $.ajax({
                type: "GET",
                url: searchNamesUrl,
                dataType: "json",
                success: function(searchResults) {
                            //$('#searchResults').empty();
                            if (searchResults !== null && searchResults.length > 0) {
                                $.each(searchResults, function (index, value) {
                                    //$('#drpRestaurant').append("<option>" + value + "</option>");
                                    $('#drpRestaurant').append($('<option>', {value:index, text:value}));
                                });
                            }				
                        },                        
                error: function (e) {
                                window.alert('AjaxError' );
                            }
          });
//select res
     $('#drpRestaurant').change(function (event) {
         document.getElementById('alertSuccess').innerText = "";
          $( "#alertSuccess" ).removeClass( "form-control alert-success" );
       //var searchString = $('#drpRestaurant').val(); //value=index,
       var searchString = $("#drpRestaurant :selected").text(); 
       if (searchString == -1) {return;};
        $.ajax({
                type: "GET",
                url: getDetailsUrl+searchString,
                dataType: "json",
                success: function(restaurant) 
                        {
                           if (restaurant !== null)
                           {
                               populateReviewData(restaurant);                                                            
                           }
                        },
                error: function (event, request, settings) 
                        {
                                window.alert('AjaxError' + ' : ' + settings);
                        }
          });
      });    
//save data
    $('#btnSave').on( "click", function(event) {
        var restaurant = getRestaurantObjectFromPage();
        console.log({js57GetForm:restaurant})
        //確認有餐廳資料
        if(restaurant.id=="-1"){
            $('#lblConfirmation').addClass(".text-danger");
            $('#lblConfirmation').text("Please choose a restaurant first!");
            return;}
        //發要求
        $.ajax({
                type: "POST",
                url: saveUrl, //"php/RestaurantReviews.php?action=save";
                data:{restaurant: JSON.stringify(restaurant)},
                dataType: "json",
                success: function(id) 
                        {  
                            //取得回應前，篩選出新資料 回傳給前面，前面渲染
                            console.log({js71GetRes:id})
                               $('#alertSuccess').text("The restaurant data has been succefully updated");
                               $( "#alertSuccess" ).addClass( "form-control alert-success" );
            },
            error: function (event, request, settings) 
                    {
                            window.alert('AjaxError' + ' : ' + settings);
                    }
         });//ajax
   });     //btnSave 
}//jq function
);
