var app = angular.module('chatApp', []);

app.controller('MessageCtrl', function($scope) {
	$scope.messages = [{
		Name: 'George Clooney',
		Message: "The only failure is not to try"
    }];
});

function addMessage() {
	var msg = document.createElement("div");
	msg.className = "chatbox__messages__user-message--ind-message";
	msg.innerHTML = "<p class='name'>" + "Giorgos"
			+ "</p><br/><p class='message'>" + "Hellooo11" + "</p>";
	document.getElementById("chat_panel").appendChild(msg);
}
