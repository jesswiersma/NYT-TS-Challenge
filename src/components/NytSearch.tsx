import React, {Component} from 'react';
import {MouseEvent} from 'react';
import NytDisplay from './NytDisplay';


type NytState = {
    searchTerm: string;
    startDate: string;
    endDate: string;
    pageNumber: number;
    results: [];
    button: boolean;
}

type URL = {
    base: string;
    key: string;
}

class NytSearch extends Component<{}, NytState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchTerm: "",
            startDate: "",
            endDate: "",
            pageNumber: 0,
            results: [],
            button: true,
        }
    }


fetchSearchResults() {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const apiKey = "ZDXv9IaKUQft4T0WzkIePcY3QLsQqA0k";
    let pageNumber = this.state.pageNumber === 0 ? 0 : this.state.pageNumber;

    let url = `${baseURL}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
    url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({results: data.response.docs}))
        .catch(err => console.log(err))
        return console.log(this.state.results)
    };

    searchResults(){
        this.setState({pageNumber: 0});
        console.log(this.state.pageNumber);
        this.fetchSearchResults()
    }

    handleSubmit(event:any) {
        this.setState({
            pageNumber: 0
        })
        this.fetchSearchResults();
        event.preventDefault();
    }

    changePageNumber(event: MouseEvent, direction: string) {
        event.preventDefault()
        if(direction === 'down'){
            if(this.state.pageNumber > 0) {
                this.setState({pageNumber: this.state.pageNumber -1})
                this.fetchSearchResults()
            }
        } if(direction === 'up'){
            this.setState({pageNumber: this.state.pageNumber +1})
            this.fetchSearchResults()
        }
    }

    componentDidMount(){
        this.fetchSearchResults()
    }

render(){
    return(
        <div>
            <h3>NYT App #3</h3>
            <form onSubmit = {(event) => this.handleSubmit(event)}>
                 <span>Enter a single search term (required):</span>
                    <input type = "text" name = "search" onChange = {(e)=> {this.setState({ searchTerm: e.target.value})}} required />
                    <br/>
                    <span>Enter a start date:</span>
                    <input type = "date" name = "startDate" pattern = "[0-9]{8}" onChange = {(e) => {this.setState({startDate: e.target.value})}}/>
                    <br/>
                    <span>Enter an end date:</span>
                    <input type = "date" name = "endDate" pattern = "[0-9]{8}" onChange = {(e) => {this.setState({endDate: e.target.value})}}/>
                    <br/>
                    <button className = "submit">Submit Search</button>
             </form>
             <NytDisplay results={this.state.results} pages = {this.changePageNumber}/>

             <div>
                 <button onClick = {(e) => this.changePageNumber(e, "down")}>Previous 10</button>
                 <button onClick = {(e) => this.changePageNumber(e, "up")}>Next 10</button>
             </div>
         </div>

    )
}
}

export default NytSearch;

// this.setState({
            //     results: data.response.docs
            // });
            // console.log(data.response.docs)
        