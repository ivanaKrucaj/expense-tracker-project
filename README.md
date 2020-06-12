# Show Me the Money

## Description
Show Me the Money allows users to add transactions (expenses or income) by adding unique names to them, picking different categories, adding the amount in a currency they have chosen, etc. The user can also explore diagrams of their expenses/incomes by category.

## MVP (DOM - CANVAS)
- authorization/authentification
- home page with all transactions listed
- current balance listed
- create transaction
- read all listed transactions
- edit transaction
- explore chart


## Backlog

- add the currency choice at signup
- hide the current balance
- budget page : round diagram with percentage of how much you have spent of your monthly budget and what is left share expenses
- budget repartition diagram per week/month/year
- list of transactions per month
- list of repeated transactions
- future budget (what can I spend next months after repeated transactions and unique transactions I know will arrive)


## Models

- UserModel {username, email, password, currency}
- TransactionModel {type, name, category, amount, date}


## Routes

- '/'  => Landing page
- 'signup'  =>  Sign up page
- 'signin'  =>  Sign in page
- 'home'  =>  Home page
- 'createTrans'  =>  Create a transaction page
- 'editTrans/:id'  =>  Edit a transaction page
- 'diagrams'  =>  diagrams (expenses pie chart and income/expense column chart)


## Links


### GitHub Projects
[GitHub projects](https://github.com/ivanaKrucaj/expense-tracker-project/projects/1)


### Git
- [GitHub Repo](https://github.com/ivanaKrucaj/expense-tracker-project/)
- [Heroku](https://show-me-the-money-tracker.herokuapp.com/)


### Slides
[Google Slides](https://docs.google.com/presentation/d/1bqyMRGaDpcEme-Z8_oahgkc6vWuv0FDDcbWi2v1lxpk/edit?ts=5ee0e233)

