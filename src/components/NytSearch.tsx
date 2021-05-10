import React, {Component} from 'react'

type NytState = {
    searchTerm: string;
    startDate: string;
    endDate: string;
    pageNumber: number;
    results: [];
}

class NytSearch extends Component<{}, NytState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchTerm: "",
            startDate: "",
            endDate: "",
            pageNumber: 0,
            results: []
        }
    }


fetchSearchResults() {
    const baseURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
    const apiKey = `JZxP8LokooAIcc14fPtvkQX6AaRFUiaY`;

    let url = `${baseURL}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
        //url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        //url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

    fetch(url)
        .then((res) => res.json())
        .then((data) => this.setState({results: data.response.docs}))  
        .catch(err => console.log(err))
        return console.log(this.state.results)              
    };

    handleSubmit(event:any) {
        this.setState({
            pageNumber: 0
        })
        this.fetchSearchResults();
        event.preventDefault();
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
         </div>

            //     <NytResults results = {results} changePage = {changePageNumber}
             
    )
}
}

export default NytSearch;

// this.setState({
            //     results: data.response.docs
            // });
            // console.log(data.response.docs)
        