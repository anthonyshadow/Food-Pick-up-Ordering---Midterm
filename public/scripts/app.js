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
    let foodId = $(this).closest(".card").data("food-id")
    let foodImage = $(this).closest(".card").find('.food-image').text()
    let foodName = $(this).closest(".card").find('.food-name').text()
    let foodDescription = $(this).closest(".card").find('.food-description').text()
    let foodPrice = $(this).closest(".card").find('.food-price').text()
      let cartItem = {
        foodId,
        foodName,
        foodDescription,
        foodPrice,
        foodImage
      }
      let cartItems
      if(localStorage["cart-item"] === undefined) {
        cartItems = []
      } else {
        cartItems = JSON.parse(localStorage["cart-item"])
      }
      cartItems.push(cartItem)
      localStorage.setItem("cart-item", JSON.stringify(cartItems))
      displayCart()
      $(".cart-total-price").append(createCartTotal())
  })
  displayCart()
  $(".cart-total-price").append(createCartTotal())
});



function createCartElement(cartItem) {
  const $cartItem = `
      <tbody>
          <tr>
              <td data-th="Product">
                  <div class="row">
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
              <td class="actions" data-th="">
                  <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                  <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
              </td>
          </tr>
      </tbody>
  `;
  return $cartItem
}

function displayCart(cartItems) {
  $("tbody").remove()
  cartItems = JSON.parse(localStorage["cart-item"])
  for ( item of cartItems) {
    $("#cart").append(createCartElement(item))
  }
}




$( document ).ready(function() {
  let $button = $('.checkout');
  $button.on("click", function(){
    let foodId = $(this).closest(".card").data("food-id")
    let foodImage = $(this).closest(".card").find('.food-image').text()
    let foodName = $(this).closest(".card").find('.food-name').text()
    let foodDescription = $(this).closest(".card").find('.food-description').text()
    let foodPrice = $(this).closest(".card").find('.food-price').text()
      let cartItem = {
        foodId,
        foodName,
        foodDescription,
        foodPrice,
        foodImage
      }
      let cartItems
      if(localStorage["cart-item"] === undefined) {
        cartItems = []
      } else {
        cartItems = JSON.parse(localStorage["cart-item"])
      }
      if (cartItem.foodId) {
      cartItems.push(cartItem) }
      localStorage.setItem("cart-item", JSON.stringify(cartItems))
      displayCart()
  })
  displayOrder()


});

function displayOrder(cartItems) {
  $(".cart-item").remove()
  cartItems = JSON.parse(localStorage["cart-item"])

  for ( item of cartItems) {
    $(".food-ordered").append(createOrderElement(item))
  }
  $(".food-ordered").append(createTotalElement())
}

function createOrderElement(cartItem) {
  const $cartItem = `
  <article class="cart-item">
  <tbody>
  <tr>
  <td data-th="Product">
  <div class="row">
  <div class="col-sm-10">
  <h4 class="nomargin">${cartItem.foodName}</h4>
  <p>${cartItem.foodDescription}</p>
  </div>
  </div>
  </td>
  <td data-th="Price">$${cartItem.foodPrice}</td>
  </tr>
  </tbody>
  </article>
  `;
  return $cartItem;
}

function createTotalElement() {
  const $totalPrice = `
  <div>
    <h3> total price $ ${totalPrice()} </h3>
  </div>`

  return $totalPrice;
}

function createCartTotal() {
  const $totalCartPrice =
  `
  <td class="text-center"><strong>TOTAL $${totalPrice()}</strong></td>
  `;
  return $totalCartPrice;
}

  function totalPrice() {
    cartItems = JSON.parse(localStorage["cart-item"])
    if(cartItems.length > 0){
      let sum = 0;
      for (let i=0; i < cartItems.length; i++){
        let foodPrice = Number(cartItems[i].foodPrice)
        sum += foodPrice
        }
        return sum
    }
  }


