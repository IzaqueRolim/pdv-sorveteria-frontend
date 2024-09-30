import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { Receita, useReceitaContext } from "../../../../context/ReceitaContext.tsx";
import { PaymentMethod, SubVenda, useVendaContext, Venda } from "../../../../context/VendaContext.tsx";
import { formatDate } from "../../../../utils/date.ts";
import ModalPagamento from "../modalPagamento/index.tsx";

const initialState = {
    carrinho: [] as SubVenda[],
    novaVenda: {} as Venda,
};

type StateType = typeof initialState;

type ActionType =
    | { type: 'ADD_TO_CART'; payload: Receita }
    | { type: 'UPDATE_QUANTITY'; payload: { receita: Receita, quantidade: number } }
    | { type: "ADD_QUANTITY"; payload: { receita: Receita } }
    | { type: "LOSS_QUANTITY"; payload: { receita: Receita } }
    | { type: 'REMOVE_FROM_CART'; payload: Receita }
    | { type: 'RESET_CART' };

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.carrinho.findIndex(
                (item) => item.receita.id === action.payload.id
            );

            if (existingItemIndex !== -1) {
                const updatedCarrinho = state.carrinho.map((item, index) =>
                    index === existingItemIndex
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1,
                            subtotal: item.subtotal + Number(action.payload.preco),
                        }
                        : item
                );

                return {
                    ...state,
                    carrinho: updatedCarrinho,
                    novaVenda: {
                        ...state.novaVenda,
                        subVendas: updatedCarrinho,
                        precoTotal: Number(state.novaVenda.precoTotal) + Number(action.payload.preco),
                    },
                };
            } else {
                const newSubvenda: SubVenda = {
                    quantidade: 1,
                    subtotal: Number(action.payload.preco),
                    receita: action.payload,
                };

                return {
                    ...state,
                    carrinho: [...state.carrinho, newSubvenda],
                    novaVenda: {
                        ...state.novaVenda,
                        subVendas: [...state.carrinho, newSubvenda],
                        precoTotal: Number(state.novaVenda.precoTotal) + Number(action.payload.preco),
                    },
                };
            }
        }

        case 'ADD_QUANTITY': {
            const existingItemIndex = state.carrinho.findIndex(
                (item) => item.receita.id === action.payload.receita.id
            );

            if (existingItemIndex !== -1) {
                const updatedCarrinho = state.carrinho.map((item, index) =>
                    index === existingItemIndex
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1,
                            subtotal: item.subtotal + Number(action.payload.receita.preco),
                        }
                        : item
                );

                return {
                    ...state,
                    carrinho: updatedCarrinho,
                    novaVenda: {
                        ...state.novaVenda,
                        subVendas: updatedCarrinho,
                        precoTotal: Number(state.novaVenda.precoTotal) + Number(action.payload.receita.preco),
                    },
                };
            }
            return state;
        }

        case 'LOSS_QUANTITY': {
            const existingItemIndex = state.carrinho.findIndex(
                (item) => item.receita.id === action.payload.receita.id
            );

            if (existingItemIndex !== -1) {
                const updatedCarrinho = state.carrinho.map((item, index) =>
                    index === existingItemIndex && item.quantidade > 1
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1,
                            subtotal: item.subtotal - Number(action.payload.receita.preco),
                        }
                        : item
                ).filter(item => item.quantidade > 0); // Filtra os itens que têm quantidade maior que zero

                return {
                    ...state,
                    carrinho: updatedCarrinho,
                    novaVenda: {
                        ...state.novaVenda,
                        subVendas: updatedCarrinho,
                        precoTotal: updatedCarrinho.reduce((total, item) => total + item.subtotal, 0),
                    },
                };
            }
            return state;
        }

        case 'REMOVE_FROM_CART': {
            const updatedCarrinho = state.carrinho.filter(
                (item) => item.receita.id !== action.payload.id
            );

            return {
                ...state,
                carrinho: updatedCarrinho,
                novaVenda: {
                    ...state.novaVenda,
                    subVendas: updatedCarrinho,
                    precoTotal: updatedCarrinho.reduce((total, item) => total + item.subtotal, 0),
                },
            };
        }

        case 'RESET_CART': {
            return {
                carrinho: [],
                novaVenda: {
                    precoTotal: 0,
                    diaVenda: formatDate(new Date()),
                    subVendas: [],
                    formaPagamento: PaymentMethod.PIX
                },
            };
        }

        default:
            return state;
    }
};


