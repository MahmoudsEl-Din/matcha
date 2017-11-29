$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip()

    $("#signup_username").keyup(function(e){
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

    $("#signup_email").keyup(function(e){
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
    
    $("#signup_password").keyup(function(e){
        $.post('/check_signup_password', $('#signup_password'), function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){                 
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

    $("#signup_cpassword").keyup(function(e){
        $.post('/check_signup_cpassword', { password: $('#signup_password').val(), cpassword: $('#signup_cpassword').val()}, function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){                 
                    if ($('#signup_cpassword').hasClass('border-success'))
                        $('#signup_cpassword').removeClass('border-success')
                    $('#signup_cpassword').addClass('border-danger')
                }
                else {
                    if ($('#signup_cpassword').hasClass('border-danger'))
                        $('#signup_cpassword').removeClass('border-danger')
                    $('#signup_cpassword').addClass('border-success')

                }
            }
        })
    })

    $("#signup_firstname").keyup(function(e){
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
    
    $("#signup_lastname").keyup(function(e){
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
                    if (data[0] === false)
                    {
                        $("return-signup").empty()
                        document.getElementById("return-signup").innerHTML = data[1]
                        document.getElementById("signup_password").value = ''
                        document.getElementById("signup_cpassword").value = ''
                    }
                    else {
                        $("#form_signup").empty()
                        document.getElementById("maindiv").innerHTML = data[1]
                    }
                }
            else {
            }
        })
    })
})