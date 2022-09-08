import React from "react";

type Props = {
    article_data?: any;
}

export const Article: React.FC<Props> = ({
    article_data
}) => {
    return(
        <article
             className=""
        >
            {article_data}
        </article>
    )
}