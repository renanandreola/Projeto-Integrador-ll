const nodemon = require("nodemon");

function send (event) {

  event.preventDefault();

  // PEGA ELEMENTOS PELO ID DO HTML
  var name = $("#name").val();
  var lastname = $("#lastname").val();
  var email = $("#email").val();
  var msg = $("#msg").val();
  var errors = [];
  var result = $("#result");


  // VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
  var verifyInt = /\d+/g;
  var regexName = /[@!#$%^&*()-='+_"?°~`<>.{}\\]/;
  var regexSurname = /[@!#$%^&*()-='+_"?°~`<>.{}\\]/;
  var regexEmail = /[!#$%^&*()='+"?°~`< >{}\\]/;
  
  if (name == "" || name.match(verifyInt) != null || regexName.test(name) == true ) {
    toastr["error"]("Campo nome é obrigatório ou está inválido");
    return
  }

  if (lastname == "" || lastname.match(verifyInt) != null || regexSurname.test(lastname) == true ) {
    toastr["error"]("Campo sobrenome é obrigatório ou está inválido");
    return
  }
 
  if (email == "" || regexEmail.test(email) == true ) {
    toastr["error"]("Campo email é obrigatório ou está inválido");
    return
  }

  if (msg == "") {
    toastr["error"]("Digite sua mensagem");
    return
  }

  else {
    clear();
    var data = {
      email: email,
      message: msg,
      name: name,
      lastname: lastname
    }
    $.post('/send', data, function (res) {
      if(res === 'ok') {
        toastr["success"]("Mensagem enviada com sucesso!");
        setTimeout(function(){
          location.reload();
        },1500);
      } else {
        toastr["error"]("Erro: " + res);
     }
})
  }
}

// LIMPA OS CAMPOS 
function clear (){
  $("#name").val("");
  $("#lastname").val("");
  $("#email").val("");
  $("#msg").val("");
}
