({
    /**
     * This function uses apex-class "MyFirstApexClass" to get a link from a castom field by Id.
     * If link ian't empty tries to redirect the page.
     */
	myAction : function(component, event, helper) {
       
        var recordId = component.get("v.recordId");
        var action = component.get('c.sd');     
        action.setParams({accountId:recordId});
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned
                // from the server
                let shop = response.getReturnValue();
              //  alert("|"+shop["WebSiteLink__c"]+"|")
                if(shop["WebSiteLink__c"] === undefined){
                    alert("Can't redirect.WebSiteLink is empty")
                }else{
                     window.location.href = shop["WebSiteLink__c"];
                }
               
                
              
            }
            else if (state === "INCOMPLETE") {
                // do something
       		}
			else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " +
						errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
        });
        // optionally set storable, abortable, background flag here
        // A client-side action could cause multiple events,
        // which could trigger other events and
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
        
     
	}
})