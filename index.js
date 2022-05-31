// Adding hover sound for game controls

// for(let i = 0;i<3;i++){
//   document.querySelectorAll(".btn")[i].addEventListener("mouseenter",function(event){
//     var sound1 = new Audio("audioss/button-hover.mp3");
//     sound1.play();
//     console.log(this.innerHTML);
//   });
// }


// Background Music

// const bg_music = new Audio("audioss/background.mp3");
// bg_music.loop = true;
// bg_music.play();

// Dumb shit Google Policy hence all these audio plays are commented....



// Adding Clicking Sound for game controls

document.getElementById("hit").addEventListener("click",function(){
  var sound2 = new Audio("audioss/hit-button.mp3");
  sound2.play();
  // console.log(this.innerHTML); --> DEBUG!
});

document.getElementById("stand").addEventListener("click",function(){

  var sound3 = new Audio("audioss/stand-button.mp3");
  sound3.play();
  // console.log(this.innerHTML); --> DEBUG!
});

document.getElementById("deal").addEventListener("click",function(){
  var sound4 = new Audio("audioss/deal-button.mp3");
  sound4.play();
  // console.log(this.innerHTML); --> DEBUG!
});



// Player's Cards
var player_cards = new Array();

// Dealer's Cards
var dealer_cards = new Array();

//Player's Total Value
var player_value = 0;

//Dealer's Total Value
var dealer_value = 0;

// Player's State
var player_state = '';

// Dealer's State
var dealer_state = '';

//Win Count
var win_count = 0;

// Loose Count
var loose_count = 0;

//Draw Count
var draw_count = 0;

// To make sure the same card doesnt get repeated
var cards_played = [];


// Distributing 2 cards for player and for the Dealer (1 card face-down)

async function startingCards(){

  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("deal").disabled = true;
  document.getElementById("play").disabled = true;

  var tmp = 1;

  while(tmp < 5){

    await delay(500);

    // Card Sound
    var card_sound = new Audio("audioss/hit-button.mp3"); // --> Creating new Audio object everytime for it to execute properly
    card_sound.play();

    var chosen_card = generateCards();

    if(tmp<=2){

      player_cards.push(chosen_card[0]);
      var card_new = document.createElement("card-t");
      card_new.suit = chosen_card[1];
      card_new.rank = chosen_card[2];
      document.getElementById("player-cards").appendChild(card_new);

      // console.log("All the cards the player has: "+player_cards); --> DEBUG!

      player_value = calculateValue(player_cards);
      document.getElementById("player-total").innerText = player_value;

      if(player_value == 21){

        player_state = 'blackjack';

      }

    }
    else if(tmp == 4){

      var card_new = document.createElement("card-t");
      card_new.suit = "0";
      card_new.rank = "0";
      card_new.setAttribute('id','face_down');
      document.getElementById("dealer-cards").appendChild(card_new);

    }
    else{

      dealer_cards.push(chosen_card[0]);
      var card_new = document.createElement("card-t");
      card_new.suit = chosen_card[1];
      card_new.rank = chosen_card[2];
      document.getElementById("dealer-cards").appendChild(card_new);

      dealer_value = calculateValue(dealer_cards);
      document.getElementById("dealer-total").innerText = dealer_value;

    }

    tmp++;

  }

  if(player_state == 'blackjack'){

    var tmp1 = true;

    document.getElementById("player-total").innerText = "BLACK JACK!";
    document.getElementById("player-total").classList.add("blackjacked");

    player_state = 'won';

    var card_sound1 = new Audio("audioss/hit-button.mp3"); // --> Creating new Audio object everytime for it to exwcute properly
    card_sound1.play();

    var chosen_card = generateCards();

    dealer_cards.push(chosen_card[0]);
    var card_new = document.createElement("card-t");
    card_new.suit = chosen_card[1];
    card_new.rank = chosen_card[2];
    if(tmp1){
      document.getElementById("face_down").remove();
      tmp1 = false;
    }
    document.getElementById("dealer-cards").appendChild(card_new);

    dealer_value = calculateValue(dealer_cards);
    document.getElementById("dealer-total").innerText = dealer_value;

    if(dealer_value == 21){

      document.getElementById("dealer-total").innerText = "BLACK JACK!";
      document.getElementById("dealer-total").classList.add("blackjacked");
      player_state = 'draw';

    }

    displayStat(player_state);

  }

  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("deal").disabled = false;
  document.getElementById("play").disabled = true;

}






