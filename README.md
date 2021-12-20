# uStuffIt V1

##Authors: Alex Snyder, Darrin Schrieber, and Mike Donnelly

#A webapp for keeping track of your stuff.

Dev Stack = Node.js + Express.js + Handlebars.js + Sequelizer.js + Postgres

##Concept

uStuffIt is a simple web app that allows users to create an inventory of theirs that is important
to them in some way. This should allow users to achieve several common goals:

1. Be able to know at a glance what they have, even if they haven't seen an item for years.
2. Be able to know find things quickly, without engaging in physical search.
3. Be able to organize their things and plan future actions in a coordinated fashion, including:
  - Where to store things,
  - How to maintain things, 
  - Know what persons are relevant to each thing, 
  - How much their things are worth,
  - Know about the history of a given thing, 
  - Create contingency plans for their things (sale, trade, move, make insurance claims)

##About the Data Model:

uStuffit uses a simple flat-table data model, where each thing is described by information entered
by users in thirteen text fields. Postgres handles the storage on the backend, with calls from the 
middleware composed using Sequelize and executed by Express JS. 

##About the UI:

uStuffIt has a simple UI designed around a Enter-Modify-Store-Search-Read data dynamic. The nav bar
across the top allows users to instantly select which function they want to interact with, starting
with a universal search input on the main page. A simple About page describes the origin of uStuffIt, 
and a User's Guide describes basic functionality. uStuffIt is interacted with entirely through a
standard web browser, and changes it's configuration appropriately for the size of the browser, with
flexible media queries that reconfigure the pages for type of device--desktop, tablet, or smartphone. 
Inventory can be browsed in any of three configurations: basic info, brief info with thumbnail, and 
text-only list.

User inputs receive basic validation and error checking before execution, to prevent user missteps,
although strong data integrity in the form of authentication and deletion-safe storage are not 
implemented.
