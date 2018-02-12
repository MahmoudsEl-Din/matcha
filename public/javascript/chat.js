var current_id = undefined
var last_message_id = undefined

$(document).ready(function(){
    $.get('/chat/get_match_info', function(data, jqHXR) {
        let i = 0;
        data.forEach(element => {
            $("#match_list").append("<div class='row w-100 border p-2 mb-2 mt-2 ml-auto mr-auto' style= 'height:300px;border-radius:2px;'> \
                                        <div id='match_pic' class='row w-100 p-2 m-auto h-75' style='cursor:pointer;'> \
                                            <div class='w-100' style=\"background-image: url('/assets/pictures/" + element.picture_name + "');background-repeat: no-repeat;background-size: cover;border-radius: 500px 500px 500px 500px;\">\
                                            </div>\
                                        </div>\
                                        <div class='row w-100 border p-2 m-auto'> \
                                            <h4 id='match_name' class='m-auto muffin' style='cursor:pointer;'> "+ element.username +"\
                                        </div> \
                                    </div>")
            $("#match_list").children().last().find("#match_name").click(function() {window.location.replace("/user?uid="+element.targ)})
            $("#match_list").children().last().find("#match_pic").click(function() {click_match(element)})
            if (i === 0) 
                click_match(element)
            i += 1;
        })
        scroll_bot()
    })

    function click_match (element)  {
        current_id = element.targ;
        $("#username_chatting").html(element.username)
        print_messages()
        $("#messages").empty()
    }

    function print_messages() {
        $.get('/chat/get_messages', {id: current_id} , function(data, jqHXR) {
            data.forEach(element => {
                last_message_id = element.id
                if (element.uid_sender === current_id)
                    print_other_message(element.text)
                else
                    print_our_message(element.text)
            })  
        })
    }

    $("#write_msg").keypress(function (e) {
        if(e.which == 13) {
            e.preventDefault()
            $("#form_chat").submit()
        }
    })

    $("#form_chat").on('submit', (e) => {
        e.preventDefault()
        let msg_xss = filterXSS($('#write_msg').val())
        if ($('#write_msg').val().length <= 500 && $('#write_msg').val().length > 0) {
            $.get('/chat/send_message', {message:msg_xss, uid_target:current_id}, function(data, jqHXR) {
                print_our_message(msg_xss)
                emit_message(data[0], current_id, msg_xss)
                $('#write_msg').val('')       
            })
        }
    })
})    

function print_our_message(txt) {
    $("#messages").append('\
        <div class="col border mb-2 p-4 ml-auto" style="min-height:10%;background-color: #F5F5F5F5;min-width:25%; max-width: 66%;border-radius: 50px 50px 5px 50px;background-color: #4080ff;color: white;">\
        ' + txt + '\
        </div>\
    ')
    scroll_bot()
}

function print_other_message(txt) {
    $("#messages").append('\
        <div class="col border mb-2 p-4" style="min-height:10%;background-color: #F5F5F5F5;min-width:25%; max-width: 66%;border-radius: 50px 50px 50px 5px;background-color: #DCDCDC; color: #4b4f56;">\
            '+ txt +'\
        </div>\
    ')
    scroll_bot()
}

function scroll_bot() {
    let div_msg = $('#messages')
    let height = div_msg[0].scrollHeight;
    div_msg.scrollTop(height);
}

function new_message(id_sender, text) {
    if (id_sender === current_id)
        print_other_message(text)
}