// Function to generate card for the player when 'HIT' entered

async function generateCardForPlayer(){

  //Cards variable

  var chosen_card = generateCards();

  player_cards.push(chosen_card[0]);
  var card_new = document.createElement("card-t");
  card_new.suit = chosen_card[1];
  card_new.rank = chosen_card[2];
  document.getElementById("player-cards").appendChild(card_new);


  // console.log("All the cards the player has: "+player_cards); --> DEBUG!

  player_value = calculateValue(player_cards);
  document.getElementById("player-total").innerText = player_value;

  // console.log("player total: "+player_value); --> DEBUG!

  if(player_value > 21){

    var tmp1 = true;

    // console.log(player_value); --> DEBUG!

    document.getElementById("player-total").innerText = "BUST!";
    document.getElementById("player-total").classList.add("busted");

    await delay(1000);

    var card_sound = new Audio("audioss/hit-button.mp3"); // --> Creating new Audio object everytime for it to exwcute properly
    card_sound.play();

    var chosen_card = generateCards();

    dealer_cards.push(chosen_card[0]);
    var card_new = document.createElement("card-t");
    card_new.suit = chosen_card[1];
    card_new.rank = chosen_card[2];
    if(tmp1){
      document.getElementById("face_down").remove();
      tmp1 = false;
    }
    document.getElementById("dealer-cards").appendChild(card_new);

    dealer_value = calculateValue(dealer_cards);
    document.getElementById("dealer-total").innerText = dealer_value;

    player_state = 'lost';
    displayStat(player_state);

  }

  else if(player_value == 21){
    document.getElementById("hit").disabled = true;
    generateCardForDealer();
  }

}


// Function to generate card for the dealer when 'STAND' entered

async function generateCardForDealer(){

  document.getElementById("hit").disabled = true;

  var check = false;
  var tmp1 = true;

  do{

    await delay(1000);

    // Card Sound
    var card_sound = new Audio("audioss/hit-button.mp3"); // --> Creating new Audio object everytime for it to exwcute properly
    card_sound.play();

    var chosen_card = generateCards();

    dealer_cards.push(chosen_card[0]);
    var card_new = document.createElement("card-t");
    card_new.suit = chosen_card[1];
    card_new.rank = chosen_card[2];
    if(tmp1){
      document.getElementById("face_down").remove();
      tmp1 = false;
    }
    document.getElementById("dealer-cards").appendChild(card_new);

    dealer_value = calculateValue(dealer_cards);
    document.getElementById("dealer-total").innerText = dealer_value;

    if(dealer_value >= 17){

      if(dealer_value > 21){
        document.getElementById("dealer-total").innerText = "BUST!";
        document.getElementById("dealer-total").classList.add("busted");
        player_state = 'won';
      }

      else if(dealer_value < player_value){
        player_state = 'won';
      }

      else if(dealer_value > player_value){
        player_state = 'lost';
      }

      else if(dealer_value == player_value){
        player_state = 'draw'
      }

      check = true;

      console.log("player value: "+player_value);
      console.log("dealer value: "+dealer_value);
    }

  }while(!check);

  // console.log(player_state); --> DEBUG!

  displayStat(player_state);

}


//Function to display who the WINNER is

