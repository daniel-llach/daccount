$(document).ready(function(url_daccount){
  $('#loginform').on('submit', function(event){
    event.preventDefault();
    // get form params
    var username = $('#username').val();
    var password = $('#password').val();
    // get user token
    $.ajax({
         url: "https://faccount.herokuapp.com/token",
         headers: {
             'username': username,
             'password': password
         },
         crossdomain: true,
         type: "GET",
         success: function(data) {
           console.log("data: ", data.token);
           window.location.replace("http://localhost:3000" + "?t=" + data.token);
         },
         error: function(){
           $('#message').text('*Datos incorrectos');
         }
    });
  })
});
