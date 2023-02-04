const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// unsplash API
const count = 10;
const apiKey = "AXZ0yokGW2p4M92cA4kwh4mgIXogAsoZz5k8iOSf3_o";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// helper function to set attributes on DOM elememts
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links and photos add to DOm
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  // run function for each object in photoarray
  photoArray.forEach((photo) => {
    // create <a> to link to unsplash</a>
    let item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img for photo
    let img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // evenet listners, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer element
    imageContainer.appendChild(item).appendChild(img);
  });
};

// get photos from unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
    console.log("error");
  } catch (error) {
    console.log(error);
  }
};

// check to see if scrolling near bottom of page, load More photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
