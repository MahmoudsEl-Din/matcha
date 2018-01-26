console.log(`/search/search_them_all/${[18, 56]}/${[30, 70]}/${[300]}/${[]}`)

$.get(`/search/search_them_all/${JSON.stringify([18,56])}/${JSON.stringify([30,70])}/${JSON.stringify(300)}/${JSON.stringify([])}`, null, function(data, jqHXR) { 
    console.log(data)
    data.forEach(element => {
        $('#users').append('<a src="localhost:7777/user?uid='+element.id+'">'+element.name+'</a>')
    });
})