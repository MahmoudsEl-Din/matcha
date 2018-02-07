
var params = new Object();
params.ageMin = 18
params.ageMax = 56
params.popMin = 30
params.popMax = 70
params.distMax = 500
var page = 1;
var trie = 0;



$.get('/user_info', (data, jqHXR) => {
    console.log('test')
    data.age - 5 < 18 ?
        params.ageMin = 18 :
        params.ageMin = data.age - 5
    params.ageMax = data.age + 5
    data.pop - 20 < 0 ?
        params.popMin = 0 :
        params.popMin = data.pop - 20
    data.pop + 20 > 100 ?
        params.popMax = 100 :
        params.popMax = data.pop + 20
    console.log(data)
    suggest_request(trie)
})    

console.log(`/search/search_them_all/${[params.ageMin, params.ageMax]}/${[params.popMin, params.popMax]}/${[params.distMax]}/${["milf"]}/${[]}`)


$('#button_page').click(() => { 
    page += 1;
    suggest_request(trie)
})

$('#age_up').click(() => {
    page = 1;
    trie = 1
    $('#users').empty()
    suggest_request(trie)
})

$('#age_down').click(() => { 
    page = 1;
    trie = 2
    $('#users').empty()
    suggest_request(trie)
})

$('#pop_up').click(() => {
    page = 1;
    trie = 3
    $('#users').empty() 
    suggest_request(trie)
})

$('#pop_down').click(() => { 
    page = 1;
    trie = 4 
    $('#users').empty()
    suggest_request(trie)
})

$('#loc_up').click(() => {
    page = 1;
    trie = 5
    $('#users').empty() 
    suggest_request(trie)
})

$('#loc_down').click(() => {
    page = 1;
    trie = 6
    $('#users').empty() 
    suggest_request(trie)
})

$('#tag_up').click(() => {
    page = 1;
    trie = 7
    $('#users').empty() 
    suggest_request(trie)
})

$('#tag_down').click(() => {
    page = 1;
    trie = 8
    $('#users').empty() 
    suggest_request(trie)
})

function suggest_request(order) {
    console.log(page)
    $.get(`/search/search_them_all/${JSON.stringify([params.ageMin,params.ageMax])}/${JSON.stringify([params.popMin,params.popMax])}/${JSON.stringify(params.distMax)}/${JSON.stringify([0])}/${JSON.stringify(page)}/${JSON.stringify(order)}`, null, (data, jqHXR) => { 
        console.log(data)
        console.log('teub')            
        let i = 0
        if (data[0].age) {            
            data.forEach(element => {
                if (i >= page*10 - 10)   {
                    $("#button_page").show()
                    $('#users').append('<div class="container py-3 col-md-10" style="height:250px;" id="'+element.id+'"><div class="card" style="height: 100%;cursor: pointer;border-radius: 500px 0;box-shadow: #484848 1px 2px 20px;"><div class="row" style="height: 100%;"><div class="col-md-4"><img src="/assets/pictures/1_1516977572124.png" style="border-radius: 500px 500px 500px 500px; box-shadow: #404040 5px 5px 25px;" class="img-circle img-responsive w-100 h-100 picture_none" id="#img1"></a></div><div class="col-md-8 p-1 pl-2 muffin" style="padding-right: 15%"><div class="card-block "><h4 class="card-title text-center">'+element.username+'</h4><p class="card-text">'+element.age+' years old</p><p class="card-text">Popularité: '+Math.round(element.pop)+' points</p><div class="h-25 w-100 card-text" id="div_tag'+element.id+'"></div></div></div></a></div>')
                    $("#"+element.id+"").click(() => {
                        window.location.replace("/user?uid="+element.id)
                    })
                    let tag = element.tags.split(",")
                    tag.forEach(tag_elem => {
                        tag_elem = tag_elem.trim()                    
                        $('#div_tag'+element.id).append("<div style='color: green;' class='w-50'> #" + tag_elem + "</div>")
                    });        
                }
                i += 1
            });
            if (i < page*10)
                $("#button_page").hide()    
        }
        else {
            $("#button_page").hide()
            $("#users").append("<h3 class='text-center muffin m-5 w-100'>No profil has been found</h3>")
        }
    })
}

