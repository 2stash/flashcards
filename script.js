const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");
const editBtn = document.getElementById("edit");
const addCardBtnName = document.getElementById("add-span");
const deleteBtn = document.getElementById("delete");

// Keep track of current card
let currentActiveCard = 0;

let edit = false;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index))
}

// Create a single card in DOM
function createCard(data, index){
  const card = document.createElement('div');
  card.classList.add('card');

  if(index === 0){
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p class="card-text">${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p class="card-text">${data.answer}</p>
    </div>
  </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'))

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();

}

// Show number of cards
function updateCurrentText () {
  currentEl.innerText = `${currentActiveCard +1}/${cardsEl.length}`
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage 
function setCardsData(cards){
  localStorage.setItem('cards', JSON.stringify(cards))
  window.location.reload();
}

createCards();

// Event Listeners

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className='card left';
  currentActiveCard = currentActiveCard +1;

  if(currentActiveCard > cardsEl.length -1){
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
})

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className='card right';
  currentActiveCard = currentActiveCard - 1;

  if(currentActiveCard < 0){
    currentActiveCard = cardsEl.length -1 ;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
})

// Edit button
editBtn.addEventListener('click', () => {
  edit = true;
  addCardBtnName.innerText = "Edit Card"
  addContainer.classList.add('show')
  questionEl.innerText = `${cardsData[currentActiveCard].question}`;
  answerEl.innerText =`${cardsData[currentActiveCard].answer}`;
})

// Show add card container
showBtn.addEventListener('click', () => {
  addCardBtnName.innerText = "Add Card"
  addContainer.classList.add('show')
}
)

// Hide add card container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))

// Add new card
addCardBtn.addEventListener('click', () => {

  const question = questionEl.value;
  const answer = answerEl.value;

  if(question.trim() && answer.trim()){
    const newCard = {question, answer};

    if(edit === false){
      createCard(newCard);
      cardsData.push(newCard);
    }

    if(edit === true ){
      cardsData[currentActiveCard] = newCard;
      edit = false
     }
    setCardsData(cardsData);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
  }
})

// Clear cards button
clearBtn.addEventListener('click', () => {

  if(window.confirm("Are you sure you want to delete all cards?")){
    localStorage.removeItem('cards');
    cardsContainer.innerHTML = '';
    window.location.reload();
  }

})


//Delete cards button
deleteBtn.addEventListener('click', () => {
  cardsData.splice(currentActiveCard, 1)
  setCardsData(cardsData)
})