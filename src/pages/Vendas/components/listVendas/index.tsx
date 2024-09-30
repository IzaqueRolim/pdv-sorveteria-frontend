import React from 'react';
import { useVendaContext } from '../../../../context/VendaContext.tsx';

import "./style.css"

function ListVendas() {
    const { vendas } = useVendaContext();

    return (
        <div className="vendas-container">
            {vendas.map((venda, index) => (
                <div key={index} className="venda-card">
                    <div className="venda-header">
                        <div>
                            <p className="venda-id">Venda #{venda.id}</p>
                            <p className="items-count">Quantidade de Itens: {venda.subVendas.length}</p>
                        </div>
                        <div className="venda-time">
                            {new Date(venda.diaVenda).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    <div className="venda-body">
                        {venda.subVendas.map((subVenda, subIndex) => (
                            <div key={subIndex} className="subvenda-item">
                                <span className="subvenda-receita">{subVenda.receita.name}</span>
                                <span className="subvenda-quantidade">x{subVenda.quantidade}</span>
                                <span className="subvenda-subtotal">R${Number(subVenda.receita.preco).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="venda-footer">
                        <p className="preco-total">Total: R${venda.precoTotal.toFixed(2)}</p>
                        <span className="status">{venda.formaPagamento}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListVendas;