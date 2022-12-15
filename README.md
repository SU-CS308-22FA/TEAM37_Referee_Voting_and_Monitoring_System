CS 308 Team 37 - 202201
# Referee Voting and Monitoring System

Go to website: Not Active

Referee Voting and Monitoring System is a open source web application that football fans can use. It isa free space that every fan can express their opinons about matches, leagues, and referees. This website also provides up-to date news about football such as standings and fixtures to keep the fans well-informed.

## Installation
First step is installing npm package manager to your device using [this](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) website.

Then you have to clone the repository to a directory.

```bash
git clone <repository> <directory>
```

Head into the directory.

```bash
cd <directory>
```
Then, open two terminals in your IDE.

For the first terminal, change its directory to client folder by typing cd client

For the second terminal, change its directory to serverfolder by typing cd server

Use the package manager [npm](https://www.npmjs.com) to install the packages used in this project by typing the command below in two terminals.

```bash
npm install
```
Run the app in your local host,by typing the command below in two terminals

```bash
npm start 
```

Now you will see "connected to db" on your screen.

Go to you browser and enter "localhost:'port number'", now you are able to interact with the project from your local host.

## Reporting bugs and suggesting fixes

You can open pull request for small bug fixes. For major changes, please open an issue first
to discuss what you would like to change.

Also, you are strongly advised to check the Known Bugs section begore opening a report for a bug


### Known Bugs

1- When applicatin starts sometimes it will begin autamatically comes with signed-in user by keeping the previous users credentials. You have to sign-out to reach the main sign-in screen.
2- Api related tabs such as standings and matches might not handle multiple changes in their data such as changing the league from la-liga to bundesliga. As, our application has an limited api-calls. 
3- When user signes-in and immediately clicks the back button of his/hers browser its credentials will still remain in the website so that even though user will be transferred to sign-in screen it can reach the tabs that needs user privileges.

## Obtaining the Source Code

### Cloneing the repository
To obtain the source code for the whole project you can
```bash
git clone <repo> <directory>
```
Such that all the files will be ready to de editted or observed. Do not forget that the frontend source codes are in client folder and backend files are in server folder. To navigate in there use

```bash
cd client
```

```bash
cd server
```
Also
### Folder Structure

1. In the root file there are two main folders which are client and server.
2. Client folder contains the front-end part of the project.
2.1 Main files stored in src folder and other minor things stored in public folder such as icon of the website.
2.2 Src file contains components folder and other necessary files such as app.js.
2.3 Components folder contains two folder which are Screens and Axios.
2.3.1 Screens folder contains the pages that user will see when it enters the applicatipn such as sign-in and standings page.
2.3.2 Axios folder contains the axios http methods that are used in the pages to connect them to backend.
  
3. Server folder contains the back-end part of the project
3.1 We have three main folders named as Routers, Controllers and Models
3.1.1 Routers folders stores the functional routes that http request will use
3.1.2 Controllers folder contructs the backbone of the backend by implementing the backend functions retrieve and post data to database(MongoDB)
3.1.3 Models folder contains the schemas used in the projet such as user schema and referee schema.
3.2 We have necessary files such as index.js and package.json.
3.2.1 Index.js construct the entry point of the backend by connecting to database and arranging the routes.
3.2.2 Package.json file simply stores the package versions used in the project.
    

### How to Build the project

After cloneing the project with
```bash
git clone <repo> <directory>
```
go to the directory

```bash
cd client
```
and run
```bash
npm install
```
this will load the packages used in client. After the load ing is complete go to the server folder
```bash
cd server
```
and run
```bash
npm install
```
This will load the packages used for backend of the project.

### Deploying the project to a remote server (Render)

##### Step 1.1: Clone to a git repository 
[Render](https://dashboard.render.com/) is a free open source deployment platform 

Use link above to sign-up with render

##### Step 1.2: On the render web page, conenct your account to your github account

##### Step 2: On the render dashboard, deploy client part of the project from github repository by choosing static site

##### Step 3.1: On the render dashboard, deploy server part of the project from github repository by choosing web service

##### Step 3.2: Configure & launch your environment


##### Step 4: Modify environment variables

1. In Render, select your deployment
2. Navigate to variables
3. Add all environment variables or add your .env files Render will keep them encrpted
4. Render automatically deploys once you are done editing

##### Step 5: Update your project by commiting to your repository. Render will autamatically deploy your project by your lates commits
