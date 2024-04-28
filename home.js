$(document).ready(function () {
    console.log(1);
      $(document).keyup(function (event) {
        event.preventDefault()
        if ($(".test").is(":focus") && event.key == "Enter") {
            event.preventDefault()
            send()
        }
    });
    $('.redirectButton').click(function (event) {
        event.preventDefault(); // Evita que o link execute o comportamento padrão
        send()
    });
  
    function send() {
        var player1 = $('#playerForm1').find('input[name="player1"]').val();
        var player2 = $('#playerForm2').find('input[name="player2"]').val();

        var url = 'game.html?player1=' + encodeURIComponent(player1) + '&player2=' + encodeURIComponent(player2);
        window.location.href = url;
    }
});