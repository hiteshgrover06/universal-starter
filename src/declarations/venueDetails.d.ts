declare interface SearchResult {
    searchInformation: SearchInformation;
    items: Array<Item>
}

declare interface SearchInformation {
    formattedSearchTime: string;
    formattedTotalResults: string;
    searchTime: number;
    totalResults: string;
}
declare interface Item {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    htmlSnippet: string;
    cacheId: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: {
        metatags: { progid: string; originator: string }[]
    }
}

// declare interface SearchedeItem {
//     kind: "customsearch#result";
//     title: "CS519 home page",
//     htmlTitle: "CS519 home page",
//     link: "http://www.cs.cornell.edu/courses/cs519/2004sp/",
//     displayLink: "www.cs.cornell.edu", "snippet": "Apr 5, 2004 ... TA:  Hitesh Ballani      hitesh@cs.cornell.edu. 5132 Upson Hall Office \nhours:  WF 1:30 - 2:30 (UPSON 5132). TA:  Mehmet  Fidanboylu ...",
//     htmlSnippet: "Apr 5, 2004 <b>...</b> TA:  <b>Hitesh</b> Ballani      <b>hitesh</b>@cs.cornell.edu. 5132 Upson Hall Office <br>\nhours:  WF 1:30 - 2:30 (UPSON 5132). TA:  Mehmet  Fidanboylu&nbsp;...",
//     cacheId: "qH4kLKAyHXwJ",
//     formattedUrl: "www.cs.cornell.edu/courses/cs519/2004sp/",
//     htmlFormattedUrl: "www.cs.cornell.edu/courses/cs519/2004sp/",
//     pagemap: {
//         metatags: { progid: string; originator: string }[]
//     }
// }