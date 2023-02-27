import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

// Função que gera dados aleatórios para a tabela
export function generateRandomData() {
  const names = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson', 'Charlie Brown'];
  const paymentMethods = ['VISA', 'Mastercard', 'AMEX', 'Discover'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'];

  const rows = [];

  // Gere 10 linhas de dados aleatórios
  for (let i = 0; i < 10; i++) {
    const id = i;
    const date = new Date().toLocaleDateString();
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const amount = Math.floor(Math.random() * 1000) + 100;

    rows.push({ id, date, name, city, paymentMethod, amount });
  }

  // Adicione um novo campo para o total de vendas
  const totalAmount = rows.reduce((total, row) => total + row.amount, 0);
  rows.push({ id: 'total', amount: totalAmount });

  return rows;
}

export default function Orders() {
  // Define o estado inicial com as linhas geradas aleatoriamente
  const [rows, setRows] = React.useState(generateRandomData());

  // Função para gerar novos dados aleatórios e atualizar o estado
  function handleButtonClick() {
    const newRows = generateRandomData();
    setRows(newRows);
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id === 'total' ? 'Total' : row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 3 }}>
        Generate new data
      </Button>
    </React.Fragment>
  );
}

