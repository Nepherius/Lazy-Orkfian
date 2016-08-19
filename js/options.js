/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */
// Gaurds is not a typo, it's intended to match the html orkfia typo
const growthMode = {
    'Dark Elf': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 43,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Dwarf': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 3,
        academies: 5,
        yards: 10
    },
    'Eagle': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 43,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Fairy': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 43,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'High Elf': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 3,
        academies: 5,
        yards: 10
    },
    'Hobbit': {
        homes: 30,
        farms: 10,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Mori Hai': {
        homes: 45,
        farms: 10,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 25,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Raven': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 3,
        academies: 5,
        yards: 10
    },
    'Spirit': {
        homes: 30,
        farms: 0,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 10,
        academies: 5,
        yards: 10
    },
    'Uruk Hai': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 40,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 3,
        academies: 5,
        yards: 10
    },
    'Wizard': {
        homes: 30,
        farms: 7,
        walls: 0,
        weaponries: 0,
        guilds: 5,
        mines: 43,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 0,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 10
    },
    'Wood Elf': {
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
        hideouts: 5,
        academies: 5,
        yards: 10
    }
};


const warMode = {
    'Dark Elf': {
        homes: 30,
        farms: 7,
        walls: 5,
        weaponries: 0,
        guilds: 15,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 13,
        barracks: 0,
        hideouts: 0,
        academies: 30,
        yards: 0
    },
    'Dwarf': {
        homes: 30,
        farms: 7,
        walls: 8,
        weaponries: 15,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 15,
        gaurds: 15,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 0
    },
    'Eagle': {
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
    'Fairy': {
        homes: 30,
        farms: 7,
        walls: 5,
        weaponries: 0,
        guilds: 15,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 13,
        barracks: 0,
        hideouts: 0,
        academies: 30,
        yards: 0
    },
    'High Elf': {
        homes: 30,
        farms: 7,
        walls: 8,
        weaponries: 15,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 15,
        gaurds: 15,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 0
    },
    'Hobbit': {
        homes: 30,
        farms: 9,
        walls: 8,
        weaponries: 0,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 18,
        gaurds: 0,
        barracks: 0,
        hideouts: 25,
        academies: 5,
        yards: 0
    },
    'Mori Hai': {
        homes: 45,
        farms: 9,
        walls: 5,
        weaponries: 0,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 6,
        gaurds: 0,
        barracks: 0,
        hideouts: 25,
        academies: 5,
        yards: 0
    },
    'Raven': {
        homes: 30,
        farms: 7,
        walls: 8,
        weaponries: 15,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 15,
        gaurds: 15,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 0
    },
    'Spirit': {
        homes: 30,
        farms: 0,
        walls: 8,
        weaponries: 0,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 22,
        gaurds: 0,
        barracks: 0,
        hideouts: 30,
        academies: 5,
        yards: 0
    },
    'Uruk Hai': {
        homes: 30,
        farms: 7,
        walls: 8,
        weaponries: 15,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 15,
        gaurds: 15,
        barracks: 0,
        hideouts: 0,
        academies: 5,
        yards: 0
    },
    'Wizard': {
        homes: 30,
        farms: 7,
        walls: 5,
        weaponries: 0,
        guilds: 15,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 0,
        gaurds: 13,
        barracks: 0,
        hideouts: 0,
        academies: 30,
        yards: 0
    },
    'Wood Elf': {
        homes: 30,
        farms: 7,
        walls: 8,
        weaponries: 0,
        guilds: 5,
        mines: 0,
        bastions: 0,
        labs: 0,
        churches: 20,
        gaurds: 0,
        barracks: 0,
        hideouts: 25,
        academies: 5,
        yards: 0
    }
};

function selectGrowthMode() {
    const selectedRace = $('#growthMode :selected').text();
    // Pouplate Option Input
    for (let building in growthMode[selectedRace]) {
        $('input[name=' + building + ']').val(growthMode[selectedRace][building]);
    }
    // Reset Dropdown to default position
    $(".field-select").prop("selectedIndex", 0);
}

function selectWarMode() {
    const selectedRace = $('#warMode :selected').text();
    // Pouplate Option Input
    for (let building in warMode[selectedRace]) {
        $('input[name=' + building + ']').val(warMode[selectedRace][building]);
    }
    // Reset Dropdown to default position
    $(".field-select").prop("selectedIndex", 0);
}
// Saves options to chrome.storage.sync.
function save_options() {

    // Convert form data to Array then to Object
    let SaveData = {};
    SaveData.Buildings = {};
    let formData = $('form').serializeArray();
    formData.map(function(el) {

        SaveData.Buildings[el.name] = el.value || 0;

    });
    // Save data to storage
    chrome.storage.sync.set(SaveData, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);

        // Clear form
        $("form").trigger('reset');
    });
}

$('.input-field').keyup(function() {
    var sum = $('.input-field').toArray().reduce(function(sum, element) {
        return sum + Number(element.value);
    }, 0);
    if (sum > 100 || sum <= 0) {
      $('#input-sum').text('Total: ' + sum).css('color', 'red');
    } else {
      $('#input-sum').text('Total: ' + sum).css('color', 'green');
    }

});
document.getElementById('growthMode').addEventListener('change', selectGrowthMode);
document.getElementById('warMode').addEventListener('change', selectWarMode);
document.getElementById('save').addEventListener('click', save_options);
