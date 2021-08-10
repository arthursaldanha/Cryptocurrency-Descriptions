(() => {
   document.querySelector(".cryptos").addEventListener("submit", async (event) => {
      event.preventDefault();

      let select = document.querySelector("#cryptos__option");
      let value = select.options[select.selectedIndex].value;
      let text = select.options[select.selectedIndex].text;
      console.log(text);

      if (value !== "") {
         showWarining("Carragando...")
         
         let URL = `https://www.mercadobitcoin.net/api/${value}/ticker/`;
         let res = await fetch(URL);
         let json = await res.json();

         showInfo({
            price: json.last,
            high: json.high,
            low: json.low
         })
      } else {
         showWarining("Selecione uma das opções corretamente!");
      }
   })

   function showInfo(json) {
      showWarining("")

   }

   function showWarining(msg) {
      document.querySelector(".aviso").textContent = msg;
   };
})();