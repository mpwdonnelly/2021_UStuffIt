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

    //clear form
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

    xhr.send(data);
};

function deleteAll() {
    var url = "/api/catalogs";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send();
}