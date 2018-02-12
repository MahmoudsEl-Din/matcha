$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip()    

    $("#button_reset").click(function(e) {
        e.preventDefault()
        let form_xss = filterXSS($('#form_email').val())
        $.post('/reset_password', {form_reset: form_xss}, function(data, jqHXR) {  
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
        let username_xss = filterXSS($('#username').val())
        let password_xss = filterXSS($('#password').val())
        let cpassword_xss = filterXSS($('#cpassword').val())
        
        // $.post('/change_password', $('form#form_change').serialize() + '&code=' + code, function(data, jqHXR) {  
        $.post('/change_password', {code : code, username: username_xss, password: password_xss, cpassword: cpassword_xss}, function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false){
                    
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