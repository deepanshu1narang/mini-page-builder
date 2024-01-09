To run the application: 
  step 1: clone the application with the command git clone https://github.com/deepanshu1narang/mini-page-builder.git -b dev
  step 2: in command pallete 1st install the dependencies (npm install)
  step 3: to run the application use npm run dev

About Application: 
  It is a mini-page-builder using drag and drop of elements. 1st user createes the interface and it stores that in the form of JSON and saves it in localStorage. If user does not clear localStorage it can be loaded from that.

Code Analysis part:
  Flow: App.jsx => PageBuilder.jsx

  in PageBuilder.jsx, Header component is being rendered. It has 2 parts: 
    1. Its heading
    2. Export button: It gives the data of the page (fetches from local storage) and logs in the console with a success message of Export

    then 1 sidebar and 1 build-area is being maintained
    user can drag an element (out of the given ones) from sidebar to page-area and where it is dropped at those coordinates the element is created. To configure that element a modal will open to configure the element.
    In modal after clicking Save button it creates the element and that element can be 
      1. repositioned (just drag it and drop it to the new position), 
      2. updated (click on the required element, it will be selected and will appear inside red border. press Enter and modal will open. Edit details and save it), 
      3. deleted (click on the required element, it will be selected and will appear inside red border. press Delete and it will get deleted).

      Functions explanations are in code through comments.
