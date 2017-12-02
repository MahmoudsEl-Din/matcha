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
    
    $("#button_change_password").click(function(e) {
        e.preventDefault()

        var url = new URL(window.location.href)
        var code = url.searchParams.get("code");
        $.post('/change_password', $('form#form_change').serialize() + '&code=' + code, function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false){
                    console.log(data[1])
                    
                    $("#return-change").empty()
                    $("#return-change").addClass('text-danger').removeClass('text-success')
                    document.getElementById("return-change").innerHTML = data[1]
                    document.getElementById("password").value = ''
                    document.getElementById("cpassword").value = ''
                    
                }
                else {
                    $("#return-change").empty()
                    document.getElementById("return-change").innerHTML = data[1]
                    $("#return-change").addClass('text-success').removeClass('text-danger')
                }
            }
        })

    })
})