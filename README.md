# Stockbuddy

[Link to application](https://nikolaybutnik.github.io/stock-buddy/)

![Stockbuddy Image](https://github.com/nikolaybutnik/stock-buddy/blob/master/images/0-stockbuddy-screenshot.png?raw=true)

## Purpose

Stockbuddy is a web application that aims to help introduce new users to the often confusing world of stocks. The main focus of Stockbuddy is to present the most important data in as straight-forward a way as possible, without cluttering the screen or displaying overly complicated data. Stockbuddy is designed for complete beginners and features a minimal and straightforward user interface to avoid overwhelming the user.

## Instructions

The application includes a search feature where the user can search a stock by symbol. Once a search result appears, it can be pinned to the main workspace with the **Pin Button**.

![Stockbuddy Image](https://github.com/nikolaybutnik/stock-buddy/blob/master/images/1-pin-button.png?raw=true)

The pinned card will display basic information about the stock, and a basic chart showing the stock's performance over the last month. Multiple cards can be pinned and rearranged at will by dragging and dropping if the user wants to compare certain stocks side by side. There is no limit to the number of cards that can be pinned.

![Stockbuddy Image](https://github.com/nikolaybutnik/stock-buddy/blob/master/images/2-main-workspace.png?raw=true)

Stockbuddy also includes a News feature. Upon clicking the **News Button** a sidebar will open, presenting the user with a list of ten latest articles related to the business entity the stock relates to.

![Stockbuddy Image](https://github.com/nikolaybutnik/stock-buddy/blob/master/images/3-news-button.png?raw=true)

The user can scroll through the sidebar to view a heading, publish fate, author, and synopsis of each article. Clicking the **Link To Atricle Button** will open a new tab and display the article on the original website.

![Stockbuddy Image](https://github.com/nikolaybutnik/stock-buddy/blob/master/images/4-news-sidebar.png?raw=true)

As the above image shows, the website is also fully responsive and can be viewed on all devices and screen sizes with no compromise to user experience. Once the user has finished with a particular card, they can click the **X Button** in the top right corner of every card to remove it from the workspace.

## Built With

The following APIs and libraries have been used in the creation of Stockbuddy:

- [Yahoo Finance API:](https://rapidapi.com/apidojo/api/yahoo-finance1) Used for obtaining all relevant data on the searched stock symbols, including current and historical prices.
- [Logo API:](https://clearbit.com/logo) Used to display company logos when a stock symbol is searched.
- [The New York Times API:](https://developer.nytimes.com/) Used to display a list of articles related to the stocks the user pinned.
- [Bulma:](https://bulma.io/) Flexbox-based CSS Framework.
- [Chart.js:](https://www.chartjs.org/) Used to dynamically create graphs based on historical price data obtained from Yahoo Finance API.
- [Sortable.js:](https://sortablejs.github.io/sortablejs/) Used to create rearrangeable cards.
- [Google Fonts:](https://fonts.google.com/) Used to style fonts throughut the site.
- [Font awesome:](https://fontawesome.com/) Used for icons throughut the site.
