$(document).ready(function(){
    $("#myCarousel").carousel({interval: false});
    $(document).on( "click", ".answer", function () {
        $(this).css("background", "#348017");
        $(this).siblings('.answer').css("background", "#64E986");
        useranswer[this.getAttribute("name")[8]] = 
        	parseInt(this.getAttribute("value"));
    });
});
var app = angular.module('ngSongs', []);
app.controller('songs', function($scope, $http) {
    $scope.genquiz = function(i, url) {
        var quiz = document.getElementById('questions');
        var options =  [$scope.pop[i]['name'],
                        $scope.pop[i + 1]['name'],
                        $scope.pop[i + 2]['name'],
                        $scope.pop[i + 3]['name']];
        var answer = $scope.pop[i]['name'];
        options = shuffle(options);
        for (var j = 0; j < options.length; j++) {
            if (options[j] == answer) {
                $scope.answers.push(j);
            }
        }
        if ( i == 0 ) {
            class_item = "item active";
            autoplay_bool = "autoplay";
        } else {
            class_item = "item";
            autoplay_bool = "";
        }    
        quiz.innerHTML += 
        	"<div class='"+ class_item + "'>" +
        		"<div class = 'panel'>" +
        			"<div class='question'>" +
        				"<p> What song is this? </p>" +
            			"<video id='myVideo" + i/4 + "' name='media' " +
            			       "height=0px width='auto'"+ autoplay_bool +">"
            				+ "<source src='"+url+ "'" +"type='audio/mpeg'>" +
                        "</video>" +
                        "<button type='button' id='"+ i/4 +"' " +
                                "onclick='vid_play_pause(this)'>"
                        	+ "PAUSE" +
                        "</button>" +
                    "</div>" +
                    "<div class='answer' name='question" + i/4 + "' value='0'>"
                    	+ options[0] +
                    "</div>" +
                    "<div class='answer' name='question" + i/4 + "' value='1'>"
                    	+  options[1] +
                    "</div>" +
                    "<div class='answer' name='question" + i/4 + "' value='2'>"
                    	+  options[2] +
                    "</div>" +
                    "<div class='answer' name='question" + i/4 + "' value='3'>"
                    	+  options[3] +
                    "</div>" +
                    "<p class='question_no'>Question: "+ quest_no +" / 10</p>"
                +"</div>"
            +"</div>"
    }
        
    $scope.showresults = function() {
	    correct = 0;
	    for (var i = 0; i < useranswer.length; i++) {
	        if (useranswer[i] == $scope.answers[i]) {
	            correct += 1;
	        }
	    }
	    localStorage.setItem('correct', correct);
	    $scope.sendResults();
    }
    showresults = $scope.showresults;

    $scope.sendResults = function () {
        var player_id = localStorage.getItem("player_id");
        var login = localStorage.getItem('name');
        var genre = localStorage.getItem('genre');
        var score_pop = 0;
        var score_jazz = 0;
        var score_rock = 0;
        var score_country = 0;
        var request = new XMLHttpRequest();
        var url = "https://musiquiz.herokuapp.com/sendResults";
        if (genre == 'POP') {
            score_pop = correct;
        } else if (genre == "JAZZ") {
            score_jazz = correct;
        } else if (genre == "ROCK") {
            score_rock = correct;
        } else if (genre == "COUNTRY") {
            score_country = correct;
        }
        request.open('POST', url, true);
        request.setRequestHeader("Content-type",
        						 "application/x-www-form-urlencoded");
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                window.location = "results.html"
            }
        }
        var params = 
        	"player_name=" + login + "&score_pop=" + score_pop +
        	"&score_rock="+ score_rock +"&score_jazz=" + score_jazz +
        	"&score_country=" + score_country+"&player_id="+player_id;
        request.send(params);
    }
        
    $scope.contactServer = function () {
        var request = new XMLHttpRequest();
        var url = "https://musiquiz.herokuapp.com/quizInfo?";
        var params = "genre="+localStorage.getItem('genre');
        request.open('GET', url+params, true);
        request.setRequestHeader("Content-type",
        						 "application/x-www-form-urlencoded");
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var response = request.responseText;
                parsed_objects = JSON.parse(response);
                $scope.pop = parsed_objects;
                $scope.pop = shuffle($scope.pop);
                $scope.numquestions = ($scope.pop.length > 40) ?
                	10 : ($scope.pop.length/4);
                $scope.answers = [];
                useranswer = [];
                page_no = 0;
                quest_no = 0;
                $scope.contactSpotifyServerCHECK();
            }
        }
        request.send(params);
    }

    $scope.contactSpotifyServerCHECK = function() {
    	requests = []
        for (var i = 0; i < 12; i++) {
        	var req = new XMLHttpRequest()
        	req.open("GET",
        			 "https://api.spotify.com/v1/tracks/" +
        			 	$scope.pop[i * 4]['id'],
        			 true)
        	req.setRequestHeader("Content-type",
            					 "application/x-www-form-urlencoded");
        	requests.push[req]
        }
        for (var i = 0; i < 12; i++) {
        	requests[i].onreadystatechange = function() {
        		if (requests[i].readyState == 4 &&
        			requests[i].status == 200) {
                	var response = requests[i].responseText;
                	var parsed_objects = JSON.parse(response);
                	preview_url = parsed_objects["preview_url"];
                	if (preview_url) {
                	    quest_no++
                	    $scope.genquiz(i * 4, preview_url);
                	}
                	if (quest_no < 10) {
                	    requests[i+1].send();
                	} else {
                	    document.getElementById('questions').innerHTML +=
                	    	"<div class='item'>" +
                	    		'<button class="sub_button" ' +
                	    		        'onclick="showresults()">'
                	    			+'SUBMIT' +
                	    		'</button>' +
                	    	'</div>';
                	}
            	}
        	}
        }
        requests[0].send();
    }
});

// source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function vid_play_pause() {
        var myVideo = document.getElementById("myVideo" + page_no);
        if (myVideo) {
            if (myVideo.paused) {
            myVideo.play();
            } else {
                myVideo.pause();
            }
        }
}

function car_play_pause() {
        var myVideo = document.getElementById("myVideo" + page_no);
        if (myVideo) {
            if (!myVideo.paused) {
                myVideo.pause();
            }
            increment();
        vid_play_pause();
        }
}

function increment() {
    if (page_no == 9) {
        var object = document.getElementsByClassName('right carousel-control')[0];
        object.style.display = "none";
    }
    page_no++;
}
