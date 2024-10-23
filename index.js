const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );
    const user = await result.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert(
      "O e-mail precisa ter mais de 5 caracteres e incluir o símbolo '@'. Verifique o e-mail e tente novamente."
    );
    return;
  }
  const result = await validateUser(email);
  if (result.erro) {
    alert("Falha ao validar E-mail");
    return;
  }

  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("./pages/home/home.html", "_self");
};
