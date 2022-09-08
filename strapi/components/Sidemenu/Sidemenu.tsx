import React from "react";
import Link from 'next/link'

type Props = {
    data?: any;
}

export const SideMenu: React.FC<Props> = ({
    data
}) => {
    console.log(data)

    return(
        <article
             className=""
        >
            <div className="wrapper">
                <h1>Reactの記事一覧</h1>
                <ul>
                {data.posts.data.map((post)=>{
                    return(
                        <div key={post.id}>
                            <Link href="">{post.attributes.title}</Link>
                        </div>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}