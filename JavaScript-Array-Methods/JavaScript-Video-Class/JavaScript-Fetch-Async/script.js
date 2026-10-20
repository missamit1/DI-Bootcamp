
 // ========================================
 // EXERCISE 1: Giphy API
 // ========================================

 async function getHilariousGifs() {
     try {
         const url = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

         const response = await fetch(url);

         if (!response.ok) {
             throw new Error(`HTTP Error: ${response.status}`);
         }

         const data = await response.json();
         console.log("Exercise 1:", data);

     } catch (error) {
         console.error("Exercise 1 Error:", error);
     }
 }

 getHilariousGifs();


 // ========================================
 // EXERCISE 2: 10 Sun GIFs
 // ========================================

 async function getSunGifs() {
     try {
         const url = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

         const response = await fetch(url);

         if (!response.ok) {
             throw new Error(`HTTP Error: ${response.status}`);
         }

         const data = await response.json();
         console.log("Exercise 2:", data);

     } catch (error) {
         console.error("Exercise 2 Error:", error);
     }
 }

 getSunGifs();


 // ========================================
 // EXERCISE 3: Star Wars Async/Await
 // ========================================

 async function getStarWarsStarship() {
     try {
         const response = await fetch(
             "https://www.swapi.tech/api/starships/9/"
         );

         if (!response.ok) {
             throw new Error(`HTTP Error: ${response.status}`);
         }

         const objectStarWars = await response.json();

         console.log("Exercise 3:", objectStarWars.result);

     } catch (error) {
         console.error("Exercise 3 Error:", error);
     }
 }

 getStarWarsStarship();


 // ========================================
 // EXERCISE 4: Analyze Async Code
 // ========================================

 function resolveAfter2Seconds() {
     return new Promise(resolve => {
         setTimeout(() => {
             resolve("resolved");
         }, 2000);
     });
 }

 async function asyncCall() {
     console.log("calling");

     let result = await resolveAfter2Seconds();

     console.log(result);
 }

 asyncCall();

 // Expected output:
 // calling
 // resolved (after 2 seconds)
