$(document).ready(function(){
    $.get('/chat/get_match_info', function(data, jqHXR) {
        console.log(data)
        let i = 0;
        data.forEach(element => {
            console.log(element)
            $("#match_list").append("<div class='row w-100 border p-2 mb-2 mt-2 ml-auto mr-auto' style= 'height:300px;border-radius:2px;'> \
                                        <div id='match_pic' class='row w-100 p-2 m-auto h-75' style='cursor:pointer;'> \
                                            <div class='w-100' style=\"background-image: url('/assets/pictures/2_1513097725649.png');background-repeat: no-repeat;background-size: cover;border-radius: 500px 500px 500px 500px;\">\
                                            </div>\
                                        </div>\
                                        <div class='row w-100 border p-2 m-auto'> \
                                            <h4 id='match_name' class='m-auto muffin' style='cursor:pointer;'> "+ element.username +"\
                                        </div> \
                                    </div>")
            $("#match_list").children().last().find("#match_name").click(function() {window.location.replace("/user?uid="+element.targ)})
            $("#match_list").children().last().find("#match_picture").click(function() {click_match(element)})
            if (i === 0) 
                click_match(element)
            i += 1;
        })
    })

    function click_match (element)  {
        $("#username_chatting").html(element.username)
    }
})    