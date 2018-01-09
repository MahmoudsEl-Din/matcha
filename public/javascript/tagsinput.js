$(document).ready(function () {

    get_all_tags()
    
    function click_tags() { 
        $("#div_list_tags").children().on('click', function(e){
            
            console.log($(e.target).text())
            $("#return_tags").empty()
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

    $("#profil_tag").keyup(function(e){
        console.log($("#profil_tag").val())
        $("#return_tags").empty()
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
                        // if (res === false && $("#profil_tag").val() !== '')
                        //     $('#div_list_tags').prepend('<a class=\'link_select_tag\' href(\'#\')><div class="select_tag">' + $("#profil_tag").val() + '</div></a>')
                        click_tags () // Becouse tags weren't on the page at the begining we have to set onclick now
        
                    }
                }
            })
        }
        else
            document.getElementById("return_tags").innerHTML = 'Tag too long' 
    })


    function click_tags() { 
        $("#div_list_tags").children().on('click', e => {
            // $("#div_user_tags").children().each(i => {
                
            //     console.log(i)
            //     // if (e.target.innerText === i.val)
            // })
            console.log($(e.target).text())
            var divs = $('.user_tag')
            var ret = 0
            for(var i = 0; i < divs.length; i++){
                if ($(divs[i]).text().replace('⊗', '') === $(e.target).text())
                    ret = 1
                // do stuff
            }
            if (ret === 1)
                document.getElementById("return_tags").innerHTML = 'Tag already added' 
            else {
                $("#return_tags").empty()
                // $('#div_list_tags').empty()
                console.log(e.target)
                let i = 0
                $('#div_user_tags').prepend('<div class="user_tag">' + e.target.innerText + '<a id="del_tag_' + e.target.innerText + '" class="del_tag" href=\'#\'>⊗</a></div>')
                i++
                click_del_tag($('#del_tag_' + e.target.innerText))
            }
        })
    }

    function click_del_tag(elem) { 
        elem.click(function(e){
            e.preventDefault()    
            $("#return_tags").empty()
            $(e.target).parent().remove()
        })
    }

    
})