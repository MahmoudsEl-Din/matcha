$(document).ready(function(){
    $(document).click(function() {
        $("#dropdown_connexion").hide("slow")
    })
    $("#connexion").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        $("#div_forgot").hide()
        $("#div_ret").addClass("d-none")
        $("#div_connect").show()
        $("#dropdown_connexion").hide()
        $("#dropdown_connexion").dropdown('toggle')
        $("#dropdown_connexion").dropdown('dispose')
        $("#return-connect").empty()
        $("#dropdown_connexion").show("slow")

        return false        // This should not be used unless you do not want
                             // any click events registering inside the div
    });
    $("#dropdown_connexion").click(function(e) {
        e.stopPropagation() // This is the preferred method.
        return false
    })
    $("#forgot_password").click(function() {
        $("#div_connect").hide("slow")
        $("#div_forgot").show("slow")
    })
    $("#drop_signup").click(() => {
        window.location.replace("/signup")        
    })
})
