'use strict';



async function getGames() {



  try {

    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '45fdb60f5dmsh1c8d9b1c172c63bp1f82f1jsncdb257145b20',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result)
    displayGames(result);

  }

  catch (error) {
    console.error(error);
  }
}

getGames();

function displayGames(data) {

  let displaycont = document.getElementById('displaycont');

  let displaycard = '';

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {



      displaycard += `<div id="${data[i].id}" class="gamecard  col-md-3  ">
    <div class="gcbody  rounded-2 ">
      <figure>
        <img src="${data[i].thumbnail}" class="w-100" alt>
      </figure>
      <div class="figurecaption ">
        <div class="figurecaption1 d-flex justify-content-between">
          <h3 class="h6 small">${data[i].title}
          </h3>
          <span
            class="bg-info border-1 rounded-1 h6 small p-1">Free</span>
        </div>
        <p class="text-center">${data[i].short_description}</p>
      </div>
    </div>
    <div class="gcinfo ">
      <footer class=" gcfooter rounded-2 d-flex justify-content-between">
        <span>${data[i].genre}</span>
        <span>${data[i].platform}</span>
        <div class="">${data[i].id}</div>
      </footer> 
    </div>

  </div>
  `
      displaycont.innerHTML = displaycard;





      $('.gamecard').click(function () { displayGamesDetail(this.id); },);
      $('.gamecard').hover(
        function () {
          $(this).css('transform', 'scale(1.03)').css('transition', 'transform 0.6s');
        },
        function () {
          $(this).css('transform', 'scale(1)').css('transition', 'transform 0.6s');
        }
      );


    };

  } else {
    console.error('Unexpected result format:');
  }

}





async function displayGamesDetail(keylog) {

  try {


    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${keylog}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '45fdb60f5dmsh1c8d9b1c172c63bp1f82f1jsncdb257145b20',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    let result = await response.json();
    console.log(result);


    let displayDeatails = document.getElementById('displayDeatails');

    $('#displaycont').addClass('d-none');
    $('#section2').removeClass('d-none');
    let displaycarddetail = '';

    displaycarddetail += `<div id="displayDeatails" class="displayDeatails">
      <div class="container">
        <header2 class="d-flex justify-content-between align-content-center mt-2">
          <h3 class="">Game Details</h3>
          <button id="closebtn" class="btn btn-close text-bg-danger"></button>
        </header2>
        <div class="detailsCon d-flex mt-4">
          <div class=" col-md-4 p-2">
            <img class="w-100" src="${result.thumbnail}" alt="">
          </div>
          <div class=" col-md-8 p-2">
            <h3 class="">Game Title:- ${result.title} </h3>
            <p>Category : <span>${result.genre}</span></p>
            <p>Platform : <span>${result.platform}</span></p>
            <p>Status : <span>${result.status}</span></p>
            <p><span>${result.description}</span></p>
            <a class="btn btn-outline-danger"  href="${result.game_url}">Show Me</a>
          </div>
        </div>
      </div>
      </div>
        `
    displayDeatails.innerHTML = displaycarddetail;

    $('#closebtn').click(function () {

      $('#section2').addClass('d-none');
      $('#displaycont').removeClass('d-none');
      getGames()
    });

  }
  catch (error) { console.error(error) };


}



$('#MMORPG , #SHOOTER , #SAILING , #PERMADEATH , #SUPERHERO , #PIXEL').click(function () {
  var lowerCaseClass = $(this).attr('id').toLowerCase();
  navLinksGet(lowerCaseClass);
});





async function navLinksGet(gCat) {


  try {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${gCat}&sort-by=release-date`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '45fdb60f5dmsh1c8d9b1c172c63bp1f82f1jsncdb257145b20',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    displayGames(result)

  } catch (error) {
    console.error(error);
  }



}





