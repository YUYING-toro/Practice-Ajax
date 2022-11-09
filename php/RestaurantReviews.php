<?php
   // echo '<script>alert("Welcome to Geeks for Geeks")</script>';
    class Restaurant
    {
        public $id;
        public $name;
        public $review;
        public $rating;
        public $address;
    }
    class Address
    {
        public $StreetAddress;
        public $City;
        public $ProvinceState;
        public $PostalZipCode;
    }
    

    $reviews = simplexml_load_file("C:\Program Files\Ampps\www\CST8259Lab5\Data/restaurant_reviews.xml"); 
    $names = Array();
    $jsonStr = json_encode(null);
    //get request and reply restaurnat names
    if (isset($_GET["action"]) && $_GET["action"] == "searchNames") //get restaurant names 來自url: getDetailsUrl+searchString,
    {
        foreach($reviews->restaurant as $restaurant)
        {
                $names[] = (string)$restaurant->name;
        }
        $jsonStr = json_encode($names);//provide json
    }
    // after select name, response detail
    else if (isset($_GET["action"]) && $_GET["action"] == "getDetails" && isset($_GET["name"]) && $_GET["name"] !== "" )
    {
        $searchName = $_GET["name"];
        $i = 0; //id
        //xml database 同搜尋名 就取出該筆餐廳
         foreach($reviews->restaurant as $restaurant)
        {
            if((string)$restaurant->name == $searchName )
            {   
                //建立物件結構，取得資料 > 再轉為json
                $theRestaurant = new Restaurant();
                $theRestaurant->id = $i;
                $theRestaurant->name = (string)$restaurant->name;//xml struncture name
                $theRestaurant->review = (string)$restaurant->review;
                $theRestaurant->rating = (string)$restaurant->rating;                            
                $theRestaurant->address = new Address();                
                $theRestaurant->address->StreetAddress = (string)$restaurant->address->Street; 
                $theRestaurant->address->ProvinceState = (string)$restaurant->address->ProvinceState; 
                $theRestaurant->address->City = (string)$restaurant->address->City; 
                $theRestaurant->address->PostalZipCode = (string)$restaurant->address->PostalZipCode;
                $jsonStr = json_encode($theRestaurant);
            }
            $i++;
        }
    }  
    // save 
    else if (isset($_GET["action"]) && $_GET["action"] == "save" && isset($_POST["restaurant"]) && $_POST["restaurant"] !== "")
    {       
        $updatedRestaurant = json_decode($_POST["restaurant"]);
        //foreach () //($updatedRestaurant->id !== "-1")
        foreach($reviews->restaurant as $restaurant)
        {
            if((string)$restaurant->name == $updatedRestaurant->name ){
            $restaurant = $reviews->restaurant[intval($updatedRestaurant->id)];
           //現有 等於 新的
            $restaurant->name = $updatedRestaurant->name;
            $restaurant->review = $updatedRestaurant->summary;
            $restaurant->rating = $updatedRestaurant->rating;
            $restaurant->address->Street = $updatedRestaurant->address->StreetAddress; 
            $restaurant->address->City = $updatedRestaurant->address->city; 
            $restaurant->address->ProvinceState = $updatedRestaurant->address->ProvinceState; 
            $restaurant->address->PostalZipCode = $updatedRestaurant->address->PostalZipCode;
            $reviews->asXML("../Data/restaurant_reviews.xml");//
            }           
        }   
    }    
    echo $jsonStr;    
    ?>