import React, {Component} from 'react';

type MyProps = {
    results: Article[];
    pages: any
}

type Article = {
    headline: any,
    web_url: string,
    multimedia: string,
    keywords: [],
}

const NytDisplay = (props: MyProps) => {
    return(
        <div>
            {props.results.map(article => {
                return (
                    <div>
                        <a href={article.web_url}><h3>{article.headline.main}</h3></a>
                    </div>
                )
            })}
           </div>
    )
}

export default NytDisplay;