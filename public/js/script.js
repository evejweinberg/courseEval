/* eslint-disable */

// variables to keep track of how many rounds of errors the user endures
let Name_errorCount = false;
let Course_errorCount = false;
let Rating_errorCount = false;
let errorRound = 0;
let quit = true;

// A-B testing the animation. 50/50 chance of it being ON or not
const AnimationOn = Math.round(Math.random());
console.log(`A/B testing: ${ AnimationOn}`);


$('#submit').click(check);
$('.over-it').click(ended);
$('#done').click(submit);

// on 'submit' check for errors
function check() {
  const nameVal = $('#name').val();
  const nameArray = nameVal.split(' ');
  const courseVal = $('#course-name').val();
  const ratingVal = $('#rating').val();

  // if the rating is not two digits....
  if (ratingVal.length < 2) {
    if (AnimationOn) {
      $('#rating').css({ border: '3px red solid' });
    }
    Rating_errorCount = true;
  } else {
    $('#rating').css({ border: '0px red solid' });
  }

  // if the course is not filled out
  if (courseVal.length < 1) {
    if (AnimationOn) {
      $('#course-name').css({ border: '3px red solid' });
    }
    Course_errorCount = true;
  } else {
    $('#course-name').css({ border: '0px red solid' });
    Course_errorCount = false;
  }

  if (nameVal) {
    // check for first capital letter for both words
    nameArray.forEach((name) => {
      if (name[0] != name[0].toUpperCase()) {
        Name_errorCount = true;
      }
    });
  }

  // if the name is not two words
  if (!nameArray || nameArray.length != 2) {
    Name_errorCount = true;
  }


  // style the border red if it's wrong for either reason
  if (Name_errorCount == true) {
    if (AnimationOn) {
      $('#name').css({ border: '3px red solid' });
    }
  } else {
    $('#name').css({ border: '0px red solid' });
  }

  // if any part of the form has an error, shake and push to server, otherwise move on to ended()
  if (Name_errorCount == true || Course_errorCount == true || Rating_errorCount == true) {
    shake();
  } else {
        quit = false;
        ended();
  }
}


// send Request from first form
function sendrequest() {
  const nameVal = $('#name').val();
  const courseVal = $('#course-name').val();
  const ratingVal = $('#rating').val();
  $.ajax({
    url: '/courseevaluation',
    type: 'POST',
    data: {
      username: nameVal,
      coursename: courseVal,
      rating: ratingVal,
    },
    success(response) {
      console.log(response);
    },
  });
}

// send Request fom second form
function sendReview() {
  const nameVal = $('#name').val();
  const sliderVal = $('#slide').val();
  $.ajax({
    url: '/userexperience',
    type: 'POST',
    data: {
      rounds: errorRound,
      quit,
      animationOn: AnimationOn,
      frustration: sliderVal,
    },
    success(response) {
      console.log(response);
    },
  });
}


// shake form
function shake() {
  // if Animation is on, then shake!
  if (AnimationOn) {
    $('#form-test .loss-aversion-box').css({
      animation: 'wiggle 1s 1 ease-out',
    });
    $('#form-test .loss-aversion-box').css({
      'box-shadow': '0px 25px 55px 30px rgba(50,50,50,.2)',
    });

    setTimeout(() => {
      $('#form-test .loss-aversion-box').css({ 'box-shadow': '' });
      $('#form-test .loss-aversion-box').css({ animation: '' });
    }, 1000);

    // if animation is OFF, just convey errors with text
  } else {
    $('.static-message').text('**Fields were wrong :');
    if (Name_errorCount) {
      $('.static-message').append('Name ');
    }
    if (Course_errorCount) {
      $('.static-message').append('Course ');
    }
    if (Rating_errorCount) {
      $('.static-message').append('Rating');
    }
  }

  errorRound++;
  // upon the first error, give them an out
  if (errorRound > 0) {
    $('.over-it').css({ opacity: '1' });
  }

  // reset all variables to false
  Name_errorCount = false;
  Course_errorCount = false;
  Rating_errorCount = false;
}


function ended() {
  // console.log('ended after '+ errorRound + ' rounds');
  // post this number to server, with a unique ID
  // data: {
  // 'id': '####',
  //   'rounds': [integer],
  //   'quit: [boolean],
  //   'animationOn': animationOn,
  //   'frustration': [integer 1-10], dont know yet
  // }
  if(!quit){
      sendrequest();
  }


  // move on to 1 feedback question
   $('.form-text').fadeOut();
  $('#Questionaire').fadeIn('slow');
  $('.over-it').fadeOut();
}

function updateSlider(slideAmount) {
  $('#slider-answer').text(slideAmount);
}


function submit() {
  $('#Questionaire').fadeOut();
  $('#Final').fadeIn('fast');
  sendReview();
}

