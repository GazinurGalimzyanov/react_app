import React from 'react';
import axios from 'axios';

export default class TokenList extends React.Component {
  
  constructor(props) {
    super(props);
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => {
        const tokens= res.data;
        this.setState({ tokens});
      })

        // Это привязывание необходимо, чтобы работал объект `this` в колбэке
        this.handleClick = this.handleClick.bind(this);
  }
        state = {
            tokens: []
        };
  issorted = false;
  handleClick(){
    console.log('change');
    this.issorted = !this.issorted;
    this.forceUpdate();
  }
    componentDidUpdate(){
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => {
        const tokens= res.data;
        this.setState({ tokens});
      })
    }
  render() {
    if (this.issorted){
        this.state.tokens.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });
    }else{
        this.state.tokens.sort(function(a,b){
            return a.market_cap_rank-b.market_cap_rank;
        });
    }
    var items = this.state.tokens.map(token => <tr><td>{token.name}</td><td>{token.current_price} USD</td><td>{token.market_cap} USD</td></tr>);
    return (
        <div>
            <button onClick={this.handleClick}>{this.issorted ? 'Сортировать по рангу':'Сортировать по имени'}</button>
            <table border="1">
                <tr>
                    <th>Название токена</th>
                    <th>Цена USD</th>
                    <th>Капитализация USD</th>
                </tr>
                { items}
            </table>
        </div>
    )    
  }
}
