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
            const table = $('div.row.table-body');

            /***************** Get current land stats *****************/
            let Buildings = [];
            let current_1;
            let incoming_1;

            for (let i = 0; i <= 13; i++) {
                let buildingName = table.children().eq(i).find('div').eq(1).text().replace(/[^\w\d\(\)]/gi, '');
                let alreadyBuilt = table.children().eq(i).find('div').eq(2).text().replace(/[^\w\d\(\)]/gi, '');
                let percent = table.children().eq(i).find('div').eq(3).text().replace(/[^\w\d\(\)]/gi, '');

                if (alreadyBuilt.match(/\)/g)) {
                    let newFilter = alreadyBuilt.split('\)');
                    current = newFilter[1].replace(/[^\d]/, '');
                    incoming = newFilter[0].replace(/[^\d]/, '');
                } else {
                    current = alreadyBuilt;
                    incoming = 0;
                }
                let name_1 = table.find('tr').eq(i).children().eq(0).text().replace(/[^\w\d]/gi, '');
                let percent_1 = table.find('tr').eq(i).children().eq(2).text().replace(/[^\w\d]/gi, '');
                Buildings.push({
                    name: buildingName,
                    current: current,
                    incoming: incoming,
                    percent: percent
                });
            }

            /* Retrieve data from storage */
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
                        console.log(buildingsData);
                        //loop through the buildings array
                        Buildings.forEach(function(bl) {
                            // Nothing to do if no percent, 0% set in options
                            // or no more buildable land left
                            let buildingName = bl.name;
                            if (bl.name === 'GuardHouses') {
                                buildingName = 'gaurds';
                            } else if (bl.name === 'Laboratories') {
                                buildingName = 'labs';
                            }
                            let buildingTargetPercent = buildingsData[buildingName.toLowerCase()];
                            if (buildableLand > 0 && buildingTargetPercent > 0 &&
                                buildingTargetPercent !== undefined ||
                                buildingTargetPercent > 0) {
                                buildCalc(buildingName, bl.current, bl.incoming, buildingTargetPercent);
                            }
                        });
                        ohSnap('Done, review data and order construction!', {
                            color: 'green',
                            'duration': 5000,
                        });
                    },
                    function(err) {
                        optionsUrl = chrome.extension.getURL('options.html');
                        ohSnap('No settings found, click --> <a href="' + optionsUrl + '" target="_blank">Options</a>!', {
                            color: 'red',
                            duration: 6000,
                        });
                    });
            }

            /* The build calculator function, the magic happens here */
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
