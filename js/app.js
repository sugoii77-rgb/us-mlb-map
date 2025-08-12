// 전역 변수 선언
let map;

function initMap() {
    // 지도의 초기 옵션 설정
    const mapOptions = {
        center: { lat: 39.8283, lng: -98.5795 }, // 미국 중심부 좌표
        zoom: 4, // 미국 전체가 보이도록 줌 레벨 설정
        mapId: 'US_MLB_MAP_STYLE', // 클라우드 기반 스타일링을 위한 Map ID (선택 사항)
        mapTypeId: 'roadmap' // 기본 지도 유형
    };

    // 'map' div에 새로운 지도 객체를 생성하여 할당
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
// initMap 함수 내, map 객체 생성 다음 줄에 추가
function initMap() {
    //... (이전 지도 초기화 코드)...

    // GeoJSON 파일 로드
    map.data.loadGeoJson('data/states.geojson');
}
// initMap 함수 내, GeoJSON 로드 코드 다음에 추가
function initMap() {
    //... (이전 지도 초기화 및 GeoJSON 로드 코드)...

    // 주(State) 폴리곤 스타일 설정
    map.data.setStyle({
        fillColor: '#4a8af4',      // 채우기 색상
        fillOpacity: 0.35,         // 채우기 투명도
        strokeColor: '#ffffff',    // 테두리 색상
        strokeWeight: 1,           // 테두리 두께
        clickable: true            // 클릭 이벤트 활성화
    });

    // 마우스 오버(mouseover) 이벤트 리스너
    map.data.addListener('mouseover', (event) => {
        map.data.overrideStyle(event.feature, {
            strokeWeight: 3,
            strokeColor: '#1a73e8'
        });
    });
// 전역 변수 선언부에 추가
let infoWindow;
let currentMarkers =;

// initMap 함수 내, 스타일 설정 코드 다음에 추가
function initMap() {
    //... (이전 코드)...

    // InfoWindow 객체 초기화 (재사용을 위해 한 번만 생성)
    infoWindow = new google.maps.InfoWindow();

    // 주(State) 폴리곤 클릭 이벤트 리스너
    map.data.addListener('click', (event) => {
        // 이전에 열려있던 infoWindow 닫기
        infoWindow.close();

        // GeoJSON 속성에서 주 이름 가져오기
        const stateName = event.feature.getProperty('NAME'); // GeoJSON 파일의 속성명에 따라 'name' 또는 'STATE_NAME' 등으로 변경 필요
        
        // 해당 주의 MLB 도시 마커 표시 함수 호출
        displayMlbCities(stateName);
    });
}
    // 마우스 아웃(mouseout) 이벤트 리스너
    map.data.addListener('mouseout', (event) => {
        map.data.revertStyle(); // 기본 스타일로 복원
    });
}
function displayMlbCities(stateName) {
    // 1. 기존 마커 제거
    currentMarkers.forEach(marker => marker.setMap(null));
    currentMarkers =;

    // 2. mlbData에서 해당 주 정보 찾기
    const stateData = mlbData[stateName];
    if (!stateData) {
        console.log(`${stateName} 주에는 MLB 팀이 없습니다.`);
        return;
    }

    // 3. 해당 주의 도시들을 순회하며 마커 생성
    stateData.cities.forEach(city => {
        const marker = new google.maps.Marker({
            position: { lat: city.lat, lng: city.lng },
            map: map,
            title: city.name,
            animation: google.maps.Animation.DROP // 마커가 떨어지는 애니메이션 효과
        });

        // 마커에 팀 정보를 저장하여 나중에 사용
        marker.teamInfo = city.teams;
        marker.cityName = city.name;

        // 4. 각 마커에 클릭 리스너 추가
        marker.addListener('click', function() {
            const contentString = `<h3>${this.cityName}</h3>` +
                                `<p>${this.teamInfo.join('<br>')}</p>`;
            
            infoWindow.setContent(contentString);
            infoWindow.open(map, this);
        });

        currentMarkers.push(marker);
    });
}
