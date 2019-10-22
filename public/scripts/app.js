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
