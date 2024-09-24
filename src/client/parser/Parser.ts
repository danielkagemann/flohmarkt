interface ParserResult {
    ignoreList: string[],
    highlight: string[]
}

function init(value: string): ParserResult {
    // e.g. -"val1,val2,val3" +"search1,search2"

    const result: ParserResult = {
        ignoreList: [],
        highlight: []
    };

    // search for ignorelist
    const ignoreMatch = value.match(/-\s*"([^"]*)"/);
    if (ignoreMatch && ignoreMatch[1]) {
        result.ignoreList = ignoreMatch[1].split(',').map(item => item.trim());
    }

    // search for highlighting
    const searchMatch = value.match(/\+\s*"([^"]*)"/);
    if (searchMatch && searchMatch[1]) {
        result.highlight = searchMatch[1].split(',').map(item => item.trim());
    }

    console.log('parser result', result);

    return result;
}

export const $Parser = {
    init
}