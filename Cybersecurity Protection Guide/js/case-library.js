// 案例庫篩選器事件
document.addEventListener('DOMContentLoaded', () => {
    const typeFilter = document.getElementById('case-type-filter');
    const regionFilter = document.getElementById('case-region-filter');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', () => {
            // 這裡應該重新加載案例
            console.log('案例類型篩選器變更');
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', () => {
            // 這裡應該重新加載案例
            console.log('案例地區篩選器變更');
        });
    }
});