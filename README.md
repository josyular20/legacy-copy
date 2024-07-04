# Legacy

An all-encompassing end-of-life planning app.

## Running Application

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- [expo](https://expo.io/)
- [golang](https://golang.org/)
- [docker](https://www.docker.com/)
- [postgresql](https://www.postgresql.org/)
- [taskfile](https://taskfile.dev/#/installation?id=installation)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/GenerateNU/legacy.git
   cd legacy
   ```

2. **Install dependencies**

   ```bash
   cd client
   yarn install
   ```

   - If you get an error about `expo-cli` not being installed, run `yarn global add expo-cli` and then run `yarn install` again.

   ```bash
   cd server
   go get ./...
   ```

   - If this doesnt work, try running `go mod tidy` and then `go get ./...` again or delete the go.mod and go.sum files and then run `go mod init server` and `go mod tidy` again.

3. **Install requirements.txt**

   ```bash
   pip install -r requirements.txt
   pre-commit install
   ```

   - Using a virtual environment is not necessary, but recommended.

### Running

1. **Create client build**

   ```bash
   cd client
   eas login
   eas build:configure
   # ios
   eas build -p ios --profile development
   # android
   eas build -p android --profile development

   ```

2. **Download the build and drag into simulator**

3. **Start the client**

   ```bash
   cd client
   npx expo start --dev-client
   ```

   - You can then open the app in the Expo app in the simulator.

4. **Start Postgres**

   - MacOS

   ```bash
   brew services start postgresql@[version]
   ```

   - Windows

   ```bash
   pg_ctl -D /usr/local/var/postgres start
   ```

5. **Start the server**

   ```bash
   cd server
   task run
   ```

   - If this returns an error like 'air does not exist' try running

   ```bash
   go install github.com/cosmtrek/air@latest
   ```

## Contributing

### Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Create a new branch**

   ```bash
   git checkout -b feature/<branch-name>
   ```

3. **Make changes and commit changes:**

   - **Commit changes**

     ```bash
     git add .
     cz commit
     ```

     - You are not required to use commitizen, but it is recommended. If you choose not to use commitizen, please follow the commit message format described [here](#commit-messages).

   - **Bump version**
     ```bash
     cz bump
     ```

   * We use pre-commits that allow us to format code before committing. This ensures that all code is formatted the same way. If your code gets formatted you will need to run `git add .` again before committing to add the formatted code to the commit. You can also run `task format` to format all code.

   * More information on commit messages can be found [here](#commit-messages).

4. **Push changes to GitHub**

   ```bash
   git push origin feature/<branch-name>
   ```

5. **Create a pull request**
   - Go to the [repository](https://github.com/GenerateNU/legacy) on GitHub
   - Click on the `Pull requests` tab
   - Click on the `New pull request` button
   - Select the `base` branch as `main`
   - Select the `compare` branch as `feature/<branch-name>`
   - Click on the `Create pull request` button

### Commit Messages

Use commitizen to create commit messages.

```bash
cz commit
cz bump
```

- Commit messages should be in the present tense.
- Keep them short and concise. If necessary, add a longer description in the body of the commit.
- Use the following format for commit messages:
  ```
  <type>: <subject>
  <BLANK LINE>
  <body>
  ```
- The `<type>` can be one of the following:
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation only changes
  - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **perf**: A code change that improves performance
  - **test**: Adding missing tests
  - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Pull Requests

- Ensure your pull request has a clear title and a summary of the changes made.
- Describe the problem you're solving or the feature you're adding.
- Mention any related issues or dependencies.
- Ensure your changes don't break any existing functionality, add tests if necessary.
- Request reviews from fellow developers or team members.
