import React, { useState } from 'react'
import Modal from '../../../../components/genericModal/index.tsx'

import './style.css'
import { PaymentMethod } from '../../../../context/VendaContext.tsx';

const ModalPagamento = ({ isModalOpen, close, onClickFunction }) => {
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

    const handlePaymentSelection = (paymentMethod: PaymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    return (
        <Modal title="Finalizar Compra" isOpen={isModalOpen} onClose={close}>
            <div className="modal-content">
                <span className="modal-text">Selecione a forma de pagamento</span>
                <div className="payment-options">
                    <button
                        className={`payment-button ${selectedPayment === PaymentMethod.PIX ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelection(PaymentMethod.PIX)}
                    >
                        PIX
                    </button>
                    <button
                        className={`payment-button ${selectedPayment === PaymentMethod.Dinheiro ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelection(PaymentMethod.Dinheiro)}
                    >
                        Dinheiro em Papel
                    </button>
                    <button
                        className={`payment-button ${selectedPayment === PaymentMethod.Credito ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelection(PaymentMethod.Credito)}
                    >
                        Cartão de Crédito
                    </button>
                    <button
                        className={`payment-button ${selectedPayment === PaymentMethod.Debito ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelection(PaymentMethod.Debito)}
                    >
                        Cartão de Débito
                    </button>
                </div>
                <button className="modal-button" onClick={()=>onClickFunction(selectedPayment)}>
                    Finalizar
                </button>
            </div>
        </Modal>
    );
};

export default ModalPagamento;
