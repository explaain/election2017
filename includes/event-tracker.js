module.exports = function(eventName){
  try{
    if(MODE==="production"){
      mixpanel.track(eventName);
      console.log('Event "'+eventName+'" has been sent');
    } else {
      console.log('Event "'+eventName+'" occured, but will NOT be sent in dev mode');
    }
  } catch(e){
    console.log('Something bad happened during sending an event "'+eventName+'"');
    console.log(e)
  }
}
