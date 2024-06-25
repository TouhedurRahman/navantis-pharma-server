# [Navantis Pharma Limited](https://navantispharma.com/)

Welcome to the backend repository for the Navantis Pharma Limited website. This backend service supports the company's website, enabling functionalities such as product management, user inquiries, and more.

## Table of Contents

- [Project Overview](#project-overview)
- [Implemented Technologies](#implemented-technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Client Repository](#client-repository)
- [Developed By](#developed-by)

## Project Overview

Navantis Pharma Limited specializes in importing dermatology and skincare products from Bionike, Italy, and marketing them throughout Bangladesh. This backend service provides APIs to manage products, handle user inquiries, and support the frontend operations.

## Implemented Technologies

This project is built using the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing product information and user inquiries.

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/TouhedurRahman/navantis-pharma-server.git
    cd navantis-pharma-server
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=your_port_number
    MONGO_URI=your_mongodb_connection_string
    ```

4. **Start the server**

    ```bash
    npm run start-dev
    ```

Your server should now be running on `http://localhost:5000`.

## Usage

This backend service provides several key features:

- **Product Management**: APIs to add, update, delete, and fetch product details.
- **User Inquiries**: APIs to handle user inquiries and contact form submissions.

## API Endpoints

Below are some of the main API endpoints available:

- **Product Endpoints**
  - `GET /api/products`: Fetch all products
  - `POST /api/products`: Add a new product
  - `GET /api/products/:id`: Fetch a product by ID
  - `PUT /api/products/:id`: Update a product by ID
  - `DELETE /api/products/:id`: Delete a product by ID

- **Inquiry Endpoints**
  - `POST /api/inquiries`: Submit a new inquiry
  - `GET /api/inquiries`: Fetch all inquiries

For a full list of available endpoints and their detailed usage, refer to the API documentation (if available).

## Client Repository

The frontend of this project is managed separately. You can find the client repository here:

[Navantis Pharma Client](https://github.com/TouhedurRahman/navantis-pharma-client)

## Developed By

This project was developed by:

**Touhedur Rahman Khan**  
IT Officer  
Navantis Pharma Limited

For any inquiries or support, please contact [Touhedur Rahman Khan](https://www.facebook.com/touhedur.cse).

---

Thank you for visiting my repository. I hope this backend service provides robust support for the Navantis Pharma Limited website.