document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contactForm");
  var formWrap = document.getElementById("contactFormWrap");
  var successCard = document.getElementById("successCard");
  var againBtn = document.getElementById("sendAnotherBtn");
  if (!form) return;

  var submitBtn = form.querySelector('button[type="submit"]');
  var submitDefaultText = submitBtn.innerHTML;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(form);
    var name = (formData.get("Name") || "").toString().trim();
    var firstName = name.split(" ")[0] || "there";

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function () {
        formWrap.style.display = "none";
        successCard.querySelector(".success-body").textContent =
          "Thanks " + firstName + " — we've logged your note and one of us will personally reply within 1–2 business days.";
        successCard.style.display = "block";
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitDefaultText;
        alert("Something went wrong sending your message — please email us directly at alturatechai@gmail.com.");
      });
  });

  if (againBtn) {
    againBtn.addEventListener("click", function () {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitDefaultText;
      successCard.style.display = "none";
      formWrap.style.display = "block";
    });
  }
});
