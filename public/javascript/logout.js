$(document).ready(function(){
    $("#logout").click(function(e) {
        e.preventDefault()

        $.post('/logout', undefined, function(data, jqHXR) {  
            if (jqHXR === "success") {
                document.location.href='/' // Reload sur l'index quand logout
            }
        })
    })
})