console.log(`/search/search_them_all/${[18, 56]}/${[30, 70]}/${[300]}/${[]}`)

$.get(`/search/search_them_all/${JSON.stringify([18,56])}/${JSON.stringify([30,70])}/${JSON.stringify(300)}/${JSON.stringify([])}`, null, (data, jqHXR) => { 
    console.log(data)
    data.forEach(element => {
        $('#users').append('<div class="container py-3 col-md-10"><div class="card"><div class="row"><div class="col-md-4"><a href="localhost:7777/user?uid='+element.id+'"><img src="assets/ressources/first_slide.jpg" class="w-100"></a></div><div class="col-md-8 px-2"><div class="card-block "><a src="localhost:7777/user?uid='+element.id+'"><h4 class="card-title">'+element.name+'</h4></a><p class="card-text">'+element.age+'</p><p class="card-text">Note: '+element.pop+'</p><p class="card-text">'+element.tag_name+'</p><a href="#" class="btn btn-primary">Like</a></div></div></div></div>')
    });
})
