$(document).ready(function(){
    console.log("test")
    $("#connect_submit").click(function(e) {
            console.log("test2")
        e.preventDefault()

        $.post('/login', $('form#form_connect').serialize(), function(data, jqHXR) {        
            if (jqHXR === "success") {
                if (data === false){
                    $("#div_ret").removeClass("alert-success")
                    $("#div_ret").addClass("alert-danger")
                    $("#div_ret").removeClass("d-none")
                    document.getElementById("div_ret").innerHTML = "Please fill the connection form"
                }
                else {
                    $("#div_ret").removeClass("alert-danger")
                    $("#div_ret").addClass("alert-success")
                    $("#div_ret").removeClass("d-none")
                    document.getElementById("div_ret").innerHTML = "Approved"
                }
            }
        })
    })
})