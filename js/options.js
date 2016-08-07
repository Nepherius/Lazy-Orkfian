/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */

const Races = {
    'Dark Elf': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 38,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Dwarf': function() {},
    'Eagle': function() {},
    'Fairy': function() {},
    'High Elf': function() {},
    'Hobbit': function() {},
    'Mori Hai': function() {},
    'Raven': function() {},
    'Spirit': function() {},
    'Uruk Hai': function() {},
    'Wizard': function() {},
    'Wood Elf': function() {}
};

function selectRace() {
    const selectedRace = $('#race :selected').text();
    // Pouplate Option Input
    for (let building in Races[selectedRace]) {
        $('input[name=' + building + ']').val(Races[selectedRace][building]);
    }
}
// Saves options to chrome.storage.sync.
function save_options() {

    // Convert from data to Array then to Object
    let SaveData = {};
    let formData = $('form').serializeArray();
    formData.map(function(el) {

            SaveData[el.name] = el.value;

    });
    console.log(SaveData);
    // Save data to storage
    chrome.storage.sync.set(SaveData, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);

        //Reset dropdown
        $("#race").val('None');
        // Clear form
        $("form").trigger('reset');
    });
}

document.getElementById('race').addEventListener('change', selectRace);
document.getElementById('save').addEventListener('click', save_options);