const ListaDeReceitas: React.FC = () => {
    const { receitas } = useReceitaContext();
    const { vendas, setVendas, addVenda } = useVendaContext();
    const [state, dispatch] = useReducer(reducer, {
        carrinho: [],
        novaVenda: {
            ...vendas[0],
            precoTotal: 0,
            diaVenda: formatDate(new Date()),
            subVendas: [],
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false)

    const adicionarAoCarrinho = (receita: Receita) => {
        dispatch({ type: "ADD_TO_CART", payload: receita });
    };

    const aumentarQuantidade = (receita: Receita) => {
        dispatch({ type: "ADD_QUANTITY", payload: { receita } });
    };

    const diminuirQuantidade = (receita: Receita) => {
        dispatch({ type: "LOSS_QUANTITY", payload: { receita } });
    };

    const removerDoCarrinho = (receita: Receita) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: receita });
    };



    const handleSubmit = (selectedPayment: PaymentMethod) => {
        addVenda({ ...state.novaVenda, formaPagamento: selectedPayment });
        dispatch({ type: 'RESET_CART' });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ModalPagamento isModalOpen={isModalOpen} close={() => setIsModalOpen(false)} onClickFunction={handleSubmit} />
            <StyledCardContainer>
                {receitas.map((receita) => (
                    <StyledCard key={receita.id}>
                        <div className="card-info">
                            <img style={{ width: "140px" }} src={receita.imageBase64} />
                            <div className="text-title">{receita.name}</div>
                            <div className="text-body">R${receita.preco}</div>
                        </div>
                        <div className="card-footer">
                            <button onClick={() => adicionarAoCarrinho(receita)}>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </StyledCard>
                ))}
            </StyledCardContainer>
            <StyledCarrinho>
                <h2>Carrinho de Compras</h2>
                {state.carrinho.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    state.carrinho.map((item, index) => (
                        <div key={index}>
                            <button onClick={() => diminuirQuantidade(item.receita)}>-</button>
                            <p>
                                {item.receita.name} - R${item.subtotal.toFixed(2)} ({item.quantidade})
                            </p>
                            <button onClick={() => removerDoCarrinho(item.receita)}>Remover</button>
                            <button onClick={() => aumentarQuantidade(item.receita)}>+</button>
                        </div>
                    ))
                )}
                <p>Total: R${state.novaVenda.precoTotal}</p>
                <button onClick={() => setIsModalOpen(true)}>Finalizar</button>
            </StyledCarrinho>
        </div>
    );
};

const StyledCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: space-evenly;
    background-color: #f8f9fa;
`;

const StyledCard = styled.div`
    width: 250px;
    height: 300px;
    padding: 1em;
    background: #ffffff;
    position: relative;
    overflow: visible;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    .card-info {
        padding-top: 15%;
        .text-title {
            font-weight: bold;
            font-size: 1.4em;
            line-height: 1.5;
        }
        .text-body {
            font-size: 1em;
            padding-bottom: 10px;
            color: #6c757d;
        }
    }
    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        border-top: 1px solid #ddd;
        button {
            border: none;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                background-color: #0056b3;
            }
        }
    }
`;

const StyledCarrinho = styled.div`
    min-width: 300px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 20px;
    }

    button {
        border: none;
        padding: 10px;
        background-color: #28a745;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background-color: #218838;
        }
    }
`;

export default ListaDeReceitas;
