console.log("ajax file is loaded");

$("form#idFormUpload").submit(function (e) {

    // disable the default action
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
        type: 'POST',
        url: '/get-list',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log('Submission was successful.');
            console.log(data);

            // set data to table
            renderBookName(data);
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
});

function renderBookName(data) {
    var bookSection = $('#bookDetail');
    var tbl = $('#bookTable');
    if (data && tbl) {
        // show table
        bookSection.removeClass('d-none');
        let count = 1;
        data.forEach(function(item) {
            var row = '<tr>'
            + '<th scope="row">' + count + '</th>'
            + '<td>' + item.title + '</td>'
            + '<td>' + item.authors + '</td>';

            tbl.append(row);
            count++;
        })
    }
}