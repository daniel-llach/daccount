$(document).ready(function(){
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
           window.location.replace("http://agendadorapp.herokuapp.com" + "?t=" + data.token);
         },
         error: function(){
           $('#message').text('*Datos incorrectos');
         }
    });
  })
});
