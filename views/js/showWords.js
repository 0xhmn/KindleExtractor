
function createWordTable(words, definitions) {
    var tblElement = $(`#wordTable`);
    let count = 1;

    words.forEach(item => {
        let word = item.word;
        let usage = item.usage;
        let def = definitions[word];

        var row = 
        `<tr>`
        + `<th scope="row"> ${count} </th>`
        + `<td> ${word} </td>`
        + `<td> ${usage} </td>`
        + `<td><a href="#" id="show_${count}">Show</a></td>`
        + `</tr>`
        
        + `<tr>`
        + `<td colspan="4">`
        + `<div id="def_${count}" style="display: none;">`
        + JSON.stringify(def)
        + `</div>`
        + `</td>`
        + `</tr>`;

        tblElement.append(row);
        count++;
    });
}
