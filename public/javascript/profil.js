$(document).ready(function(){
    
    function clear_returns(){
        $("#return_email").empty()                    
        $("#return_firstname").empty()
        $("#return_lastname").empty()
        $("#return_gender").empty()                    
        $("#return_desire").empty()
        $("#return_bio").empty()
    }

    // When user is typing it checks the validity
    $("#profil_firstname").keyup(function(e){
        if ($("#profil_firstname").val() === ''){
            if ($('#profil_firstname').hasClass('border-success'))
                $('#profil_firstname').removeClass('border-success')
            $('#profil_firstname').addClass('border-danger')
        }
        else {
            if ($('#profil_firstname').hasClass('border-danger'))
                $('#profil_firstname').removeClass('border-danger')
            $('#profil_firstname').addClass('border-success')
        }
    })

    // When change submit is clicked it changes the firstname
    $("#submit_firstname").click(function(e) {
        e.preventDefault()
        clear_returns()

        $.post('/profil/change_firstname', $('#profil_firstname'), function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false) {                        
                    $("#return_firstname").empty()
                    $("#return_lastname").empty()
                    document.getElementById("return_firstname").innerHTML = data[1]
                    document.getElementById("profil_firstname").value = ''
                }
                else {
                    $("#return_firstname").empty()
                    $("#return_lastname").empty()                    
                    document.getElementById("profil_firstname").value = ''                        
                    document.getElementById("label_firstname").innerHTML = data[1]
                }
            }
        })
    })


    // When user is typing it checks the validity
    $("#profil_lastname").keyup(function(e){
        if ($("#profil_lastname").val() === ''){
            if ($('#profil_lastname').hasClass('border-success'))
                $('#profil_lastname').removeClass('border-success')
            $('#profil_lastname').addClass('border-danger')
        }
        else {
            if ($('#profil_lastname').hasClass('border-danger'))
                $('#profil_lastname').removeClass('border-danger')
            $('#profil_lastname').addClass('border-success')
        }
    })

    // When change submit is clicked it changes the lastname
    $("#submit_lastname").click(function(e) {
        e.preventDefault()
        clear_returns()

        $.post('/profil/change_lastname', $('#profil_lastname'), function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false) {             
                    document.getElementById("return_lastname").innerHTML = data[1]
                    document.getElementById("profil_lastname").value = ''
                }
                else {                                              
                    document.getElementById("profil_lastname").value = ''                        
                    document.getElementById("label_lastname").innerHTML = data[1]
                }
            }
        })
    })
    

    $("#profil_email").keyup(function(e){
        $.post('/profil/first_email', $('#profil_email'), function(data, jqHXR) {   
            if (jqHXR === "success") {
                if (data === true){
                    if ($('#profil_email').hasClass('border-success'))
                        $('#profil_email').removeClass('border-success')
                    $('#profil_email').addClass('border-danger')
                }
                else {
                    if ($('#profil_email').hasClass('border-danger'))
                        $('#profil_email').removeClass('border-danger')
                    $('#profil_email').addClass('border-success')

                }
            }
        })
    })

    // When change submit is clicked it changes the email
    $("#submit_email").click(function(e) {
        e.preventDefault()
        clear_returns()

        if (confirm('Are you sure this is a good email ?')) {
            $.post('/profil/change_email', $('#profil_email'), function(data, jqHXR) {  
                if (jqHXR === "success") {
                    if (data[0] === false) {
                        document.getElementById("return_email").innerHTML = data[1]
                        document.getElementById("profil_email").value = ''
                    }
                    else {                
                        // document.getElementById("return_firstname").innerHTML = ''
                        document.getElementById("profil_email").value = ''                        
                        document.getElementById("label_email").innerHTML = data[1]
                    }
                }
            })
        } else {
            $("#profile_email").empty()
        }

    })

    // When change submit is clicked it changes the gender
    $("#submit_gender").click(function(e) {
        e.preventDefault()
        clear_returns()

        if ($('#profil_gender').val() === 'B' || $('#profil_gender').val() === 'M' || $('#profil_gender').val() === 'F')
        {
            $.post('/profil/change_gender', $('#profil_gender'), function(data, jqHXR) {  
                if (jqHXR === "success") {
                    if (data[0] === false)
                        document.getElementById("return_gender").innerHTML = data[1]
                    else
                        document.getElementById("label_gender").innerHTML = data[1]
                }
            })
        }
    })

    // When change submit is clicked it changes the gender
    $("#submit_desire").click(function(e) {
        e.preventDefault()
        clear_returns()

        if ($('#profil_desire').val() === 'B' || $('#profil_desire').val() === 'M' || $('#profil_desire').val() === 'F')
        {
            $.post('/profil/change_desire', $('#profil_desire'), function(data, jqHXR) {  
                if (jqHXR === "success") {
                    if (data[0] === false)
                        document.getElementById("return_desire").innerHTML = data[1]
                    else                               
                        document.getElementById("label_desire").innerHTML = data[1]
                }
            })
        }
    })

    $("#submit_bio").click(function(e) {
        e.preventDefault()
        clear_returns()

        console.log($('#profil_bio').val().length)

        if ($('#profil_bio').val().length > 249)
            document.getElementById("return_bio").innerHTML = 'Too long'
        else if ($('#profil_bio').val().length <= 0)
            document.getElementById("return_bio").innerHTML = 'Empty field'
        else {
            $.post('/profil/change_bio', $('#profil_bio'), function(data, jqHXR) {  
                if (jqHXR === "success") {
                    if (data[0] === false)
                        document.getElementById("return_bio").innerHTML = data[1]
                    else                               
                        document.getElementById("label_bio").innerHTML = data[1]
                }
            })
        }
    })
})