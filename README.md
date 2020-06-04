# expense-tracker-project

## Description
The expense tracker app allows users to add transactions (expenses or income) by adding unique names to them, picking different categories, adding the amount in a currency they have chosen, etc. The user can also explore diagrams of their expenses/incomes by months and by category.

## MVP
- authorization/authentification
- home page with all transactions listed
- current balance listed
- create transaction
- edit transaction
- explore chart/diagram


## Backlog

user can add category themselves
pop up with icon when you go over transactions with the mouse
category choosing with square and icons
add the currency choice to each transaction so that it convert
jugmental with error message when you add a certain category or a certain amount or when your balance is a certain amount (hey big spender, david so comedy Gif)
hide the current balance
budget page : round diagram with percentage of how much you have spent of your monthly budget and what is left
share expenses
budget repartition diagram per week/month/year
list of transactions per month
ist of repeated transactions
future budget (what can I spend next months after repeated transactions and unique transactions I know will arrive)


## Models
UserModel {username, email, password, currency}
TransactionModel {type, name, category, amount, date}


## Routes

- '/'  => Landing page
- 'signup'  =>  Sign up page
- 'signin'  =>  Sign in page
- 'home'  =>  Home page
- 'createtransaction'  =>  Create a transaction page
- 'edittransaction'  =>  Edit a transaction page
- 'diagram'  =>  diagrams (expenses pie chart and income/expense column chart)


## Task
Task definition in order of priority


## Links


### Trello
[GitHub projects](https://github.com/ivanaKrucaj/expense-tracker-project/projects/1)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/ivanaKrucaj/expense-tracker-project/)


### Slides

