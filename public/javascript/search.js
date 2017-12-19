$(document).ready(function () {
    var finalForm = {}

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
            min: 17,
            max: 77,
            values: [18, 26],
            slide: function (event, ui) {
                $("#ageRange").val(ui.values[0] + " cm - " + ui.values[1] + " cm");
            }
        })
        $("#ageRange").val($("#ageslider-range").slider("values", 0) + " cm - " + $("#ageslider-range").slider("values", 1) + " cm");

        $("#popslider-range").slider({
            range: true,
            min: 0,
            max: 100,
            values: [30, 50],
            slide: function (event, ui) {
                $("#popRange").val(ui.values[0] + " - " + ui.values[1]);
            }
        })
        $("#popRange").val($("#popslider-range").slider("values", 0) + " - " + $("#popslider-range").slider("values", 1));

        $("#geoslider-range").slider({
            value: 10,
            min: 0,
            max: 100,
            step: 2.5,
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
            console.log(data)
            console.log("success")
    };

    $('#search-button').click(function (e) {
        e.stopPropagation()
        new Promise((res, rej) => {
            let url = `/search_them_all/${
            JSON.stringify(
                $("#ageslider-range").slider("values")
            )}/${JSON.stringify(
                $("#popslider-range").slider("values")
            )}/${JSON.stringify(
                $("#geoslider-range").slider("value")
            )}/${JSON.stringify(
                $('#profil_tag')[0].value
            )}`;
            $.get(url)
            .fail(rej)
            .done(res)
        })
        // .then(d => {
        //     if (d === "login")
        //     {
        //         return new Promise((res, rej) => {
        //             $.get(url)
        //             .fail(rej)
        //             .done(res)
        //         })
        //     }
        // })
        .then(funcCallBackRequest)
        .catch(console.log);
    })
})




