window.onload = initPage;

function initPage(){
    $(".modal-login").css("display", "flex")
}

function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    if (username != "admin") {
        $(".modal-login").css("display", "flex")
        window.location.href = "https://ltmaq.herokuapp.com/";
    }
    if (password != "admin") {
        $(".modal-login").css("display", "flex")
        window.location.href = "https://ltmaq.herokuapp.com/";
    }
    else {
        $(".modal-login").css("display", "none");
    }
}