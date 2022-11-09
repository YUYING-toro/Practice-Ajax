function clearAddress()
{
    $('#txtStreetAddress').val("");
    $('#txtCity').val("");
    $('#txtProvinceState').val("");
    $('#txtPostalZipCode').val("");
}
function clearReview()
{
    $('#txtSummary').val("");
    
    clearAddress();
}
function clearRating(){
    $('#drpRating').empty();
}
function populateAddress(address) {
    $('#txtStreetAddress').val(address.StreetAddress);
    $('#txtCity').val(address.City);
    $('#txtProvinceState').val(address.ProvinceState);
    $('#txtPostalZipCode').val(address.PostalZipCode);
}

function populateReviewData(review) {
    $('#txtSummary').val(review.review);
    clearRating();   
    for(i=1;i<6;i++){
        $('#drpRating').append($('<option>', {value:i, text:i}));
    }
    $('#drpRating').val(review.rating);
   populateAddress(review.address);
}

function getAddressObjectFromPage()
{
    var address = new Object();
    address.StreetAddress = $('#txtStreetAddress').val();
    address.city = $('#txtCity').val();
    address.ProvinceState = $('#txtProvinceState').val();
    address.PostalZipCode = $('#txtPostalZipCode').val();   

    return address;
}

function getRestaurantObjectFromPage()
{    
    var restaurant = new Object();
    restaurant.id = $('#drpRestaurant').val();
    restaurant.name = $('#drpRestaurant  option:selected').text();
    restaurant.rating = parseInt($('#drpRating').val());
    restaurant.summary = $('#txtSummary').val();
    
    restaurant.address = getAddressObjectFromPage();
//    console.log("Common.js內getRestaurantObjectFromPage")
    return restaurant;
}



