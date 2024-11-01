const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const balance = revenues + expenses;

  //renderizando total items
  const financeCard1 = document.getElementById("finance-card-1");
  const totalElement = document.createElement("h1");
  totalElement.className = "mt smaller";
  const totalText = document.createTextNode(totalItems);
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  //renderizando receitas
  const financeCard2 = document.getElementById("finance-card-2");
  const revenuesElement = document.createElement("h1");
  revenuesElement.className = "mt smaller";
  const revenuesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  revenuesElement.appendChild(revenuesText);
  financeCard2.appendChild(revenuesElement);

  //renderizando despesas
  const financeCard3 = document.getElementById("finance-card-3");
  const expensesElement = document.createElement("h1");
  expensesElement.className = "mt smaller";
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  expensesElement.appendChild(expensesText);
  financeCard3.appendChild(expensesElement);

  //renderizando Balanço
  const financeCard4 = document.getElementById("finance-card-4");
  const balanceElement = document.createElement("h1");
  balanceElement.className = "mt smaller";
  balanceElement.style.color = "#f1c541";
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(balance)
  );
  balanceElement.appendChild(balanceText);
  financeCard4.appendChild(balanceElement);
};

const onloadFinancesData = async () => {
  try {
    const date = "2024-10-31";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  //add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  //add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onloadFinancesData();
};
