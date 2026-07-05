document.addEventListener('DOMContentLoaded', () => {
    const mainSearch = document.getElementById('mainSearch');
    const subSearch = document.getElementById('subSearch');
    const cardGrid = document.getElementById('cardGrid');

    // 1. 섹션 전환 엔진 (홈 <-> 리스트)
    window.showSection = (id) => {
        document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
        document.getElementById(id + 'Section').style.display = 'block';
        window.scrollTo(0, 0);
    };

    // 2. 리스트 렌더링 함수 (고품질 카드 UI)
    window.renderList = (data) => {
        if (!data || data.length === 0) {
            cardGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:100px; color:#999;">찾으시는 정보가 없습니다.</div>`;
            return;
        }
        cardGrid.innerHTML = data.map(item => `
            <div class="premium-card" onclick="alert('곧 3단계 상세 페이지가 고도화됩니다!')">
                <div class="status-badge">🟢 실시간 연결 원활</div>
                <div style="color:var(--primary); font-weight:800; font-size:0.8rem;">${item.category}</div>
                <h3 style="font-size:1.4rem; margin:10px 0 15px;">${item.name}</h3>
                <span style="font-size:1.7rem; font-weight:900; color:var(--text-main);">📞 ${item.phone}</span>
                <div style="margin-top:20px; color:var(--primary); font-weight:bold; font-size:0.9rem;">상세 치트키 보기 ></div>
            </div>
        `).join('');
    };

    // 3. 카테고리 필터링
    window.filterCategory = (cat) => {
        const filtered = (cat === '전체') ? customerData : customerData.filter(i => i.category.includes(cat));
        document.getElementById('listTitle').innerText = `${cat} 치트키 목록`;
        renderList(filtered);
        showSection('list');
    };

    // 4. 통합 검색 로직 (메인 및 서브 검색창 연동)
    const handleSearch = (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = customerData.filter(i => 
            i.name.toLowerCase().includes(val) || 
            i.category.toLowerCase().includes(val) ||
            i.description.toLowerCase().includes(val)
        );
        renderList(filtered);
        if (e.target.id === 'mainSearch' && val !== "") showSection('list');
    };

    mainSearch.addEventListener('input', handleSearch);
    subSearch.addEventListener('input', handleSearch);

    window.quickSearch = (tag) => {
        mainSearch.value = tag;
        filterCategory('전체');
    };

    // 초기 실행: 모든 데이터 로드
    if (typeof customerData !== 'undefined') {
        renderList(customerData);
    } else {
        console.error("data.js 파일이 올바르게 로드되지 않았습니다.");
    }
});