    var socket = io.connect('http://localhost:7777');        

    socket.on('new_notif', data => {
        console.log('new_notif BITCH')
        var content = ''
        var sender_name = undefined
        if (data.type === 1 || data.type === 2) {
            console.log(data)
            $.get('/notif/get_user', {id: data.uid_visitor}, function(data2, jqHXR) {
                if (jqHXR === "success") {
                    sender_name = data2
                    if (data.type === 1)
                        content = sender_name + ' viewed your profile'
                    else if (data.type === 2)
                        content = sender_name + ' ' + data.like_type +'d your profile'
                    $('#div_notif').prepend('<a class=\'w-100 m-1 h-25 \' href(\'#\')><div class=\'notif\' style=\'background-color: #ffffff;\' >' + content + '</div></a>')
                }
            })
        }
        document.getElementById('notif_number').innerHTML = parseInt(document.getElementById('notif_number').innerHTML) + 1
        $('#notif_number').removeClass('d-none')
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