function doPost(){
    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = `{
        "thing_label": "typewriter",
        "thing_status": "in storage",
        "thing_condition": "new",
        "person_role": "owner",
        "person_contactInfo": "123-333-3333",
        "place_storedIn": "garage",
        "category_label": "antiques",
        "hist_desc": "I got this at a yard sale - good condition.",
        "hist_date": "10/12/2021",
        "artifact_type": "typewriter",
        "imgLink": "www.google.com"
    }`;

    xhr.send(data);
};
function doGet(){
    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = `{}`;

    xhr.send(data);
};

function testFields(){
    console.log(document.getElementById("thing_label").innerText);
    console.log(document.getElementById("thing_label").innerHTML);
}