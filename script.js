// 語言配置
const locales = {
    "zh-TW": {
        police: "110",
        antifraudHotline: "165",
        examples: ["假冒健保局", "假綁架詐騙"]
    },
    "zh-CN": {
        police: "110",
        antifraudHotline: "96110",
        examples: ["假冒公检法", "虚假投资理财"]
    },
    "en": {
        police: "911",
        antifraudHotline: "FTC Complaint",
        examples: ["IRS Scam", "Tech Support Scam"]
    }
};

// 默認語言
let currentLang = "zh-TW";

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    // 設置當前年份
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // 初始化語言
    changeLanguage(currentLang);
    
    // 初始化粒子背景
    initParticles();
    
    // 初始化滾動動畫
    initScrollAnimations();
    
    // 加載案例數據
    loadCases();
});

// 初始化粒子背景
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// 初始化滾動動畫
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animate__' + animation);
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
}

// 切換語言
function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // 更新文本內容
    document.querySelectorAll('[data-lang]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`) || el.textContent;
        el.textContent = text;
    });
    
    // 更新下拉選單選項
    updateSelectOptions();
    
    // 更新本地化信息
    const localeData = locales[lang];
    if (localeData) {
        if (document.getElementById('police-number')) {
            document.getElementById('police-number').textContent = localeData.police;
        }
        if (document.getElementById('antifraud-hotline')) {
            document.getElementById('antifraud-hotline').textContent = localeData.antifraudHotline;
        }
    }
    
    // 重新加載案例以更新語言
    loadCases();
}

// 更新下拉選單選項的語言
function updateSelectOptions() {
    document.querySelectorAll('select option').forEach(option => {
        if (option.hasAttribute('data-lang')) {
            const text = option.getAttribute(`data-${currentLang}`) || option.textContent;
            option.textContent = text;
        }
    });
}

// 滾動到指定區段
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 舉報功能
function report(type) {
    let message = "";
    switch(type) {
        case 'sms':
            message = currentLang === 'en' ? 
                "Thank you for reporting the scam SMS. We have recorded your report." : 
                (currentLang === 'zh-CN' ? 
                    "感谢您举报诈骗短信，我们已记录您的举报。" : 
                    "感謝您舉報詐騙簡訊，我們已記錄您的舉報。");
            break;
        case 'email':
            message = currentLang === 'en' ? 
                "Thank you for reporting the phishing email. We will investigate." : 
                (currentLang === 'zh-CN' ? 
                    "感谢您举报钓鱼邮件，我们将进行调查。" : 
                    "感謝您舉報釣魚郵件，我們將進行調查。");
            break;
        case 'call':
            message = currentLang === 'en' ? 
                "Thank you for reporting the scam call. Authorities have been notified." : 
                (currentLang === 'zh-CN' ? 
                    "感谢您举报诈骗电话，已通知相关部门。" : 
                    "感謝您舉報詐騙電話，已通知相關部門。");
            break;
    }
    
    alert(message);
}

// 加載案例數據
async function loadCases() {
    try {
        // 這裡應該是從API獲取數據，我們使用模擬數據
        const mockData = [
            {
                title: {
                    "zh-TW": "假冒銀行釣魚郵件",
                    "zh-CN": "假冒银行钓鱼邮件",
                    "en": "Fake Bank Phishing Email"
                },
                description: {
                    "zh-TW": "冒充匯豐銀行發送賬戶異常通知，誘導點擊惡意鏈接",
                    "zh-CN": "冒充汇丰银行发送账户异常通知，诱导点击恶意链接",
                    "en": "Posing as HSBC to send fake account alerts with malicious links"
                },
                date: "2023-06-15",
                type: "phishing",
                regions: ["HK", "TW"]
            },
            {
                title: {
                    "zh-TW": "虛假投資平台",
                    "zh-CN": "虚假投资平台",
                    "en": "Fake Investment Platform"
                },
                description: {
                    "zh-TW": "承諾高回報誘導轉賬，實際為龐氏騙局",
                    "zh-CN": "承诺高回报诱导转账，实际为庞氏骗局",
                    "en": "Promising high returns to transfer money, actually a Ponzi scheme"
                },
                date: "2023-05-22",
                type: "investment",
                regions: ["TW"]
            },
            {
                title: {
                    "zh-TW": "假冒政府機構電話詐騙",
                    "zh-CN": "假冒政府机构电话诈骗",
                    "en": "Fake Government Agency Call Scam"
                },
                description: {
                    "zh-TW": "冒充稅務局聲稱有退稅，要求提供銀行信息",
                    "zh-CN": "冒充税务局声称有退税，要求提供银行信息",
                    "en": "Posing as tax agency claiming tax refund, requesting bank information"
                },
                date: "2023-07-10",
                type: "vishing",
                regions: ["HK", "TW", "CN"]
            }
        ];
        
        renderCases(mockData);
    } catch (error) {
        console.error("加載案例數據失敗:", error);
        showErrorMessage();
    }
}

