// array of players/teams
$(document).ready(function() {
  var nbaPlayers = [
    "LeBron James",
    "Steph Curry",
    "James Harden",
    "Russel Westbrook",
    "Klay Thompson",
    "Donovan Mitchell"
  ];

  //  create nbaPlayers array buttons
  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < nbaPlayers.length; i++) {
      //create all buttons
      var a = $("<button>");
      a.addClass("basketball");
      a.attr("data-name", nbaPlayers[i]);
      a.text(nbaPlayers[i]);
      $("#buttons-view").append(a);
    }
  }
  renderButtons();

  //on button click
  $(document).on("click", ".basketball", function() {
    // variable will log the text info for button
    var nbaGifz = $(this).html();
    // console.log(nbaGifz);

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + nbaGifz + "&api_key=878snReDMeTWwM2rQwm8vWIWwN48f1Zb";
    // console.log(queryURL);

    // Creating AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      //console.log(results);
      //empties the div before adding more gifs
      $("#giphy-display").empty();
      for (var j = 0; j < results.length; j++) {
        var imageDiv = $("<div>");
        var imageView = results[j].images.fixed_height.url;
        var still = results[j].images.fixed_height_still.url;
        // console.log(imageView);

        var gifImage = $("<img>")
          .attr("src", still)
          .attr("data-animate", imageView)
          .attr("data-still", still);
        gifImage.attr("data-state", "still");
        $("#giphy-display").prepend(gifImage);
        gifImage.on("click", playGif);

        // Pulling ratings for each movie
        var rating = results[j].rating;
        // console.log(rating);
        var displayRated = $("<p>").text("Rating: " + rating);
        $("#giphy-display").prepend(displayRated);
      } // end for loop
    }); // done response

    //function to animate and pause gifs
    function playGif() {
      var state = $(this).attr("data-state");
      // console.log(state);
      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    } //end of on click function
  }); //end of document on click

  //adding new button to array
  $(document).on("click", "#add-giphy", function() {
    if (
      $("#gif-input")
        .val()
        .trim() == ""
    ) {
      alert("Input can not be left blank");
    } else {
      var newGifs = $("#gif-input")
        .val()
        .trim();
      nbaPlayers.push(newGifs);
      $("#gif-input").val("");
      renderButtons();
      return false;
    }
  });
}); // end click function
