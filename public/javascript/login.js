$(document).ready(function(){
    $("#connect_submit").click(function(e) {
        e.preventDefault()

        $.post('/login', $('form#form_connect').serialize(), function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false){
                    $("return-connect").empty()
                    document.getElementById("return-connect").innerHTML = data[1]
                    document.getElementById("form_password").value = ''
                }
                else {
                    $("#return-connect").empty()
                    emit_user_login(data[1])
                    location.reload()
                }
            }
        })
    })
})

