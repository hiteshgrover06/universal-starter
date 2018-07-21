import { Component } from '@angular/core';
import * as Services from '../services/index';
import { SearchEngine } from '../declarations/enums';
@Component({
  selector: 'app-root',
  templateUrl: 'appTemplate.html',
  styles: ['styles.css']
})


export class AppComponent {

  public SearchData: SearchResult;
  public SearchStatisticsData: { [searchEngine: string]: SearchInformation[]; } = {};
  public selectedSearchEngine: number;

  constructor(private searchEngineService: Services.SearchEngineService) {
    this.selectedSearchEngine = SearchEngine.Google;
  }

  private logSearchStasticsInLocalStorage = (searchInformation: SearchInformation,
    searchEngineType: SearchEngine) => {
    const searchEngineKey = (<SearchEngine>searchEngineType).toString();

    if (!this.SearchStatisticsData[searchEngineKey]) {
      this.SearchStatisticsData[searchEngineKey] = [];
    }
    this.SearchStatisticsData[searchEngineKey].push(searchInformation);
  }

  // ngOnInit() {

  // }

  public Search = (queryString: string) => {
    this.searchEngineService.QueryResults(queryString, this.selectedSearchEngine).subscribe(response => {
      this.SearchData = response.json();
      this.logSearchStasticsInLocalStorage(this.SearchData.searchInformation, this.selectedSearchEngine);
    }, error => {
      console.log('error', error);
    });
  }

  public GetSelectedSearchEngineStats = () => {
    return this.SearchStatisticsData[this.selectedSearchEngine.toString()];
  }



}
