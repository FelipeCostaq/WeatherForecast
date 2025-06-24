document.querySelector('#search').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const _cityName = document.querySelector('#city_name').value;
    
    if(!_cityName){
        ShowAlert("Você precisa digitar uma cidade...")
        document.querySelector("#weather").classList.remove('show');
        return;
    }

    const _apiKey = '8715cd931145fb5e942d381300304e2b';
    const _apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(_cityName)}&appid=${_apiKey}&units=metric&lang=pt_br`;

    const _results = await fetch(_apiUrl);
    const _json = await _results.json();

    if(_json.cod == 200){
        ShowInfo({
            city: _json.name,
            country: _json.sys.country,
            temp: _json.main.temp,
            tempMax: _json.main.temp_max,
            tempMin: _json.main.temp_min,
            description: _json.weather[0].description,
            tempIcon: _json.weather[0].icon,
            windSpeed: _json.wind.speed,
            humidity: _json.main.humidity,

        })
    }
    else{
        document.querySelector("#weather").classList.remove('show');
        ShowAlert(`
            Não foi possível localizar...
            <img src="src/images/404.svg"/>
        `)
    }
}) 


function ShowInfo(_json){
    ShowAlert('');

    /* Aparecer Bloco */
    document.querySelector("#weather").classList.add('show');

    /* Cidade e País */
    document.querySelector('#title').innerHTML = `${_json.city}, ${_json.country}`;

    /* Temperatura */
    document.querySelector('#temp_value').innerHTML = `${_json.temp.toFixed(1).toString().replace('.', ',')}<sup>C°</sup`;

    /* Descrição Tempo */
    document.querySelector('#temp_description').innerHTML = `${_json.description}`;

    /* Imagem Tempo */
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${_json.tempIcon}@2x.png`)

    /* Temperatura Máxima */
    document.querySelector('#temp_max').innerHTML = `${_json.tempMax.toFixed(1).toString().replace('.', ',')}<sup>C°</sup`;

    /* Temperatura Miníma */
    document.querySelector('#temp_min').innerHTML = `${_json.tempMin.toFixed(1).toString().replace('.', ',')}<sup>C°</sup`;

    /* Umidade */
    document.querySelector('#humidity').innerHTML = `${_json.humidity}%`;

    /* Velocidade Vento */
    document.querySelector('#wind').innerHTML = `${_json.windSpeed.toFixed(1)}km/h`;
}

function ShowAlert(msg){
    document.querySelector("#alert").innerHTML = msg;
}
