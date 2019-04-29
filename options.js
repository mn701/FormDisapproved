$(function(){
    chrome.storage.sync.get('description',function(option){
        $('#description').val(option.description)
    })

    $('#saveDesc').click(function(){
        const description = $('#description').val()
        if (description){
            chrome.storage.sync.set({'description': description}, function(){
                close()
            })
        }
    })
})
