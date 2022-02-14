import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [type, setType] = useState('deposit')
    const [category, setCategory] = useState('');


    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        const data = {
            title,
            value,
            type,
            category
        }

        api.post('/transactions', data)
    }

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="rect-modal-overlay"
          className="react-modal-content"
        >
          <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
          >
                <img src={closeImg} alt="Fechar modal"/>
          </button>

          <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <input 
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => {
                        setValue(Number(e.target.value))
                    }}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida"/>
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                />

                <button type="submit">
                    Cadastrar 
                </button>
            </Container>
          
      </Modal>
    )
}