// Get reference to HTML elements
let searchBarEl = document.getElementById("stockbuddy-search");
let dropdownEl = document.getElementById("dropdown-menu");
let searchBtn = document.getElementById("search-btn");
let draggableCards = document.getElementById("sortable-stocks");

// Make the cards on screen sortable.
new Sortable(draggableCards, {
  animation: 150,
  ghostClass: "blue-background-class",
});

// Hook into Yahoo Finance API and pull query-related stock data.
// symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// region = OPTIONAL. One of the following is allowed US|BR|AU|CA|FR|DE|HK|IN|IT|ES|GB|SG
// ***Make sure to catch errors such as 404 to keeo new card from being created.
function callApi() {
  let symbol = searchBarEl.value.toUpperCase();
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "3d3d6acfdcmshc5411745f4f6fb1p19b934jsn42606b707110",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })

    // *** Catch errors when logo image can't be found (example: McDonalds) and replace with placeholder image.
    .then(function (response) {
      // console.log(response);
      let website = response.summaryProfile.website;
      let logo = "https://logo.clearbit.com/" + website; // Set this as img source.
      let companyName = response.quoteType.longName;
      let currency = response.price.currency;
      let currencySymbol = response.price.currencySymbol;
      let currentPrice = response.price.regularMarketPrice.raw;
      let marketChange = response.quoteData[
        symbol
      ].regularMarketChangePercent.raw.toFixed(1);
      // console.log(marketChange);
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
  searchBarEl.value = "";
}

// function that creates a mini card
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
  // Define how the up/down arrow will display.
  let arrow = function () {
    if (marketChange > 0) {
      arrow = `<i class="far fa-arrow-alt-circle-up" style="color:green"></i>`;
    } else if (marketChange < 0) {
      arrow = `<i class="far fa-arrow-alt-circle-down" style="color:red"></i>`;
    }
  };
  arrow();
  const cardHTML = `
    <div class="box" id="search-cards">
      <article class="media">
        <div class="media-left">
          <figure class="image">
            <img src=${logo}?size=84 alt="company-logo"/>
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <h4><strong>${companyName} (${symbol})</strong></h4>
            <p><strong>Current Price: ${currencySymbol}${currentPrice} ${currency}</strong></p>
            <p><strong>Market change: ${marketChange}%</strong> ${arrow}</p>
          </div>
        </div>
        <div id="checkmark" class="media-right">
          <a class="media-right" aria-label="like">
            <button class="icon add-to-workspace">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </a>
        </div>
      </article>
    </div>`;
  dropdownEl.innerHTML += cardHTML;
  let addToWorkspaceBtn = document.getElementsByClassName("add-to-workspace");
  for (let i = 0; i < addToWorkspaceBtn.length; i++) {
    addToWorkspaceBtn[i].addEventListener("click", createMainCard);
  }
}

// Define a function that creates a main content card by clicking a button on a search result, and pushes it to the main workspace.
function createMainCard(event) {
  let logo = event.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
    "src"
  );
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
  const cardHTML = ` 
    <li class="ui-state-default">
      <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <img src=${logo}?size=84 alt="company-logo"/>
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <h4><strong>${companyName}</strong></h4>
              <p><strong>${currentPrice}</strong></p>
              <p><strong>${marketChange}</strong> ${arrow}</p>
            </div>
          </div>
          <div class="content">
            <div id="close" class="media-right">
              <a class="media-right" aria-label="like">
                <span class="icon is-small">
                  <i class="fas fa-window-close" aria-hidden="true"></i>
                </span>
              </a>
            </div>
            <button class="openbtn" id="nytimes-sidebar-button" onclick="openNav()">
              <img src="./FAVPNG_current-icon-events-icon-news-icon_MPYgZ004.png" alt="News panel" id="nytimes-sidebar-button"/>
            </button>
          </div>
        </article>
      </div>
    </li>`;
  draggableCards.innerHTML += cardHTML;
}

// Define a click event to call the stock search API.
searchBtn.addEventListener("click", callApi);

// Hook into Yahoo Finance API and pull query-related stock chart. Use the symbol from lat query.
// Interval = REQUIRED. One of the following is allowed 1m|2m|5m|15m|60m|1d.
// Symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// Range = REQUIRED. One of the following is allowed 1d|5d|1mo|3mo|6mo|1y|2y|5y|10y|ytd|max. Do not use together with period1 and period2.

// let symbol = "TSLA";

// fetch(
//   `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?region=US&interval=1d&symbol=${symbol}&range=1mo`,
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
//       "x-rapidapi-key": "3d3d6acfdcmshc5411745f4f6fb1p19b934jsn42606b707110",
//     },
//   }
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     console.log(response);
//   });
