// vwLogin.js - Versão corrigida
async function vwLogin() {
  const form = document.getElementById("formLogin");
  const formData = Object.fromEntries(new FormData(form).entries()); // Convertendo para objeto

  // Validação local usando validate.js (CDN)
  const constraints = {
    UserName: {
      presence: { message: " é obrigatório!" },
      length: { minimum: 1 }
    },
    Password: {
      presence: { message: " é obrigatório!" },
      length: { minimum: 1 }
    }
  };

  const errors = validate(formData, constraints);
  
  if (errors) {
    alert(Object.values(errors)[0]);
    return false;
  }

  try {
    const response = await axios.post('/login', formData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data.status === "ok") {
      Cookies.set('isLogged', true, { sameSite: 'strict' });
      window.location.href = "/home";
    } else {
      alert('Erro: ' + response.data.msg);
    }
  } catch (error) {
    alert('Erro: ' + (error.response?.data?.msg || error.message));
  }
}