/****************      FILTRES      ****************/
$(function () {
    var tooltip = $('<div id="tooltip" />').css({
        position: 'absolute',
        top: -25,
    }).hide();

    $("#ageslider-range").slider({
        classes: {
            "ui-slider": "ui-corner-all"
        },
        animate: "fast",
        range: true,
        min: params.ageMin,
        max: params.ageMax,
        values: [params.ageMin, params.ageMax],
        slide: function (event, ui) {
            $("#ageRange").val(ui.values[0] + " ans - " + ui.values[1] + " ans");
        }
    })
    $("#ageRange").val($("#ageslider-range").slider("values", 0) + " ans - " + $("#ageslider-range").slider("values", 1) + " ans");

    $("#popslider-range").slider({
        range: true,
        min: params.popMin,
        max: params.popMax,
        values: [params.popMin, params.popMax],
        slide: function (event, ui) {
            $("#popRange").val(ui.values[0] + " - " + ui.values[1]);
        }
    })
    $("#popRange").val($("#popslider-range").slider("values", 0) + " - " + $("#popslider-range").slider("values", 1));

    $("#geoslider-range").slider({
        value: params.distMax,
        min: 0,
        max: params.distMax,
        step: 2.5 ,
        slide: function (event, ui) {
            $("#geoRange").val(ui.value + " km")
            tooltip.text(ui.value)
        },
        change: function (event, ui) { }
    }).find(".ui-slider-handle").append(tooltip).hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide()
    })
    $("#geoRange").val($("#geoslider-range").slider("value") + " km");
})


const funcCallBackRequest = data => {
        console.log('success')
        console.log(data)
        let url = `/${JSON.stringify(data)}`
        console.log(url)
        // $.get(url)
};

$('#search-button').click(function (e) {
    e.stopPropagation()


    $('#div_user_tag').children().each(()=> {
        $(this).remove()
    })

    let tags = $('.user_tag')

    let taggs = []
    for (let i = 0; i < tags.length; i++) {
        let inst = tags[i]
        taggs[i] = $(inst).text().replace('⊗', '')
    }
    // new Promise((res, rej) => {
    //     let url = `/search/search_them_all/${
    //     JSON.stringify(
    //         $("#ageslider-range").slider("values")
    //     )}/${JSON.stringify(
    //         $("#popslider-range").slider("values")
    //     )}/${JSON.stringify(
    //         $("#geoslider-range").slider("value")
    //     )}/${JSON.stringify(
    //         taggs
    //     )}`;
    //     console.log(url)
    //     // window.location.replace(url)
    //      $.get(url)
    //      .fail(rej)
    //      .done(res)  
    // })
    // .then(funcCallBackRequest)
    // .catch(console.log);
    console.log(`/search/search_them_all/${JSON.stringify($("#ageslider-range").slider("values"))}/${JSON.stringify($("#popslider-range").slider("values"))}/${JSON.stringify($("#geoslider-range").slider("value"))}/${JSON.stringify([])}/${JSON.stringify(page)}/${JSON.stringify(trie)}`)
    $.get(`/search/search_them_all/${JSON.stringify($("#ageslider-range").slider("values"))}/${JSON.stringify($("#popslider-range").slider("values"))}/${JSON.stringify($("#geoslider-range").slider("value"))}/${JSON.stringify([0])}/${JSON.stringify(page)}/${JSON.stringify(trie)}`, null, (data, jqHXR) => { 
        let i = 0
        $("#users").empty()
        if (data[0].age) {
            data.forEach(element => {
                if (i >= page*10 - 10)   {
                    $("#button_page").show()
                    $('#users').append('\
                    <div class="container py-3 col-md-10" style="height:250px;" id="'+element.id+'">\
                        <div class="card" style="height: 100%;cursor: pointer;border-radius: 500px 0;box-shadow: #484848 1px 2px 20px;">\
                            <div class="row" style="height: 100%;">\
                                <div class="col-md-4">\
                                    <img src="/assets/pictures/1_1516977572124.png" style="border-radius: 500px 500px 500px 500px; box-shadow: #404040 5px 5px 25px;" class="img-circle img-responsive w-100 h-100 picture_none" id="#img1">\
                                </div>\
                                <div class="col-md-8 p-1 pl-2 muffin" style="padding-right: 15%">\
                                    <div class="card-block ">\
                                        <h4 class="card-title text-center">'+element.username+'</h4>\
                                        <p class="card-text">'+element.age+' years old</p>\
                                        <p class="card-text">Popularité: '+Math.round(element.pop)+' points</p>\
                                        <p class="card-text"> Se trouve à '+Math.round+' km\
                                        <div class="h-25 w-100 card-text" id="div_tag'+element.id+'"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>')
                    $("#"+element.id+"").click(() => {
                        window.location.replace("/user?uid="+element.id)
                    })
                    let tag = element.tags.split(",")
                    tag.forEach(tag_elem => {
                        tag_elem = tag_elem.trim()                    
                        $('#div_tag'+element.id).append("<div style='color: green;' class='w-50'> #" + tag_elem + "</div>")
                    });        
                }
                i += 1
            });
            if (i < page*10)
                $("#button_page").hide()
        }
        else {
            $("#button_page").hide()
            $("#users").append("<h3 class='text-center muffin m-5 w-100'>No profil has been found</h3>")
        }
    })
})
