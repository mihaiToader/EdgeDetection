window.onload = function () {
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var ctx = canvas1.getContext('2d');
    var image1Btn = document.getElementById("image1");
    var image2Btn = document.getElementById("image2");
    var image3Btn = document.getElementById("image3");
    var htInput = document.getElementById("high-threshold");
    var ltInput = document.getElementById("low-threshold");
    var sigmmaInput = document.getElementById("sigmma");
    var kernelSizeInput = document.getElementById("kernelSize");
    var executeBtn = document.getElementById("execute");
    var browseBtn = document.getElementById("browse-image");
    var loader = document.getElementById("loader");
    loader.style.visibility  = "hidden";

    var loadImage = function (url) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            canvas1.width = img.width;
            canvas2.width = img.width;
            canvas1.height = img.height;
            canvas2.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
    };

    var onButtonClick = function (e) {
        loadImage(e.target.value);
    };

    image1Btn.addEventListener("click", onButtonClick);
    image2Btn.addEventListener("click", onButtonClick);
    image3Btn.addEventListener("click", onButtonClick);

    var execute = function () {
        loader.style.visibility  = "visible";
        var start = new Date;
        var ht = parseInt(htInput.value);
        var lt = parseInt(ltInput.value);
        var sigmma = parseFloat(sigmmaInput.value);
        var kernelSize = parseInt(kernelSizeInput.value);
        window.canny = CannyJS.canny(canvas1, ht, lt, sigmma, kernelSize);
        canny.drawOn(canvas2);
        finish = new Date;
        duration = (finish - start) / 1000;
        console.log("Detection finished. Duration: " + duration + " seconds.");
        loader.style.visibility  = "hidden";
    };

    var previewFile = function (){
        var file    = document.querySelector('input[type=file]').files[0]; //sames as here
        var reader  = new FileReader();

        reader.onloadend = function () {
            loadImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        }
    };

    executeBtn.addEventListener("click", execute);
    browseBtn.addEventListener("change", previewFile);

    loadImage("assets/mikky.jpeg");
};
