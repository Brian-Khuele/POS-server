## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).


## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 


# admin_pos

//API layout
const orderStates = "placed" | "preparing" | "done" | "delivered"

/login
    {
        username: "",
        password: ""
    }

    possible responses:
    //sucessful
    {
        userType: "manager" | "waiter" | "station",
        name: "John Doe",
        hasResetPassword: 0 | 1
    }

/logout
    {
        userId: "12323"
    }

/password
    NOTE: FrontEnd must do validation: Confirm Password
    {
        username: "",
        password: "",
    }

/placeOrder
    {
        userId: "dasdasd",
        ordernO: 1234,
        data: {
            shop: "1",
            product: {
                flavour: "gum mint",
                pipes: 1 | 2,
                coal: "round" | "cubes",
                class: "basic" | "premium"
            },
            price: 140.00
        }
    }
/prepareOrder
    {
        userId: "dasdasd",
        ordernO: 1234,
    }
/completeOrder
    {
        userId: "dasdasd",
        ordernO: 1234,
    }
/deliverOrder
    {
        userId: "dasdasd",
        ordernO: 1234,
    }
/cancelOrder
    {
        userId: "dasdasd",
        ordernO: 1234,
    }
    TO DO: Add reason for cancellation as a paid-for feature

WEBSOCKET:
    waiter: {
        my_orders:
            userID is the id/room of the channel

        all_orders (READ ONLY):
            all_orders. Receive all orders that aren't closed  
    }

    station: {
        all_orders
    }

    admin: {
        all_orders (READ ONLY):
            See all activity in the store(s)

        stock_level:
            Alert when stock levels reach level sset by admin.
    }


BACKEND TO DO:
    Send alert to admin to indicate low stock.







