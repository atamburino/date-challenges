# Lab: Date Challenges
This project provides a series of JavaScript challenges involving date functions. You’ll practice working with JavaScript’s Date object and implementing various date manipulation functions.

## Getting Started
1. Unzip the Project File
Download and unzip the provided project file (date-challenges.zip).
Open the project folder in your terminal or code editor.
2. Initialize a New Git Repository
In the terminal, navigate to the unzipped project directory (e.g., cd path/to/date-challenges).

### How to Initialize a new Git repository:

```bash
git init
```

3. Create a New GitHub Repository
- Go to GitHub and log in to your account.
- Click on `New` to create a new repository.
- Name the repository date-challenges.
- `Do not initialize the repository with a README or .gitignore file; you already have these in your local project.`
- Click Create repository. You will NOT clone this down since you already have the repository locally.

4. Link Your Local Repository to GitHub
In your terminal, add the GitHub repository as a remote origin. Follow the pattern:

```bash
git remote add origin <repo URL>
```

Verify the remote has been added by running:

```bash
git remote -v
```

You should see output showing the origin remote pointing to your GitHub repository.

5. Add, Commit, and Push Your Project to GitHub
Stage all files for the first commit:

```bash
git add .
```

Commit the files with a message:

```bash
git commit -m "Initial commit"
```

Push the files to your GitHub repository:

```bash
git push -u origin main
```

This will upload your project files to the main branch of your date-challenges repository on GitHub.

6. Install Project Dependencies

With your terminal still in the project directory, run the following command to install all necessary dependencies:

```bash
npm install
```

This will install all the packages listed in package.json, including Jest, which is used for running tests. `BE SURE TO INCLUDE YOUR TEMPLATE .GITIGNORE FILE`

7. Create and Work on a New Branch for Each Challenge

### Create a Branch for the Challenge:
For each challenge, create a new branch named challenge-<number>, replacing <number> with the challenge number. For example:

```bash
git checkout -b challenge-1
```

### Complete the Challenge: Write the code for the challenge and add any necessary tests in the test file.

### Commit Your Changes: Once you’ve completed both the challenge and the test, stage and commit your work:

```bash
git add <files>
git commit -m "Complete challenge 1 and add test"
```

### Push the Branch to GitHub: Push your branch to the remote repository:

```bash
git push -u origin challenge-1
```

### Create a Pull Request (PR):

- Go to your GitHub repository in your web browser.
- You should see an option to create a pull request for challenge-1. Click on it and review the changes.
- Submit the pull request for review.
- Merge the PR:

### Checkout to main and Pull Latest Changes
After merging, switch to the main branch locally and pull the latest changes:

```bash
git checkout main
git pull origin main
```

Continue with the Next Challenge: Repeat the branching process for each challenge:

Create a new branch: git checkout -b challenge-<next-number>
Work on the code and tests.
Commit, push, create a PR, and merge.
Pull the latest changes into main before starting the next challenge.

## How to Run Tests
Once dependencies are installed, you can run the tests to verify your solutions:

```bash
npm test
```

This will execute all test cases using Jest, allowing you to check if each function behaves as expected.

By following these steps, you’ll complete each challenge on its own branch, push it to GitHub, create a pull request, merge into main, and then pull the latest changes to keep main up-to-date.

## To Submit
Bookmark your completed repo in our 1-1 channel.






