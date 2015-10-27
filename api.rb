require 'sinatra'
require 'sinatra/json'
require 'sinatra/cross_origin'

configure do
	enable :cross_origin
end

# Main data
#
################################
id 		= 0
todo 	= []

# Get items
#
################################
get '/items' do 
	status(200)
	json(todo)
end

# Add an item
#
################################
post '/items' do
	if params['item'] == ""
		status(400)
		json({message: "You have to submit an item"})
	elsif params['item'].length <= 3
		status(400)
		json({message: "Your item should at least contains 4 characters"})		
	else
		status(201)
		id = id + 1
		new_item = { item: params['item'], id: id, status: false }
		todo << new_item
		json({item: new_item, message: 'Item Added'})
	end
end

# Toggle item's status
#
################################
post '/items/:id/toggle' do |id|	
	todo.each do |item|
		if item[:id].to_i == id.to_i
			item['status'] = !item['status']
			status(200)
			return json(item)
		end		
	end

	status(400)
	return json({message: 'you are trying to toggle an item that does not exist : ' + id})
end