import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ArticleListItem from "./ArticleListItem";

function Content() {
    // states
    const [term, setTerm] = useState<string>('');

    // query
    const query = useQuery({
        queryKey: ['list', ''],
        queryFn: async () => {
            const response = await fetch('/v1/list');
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        },
    });

    function updateTerm(event: any) {
        setTerm(event.target.value);
    }

    function renderContent () {
        if(query.isError) {
            return <span>fehler beim lesen der daten</span>;
        }
        if (query.isLoading ||query.isFetching) {
            return (
                <>
                    Informationen werden gesammelt...<br/>
                    <img src="/load.gif" className="loading" alt={"laden"}/>
                </>
            );
        }

        return (
            <>
                <h3>suchergebnisse ({query.data?.length})</h3>
                <div className="scrollcontainer">
                {
                    query.data.map((item: any) => (<ArticleListItem item={item} />))
                }
                </div>
            </>
        );
    }

    return (
        <div className="content">
            <input type="text" aria-label="Begriffe ausschließen" placeholder={"Begriffe ausschießen..."} value={term} onChange={updateTerm} />
            {renderContent()}
        </div>
    )
}

export default Content;