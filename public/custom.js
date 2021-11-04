 const genratreScript = (url) => { 
    var s = document.createElement( 'script' );
  s.setAttribute( 'src', "https://maps.googleapis.com/maps/api/js?key="+url+"&libraries=places&language=en" );  
  document.head.appendChild( s );  
   } 
   let url 
   var that = this 
      fetch('https://stage.phlebotomynetwork.com/map-api-key/', {
  // mode: 'no-cors',
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
},
).then(response => {
  if (response.ok) {
    response.json().then(json => {    
     genratreScript(json?.key) 
    });
  }
});  