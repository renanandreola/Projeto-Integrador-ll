var cart = sessionStorage.getItem("cart");
cart = JSON.parse(cart);

function saveCart () {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

//

function addQuantity (cartItemId) {
  var item = cart.find(function (cartItem) {
      return cartItem._id == cartItemId;
  });
  item.quantity++;
  saveCart();
  showCart();
}

//

function subQuantity (cartItemId) {
  var item = cart.find(function (cartItem) {
      return cartItem._id == cartItemId;
  });
  if (item.quantity > 1) {
    item.quantity--;
  }
  saveCart();
  showCart();
}

//

function deleteItem (cartItemId) {
  cart = cart.filter(function (cartItem) {
    return cartItem._id != cartItemId;
  });
  toastr["error"]("Carrinho", "Item removido");
  saveCart();
  showCart();
}

//

function toBrDigits (number) {
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
}

//

function showCart () {

  if (cart !== null) {

    var listCart = $('<ul class="list-unstyled"></ul>');
    var total = 0;
    for(var i in cart) {
      var li = $('<li class="mb-5"></li>');
      var add = $('<a class="btn btn-sm btn-outline-success" href>+</a>');
      var sub = $('<a class="btn btn-sm ml-1 btn-outline-danger" href>-</a>');
      var del = $('<a class="btn btn-sm ml-3 btn-danger" href>Excluir produto</a>');

      add.attr('cart-item', cart[i]._id);
      add.click(function (e) {
        e.preventDefault();
        addQuantity($(this).attr('cart-item'));
      });

      sub.attr('cart-item', cart[i]._id);
      sub.click(function (e) {
        e.preventDefault();
        subQuantity($(this).attr('cart-item'));
      })

      del.attr('cart-item', cart[i]._id);
      del.click(function (e) {
        e.preventDefault();
        deleteItem($(this).attr('cart-item'));
      })

      li.html(
        '<h6>' + cart[i].name + '</h6>' +
        '<p>'+ toBrDigits(cart[i].price * cart[i].quantity) + '</p>' +
        '<p class="">QUANTIDADE: ' + cart[i].quantity + '</p>'
      ).append(add).append(sub).append(del).append('<hr/>')

      listCart.append(li);
      total += cart[i].price * cart[i].quantity;
    }
    $('#cart').html(listCart);
    $('#cart').append('<p>Total <strong>' + toBrDigits(total) + '</strong></p>')
    showCartItems();
  }
}

//

$(document).ready(function () {
  showCart();

  $('form').submit(function (event) {
    event.preventDefault();
    var email = $("#email").val()
    var password =  $("#password").val()

    if(email === "") {
      toastr["error"]("Campo email vazio")
      return
    }

    if(password === "") {
      toastr["error"]("Campo senha vazio")
      return
    }

    // else {
    //   toastr["success"]("Carregando...")
    // }
    
    $.post("/login", {email: email, password: password}, function (res) {
      if (res === 'ok') {
        console.info('Logado');
        toastr["success"]("Login efetuado...");
        window.location.href = "/nextcart?email=" + email;
      } else {
        toastr["error"]("Senha inválida");
      }
    })
  })
})

// function entrar() {
//   var email = $("#email").val()
//   var password =  $("#password").val()
//
//   if(email === "") {
//     toastr["error"]("Campo email vazio")
//     return
//   }
//
//   if(password === "") {
//     toastr["error"]("Campo senha vazio")
//     return
//   }
//
//   else {
//     toastr["success"]("Carregando...")
//   }
//
// // RECARREGA A PÁGINA //
//
//   window.location.href = "/nextcart?email=" + email;
//
// }
