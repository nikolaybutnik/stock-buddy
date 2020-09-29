// Get reference to HTML elements
let searchBarEl = document.getElementById("search-input-field");
let searchResultEl = document.getElementById("search-result");
let searchBox = document.getElementsByClassName("search-box");
let graphBtn = document.getElementsByClassName("graph-btn");
let draggableCards = document.getElementById("sortable-stocks");
let myChart = document.getElementById("myChart");
let newsBtn = document.getElementsByClassName("openbtn");
let topArticles = document.getElementById("top-articles");
let closeCardBtn = document.getElementsByClassName("close-card-icon");

// Make the cards on screen sortable.
new Sortable(draggableCards, {
  animation: 150,
  ghostClass: "blue-background-class",
});

// Define a click event to call the stock search API.
searchBox[0].addEventListener("submit", function (event) {
  event.preventDefault();
  callApi();
});

// Hook into Yahoo Finance API and pull query-related stock data.
// symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// region = OPTIONAL. One of the following is allowed US|BR|AU|CA|FR|DE|HK|IN|IT|ES|GB|SG
function callApi() {
  let symbol = searchBarEl.value.toUpperCase();
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "50c99f7898mshe81a6f8d184fa61p11be03jsn662898b66433",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      let website = response.summaryProfile.website;
      let logo = "https://logo.clearbit.com/" + website; // Set this as img source.
      let companyName = response.quoteType.longName;
      let currency = response.price.currency;
      let currencySymbol = response.price.currencySymbol;
      let currentPrice = response.price.regularMarketPrice.raw;
      let marketChange = response.quoteData[
        symbol
      ].regularMarketChangePercent.raw.toFixed(1);
      createSearchCard(
        logo,
        companyName,
        currencySymbol,
        currentPrice,
        currency,
        marketChange,
        symbol
      );
    });
}

// Define a function that creates a mini card
function createSearchCard(
  logo,
  companyName,
  currencySymbol,
  currentPrice,
  currency,
  marketChange,
  symbol
) {
  // Define a click event on search card side arrows that calls a function to create a main content card and push it on the screen.
  // Define how the up/down price change arrow will display.
  let arrow = function () {
    if (marketChange > 0) {
      arrow = `<i class="far fa-arrow-alt-circle-up" style="color:lime"></i>`;
    } else if (marketChange < 0) {
      arrow = `<i class="far fa-arrow-alt-circle-down" style="color:red"></i>`;
    }
  };
  arrow();
  const cardHTML = `
    <div class="box" id="search-cards">
      <article class="media" id="main-card-body">
        <div class="media-left">
          <figure class="image">
            <img src=${logo}?size=84 alt="company-logo" id="search-cards-logo"/>
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <h3><strong>${companyName} (${symbol})</strong></h3>
            <p><strong>Current Price: ${currencySymbol}${currentPrice} ${currency}</strong></p>
            <p><strong>Market change: ${marketChange}%</strong> ${arrow}</p>
          </div>
        </div>
        <div id="checkmark" class="media-right">
          <a class="media-right" aria-label="like">
            <button class="icon add-to-workspace" id="add-to-workspace">
              <i class="fas fa-thumbtack" aria-hidden="true" style:"color: white"></i>
            </button>
          </a>
        </div>
      </article>
    </div>`;
  $(searchResultEl).append(cardHTML);
  let addToWorkspaceBtn = document.getElementsByClassName("add-to-workspace");
  // Define a click event for the pin button, that pins search result to main workspace.
  for (let i = 0; i < addToWorkspaceBtn.length; i++) {
    addToWorkspaceBtn[i].addEventListener("click", createMainCard);
  }
}

