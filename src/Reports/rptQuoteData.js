LoadCompany();
LoadCustomer();

// const companyname = document.querySelector("companyName");

async function LoadCompany() {
  const res = await fetch(
    "https://wekazxfljduiwarktyca.supabase.co/rest/v1/tbl_Company",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ",
      },
    }
  );

  const CompanyData = await res.json();

  console.log(CompanyData);

  const CompanyName = CompanyData[0].CompanyName;

  const CompanyContact = CompanyData[0].CompanyContact;

  const CompanyEmail = CompanyData[0].CompanyEmail;

  const CompanyReg = CompanyData[0].CompanyReg;

  const CompanyVat = CompanyData[0].CompanyVat;

  console.log(CompanyName);

  document
    .querySelector("#companyName")
    .insertAdjacentHTML("beforeend", CompanyName);

  document
    .querySelector("#CompanyContact")
    .insertAdjacentHTML("beforeend", CompanyContact);

  document
    .querySelector("#CompanyEmail")
    .insertAdjacentHTML("beforeend", CompanyEmail);

  document
    .querySelector("#CompanyReg")
    .insertAdjacentHTML("beforeend", CompanyReg);

  document
    .querySelector("#CompanyVat")
    .insertAdjacentHTML("beforeend", CompanyVat);
}
async function LoadCustomer() {
  const res = await fetch(
    "https://wekazxfljduiwarktyca.supabase.co/rest/v1/tbl_Company",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2F6eGZsamR1aXdhcmt0eWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM0MzYsImV4cCI6MjAwNTE1OTQzNn0.F-BMBoJT6hIMygLOP3r_-5Uvm_AUQV0dg6E3BDYOqAQ",
      },
    }
  );

  const CustomerData = await res.json();

  console.log(CustomerData);

  const CompanyName = CompanyData[0].CompanyName;

  const CompanyContact = CompanyData[0].CompanyContact;

  const CompanyEmail = CompanyData[0].CompanyEmail;

  const CompanyReg = CompanyData[0].CompanyReg;

  const CompanyVat = CompanyData[0].CompanyVat;

  console.log(CompanyName);

  document
    .querySelector("#companyName")
    .insertAdjacentHTML("beforeend", CompanyName);

  document
    .querySelector("#CompanyContact")
    .insertAdjacentHTML("beforeend", CompanyContact);

  document
    .querySelector("#CompanyEmail")
    .insertAdjacentHTML("beforeend", CompanyEmail);

  document
    .querySelector("#CompanyReg")
    .insertAdjacentHTML("beforeend", CompanyReg);

  document
    .querySelector("#CompanyVat")
    .insertAdjacentHTML("beforeend", CompanyVat);
}
