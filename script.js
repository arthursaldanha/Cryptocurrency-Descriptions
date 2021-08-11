(() => {
   document.querySelector(".cryptos").addEventListener("submit", async (event) => {
      event.preventDefault();

      let select = document.querySelector("#cryptos__option");
      let value = select.options[select.selectedIndex].value;
      let text = select.options[select.selectedIndex].text;

      if (value !== "") {
         showWarining("Carragando...")
         
         let URL = `https://www.mercadobitcoin.net/api/${value}/ticker/`;
         let res = await fetch(URL);
         let json = await res.json();

         console.log(json);
         
         json.ticker.last = parseFloat(json.ticker.last).toFixed(2);

         showInfo({
            price: json.ticker.last,
         })
      } else {
         showWarining("Selecione uma das opções corretamente!");
         document.querySelector(".result").style.display = "none"
      }

      function showInfo(json) {
         showWarining("")

         document.querySelector(".result").style.display = "block"
         document.querySelector(".name").innerHTML = text;
         document.querySelector(".symbol").innerHTML = value;
         document.querySelector(".price").innerHTML = `Cotação Atual: <b>R$ ${json.price}</b>`

         let image = document.querySelector(".image");
         image.src = `./Images/${value}.png`;
      }
   })

   function showWarining(msg) {
      document.querySelector(".warning").innerHTML = msg;
   };
})();