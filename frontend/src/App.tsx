import BookList from './components/BookList';
import './App.css';

function App() {
  return (
    <>
      <header className="bg-dark text-white text-center py-4 mb-4">
        <h1 className="display-5">Hilton's Online Bookstore</h1>
        <p className="lead mb-0">"You earn reputation by trying to do hard things well." - Jeff Bezos</p>
      </header>
      
      <main>
        <BookList />
      </main>
    </>
  );
}

export default App;