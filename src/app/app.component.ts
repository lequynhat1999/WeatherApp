import { Component } from '@angular/core';
import { WeatherAPISerice } from './services/weather-api.service';
import { WeatherData } from './model/weather-data';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';
  temperature = 0;
  weatherData : WeatherData | undefined;
  searchValue = "hanoi";
  searchValue$ = new Subject<string>();

  constructor(private weatherAPIService : WeatherAPISerice){

  }

  ngOnInit() {
    this.getWeatherDataByCityName(this.searchValue);
    this.searchValue$.pipe(
      debounceTime(600),
      distinctUntilChanged())
      .subscribe((value) => {
        this.getWeatherDataByCityName(value);
      });
  }

  /**
   *  Lấy dữ liệu thời tiết theo thành phố
   *  lqnhat 24.2.2024
   */
  getWeatherDataByCityName(searchValue:string){
    this.weatherAPIService.getWeatherData(searchValue).then((res) => {
      if(res.status === 200){
        this.temperature = res.data.main.temp;
        this.weatherData = {
          Temperature: res.data.main.temp,
          TemperatureMin: this.convertFahrenheitToCelsius(res.data.main.temp_min),
          TemperatureMax: this.convertFahrenheitToCelsius(res.data.main.temp_max),
          Humidity: res.data.main.humidity,
          Wind: res.data.wind.speed,
          CityName: res.data.name
        };
      }
    })
    .catch(error => console.error(error));
  }

  /**
   * Tìm kiếm dữ liệu thời tiết theo tên thành phố
   * lqnhat 24.2.2024
   */
  searchWeatherData(value: any){
    this.searchValue$.next(value);
  }

  /**
   * Convert độ F sang độ C
   * lqnhat 24.2.2024
   */
  convertFahrenheitToCelsius(fahrenheit: number = 0){
    return Math.round((fahrenheit - 32) * 5/9);
  }

}
