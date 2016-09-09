import React  from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/searchBar';

// youtube api key
const API_KEY = your youtube api key here ;

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}


ReactDOM.render(<App />, document.querySelector('.container'));