// 渲染案例列表
function renderCases(cases) {
    const typeFilter = document.getElementById('case-type-filter')?.value || 'all';
    const regionFilter = document.getElementById('case-region-filter')?.value || 'all';
    const casesGrid = document.getElementById('cases-grid');
    
    if (!casesGrid) return;

    // 過濾案例
    const filteredCases = cases.filter(scamCase => {
        const typeMatch = typeFilter === 'all' || scamCase.type === typeFilter;
        const regionMatch = regionFilter === 'all' || 
                          (scamCase.regions && scamCase.regions.includes(regionFilter));
        return typeMatch && regionMatch;
    });

    // 渲染案例卡片
    casesGrid.innerHTML = filteredCases.map(scamCase => {
        // 獲取本地化文本 (如果不存在則回退到英文)
        const getLocalizedText = (field) => {
            if (!scamCase[field]) return 'N/A';
            return scamCase[field][currentLang] || scamCase[field].en || scamCase[field]['zh-TW'] || 'N/A';
        };

        // 地區名稱映射
        const regionNames = {
            'HK': currentLang === 'en' ? 'Hong Kong' : '香港',
            'CN': currentLang === 'en' ? 'Mainland' : '大陸',
            'TW': currentLang === 'en' ? 'Taiwan' : '台灣'
        };

        return `
        <div class="case-card animate__animated" data-animation="fadeInUp">
            <h3>${getLocalizedText('title')}</h3>
            <p>${getLocalizedText('description')}</p>
            <div class="case-meta">
                <span>${scamCase.date ? new Date(scamCase.date).toLocaleDateString() : '日期未知'}</span>
                <span>${
                    scamCase.regions 
                        ? scamCase.regions.map(r => regionNames[r] || r).join(', ') 
                        : '地區未知'
                }</span>
            </div>
        </div>
        `;
    }).join('');

    // 如果沒有匹配案例
    if (filteredCases.length === 0) {
        casesGrid.innerHTML = `
        <div class="no-results">
            ${currentLang === 'en' ? 'No cases found' : 
              currentLang === 'zh-CN' ? '未找到匹配案例' : '未找到匹配案例'}
        </div>
        `;
    }
}

// 顯示錯誤信息
function showErrorMessage() {
    const casesGrid = document.getElementById('cases-grid');
    if (casesGrid) {
        casesGrid.innerHTML = `
        <div class="error-message">
            ${currentLang === 'en' ? 'Failed to load cases. Please try again later.' : 
              currentLang === 'zh-CN' ? '加载案例失败，请稍后重试。' : '加載案例失敗，請稍後重試。'}
        </div>
        `;
    }
}

// 開始測驗
function startQuiz() {
    const quizQuestions = document.getElementById('quiz-questions');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizResult = document.getElementById('quiz-result');
    
    quizIntro.style.display = 'none';
    quizQuestions.style.display = 'block';
    quizResult.style.display = 'none';
    
    // 這裡應該加載測驗問題
    const questions = [
        {
            question: {
                "zh-TW": "收到聲稱來自銀行的電子郵件，要求點擊鏈接更新賬戶信息，您應該怎麼做？",
                "zh-CN": "收到声称来自银行的电子邮件，要求点击链接更新账户信息，您应该怎么做？",
                "en": "You receive an email claiming to be from your bank asking you to click a link to update your account information. What should you do?"
            },
            options: [
                {"zh-TW": "立即點擊鏈接並更新信息", "zh-CN": "立即点击链接并更新信息", "en": "Click the link immediately and update your information"},
                {"zh-TW": "懸停查看鏈接，如果是銀行網站就點擊", "zh-CN": "悬停查看链接，如果是银行网站就点击", "en": "Hover over the link and click if it looks like the bank's website"},
                {"zh-TW": "不點擊鏈接，直接聯繫銀行確認", "zh-CN": "不点击链接，直接联系银行确认", "en": "Do not click the link, contact the bank directly to verify"}
            ],
            answer: 2
        },
        {
            question: {
                "zh-TW": "您接到自稱是警察的電話，說您的賬戶涉及洗錢，要求您提供銀行信息以配合調查，您應該？",
                "zh-CN": "您接到自称是警察的电话，说您的账户涉及洗钱，要求您提供银行信息以配合调查，您应该？",
                "en": "You receive a call from someone claiming to be a police officer, saying your account is involved in money laundering and requesting your bank information for investigation. What should you do?"
            },
            options: [
                {"zh-TW": "立即提供銀行信息以證明清白", "zh-CN": "立即提供银行信息以证明清白", "en": "Provide bank information immediately to prove innocence"},
                {"zh-TW": "掛斷電話，直接聯繫當地警察局核實", "zh-CN": "挂断电话，直接联系当地警察局核实", "en": "Hang up and contact the local police station directly to verify"},
                {"zh-TW": "要求對方提供警員編號和證明文件", "zh-CN": "要求对方提供警员编号和证明文件", "en": "Ask for the officer's badge number and identification"}
            ],
            answer: 1
        }
    ];
    
    const currentQuestions = questions.map(q => ({
        question: q.question[currentLang] || q.question.en,
        options: q.options.map(opt => opt[currentLang] || opt.en),
        answer: q.answer
    }));
    
    renderQuizQuestions(currentQuestions);
}

