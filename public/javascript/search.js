$(document).ready(function(){

    $(function() {
        $("#ageslider-range").slider({
            classes: {
                "ui-slider": "ui-corner-all"
            },
            animate: "fast",
            range: true,
            min: 16,
            max: 99,
            values: [ 18, 26 ],
            slide: function( event, ui ) {
                $("#ageRange").val( ui.values[ 0 ] + " ans - " + ui.values[ 1 ] + " ans" );
            }
        })
        $("#ageRange").val($("#ageslider-range").slider( "values", 0 ) + " ans - " + $("#ageslider-range").slider( "values", 1 ) + " ans");

        $("#popslider-range").slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 45, 50 ],
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
            slide: function( event, ui ) {
                $("#geoRange").val( ui.values[ 0 ] + " km - " + ui.values[ 1 ] + " km" );
            }
        })
        $("#popRange").val($("#geoslider-range").slider( "values", 0 ) + " km - " + $("#geoslider-range").slider( "values", 1 ) + " km" );
    })
})




