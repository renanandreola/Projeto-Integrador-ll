function addToCart (product) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (!cart) {
    cart = [];
  }

  var find = cart.find(function (item) {
    return item._id === product._id;
  });

  if (find) {
    find.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  toastr["success"](product.name + " adicionado ao carrinho");
  sessionStorage.setItem("cart", JSON.stringify(cart));
  showCartItems();
}

$(document).ready(function () {
  $('#addProduct').click(function () {
    var id = $('#productId').val();
    $.get('/api/product/' + id, function (product) {
      addToCart(product);
    })
  });
});
