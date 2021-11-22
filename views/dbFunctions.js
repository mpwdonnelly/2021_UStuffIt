const { CHAR } = require("sequelize/types");

//create one DB entry based on form fields
function doPost(){
    if (document.getElementById("thing_label").value == ""){
        alert("Item Label cannot be empty when creating a cataloged item!");
        return;
    }

    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log("Server Response:" + xhr.status);
        var responseText = xhr.responseText;
        console.log("Response Text:" + responseText);
    }};

    var data = `{
        "thing_label": "${document.getElementById("thing_label").value}",
        "thing_status": "${document.getElementById("thing_status").value}",
        "thing_condition": "${document.getElementById("thing_condition").value}",
        "person_role": "${document.getElementById("person_role").value}",
        "person_contactInfo": "${document.getElementById("person_contactInfo").value}",
        "place_storedIn": "${document.getElementById("place_storedIn").value}",
        "category_label": "${document.getElementById("category_label").value}",
        "hist_desc": "${document.getElementById("hist_desc").value}",
        "hist_date": "${document.getElementById("hist_date").value}",
        "artifact_type": "${document.getElementById("artifact_type").value}",
        "imgLink": "${document.getElementById("imgLink").value}"
    }`;

    xhr.send(data);
};

//get all from database
function doGetAll(){
    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log("Server Response:" + xhr.status);
        var responseText = xhr.responseText;
        console.log("Response Text:" + responseText);
    }};

    var data = `{}`;

    xhr.send(data);
};

//get one from database via ID
function doGetOneById(){

    //locate via ID
    var data = `${document.getElementById("idTest").value}`;
    console.log(data);

    var url = `/api/catalogs/${data}`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url)
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log("Server Response:" + xhr.status);
            var responseText = xhr.responseText;
            console.log("Response Text:" + responseText);
        }};
    
    xhr.send(data);
}

//delete all from database
function deleteAll(){
    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log("Server Response:" + xhr.status);
        var responseText = xhr.responseText;
        console.log("Response Text:" + responseText);
    }};

    var data = `{}`;

    xhr.send(data);
};

//clear the form
function clearAll(){
    document.getElementById("thing_label").value = "";
    document.getElementById("thing_status").value = "";
    document.getElementById("thing_condition").value = "";
    document.getElementById("person_role").value = "";
    document.getElementById("person_contactInfo").value = "";
    document.getElementById("place_storedIn").value = "";
    document.getElementById("category_label").value = "";
    document.getElementById("hist_desc").value = "";
    document.getElementById("hist_date").value = "";
    document.getElementById("artifact_type").value = "";
    document.getElementById("imgLink").value = "";
}

//TODO: add remainder of buttons for remaining routing functions

//TODO: build "prettify" functions to display returned results in table of some sort
//on index.html and call the needed prettify function at the end of a route that
//returns info we want displayed to the user