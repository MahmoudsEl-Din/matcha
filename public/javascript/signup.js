$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip()

    $("#signup_username").change('input', function(e){
        $.post('/check_signup_username', $('#signup_username'), function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){
                    if ($('#signup_username').hasClass('border-success'))
                        $('#signup_username').removeClass('border-success')
                    $('#signup_username').addClass('border-danger')
                }
                else {
                    if ($('#signup_username').hasClass('border-danger'))
                        $('#signup_username').removeClass('border-danger')
                    $('#signup_username').addClass('border-success')

                }
            }
        })
    })

    $("#signup_email").change('input', function(e){
        $.post('/check_signup_email', $('#signup_email'), function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){
                    if ($('#signup_email').hasClass('border-success'))
                        $('#signup_email').removeClass('border-success')
                    $('#signup_email').addClass('border-danger')
                }
                else {
                    if ($('#signup_email').hasClass('border-danger'))
                        $('#signup_email').removeClass('border-danger')
                    $('#signup_email').addClass('border-success')

                }
            }
        })
    })
    
    $("#signup_password").change('input', function(e){
        $.post('/check_signup_password', $('#signup_password'), function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){
                    console.log(data)                    
                    if ($('#signup_password').hasClass('border-success'))
                        $('#signup_password').removeClass('border-success')
                    $('#signup_password').addClass('border-danger')
                }
                else {
                    if ($('#signup_password').hasClass('border-danger'))
                        $('#signup_password').removeClass('border-danger')
                    $('#signup_password').addClass('border-success')

                }
            }
        })
    })

    $("#signup_firstname").change('input', function(e){
        if ($("#signup_firstname").value === null){
            if ($('#signup_firstname').hasClass('border-success'))
                $('#signup_firstname').removeClass('border-success')
            $('#signup_firstname').addClass('border-danger')
        }
        else {
            if ($('#signup_firstname').hasClass('border-danger'))
                $('#signup_firstname').removeClass('border-danger')
            $('#signup_firstname').addClass('border-success')
        }
    })
    
    $("#signup_lastname").change('input', function(e){
        if ($("#signup_lastname").value === null){
            if ($('#signup_lastname').hasClass('border-success'))
                $('#signup_lastname').removeClass('border-success')
            $('#signup_lastname').addClass('border-danger')
        }
        else {
            if ($('#signup_lastname').hasClass('border-danger'))
                $('#signup_lastname').removeClass('border-danger')
            $('#signup_lastname').addClass('border-success')
        }
    })

    $("#submit_signup").click(function(e) {
        e.preventDefault()

        $.post('/signup', $('form#form_signup').serialize(), function(data, jqHXR) {  
            if (jqHXR === "success") {
                console.log(data)
                    if (data[0] === false)
                    {
                        $("return-signup").empty()
                        document.getElementById("return-signup").innerHTML = data[1]
                        document.getElementById("signup_password").value = ''
                        document.getElementById("signup_cpassword").value = ''
                    }
                }
            else {
               
            }
        })
    })
})