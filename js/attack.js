/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */

(function() {
    let attackCalcHtml = '<form id="attack_calcUI"><div><h2>Basic Attack Calculator</h2>';
    attackCalcHtml += '<a href="javascript:void(0)" class="closebtn">&times;</a>';
    attackCalcHtml += '<input type="text" class="input-field" placeholder="Total Acres" id="acres"/>';
    attackCalcHtml += '<input type="text" class="input-field" placeholder="Defence Per Acre(DPA)" id="dpa"/>';
    attackCalcHtml += '<input type="text" class="input-field" placeholder="Walls" id="walls"/>';
    attackCalcHtml += '<br><br>Deam\'s Hunt <input id="dh" type="checkbox" checked="checked"/>';
    attackCalcHtml += '<br><br><input type="submit" id="attack_calc"/> ';
    attackCalcHtml += '<br><br> Total Defence : <span style="color:red" id="attack_calc_result"><span>';
    attackCalcHtml += '</div></form>';

    $('body').append(attackCalcHtml);
    $('#attack_calcUI').draggable();

    $('.attack-calc').on('click', function(e) {
        e.preventDefault();
        $('#attack_calcUI').css('display', 'block');
    });

    $('#attack_calc').on('click', function(e) {
        e.preventDefault();
        let defBonus = 1;
        let acres = $('#attack_calcUI #acres').val() || 0;
        let dpa = $('#attack_calcUI #dpa').val() || 0;
        let walls = $('#attack_calcUI #walls').val() || 0;

        if ($('#attack_calcUI #dh').is(':checked')) {
            defBonus += 0.1;
        }
        defBonus += (walls / acres) * 10;
        let totalDef = (acres * dpa) * defBonus;
        $('#attack_calc_result').text('~' + Math.round(totalDef));
    });

    $('.closebtn').on('click', function() {
        $('#attack_calcUI').css('display', 'none');
        $("#attack_calcUI").trigger('reset');
    });
})();
