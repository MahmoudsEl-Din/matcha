$(document).ready(function(){
    $("#form_connect").submit(function(e) {
        e.preventDefault()

        $.post('/login', $(e.target).serialize(), function(data, jqHXR) {        
            if (jqHXR === "success") {
                console.log(data)
                if (data === undefined){
                    $("#div_ret").removeClass("d-none")
                    document.getElementById("div_ret").innerHTML = "Error: data is undefined"
                }
                else {
                    $("#div_ret").removeClass("d-none")
                    $("#div_ret").switchClass("alert-danger", "alert-success")
                    document.getElementById("div_ret").innerHTML = data
                }
            }
        })
    })
})