import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import createHistory from 'history/createBrowserHistory'
import css from 'styled-jsx/css';
import store from './Store';
import Layout from './Layout';

const history = createHistory()

export default class App extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
          <BrowserRouter>
            <React.Fragment>
              <Provider store={store}>
                <div>
                  <ModalContainer />
                  <Layout history={history} />
                </div>
              </Provider>
              <style jsx>{styles}</style>
            </React.Fragment>
          </BrowserRouter>
        )
    }
    
}

const styles = css`
div {
  height: 100%;
  width: 100%;
}
`

ReactDOM.render(<App />, document.getElementById('root'));
'hot' in module && module.hot.accept();
