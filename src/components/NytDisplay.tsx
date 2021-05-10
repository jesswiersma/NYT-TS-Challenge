import React, {Component} from 'react';

type MyProps = {
    results: Article[];
    pages: any
}

type Article = {
    headline: any,
    web_url: string,
    multimedia: string,
    snippet: string,
}

const NytDisplay = (props: MyProps) => {
    return(
        <div>
            {props.results.map(article => {
                return (
                    <div>
                        <a href={article.web_url}><h3>{article.headline.main}</h3></a>
                        <p>{article.snippet}</p>
                    </div>
                )
            })}
           </div>
    )
}

export default NytDisplay;