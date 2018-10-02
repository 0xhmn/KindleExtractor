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
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
});