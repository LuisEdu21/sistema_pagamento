import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MetodoPagamento() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const userId = usuario?.uuid;

  const [metodos, setMetodos] = useState([]);
  const [formData, setFormData] = useState({
    owner_name: "",
    card_number: "",
    expiration_date: "",
    security_code: "",
    payment_type: "credit", // valor padrão
  });
  const [isEditing, setIsEditing] = useState(false);
  const [metodoId, setMetodoId] = useState(null);

  const fetchMetodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/payment_method", {
        params: { user: userId },
      });
      setMetodos(res.data);
    } catch (err) {
      console.error("Erro ao buscar métodos:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMetodos();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.patch("http://localhost:8000/payment_method", formData, {
          params: {
            user: userId,
            uuid: metodoId,
          },
        });
      } else {
        await axios.post("http://localhost:8000/payment_method", {
          ...formData,
          user: userId,
        });
      }

      setFormData({
        owner_name: "",
        card_number: "",
        expiration_date: "",
        security_code: "",
        payment_type: "credit",
      });
      setIsEditing(false);
      setMetodoId(null);
      fetchMetodos();
    } catch (err) {
      console.error("Erro ao salvar método:", err);
    }
  };

  const handleEdit = (metodo) => {
    setFormData({
      owner_name: metodo.owner_name,
      card_number: metodo.card_number,
      expiration_date: metodo.expiration_date,
      security_code: metodo.security_code,
      payment_type: metodo.payment_type || "credit", // fallback se não tiver no backend
    });
    setMetodoId(metodo.uuid);
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete("http://localhost:8000/payment_method", {
        params: { user: userId, uuid },
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
            inputProps={{ minLength: 16 }}
            required
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
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value="credit">Crédito</MenuItem>
              <MenuItem value="debit">Débito</MenuItem>
            </Select>
          </FormControl>
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
                <Typography variant="body2">
                  Número: {metodo.card_number}
                </Typography>
                <Typography variant="body2">
                  Validade: {metodo.expiration_date}
                </Typography>
                <Typography variant="body2">
                  CVV: {metodo.security_code}
                </Typography>
                <Typography variant="body2">
                  Tipo:{" "}
                  {metodo.payment_type === "credit" ? "Crédito" : "Débito"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(metodo)}>
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(metodo.uuid)}
                >
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
