(() => {
   document.querySelector(".cryptos").addEventListener("submit", async (event) => {
      event.preventDefault();

      let select = document.querySelector("#cryptos__option");
      let value = select.options[select.selectedIndex].value;
      let text = select.options[select.selectedIndex].text;

      console.log(text, value);

      if (value !== "") {
         showWarining("Carragando...")
         
         let URL = `https://www.mercadobitcoin.net/api/${value}/ticker/`;
         let res = await fetch(URL);
         let json = await res.json();
         console.log(json);

         json.ticker.last = parseFloat(json.ticker.last).toFixed(2);
         json.ticker.open = parseFloat(json.ticker.open).toFixed(2);

         showInfo({
            price: json.ticker.last,
            open: json.ticker.open,
            high: json.ticker.high,
            low: json.ticker.low
         })
         
      } else {
         showWarining("Selecione uma das opções corretamente!");
      }

      function showInfo(json) {
         showWarining("")
   
         document.querySelector(".result").style.display = "block"
         document.querySelector(".name").innerHTML = text;
         document.querySelector(".symbol").innerHTML = value;
         document.querySelector(".price").innerHTML = `Cotação Atual: <b>R$ ${json.price}</b>`
         document.querySelector(".variation").innerHTML = `Variação em 24hrs: ${(json.price / json.open)}`;
         
         let image = document.querySelector(".image")
         image.src = `./Images/${value}.png`
      }
   })

   function showWarining(msg) {
      document.querySelector(".warning").innerHTML = msg;
   };
})();