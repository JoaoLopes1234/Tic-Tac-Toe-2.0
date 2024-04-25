
$(document).ready(() => {
    let x = 0;
    $("button").on("click", function () {
        
        $(this).css("background", "none")
        //$(this).css("border", "none")
        $(this).css("border-color", "transparent")

        

        console.log($(this).attr("class"));
        console.log();
        x++;
        if (x % 2) {
            $(this).css("background-image", "url('resources/cruz.png'")
            $(this).off('click');
        }
        else {
            $(this).css("background-image", "url('resources/bola.png'")
            $(this).off('click');
        }
        let num = $(this).attr("class").substring(7,8)
        VerifyLines(num);


        /* $(".button-9-1").remove();
        $(".button-9-2").remove();
        $(".button-9-3").remove();
        $(".button-9-4").remove();
        $(".button-9-5").remove();
        $(".button-9-6").remove();
        $(".button-9-7").remove();
        $(".button-9-8").remove();
        $(".button-9-9").remove();
        $("#square9").css("padding", "0px");
        $(".9").remove()
        $("#img1").show(); */

    })

})

function VerifyLines(num) {


    var first = $(".button-" + num + "-1").css("background-image")
    var second = $(".button-" + num + "-2").css("background-image")
    var third = $(".button-" + num + "-3").css("background-image")
    var fourth = $(".button-" + num + "-4").css("background-image")
    var fifth = $(".button-" + num + "-5").css("background-image")
    var sixth = $(".button-" + num + "-6").css("background-image")
    var seventh = $(".button-" + num + "-7").css("background-image")
    var eighth= $(".button-" + num + "-8").css("background-image")
    var ninth = $(".button-" + num + "-9").css("background-image")
    console.log(eighth);
    var firstReal = $(".button-" + num + "-1")
    var secondReal = $(".button-" + num + "-2")
    var thirdReal = $(".button-" + num + "-3")
    var fourthReal = $(".button-" + num + "-4")
    var fifthReal = $(".button-" + num + "-5")
    var sixthReal = $(".button-" + num + "-6")
    var seventhReal = $(".button-" + num + "-7")
    var eighthReal = $(".button-" + num + "-8")
    var ninthReal = $(".button-" + num + "-9")
    if (first === second && second === third) {
        console.log("yes");
        
        fourthReal.prop("disabled", true)
        fifthReal.prop("disabled", true)
        sixthReal.prop("disabled", true)
        seventhReal.prop("disabled", true)
        eighthReal.prop("disabled", true)
        ninthReal.prop("disabled", true)

    }
}
