//ready js
$(document).ready(function () {

// initialize variables to be used
let currentatkpwr = 0;
let yourselect = false;
let enemyselect = false;
let clickedsvt = "";
let yourobj = {};
let enemyobj = {};
let hpdiv = {};
let inisvtarray = [];
let defsvtcount = 0;



//grab elements and store in variables
let mainscreen = $("#mainscreen");
let yoursvtzone = $("#yoursvtzone");
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
let sysmessage = $("#sysmessage")

//character objects
let archerobj = {
    name : "Arash",
    hp : 100,
    atkpower : 10,
    ctrpower : 25
};

let casterobj = {
    name : "William Shakespeare",
    hp : 100,
    atkpower : 10,
    ctrpower : 25
};

let lancerobj = {
    name : "Karna",
    hp : 100,
    atkpower : 10,
    ctrpower : 25
};

let riderobj = {
    name : "Alexander",
    hp : 100,
    atkpower : 10,
    ctrpower : 25
};

//set game function
function updatehp(hpdiv,hpsvt) {
    hpdiv.text("HP : " + hpsvt);
};


//function to move character divs when player char is chosen
function movetoDef (inarray) {
    inarray[0].appendTo(defendsvtzone);
    inarray[1].appendTo(defendsvtzone);
    inarray[2].appendTo(defendsvtzone);
};

//click functions
//clicking on servants
servant.on("click", function() {
    clickedsvt = $(this).attr("id");
    //if you have not chosen your character, run.
    if (yourselect === false) {
        inisvtarray = [archerdiv, casterdiv, lancerdiv, riderdiv]
        //move all characters save for the chosen one to defendsvtzone and set player object.
        switch (clickedsvt) {
            case "archerdiv" :
            yourobj = archerobj;
            inisvtarray.splice(0,1)
            movetoDef(inisvtarray);
            break;
            case "casterdiv" :
            yourobj = casterobj;
            inisvtarray.splice(1,1)
            movetoDef(inisvtarray);
            break;
            case "lancerdiv" :
            yourobj = lancerobj;
            inisvtarray.splice(2,1)
            movetoDef(inisvtarray);
            break;
            case "riderdiv" :
            yourobj = riderobj;
            inisvtarray.splice(3,1)
            movetoDef(inisvtarray);
            break;
        };
        yourselect = true;
    }
    
    //if player has chosen a character and fight enemy is not chosen, run.
    else if (enemyselect === false) {
        //move chosen enemy to enemysvtzone and set current enemy object.
        $(this).appendTo(enemysvtzone);
        switch (clickedsvt) {
            case "archerdiv" :
            enemyobj = archerobj;
            break;
            case "casterdiv" :
            enemyobj = casterobj;
            break;
            case "lancerdiv" :
            enemyobj = lancerobj;
            break;
            case "riderdiv" :
            enemyobj = riderobj;
            break;
        };
        enemyselect = true;
    }

    else {
        sysmessage.text("Must Defeat Current Enemy First");
    };
});

//clicking on attack button
atkbtn.on("click", function() {
    if (yourselect === false) {
        sysmessage.text("Select Your Servant First");
    }

    else if (enemyselect === false) {
        sysmessage.text("Select Target Enemy First");
    }

    else {
        currentatkpwr = currentatkpwr + yourobj.atkpower;
        enemyobj.hp = enemyobj.hp - currentatkpwr;
        //check if enemy defeated
        if (enemyobj.hp <= 0) {
            
        }
        yourobj.hp = yourobj.hp - enemyobj.ctrpower;
    };
})



//end ready js
});