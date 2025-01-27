const axios = require("axios");

const manutMenu = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/api/menus", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    res.render("menu/view/vwManutMenu.njk", {
      title: "Manutenção de Menus",
      data: resp.data,
      erro: null,
      userName: userName,
    });
  } catch (error) {
    let remoteMSG = "Sem mais informações";
    if (error.code === "ECONNREFUSED") {
      remoteMSG = "Servidor indisponível";
    } else if (error.code === "ERR_BAD_REQUEST") {
      remoteMSG = "Usuário não autenticado";
    } else {
      remoteMSG = error;
    }
    res.render("menu/view/vwManutMenu.njk", {
      title: "Manutenção de Menus",
      data: null,
      erro: remoteMSG,
      userName: userName,
    });
  }
};

const insertMenu = async (req, res) => {
  if (req.method == "GET") {
    const token = req.session.token;
    return res.render("menu/view/vwFCrMenu.njk", {
      title: "Cadastro de Menus",
      data: null,
      erro: null,
      userName: null,
    });
  } else {
    const regData = req.body;
    const token = req.session.token;
    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/api/menus", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });
      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('Erro ao inserir dados no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  }
};

const ViewMenu = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method == "GET") {
      const id = req.params.id;
      const response = await axios.get(
        process.env.SERVIDOR_DW3Back + `/api/menus/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.render("menu/view/vwFRUDrMenu.njk", {
        title: "Visualização de Menus",
        data: response.data,
        disabled: true,
        userName: userName,
      });
    }
  } catch (erro) {
    res.json({ status: "[ctlMenu.js|ViewMenu] Menu não localizado!" });
    console.log("[ctlMenu.js|ViewMenu] Try Catch: Erro não identificado", erro);
  }
};

const UpdateMenu = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method == "GET") {
      const id = req.params.id;
      const response = await axios.get(
        process.env.SERVIDOR_DW3Back + `/api/menus/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.render("menu/view/vwFRUDrMenu.njk", {
        title: "Atualização de dados de Menus",
        data: response.data,
        disabled: false,
        userName: userName,
      });
    } else {
      const regData = req.body;
      const token = req.session.token;
      try {
        const response = await axios.put(process.env.SERVIDOR_DW3Back + `/api/menus/${regData.menuid}`, regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });
        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('[ctlMenu.js|UpdateMenu] Erro ao atualizar dados de menus no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  } catch (erro) {
    res.json({ status: "[ctlMenu.js|UpdateMenu] Menu não localizado!" });
    console.log("[ctlMenu.js|UpdateMenu] Try Catch: Erro não identificado", erro);
  }
};

const DeleteMenu = async (req, res) => {
  const regData = req.body;
  const token = req.session.token;
  try {
    const response = await axios.delete(process.env.SERVIDOR_DW3Back + `/api/menus/${regData.menuid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      timeout: 5000,
    });
    res.json({
      status: response.data.status,
      msg: response.data.status,
      data: response.data,
      erro: null,
    });
  } catch (error) {
    console.error('[ctlMenu.js|DeleteMenu] Erro ao deletar dados de menus no servidor backend:', error.message);
    res.json({
      status: "Error",
      msg: error.message,
      data: null,
      erro: null,
    });
  }
};

module.exports = {
  manutMenu,
  insertMenu,
  ViewMenu,
  UpdateMenu,
  DeleteMenu
};
