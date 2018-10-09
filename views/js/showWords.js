
function sayHello(name) {
    console.log("heellooo!");
}

function createWordTable(words) {
    var tblElement = $('#wordTable');
    let count = 1;

    words.forEach(item => {
        console.log(item);
        var row = '<tr>'
        + '<th scope="row">' + count + '</th>'
        + '<td>' + item.word + '</td>'
        + '<td>' + item.usage + '</td>';

        tblElement.append(row);
        count++;
    });
}