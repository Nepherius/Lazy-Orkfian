/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */

(function() {
    $('body').prepend('<a href="#" class="builder">Builder</a>');
    $('body').prepend('<a href="#" class="attack-calc">Basic Attack Calculator</a>');
    $('body').prepend('<a href="#" class="kill-calc">Kill Calculator</a>');

    $('#content').append('<div id="ohsnap"></div>');
    const currentUrl = window.location.pathname.replace(/[^a-zA-Z|_]/g, '');
    let money = $("#tribeStats .money").text();
    let food = $("#tribeStats .food").text();
    let wood = $("#tribeStats .wood").text();
    let citizens = $("#tribeStats .citizens").text();

    let tribeStats = {};
    const Pages = {
        'tribe': function() {

            let tb = $('table tbody');

            // Populate tribeStats
            for (let i = 0; i < 6; i++) { // Yeah, this looks horrible.
                tribeStats[tb.children().eq(i).children().eq(0).text().replace(':', '')] =
                    tb.children().eq(i).children().eq(1).text().replace(',', '');
                tribeStats[tb.children().eq(i).children().eq(3).text().replace(':', '')] =
                    tb.children().eq(i).children().eq(4).text().replace(',', '');
            }

            // Do stuff with the new info
            let citizens = Number(tribeStats.Citizens);
            let military = Number(tribeStats['Military Units']);
            if (tribeStats["Raw Defence"].replace(/[^\d]/g, '') < 200) {
                ohSnap('Your Raw Defence should be at least 200 DPA(Defence Per Acre)', {
                    color: 'blue',
                    'duration': 10000,
                });
            } else if (tribeStats["Mage Level"] < 5) {
                ohSnap('You should have at least Mage Level 5', {
                    color: 'blue',
                    'duration': 10000,
                });
            } else if (tribeStats.Thieves.replace(/[^\d]/g, '') < 5) {
                ohSnap('You should have at least 5 TPA(Thieves Per Acre)', {
                    color: 'blue',
                    'duration': 10000,
                });
            } else if (citizens / (citizens + military) < 0.4) {
                ohSnap('It\s generaly a good idea to have at least 40% citizens', {
                    color: 'red',
                    'duration': 10000,
                });
            } else if (tribeStats['Barren Land'] > 0) {
                ohSnap('Build all your barren land ASAP, players can "Commandeer" it from you.', {
                    color: 'red',
                    'duration': 10000,
                });
            } else {
                ohSnap('Everything looks fine here, good job!', {
                    color: 'green',
                    'duration': 10000,
                });
            }
        },
        'alliance': function() {

        },
        'construction': function() {

        },
        'military_training': function() {

        },
        'release_military': function() {
            if (citizens.replace(/[^\d]/, '') < 500) {
                // TODO retrieve available units. On option page user should have
                // a choice on what unit to release and how many
                ohSnap('You have less than 500 citizens left, you should release some military!', {
                    color: 'red',
                    'duration': 10000,
                });
            }
        },
        'mystics': function() {

        }
    };

    if (Pages.hasOwnProperty(currentUrl)) {
        Pages[currentUrl]();
    }

    /******** Tick, Tock ********/

    // Set Target
    const observerTarget = document.getElementById('clock');

    // Create an observer instance
    const observer = new MutationObserver(function(mutations) {
        let time = $('#clock').text().split(':');
        let hh = time[0]; // Not in use atm
        let mm = time[1];
        let ss = time[2];

        if (mm === '00' && ss === '00') {
            checkCitizensLeft();
        } else if (mm === '55' && ss === '00') {
            checkResourcesLeft();
        } else if (mm % 10 === 0 && ss === '05') {
            selfSpellStatus();
        } else if (ss % 10 === 0) {
            checkAllianceNews(hh, mm, ss);
        }

    });

    // Configuration of the observer:
    const observerConfig = {
        attributes: true,
        childList: false,
        characterData: false
    };
    // Start the observer
    observer.observe(observerTarget, observerConfig);


    /************** Functions below **************/

    function checkAllianceNews(hh, mm, ss) {
        $.getJSON('http://alliancesatwar.com/api/news-alliance/?output=json', function(res) {
            let allianceId = res.data.id;
            // Assuming that the info.time allways displays current server time
            let serverTime = Date.parse(res.info.time);

            // Filter the news, only keep relevant.
            let filteredNews = res.data.items.filter(filterNews.bind(null, serverTime));

            // If any news left, notify the user
            if (filteredNews.length > 0) {
                let newsToDisplay = filteredNews.map(function(i) {
                    return i.message + '<br>';
                });
                chrome.runtime.sendMessage({
                    msg: "playNotify"
                }, function(response) {
                    // not in use atm
                });
                ohSnap(newsToDisplay.toString().replace(',', ''), {
                    color: 'blue',
                    'duration': 5000,
                });
            }
        });
    }

    // Only keep the news within the last 10 seconds
    function filterNews(serverTime, item) {
        return Date.parse(item.time) + 10000 > serverTime &&
          //Odly to select negative news search for positive class?!
            item.message.match('class="positive"');
    }

    const selfSpells = {
        population: 'Elendian',
        growth: 'Matawaska River',
        food: 'Lord of Harvest',
        income: 'Quanta',
        offence: 'Ciorin’s Blessing',
        defence: 'Deam’s Hunt'
    };

    function selfSpellStatus() {
        $.getJSON('http://alliancesatwar.com/api/tribe-spells/?output=json', function(res) {
            let recastSpell = '';
            for (let spell in selfSpells) {
                if (res.data[spell] < 1) {
                    recastSpell += selfSpells[spell] + '<br>';
                }
            }
            if (recastSpell.length > 0 && res.data.power >= 6) {
                ohSnap('You should recast the follwing spell(s): <br>' + recastSpell, {
                    color: 'blue',
                    'duration': 5000,
                });
            }
        });

    }

    function checkCitizensLeft() {
        $.getJSON('http://alliancesatwar.com/api/tribe-population/?output=json', function(res) {
            if (res.data.citizens < 500) {
                chrome.runtime.sendMessage({
                    msg: "playWarning"
                }, function(response) {
                    // not in use atm
                });
                // Go to relase military page unless already there
                if (currentUrl !== 'release_military') {
                    location.href = 'http://alliancesatwar.com/release_military/';
                }
            }
        });
    }

    function checkResourcesLeft() {
        $.getJSON('http://alliancesatwar.com/api/tribe-goods/?output=json', function(res) {
            if (res.data.food <= 1000) {
                ohSnap('You\'re low on food, buy some before you lose citizens/military!', {
                    color: 'red',
                    'duration': 5000,
                });
            } else if (res.data.food >= 100000) {
                ohSnap('Don\'t keep too much food or fame farmers will hit you, sell it on market!', {
                    color: 'blue',
                    'duration': 5000,
                });
            } else if (res.data.wood > 100000) {
                ohSnap('There\'s no reason to keep all that wood, sell it!', {
                    color: 'blue',
                    'duration': 5000,
                });
            }
        });
    }
})();
