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
    console.log("Check out our cool merch...\n");
        var query = connection.query("SELECT * FROM products",
            function (err, res){
            if(err) throw err;
            console.log("\n");
            for(var i = 0; i < res.length; i++){
                var inventoryList =
                `ID:${res[i].item_id}....${res[i].product_name}....${res[i].department_name}....$${res[i].price}....QTY: ${res[i].quantity} `;
                console.log(inventoryList);
            }
            console.log("\n");
            promptUser()
        });
return;
};




//Call the function to prompt user.
function promptUser() {
    inquirer.prompt([{
        type: "input",
        name: "idNum",
        message: "Enter ID of item you'd like to purchase:"
      },
      {
        type: "input",
        name: "qtyNum",
        message: "Enter quantity of item to purchase:"
      }
      //Code that uses order input to change stock number in the database.
    ]).then(function(answer) {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var purchase;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.idNum)) {
            purchase = res[i];
            totalPrice = (purchase.price * answer.qtyNum);
          }
        }
        if (purchase.quantity >= parseInt(answer.qtyNum)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                quantity: (purchase.quantity - parseInt(answer.qtyNum))
              },
              {
                item_id: purchase.item_id
              }
            ],
          );
          console.log(
            `Total price for purchase today is $${totalPrice}.`
          );
        } else {
          console.log("Not enough inventory available. Lower quantity and try again.")
        };
        welcome();
      });
    });
  };


function quitProgram() {
    console.log("Thank you. Come again!")
    connection.end();
}

