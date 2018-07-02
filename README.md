# Status Report Documenation

## Overview

---

## Stack

- Front-End: React
- Back-End: Node, Express
- Database: MySql
- API
  - material-ui: Dialog component is used to handle popup menu.
  - react-autosuggest: it is used throughtout the application to handle auto completion.
  - react-table: it is used in search page to show the data in the table.
  - react-transition-group: it is used to animate components.
- CSS Preprocessor: SASS (followed the 7-1 pettern [Information about 7-1](https://sass-guidelin.es/#the-7-1-pattern))

---

## File structure

The application has two main pages which are Report page and Search Page.

- "src" folder has three folders: component, css and img
  - "component" contains javascript files for React.
    - in "component" folder it has three folder: "helper", "report", "search"
    - to change, messge on popup menu such as course guide and admin guide, modify Message.js file in helper folder.
  - "css" contains all of files that are related to styling.
  - "img" contain one png file for the background image.

---

## Server Information

- Test server

  - host: wwwtest.eipd.dcs.wisc.edu
  - user: status_report
  - database: status_report
  - port: 3306
  - password: Ask a server maintainer

- Production server
