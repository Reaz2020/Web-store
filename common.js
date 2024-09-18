

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
                    throw new Error('Network not responded');
                }
                return response.json();
            })
            .then(fetchedProducts => {
                imagesUrls = fetchedProducts.images; // Storing the fetched image URLs in the images array ****
                if (imagesUrls.length > 0) { 
                    TrendImg.src = imagesUrls[0]; // put the first image in the url source of html page 
                }
            })
            .catch(error => console.error('Error  while fetching images:', error));
    }
    setInterval(() => changeImage(1), 3000);
    fetchingImgsFromJsonFile();
    
   
});
