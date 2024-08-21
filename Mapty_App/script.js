class workout
{   
    date = new Date();
    id = (Date.now()+"".slice(-10))
    constructor(coords,duration,distance,val,type)
    {
        this.coords = coords;
        this.duration = duration;
        this.distance = distance;
        this.val = val;
        this.type = type;
        
    }
    setdescription()
    {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.describ = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;

        console.log(this.describ)
    }
}

class running extends workout
{
constructor(coords,duration,distance,elevation,type)
{
    type = "running";
    super(coords,duration,distance,elevation,type)
    this._speedfind();
    this.setdescription()
}
_speedfind()
{
    this.speed = this.distance/(this.duration/60);
    
    return(this.pace)
}
}
class cycling extends workout
{
constructor(coords,duration,distance,candence,type)
{
    type = "cycling";
    super(coords,duration,distance,candence,type)
    this._pacefind();
    this.setdescription()
}
_pacefind()
{
    this.pace = this.distance/this.duration;
    
    return(this.pace)
}
}

var inputBox = document.querySelector(".form-set");
var duration = document.querySelector(".input-dura");
var distance = document.querySelector(".input-dis");
var elevation = document.querySelector(".input-elev");
var candence = document.querySelector(".input-cand");
var input_type = document.querySelector(".input-type");
var input_elev = document.querySelector(".form-1");
var input_cand = document.querySelector(".form-2")
var form = document.querySelector(".form-set")
var form1 = document.querySelector(".workout-bar")
console.log(inputBox)

var mapg
var markeroption
var coords_po
var coords_ma
class Map1
{ 
    #map
    constructor()
    {
        console.log(this)
        this._getpositon();
        form.addEventListener('submit',this._createworkout.bind(this))
        input_type.addEventListener('change',this.toggle_event) 
}
_getpositon()
{
    console.log(this)
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
    this._getmap.bind(this),
function()
{
console.log("you cannot")
})
}
_getmap(position)
    {
        var {latitude} = position.coords;
        var {longitude} = position.coords;
        var coords =[latitude,longitude];
        coords_po = coords
        this.#map = L.map('map').setView(coords_po, 13);
    
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.#map);
mapg = this.#map;
 console.log(this.#map)
 this.#map.on('click',function(mapE){ 
    coords_ma=[mapE.latlng.lat,mapE.latlng.lng]
    
    console.log(mapE)
    console.log(coords_ma)
    inputBox.classList.remove("hidden");
    distance.focus()
 })
    }
    _createworkout(e)
{
    e.preventDefault()
var validinput = (...input) => input.every(inp=>Number.isFinite(inp))
const validInputs = (...inputs) =>
    inputs.every(inp => Number.isFinite(inp));
  const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    var [lat,lang] = coords_ma;
    var duration_val = +duration.value;
    var distance_val = +distance.value;
    var type_val = input_type.value;
    if(type_val ==='running')
        {
            console.log(type_val)
            var elevation_val = +elevation.value;
            console.log(validinput)
             console.log(!validinput(duration_val,distance_val,elevation_val))
             if (
                !validInputs(distance_val, duration_val, elevation_val) ||
                !allPositive(distance_val, duration_val)
              )
                return alert('Inputs have to be positive numbers!');
            var workout = new running([lat,lang],duration_val,distance_val,elevation_val,type_val)
            
        }
    console.log(duration_val)

if(type_val ==='cycling')
    {
        console.log(type_val)
        var candence_val = +candence.value;
        console.log(validinput)
         console.log(!validinput(duration_val,distance_val,candence_val))
         if (
            !validInputs(distance_val, duration_val, candence_val) ||
            !allPositive(distance_val, duration_val,candence_val)
          )
            return alert('Inputs have to be positive numbers!');
        var workout = new cycling ([lat,lang],duration_val,distance_val,candence_val,type_val)
       
        
    }
console.log(duration_val)

this.markercreate(workout);
this.create_workout_panel(workout);
this.hidden_form()

}
hidden_form()
{
     distance.value=duration.value=elevation.value=candence.value="";
    inputBox.classList.add("hidden")

}
markercreate(work)
{

    console.log(work)
    var lat = work.coords[0];
    var lng = work.coords[1];
    var markerCoords = [lat,lng]
    console.log(markerCoords)
     
     L.marker(markerCoords).addTo(mapg)
     .bindPopup(L.popup({
         maxWidth:300,
         maxHeight:300,
         closePopupOnClick:"false",
         content:`${work.describ}`
     }))
     .openPopup();
         
}
create_workout_panel(work)
{
    console.log(work)
    var html = `<li class="workout-panel workout-${work.type}" data-id ="${work.id}">
        <h2 class="workout-h2">${work.describ}</h2>
        <div class="workout-detail">
        <div class="workout-details">
          <span class="workout-icon">${work.type==="running"?'🏃‍♂️':'🚴‍♀️'}</span>
          <span class="workout-value">${work.distance}</span>
          <span class="workout-speed">km</span>
        </div>
      

        <div class="workout-details">
          <span class="workout-icon"> ⏱</span>
          <span class="workout-value">${work.duration}</span>
          <span class="workout-speed">min</span>
        </div>
        

        <div class="workout-details">
          <span class="workout-icon"> ⚡️</span>
          <span class="workout-value">${work.val}</span>
          <span class="workout-speed">min/km</span>
        </div>
        
`;
    if(work.type==="running")
        {
        html=html+`<div class="workout-details">
          <span class="workout-icon"> 🦶🏼</span>
          <span class="workout-value">${work.val} </span>
          <span class="workout-speed">spm</span>
        </div>
      </li>`
        }
        if(work.type==="cycling")
         {
            html=html+`<div class="workout-details">
            <span class="workout-icon"> ⛰</span>
            <span class="workout-value">${work.val} </span>
            <span class="workout-speed">spm</span>
          </div>
        </li>`
       
         }
         form.insertAdjacentHTML('afterend',html)
}
toggle_event()
{
 input_elev.classList.toggle('form-row-hide')
 input_cand.classList.toggle('form-row-hide')
 console.log("ns")
}
}

var CR = new Map1
    /*
The code below will change
the heading with id = "myH"
and the paragraph with id = "myP"
in my web page:
*/
 /*
map.on('click',function(Maptareget)
{
    
 inputBox.classList.remove("hidden")
distance.focus()
 markeroption = {...Maptareget.latlng};
console.log(markeroption.lat)
})

    },
    function()
    {
        alert("could not")
    }
)
    console.log(a)
    console.log(navigator.geolocation)

inputBox.addEventListener('keydown',function(e)
{
    if(e.key ==='Enter')
        {
           
    e.preventDefault;
   lat = markeroption.lat
   lng = markeroption.lng
   markerCoords = [lat,lng]
   console.log(markerCoords)
    
    L.marker(markerCoords).addTo(mapg)
    .bindPopup(L.popup({
        maxWidth:300,
        maxHeight:300,
        closePopupOnClick:"false",
        content:`This Map project`
    }))
    .openPopup();
        }
})
*/
    
a=["1",'2','3'];
console.log(isFinite(Number(a[0])))