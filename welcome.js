document.getElementById('menButton').addEventListener('click', function() {
    window.location.href = 'men.html';
});
document.getElementById('womenButton').addEventListener('click', function() {
    window.location.href = 'women.html';
});
document.getElementById('kidsButton').addEventListener('click', function() {
    window.location.href = 'kids.html';
});




document.addEventListener('DOMContentLoaded', function () {
   
    let currentImgIndx = 0;
    let imagesUrls = []; 
    const TrendImg = document.getElementById("Image-to-be-changed");

   
    function changeImage(direction) {

        currentImgIndx += direction;

    if (currentImgIndx >= imagesUrls.length) {
            currentImgIndx = 0;
        }

        TrendImg.src = imagesUrls[currentImgIndx];
    } 


    function fetchingImgsFromJsonFile() {
        fetch('products-json/trending.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then(fetchedProducts => {
                imagesUrls = fetchedProducts.images; 
                if (imagesUrls.length > 0) { 
                    TrendImg.src = imagesUrls[0]; 
                }
            })
         
    }
    setInterval(() => changeImage(1), 2000);
    fetchingImgsFromJsonFile();
    
   
});

