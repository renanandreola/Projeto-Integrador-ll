function send (event) {

  event.preventDefault();



var name = $("#name").val();
var category = $("#category").val();

// VÁLIDAÇÃO DOS CAMPOS DO FORMULÁRIO
if (name == "") {
    toastr["error"]("Campo nome obrigatório");
    return
}

if (category == "") {
    toastr["error"]("Campo categoria obrigatório");
    return
} else {
  var data = {
    name: name,
    slug: category
    }

  //ENVIA OS DADOS PARA O MONGODB
  $.post('/categories', data, function (res) {
         if(res === 'ok') {
           toastr["success"]("Categoria cadastrada com sucesso!");
           setTimeout(function(){
             location.reload();
           },1500);
         } else {
           toastr["error"]("Erro: " + res);
         }
    })
  }
}

// EXCLUIR ITENS DA TABELA
$('.btn-remove').click(function () {
  $.ajax({
    url: '/category/' + $(this).attr('id'),
    type: 'delete',
    success: function (r) {
      if (r == 'ok') {
        toastr["error"]("Categoria excluida!");
        setTimeout(function(){
          location.reload();
        },1500);
      } else {
        toastr["error"]("Produtos ", "Erro na exclusao");
      }
    }
  });
});
