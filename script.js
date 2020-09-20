// Create a div to serve as the main workspace where all the graph cards will be displayed.

// Create a form on the left edge of the screen. Have an input field and a submit button.
// Consider using a nav bar, and making it expandable with a hamburger menu.

// Define a function that takes an object and creates a card with the bare minimum information on the stock that's been searched.
// The card will have the stock code, current price, possibly chnage in price, and a '+' button to add the card to the main workspace.

// When a search is made, make a call to the api and get an object back with information on the stock that's been searched.
// Prepend (to always make the latest result appear on top) the search result to a holder div right below the input field.
// The search result will be in the form of a small card with minimal information as described above.

// Define a function that runs when the '+' button is clicked on the small card. When the function is called, it takes the same object that the small
// card is using, and creates a new card with more information. All the same info from the small card will be included, plus company name and a graph.
// (Possibly something else too?).
// Make the resulting card a draggable element (?). Set boundaries so it can't be dragged beyond the workspace. If there's time, make it resizable.\
// Make sure the card includes a button to connect to another api to search related news, a button that links the stock to the related market, and a
// button that closes the card (make sure the user confirms).
// Consider setting a limit of how many cards can display on the screen at once?

// **Think about how having a draggable element will be affected on mobile. Consider scrapping the idea if it interferes. Remember, mobile first.
// If possible, only enable draggable element on large screens, and do static display for anything smaller.
// If problematic, consider having the cards statically displayed on all screen sizes, and enabling dragging to rearrange order.**

// Resource for draggable elements on mobile: https://github.com/furf/jquery-ui-touch-punch
// It's a Touch Event Support for jQuery UI. Basically, it just wires touch event back to jQuery UI.

// Create a form on the right edge of the screen. Make it expandable with a hamburger menu?

// Define a function that calls a news source api when the 'news' button is clicked on a card. The function will make a call to the news source with the
// related stock, and return an object with information on that stock. The function will display top 10 (?) news hits in the form of cards (define the
// card function separately). Every news card will have a headline, synopsis, date, and a link to the full news article. The hamburger menu can be used to show
// or hide this sidebar.
// Possibly have another search bar at the top of it to make separate search?

// Stock APIs:
// - Alpha Vantage: https://rapidapi.com/alphavantage/api/alpha-vantage/details - real time and historical stock data. Has a free 500 per day quota limit.

// Stock news APIs:
// - Newsapi: https://newsapi.org/ - for news from multiple sources. Can make 500 requests per day for free.

// CSS frameworks:
// - Foundation: https://get.foundation/ - general CSS. Might be a bit too much for our use.
// - Mini.css: https://minicss.org/ - simplified general CSS.
// - Font Awesome: https://fontawesome.com/ - for adding icons.
// - Animate.css: https://animate.style/ - for adding animations.
// - Imagehover.css: https://www.imagehover.io/ - for adding animations on hover.
// - Hint.css: https://kushagra.dev/lab/hint/ - for adding tooltips.

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });