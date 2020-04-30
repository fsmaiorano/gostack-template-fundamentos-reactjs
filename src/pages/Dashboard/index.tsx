import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      api.get(`/transactions`).then(response => {
        setTransactions(response.data.transactions);
        setBalance(response.data.balance);
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            {balance ? (
              <h1 data-testid="balance-income">
                <span>R$ </span>
                {balance.income
                  ? formatValue(parseInt(balance.income, 10))
                  : '0.00'}
              </h1>
            ) : (
              <p>Carregando...</p>
            )}
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            {balance ? (
              <h1 data-testid="balance-outcome">
                <span>R$ </span>
                {balance.income
                  ? formatValue(parseInt(balance.outcome, 10))
                  : '0.00'}
              </h1>
            ) : (
              <p>Carregando...</p>
            )}
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            {balance ? (
              <h1 data-testid="balance-total">
                <span>R$ </span>
                {balance.total}
              </h1>
            ) : (
              <p>Carregando...</p>
            )}
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {transactions ? (
              transactions.map(transaction => (
                <tbody>
                  <tr>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.value
                        ? formatValue(transaction.value)
                        : '0.00'}
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.created_at}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <p>Carregando...</p>
            )}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
