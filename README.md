Bangalore Metropolitain Transport Corporation Network Data
====

[Bangalore Metropolitan Transport Corporation](https://en.wikipedia.org/wiki/Bangalore_Metropolitan_Transport_Corporation) operates over 2000 routes. We [scraped](https://github.com/openbangalore/bmtc) some of the data to understand this network better.
This repository is a collection of scripts to run analysis and data derived from them.

*[Data from Open Bangalore.](http://openbangalore.org/) | [DataMeet](http://datameet.org/)*

Maps
====


### Frequency

![](https://cloud.githubusercontent.com/assets/371666/12720005/69b1df2c-c91e-11e5-8e7f-b3c26bfc939d.png)

*This map shows bus stops and frequency of their routes. Evidently, north Bangalore has less routes but more frequency while south Bangalore has many routes which are less frequent. [View interactive map.](https://www.mapbox.com/bites/00212/)*

### Longest Route

![](https://cloud.githubusercontent.com/assets/371666/12720007/6c6d93e6-c91e-11e5-95b5-b42ba20a2702.png)

*BMTC operates many long routes. The longest is route 600 with 117 km and takes over 5 hours. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cik0utr150130bfm2jjfto236.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#10.88/12.9119/77.6292)*

### Most frequent trips

![](https://cloud.githubusercontent.com/assets/371666/12865441/911404c6-ccd1-11e5-9864-14745fe96cac.png)

*Route KBS-3A makes 274 trips. 401M and 252F makes 217 trips. These are the three most frequent routes. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cik1h9fwu017kbpm3t34v9hw3.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#12.07/12.9703/77.5287)*

### Where do most buses start from?

![](https://cloud.githubusercontent.com/assets/371666/12720017/723352de-c91e-11e5-965a-7b512512729e.png)

*Most routes start from Krishnarajendra Market as opposed the notion that is Kempegowda Bus Station.*

### Direction

![screen shot 2016-02-01 at 18 37 14](https://cloud.githubusercontent.com/assets/371666/12720023/75fb220c-c91e-11e5-9e52-7952cacc6405.png)

*North - South and East - West routes are equally distributed. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cik2wox7a01aecakwuqhzae39.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#10/12.9862/77.5808)*

### 2 and 3 series routes

![](https://cloud.githubusercontent.com/assets/371666/12815760/4ec9a116-cb6e-11e5-8498-235cf7e628e1.png)

*2 (blue) series and 3 (green) series routes cover ~76% of the entire BMTC network. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cik512qjx006l9um6tn14khq5.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#9.86/12.9837/77.5740)*

### Routes starting with number 2

![](http://i.imgur.com/l6hqX9p.gif)

*2 series routes coverage*

### Node strength

![screen shot 2016-02-04 at 5 50 33 pm](https://cloud.githubusercontent.com/assets/371666/12845827/91a5a94c-cc2e-11e5-9a45-1c0fb69c28b3.png)

*Node strength - number of routes passing through a stop. [View interactive map](https://api.mapbox.com/styles/v1/arunasank/cik7yec2z00iv9um6nnanuexa.html?title=true&access_token=pk.eyJ1IjoiYXJ1bmFzYW5rIiwiYSI6ImRKNlNQa3MifQ.SIx-g-J1oWWlP4grTXopcg#11.01/12.9548/77.5782)*

### Reachability

![screen shot 2016-02-05 at 16 01 41](https://cloud.githubusercontent.com/assets/371666/12845786/54721060-cc2e-11e5-92a7-8c92b54f35b1.png)

*Reachability - destinations you can get to from a stop without switching. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cik98dpzk0005cilxrc9fhiih.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#10.8/12.9915/77.5707)*

### Redundancy

![](https://cloud.githubusercontent.com/assets/371666/12871945/eb837b22-cdb6-11e5-9445-e9f5c3f3371d.png)

*Redundancy - naive approach to finding redundancy is scoring based on bus stops each routes hit. The southern corridor of Majestic - Bannerghatta - Anekal is more redundant than rest of the network. [View interactive map.](https://api.mapbox.com/styles/v1/geohacker/cikcasmhz003zkqlxy5fnomod.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#9.87/12.9484/77.6028)*

### School walkability
![screen shot 2016-02-08 at 14 39 28](https://cloud.githubusercontent.com/assets/371666/12881731/11810842-ce72-11e5-96cf-f2026a01e406.png)

*School walkability - schools (red) that are <500m from a bus stop (black) on a BMTC route. BMTC creates a pretty good network in and around the city to connect schools. Schools data from Karnatak Learning Partnership. [View interactive map](https://api.mapbox.com/styles/v1/geohacker/cikct6n5o009gb8m9v9nccqf3.html?title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#12.92/12.9738/77.5637)*