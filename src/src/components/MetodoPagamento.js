import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FAKE_USER_ID = uuidv4(); // Substitua por ID real se tiver autenticação

export default function MetodoPagamento() {
  const [metodos, setMetodos] = useState([]);
  const [formData, setFormData] = useState({
    owner_name: "",
    card_number: "",
    expiration_date: "",
    security_code: "",
    uuid: null, // usado para saber se é edição
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchMetodos = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/payment_method`, {
        params: { user: FAKE_USER_ID },
      });
      setMetodos(res.data);
    } catch (err) {
      console.error("Erro ao buscar métodos:", err);
    }
  };

  useEffect(() => {
    fetchMetodos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:8000/payment_method`, formData, {
          params: {
            user: FAKE_USER_ID,
            uuid: formData.uuid,
          },
        });
      } else {
        await axios.post(`http://localhost:8000/payment_method`, {
          ...formData,
          user: FAKE_USER_ID,
        });
      }
      setFormData({
        owner_name: "",
        card_number: "",
        expiration_date: "",
        security_code: "",
        uuid: null,
      });
      setIsEditing(false);
      fetchMetodos();
    } catch (err) {
      console.error("Erro ao salvar método:", err);
    }
  };

  const handleEdit = (metodo) => {
    setFormData(metodo);
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:8000/payment_method`, {
        params: { user: FAKE_USER_ID, uuid },
      });
      fetchMetodos();
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Métodos de Pagamento
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="owner_name"
            label="Nome do Titular"
            fullWidth
            value={formData.owner_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="card_number"
            label="Número do Cartão"
            fullWidth
            value={formData.card_number}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            name="expiration_date"
            label="Expiração (MM/YYYY)"
            fullWidth
            value={formData.expiration_date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            name="security_code"
            label="Código de Segurança"
            fullWidth
            value={formData.security_code}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {metodos.map((metodo) => (
          <Grid item xs={12} sm={6} md={4} key={metodo.uuid}>
            <Card>
              <CardContent>
                <Typography variant="h6">{metodo.owner_name}</Typography>
                <Typography variant="body2">Número: {metodo.card_number}</Typography>
                <Typography variant="body2">Validade: {metodo.expiration_date}</Typography>
                <Typography variant="body2">CVV: {metodo.security_code}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(metodo)}>Editar</Button>
                <Button size="small" color="error" onClick={() => handleDelete(metodo.uuid)}>
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
