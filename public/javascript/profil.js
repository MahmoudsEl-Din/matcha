$(document).ready(function(){

    get_user_tags()
    get_all_tags()
    get_pictures()
    $('#div_historic').hide()

    function get_user_tags() {
        $.get('/profil/get_user_tags', { username : $('#username').text()},(data, jqHXR) => {
            if (jqHXR === "success") {
                if (data) {
                    data.forEach((elem) => {
                        $('#div_user_tags').append('<div class="user_tag">' + elem['tag_name'] + '<a id="del_tag_' + elem['tag_name'] + '" class="del_tag" href=\'#\'>x</a></div>')
                        click_del_tag($('#del_tag_' + elem['tag_name']))
                    })
                }
            }
        })
    }

    function get_all_tags() {
        $.get('/profil/get_all_tags', {tag_search: ''}, (data, jqHXR) => {
            if (jqHXR === "success") {
                if (data) {
                    data.forEach((elem) => {
                        $('#div_list_tags').append('<a class=\'link_select_tag\' href(\'#\')><div class="select_tag">' + elem + '</div></a>')
                    })
                }
            }
            click_tags () // Becouse tags weren't on the page at the begining we have to set onclick now
        })
    }
    
    function get_pictures() {
        $.post('/profil/get_pictures', (data, jqHXR) => {
            if (jqHXR === 'success') {
                if (data) {
                    var i = 1
                    data.forEach((elem) => {
                        $('#img' + elem['position']).attr("src",elem['filepath']);
                        $('#img' + i).removeClass('picture_none')
                        $('#img' + i).addClass('picture')
                        i++
                    })
                    if (i <= 5) {
                        for(i; i <= 5; i++) {
                            $('#img' + i).attr("src", "/assets/ressources/add_icon.png");
                            $('#img' + i).removeClass('picture')
                            $('#img' + i).addClass('picture_none')
                        }
                    }
                }
            }
        })
    }

    function clear_returns(){
        $("#return_email").empty()                    
        $("#return_firstname").empty()
        $("#return_lastname").empty()
        $("#return_gender").empty()                    
        $("#return_desire").empty()
        $("#return_bio").empty()
        $("#return_age").empty()        
        $("#return_tags").empty()
        $("#return_picture").empty()
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
    $('#profil_gender').change(function(e) {
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
    $('#profil_desire').change(function(e) {
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

    // When change submit is clicked it changes the age
    $("#submit_age").click(function(e) {
        e.preventDefault()
        clear_returns()

        $.post('/profil/change_age', $('#profil_age'), function(data, jqHXR) {  
            if (jqHXR === "success") {
                if (data[0] === false) {             
                    document.getElementById("return_age").innerHTML = data[1]
                    document.getElementById("profil_age").value = ''
                }
                else {                                              
                    document.getElementById("profil_age").value = ''                        
                    document.getElementById("label_age").innerHTML = data[1]
                }
            }
        })
    })

    $("#submit_bio").click(function(e) {
        e.preventDefault()
        clear_returns()

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

    $(".del_tag").click(function(e) {
        // e.preventDefault()
        clear_returns()

        $.get('/profil/del_user_tags',(data, jqHXR) => {
            if (jqHXR === "success") {
                // data.forEach((elem) => {
                    // $('#div_user_tags?').append('<div class="user_tag">' + elem['tag_name'] + '<a id="del_tag" class="del_tag">x</div>')
                // })
            }
        })
    })

    $("#profil_tag").keyup(function(e){
        clear_returns()
        $('#div_list_tags').empty()
        
        if ($("#profil_tag").val().length < 15) {
            $.get('/profil/get_all_tags', {tag_search: $("#profil_tag").val()}, (data, jqHXR) => {
                if (jqHXR === "success") {
                    if (data) {
                        var res = false
                        data.forEach((elem) => {
                            $('#div_list_tags').append('<a class=\'link_select_tag\' href(\'#\')><div class="select_tag">' + elem + '</div></a>')
                            if (elem === $("#profil_tag").val())
                                res = true
                        })
                        if (res === false && $("#profil_tag").val() !== '')
                            $('#div_list_tags').prepend('<a class=\'link_select_tag\' href(\'#\')><div class="select_tag">' + $("#profil_tag").val() + '</div></a>')
                        click_tags () // Becouse tags weren't on the page at the begining we have to set onclick now
        
                    }
                }
            })
        }
        else
            document.getElementById("return_tags").innerHTML = 'Tag too long' 
    })


    function click_tags() { 
        $("#div_list_tags").children().on('click', function(e){
            clear_returns()

            if ($(e.target).text().length < 15) {
                $.get('/profil/add_tag', {new_tag: $(e.target).text()}, (data, jqHXR) => {
                    if (jqHXR === "success") {
                        if (data[0] === false && data[1] === 'redirect_error')
                            window.location.replace("/error")
                        else if (data[0] === false)
                            document.getElementById("return_tags").innerHTML = data[1]
                        else if (data[0] === true) {
                            $('#div_user_tags').prepend('<div class="user_tag">' + data[1] + '<a id="del_tag_' + data[1] + '" class="del_tag" href=\'#\'>x</a></div>')
                            click_del_tag($('#del_tag_' + data[1]))
                        }
                    }
                })
            }
            else
                document.getElementById("return_tags").innerHTML = 'Tag too long' 
        })
    }

    function click_del_tag(elem) { 
        elem.click(function(e){
            e.preventDefault()    
            clear_returns()
            if ($(e.target).parent().text().length < 16) {
                $.get('/profil/del_tag', {tag_name: $(e.target).parent().text().substring(0, $(e.target).parent().text().length - 1)}, (data, jqHXR) => {
                    if (jqHXR === "success") {
                        if (data[0] === false && data[1] === 'redirect_error')
                            window.location.replace("/error")
                        else if (data[0] === false)
                            document.getElementById("return_tags").innerHTML = data[1]
                        else if (data[0] === true) {
                            $(e.target).parent().remove()
                        }
                    }
                })
            }
            else
                document.getElementById("return_tags").innerHTML = 'Tag too long' 
        })
    }

    $("#div_pictures").find('img').click(function(e){
        clear_returns()
        $('#pic1').trigger("click")
    })

    $("#pic1").change(function(e){
        $('#pic_sub').click()
    })

    $('#pic_sub').click (function(e) {
        e.preventDefault()
        var file_data = $('#pic1').prop('files')[0];   
        var form_data = new FormData();                  
        form_data.append('file', file_data);
        $.ajax({
            url: '/profil/upload_picture', // point to server-side PHP script 
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            success: function(response){
                if (response[0] === true) {
                    $('#img' + response[1]).attr("src",response[2])
                    $('#img' + response[1]).removeClass('picture_none')
                    $('#img' + response[1]).addClass('picture')
                    $("#pic1").val('')            
                }
                else if (response[1] === 'redirect_error')
                    window.location.replace("/error")
                else
                    document.getElementById("return_picture").innerHTML = response[1]            
            }
        });
    })

    $('.delete_picture').click (function(e) {
        e.preventDefault()
        position = $(e.target).parent().parent().parent().find('img').prop('id').replace('img', '')
        if (position >= 1 && position <= 5) {
            $.get('/profil/del_picture', {position: position}, (data, jqHXR) => {
                if (jqHXR === "success") {
                    if (data[0] === true) {
                        get_pictures()        
                    }
                    else if (data[0] === false && data[1] === 'redirect_error')
                        window.location.replace("/error") 
                }
            })
        }
    })

    $('.set_profil_pic').click (function(e) {
        e.preventDefault()
        position = $(e.target).parent().parent().parent().find('img').prop('id').replace('img', '')
        if (position >= 2 && position <= 5) {
            $.get('/profil/set_profil_pic', {position: position}, (data, jqHXR) => {
                if (jqHXR === "success") {
                    if (data[0] === true) {
                        get_pictures()        
                    }
                    else if (data[0] === false && data[1] === 'redirect_error')
                        window.location.replace("/error")           
                }
            })
        }
    })

    var historic_shown = false

    $('#button_historic').click(function(e){
        e.preventDefault()
        if (historic_shown === false){
            $('#div_historic').show('slow')    
            historic_shown = true
        }
        else if (historic_shown === true){
            $('#div_historic').hide('slow')    
            historic_shown = false
        }
    })

    $.post('/notif/get_notif', null, function(data, jqHXR) {  
        if (jqHXR === "success") {
            var content = ''
            var sender_name = undefined
            data.forEach((elem) => {
                if (elem['shown'] === 0 && new_notif)
                    new_notif += 1
                if (elem['type'] === 1 || (elem['type'] === 2 && elem['data'] === 'true')) {
                    $.get('/notif/get_user', {id: elem['uid_sender']}, function(data, jqHXR) {
                        if (jqHXR === "success") {
                            sender_name = data
                            var style = 'style=\'background-color: #ffffff;\''
                            if (elem['type'] === 1) {
                                content = sender_name + ' viewed your profile'
                                $('#div_notif_views').prepend('<a class=\'w-100 m-2 h-25 \' href(\'#\')><div class=\'notif\'' + style + ' >' + content + '</div></a>')
                            }
                            else if (elem['type'] === 2 && elem['data'] === 'true') {
                                content = sender_name + ' liked your profile'
                                $('#div_notif_likes').prepend('<a class=\'w-100 m-2 h-25 \' href(\'#\')><div class=\'notif\'' + style + ' >' + content + '</div></a>')
                            }
                        }
                    })
                }
            })
        }
    })

})
