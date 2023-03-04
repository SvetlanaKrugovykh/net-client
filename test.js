const answer = {
	"ResponseArray": [
		{
			"Контрагент": "Линник Г.І.",
			"ДоговорНомер": "Щ0000117",
			"ДоговорДата": "2020-07-14T17:21:27",
			"ДатаВключения": "2020-07-15T00:00:00",
			"Comment": "EPON0/4:53 9845.629e.4cef",
			"IP_address": "192.168.19.223 ",
			"IP_address_nat": "               ",
			"VLan": 19,
			"ТелНомер": "0677661546",
			"HOST": "192.168.13.251",
			"Port": "          ",
			"АдресГород": "с.Таценки",
			"АдресУлица": "к.Урожайний",
			"АдресДом": "51",
			"АдресКвартира": "",
			"Скорость": 30,
			"ОплатаЭтотМц": 280,
			"АбонплатаЭтотМц": 299,
			"ДолгНаНачало": 299,
			"ДолгНаКонец": 280,
			"КодПравил": 774,
			"gateway": "-",
			"mask": "",
			"eqvType": "olt",
			"Отключения": "10.01.2023 0:00:00",
			"Включения": "10.01.2023 0:00:00"
		}
	]
};

let HOST = answer.ResponseArray[0].HOST;
console.log(HOST);
let comment = answer.ResponseArray[0].Comment.match(/^\w+\/\d+:\d+/)[0];;
console.log(comment);

//I need get HOST value from answer.ResponseArray[0].HOST

