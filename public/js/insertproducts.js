function send (event) {

  event.preventDefault();

  var name = $("#name").val();
  var price = $("#price").val();
  var description = $("#description").val();
  var url = $("#url").val();
  var category = $("#category").val();

  //VALIDAÇÃO SIMPLES DOS CAMPOS
  if (name == "") {
      toastr["error"]("Insira o nome do pruduto");
      return;
  }

  if (price == "") {
      toastr["error"]("Insira o preço");
      return;
  }

  if (description == "") {
      toastr["error"]("Insira a descrição");
      return;
  }

  if (url == "") {
      toastr["error"]("Insira a url");
      return;
  }
  if (category == "") {
      toastr["error"]("Selecione uma categoria");
      return;
  }

  else {
    var data = {
      name: name,
      price: price,
      description: description,
      url: url,
      category: category

    }


    //ENVIA OS DADOS PARA O MONGODB
    $.post('/insertproducts', data, function (res) {
           if(res === 'ok') {
             toastr["success"]("Produto cadastrado com sucesso!");
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
    url: '/admin/product/' + $(this).attr('id'),
    type: 'delete',
    success: function (r) {
      if (r == 'ok') {
        toastr["error"]("Produto excluido!");
        setTimeout(function(){
          location.reload();
        },1500);
      } else {
        toastr["error"]("Produtos ", "Erro na exclusao");
      }
    }
  });
});
