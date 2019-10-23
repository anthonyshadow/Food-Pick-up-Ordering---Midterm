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
    let foodImage = $(this).closest(".card").find('.food-image').text()
    let foodName = $(this).closest(".card").find('.food-name').text()
    let foodDescription = $(this).closest(".card").find('.food-description').text()
    let foodPrice = $(this).closest(".card").find('.food-price').text()
      let cartItem = {
        foodName: foodName,
        foodDescription: foodDescription,
        foodPrice: foodPrice,
        foodImage: foodImage
      }
      let cartItems
      if(localStorage["cart-item"] === undefined) {
        cartItems = []
      } else {
        cartItems = JSON.parse(localStorage["cart-item"])
      }
      cartItems.push(cartItem)
      localStorage.setItem("cart-item", JSON.stringify(cartItems))
      addToCart(cartItem)
  })
});


function createCartElement(cartItem) {
  const $cartItem = `
  <article class="cart-item">
      <tbody>
          <tr>
              <td data-th="Product">
                  <div class="row">
                      <div class="col-sm-2 hidden-xs"><img src="${cartItem.foodImage}" alt="..." class="img-responsive" /></div>
                      <div class="col-sm-10">
                          <h4 class="nomargin">${cartItem.foodName}</h4>
                          <p>${cartItem.foodDescription}</p>
                      </div>
                  </div>
              </td>
              <td data-th="Price">$${cartItem.foodPrice}</td>
              <td data-th="Quantity">
                  <input type="number" class="form-control text-center" value="1">
              </td>
              <td data-th="Subtotal" class="text-center">1.99</td>
              <td class="actions" data-th="">
                  <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                  <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
              </td>
          </tr>
      </tbody>
    </article>
  `;
  return $cartItem
}

function addToCart(cartItems) {
  $("#cart").append(createCartElement(cartItems))
}
