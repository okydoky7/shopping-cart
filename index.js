const productList = [
  { 
    productID: 1,
    productImg: "./img/1.png",
    productName: "Dog Casino Puzzle",
    productPrice: "39",  
  },
  {
    productID: 2,
    productImg: "./img/2.png",
    productName: "Little Buddy Warm Bear",
    productPrice: "26",   
  },
  {
    productID: 3,
    productImg: "./img/3.png",
    productName: "Suction Dental Ball",
    productPrice: "14",   
  },
  {
    productID: 4,
    productImg: "./img/4.png",
    productName: "Dog Brick Puzzle",
    productPrice: "36",  
  },
  {
    productID: 5,
    productImg: "./img/5.png",
    productName:"Kong Tiltz",
    productPrice:"24",    
  },
  {
    productID: 6,
    productImg: "./img/6.png",
    productName: "Kong Toy Wobbler",
    productPrice: "24",
  },
  {
    productID: 7,
    productImg: "./img/7.png",
    productName: "Whistler Ball 2 Pack",
    productPrice: "21",
  },
  {
    productID: 8,
    productImg: "./img/8.png",
    productName: "Extreme Dental With Rope",
    productPrice: "30",
  }
  ];
  
  let htmlElementList = [];
  let tbodyElement = document.getElementById("table-body");
  
  productList.forEach(element => {
    const htmlElement =`<div class="col col-12 col-md-6 col-lg-3 gy-3 card-item">
      <div class="card" id=${element.productID}>
        <img src="${element.productImg}" class="card-img-top" alt="item img">
          <div class="card-body text-center">
            <p class="card-text px-3" style="font-weight:bold">${element.productName}</p>
            <p class="card-text px-3"><span>$ </span>${element.productPrice}</p>
            <input type="text" class="form-control" id="quantity" placeholder="0">
            <button type="button" class="btn btn-warning mt-2 add">Add to Cart</button>
          </div>
        </div>
      </div>`
  
  htmlElementList.push(htmlElement);
  
  });
  
  let cart = [];
  let cartHTML = [];
  let total = 0;
  let itemNumber = 0;
  
  let htmlElementJoined = htmlElementList.join("\n");
  
  const cardLayoutElement = document.getElementById("cardLayout");
  cardLayoutElement.innerHTML = htmlElementJoined;
  cardLayoutElement.addEventListener("click",(event) => {
      if (event.target.classList.contains("add")) {
          const mainDiv = event.target.parentElement.parentElement;
          const mainDivId = Number(mainDiv.id);
          const unitElement = event.target.previousElementSibling;
          let unitNumber = Number(unitElement.value);
          unitElement.value = "";
          let foundTask;
          let totalEl = document.getElementById("total");
          
          productList.forEach(element => {
              if (element.productID === mainDivId) {
                  foundTask = element;
                  itemNumber++;
                  let amount = unitNumber * foundTask.productPrice;
                  foundTask["id"] = itemNumber;
                  foundTask["unitNumber"] = unitNumber;
                  foundTask["amount"] = amount;
                  cart.push(foundTask);
                  render(cart);
              }   
  
          });
          
      }
  });
  
  const render = (items) => {
      let total = 0;
      let cartHTML = [];
      items.forEach(element => {
          let foundTaskHTML = `
              <tr id="${element.id}">
              <td>${element.productName}</td>
              <td>${element.unitNumber}</td>
              <td><span>$</span>${element.productPrice}</td>
              <td><span>$</span>${element.amount}</td>
              <td><span class="text-danger remove btn">Remove</span></td>
              </tr>`
          cartHTML.push(foundTaskHTML);
          total += element.amount;
      });
      
      let totalEl = document.getElementById("total")
      tbodyElement.innerHTML = cartHTML.join("\n");
      totalEl.innerText = total;
  };
  
  tbodyElement.addEventListener("click",(event) => {
    if (event.target.classList.contains("remove")) {
      mainDivRemove = event.target.parentElement.parentElement;
      mainDivRemoveId = Number(mainDivRemove.id);
      const newCart = [];
      cart.forEach(element => {
          if (element.id !== mainDivRemoveId) {
              newCart.push(element);
          }      
      });
  
      cart = newCart;
      render(cart);
    }
  });    