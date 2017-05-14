function addMessageToChat(user, msg, date) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = "Test message<br><small class='text-muted'>"+ user +" | "+ date+"</small><hr>";
	document.getElementById("chat_list").appendChild(li);
}

function addUserToUserList(name, time) {
	var li = document.createElement("li");
	li.className = "media media-body";
	li.innerHTML = "<h5>"+name+"</h5><small class='text-muted'>Online For "+time+"</small>";
	document.getElementById("user_list").appendChild(li);
}
