/* jshint esversion: 6 */ //JsLint fix
/* jshint node: true */
(function() {
    //chrome.storage.sync.clear();
    const currentUrl = window.location.pathname.replace(/[^a-zA-Z|_]/g, '');


    $('.builder').on('click', function() {
        if (currentUrl === 'construction') {
            /* Get Data From Page and Chrome Storage */


            // Outdated, getting it from API
            //const totalAcres = $('.totaltext').text().replace(/[^\d]/g, '');

            // No other way to retrieve it
            let buildableLand = $('.buildable').text();
            // Retrieve Building Table
            const table = $('div.row.table-body');






            /***************** Get current land stats *****************/


            /* Retrieve data from storage */

            /* Calculate and input the data */
            if (buildableLand === 0 || buildableLand.length === 0) {
                ohSnap('No buildable land, go attack someone!', {
                    color: 'blue',
                    'duration': 3000,
                });
            } else {

                /******** Prepare Promises ********/

                // Retrieve current build Data from server
                const getLandData = new Promise(function(resolve, reject) {
                    $.getJSON('http://alliancesatwar.com/api/tribe-builds/?output=json', function(res) {
                        if (res.info.status === 'success') {
                            resolve(res.data);
                        } else {
                            reject('serverQueryFailed');
                        }
                    });
                });

                // Retrieve target build from chrome storage
                const getStorageData = new Promise(function(resolve, reject) {
                    chrome.storage.sync.get(null, function(storageData) {
                        if (Object.getOwnPropertyNames(storageData).length === 0) {
                            reject('noSettings');
                        } else {
                            resolve(storageData.Buildings);
                        }
                    });
                });


                // Start the process
                getStorageData.then(function(BuildingsData) {
                        // Store all procesed data, will be used by calculator fn.
                        let buildings = [];
                        getLandData.then(function(landData) {
                            for (let building in BuildingsData) {
                                buildings.push({
                                    name: building,
                                    current: landData[building],
                                    incoming: 1 * (landData[building + '_t1'] +
                                        landData[building + '_t2'] +
                                        landData[building + '_t3'] +
                                        landData[building + '_t4']),
                                    percent: landData[building] * 100 / landData.land
                                });
                            }

                            //  loop through the buildings array
                            buildings.forEach(function(bl) {
                                // Nothing to do if no percent, 0% set in options
                                // or no more buildable land left
                                let buildingName = bl.name;
                                if (bl.name === 'GuardHouses') {
                                    buildingName = 'gaurds';
                                } else if (bl.name === 'Laboratories') {
                                    buildingName = 'labs';
                                }
                                let buildingTargetPercent = BuildingsData[buildingName.toLowerCase()];
                                if (buildableLand > 0 && buildingTargetPercent > 0 &&
                                    buildingTargetPercent !== undefined ||
                                    buildingTargetPercent > 0) {
                                    buildCalc(buildingName, bl.current, bl.incoming, buildingTargetPercent, landData.land);
                                }
                            });
                            ohSnap('Done, review data and order construction!', {
                                color: 'green',
                                'duration': 5000,
                            });
                        }, function(err) {
                            ohSnap('Unable to retrieve data from server,try again!', {
                                color: 'red',
                                duration: 6000,
                            });
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
            function buildCalc(name, current, incoming, target, totalAcres) {
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
