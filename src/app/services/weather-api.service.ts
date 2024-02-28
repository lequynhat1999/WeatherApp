import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class WeatherAPISerice {
  constructor(){}

  /**
   *  API lấy dữ liệu thời tiết theo thành phố
   * lqnhat 24.2.2024
   */
  getWeatherData(cityName: string = "landon") {
    return axios.get(`https://open-weather13.p.rapidapi.com/city/${cityName}`, {
      headers: {
        'X-RapidAPI-Key': '5d4f2ec569msh04ce8b554bcef40p1e5e73jsn4d66e2012fb7',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    })
  }
}
