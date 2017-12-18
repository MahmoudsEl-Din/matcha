$(document).ready(function(){
    var finalForm = {}

    $(function() {
        $("#ageslider-range").slider({
            classes: {
                "ui-slider": "ui-corner-all"
            },
            animate: "fast",
            range: true,
            min: 17,
            max: 77,
            values: [ 18, 26 ],
            change: (event, ui) => {
                $.post('/search/ageRange', $("#ageslider-range").slider("values"), function(data, jqHXR) {
                    if (jqHXR === "success") {
                        console.log("success")
                    } else {
                        console.log("fail")
                    }
                })
            },
            slide: function( event, ui ) {
                $("#ageRange").val( ui.values[ 0 ] + " ans - " + ui.values[ 1 ] + " ans" );
            }
        })
        $("#ageRange").val($("#ageslider-range").slider( "values", 0 ) + " ans - " + $("#ageslider-range").slider( "values", 1 ) + " ans");

        $("#popslider-range").slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 30, 50 ],
            change: (event, ui) => {
                let pop = ($("popslider-range").slider("values"))
                jQuery.ajax = ({
                    cache: false,
                    data: {
                        pop: pop
                    },
                    type: POST
                })
            },
            slide: function( event, ui ) {
                $("#popRange").val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
        })
        $("#popRange").val($("#popslider-range").slider( "values", 0 ) + " - " + $("#popslider-range").slider( "values", 1 ) );

        $("#geoslider-range").slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 5, 30 ],
            change: (event, ui) => {
                let geo = ($("geoslider-range").slider("values"))
                console.log(data)
                jQuery.ajax = ({
                    data: {
                        geo: geo
                    },
                    type: POST
                })
            },
            slide: function( event, ui ) {
                $("#geoRange").val( ui.values[ 0 ] + " km - " + ui.values[ 1 ] + " km" );
            }
        })
        $("#geoRange").val($("#geoslider-range").slider( "values", 0 ) + " km - " + $("#geoslider-range").slider( "values", 1 ) + " km" );
    })

    $('#search-button').click(function(e) {
        var final_form = $("#search-form").serialize()
        
        console.log(data)
        // $.post('search/search_them', $('#search-form'), (data, jqXHR) => {
        //     if (jqXHR === "success") {

        //     }
        // }
    })
    // $('#search-button').click(e => {
    //     $.post('/search/search_profil', $('#ageRange'))
    // })
})




