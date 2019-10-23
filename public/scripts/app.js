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

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((data) => {
    for(food of data.foods) {
      $("<div>").text(food.name).appendTo($(".menu-info"));
      $("<div>").text(food.price).appendTo($(".menu-info"));
    }
  });
});


$( document ).ready(function() {
  let $button = $('.add-to-cart');
  $button.on("click", function(){
    let test = $(this)
    // alert("hello")
    let $cartItem = $(this).parent().text()
    // $('.card-body').text();
    // console.log('cart item',$cartItem)
    localStorage.setItem("cart-item", $cartItem)
  })
});

console.log(localStorage.getItem("cart-item"))

//i was trying to make it work with ajax 

// $(() => {
//   $.ajax({
//     method: "POST",
//     url: "app.js",
//     data: "cart-item"
//   }).done((data) => {
//       $("<div>").text(data).appendTo($(".menu-info"));
//   });
// });
