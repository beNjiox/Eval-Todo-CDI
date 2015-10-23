var url = 'http://localhost:4567/items'

// Interface Functions
//
////////////////////////////////////////
function add_item_to_interface(item)
{
	var markup_status = ''

	if (item['status'] == true)
		markup_status = 'checked=checked'

	var checkbox_markup = "<input type='checkbox' style='margin-right: 5px' onchange='checked' "+ markup_status+" />"

	$("#todo").append("<li><span id='item_"+item['id']+"'>" + item['item'] + "</span></li>")	

	$("#todo li:last").prepend(checkbox_markup).on('change', function(){
		toggle_status(item['id'])
	})
}

function update_counter()
{
	var nb_items = $("ul > li").length
	$("#counter").html(nb_items)
}

function display_items(data)
{
	$("#todo").fadeIn()
	for (i = 0;i < data.length; i++)
	{
		add_item_to_interface(data[i])
	}
}

function my_alert(message, context)
{
	$("#"+context+"-banner").html(message).fadeIn()
	setTimeout(function(){
		$("#"+context+"-banner").fadeOut()
	}, 3000)	
}

function my_alert_success(message)
{
	my_alert(message, "success")
}

function my_alert_error(message)
{
	my_alert(message, "error")
}

function listen_for_new_item()
{
	$("#add").on('click', function(){
		var new_item = $('#item_to_add').val()
		add_item(new_item)
	})
}

// Api communication functions
//
////////////////////////////////////////
function get_items()
{
	$.ajax({
		url: url,
		success: function(data)
		{
			if (data.length == 0)
			{
				$("#empty_todo").fadeIn()
			}
			else
			{
				display_items(data);					
			}
			update_counter()
		}
	})
}

function add_item(item)
{
	$.ajax({
		type: 'post',
		url: url,
		data: { item: item },
		success: function(data){
			if ($("ul > li").length == 0)
			{
				$("#empty_todo").fadeOut()
				$("#todo").fadeIn()
			}

			add_item_to_interface(data['item'])
			console.log(data)
			my_alert_success(data['message'])
			$('#item_to_add').val('')
			$('#item_to_add').focus()
			update_counter()
		},
		error: function(data, res){
			if (data && data.responseJSON)
				my_alert_error(data.responseJSON.message)
		}
	})
}

function toggle_status(id)
{
	$.ajax({
		type: 'POST',
		url: url + '/' + id + '/toggle',
		success: function(){
			
		},
		error: function(data){
			if (data && data.responseJSON)
				alert(data.responseJSON.message)
		}
	})
}


// INIT
//
////////////////////////////////////////
$(document).ready(function(){
	get_items()
	listen_for_new_item()
})