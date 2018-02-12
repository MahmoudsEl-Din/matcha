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
            min: 18,
            max: 77,
            values: [18, 26],
            slide: function (event, ui) {
                $("#ageRange").val(ui.values[0] + " ans - " + ui.values[1] + " ans");
            }
        })
        $("#ageRange").val($("#ageslider-range").slider("values", 0) + " ans - " + $("#ageslider-range").slider("values", 1) + " ans");

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
            max: 1000,
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
            ('success')
            (data)
            let url = `/${JSON.stringify(data)}`
            (url)
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
        new Promise((res, rej) => {
            let url = `/search/search_them_all/${
            JSON.stringify(
                $("#ageslider-range").slider("values")
            )}/${JSON.stringify(
                $("#popslider-range").slider("values")
            )}/${JSON.stringify(
                $("#geoslider-range").slider("value")
            )}/${JSON.stringify(
                taggs
            )}`;
            (url)
            window.location.replace(url)
             $.get(url)
             .fail(rej)
             .done(res)  
        })
        .then(funcCallBackRequest)
        .catch(console.log);
    })
})




