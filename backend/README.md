
# iNotes - Backend

The iNotes is a simple and intuitive application designed to help users create, save, and manage their notes efficiently. Built with a clean and user-friendly interface, the app allows users to quickly jot down their thoughts, ideas, and important information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```sh
   git clone git@github.com:joaosanson/iNotes.git
   cd ./iNotes/backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Usage

1. **Start the development server:**

   ```sh
   npm run dev
   ```

2. **Run tests:**

   ```sh
   npm test
   ```

3. **Build for production:**

   ```sh
   npm run build
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root of your project with the following variables:

```plaintext
# Example environment variables
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL="./src/database/app.db"
PORT=3333
```

### Configuration File

You can also configure the project by modifying the `config.js` file in the `src/config` directory.

## Scripts

The following npm scripts are available:

- `npm run dev`: Start the development server.
- `npm test`: Run tests.
- `npm run build`: Build the project for production.
- `npm run knex`: Run knex to interact with SQL query builder.
- `npm run lint`: Run linter to check for coding style issues.
- `npm run lint:fix`: Fix coding style issues.

## Contributing

1. **Fork the repository**

2. **Create your feature branch:**

   ```sh
   git checkout -b feature/awesome-feature
   ```

3. **Commit your changes:**

   ```sh
   git commit -m 'Add some awesome feature'
   ```

4. **Push to the branch:**

   ```sh
   git push origin feature/awesome-feature
   ```

5. **Open a pull request**

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
