# Books For You
Books For You is a book site.

Divided into categories of: adult books, children's books, cookbooks, comic books, Moosar and Torah.

Each category has a separate path.

**Nav Bar**:

The Nab Bar displays all the categories and clicking on a category sends it to its path.

The Nav Bar also has relevant information with appropriate icons:

* Username - only displayed if there is a user registered in the system as the current user. When standing on the username or icon on which all the user's information will be displayed as well as an "Exit" button. By clicking on this button the system removes the current user and will not be a current user until "registration" or "login" is performed
* Registration - Clicking on this button will open a model of registration form for the system.
    
    Validations: When entering the site there are no existing validations, the form is clean. Validations of incorrect data will be displayed as soon as the user starts typing the data until the data matches the regular expressions in the validation file. Validations of "This field is required" will only be displayed if the user started entering data and then deleted it or submitted the form.

    The registration is also a login and if the registration was successful the current user will be the one who filled out the form.

    If the registration was successful the user will register as the current user as explained below on how to save the data and the model will close.

    There are also validations on the client side to keep rendering of validations fast. Server side validations are performed only upon submission and depending on the returned answer the registration is performed or not.
    
    Every user who logs in is saved in Mongo DB, even after logging out

* Login - Clicking this button will open a model. This button allows users who are logged in to the system and log out to re-register. The form opened in the model has only 2 input fields, a field for entering the ID card and a field for entering a password. The system checks the match of the ID number for the password and in case of a match the user will register as the current user, and the model will close.

* Cart - Clicking on the cart redirects to: '/cart' where the products that the user has added to the cart are displayed.
Next to the cart symbol is a small number in a circle that indicates the amount of products in the cart. The circle will only appear if the quantity of products is greater than zero.

* Go to the home page

The nav bar clings to the top of the screen as well as scrolling.

The selected category is noticeable from the other categories.

**For each category:** A list of the books in this category is displayed. The display is by `grid` which allows the display of the books in a convenient way.

**For each book:** a picture of the book, name, author and price is displayed. In addition, there is a "Add to cart" button by which the user can add the selected item to the cart.

For an item that has already been added to the cart, the "Add to Cart" button will no longer be displayed, but 2 buttons: adding the same item or subtracting such an item from the cart. Among them is the amount of items added from this item.

It is not possible to click on the "Add to cart" / "Remove from cart" button as long as there is no response from the server from a previous request.

**The Cart:**

The display of the cart on the screen is divided into 2 parts: one part is the display of all the items ordered by the user, for each item his picture and details are displayed, in the upper right corner of the item is written the number of books ordered from this item. In addition, there is a "Delete from the cart" button that, when clicked, deletes the above item from the cart.

The second part of presenting a cart is showing the amount to be paid. This part is on the left side of the screen and remains in a `fixed` position even if the amount of products in the cart is large.

## The division into components and folders:

- **Components** Folder:
    - **Menu:** This component is responsible for the nav bar, including the functionality associated with the information displayed on it (like the "Exit" button displayed when the mouse is in the user's name, it is responsible for opening and closing the registration and login models)

    - **Route Component:** The component that is responsible for routing. Sends to the appropriate components according to the routing.

    - **Form:** Website registration form. Contains variables for each field. When the user enters the data into the fill fields the data will be recorded into these variables, and only when submitted, if the data has passed the validations - this data will be saved in the save mode explained below
    
        *How to manage validations:* The `errors` object contains the errors for each fill field. Errors are displayed when they are not empty. Each data entry updates the errors (call the `handleChange` function)
    
        When submitting the form, a check is made that there is no error, and there is no empty field - and if so, the data will be saved.
    
    * **Login:** Login form for users who have previously registered and want to log in again. Therefore the fill fields are only ID and password.

        The only validation is only if a user clicks on "Login" and there is no user in Database with this ID and password.

    * **CartBook:** This component gets the category in `props` and according to that displays the books on the screen. It is responsible for the following check: If when clicking on the cart does not have a registered user will open a model that warns of the error and refers to registration or login. Clicking on the "Register" button etc. will close the model and open the form model.

    * **Book:** Each book is represented by a separate component that contains its details and appropriate buttons (with the quantity ordered is 0 the button will be "for purchase" and if more than zero the buttons will be "+" and "-".)

    * **Cart:** Ordered shopping cart.

    * **CartBook:** Each item in the cart.
    * **Home:** The home page
* **Assets folder:** Inside the images folder are all the images displayed on the site.

* **Service folder:** The `getAndSetData` file contains all the code related to retrieving and entering data into the database (mongo DB)

* **Shared folder:** Here is all the code that is common to some components, for example in the validation.js file is the code related to validation tests.

## How the data is stored:
Each change of data is saved in three places simultaneously:

1. The `UserDetails` variable is a `UseState` variable that is common to all components (defined in the `App` and sent in `props` along with the `updateUserDetails` function) to ensure that each change is rendered).

1. In `localStorage` - to ensure that even in the event of a refresh - the data will be saved (like who the current user is)

1. Each addition / removal of a book involves sending the data to the server (sending: who is the user and which book is available) and updating in Mongo DB.

## run:

in server folder:
```
npm i
node server.js
```
in book folder:
```
npm i
npm start
```

very important note: beceuse of my DB is on Mongo DB Atlas free acount the free trail had alraedy finished so that there is no DB to the site...
