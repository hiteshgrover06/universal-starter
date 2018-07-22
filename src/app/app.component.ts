import { Component, OnInit } from '@angular/core';
import * as Services from '../services/index';
import { SearchEngine } from '../declarations/enums';


const searchEngineTypeMetaData = [
  { id: 0, value: 'Google Search' },
  { id: 1, value: 'Bing Search' },
  { id: 2, value: 'Yahoo Search' }
];

@Component({
  selector: 'app-root',
  templateUrl: 'appTemplate.html',
  styles: ['styles.css']
})

export class AppComponent {

  public SearchData: SearchResult;
  public SearchStatisticsData: { [searchEngine: string]: SearchResult[]; } = {};
  public selectedSearchEngine: KeyValuePair;
  public searchCallCompleted: Boolean;
  public searchEngineTypes: Array<KeyValuePair>;

  constructor(private searchEngineService: Services.SearchEngineService) {
    this.searchEngineTypes = searchEngineTypeMetaData;
    this.selectedSearchEngine = searchEngineTypeMetaData[0];
  }

  private logSearchStasticsInLocalStorage = (searchResult: SearchResult,
    searchEngineType: SearchEngine, searchText: string) => {
    const searchEngineKey = (<SearchEngine>searchEngineType).toString();

    if (!this.SearchStatisticsData[searchEngineKey]) {
      this.SearchStatisticsData[searchEngineKey] = [];
    }
    this.SearchStatisticsData[searchEngineKey].push(Object.assign({}, searchResult,
      { searchText }, { browser: this.selectedSearchEngine.value }, { timeStamp: new Date().toUTCString() }));
  }

  private fireSearch = (apiMethod: Function, queryString: string) => {

    apiMethod(queryString).subscribe(response => {
      this.SearchData = this.mapResponse(response);
      this.logSearchStasticsInLocalStorage(this.SearchData, this.selectedSearchEngine.id, queryString);
      this.searchCallCompleted = true;
    }, error => {
      console.log('error', error);
      this.searchCallCompleted = true;
    });

  }

  private mapResponse = (response: any): SearchResult => {
    const data = response.json();

    switch (this.selectedSearchEngine.id) {
      case SearchEngine.Google: return data;
      case SearchEngine.Bing: return this.mapBingSearchData(data);
      default: return data;
    }

  }

  private mapBingSearchData(data: any): SearchResult {
    const searchInformation: SearchInformation = {
      formattedTotalResults: data.webPages.totalEstimatedMatches
    };

    const items: Array<Item> = [];
    (data.webPages.value || []).forEach(value => {
      items.push({
        kind: value,
        title: value.name,
        htmlTitle: value.value,
        link: value.url,
        displayLink: value.displayUrl,
        htmlSnippet: value.snippet,
        cacheId: value.id,
        formattedUrl: value.displayUrl,
        htmlFormattedUrl: value.url
      });
    });

    return { searchInformation, items };
  }
  // ngOnInit() {

  // }

  public Search = (queryString: string) => {
    this.searchCallCompleted = false;
    this.SearchData = null;

    switch (this.selectedSearchEngine.id) {
      case SearchEngine.Google: this.fireSearch(this.searchEngineService.GetGoogleResults, queryString);
        break;
      case SearchEngine.Bing: this.fireSearch(this.searchEngineService.GetBingResults, queryString);
        break;

      default: this.fireSearch(this.searchEngineService.GetGoogleResults, queryString);
        break;
    }

  }

  public GetSelectedSearchEngineStats = () => {
    return this.SearchStatisticsData[this.selectedSearchEngine.id.toString()] || null;
  }

  public HasSearchResults = (): Boolean => {
    return this.searchCallCompleted && this.SearchData && this.SearchData.items && this.SearchData.items.length > 0;
  }

}
