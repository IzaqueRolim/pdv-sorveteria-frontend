import React from 'react';
import QRCode, { QRCodeCanvas } from 'qrcode.react';
import { gerarPayloadPixManual } from '../../utils/pix.ts'

const QRCodePix = ({ chavePix, valor, nomeRecebedor, cidadeRecebedor, txid }) => {

    const payloadPix = gerarPayloadPixManual({ chavePix, valor, nomeRecebedor, cidadeRecebedor, txid });

    return (
        <div>
            <h2>Pagamento via Pix</h2>
            <QRCodeCanvas value={payloadPix} />
            <p>Use o QR Code acima para realizar o pagamento.</p>
        </div>
    );
};

export default QRCodePix;
