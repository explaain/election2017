module.exports = function(eventName,props){
  if(!props||typeof(props)!=='object'){
    props = {};
  }
  try{
    if(MODE==="production"){
      mixpanel.track(eventName,props);
      console.log('Event "'+eventName+'" has been sent');
    } else {
      console.log('Event "'+eventName+'" occured, but will NOT be sent in dev mode');
    }
  } catch(e){
    console.log('Something bad happened during sending an event "'+eventName+'"');
    console.log(e)
  }
}
