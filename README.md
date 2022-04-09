<p align="center">
  <img src="./public/favicon.ico" height="25%" width="25%" alt="Box It Logo"/>
</p>

# Box It

[Box It](https://box-it-b5c6c.web.app/) is a task list manager web application that gives users a large amount of customization and control over how their task list is displayed and organized. Users can create color-coordinated categories to group their tasks. Users can also make unlimited changes to the names, colors, due dates, and completion status of tasks and categories.

- Website: [Box It](https://box-it-b5c6c.web.app/)

## Technologies Used

- [React](https://reactjs.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [PrimeReact](https://www.primefaces.org/primereact/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Features

### Login and Signup

<p>A user can create an account, or log in using an existing account. For users who want to try out the website first, there is an option to try a demo of the website without creating an account.</p>

|                 Login                 |                 Sign Up                  |
| :-----------------------------------: | :--------------------------------------: |
| ![Login Screen](./media/02_login.PNG) | ![Sign Up Screen](./media/03_signup.PNG) |

### Create a Category

<p>Users can create a category that will be used to color-coordinate and organize tasks.</p>

<p align="center">
  <img src="./media/04_create_category.PNG" height="75%" width="75%" alt="Create a Category Page"/>
</p>

### Create a Task

<p>Users can create unlimited tasks, sort them into categories, and optionally assign a due date to the task.</p>

<p align="center">
  <img src="./media/05_create_task.PNG" height="75%" width="75%" alt="Create a Task Page"/>
</p>

### Delete All Saved Tasks and Categories

<p>Users have the option to delete all of their saved tasks and categories with the click of a single button.</p>

<p align="center">
  <img src="./media/06_delete_all.PNG" height="75%" width="75%" alt="Delete All Page"/>
</p>

### Viewing All Tasks

<p>Users can see all of their tasks and categories displayed at once on the Tasklist page. Here, they are able to filter tasks by completion status, change the completion status of all tasks at once, make edits to tasks and categories, and delete tasks and categories.</p>

<p align="center">
  <img src="./media/07_task_list_page.PNG" height="100%" width="100%" alt="Tasklist Page"/>
</p>

#### Editing Categories

<p>Users can edit and delete categories from the Tasklist page.</p>

|               Viewing a Cateogry               |
| :--------------------------------------------: |
| ![Viewing a Category](./media/08_category.PNG) |

|                   Editing a Category                   |
| :----------------------------------------------------: |
| ![Editing a Category](./media/09_category_editing.PNG) |

#### Editing Tasks

<p>Users can edit and delete tasks from the Tasklist page.</p>

|                   Viewing a Task (Due Date)                   |
| :-----------------------------------------------------------: |
| ![View Task Information - With Due Date](./media/10_task.PNG) |

|                        Viewing a Task (No Due Date)                         |
| :-------------------------------------------------------------------------: |
| ![View Task Information - Without Due Date](./media/11_task_no_duedate.PNG) |

|                 Editing a Task                 |
| :--------------------------------------------: |
| ![Editing a Task](./media/12_task_editing.PNG) |

#### Filtering

<p>Users can use the filters to change which tasks are displayed, and also make changes to the completion status of all tasks at once.</p>

|                  Filtering (No Active Tasks)                   |
| :------------------------------------------------------------: |
| ![Filtering - No Active Tasks](./media/13_no_active_tasks.PNG) |

|                    Filtering (No Completed Tasks)                    |
| :------------------------------------------------------------------: |
| ![Filtering - No Completed Tasks](./media/14_no_completed_tasks.PNG) |

|                    Filtering (No Tasks or Categories)                     |
| :-----------------------------------------------------------------------: |
| ![Filtering - No Tasks or Categories](./media/15_no_tasks_categories.PNG) |

|             Viewing a Category with No Tasks             |
| :------------------------------------------------------: |
| ![Category With No Tasks](./media/16_empty_category.PNG) |

## Future Features

- Create the "User Settings" page, giving users the ability to make changes to their accounts. This would also allow demo users to create a permanent account while saving the information entered during their session.

- Create a calendar page, so that users can track their due dates visually.

- Allow users to track "on-going" tasks - these would be tasks which do not have a set due date, but are re-occurring.
