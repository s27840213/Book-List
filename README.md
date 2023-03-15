<!-- ABOUT THE PROJECT -->
# Book List
### Project Requirement
1. Based on the information provided an expandable/collapsible elements component
2. Each item can be clicked, and when clicked, highlight the clicked item, and if the item has sub elements, open the menu of the item.
3. There is only one expanded and highlighted item at a time.
4. A drop-down menu is also provided, which must contain all categories. Selecting any item from the drop-down menu is the same action as clicking on that item.

<!-- GETTING STARTED -->
### How to run the project?
* Pay attention to the **NodeJS version**. My NodeJS version is v16.19.1. If you're using the different version of NodeJS, maybe you will get some problems when executing the project locally.
  * My NodeJs version: v16.19.1
*  If you want to run the project locally, follow the bellow steps

   1.  first clone the project 
         ```
         git clone https://github.com/s27840213/Book-List.git
         ```
   2. install the dependencies
      ```
      pnpm install
      ```
   3. execute the project
      ```
      pnpm dev
      ```


### Project Structure
```
book-list/
|
|– assets/ # static assets
|
|– components/ # the place we put our reusable SFC components
|
|– interfaces/  # The place where we put the interface(type) files
|
|– rounter/     # Vue-router setting file
|
| 
|– composable/  # the utilities files could be used in different component
|
|– views/ # the views SFC for each route
|
| App.vue
|
`– main.ts 
```


### How I solve implement this project?

  1. first I create a composable file call useBooks(), and used it to store the books data, and all the api function(add, delete, patch, get). What's more, I create a HashMap to quickly search the books, and we could also use it to check if the id exist when I want to add book quickly.
  2. After testing all the API is fine, I go ahead to implement the SFC we need, and I find in this project we could conclude that we have four state, listing books, showing detail of certain book, modifying certain book, adding new book, so I create a useState composable to shared the state between components, and then complete all the SFC.
  3. The final step is to add some colors and interaction, and I add error handling and notification code to make the project much more better in UX interaction.

That's my logic to solve this project, I want to add more feature but the 3 Days is too short to implement too much fancy feature. Still need to work for the current company Orz.


### Primary Tech stack

* **Vue3**
* **Vite**
* **Typescript:**
  * TypeScript is a statically-typed programming language that extends JavaScript and provides optional type annotations. In my opinion, it will spend some time to learn at beginning, but it will save you lots of time if the project get bigger and bigger. I could prevent lots of potentials errors, and make it easier to understand the old codes and other codes.
* **Pug**
  * Pug is a templating engine for Node.js and JavaScript that allows you to write HTML markup with a simpler syntax, and it could be used with Prettier and volor if we install some plugins. It provide simple and concise syntax when writing HTML, I recommend to give it a try.
* **Prettier + ESLint:**
  * Code formatting tools to ensure the coding style consistency
* **@kyvg/vue3-notification:**
  * The notifications I used to do the error handling and send notifications, it's very easy to used plugins, if we want to create it by ourselves. I may consider used Vue 3 teleport syntax to implement it.

### The problems I got in this project?

1. **Unfamiliar with Tailwind:**
      * how I fix this problems is to spend lots of time on the official documents, and install Tailwind Intellisense VSCode save me lots of time
2. **Forget add .value when using computed in conditional, always return true:**
   * there isn't good solutions I found yet, I still find any plugin that will indicate this tiny but a little annoying problems. Currently I just could be much more cautious.
3. **the clean code problems:**
   * when I first starting this project, I maintain the state between all the components and pass them using props and provide and inject, and it's a little bit messy. Although provide and inject could be a little bit cleaner, but it's a little bit hard to use with TypeScript, so finally I used composable to manage the state, I think it solve my problems. 
  
Almost all the other problems I got is due to the unfamiliarity of Tailwind, but they're to trivial to mention