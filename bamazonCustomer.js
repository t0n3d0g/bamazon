var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
    welcome();
});

function welcome() {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "Make a selection:",
            choices: ["Purchase item", "List items", "Quit"]
        }

    ]).then(function(user) {
        const userChoice = user.userChoice;
        if (userChoice === "Purchase item") {
            listItems();
        }
        else if (userChoice === "List items") {
            listItems();
        }
        else if (userChoice === "Quit") {
            quitProgram();
        }
        else {
            welcome();
        }
    });
  }


function listItems() {
    console.log("Check out our cool fuggin shit...\n");
        var query = connection.query("SELECT * FROM products",
            function (err, res){
            if(err) throw err;
            console.log("\n");
            for(var i = 0; i < res.length; i++){
                var inventoryList =
                `ID:${res[i].item_id}....${res[i].product_name}....$${res[i].price}`;
                console.log(inventoryList);
            }
            console.log("\n");
            selectItem();           
});
return;
};

function selectItem(){
    inquirer.prompt([
        {
        type: "input",
        name: "purchaseID",
        message: "Enter the Item # of your purchase:"
        }

        ]).then(function(user) {
            const userData= user.purchaseID;
            console.log(userData);
        }).then(function(user){
        selectQuantity();
        });

}

function selectQuantity(){
    inquirer.prompt([
        {
        type: "input",
        name: "quantity",
        message: "Enter the Quanty to purchase:"
        }

        ]).then(function(user) {
            const userData = user.quantity;
            console.log("You have purchased QTY. "+userData+" of Item #");
        }).then(function(user){
        welcome();
        });

}

//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//   });
// }

function quitProgram() {
    console.log("Thank you. Come again!")
    connection.end();
}

