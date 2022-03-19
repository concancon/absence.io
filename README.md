# absence.io
## Basics
The challenge is to create a small API for a quiz app where users can create and attempt quizzes. The users should also be able to see some basic stats about their quiz attempts.



## Acceptance criteria
  ### Users can create an account: 
   POST:<br/>
    https://localhost:3000/account/register<br/>
    <br/>
    request.body: <br/>
   ~~~ 
   {
    "userName" : "I'm a username",
    "password" : "I'm a password"
   }  
   ~~~
  <br/>
  
  ### Users can log in: 
   POST:<br/>
    https://localhost:3000/account/login<br/>
    <br/>
    request.body: <br/>
   ~~~ 
   {
    "userName" : "I'm a username",
    "password" : "I'm a password"
   }  
   ~~~
  <br/>
  
### Users can log out
GET:</br>
https://localhost:3000/loggedInOnly/account/logout</br>

 ### Users can create their own quiz with multiple questions & answers.<br/>
   POST:<br/>
   https://localhost:3000/loggedInOnly/quiz<br/>
    
   request.body: <br/>
   ~~~
    {
    "title" : "i'm a quiz title",
    "quizEntries": [
        {
            "question": "im a question",
            "answer": "im an answer"
      
        },
        {
            "question": "im a second question",
            "answer": "im a second answer"
        
        }
      ]
    }
  ~~~
    
 ### Users can manipulate their own quiz 
  POST: <br/>
  https://localhost:3000/loggedInOnly/quiz/:quizId
  ~~~
  {
    "question" : "question to add to quiz",
    "answer" : "answer to add to quiz" 
  }
  ~~~
  
  DELETE: <br/>
  https://localhost:3000/loggedInOnly/quiz/:quizId
  
 
 ### Users can view all their quizes
 GET: <br/>
 https://localhost:3000/loggedInOnly/quiz
 
 ### Users can view a specific quiz
 GET: <br/>
 https://localhost:3000/loggedInOnly/:quizId
 
 ### Users cannot manipulate other users' quiz templates.
    
   1. register two users as described above
   2. login as a user and create a quiz
   3. make a note of the quiz id as provided by the response
   4. logout or simply login as a different user 
   5. try to manipulate the quiz with the id from first user via delete as described above
  
  ### Users can attempt other users' published quizzes as many times as they choose.
  1. first get the quiz questions via:
  GET:<br/>
   https://localhost:3000/loggedInOnly/play/:quizId<br/>
    
  2. then post your answers as follows:
  POST:<br/>
  https://localhost:3000/loggedInOnly/play/:quizId<br/>
    
   request.body: <br/>
   ~~~
    {
    "quizEntries": [
        {
            "question": "im a question",
            "answer": "im an answer"
      
        },
        {
            "question": "im a second question",
            "answer": "im a second answer"
        
        }
      ]
    }
  ~~~
  
  
 ### Users can view basic stats on quiz attempts/completion/scores/etc..
 GET:<br/>
 https://localhost:3000/loggedInOnly/play/
 
 

