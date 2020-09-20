$("#addNew").on("click", function () {
  $("#modal-wrapper").css("display", "block");
})
$("#btn-close").on("click", function () {
  $("#modal-wrapper").css("display", "none");
})
$("body").on("click", "#btn-edit", function () {
  $("#modal-wrapper").css("display", "block");
  const editId = $("#btn-edit").attr("data");
})

$("body").on("click", "#btn-delete", function () {
  const id = $('#btn-delete').attr("data");
  $.ajax({
    url: "http://localhost:8001/products/" + id,
    method: "delete",
    contentType: "application/json",
    success: function () {
      getProducts();
    },
  });
});

const value1 = $("#name_inp").val();
const value2 = $("#price_inp").val();
const value3 = $("#quantity_inp").val();
const value4 = $("#seller_inp").val();
const value5 = $("#number_inp").val();
const value6 = $("#image_inp").val();
$("#btn-change").on("click", function () {
  change(value1.value, value2.value, value3.value, value4.value, value5.value, value6.value)
})

function change(name, price, quantity, seller, number, image) {
  // $("#modal-wrapper").css("display", "block");
  // const id = ("#btn-edit").attr("data");
  $.ajax({
    url: "http://localhost:8001/products/" + editId,
    method: "patch",
    contentType: "application/json",
    data: JSON.stringify({
      name: name,
      price: price,
      quantity: quantity,
      seller: seller,
      number: number,
      image: image,
    }),
    success: function () {
      getProducts();
    },
  })
}

function addItemToList(id, name, price, quantity, seller, number, image) {
  $("#products").append(
    `<section class="wrapper-style5">
        <div class="inner">
          <section>
            <div class="box alt">
              <span class="row uniform">
                <div id="data-id" class="4u">
                  <span class="image -fit">
                    <article class="mini-post">
                      <header>
                        <h3><a href="#">${name}</a></h3>
                        <div class="row uniform">
                          <div class="info">
                            <p><span>Price: ${price}</span></p>
                            <p><span>Quantity: ${quantity}</span> </p>
                            <p><span>Seller: ${seller}</span></p>
                            </div>
                          <div class="6u">
                            <input type="reset" value="BUY" class="special" />
                            <button data=${id} id="btn-delete">&#x2716;</button>
                            <button dataId=${id} id="btn-edit">&#x270E;</button>
                          </div>
                        </div>
                        </header>
                          <a href="#" class="image"><img
                              src = "${image}"
                              style="width:100%;" alt="" /></a>
                    </article>
                  </span>
                </div>
              </span>
            </div>
          </section> 
        </div>
      </section> `
  );
}

function renderProducts(arr) {
  $("#products").html("");
  arr.forEach((item) => {
    addItemToList(
      item.id,
      item.name,
      item.price,
      item.quantity,
      item.seller,
      item.number,
      item.image
    );
  });
}

function getProducts() {
  fetch("http://localhost:8001/products")
    .then((resp) => resp.json())
    .then((data) => {
      renderProducts(data);
    })
    .catch((err) => console.log(err));
}
getProducts();

const $form = $("#addForm");

$form.on("submit", (e) => {
  e.preventDefault();
  const value1 = $("#name_inp").val();
  const value2 = $("#price_inp").val();
  const value3 = $("#quantity_inp").val();
  const value4 = $("#seller_inp").val();
  const value5 = $("#number_inp").val();
  const value6 = $("#image_inp").val();

  $.ajax({
    url: "http://localhost:8001/products",
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      name: value1,
      price: value2,
      quantity: value3,
      seller: value4,
      number: value5,
      image: value6,
    }),
    success: function () {
      getProducts();
    },
  });
  $("#name_inp").val("");
  $("#price_inp").val("");
  $("#quantity_inp").val("");
  $("#seller_inp").val("");
  $("#number_inp").val("");
  $("#image_inp").val("");
});

//  `<div id="data-id"> ${id} ${name} ${price} ${seller} ${quantity} ${number} 
//     <img src="${image}">
//     <button data=${id} id="btn-delete">Delete</button>
//      <button dataId=${id} id="btn-edit">Edit</button>
//      </div>`

// <select name="demo-category" id="demo-category">
//   <option value="1">${price}</option>
//   <option value="1">${quantity} </option>
//   <option value="1">${seller}</option>
// </select>