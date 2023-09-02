// Example of preventing default behavior
document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
  radio.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior
    // Your radio button click handling code here
  });
});


// function to validate class based on airline
document.addEventListener("DOMContentLoaded", function() {
  const airlineSelect = document.getElementById("airline");
  const businessRadio = document.getElementById("bussi");
  
  // Function to enable/disable the business radio button based on the selected airline
  function updateBusinessRadio() {
      if (airlineSelect.value === "Vistara" || airlineSelect.value === "Air_India") {
          businessRadio.disabled = false;
           // Reset the selection
      } else {
          businessRadio.checked = false;
          businessRadio.disabled = true;
      }
  }
  
  // Event listener for airline selection
  airlineSelect.addEventListener("change", updateBusinessRadio);
  
  // Initialize the state of the business radio button
  updateBusinessRadio();
  
  // Event listener for business radio button selection
  businessRadio.addEventListener("change", function() {
      if (businessRadio.checked) {
          updateBusinessRadio();
      }
  });
});


// validate selected source and destination
document.addEventListener("DOMContentLoaded", function() {
  const sourceSelect = document.getElementById("source");
  const destSelect = document.getElementById("dest");

  // Disable the destination dropdown by default
  destSelect.disabled = true;

  // Function to update the options based on the selected source and destination
  function updateOptions() {
      const selectedSource = sourceSelect.value;

      // Enable or disable the destination dropdown based on whether a source is selected
      destSelect.disabled = !selectedSource;

      // Enable all options first
      const allOptions = document.querySelectorAll("select.airline option");
      allOptions.forEach(function(option) {
          option.disabled = false;
      });

      // Disable options that match the selected source in the destination dropdown
      const destOptions = destSelect.querySelectorAll("option");
      destOptions.forEach(function(option) {
          if (selectedSource && option.value === selectedSource + "_d") {
              option.disabled = true;
          }
      });
  }

  // Event listener for source and destination selections
  sourceSelect.addEventListener("change", updateOptions);
  destSelect.addEventListener("change", updateOptions);
});




// gathering input for prediction
function get_days_left() {
  var inpt = document.getElementsByName("inpt")[0].value;

        return parseInt(inpt);
    }
function get_stops()
{
var uistops=document.getElementsByName("stop")
for (var i=0;i<uistops.length;i++){
  if(uistops[i].checked){
    return uistops[i].value
  }
}
}

function get_cls()
{
var uicls=document.getElementsByName("classes")
for (var i=0;i<uicls.length;i++){
  if(uicls[i].checked){
    console.log(uicls[i].value)
    return uicls[i].value
    
  }
}
}


  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var airline = document.getElementById('airline');
    var source = document.getElementById('source');
    var dest = document.getElementById('dest');
    var dept = document.getElementById('dept');
    var arrv = document.getElementById('arrv');
    var stop= get_stops();
    var classes=get_cls();
    var days_left=get_days_left();
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //  var url = "/api/predict_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
      
      airline:airline.value,
      source_city:source.value,
      days_left:days_left,
      class:classes,
      stops:stop,
      destination_city:dest.value,
      arrival_time:arrv.value,
      departure_time:dept.value
  },function(data, status) {
      console.log(data.predicted_price);
      estPrice.innerHTML = '<h2 class="result">INR ' + data.predicted_price.toString() + '</h2>';
      console.log(status);
  });
  }

 