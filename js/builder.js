/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */
(function() {
    //chrome.storage.sync.clear();
    const currentUrl = window.location.pathname.replace(/[^a-zA-Z|_]/g, '');
    $('.builder').on('click', function() {
        if (currentUrl === 'construction') {
            /* Get Data From Page and Chrome Storage */
            const totalAcres = $('.totaltext').text().replace(/[^\d]/g, '');
            let buildableLand = $('.buildable').text();
            // Retrieve Building Table
            const table = $('table');

            /***************** Many Questionable things happening below *****************/
            let Buildings = [];
            let current_1;
            let incoming_1;
            let current_2;
            let incoming_2;
            // Each row has 2 columns, retrieve both of them at the same time,
            // cuz I suck at DOM and jQuery manipulation
            for (let i = 1; i <= 7; i++) {
                // Column 1
                let filter_1 = table.find('tr').eq(i).children().eq(1).text().replace(/[^\w\d\(\)]/gi, '');
                if (filter_1.match(/\)/g)) {
                    let newFilter = filter_1.split('\)');
                    current_1 = newFilter[1];
                    incoming_1 = newFilter[0].replace(/[^\d]/, '');
                } else {
                    current_1 = filter_1;
                    incoming_1 = 0;
                }
                let name_1 = table.find('tr').eq(i).children().eq(0).text().replace(/[^\w\d]/gi, '');
                let percent_1 = table.find('tr').eq(i).children().eq(2).text().replace(/[^\w\d]/gi, '');
                Buildings.push({
                    name: name_1,
                    current: current_1,
                    incoming: incoming_1,
                    percent: percent_1
                });

                //Column 2
                let filter_2 = table.find('tr').eq(i).children().eq(6).text().replace(/[^\w\d\(\)]/gi, '');
                if (filter_2.match(/\)/g)) {
                    let newFilter = filter_2.split('\)');
                    current_2 = newFilter[1];
                    incoming_2 = newFilter[0].replace(/[^\d]/, '');
                } else {
                    current_2 = filter_2;
                    incoming_2 = 0;
                }
                let name_2 = table.find('tr').eq(i).children().eq(5).text().replace(/[^\w\d]/gi, '');
                let percent_2 = table.find('tr').eq(i).children().eq(7).text().replace(/[^\w\d]/gi, '');
                Buildings.push({
                    name: name_2,
                    current: current_2,
                    incoming: incoming_2,
                    percent: percent_2
                });
            }

            const getStorageData = new Promise(function(resolve, reject) {
                chrome.storage.sync.get(null, function(storageData) {
                    if (Object.getOwnPropertyNames(storageData).length === 0) {
                        reject('noSettings');
                    } else {
                        resolve(storageData.Buildings);
                    }
                });
            });
            /* Calculate and input the data */
            if (buildableLand === 0 || buildableLand.length === 0) {
                ohSnap('No buildable land, go attack someone!', {
                    color: 'blue',
                    'duration': 3000,
                });
            } else {
                getStorageData.then(function(buildingsData) {
                    //loop through the buildings array
                    Buildings.forEach(function(bl) {
                        // Nothing to do if no percent, 0% set in options
                        // or no more buildable land left
                        if (buildableLand > 0 && buildingsData[bl.name.toLowerCase()] > 0 &&
                            buildingsData[bl.name.toLowerCase()] !== undefined ||
                            buildingsData[bl.name.toLowerCase()] > 0) {
                            buildCalc(bl.name, bl.current, bl.incoming, buildingsData[bl.name.toLowerCase()]);
                        }
                    });
                    ohSnap('Done, review data and order construction!', {
                        color: 'green',
                        'duration': 5000,
                    });
                }, function(err) {
                    optionsUrl = chrome.extension.getURL('options.html');
                    ohSnap('No settings found, click --> <a href="' + optionsUrl + '" target="_blank">Options</a>!', {
                        color: 'red',
                        duration: 6000,
                    });
                });
            }

            function buildCalc(name, current, incoming, target) {
                let toBuild = Math.round(target / 100 * totalAcres - current - incoming);
                if (buildableLand > 0 && target > 0 && toBuild > 0) {
                    if (buildableLand >= toBuild) {
                        table.find('#' + name.toLowerCase()).val(toBuild);
                        buildableLand -= toBuild;
                    } else {
                        table.find('#' + name.toLowerCase()).val(buildableLand);
                        buildableLand = 0;
                    }
                }
            }

        } else {
            ohSnap('You have to be on construction page for builder to work!', {
                color: 'red',
                duration: 10000,
            });
        }

    });


})();
