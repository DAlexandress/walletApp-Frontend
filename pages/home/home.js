const renderFinanceList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Título");
  const titleElement = document.createElement("th");
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "right";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

  data.map((item) => {
    const tableRow = document.createElement("tr");

    //tiltle
    const titleTD = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTD.appendChild(titleText);
    tableRow.appendChild(titleTD);

    //category
    const categoryTD = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTD.appendChild(categoryText);
    tableRow.appendChild(categoryTD);

    //date
    const dateTD = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTD.appendChild(dateText);
    tableRow.appendChild(dateTD);

    //value
    const valueTD = document.createElement("td");
    valueTD.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );

    valueTD.appendChild(valueText);
    tableRow.appendChild(valueTD);

    //delete
    const deleteTD = document.createElement("td");
    deleteTD.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTD.appendChild(deleteText);
    tableRow.appendChild(deleteTD);

    //table add tableRow
    table.appendChild(tableRow);
  });
};

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
  financeCard1.innerHTML = "";

  const totalSubText = document.createTextNode("Total de Lançamentos");
  const totalSubTextElement = document.createElement("h3");
  totalSubTextElement.appendChild(totalSubText);
  financeCard1.appendChild(totalSubTextElement);

  const totalElement = document.createElement("h1");
  totalElement.className = "mt smaller";
  const totalText = document.createTextNode(totalItems);
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  //renderizando receitas
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenuesSubText = document.createTextNode("Receitas");
  const revenuesSubTextElement = document.createElement("h3");
  revenuesSubTextElement.appendChild(revenuesSubText);
  financeCard2.appendChild(revenuesSubTextElement);

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
  financeCard3.innerHTML = "";

  const expensesSubText = document.createTextNode("Despesas");
  const expensesSubTextElement = document.createElement("h3");
  expensesSubTextElement.appendChild(expensesSubText);
  financeCard3.appendChild(expensesSubTextElement);

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
  financeCard4.innerHTML = "";

  const balanceSubText = document.createTextNode("Balanço");
  const balanceSubTextElement = document.createElement("h3");
  balanceSubTextElement.appendChild(balanceSubText);
  financeCard4.appendChild(balanceSubTextElement);

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
    const date = "2023-12-15";
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
    console.log(data);
    renderFinanceElements(data);
    renderFinanceList(data);
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

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/categories"
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoriesText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoriesText);
      categoriesSelect.appendChild(option);
    });
  } catch (error) {}
};

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};
const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
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

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar um novo dado financeiro.");
      return;
    }
    onCloseModal();
    onloadFinancesData();
  } catch (error) {
    alert("Erro ao adicionar um novo dado financeiro.");
  }
};

window.onload = () => {
  onLoadUserInfo();
  onloadFinancesData();
  onLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease(event.target);
  };
};
