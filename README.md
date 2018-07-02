# Status Report Documentation

## Overview

---

## Usage

- Reporting

  1.  To report the work or task, simply fills out the forms. Course related form is "COURSE" and Administration related form is "ADMINISTRATION." Once filling out the form, click "ADD TASK" and the task will go to Summary. Task can be added to Summary more than one.
  2.  Review the tasks that are added to Summary.
  3.  Type your name on input box. Your name should be showed up automatically
  4.  If everything looks good, click the "SUBMIT" button.

  - TIP: if you are not sure about task categoriy about your work, check course and admin guide on top of the application.

- Searching

---

## Stack

- Front-End: React
- Back-End: Node, Express
- Database: MySql
- API
  - material-ui: Dialog component is used to handle popup menu.
  - react-autosuggest: it is used throughout the application to handle auto-completion.
  - react-table: it is used in search page to show the data in the table.
  - react-transition-group: it is used to animate components.
- CSS Preprocessor: SASS (followed the 7-1 pattern [Information about 7-1](https://sass-guidelin.es/#the-7-1-pattern))

---

## File structure

The application has two main pages which are Report page and Search Page.

- "src" folder has three folders: component, css and img
  - "component" contains javascript files for React.
    - in "component" folder it has three folders: "helper", "report", "search"
    - to change, message on popup menu such as course guide and admin guide, modify Message.js file in helper folder.
  - "css" contains all of the files that are related to styling.
  - "img" contain one png file for the background image.

---

## Server/Database Information

- Test server

  - host: wwwtest.eipd.dcs.wisc.edu
  - user: status_report
  - database: status_report
  - port: 3306
  - password: Ask to server maintainer

- Production server
  - Ask to server maintainer
