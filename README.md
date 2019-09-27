# Donating Platfrom

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)  ![license](https://img.shields.io/badge/license-MIT-blue.svg)

![Product Image](https://cdn1.savepice.ru/uploads/2019/9/25/8c471e4e0f9861a26f85ee3ff689d078-full.png)

Donation platform is a website that displays a list of donations and their statistics


## Installation

1. You need `Node.js` installed on your machine, if you don't have it, you should install it - download [link](https://nodejs.org/en/download/)
2. [Clone the project from github](https://github.com/genyaevgeney/donating-platform-express-vue) or [download the archive](https://github.com/genyaevgeney/donating-platform-express-vue)
3. `cd` to your downloaded app
4. Install necessary dependencies:
    - **Via node `npm` package manager** - Run `npm install` on the project root
    - **Via `yarn` package manager** - Run `yarn install` on the project root

## Configuration for MySQL database

1. Fill the **.env** file with the correct data

## Migrations and seeds

1. Go to the `database` folder and run the following commands:
    - run migration using the command `$ knex migrate: latest`;
    - run seed using the command `$ knex seed: run`;

## Run the application

1. For starting the application, the following script (defined in `package.json` under `scripts`) must be called:
    - via **npm**: `npm run start` or `npm run dev` for starting the development environment, which has livereload enabled;
    - via **yarn**: `yarn start` or `yarn dev` for starting the development environment, which has livereload enabled;