async function displayStat(stat){

  await delay(1000);

  if(stat == 'lost'){

    document.getElementById("gameStatus").innerText="Sorry You Lost!";
    document.getElementById("gameStatus").classList.add("lost");

    loose_count+=1;
    document.getElementById("loose-ct").innerText=loose_count;

  }
  else if(stat == "won"){

    document.getElementById("gameStatus").innerText="Congrats You Won!";
    document.getElementById("gameStatus").classList.add("won");

    win_count+=1;
    document.getElementById("win-ct").innerText=win_count;

  }
  else{

    document.getElementById("gameStatus").innerText="It's A Draw!";
    document.getElementById("gameStatus").classList.add("draw");

    draw_count+=1;
    document.getElementById("draw-ct").innerText=draw_count;

  }

  var url = "audioss/"+stat+".mp3";
  var status_sound = new Audio(url);
  status_sound.play();

  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;

}


//Function to reset stuffs when hit 'DEAL'

function startFromBegining(){

  // document.getElementById("player-cards").remove();
  // document.getElementById("dealer-cards").remove();

  const list1 = document.getElementById("player-cards");
  while (list1.hasChildNodes()) {
    list1.removeChild(list1.firstChild);
  }

  const list2 = document.getElementById("dealer-cards");
  while (list2.hasChildNodes()) {
    list2.removeChild(list2.firstChild);
  }

  // All required values to initial

  player_cards = [];
  dealer_cards = [];
  player_value = 0;
  dealer_value = 0;
  player_state = '';
  dealer_state = '';
  cards_played = [];

  document.getElementById("player-total").innerText = 0;
  document.getElementById("dealer-total").innerText = 0;
  document.getElementById("player-total").classList.remove("busted");
  document.getElementById("player-total").classList.remove("blackjacked");
  document.getElementById("dealer-total").classList.remove("busted");
  document.getElementById("dealer-total").classList.remove("blackjacked");

  document.getElementById("gameStatus").innerText="Let's Play!!";
  document.getElementById("gameStatus").classList.remove("lost");
  document.getElementById("gameStatus").classList.remove("won");
  document.getElementById("gameStatus").classList.remove("draw");

  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;

  startingCards();

}


// Function to generate a random card that is not repeated

function generateCards(){

  var tempi = false;
  var random_suit = 0;
  var random_suit = 0;

  while(!tempi){

    var tempp = true;

    random_suit = Math.floor(Math.random()*4);
    random_rank = Math.floor(Math.random()*13)+1;

    for(let i = 0; i < cards_played.length; i++){
      if((cards_played[i][0] == random_suit) && (cards_played[i][1] == random_rank)){
        tempp = false;
        break;
      }
    }

    if(tempp){
      break;
    }
  }

  cards_played.push([random_suit,random_rank]);

  var card_about = {
    suit: random_suit,
    rank: random_rank,
    value: function(){
      switch (this.rank){
      case 1:{
        return [1];
        break;
      }
      case 2:{
        return [2];
        break;
      }
      case 3:{
        return [3];
        break;
      }
      case 4:{
        return [4];
        break;
      }
      case 5:{
        return [5];
        break;
      }
      case 6:{
        return [6];
        break;
      }
      case 7:{
        return [7];
        break;
      }
      case 8:{
        return [8];
        break;
      }
      case 9:{
        return [9];
        break;
      }
      case 10:
      case 11:
      case 12:
      case 13:{
        return [10];
        break;
      }
    }
    }
  };

  return [card_about,random_suit,random_rank];
}


// Function to calculate the total value for the set of cards passed

function calculateValue(delta_cards){

  var temp_total = 0;
  var aces = 0;
  var delta_value = 0;

  for(let i = 0; i < delta_cards.length; i++){

    if(delta_cards[i].rank != 1){
      temp_total += delta_cards[i].value()[0];
    }
    else{
      aces++;
    }

  }

  var aces_val = new Array();
  for (k = 0; k <= aces; k++){

    var value = (k * 11 + (aces - k) * 1)+temp_total;
    aces_val.push(value);

  }

  for(let i = 0;i<aces_val.length;i++){
    if(aces_val[i]>21){
      aces_val.splice(i,1);
    }
  }

  if(aces_val.length == 0){

    delta_value = temp_total;

  }
  else{

    delta_value = aces_val.sort(function(a,b){
      if(a>b){return -1;}
      else{return 1;}
    })[0];

  }

  return delta_value;

}


// Delay Function

function delay(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));

}
