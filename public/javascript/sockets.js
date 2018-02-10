    var socket = io.connect('http://localhost:7777');        
    socket.on('new_notif', data => {
        var content = ''
        var sender_name = undefined
        if (data.type === 1 || data.type === 2 || data.type === 3) {
            $.get('/notif/get_user', {id: data.uid_visitor}, function(data2, jqHXR) {
                if (jqHXR === "success" && data2 && data2 !== true) {
                    sender_name = "#{" + data2 + "}"
                    if (data.type === 1)
                        content = sender_name + ' viewed your profile'
                    else if (data.type === 2 && data.like_type !== 'match')
                        content = sender_name + ' ' + data.like_type +'d your profile'
                    else if (data.type === 2 && data.like_type === 'match')
                        content = 'It\'s a match with ' + sender_name + ', nice !'
                    else if (data.type === 3) {
                        content = sender_name + ' just sent you a message !'
                        if (window.location.pathname === '/chat')
                            new_message(data.uid_visitor, data.text)
                    }
                    let key = Date.now() + data.uid_visitor
                    $('#div_notif').prepend('<a class=\'w-100 m-1 h-25 \' id=\''+key +'\' href(\'#\')><div class=\'notif\' style=\'background-color: #ffffff;\' >' + content + '</div></a>')
                    $('#'+key).click(function() {window.location.replace('/user?uid='+data.uid_visitor)})
                    document.getElementById('notif_number').innerHTML = parseInt(document.getElementById('notif_number').innerHTML) + 1
                    $('#notif_number').removeClass('d-none')
                }
            })
        }
    })

    function emit_user_login(uid) {
        socket.emit('user_login',{
            uid: uid
        })  
    }

    function emit_visit(uid_current, uid) {
        socket.emit('visit',{
            uid: uid_current,
            uid_target: uid
        }) 
    }

    function emit_like(uid_current, uid, data) {
        socket.emit('like',{
            uid: uid_current,
            uid_target: uid,
            type: data 
        })
    }

    function emit_message(uid_current, uid, data) {
        socket.emit('message',{
            uid: uid_current,
            uid_target: uid,
            text: data
        })
    }