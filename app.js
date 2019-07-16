window.addEventListener('load', ()=>{
    // let is the same as var 
    let long;
    let lat;
    let tempdesc = document.querySelector('.temp-desc');
    let degree = document.querySelector('.degree');
    let timezone = document.querySelector('.time-zone');
    let temp = document.querySelector('.temp');
    const spanSection = document.querySelector('.temp span')

    
    // check if broswer supports geoloaction 
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            // get the longititude and the latitude 
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // create a constant variable 
            // note the last / 37.826, -1222 is the website lat and long
            // cos problem solve to access location using localhost 
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://dark.sky.api.key/${lat},${long}`;

            // fetch the data 
            fetch(api)
                .then( response => {
                    // convert it to json 
                    return response.json();
                })
                // fetch now the real data 
                .then( data => {
                    console.log(data);
                    // pull out the information from the data object 
                    const {temperature, summary, icon} = data.currently;

                    // set all the need information 
                    degree.textContent = temperature;
                    tempdesc.textContent = summary;
                    timezone.textContent = data.timezone;

                    // formular for celcius
                    let celcius = (temperature -32) * (5/9);

                    // set icon 
                    setIcon(icon, document.querySelector('.icon'));

                    // add an event listener on the temp
                    temp.addEventListener('click', ()=>{
                        // check if the text content is f
                        if(spanSection.textContent ==="f")
                        {
                            spanSection.textContent= "c";
                            degree.textContent = celcius;
                        }
                        else
                        {
                            spanSection.textContent = "f";
                            degree.textContent = temperature;
                        }
                    })
                });
        });
    }

    // function to set icon 
    function setIcon(icon, iconID)
    {
        // const for skyicons 
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // replace with underscore instead of -
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }
})
