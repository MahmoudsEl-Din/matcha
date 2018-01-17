$(document).ready(function(){
    // var socket = io.connect('http://localhost:7777');        
    // console.log(socket)

    var displayed = false;
    display_notif()    

    // socket.on('new_notif', data => {
    //     console.log('new_notif BITCH')
    //     var content = ''
    //     var sender_name = undefined
    //     if (data.type === 1 || data.type === 2) {
    //         $.get('/notif/get_user', {id: data.uid_visitor}, function(data2, jqHXR) {
    //             if (jqHXR === "success") {
    //                 sender_name = data2
    //                 if (data.type === 1)
    //                     content = sender_name + ' viewed your profile'
    //                 else if (data.type === 2)
    //                     content = sender_name + ' liked your profile'
    //                 $('#div_notif').prepend('<a class=\'w-100 m-1 h-25 \' href(\'#\')><div class=\'notif\' style=\'background-color: #ffffff;\' >' + content + '</div></a>')
    //             }
    //         })
    //     }
    //     $('#notif_number').text($('#notif_number').innerHTML() + 1)
    // })

    function display_notif(){
        $.post('/notif/get_notif', null, function(data, jqHXR) {  
            if (jqHXR === "success") {
                var content = ''
                var sender_name = undefined
                var new_notif = 0
                data.forEach((elem) => {
                    if (elem['shown'] === 0)
                        new_notif += 1
                    if (elem['type'] === 1 || elem['type'] === 2) {
                        $.get('/notif/get_user', {id: elem['uid_sender']}, function(data, jqHXR) {
                            if (jqHXR === "success") {
                                sender_name = data
                                if (elem['type'] === 1)
                                    content = sender_name + ' viewed your profile'
                                else if (elem['type'] === 2)
                                    content = sender_name + ' liked your profile'
                                if (elem['shown'] === 1)
                                    var style = 'style=\'background-color: #f2f2f2;\''
                                else
                                    var style = 'style=\'background-color: #ffffff;\''
                                $('#div_notif').prepend('<a class=\'w-100 m-1 h-25 \' href(\'#\')><div class=\'notif\'' + style + ' >' + content + '</div></a>')
                            }
                        })
                    }
                })
                $('#notif_number').text(new_notif)
                if (new_notif !== 0)
                    $('#notif_number').removeClass('d-none')
            }
        })
    }

    function notif_shown() {
        $('#notif_number').addClass('d-none')
        $.post('/notif/notif_shown', null, function(data, jqHXR) {})
    }

    $(document).click(function() {
        $("#dropdown_connexion").hide("slow")
        $("#dropdown_notif").hide("slow")
        if (displayed === true) {
            $('#div_notif a .notif').removeAttr('style').attr('style', 'background-color: #f2f2f2;');
            document.getElementById('notif_number').innerHTML = 0;
            displayed = false
        }
    })
    $("#connexion").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        $("#div_forgot").hide()
        $("#div_ret").addClass("d-none")
        $("#div_connect").show()
        $("#dropdown_connexion").hide()
        $("#dropdown_connexion").dropdown('toggle')
        $("#dropdown_connexion").dropdown('dispose')
        $("#return-connect").empty()
        $("#dropdown_connexion").show("slow")

        return false        // This should not be used unless you do not want
                             // any click events registering inside the div
    });
    $("#dropdown_connexion").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        return false
    })
    $("#forgot_password").click(function() {
        $("#div_connect").hide("slow")
        $("#div_forgot").show("slow")
    })
    $("#drop_signup").click(() => {
        window.location.replace("/signup")        
    })

    $("#notif_picture").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        notif_shown()
        $("#div_notif").show()
        $("#dropdown_notif").hide()
        $("#dropdown_notif").dropdown('toggle')
        $("#dropdown_notif").dropdown('dispose')
        $("#dropdown_notif").show("slow")
        displayed = true;

        return false        // This should not be used unless you do not want
                             // any click events registering inside the div
    });

    $("#dropdown_notif").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        return false
    })
})
