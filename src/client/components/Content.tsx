import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ArticleListItem, {ArticleModel} from "./ArticleListItem";
import {$Parser} from "../parser/Parser";


function Content() {
    // states
    const [term, setTerm] = useState<string>('');
    const [filtered, setFiltered] = useState<ArticleModel[]>([]);

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

    useEffect(() => {
        setFiltered(query.data ?? [])
    }, [query.data]);

    function updateTerm(event: any) {
        const {value} = event.target;
        setTerm(value);

        // tokenize
        const res = $Parser.init(value);
        let tmp: ArticleModel[] = [...query.data ?? []];
        if (res.ignoreList.length > 0) {
            tmp = query.data.filter((element: any) => {
                return !res.ignoreList.some((key: string) => element.title.toLowerCase().indexOf(key) !== -1);
            });
        }

        if (res.highlight.length > 0) {
            tmp = tmp.map((element: ArticleModel) => {
                const re = new RegExp(`(${res.highlight.join('|')})`, 'gi');
                return {
                    title: element.title.replace(re, '<mark>$1</mark>'),
                    description: element.description.replace(re, '<mark>$1</mark>'),
                    image: element.image,
                    price: element.price
                };
            });
        }

        setFiltered(tmp);
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
                <h3>Suchergebnisse ({filtered.length})</h3>
                <div className="scrollcontainer">
                    {
                        filtered.map((item: any) => (<ArticleListItem key={item.title+item.price} item={item} />))
                    }
                </div>
            </>
        );
    }

    return (
        <div className="content">
            <input type="text" aria-label="Begriffe ausschließen" placeholder={'Suchen... z.B. -"auto,roller" +"bett"'} value={term} onChange={updateTerm} />
            <p className="description"><strong>Syntax:</strong> Wenn Du Begriffe ausschließen möchtest dann schreibe <code>-"begriff1,begriff2,..."</code>. Möchtest Du Begriffe hervorheben dann schreibe <code>+"begriff1,begriff2,..."</code>. Du kannst beide Varianten auch kombinieren.</p>
            {renderContent()}
        </div>
    )
}

export default Content;