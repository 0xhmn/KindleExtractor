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

            var detail = generateDetailForItem(item);

            console.log("book detail", detail);

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
            + detail
            + `</div>`
            + `</td>`
            + `</tr>`;
            
            tblElement.append(row);
            count++;
        })
        loadJquery();
    }
}

function generateDetailForItem(item, dbfileInfoPath) {
    var count = item.allwords;
    var firstRecordDate = item.mintime;
    var lastRecordDate = item.maxtime;
    var title = item.title;

    var resultPageLink = `./result?`
    + `dbfile=${dbfileInfoPath}`
    + `&&name=${title}`;

    var res = 
    `<ul class="list-group">
        <li class="list-group-item">Total Words: ${count}</li>
        <li class="list-group-item">First Word Added: ${firstRecordDate}</li>
        <li class="list-group-item">Last Word Added: ${lastRecordDate}</li>
        <a class="list-group-item list-group-item-info" href="${resultPageLink}">words</a>
    </ul>`;

    return res;
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