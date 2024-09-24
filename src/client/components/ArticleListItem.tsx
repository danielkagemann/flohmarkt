
export interface ArticleModel {
    title: string,
    description: string,
    price: string,
    image: string
}

function ArticleListItem ({item}: any) {
    const url = `url(${item.image})`;
    return (
        <div className="listitem">
            <div className="image" style={{backgroundImage: url}}>
                <div className="price">{item.price}</div>
            </div>
            <div>
            <div className="title" dangerouslySetInnerHTML={{__html: item.title}}/>
            <div className="description" dangerouslySetInnerHTML={{__html: item.description}}/>
            </div>
        </div>
    )
}

export default ArticleListItem;