// Define a function that creates a main content card by clicking a button on a search result, and pushes it to the main workspace.
function createMainCard(event) {
  let logo = event.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
    "src"
  );
  let symbolStr =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.children[1].firstElementChild.firstElementChild
      .textContent;
  let symbolExtracted = symbolStr.slice(symbolStr.length - 5, -1);
  let companyName =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.children[1].firstElementChild.firstElementChild
      .textContent;
  let currentPrice =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.children[1].firstElementChild.children[1]
      .firstElementChild.textContent;
  let marketChange =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.children[1].firstElementChild.children[2]
      .firstElementChild.textContent;
  let arrow =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.children[1].firstElementChild.children[2].children[1]
      .outerHTML;
  // The counter assigns randomized number to chart ids to avoid overwriting the previous chart if another search is made.
  let counter = Math.floor(Math.random() * 10000);
  const cardHTML = `<li class="ui-state-default">
      <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
      <div class="box" id="main-stock-cards">
        <article class="media">
          <div class="media-content" id="stock-info-main-card">
            <div class="content" id="main-card-text">
              <h3><strong>${companyName}</strong></h3>
              <hr class="solid">
              <p><strong>${currentPrice}</strong></p>
              <hr class="solid">
              <p><strong>${marketChange}</strong> ${arrow}</p>
            </div>
            <div class="content" id="main-card-graph">
              <canvas id="myChart-${counter}"></canvas>
            </div>
          </div>
          <ul id="main-card-icons">
            <li>
              <div id="close-btn-main-card" class="media-right">
                <a class="media-right" aria-label="like">
                  <span class="close-card-icon">
                    <i class="fas fa-window-close" aria-hidden="true" style="height: 20px; width:20px; color:#ffffff;"></i>
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="media-right">
                <figure class="image">
                  <img src=${logo}? alt="company-logo" id="main-card-logo"/>
                </figure>
              </div>
            </li>
            <li>
              <button class="openbtn" id="nytimes-sidebar-button" onclick="openNav()">
                <img src="./pngegg.png" alt="News panel" id="nytimes-sidebar-button"/>
              </button>
            </li>
          </ul>
        </article>
      </div>
    </li>`;
  $(draggableCards).append(cardHTML);
  // Define a click event for the news buttons
  for (let i = 0; i < newsBtn.length; i++) {
    newsBtn[i].addEventListener("click", getNews);
  }
  // Define a click event for the close card buttons
  for (let i = 0; i < closeCardBtn.length; i++) {
    closeCardBtn[i].addEventListener("click", closeCard);
  }
  // After a card is pushed to teh screen, call the chart API.
  getChart(symbolExtracted, counter);
}

// Define a function the clears the search result field if entry field is empty.
function clearResult() {
  if (searchBarEl.value.length === 0) {
    searchResultEl.textContent = "";
  }
}

// Hook into Yahoo Finance API and pull query-related stock chart. Use the symbol from lat query.
// Interval = REQUIRED. One of the following is allowed 1m|2m|5m|15m|60m|1d.
// Symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// Range = REQUIRED. One of the following is allowed 1d|5d|1mo|3mo|6mo|1y|2y|5y|10y|ytd|max. Do not use together with period1 and period2.

function getChart(symbolExtracted, counter) {
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?region=US&interval=1d&symbol=${symbolExtracted}&range=1mo`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "50c99f7898mshe81a6f8d184fa61p11be03jsn662898b66433",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let dateArr = response.chart.result[0].timestamp;
      let priceArr = response.chart.result[0].indicators.quote[0].close;

      let myChart = document
        .getElementById(`myChart-${counter}`)
        .getContext("2d");
      let priceChart = new Chart(myChart, {
        type: "line",
        data: {
          labels: dateArr,
          datasets: [
            {
              label: "Price",
              data: priceArr,
              // backgroundColor: "grey",
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    });
}

// Hook into News and pull query-related list of top articles.
function getNews(event) {
  topArticles.textContent = "";
  queryStr =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .firstElementChild.firstElementChild.firstElementChild.firstElementChild
      .textContent;
  query = queryStr.substring(0, queryStr.length - 7);
  url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=news_desk:("Business")&api-key=TwnhAAoEPCGyKCXPd79lmcczuZKOSEyc`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let articleObj = response.response;
      for (let i = 0; i < 10; i++) {
        let article = articleObj.docs[i];
        createCard(article);
      }
      // Define a function that creates a news card
      function createCard(articleObj) {
        const cardHTML = `
          <div class="card">
            <div class="card-body" id="main-news-card">
              <h4 class="card-title">${articleObj.headline.main}</h4>
              <h6 class="card-subtitle mb-2 text-muted">${articleObj.byline.original}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${articleObj.pub_date}</h6>
              <p class="card-text">${articleObj.abstract}</p>
              <a href="${articleObj.web_url}" target="_blank" class="card-link">Link to article</a>
            </div>
          </div>`;
        $(topArticles).append(cardHTML);
      }
    });
}

// Define a function that is triggered by the close button on cards, and removes the <li> element from <ul>
function closeCard(event) {
  let cardObj =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement;
  cardObj.remove();
}

// For local storage, key = position, value = card object. Make an array of positions/objects, and loop to push to screen.
