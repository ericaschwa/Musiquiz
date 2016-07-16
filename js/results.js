$(document).ready(function() {
	drawScoreChart();
	getScores();
});

function drawScoreChart() {
	// Getting canvas element with jQuery
	var scorectx = $("#scoreChart").get(0).getContext("2d");

	// Score calculations
	totalQuestions = 10;
	var correctScore = localStorage.getItem('correct');
	var incorrectScore = totalQuestions - correctScore;
	
	var scoreData = [
	    {
	        value: correctScore,
	        color:"#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Correct"
	    },
	    {
	        value: incorrectScore,
	        color: "#F7464A",
	        highlight: "#FF5A5E",
	        label: "Incorrect"
	    }
	]
	// set more options,
	// use: http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var scoreOptions = {animateScale: true};
	var pieChart = new Chart(scorectx).Doughnut(scoreData, scoreOptions);
}

function getScores() {

	scoreArray = [];
	genre = localStorage.getItem('genre').toLowerCase();
	db_genre =  "score_"+genre;

	// Getting the data stored
	var request = new XMLHttpRequest();
	var url = "https://musiquiz.herokuapp.com/returnScores";

	request.open('GET', url, true);		
	request.setRequestHeader("Content-type",
							 "application/x-www-form-urlencoded");

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			parsed_objects = JSON.parse(response);
			for (count = 0; count < parsed_objects.length; count++) {
				var score = parsed_objects[count][db_genre];
				scoreArray.push(score);
			}
			drawLineChart();
			genreScores();
		}
	}	
	request.send();
}

function drawLineChart() {

	document.getElementById("lineChartTitle").innerHTML =
		"How did you rank in "+ genre+"?";

	// initializing data array all to 0's	
	var dataArray = [];
	for (var i = 0; i < totalQuestions+1; i++) {
		dataArray[i] = 0;
	}

	for (var i = 0; i < scoreArray.length; i++) {
		var curr = scoreArray[i];
		dataArray[curr] += 1;
	}

	// drawing the chart
	var linectx = $("#lineChart").get(0).getContext("2d");
	var lineData = {
	    labels: ["Score: 0", "Score: 1", "Score: 2", "Score: 3", "Score: 4",
	    		 "Score:  5", "Score: 6", "Score: 7", "Score: 8", "Score: 9",
	    		 "Score: 10"],
	    datasets: [
	        {
	            label: "Score Comparison",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: dataArray
	        }
	    ]
	};
	var lineOptions = {};
	var myLineChart = new Chart(linectx).Line(lineData, lineOptions);
}

function genreScores() {
	var curr_player = localStorage.getItem("player_id");
	console.log("curr player is", curr_player);

	pop = "-";
	jazz = '-';
	rock = '-';
	country = '-';

	for (var i = 0; i < parsed_objects.length; i++) {
		var curr_name = parsed_objects[i]["player_id"];
		if (curr_name == curr_player) {
				pop = parsed_objects[i]["score_pop"];
				jazz = parsed_objects[i]["score_jazz"];
				rock = parsed_objects[i]["score_rock"];
				country = parsed_objects[i]["score_country"];
				console.log("pop ", pop);
				console.log("jazz ", jazz);
				console.log("rock ", rock);
				console.log("country ", country);
				break;
		}
	}

	document.getElementById("pop").innerHTML += "<p>"+ pop + "</p>";
	document.getElementById("jazz").innerHTML += "<p>"+ jazz + "</p>";
	document.getElementById("rock").innerHTML += "<p>"+ rock + "</p>";
	document.getElementById("country").innerHTML += "<p>"+ country + "</p>";

}

function pickQuizRedirect() {
	window.location =
		"http://tuftsdev.github.io/comp20-f2015-team12/pickquiz.html";
}