console.log(`/search/search_them_all/${[18, 56]}/${[30, 70]}/${[300]}/${[]}/${[]}`)

var page = 1;

suggest_request()

$('#button_page').click(() => { 
    page += 1;
    suggest_request()
})



function suggest_request() {
    console.log(page)
    $.get(`/search/search_them_all/${JSON.stringify([18,56])}/${JSON.stringify([18,99])}/${JSON.stringify(1000)}/${JSON.stringify([])}/${JSON.stringify(page)}`, null, (data, jqHXR) => { 
        console.log(data)
        console.log('teub')            
        data.forEach(element => {
            $('#users').append('<div class="container py-3 col-md-10" style="height:250px;" id="'+element.id+'"><div class="card" style="height: 100%;border-radius: 500px 0;box-shadow: #484848 1px 2px 20px;"><div class="row" style="height: 100%;"><div class="col-md-4"><img src="/assets/pictures/1_1516977572124.png" style="border-radius: 500px 500px 500px 500px; box-shadow: #404040 5px 5px 25px;" class="img-circle img-responsive w-100 h-100 picture_none" id="#img1"></a></div><div class="col-md-8 p-1 pl-2 muffin" style="padding-right: 15%"><div class="card-block "><h4 class="card-title text-center">'+element.username+'</h4><p class="card-text">'+element.age+' years old</p><p class="card-text">Note: '+element.pop+'</p><p class="card-text">'+element.tag_name+'</p></div></div></a></div>')
            $("#"+element.id+"").click(() => {
                window.location.replace("/user?uid="+element.id)
            })
        });
    })
}
