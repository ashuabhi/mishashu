$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://staging.api.awesomeshop.targetrad.com/v1/derby?key=35U57kj73d147779dq7983JM1R48j24MQ48n9oG7og",
        success: function(data){
        	$listingContainer = $("#derbysListing");
            if(data && data.length > 0){
            	for (var itemIndex = 0; itemIndex < data.length; itemIndex++) {
        			var derbyTeam = data[itemIndex];
        			derbyTeam.dateLoaded = new Date(derbyTeam.dateLoaded).toDateString();
        			derbyTeam.rowClass = itemIndex % 2 === 0? 'evenTeam' : 'oddTeam';
        			var teamRow = $('#listingTemplate').tmpl(derbyTeam);
		            $listingContainer.append(teamRow);
        		}
            } else {
            	$listingContainer.append("<tr class=\"noTeam\"><td colspan=\"5\">No team exists !</td></tr>");
            }
        },
        dataType: "json"
    });
});