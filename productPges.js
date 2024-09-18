document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.getElementById('ClicksCounterForPrdct');

   
    let cartCountNumber = sessionStorage.getItem('cartCountNumber');
 
    if(cartCountNumber!==null){
       cartCountNumber= parseInt(cartCountNumber)
    }
    else{
        cartCountNumber=0;
    }


   cartCountElement.textContent = cartCountNumber;  
   
//function creating div and item in it with description 
    function creatingItemsDiv(products, section) { 
        
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('productitem');
            productItem.id = product.id;

            productItem.innerHTML = `
                <img src="${product.image}" alt="${'problem Loading Product'}"> 
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="addToCart">Add to Cart</button>
                <button class="viewPrdctBtn">View + -</button>
                
            `;

            section.appendChild(productItem);
           
        });

    

      
        const viewItemButtons = section.querySelectorAll('.viewPrdctBtn');
       
        viewItemButtons.forEach(button => {
            button.addEventListener('click', function() {
               
                // we could use doc.getElemtByIdinstead of closest but then all the products items with poductItem id would be enlarged, what closets do is target the neaer button for its nearst product, it is a common usage in this type of pages
                const productItem = button.closest('.productitem');
                productItem.classList.toggle('enlarge');
                
            });
        });

      
        const addToCartButtons = section.querySelectorAll('.addToCart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
              
                cartCountNumber++;
              cartCountElement.textContent = cartCountNumber; 
                
                sessionStorage.setItem('cartCountNumber', cartCountNumber); 
            });
        });
    }

// function will call json file and call creatingitemsDiv To create item inside the html page 
  
    function loadProducts(jsonFilNam, secId) {
        const section = document.getElementById(secId);
        


        let storedProducts = sessionStorage.getItem(jsonFilNam);

        if (storedProducts) {
            
      

            storedProducts = JSON.parse(storedProducts); 
            creatingItemsDiv(storedProducts, section);
        } else {
           
            fetch(jsonFilNam) 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response failed');
                    }
                    return response.json();
                })
                .then(productsAfterSuccessfullFetched => {
                 
                    sessionStorage.setItem(jsonFilNam, JSON.stringify(productsAfterSuccessfullFetched));// converting obj to string caz session store can only store string 
                    const savedProducts = JSON.parse(sessionStorage.getItem(jsonFilNam));
                   
                     creatingItemsDiv(savedProducts, section);
 
                })
              
        }
    }


    const page = window.location.pathname.split('/'); 
    switch (page.pop()) { 
        case 'menCloths.html':
            loadProducts('products-json/manCloths.json', 'mensClothSection')
            break;
        case 'menAccecories.html':
            loadProducts('products-json/manAcces.json', 'mensAccesSection');
            break;
        case 'womenCloths.html':
            loadProducts('products-json/womenCloths.json', 'womenClothsSection');
            break;
        case 'womenAccessories.html':
                loadProducts('products-json/womenAcces.json', 'womensAccesSection');
                break;
        case 'kidsCloths.html':
            loadProducts('products-json/KidsCloths.json', 'kidsClothssSection');
            break;
        case 'kidAccecories.html':
                loadProducts('products-json/kidsAcces.json', 'kidsAccesSection');
                break;    
    }





});



