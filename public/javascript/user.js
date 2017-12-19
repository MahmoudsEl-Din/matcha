$(document).ready(function(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function get_user_tags(user) {
        console.log(user)
        $.get('/user/get_user_tags', {uid: user['id']},(data, jqHXR) => {
            if (jqHXR === "success") {
                if (data) {
                    console.log('get user tag DATA  TATAT')
                    data.forEach((elem) => {
                        $('#div_user_tags').append('<div class="user_tag">' + elem['tag_name'] + '</div>')
                    })
                }
            }
        })
    }
    
    var uid = getUrlParameter('uid');
    getUserInfo(uid)

    function getUserInfo(uid) {
        console.log(uid)

        $.get('/user/get_user_info', {uid: uid},(data, jqHXR) => {
            console.log(data)      
            if (data) {
                get_user_time(uid)
                get_user_tags(data)
                get_pictures(data)
                get_like(data)
            }
        })
    }

    function get_pictures(user) {
        $.get('/user/get_pictures', {uid: user['id']},(data, jqHXR) => {
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
                            $('#img' + i).removeClass('picture')
                            $('#img' + i).addClass('picture_none')
                        }
                    }
                }
            }
        })
    }

    function get_like(user) {
        $.get('/user/get_like_status', {uid: user['id']},(data, jqHXR) => {
            if (data)
                $("#like").removeClass('btn-success').addClass('btn-danger').text('Unlike')
        })            
    }

    function EpochToDate(epoch) {
        if (epoch < 10000000000)
            epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
        var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
        return new Date(epoch);
    }

    function get_user_time(uid) {
        $.get('/user/get_user_status', {uid: uid},(data, jqHXR) => {
            if (data) {
                var n = (new Date).getTime();                
                sub = n - data[0]['time']
                if (data[0]['logout'] === 1 || n - data[0]['time'] > 300) { // if user is not logged or no activity in 5 minutes
                    $('#connected').append('<h4 id=\'connected_p\'>Last logged: ' + data[1] + '</h4>')
                    $('#connected_p').attr('style', 'color:red; text-shadow: 2px 2px black;')
                }
                else {
                    $('#connected').append('<h4 id=\'connected_p\'>Online</h4>')
                    $('#connected_p').attr('style', 'color:green; text-shadow: 2px 0px black;')
                }
            }
        })
    }

    function clear_returns() {
        $("#return_report").empty()        
        $("#return_block").empty()        
        $("#return_like").empty()        
    }

    $('#report').click((e) => {
        e.preventDefault()
        clear_returns()                        
        $.get('/user/report_block', {uid: uid, type: 'reported'}, (data, jqHXR) => {
            if (data) {
                if (data[0] === true) {
                    $("#return_report").append('<p style=\'color:green\'> User reported successfully</p>')
                }
                else
                    $("#return_report").append('<p style=\'color:red\'>' + data[1] +'</p>')            
            }
        })
    })

    $('#block').click((e) => {
        e.preventDefault()
        clear_returns()                        
        $.get('/user/report_block', {uid: uid, type: 'blocked'}, (data, jqHXR) => {
            if (data) {
                if (data[0] === true) {
                    $("#return_block").append('<p style=\'color:green\'> User blocked successfully</p>')
                }
                else
                    $("#return_block").append('<p style=\'color:red\'>' + data[1] +'</p>')            
            }
        })
    })

    $('#like').click((e) => {
        e.preventDefault()
        clear_returns()                        
        $.get('/user/like_user', {uid: uid}, (data, jqHXR) => {
            if (data) {
                console.log(data)
                if (data[0] === true)
                    $("#like").removeClass('btn-danger').addClass('btn-success').text('Like')
                else if (data[0] === false)
                    $("#like").removeClass('btn-success').addClass('btn-danger').text('Unlike')
                else
                    $("#return_like").append('<p style=\'color:red\'>' + data +'</p>')            
            }
        })
    })
})