import { useContext} from 'react';
import { TransactionsContext } from '../../TransactionsContext';
import { Container } from './styles';


export function TransactionsTable(){
    const { transactions } = useContext(TransactionsContext);

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