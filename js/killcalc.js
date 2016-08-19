/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */

(function() {
    // Build the calc UI
    let killCalcHtml = '<form id="kill-calcUI"><div><h2>Kill Calculator</h2>';
    killCalcHtml += '<a href="javascript:void(0)" class="closebtn">&times;</a>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Total Acres" id="acres"/>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Barren Land" id="barren"/>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Homes" id="homes"/>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Hideouts" id="hideouts"/>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Military" id="military"/>';
    killCalcHtml += '<input type="text" class="input-field" placeholder="Fame" id="fame"/>';
    killCalcHtml += '<select id="killCalcRace" class="field-select">';
    killCalcHtml += '<option>Race</option>';
    killCalcHtml += '</select>';
    killCalcHtml += '<br><br>Elendian <input id="elendian" type="checkbox" checked="checked"/>';
    killCalcHtml += '  Growth Sci > 20% <input id="growthsci" type="checkbox"/>';
    killCalcHtml += '<br><br><input type="submit" id="calculateKill"/> ';
    killCalcHtml += '<br><br> Homes to destroy: <span style="color:red" id="calcResult"><span>';
    killCalcHtml += '</div></form>';

    // Add calc UI to page & make it draggable
    $('body').append(killCalcHtml);
    $('#kill-calcUI').draggable();

    // Populate Races Dropdown
    $.getJSON('http://alliancesatwar.com/api/guide-races/?output=json', function(res) {
        let ActiveRaces = res.data.active;
        for (let race in ActiveRaces) {
            $('#killCalcRace').append($('<option>', {
                value: ActiveRaces[race].replace(/\s/, '_'),
                text: ActiveRaces[race]
            }));
        }
    });

    //Display the calc UI
    $('.kill-calc').on('click', function(e) {
        e.preventDefault();
        $('#kill-calcUI').css('display', 'block');
    });

    //Calculate data
    $('#calculateKill').on('click', function(e) {
        e.preventDefault();
        let popBonus = 1;
        let totalAcres = $('#kill-calcUI #acres').val() || 0;
        let barrenLand = $('#kill-calcUI #barren').val() || 0;
        let homes = $('#kill-calcUI #homes').val() || 0;
        let hideouts = $('#kill-calcUI #hideouts').val() || 0;
        let military = $('#kill-calcUI #military').val() || 0;
        let fame = $('#kill-calcUI #fame').val() || 0;

        if ($('#kill-calcUI #elendian').is(':checked')) {
            popBonus += 0.1;
        }
        if ($('#kill-calcUI #growthsci').is(':checked')) {
            popBonus += 0.1;
        }
        popBonus += fame / 100000;

        $.getJSON('http://alliancesatwar.com/api/guide-races/?output=json', function(res) {
            let raceInfo = res.data[$('#killCalcRace :selected').text().replace(/\s/, '_')];
            let baseHomePop = raceInfo.buildings.homes.citizens * popBonus;
            let baseHideoutPop = raceInfo.buildings.hideouts.citizens * popBonus;
            let baseOtherPop = 10 * popBonus;
            // TODO baseOtherPop should be replaced with an array loop to check
            // and add each building population, not needed at the moment
            let homesPop = baseHomePop * homes;
            let hideoutsPop = baseHideoutPop * hideouts;
            let otherPop = (totalAcres - barrenLand - homes - hideouts) * baseOtherPop;

            let totalPop = (homesPop + hideoutsPop + otherPop) - Number(military);

            let toDestroy = totalPop / baseHomePop;

            $('#calcResult').text(Math.round(toDestroy));
        });
    });

    // CLose UI
    $('.closebtn').on('click', function() {
        $('#kill-calcUI').css('display', 'none');
        $("#kill-calcUI").trigger('reset');
    });
})();
