  var config = {
    apiKey: "AIzaSyDb0T-CgjA1saMszDNyPkDZ8_-x8XdQvj4",
    authDomain: "trainscheduler-eb508.firebaseapp.com",
    databaseURL: "https://trainscheduler-eb508.firebaseio.com",
    projectId: "trainscheduler-eb508",
    storageBucket: "trainscheduler-eb508.appspot.com",
    messagingSenderId: "169511494493"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  //Creating variables to store input text box data
	var name = "";
	var destination = "";
	var firstTrain = "";
	var frequency = "";

  //Creating values to store moment data calculations

  var nextTrain = "";
  var nextTrainFormat = "";
  var minutesAway = "";
  var firstTimeConverted = "";
  var currentTime ="";
  var diffTime ="";
  var tRemainder ="";
  var minutesTillTrain ="";
  var frequency = "";


$("#addTrain").on("click", function(event){
     event.preventDefault();

   // Grab values from text input boxes
      name = $("#name").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = moment($("#firstTrain").val().trim(),"HH:mm").format("X");
      frequency = $("#frequency").val().trim();

      firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
      currentTime = moment();
      diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      tRemainder = diffTime % +frequency;
      minutesTillTrain = +frequency - tRemainder;
      nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");

      var newTrain = {
        name: name,
        destination: destination,
        startTime: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        minutesTillTrain: minutesTillTrain
      };

      database.ref("/trains").push(newTrain);

      $("#trainForm")[0].reset();


  });
//firebase listener
database.ref("/trains").on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  
  var newRow = {
    trainsName:childSnapshot.val().name,
    trainsDestination:childSnapshot.val().destination,
    firstTime:childSnapshot.val().startTime,
    trainsFrequency:childSnapshot.val().frequency,
    trainsNextTrain:childSnapshot.val().nextTrain,
    trainsMinutesTillTrain:childSnapshot.val().minutesTillTrain
  };

  $('#train-table tr:last').after('<tr><td>' + newRow.trainsName + '</td> <td>' + newRow.trainsDestination + '</td> <td>' + newRow.trainsFrequency + '</td> <td>' + newRow.trainsNextTrain + '</td> <td>' + newRow.trainsMinutesTillTrain +'</td></tr>');


});


