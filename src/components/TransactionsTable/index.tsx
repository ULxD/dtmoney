import { useEffect, useState} from 'react';
import { Container } from './styles';
import { api } from '../../services/api'


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

export function TransactionsTable(){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((e) => (
                        <tr key={e.id}>
                            <td>{e.title}</td>
                            <td className={e.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(e.amount)}
                            </td>
                            <td>{e.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(e.createdAt)
                                )}
                             </td>
                        </tr>
                    ) )}
                </tbody>
            </table>
        </Container>
    )
}