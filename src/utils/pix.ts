export const gerarPayloadPixManual = ({ chavePix, valor, nomeRecebedor, cidadeRecebedor, txid }) => {
    const pad = (str, length) => str.toString().padStart(length, '0');
  
    // Função para formatar as informações conforme o padrão do Pix
    const formatarCampo = (id, value) => `${pad(id, 2)}${pad(value.length, 2)}${value}`;
  
    const payload = [
      formatarCampo(0, '01'), // Payload format indicator
      formatarCampo(1, '12'), // Merchant Account Information Template ID
      formatarCampo(26, [
        formatarCampo('00', 'BR.GOV.BCB.PIX'),
        formatarCampo('01', chavePix),
      ].join('')), // Merchant Account Information
      formatarCampo(52, '0000'), // Merchant Category Code
      formatarCampo(53, '986'), // Transaction Currency (BRL)
      formatarCampo(54, valor.toFixed(2)), // Transaction Amount
      formatarCampo(58, 'BR'), // Country Code
      formatarCampo(59, nomeRecebedor), // Merchant Name
      formatarCampo(60, cidadeRecebedor), // Merchant City
      formatarCampo(62, [
        formatarCampo('05', txid), // Transaction ID (opcional)
      ].join('')) // Additional Data Field Template
    ].join('');
  
    const crc16 = (payload) => {
      let crc = 0xFFFF;
      for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          if ((crc & 0x8000) !== 0) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc <<= 1;
          }
        }
      }
      return ((crc ^ 0xFFFF) & 0xFFFF).toString(16).toUpperCase();
    };
  
    return `${payload}6304${crc16(payload + '6304')}`;
  };
  