const forms = document.querySelectorAll(".needs-validation");

forms.forEach((form) => {

    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {

        input.addEventListener("input", () => {

            if (input.value.trim() === "") {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            }

        });

    });


    form.addEventListener("submit", (event) => {

        let valid = true;

        inputs.forEach((input) => {

            if (input.required && input.value.trim() === "") {

                input.classList.remove("is-valid");
                input.classList.add("is-invalid");

                valid = false;

            } else {

                input.classList.remove("is-invalid");
                input.classList.add("is-valid");

            }

        });


        if (!valid) {
            event.preventDefault();
        }

    });

});