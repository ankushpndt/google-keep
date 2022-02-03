import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './authContext';
import { App } from './App';
import { NoteProvider } from './noteContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