// 渲染測驗問題
function renderQuizQuestions(questions) {
    const quizContainer = document.getElementById('quiz-questions');
    
    quizContainer.innerHTML = questions.map((q, index) => `
        <div class="quiz-question ${index === 0 ? 'active' : ''}">
            <h3>${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="selectAnswer(${index}, ${i})">
                        ${opt}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 選擇答案
function selectAnswer(questionIndex, answerIndex) {
    // 這裡應該處理答案選擇邏輯
    console.log(`Question ${questionIndex} answer selected: ${answerIndex}`);
    
    // 顯示下一題或結果
    const questions = document.querySelectorAll('.quiz-question');
    questions[questionIndex].classList.remove('active');
    
    if (questionIndex < questions.length - 1) {
        questions[questionIndex + 1].classList.add('active');
    } else {
        showQuizResult();
    }
}

// 顯示測驗結果
function showQuizResult() {
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResult = document.getElementById('quiz-result');
    
    quizQuestions.style.display = 'none';
    quizResult.style.display = 'block';
    
    // 這裡應該計算並顯示結果
    quizResult.innerHTML = `
        <h3>${currentLang === 'en' ? 'Your Score:' : currentLang === 'zh-CN' ? '您的得分：' : '您的得分：'}</h3>
        <div class="result-score">8/10</div>
        <p>${currentLang === 'en' ? 'Good job! You have a good understanding of phishing scams.' : 
           currentLang === 'zh-CN' ? '做得很好！您对钓鱼诈骗有很好的理解。' : 
           '做得很好！您對釣魚詐騙有很好的理解。'}</p>
        <button onclick="startQuiz()">${currentLang === 'en' ? 'Try Again' : currentLang === 'zh-CN' ? '再试一次' : '再試一次'}</button>
    `;
}


// 初始化旭日图
function initSunburst() {
  const data = {
    "labels": ["Male", "Female", "21-30", "31-40", "41+"],
    "parents": ["", "", "Male", "Male", "Female"],
    "values": [62, 38, 32, 28, 19],
    "marker": {"colors": ["#3498db", "#e74c3c", "#2980b9", "#1a5276", "#c0392b"]}
  };
  
  Plotly.newPlot('sunburst-chart', [{
    type: "sunburst",
    labels: data.labels,
    parents: data.parents,
    values: data.values,
    marker: data.marker,
    textinfo: "label+percent entry"
  }], {
    margin: {t: 0, l: 0, r: 0, b: 0},
    height: 400
  });
}

// 初始化热力图
function initHeatmap() {
  const zValues = [
    [0.43, 0.38, 0.29],
    [0.35, 0.31, 0.22],
    [0.18, 0.15, 0.09]
  ];
  
  const heatmap = {
    z: zValues,
    x: ['<1万', '1-2万', '2-3万'],
    y: ['21-30', '31-40', '41+'],
    type: 'heatmap',
    colorscale: 'YlOrRd',
    hoverongaps: false
  };
  
  Plotly.newPlot('heatmap-chart', [heatmap], {
    margin: {t: 30, l: 60, r: 30, b: 60},
    height: 400
  });
}

// 页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
  initSunburst();
  initHeatmap();
});


function updateChartLabels(lang) {
  const labels = {
    'zh-TW': ['男性', '女性', '21-30歲', '31-40歲'],
    'en': ['Male', 'Female', '21-30', '31-40']
  };
  Plotly.relayout('sunburst-chart', {labels: labels[lang]});
}