// customs javascript file
// how to update user

// when I click submit button i want show message
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    // it will prevent broswer form reload
    event.preventDefault();

    // we need to serialize data obtained from update_user id 
    var unindexed_array = $("#update_user").serializeArray();
    // console.log(unindexed_array)
    
    // 0: {name: 'id', value: '64cf3f4fe51990b42a98069b'}
    // 1: {name: 'name', value: '1244'}
    // 2: {name: 'email', value: '6280028942'}
    // 3: {name: 'gender', value: 'Male'}
    // 4: {name: 'status', value: 'Active'}
    
    var data = {}

    // first argument retrun data form this array and i will return index form this array
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    // {id: '64cf3f4fe51990b42a98069b', name: '1244', email: '6280028942', gender: 'Male', status: 'Active'}
    
    // request for put updated data 
    var update_data = {
        // it will call api user with id then update function is called top update my data 
        // Put request is made to update data
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    // to print meessage data is updated
    $.ajax(update_data).done(function(response){
        alert("Data Updated Successfully!");
    })

})

// how to delete user data form data base

// do not navigate anywhere for delete we just present at home page
if(window.location.pathname == "/"){
    // for selecting all the classes which need to deleted
    // tag present in index.ejs && show.ejs

    // to select delete button form index.ejs we follow this path .table tbody td (a.delete) anchore tag with delete class
    ondelete = $(".table tbody td a.delete");
    ondelete.click(function(){
        // to get id of current user 
        var id = $(ondelete).attr("data-id")
        
         // it will call api user with id then delete function is called top delete data 
        // Put request is made to update data
        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}