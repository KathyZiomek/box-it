<p align="center">
  <img src="./public/favicon.ico" height="25%" width="25%" alt="Box It Logo"/>
</p>

# Box It

Box It is a task list manager web application that gives users a large amount of customization and control over how their task list is displayed and organized. Users can create color-coordinated categories in order to group their tasks, and make unlimited changes to the names, colors, due dates, and completion status of tasks and categories.

- Website: [Box It](https://box-it-b5c6c.web.app/)

## Technologies Used

- [React](https://reactjs.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [React Redux](https://react-redux.js.org/)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [PrimeReact](https://www.primefaces.org/primereact/)

## Features

<hr/>

### Login and Signup

<p>A user can create an account, or log in using an existing account. For users who want to try out the website first, there is an option to try a demo of the website without creating an account.</p>

<!-- <p align="center">
  <img src="./media/01_landing_page.PNG" height="75%" width="75%" alt="Landing Page"/>
</p> -->

|                 Login                 |                 Sign Up                  |
| :-----------------------------------: | :--------------------------------------: |
| ![Login Screen](./media/02_login.PNG) | ![Sign Up Screen](./media/03_signup.PNG) |

### Create a Category

<p>Users can create a category that will be used to keep tasks organized and color-coordinated.</p>

<p align="center">
  <img src="./media/04_create_category.PNG" height="75%" width="75%" alt="Create a Category Page"/>
</p>

### Create a Task

<p>Users can create unlimited tasks, sorting them into categories, and optionally assigning a due date to the task.</p>

<p align="center">
  <img src="./media/05_create_task.PNG" height="75%" width="75%" alt="Create a Task Page"/>
</p>

### Delete All Saved Tasks and Categories

<p>Users have the option to quickly delete all of their saved tasks and categories instead of deleting one by one.</p>

<p align="center">
  <img src="./media/06_delete_all.PNG" height="75%" width="75%" alt="Delete All Page"/>
</p>

### Viewing All Tasks

<p>Users can see all of their tasks and categories displayed at once on the Tasklist page. Here, they are able to filter tasks by completion status, change the completion status of all tasks at once, make edits to tasks and categories, and delete individual tasks and categories.</p>

<p align="center">
  <img src="./media/07_task_list_page.PNG" height="100%" width="100%" alt="Tasklist Page"/>
</p>

#### Editing Categories

<p>Users can edit and delete categories from the Tasklist page</p>

|            Viewing a Cateogry            |
| :--------------------------------------: |
| ![Login Screen](./media/08_category.PNG) |

|                Editing a Category                |
| :----------------------------------------------: |
| ![Login Screen](./media/09_category_editing.PNG) |

<!-- <p align="center">
  <img src="./media/08_category.PNG" height="75%" width="75%" alt="View Category Information"/>
</p>

<p align="center">
  <img src="./media/09_category_editing.PNG" height="75%" width="75%" alt="Editing Category"/>
</p> -->

#### Editing Tasks

<p align="center">
  <img src="./media/10_task.PNG" height="75%" width="75%" alt="View Task Information - With Due Date"/>
</p>

<p align="center">
  <img src="./media/11_task_no_duedate.PNG" height="75%" width="75%" alt="View Task Information - Without Due Date"/>
</p>

<p align="center">
  <img src="./media/12_task_editing.PNG" height="75%" width="75%" alt="Editing Task"/>
</p>

#### Filtering

<p align="center">
  <img src="./media/13_no_active_tasks.PNG" height="75%" width="75%" alt="Filtering - No Active Tasks"/>
</p>

<p align="center">
  <img src="./media/14_no_completed_tasks.PNG" height="75%" width="75%" alt="Filtering - No Completed Tasks"/>
</p>

<p align="center">
  <img src="./media/15_no_tasks_categories.PNG" height="75%" width="75%" alt="Filtering - No Tasks or Categories"/>
</p>

<p align="center">
  <img src="./media/16_empty_category.PNG" height="75%" width="75%" alt="Category With No Tasks"/>
</p>

## Future Features

- Create the "User Settings" page, allowing users to make changes to their accounts, and allowing demo users to connect their instance to a permanent account.

- Implement a calendar page, so that users can track their due dates visually.

- Allow users to track "on-going" tasks - tasks which do not have a set due date, but are re-occurring.
