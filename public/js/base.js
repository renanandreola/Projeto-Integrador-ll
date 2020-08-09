toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

//

function showCartItems () {
  var cart = sessionStorage.getItem("cart");
  var quantity = 0;
  if (cart !== null) {
    cart = JSON.parse(cart);
    quantity = cart.length;
  }
  $('#cart-items').html(quantity);
}
$(document).ready(function () {
  showCartItems();
});
