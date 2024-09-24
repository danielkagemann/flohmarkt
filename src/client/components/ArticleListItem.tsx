
function ArticleListItem ({item}: any) {
    const url = `url(${item.image})`;
    return (
        <div className="listitem">
            <div className="image" style={{backgroundImage: url}}>
                <div className="price">{item.price}</div>
            </div>
            <div>
            <div className="title">{item.title}</div>
            <div className="description">{item.description}</div>
            </div>
        </div>
    )
}

export default ArticleListItem;