const input = document.querySelector(".input");
const btn = document.querySelector(".card__downloadbutton");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  btn.innerText = "Downloading...";
  downloadFunction(input.value);
});

function downloadFunction(url) {
  //Fetch the url
  fetch(url)
    .then((Response) => {
      //Turning the respone to blob object.
      return Response.blob();
    })
    .then((file) => {
      //creating url using creatObjectURL method
      // and assigning the returned value to href variable
      const href = URL.createObjectURL(file);
      //creating anchor element and assign href attribute
      const link = Object.assign(document.createElement("a"), {
        href,
        style: "display: none;",
        download: "myfile",
      });
      document.body.appendChild(link);
      link.click();
      //Remove the URL and related data from the cache.
      URL.revokeObjectURL(url);
      link.remove();
      btn.innerText = "Downloading";
    })
    .catch((error) => console.log(error));
}