
function createWordTable(words, definitions) {
    var tblElement = $(`#wordTable`);
    let count = 1;

    words.forEach(item => {
        let word = item.word;
        let usage = item.usage;
        let def = definitions[word];
        var row = 
        `<tr>`
        + `<td scope="row"> ${count} </td>`
        + `<td> ${word} </td>`
        + `<td> ${usage} </td>`
        + `<td><a href="#" id="show_${count}">Show</a></td>`
        + `</tr>`
        
        + `<tr>`
        + `<td colspan="4" style="padding: 0rem;">`
        + `<div id="def_${count}" class="definition" style="display: none;">`
        + def
        + `</div>`
        + `</td>`
        + `</tr>`;

        tblElement.append(row);
        count++;
    });
}
