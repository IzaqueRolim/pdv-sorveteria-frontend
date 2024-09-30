import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import reportWebVitals from './reportWebVitals.js';
import { ProdutoProvider } from './context/ProdutoContext.tsx';
import { LoteContext } from './context/LoteContext.tsx';
import { ReceitaContext } from './context/ReceitaContext.tsx';
import { VendaContext } from './context/VendaContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProdutoProvider>
      <ReceitaContext.Provider>
        <VendaContext.Provider>
          <LoteContext.Provider>
            <App />
          </LoteContext.Provider>
        </VendaContext.Provider>
      </ReceitaContext.Provider>
    </ProdutoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
