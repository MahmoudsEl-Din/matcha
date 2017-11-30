$(document).ready(function(){
    $("#button_reset").click(function(e) {
        e.preventDefault()
        
        $.post('/reset_password', $('form#form_forgot').serialize(), function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false){
                    $("return-reset").empty()
                    $("#return-reset").addClass('text-danger').removeClass('text-success')
                    document.getElementById("return-reset").innerHTML = data[1]
                    document.getElementById("form_password").value = ''
                }
                else {
                    $("#return-reset").empty()
                    document.getElementById("return-reset").innerHTML = data[1]
                    $("#return-reset").addClass('text-success').removeClass('text-danger')
                    document.getElementById("form_email").value = ''
                }
            }
        })

    })
})