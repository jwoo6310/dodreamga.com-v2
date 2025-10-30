// Missionaries - world map
window.lastCountryName = window.lastCountryName || null;

// --- ISO 3166-1 alpha-2 codes for flag images ---
const ISO2 = {
    "Philippines": "ph",
    "Thailand": "th",
    "South Africa": "za",
    "United Kingdom": "gb",
    "Turkey": "tr",
    "Russia": "ru",
    "Cameroon": "cm",
    "Malaysia": "my",
    "Japan": "jp",
    "Indonesia": "id",
    "Myanmar": "mm",
    "Laos": "la",
    "Vietnam": "vn",
    "Cambodia": "kh",
    "United States of America": "us",
    "South Korea": "kr",
    "Republic of Korea": "kr",
    "Korea, Republic of": "kr",
    "Korea (Republic of)": "kr"
};

// ===== countryData (bilingual) =====
const countryData = {
    "Philippines": {
        title: {
            ko: "필리핀: 정용석, 구효실 선교사님",
            en: "Philippines — Missionaries Jung Yongseok & Koo Hyosil"
        },
        desc: {
            ko: "두드림 교회에서 파송된 선교사로 UP대학(University of the Philippine) 근처의 마을을 중심으로 복음을 전하고 교회를 세워 현지인 교회 사역을 하고 있습니다. 예배와 아이들을 교육하고 있으며 제자 훈련을 하고 있습니다.",
            en: "Sent from DoDream Church, serving communities near the University of the Philippines by planting churches and leading local-church ministries. They lead worship, children’s education, and discipleship training."
        }
    },

    "Thailand": {
        title: {
            ko: "태국: 신동운·박향실 / 허수성·허인영 선교사님",
            en: "Thailand — Missionaries Shin Dongwoon & Park Hyangsil / Heo Soosung & Heo Inyoung"
        },
        desc: {
            ko: "신동운·박향실: 기독교대한성결교단 파송 선교사로 30년간 두 지역에서 사역했습니다. 신학교 사역과 더불어 2년 과정의 지도자 훈련으로 태국 교회 목회자를 세우고, 심화 과정 및 평신도 지도자 훈련원(2년 과정)으로 말씀 훈련을 이어가고 있습니다.\n\n허수성·허인영: WEC 파송 선교사로 교회를 세우고 지역 주민을 제자로 훈련하고 있습니다. 먼저 하늘나라로 간 딸 Ellen의 간증 책을 통해 복음을 전하며, Ellen Her 재단을 세워 태국의 다음세대를 후원하고 있습니다.",
            en: "Shin & Park: Sent by the Korea Evangelical Holiness Church, they have served in two regions for 30 years. Through seminary work and a two-year leadership program, they equip pastors for Thai churches, along with advanced studies and a two-year lay-leader training institute.\n\nHeo & Heo: Sent by WEC, they plant churches and disciple local residents. Through their daughter Ellen’s heaven-testimony book they share the gospel, and via the Ellen Her Foundation they support Thailand’s next generation."
        }
    },

    "South Africa": {
        title: {
            ko: "남아공화국: 이기쁨 선교사님",
            en: "South Africa — Missionary Lee Gippeum"
        },
        desc: {
            ko: "DCF 파송 선교사로 남아공에서 20년째 사역하고 있습니다. Port Elizabeth 현지 흑인 타운십의 공립학교에서 컴퓨터를 가르치며 예배와 양육 사역을 병행합니다. 예수 문화 훈련을 겸한 예배 센터를 열어 사역하고 있습니다.",
            en: "Sent by DCF, serving in South Africa for 20 years. Teaches computer classes at a public school in a Black township of Port Elizabeth while leading worship and discipleship ministries, and operates a worship center with Jesus-culture training."
        }
    },

    "United Kingdom": {
        title: {
            ko: "웨일즈(영국): 이성수, 백나나 선교사님",
            en: "Wales (UK) — Missionaries Lee Sungsoo & Baek Nana"
        },
        desc: {
            ko: "BUW의 첫 파송 선교사로 HopeGobaith 교회와 협력하여 지역·교육 사역을 병행합니다. 매주 초등학교 Morfa에서 100여 명의 학생들에게 성경을 가르치며, 유학생 제자훈련도 진행합니다.",
            en: "As BUW’s first sent missionaries, they partner with HopeGobaith Church, serving in local and education ministries. Weekly, they teach Scripture to 100+ students at Morfa Primary School and disciple international students."
        }
    },

    "Turkey": {
        title: {
            ko: "터키: 강현아 선교사님",
            en: "Turkey — Missionary Kang Hyunah"
        },
        desc: {
            ko: "모슬렘 지역에서 복음 전도 사역을 하고 있습니다. 이름을 밝힐 수 없는 교회를 세워 섬기며, 은밀하게 복음을 전합니다. 많은 것을 포기한 믿음의 사람들과 공동체를 이루어, 성경 속 지역들을 돌며 숨은 교회를 세우고 있습니다.",
            en: "Engaged in gospel ministry among Muslims. Serves a church that cannot be publicly named, sharing the gospel discreetly. With a community of faithful believers, she travels biblical regions to establish hidden churches."
        }
    },

    "Russia": {
        title: {
            ko: "러시아: 장석천, 장경희 선교사님",
            en: "Russia — Missionaries Jang Seokcheon & Jang Kyunghee"
        },
        desc: {
            ko: "기독교대한성결교단 파송 선교사로 소망교회와 올긴스카야 교회를 섬기며, 신학교 사역을 통해 현지 교회 지도자를 양성합니다. 교회 사역과 구제 사역을 병행하고, 러시아 한글학교를 통해 한글과 복음을 전하고 있습니다.",
            en: "Sent by the KEHC, they serve Somang Church and Olginskaya Church, training local church leaders through seminary ministry. They combine church work with relief work and share the gospel through a Korean language school."
        }
    },

    "Cameroon": {
        title: {
            ko: "카메룬: 송은천, 최현수 선교사님",
            en: "Cameroon — Missionaries Song Eunchun & Choi Hyunsu"
        },
        desc: {
            ko: "기독교대한성결교단 파송 선교사로 무슬림이 장악한 지역에서 교회 개척팀(V.C.P)으로 전도·개척 사역을 하고 있습니다. 카메룬 기도센터 담임 교역자이자 카메룬 복음신학대학에서 다음 세대 종교 지도자를 세우고 있습니다.",
            en: "Sent by the KEHC, they evangelize and plant churches through the V.C.P team in Muslim-dominant areas. They lead the Cameroon Prayer Center and train next-generation religious leaders at Cameroon Evangelical Theological College."
        }
    },

    "Malaysia": {
        title: {
            ko: "말레이시아: 이종대, 안미숙 선교사님",
            en: "Malaysia — Missionaries Lee Jongdae & Ahn Misook"
        },
        desc: {
            ko: "GBT 파송 선교사로 현지 섬 브각(Bergak) 마을에서 문자를 만들어 가르치고, 그 문자로 성경을 번역하며 복음을 전하고 있습니다. 문명·의료·주거 인프라를 세우는 사역도 병행합니다. (GBT는 글이 없는 언어에 문자를 만들고 문법을 세워 성경을 번역하는 선교단입니다.)",
            en: "Sent by GBT, they create a writing system for a local island community (Bergak), teach literacy, translate the Bible into the new script, and share the gospel—alongside building civil, medical, and housing infrastructure. (GBT creates scripts and grammar for oral languages to enable Bible translation.)"
        }
    },

    "Japan": {
        title: {
            ko: "일본: 소기호, 정민임 선교사님",
            en: "Japan — Missionaries So Giho & Jung Min-im"
        },
        desc: {
            ko: "기독교대한성결교단 선교사로 일본에서 교회를 세우고 사역하고 있습니다. 모든 것을 신으로 여기는 종교적 특성상 선교와 교회 활동이 어렵지만, 오랜 세월 성실히 교회를 세우고 섬기고 있습니다.",
            en: "KEHC missionaries planting and serving churches in Japan. Despite religious context that treats many things as deities—making mission and church work difficult—they have faithfully built and served churches over many years."
        }
    },

    "Indonesia": {
        title: {
            ko: "인도네시아: 김학봉, 서미식 선교사님",
            en: "Indonesia — Missionaries Kim Hakbong & Seo Misik"
        },
        desc: {
            ko: "기독교대한성결교단 파송 선교사로 방콕 안디옥교회를 담임하며 현지 교회 개척을 섬기고, 나콘파놈·씨사켓·반부아·논쏨분 교회를 개척·돌보고 있습니다. 산족 소수부족 여러 교회와 협력하며, Streams of Life Foundation을 통해 복음 전도와 고아·어려운 학생들을 위한 지원/장학 사역을 하고 있습니다.",
            en: "KEHC missionaries pastoring Bangkok Antioch Church and supporting local church plants (Nakhon Phanom, Sisaket, Ban Bua, Non Sombun). They partner with several mountain-tribe churches and, through the Streams of Life Foundation, evangelize and provide aid and scholarships for orphans and students in need."
        }
    },

    "Myanmar": {
        title: {
            ko: "미얀마",
            en: "Myanmar"
        },
        desc: {
            ko: "인도차이나 선교 네트워크와 연계된 지역으로, 두드림 교회가 기도와 물질로 미얀마 팀을 후원하고 있습니다.",
            en: "A region connected to the Indochina mission network; DoDream Church supports the Myanmar team through prayer and giving."
        }
    },

    "Laos": {
        title: {
            ko: "라오스",
            en: "Laos"
        },
        desc: {
            ko: "인도차이나 선교 네트워크와 연계된 지역입니다.",
            en: "Part of the Indochina mission network."
        }
    },

    "Vietnam": {
        title: {
            ko: "베트남",
            en: "Vietnam"
        },
        desc: {
            ko: "인도차이나 선교 네트워크와 연계된 지역입니다.",
            en: "Part of the Indochina mission network."
        }
    },

    "Cambodia": {
        title: {
            ko: "캄보디아",
            en: "Cambodia"
        },
        desc: {
            ko: "인도차이나 선교 네트워크와 연계된 지역입니다.",
            en: "Part of the Indochina mission network."
        }
    },

    "United States of America": {
        title: {
            ko: "미국: 김인승, 안성희 선교사님",
            en: "United States – Missionaries Rev. Inseung Kim & Sunghee Ahn"
        },
        desc: {
            ko: "두드림 교회를 중심으로 한국, 필리핀과 함께 창세기 1장의 비전을 이루어 가는 공동체입니다. 제자 양육을 통해 건강한 교회를 세우고, 지역에 봉사하며 문화 사역을 통하여 하나님을 전하고 지역에 하나님의 문화가 세우고 있습니다. 또한 인도차이나를 비롯한 여러 지역 선교사를 후원하고 있습니다.",
            en: "This is a community centered on DoDream Church that, together with Korea and the Philippines, is pursuing the vision of Genesis 1. Through disciple-making, we build healthy churches, serve the local community, and proclaim God through cultural ministries so that God’s culture is established in the region. We also support missionaries in various fields, including Indochina."
        }
    },

    "South Korea": {
        title: {
            ko: "한국: 김태주, 고은숙 목사님",
            en: "South Korea — Pastors Kim Taejoo & Ko Eunsuk"
        },
        desc: {
            ko: "SMD344 선교단 본부로 한국, 필리핀 그리고 미국 지부와 연합하여 창세기1장의 비전을 이루고, 열방위에 서는 교회를 세워 영혼을 구원하고 제자로 세웁니다. 특히 선교에 힘쓰고, 도서관 사역을 통해 지역에 봉사하고 있습니다.",
            en: "As the headquarters of the SMD344 Mission, it works in unity with the Korea, Philippines, and U.S. branches to fulfill the vision of Genesis 1, planting churches that stand among the nations to save souls and make disciples. In particular, it is devoted to missions and serves the local community through a library ministry."
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const width = 1000;
    const height = 500;

    const targetCountries = [
        "Philippines", "Thailand", "South Africa", "United Kingdom",
        "Turkey", "Russia", "Cameroon", "Malaysia", "Japan",
        "Indonesia", "Myanmar", "Laos", "Vietnam", "Cambodia",
        "United States of America", "South Korea"
    ];

    // Zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    // SVG container
    const svg = d3.select("#world-map")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "hidden")
        .style("background", "#f8fafc")
        .call(zoom);

    // Zoomable group
    const g = svg.append("g");

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("visibility", "hidden");

    // Load and draw
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(function (world) {
        const countries = topojson.feature(world, world.objects.countries).features;

        // Projection
        const projection = d3.geoMercator()
            .scale(170)
            .center([20, 15])
            .translate([width / 2, height / 2])
            .precision(0.1);

        const path = d3.geoPath().projection(projection).pointRadius(2);

        // Countries
        g.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", d => targetCountries.includes(d.properties.name) ? "country highlighted" : "country")
            .attr("d", path)
            .attr("stroke-width", 0.5)
            .attr("stroke", "#fff")
            .on("mouseover", function (event, d) {
                if (targetCountries.includes(d.properties.name)) {
                    tooltip.style("visibility", "visible").text(d.properties.name);
                }
                d3.select(this).classed("hovered", true);
            })
            .on("mousemove", function (event) {
                tooltip.style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
                d3.select(this).classed("hovered", false);
            })
            .on("click", function (event, d) {
                event.stopPropagation();
                if (targetCountries.includes(d.properties.name)) {
                    window.lastCountryName = d.properties.name; // 마지막 선택 저장
                    showCountryInfo(d.properties.name);
                }
            });

        // Zoom controls (moved inward)
        const controlX = width - 150;
        const controlY = 16;

        const zoomControls = svg.append("g")
            .attr("class", "zoom-controls")
            .attr("transform", `translate(${controlX}, ${controlY})`);

        // +
        zoomControls.append("rect")
            .attr("x", 0).attr("y", 0).attr("width", 30).attr("height", 30)
            .attr("rx", 4).attr("ry", 4)
            .attr("fill", "#fff").attr("stroke", "#ccc").attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => svg.transition().call(zoom.scaleBy, 1.5));
        zoomControls.append("text")
            .attr("x", 15).attr("y", 19).attr("text-anchor", "middle")
            .attr("font-size", "20px").attr("fill", "#666").text("+");

        // −
        zoomControls.append("rect")
            .attr("x", 40).attr("y", 0).attr("width", 30).attr("height", 30)
            .attr("rx", 4).attr("ry", 4)
            .attr("fill", "#fff").attr("stroke", "#ccc").attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => svg.transition().call(zoom.scaleBy, 0.75));
        zoomControls.append("text")
            .attr("x", 55).attr("y", 19).attr("text-anchor", "middle")
            .attr("font-size", "20px").attr("fill", "#666").text("−");

        // reset
        zoomControls.append("rect")
            .attr("x", 80).attr("y", 0).attr("width", 30).attr("height", 30)
            .attr("rx", 4).attr("ry", 4)
            .attr("fill", "#fff").attr("stroke", "#ccc").attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => {
                svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
            });
        zoomControls.append("text")
            .attr("x", 95).attr("y", 19).attr("text-anchor", "middle")
            .attr("font-size", "14px").attr("fill", "#666").text("⟲");

        // Initial zoom-in (slight)
        const initialK = 1.35;
        const cx = width / 2,
            cy = height / 2;
        const initialTransform = d3.zoomIdentity
            .translate(cx - cx * initialK, cy - cy * initialK)
            .scale(initialK);
        svg.call(zoom.transform, initialTransform);
    });

    // ---- Country info panel ----
    function showCountryInfo(countryName) {
        window.lastCountryName = countryName; // 안전하게 저장

        const countryInfo = document.getElementById('country-info');
        const countryNameElement = document.getElementById('country-name');
        const countryDescription = document.getElementById('country-description');
        const countryCapital = document.getElementById('country-capital');
        const countryPopulation = document.getElementById('country-population');
        const countryFlag = document.getElementById('country-flag');

        // language 
        const lang = (window.currentLanguage === 'ko') ? 'ko' : 'en';

        const data = countryData[countryName] || null;

        // title / description
        countryNameElement.textContent = (data?.title?.[lang]) || countryName;
        if (data?.desc?.[lang]) {
            countryDescription.innerHTML = String(data.desc[lang]).replace(/\n/g, "<br>");
        } else {
            countryDescription.textContent = (lang === 'ko') ? '정보가 없습니다.' : 'No description available.';
        }

        // hide capital / population rows
        if (countryCapital) countryCapital.classList.add('hidden');
        if (countryPopulation) countryPopulation.classList.add('hidden');

        // flag
        const code = (ISO2[countryName] || "").toLowerCase();
        if (code) {
            countryFlag.innerHTML = `
        <img
          src="https://flagcdn.com/w320/${code}.png"
          srcset="https://flagcdn.com/w320/${code}.png 1x, https://flagcdn.com/w640/${code}.png 2x"
          alt="Flag of ${countryName}"
          class="w-48 h-32 object-cover rounded border border-gray-200"
          loading="lazy"
          referrerpolicy="no-referrer"
        />`;
        } else {
            countryFlag.innerHTML = `
        <div class="w-48 h-32 grid place-items-center bg-gray-100 text-gray-500 rounded">
          <span>No flag available</span>
        </div>`;
        }

        // show panel
        if (countryInfo) countryInfo.classList.remove('hidden');
    }

    window.addEventListener('langchange', () => {
        if (window.lastCountryName) {
            showCountryInfo(window.lastCountryName);
        }
    });
});