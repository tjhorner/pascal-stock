$(document).ready(function(){
  // id is the internal id for this app,
  // productId is the digital river ID.
  var products = [
    {
      id: "gtx1070",
      name: "GTX 1070",
      productId: "2740281000"
    },
    {
      id: "gtx1080",
      name: "GTX 1080",
      productId: "2740204200"
    }
  ];

  var getStock = function(product, cb){
    $.getJSON("https://api.digitalriver.com/v1/shoppers/me/products/" + product + "/inventory-status?apiKey=9485fa7b159e42edb08a83bde0d83dia&format=json").then(function(res){
      var inventory = res.inventoryStatus;

      cb({
        availableStock: inventory.availableQuantity,
        stockEstimated: (inventory.availableQuantityIsEstimated === "true"), // yep... the API gives us a string
        inStock: (inventory.productIsInStock === "true"),
        expectedStockDate: new Date(inventory.expectedInStockDate)
      });
    });
  };

  products.forEach(function(product){
    getStock(product.productId, function(inventory){
      var $productEl = $("#product_" + product.id);
      $productEl.find(".instock").text(product.name + " Inventory");
      $productEl.find(".available").text((inventory.stockEstimated ? "~" : "") + inventory.availableStock);
    });
  });
});
