// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((data) => {
//     for(user of data.users) {
//       $("<div>").text(user.name).appendTo($(".food-type"));
//     }
//   });;
// });

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/foods"
//   }).done((data) => {
//     for(food of data.foods) {
//       $("<div>").text(food.name).appendTo($(".menu-info"));
//       $("<div>").text(food.price).appendTo($(".menu-info"));
//     }
//   });
// });



$( document ).ready(function() {
  let $button = $('.add-to-cart');
  $button.on("click", function(){
    let foodName = $(this).closest(".card").find('.food-name').text()
    let foodDescription = $(this).closest(".card").find('.food-description').text()
    let foodPrice = $(this).closest(".card").find('.food-price').text()
      let cartItem = {
        foodName: foodName,
        foodDescription: foodDescription,
        foodPrice: foodPrice
      }
      let cartItems
      if(localStorage["cart-item"] === undefined) {
        cartItems = []
      } else {
        cartItems = JSON.parse(localStorage["cart-item"])
      }
      cartItems.push(cartItem)
      localStorage.setItem("cart-item", JSON.stringify(cartItems))
  })
});




//i was trying to make it work with ajax 

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "app.js",
//     data: "cart-item"
//   }).done((data) => {
//       $("<div>").text(data).appendTo($(".menu-info"));
//   });
// });
