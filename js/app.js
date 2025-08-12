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
