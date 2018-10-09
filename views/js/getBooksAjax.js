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
            console.log('Submission was successful', data);
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
    var tblElement = $('#bookTable');
    var dbfileInfoPath = encodeURIComponent(data.dbfile.path);
    if (data && tblElement) {
        // show table
        bookSection.removeClass('d-none');
        data.allbooks.forEach(function(item) {
            var row = '<tr id="clickableRow"' 
            + ' onclick="window.location=\'./result?'
            + 'dbfile=' + dbfileInfoPath
            + '&&name=' + item.title
            + '\';\">'
            + '<td>' + item.title + '</td>'
            + '<td>' + item.authors + '</td>';
            
            tblElement.append(row);
        })
    }
}