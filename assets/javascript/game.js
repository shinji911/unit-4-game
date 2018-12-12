//ready js
$(document).ready(function () {

    // initialize variables to be used
    let currentatkpwr = 0;
    let yourselect = false;
    let enemyselect = false;
    let clickedsvt = "";
    let yourobj = {};
    let enemyobj = {};
    let yourhpdiv = {};
    let enemyhpdiv = {};
    let inisvtarray = [];
    let defsvtcount = 0;
    let gameover = false;



    //grab elements and store in variables
    let mainscreen = $("#mainscreen");
    let enemysvtzone = $("#enemysvtzone");
    let defendsvtzone = $("#defendsvtzone");
    let atkbtn = $("#atkbtn");
    let servant = $(".servant");
    let archerdiv = $("#archerdiv");
    let casterdiv = $("#casterdiv");
    let lancerdiv = $("#lancerdiv");
    let riderdiv = $("#riderdiv");
    let archerhp = $("#archerhp");
    let casterhp = $("#casterhp");
    let lancerhp = $("#lancerhp");
    let riderhp = $("#riderhp");
    let sysmessage = $("#sysmessage");

    //character objects
    let archerobj = {
        name: "Tomoe Gozen",
        hp: 100,
        atkpower: 8,
        ctrpower: 22
    };

    let casterobj = {
        name: "Gilles de Rais",
        hp: 75,
        atkpower: 13,
        ctrpower: 24
    };

    let lancerobj = {
        name: "Karna",
        hp: 120,
        atkpower: 7,
        ctrpower: 14
    };

    let riderobj = {
        name: "Alexander",
        hp: 140,
        atkpower: 6,
        ctrpower: 11
    };

    //set game function
    function updatehp(hpdiv, hpsvt) {
        hpdiv.text("HP : " + hpsvt);
    };

    //load up initial hp for each servant
    updatehp(archerhp, archerobj.hp);
    updatehp(casterhp, casterobj.hp);
    updatehp(lancerhp, lancerobj.hp);
    updatehp(riderhp, riderobj.hp);

    sysmessage.text("Select Your Character")

    //function to move character divs when player char is chosen
    function movetoDef(inarray) {
        inarray[0].appendTo(defendsvtzone);
        inarray[1].appendTo(defendsvtzone);
        inarray[2].appendTo(defendsvtzone);
    };

    //click functions
    //clicking on servants
    servant.on("click", function () {
        if (gameover === false) {
            clickedsvt = $(this).attr("id");
            //if you have not chosen your character, run.
            if (yourselect === false) {
                inisvtarray = [archerdiv, casterdiv, lancerdiv, riderdiv]
                //move all characters save for the chosen one to defendsvtzone and set player object.
                switch (clickedsvt) {
                    case "archerdiv":
                        yourobj = archerobj;
                        yourhpdiv = archerhp;
                        inisvtarray.splice(0, 1)
                        movetoDef(inisvtarray);
                        break;
                    case "casterdiv":
                        yourobj = casterobj;
                        yourhpdiv = casterhp;
                        inisvtarray.splice(1, 1)
                        movetoDef(inisvtarray);
                        break;
                    case "lancerdiv":
                        yourobj = lancerobj;
                        yourhpdiv = lancerhp;
                        inisvtarray.splice(2, 1)
                        movetoDef(inisvtarray);
                        break;
                    case "riderdiv":
                        yourobj = riderobj;
                        yourhpdiv = riderhp;
                        inisvtarray.splice(3, 1)
                        movetoDef(inisvtarray);
                        break;
                }
                yourselect = true;
                sysmessage.text("Select Target Enemy")
            }

            //if player has chosen a character and fight enemy is not chosen, run.
            else if (enemyselect === false) {
                //move chosen enemy to enemysvtzone and set current enemy object.
                $(this).appendTo(enemysvtzone);
                switch (clickedsvt) {
                    case "archerdiv":
                        enemyobj = archerobj;
                        enemyhpdiv = archerhp;
                        break;
                    case "casterdiv":
                        enemyobj = casterobj;
                        enemyhpdiv = casterhp;
                        break;
                    case "lancerdiv":
                        enemyobj = lancerobj;
                        enemyhpdiv = lancerhp;
                        break;
                    case "riderdiv":
                        enemyobj = riderobj;
                        enemyhpdiv = riderhp;
                        break;
                }
                enemyselect = true;
            }

            else {
                sysmessage.text("Must Defeat Current Enemy First");
            }
        }
    });

    //clicking on attack button
    atkbtn.on("click", function () {
        if (gameover === false) {
            if (yourselect === false) {
                sysmessage.text("Select Your Character First");
            }

            else if (enemyselect === false) {
                sysmessage.text("Select Target Enemy First");
            }

            else {
                currentatkpwr = currentatkpwr + yourobj.atkpower;
                console.log(currentatkpwr);
                enemyobj.hp = enemyobj.hp - currentatkpwr;
                updatehp(enemyhpdiv, enemyobj.hp);
                sysmessage.text("You have attacked the enemy for " + currentatkpwr + " damage.");

                //check if enemy defeated
                if (enemyobj.hp < 1) {
                    enemyselect = false;
                    defsvtcount = defsvtcount + 1;
                    enemysvtzone.empty();
                    if (defsvtcount === 3) {
                        gameover = true;
                        sysmessage.text("You have defeated all of the enemy and won the Holy Grail! Click here to restart.");
                    }

                    else {
                        sysmessage.text("You have defeated your opponent, you may choose another target.");
                    }
                }

                //check if you have been defeated
                else {
                    yourobj.hp = yourobj.hp - enemyobj.ctrpower;
                    updatehp(yourhpdiv, yourobj.hp);
                    sysmessage.append(" The enemy countered for " + enemyobj.ctrpower + " damage.");
                    if (yourobj.hp < 1) {
                        gameover = true;
                        sysmessage.text("You have been defeated. GAME OVER. Click here to restart.");
                    }
                }
            }
        }
    });

    //reset page function
    $(".reset").on("click", function () {
        if (gameover === true) {
            location.reload();
        }
    });


    //end ready js
});