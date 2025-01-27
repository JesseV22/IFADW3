const axios = require("axios");

const manutGrupos = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/api/groups", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    res.render("grupos/view/vwManutGrupos.njk", {
      title: "Manutenção de Grupos",
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
    res.render("grupos/view/vwManutGrupos.njk", {
      title: "Manutenção de Grupos",
      data: null,
      erro: remoteMSG,
      userName: userName,
    });
  }
};

const insertGrupos = async (req, res) => {
  if (req.method == "GET") {
    const token = req.session.token;
    return res.render("grupos/view/vwFCrGrupos.njk", {
      title: "Cadastro de Grupos",
      data: null,
      erro: null,
      userName: null,
    });
  } else {
    const regData = req.body;
    const token = req.session.token;
    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/api/groups", regData, {
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

const ViewGrupos = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method == "GET") {
      const id = req.params.id;
      const response = await axios.get(
        process.env.SERVIDOR_DW3Back + `/api/groups/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.render("grupos/view/vwFRUDrGrupos.njk", {
        title: "Visualização de Grupos",
        data: response.data,
        disabled: true,
        userName: userName,
      });
    }
  } catch (erro) {
    res.json({ status: "[ctlGrupos.js|ViewGrupos] Grupo não localizado!" });
    console.log("[ctlGrupos.js|ViewGrupos] Try Catch: Erro não identificado", erro);
  }
};

const UpdateGrupos = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method == "GET") {
      const id = req.params.id;
      const response = await axios.get(
        process.env.SERVIDOR_DW3Back + `/api/groups/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.render("grupos/view/vwFRUDrGrupos.njk", {
        title: "Atualização de dados de Grupos",
        data: response.data,
        disabled: false,
        userName: userName,
      });
    } else {
      const regData = req.body;
      const token = req.session.token;
      try {
        const response = await axios.put(process.env.SERVIDOR_DW3Back + `/api/groups/${regData.grupoid}`, regData, {
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
        console.error('[ctlGrupos.js|UpdateGrupos] Erro ao atualizar dados de grupos no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  } catch (erro) {
    res.json({ status: "[ctlGrupos.js|UpdateGrupos] Grupo não localizado!" });
    console.log("[ctlGrupos.js|UpdateGrupos] Try Catch: Erro não identificado", erro);
  }
};

const DeleteGrupos = async (req, res) => {
  const regData = req.body;
  const token = req.session.token;
  try {
    const response = await axios.delete(process.env.SERVIDOR_DW3Back + `/api/groups/${regData.grupoid}`, {
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
    console.error('[ctlGrupos.js|DeleteGrupos] Erro ao deletar dados de grupos no servidor backend:', error.message);
    res.json({
      status: "Error",
      msg: error.message,
      data: null,
      erro: null,
    });
  }
};

module.exports = {
  manutGrupos,
  insertGrupos,
  ViewGrupos,
  UpdateGrupos,
  DeleteGrupos
};
