$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip()

    $("#signup_username").keyup(function(e){
        let username_xss = filterXSS($('#signup_username').val())
        $.post('/check_signup_username', {signup_username: username_xss}, function(data, jqHXR) {   
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
        let email_xss = filterXSS($('#signup_email').val())       
        $.post('/check_signup_email', {signup_email: email_xss}, function(data, jqHXR) {   
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
        let username_xss = filterXSS($('#signup_username').val())
        let email_xss = filterXSS($('#signup_email').val())        
        let firstname_xss = filterXSS($('#signup_firstname').val())        
        let lastname_xss = filterXSS($('#signup_lastname').val())        
        let password_xss = filterXSS($('#signup_password').val())        
        let cpassword_xss = filterXSS($('#signup_cpassword').val())        
        // $.post('/signup', $('form#form_signup').serialize(), function(data, jqHXR) {
        $.post('/signup', {signup_username: username_xss, signup_email: email_xss, signup_firstname: firstname_xss, signup_lastname: lastname_xss, signup_password: password_xss, signup_cpassword: cpassword_xss}, function(data, jqHXR) {
            if (jqHXR === "success") {
                    if (data[0] === false)
                    {
                        $("return-signup").empty()
                        document.getElementById("return-signup").innerHTML = data[1]
                        document.getElementById("signup_password").value = ''
                        document.getElementById("signup_cpassword").value = ''
                    }
                    else {
                        $("#main_signup").empty()
                        $("#main_signup").addClass('text-center')
                        document.getElementById("main_signup").innerHTML = data[1]

                    }
                }
            else {
            }
        })
    })
})