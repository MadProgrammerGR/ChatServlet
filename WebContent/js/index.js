var nickname;

function addMessageToChat(name, msg, date) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = msg+"<br><small class='text-muted'>"+ name +" | "+ date+"</small><hr>";
	document.getElementById("chat_list").appendChild(li);
}

function addUserToUserList(name, time) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = "<h5>"+name+"</h5><small class='text-muted'>Online For "+time+"</small>";
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
		success : function(data, status, response) {
			var name = response.getResponseHeader("name");
			var date = response.getResponseHeader("Date")
			addMessageToChat(name, data, date);
			waitForMessages();
		}
	});
}

$(document).ready(function(){
    do{
    	nickname = prompt("Please enter a nickname", "");
    }while(nickname.trim() == "");
	
	$("#input_text").keyup(function(event) {
	    if(event.keyCode == 13) { //enter key
	    	sendMessage();
	    }
	});
    
	waitForMessages();
});


