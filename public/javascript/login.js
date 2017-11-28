$(document).ready(function(){
    $("#connect_submit").click(function(e) {
        e.preventDefault()

        $.post('/login', $('form#form_connect').serialize(), function(data, jqHXR) {  
            console.log(jqHXR)      
            if (jqHXR === "success") {
                console.log(data)
                if (data[0] === false){
                    console.log("test")
                    $("return-connect").empty()
                    document.getElementById("return-connect").innerHTML = data[1]
                    document.getElementById("form_password").value = ''
                }
                else {
                    $("#return-connect").empty()
                    location.reload()
                }
            }
        })
    })
})

