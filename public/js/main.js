$(document).ready(function() {
    $('.register_ok').click(function (e) {
    	e.preventDefault();
    	$("#register_error_message").empty();
    	$("#register_success_message").empty();
    	var emailAddress = $("#emailAddress").val();
    	var teamName = $("#teamName").val();
    	var raceType = "";
		var selectedRadio = $(".styledRadio input[type='radio']:checked");
		if (selectedRadio.length > 0) {
		    raceType = selectedRadio.val();
		} else {
			$("#register_error_message").html("Please select race type");
			return;
		}
    	if(!(typeof emailAddress !== "undefined" && $.trim(emailAddress) !== '' && isValidEmail(emailAddress))){
    		console.log("emailAddress: " + emailAddress);
    		$("#register_error_message").html("Please enter a valid email address");
    		return;
    	} else if(!(typeof teamName !== "undefined"  && $.trim(teamName) !== '')){
    		$("#register_error_message").html("Please enter a valid team name");
    		return;
    	}
    	$.ajax({
	        type: "POST",
	        url: "http://staging.api.awesomeshop.targetrad.com/v1/derby?key=35U57kj73d147779dq7983JM1R48j24MQ48n9oG7og",
	        data: {"emailAddress":emailAddress, "teamName":teamName, "raceType":raceType},
	        success: function(data){
	            if(data.status && data.status==="successful"){
	                $("#modal-heading").html("you have been entered. prepare yourself");
	                $("#modal-container").html('<img class="register-confirm" src="../images/Confirm-Graphic.png" alt="you have been entered. prepare yourself"></img>');
	            } else {
	                $("#register_error_message").html(data.message);
	            }
	        },
	        dataType: "json"
	    });
   	});
});



function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}