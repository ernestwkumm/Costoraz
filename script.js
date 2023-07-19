console.log("hello world!");

const btn = document.querySelector(".hamburger-menu");
const logo = document.querySelector(".Logo_full");
const paragraph = document.querySelector(".paragraph")

console.dir(btn);

loadData()

async function loadData(){
  const res = await fetch("https://wekazxfljduiwarktyca.supabase.co/rest/v1/inventoryData", {
    headers:{
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ"
    }
  });
  
  const data = await res.json();
  console.log(data);
}




// btn.addEventListener("click", function() {

//   if (logo.classList.contains("hidden")) {
//     logo.classList.remove("hidden");

//   } else{
//     logo.classList.add("hidden");
//   }
// } )