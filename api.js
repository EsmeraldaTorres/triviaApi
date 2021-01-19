let correctsAnswers = []

function getCategories() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then((response) => response.json())
        .then((data) => printCategories(data.trivia_categories))
}

function getQuestions() {
    const totalQuestions = document.getElementById('total-questions').value;
    const category = document.getElementById('select-category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}
    `)
        .then((response) => response.json())
        .then((data) => printData(data))
}

function printData(data) {
    let container = document.getElementById('questions-container');
    
    container.innerHTML = ""
    if(data.results.length === 0){
      container.innerHTML += `<div class="padding-top margin-bottom">
                                <div class="justify-content-center align-items-center alert alert-warning" role="alert">
                                  ¡Try another category or answer option, this section is empty!
                                </div>
                              </div>`;
    } else {
    container.innerHTML = `<div class="col-md-12 row justify-content-center">
                              <h2 class="padding-top margin-bottom">${data.results[0].category}</h2>
                           </div>`
    data.results.forEach((element,index) => {
        container.innerHTML += `<div class=" col-md-6 col-lg-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5>${element.question}</h5>                 
                                      ${getAnswers(element,index)}
                                    </div>
                                  </div>
                                </div>`;
    });

    container.innerHTML += `<div class="col-sm-12 row btn-results padding-top margin-bottom">
                              <button onsubmit=" onclick="validate()" class="btn col-sm-7 btn-primary">Results</button>
                            </div>`;}
    correctsAnswers += correctAnswers(data);
}

function getAnswers(elementos, index){
    let elementCorrectA = elementos.correct_answer
    let elementIncorrect = [...elementos.incorrect_answers]

    elementIncorrect.push(elementCorrectA);
    elementIncorrect.sort(function () { return Math.random() - 0.5 });

    let totalAnswers= '';
    elementIncorrect.forEach((answer) => {
        totalAnswers += `<div class="radio mt-3">
                          <label>
                          <input class="radiobtns" value="${answer}" type="radio" name="radio-${index}" required>${answer}</label>
                        </div>`;
        }
    );
    return totalAnswers
}

function validate() {
  let rigths = 0;
  for (let i = 0; i < correctsAnswers.length; i++) {
      const options = document.getElementsByName(`radio-${index}`);
      options.forEach(option => {
          if (option.checked) {
              if (option.value == correctsAnswers[i]) {
                console.log(correctsAnswers)
                  rigths++
              }
          };
      });
  };
  if (rigths === 10) {
      alert('¡GOOD JOB! You have right' + ' ' + rigths + ' ' + 'answers.');
  }
  if (rigths < 10) {
      alert('¡TRY AGAIN! You have right' + ' ' + rigths + ' ' + 'of ' + correctsAnswers.length + ' '  + 'answers.');
  }
}


function printCategories(categories) {
    const categoriesContainer = document.getElementById('select-category');
    categories.forEach((category) => {
        categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}
getCategories()