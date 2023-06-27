const btnEl = document.querySelector("#btn");
const errorMessageEl = document.querySelector("#errorMessage");
const galleryEl = document.querySelector("#gallery");

async function fetchImage(){

  const inputValue = document.querySelector("#input").value;
  if(inputValue > 10 || inputValue < 1){
      errorMessage.style.display = "block";
      return 
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=cZ04EVdWqYu2tZZal3nGkMYrab2z5EUZf7T3Ng_fIkg`).then((res) => res.json().then((data) => {
      
      if(data){
        data.forEach((pic)=>{
          imgs += `<img src=${pic.urls.small} alt="image">`;
          galleryEl.style.display = "block";
          galleryEl.innerHTML = imgs;
          btnEl.style.display = "block";
          errorMessageEl.style.display = "none";
        })
      }
    }));
    
  } catch (error) {
      errorMessageEl.innerHTML = "An error happened, try again later...";
      errorMessageEl.style.display = "block";
      btnEl.style.display = "block";
      errorMessageEl.style.display = "none";
   }

};

btnEl.addEventListener("click",fetchImage);