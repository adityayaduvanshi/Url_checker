import './App.css';
import UrlForm from './components/UrlForm';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-gray-800 text-white flex flex-col  h-[100vh] w-full">
      <Header />
      <UrlForm />
    </div>
  );
}

export default App;
