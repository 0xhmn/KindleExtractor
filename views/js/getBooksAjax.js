console.log("ajax file is loaded");

var dbfileInfoPath;
var bookTitle;
var firstRecordDate;
var lastRecordDate;

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
    dbfileInfoPath = encodeURIComponent(data.dbfile.path);

    if (data && tblElement) {
        // show table
        bookSection.removeClass(`d-none`);
        let count = 1;

        data.allbooks.forEach(function (item) {

            var detail = generateDetailForItem(item, count);

            var row = `<tr>` +
                `<td> ${item.title} </td>` +
                `<td> ${item.authors} </td>` +
                `<td>` +
                `<a href="#" id="show_${count}" class="showlink">Show Details</a>` +
                `</td>` +
                `</tr>`

                +
                `<tr class="detailRow">` +
                `<td colspan="3" style="padding: 0rem;">` +
                `<div id="def_${count}" class="detailDiv" style="display: none;">` +
                detail +
                `</div>` +
                `</td>` +
                `</tr>`;

            tblElement.append(row);
            count++;
        })
        loadJquery();
    }
}

function generateDetailForItem(item, count) {
    var totalNumber = item.allwords;
    firstRecordDate = item.formattedMinTime;
    lastRecordDate = item.formattedMaxTime;
    bookTitle = item.title;

    // var resultPageLink = `./result?` +
    //     `dbfile=${dbfileInfoPath}` +
    //     `&&name=${bookTitle}` +
    //     `&&startTime=${firstRecordDate}` +
    //     `&&endTime=${lastRecordDate}`;

    var timepicker =
        `<label for="time-input">Select a Time Period</label>
    <div class="input-group mb-3">
        <input type="text" value="${firstRecordDate} - ${lastRecordDate}" name="daterange" id="time-input-${count}" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
        <input type="hidden" id="name-hidden-input-${count}" name="name-hidden" value="${bookTitle}">
        <div class="input-group-append">
            <button class="word-button-${count} btn btn-outline-secondary" id="word-button" type="button">Get the Words</button>
        </div>
    </div>`;

    var res =
        `<ul class="list-group">
        <li class="list-group-item">Total Words: ${totalNumber}</li>
        <li class="list-group-item">First Word Added: ${firstRecordDate}</li>
        <li class="list-group-item">Last Word Added: ${lastRecordDate}</li>
        <li class="list-group-item">${timepicker}</li>
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

        $(function () {
            $('input[name="daterange"]').daterangepicker({
                opens: 'center'
            }, function (start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            });
        });

        $("button[class^=word-button-]").click(function () {

            var counterList = $(this).attr("class").split(' ')[0].split('-');
            var elementNumbr = counterList[counterList.length - 1];
            console.log(`element ${elementNumbr} is clicked!`);

            var timeInputElement = `#time-input-${elementNumbr}`;

            var value = $(timeInputElement).val().split(" - ");
            firstRecordDate = value[0];
            lastRecordDate = value[1];

            var nameInputElement = `#name-hidden-input-${elementNumbr}`;
            bookTitle = $(nameInputElement).val();
            console.log("book title", bookTitle);

            var resultPageLink = `./result?` +
                `dbfile=${dbfileInfoPath}` +
                `&&name=${bookTitle}` +
                `&&startTime=${firstRecordDate}` +
                `&&endTime=${lastRecordDate}`;

            console.log(firstRecordDate, lastRecordDate);

            window.location.href = resultPageLink;
        });
    });
}