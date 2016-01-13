===============================================================================
					COMP 20 -  Semester Group Project
						Project Proposal and Design
								10/20/2015
	Team 12
		Erica Schwartz
		Elif Kinli
		Jade Chan
		Ogul Girgin
===============================================================================
	PROJECT TITLE : 					MUSIQUIZ
-------------------------------------------------------------------------------
	PROBLEM STATEMENT:
	-We are implementing a song-specific version of the “Quiz-up” app: 

	Users will take quizzes that ask them to match a song that’s playing to its
	title. Users will be able to compete for the high scores, and will also be
	able to challenge their friends to take a quiz through facebook message
	sending. The songs for the quiz questions will be randomly chosen from a
	category of songs that the user choses (jazz, pop, rock, etc.)

-------------------------------------------------------------------------------
	HOW DO YOU SOLVE THE PROBLEM?

	By using the Spotify API to retrieve playlists, songs, and song titles 
	from distinct genres of music, we are planning to generate random quiz 
	questions.

	According to how many questions the user answers correctly, the user will 
	be given a score, which will get stored in the server-side data persistence 
	using MongoDB. Facebook API Login will be used in order to keep track of 
	user IDs.
-------------------------------------------------------------------------------
	LIST OF FEATURES:
		We will implement music quizzes. The five items that we pick include:
			- Server-side data persistence to keep track of information about 
			users and their high scores
			- Client-side data persistence, the genre information and user
			score information will persist through the app's different windows. 
			- Front-end framework, bootstrap, to make the website look
			appealing as well as AngularJS to implement our quiz generation.
			- Send facebook message function that allows users to challenge
			their friends on facebook to take a quiz
			- Reporting users’ scores and genre-specific high scores with 
			charts and graphs

-------------------------------------------------------------------------------
	WHAT DATA WILL YOUR PROTOTYPE BE USING AND COLLECTING?
			- Users’ facebook login info
			- Users’ scores for each genre. 
			- Playlists, songs, their titles.

-------------------------------------------------------------------------------
	ANY ALGORITHMS OR SPECIAL TECHNIQUES THAT WILL BE NECESSARY 
			- We’ll be taking advantage of the algorithms that we’ve learned in 
			class so far.

===============================================================================
#Comments by Ming
* So far, this is the best proposal I have seen.  Simple, yet to the point.
