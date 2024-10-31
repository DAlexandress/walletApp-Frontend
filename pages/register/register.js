const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onClickRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (name.length < 3) {
    alert("Nome precisa ter mais que 3 caracteres");
    return;
  }
  if (email.length < 5 || !email.includes("@")) {
    alert(
      "O e-mail precisa ter mais de 5 caracteres e incluir o símbolo '@'. Verifique o e-mail e tente novamente."
    );
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    alert("Falha ao cadastrar usuario");
    return;
  }
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("../home/home.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onClickRegister();
  };
};
