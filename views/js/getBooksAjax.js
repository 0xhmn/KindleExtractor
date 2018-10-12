console.log("ajax file is loaded");

$("form#idFormUpload").submit(function (e) {

    // disable the default action
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
        type: `POST`,
        url: `/get-list`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(`Submission was successful`, data);
            // set data to table
            renderBookName(data);
        },
        error: function (data) {
            console.log(`An error occurred.`);
            console.log(data);
        },
    });
});

function renderBookName(data) {
    var bookSection = $(`#bookDetail`);
    var tblElement = $(`#bookTable`);
    var dbfileInfoPath = encodeURIComponent(data.dbfile.path);
    if (data && tblElement) {
        // show table
        bookSection.removeClass(`d-none`);
        let count = 1;

        data.allbooks.forEach(function(item) {
            var resultLink = `./result?`
            + `dbfile=${dbfileInfoPath}`
            + `&&name=${item.title}`;

            var row = `<tr>`
            + `<td> ${item.title} </td>`
            + `<td> ${item.authors} </td>`
            + `<td>` 
            + `<a href="#" id="show_${count}" class="showlink">Show Details</a>`
            + `</td>`
            + `</tr>`
        
            + `<tr>`
            + `<td colspan="3" style="padding: 0rem;">`
            + `<div id="def_${count}" class="detailRow" style="display: none;">`
            + `<a href="${resultLink}">words</a>`
            + `</div>`
            + `</td>`
            + `</tr>`;
            
            tblElement.append(row);
            count++;
        })
        loadJquery();
    }
}

function loadJquery() {
    $(document).ready(function () {
        $("a[id^=show_]").click(function (event) {
          console.log("show is clicked!");
          $("#def_" + $(this).attr(`id`).substr(5)).slideToggle("slow");
          event.preventDefault();
        })
      });
}