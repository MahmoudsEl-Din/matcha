$(document).ready(function () {
    $("#profil_tag").keyup(function(e){
        console.log($("#profil_tag").val())
        clear_returns()
        $('#div_list_tags').empty()
        
        if ($("#profil_tag").val().length < 15) {
            $.get('/profil/get_all_tags', {tag_search: $("#profil_tag").val()}, (data, jqHXR) => {
                if (jqHXR === "success") {
                    console.log(data)
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
            
            console.log($(e.target).text())
            clear_returns()
            // $('#div_list_tags').empty()

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
            console.log($(e.target).parent().text().substring(0, $(e.target).parent().text().length - 1))
            clear_returns()
            // $('#div_list_tags').empty()

            if ($(e.target).parent().text().length < 16) {
                console.log('test')
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

    
})