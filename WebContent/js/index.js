var nickname;

function addMessageToChat(name, msg, date) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = msg+"<br><small class='text-muted'>"+ name +" | "+ date+"</small><hr>";
	document.getElementById("chat_list").appendChild(li);
}

function addUserToUserList(name) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = "<h5>"+name+"</h5>";
	document.getElementById("user_list").appendChild(li);
}

function sendMessage() {
	var msg = document.getElementById("input_text").value;
	if(msg.trim() == "") return;
	document.getElementById("input_text").value = "";
	$.ajax({
		url: "messageHandler",
		method: "POST",
		data: {name: nickname, message: msg}
	});
}

function waitForMessages() {
	$.ajax({
		url : "messageHandler",
		method : "GET",
		cache: false,
		success : function(data, status, response) {
			var name = response.getResponseHeader("name");
			var date = response.getResponseHeader("Date");
			addMessageToChat(name, data, date);
			waitForMessages();
		}
	});
}

function waitForNewUsers() {
	$.ajax({
		url : "userHandler",
		method : "GET",
		data: {event: "new user"},
		cache: false,
		success : function(data, status, response) {
			var name = response.getResponseHeader("name");
			addUserToUserList(name);
			waitForNewUsers();
		}
	});
}

function getOnlineUsers() {
	$.ajax({
		url: "userHandler",
		method: "GET",
		data: {event: "online users"},
		cache: false,
		success : function(data) {
			var users = JSON.parse(data);
			for(var i = 0;i < users.length;i++) {
				addUserToUserList(users[i]);
			}
		}
	});
}

$(document).ready(function(){
    do{
    	nickname = prompt("Please enter a nickname", "");
    }while(nickname.trim() == "");
    
    $.ajax({
		url: "userHandler",
		method: "POST",
		data: {name: nickname}
	});
	
	$("#input_text").keyup(function(event) {
	    if(event.keyCode == 13) { //enter key
	    	sendMessage();
	    }
	});
    
	getOnlineUsers();
	waitForNewUsers();
	waitForMessages();
});


