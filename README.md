# Project Name: User Management and Payment Verification API
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/87fbb44ed5cc455ab03ecc78fb40acbc)](https://app.codacy.com/gh/Smeks-ops/vzy-assessment/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/16662064-697d17cb-4059-42f0-9bc3-162165a21998?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D16662064-697d17cb-4059-42f0-9bc3-162165a21998%26entityType%3Dcollection%26workspaceId%3Da37a52bf-cea3-49e8-a7d8-bef7f340b11d)

### Overview
This project implements a NodeJS API that connects with MongoDB Atlas to manage user registrations, authentications, and updates. Additionally, it integrates with Stripe to handle payment verification through webhooks. The API ensures secure access through authentication tokens and provides an interface for updating user records post-payment verification.

### Features
- User Registration: Endpoint to register new users.
- User Authentication: Endpoint to authenticate users and generate time-limited access tokens.
- User Record Update: Authorized endpoint to update user records.
- View User Profile: Authorized endpoint to view user profile details.
- Stripe Payment Verification: Endpoint to handle Stripe webhook for payment verification and update user status accordingly.

### Technologies Used
- NodeJS
- NestJS
- MongoDB Atlas
- Stripe

### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites
- NodeJS and npm
- MongoDB Atlas account
- Stripe account

#### Installation
1. Clone the repository
   ```sh
    git clone https://github.com/Smeks-ops/vzy-assessment.git
    ```
2. Navigate to the project directory
    ```sh
    cd vzy-assessment
    ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables:
    ```sh
    MONGO_URI=<Your MongoDB Atlas connection string>
    STRIPE_SECRET_KEY=<Your Stripe secret key>
    JWT_SECRET=<Your JWT secret key>
    ```
5. Start the server
    ```sh
    npm run start
    ```

### API Endpoints
- User Registration
    - Endpoint: `POST /auth/signup`
    - Request Body: 
        ```json
        {
            "email": "vzy@gmail.com",
            "password": "password"
        }
        ```
- Login
    - Endpoint: `POST /auth/login`
    - Request Body: 
        ```json
         {
            "email": "vzy@gmail.com",
            "password": "password"
        }
        ```
- Update User Record
    - Endpoint: `PATCH users/update-profile`
    - Request Body: 
        ```json
        {
            "name": "Vzy",

        }
        ```
- View User Profile
    - Endpoint: `GET users/profile`
  
- Stripe Webhook
    - Endpoint: `POST /webhook/stripe`
    

### Author
- [Osemeke Echenim][smeks-ops](https://github.com/Smeks-ops)
  

