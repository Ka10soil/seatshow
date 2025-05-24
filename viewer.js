const homeScreen = document.getElementById("homeScreen");
const viewerScreen = document.getElementById("viewerScreen");
const attentionScreen = document.getElementById("attentionScreen");

const noticeScreen = document.getElementById("noticeScreen");
const consentModal = document.getElementById("consentModal");

window.addEventListener("resize", () => {
  redrawAll(); // これで描き直すだけにする
});

function goToViewer() {
  showScreenWithGlitch('viewerScreen');
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';

    
    document.getElementById('viewerScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  

  image.src = "seatmap.jpg";
  
  setTimeout(() => {
    fullImageLoaded = true;
    minimap.width = 300;
    minimap.height = image.height / image.width * minimap.width;
    drawSeats();
  }, 500);
}



function goHome() {
  window.location.href = "indextrue.html";
}

const blackout = document.getElementById('blackout');
function showScreenWithGlitch(screenId) {
  const blackout = document.getElementById('blackout');
  const glitch = document.getElementById('glitch');

  // グリッチ発動
  glitch.style.opacity = 1;
  glitch.style.animation = 'glitchEffect 0.6s ease-in-out';

  setTimeout(() => {
    blackout.style.opacity = 1;
  }, 300);

  setTimeout(() => {
    // ここで画面切り替え！！
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');

    // blackoutとglitchをリセット
    glitch.style.opacity = 0;
    glitch.style.animation = 'none';
    blackout.style.opacity = 0;
  }, 800);
}



const canvas = document.getElementById("seatCanvas");
const ctx = canvas.getContext("2d");
const minimap = document.getElementById("minimap");
const mctx = minimap.getContext("2d");
const output = document.getElementById("output");
const image = new Image();


const zoomSize = 650;
const zoomScale = 0.55;

const ax = 1200
const seatData = {
"A": [
  { "start": 5, "count": 3, "y": 1961, "dy": 45.4, "x": 1130.0 },
  { "start": 8, "count": 9, "y": 1730, "dy": 45.4, "x": 1130.0 },
  { "start": 19, "count": 9, "y": 1232, "dy": 45.4, "x": 1130.0 },
  { "start": 28, "count": 3, "y": 749, "dy": 45.4, "x": 1130.0 }
],
"B": [
  { "start": 5, "count": 3, "y": 1961, "dy": 45.4, "x": 1181.9 },
  { "start": 8, "count": 10, "y": 1753, "dy": 45.4, "x": 1181.9 },
  { "start": 19, "count": 9, "y": 1251, "dy": 45.4, "x": 1181.9 },
  { "start": 28, "count": 3, "y": 749, "dy": 45.4, "x": 1181.9 }
],
"C": [
  { "start": 4, "count": 4, "y": 2008, "dy": 45.4, "x": 1233.8 },
  { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1233.8 },
  { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1233.8 }
],
"D": [
  { "start": 4, "count": 4, "y": 2006, "dy": 45.4, "x": 1285.7 },
  { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1285.7 },
  { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1285.7 }
],
"E": [
  { "start": 4, "count": 4, "y": 2007, "dy": 45.4, "x": 1337.6 },
  { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1337.6 },
  { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1337.6 }
],
"F": [
  { "start": 3, "count": 5, "y": 2051, "dy": 45.4, "x": 1389.5 },
  { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1389.5 },
  { "start": 28, "count": 5, "y": 749, "dy": 45.4, "x": 1389.5 }
],
"G": [
  { "start": 3, "count": 5, "y": 2053, "dy": 45.4, "x": 1441.4 },
  { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1441.4 },
  { "start": 28, "count": 5, "y": 749, "dy": 45.4, "x": 1441.4 }
],
"H": [
  { "start": 2, "count": 6, "y": 2099, "dy": 45.4, "x": 1493.3 },
  { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1493.3 },
  { "start": 28, "count": 6, "y": 749, "dy": 45.4, "x": 1493.3 }
],
"I": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1545.2 },
  { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1545.2 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1545.2 }
],
"J": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1597.1 },
  { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1597.1 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1597.1 }
],
"K": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1649.0 },
  { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1649.0 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1649.0 }
],
"L": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1700.9 },
  { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1700.9 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1700.9 }
],

  "M": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1752.8 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1752.8 }
],
"N": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1804.7 },
  
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1804.7 }
],
"O": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1856.6 },
  { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 1856.6 },
  { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 1856.6 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1856.6 }
],
"P": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1908.5 },
  { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 1908.5 },
  { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 1908.5 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1908.5 }
],
"Q": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1960.4 },
  { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 1960.4 },
  { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 1960.4 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1960.4 }
],
"R": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2012.3 },
  { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 2012.3 },
  { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 2012.3 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2012.3 }
],
"S": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2064.2 },
  { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 2064.2 },
  { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 2064.2 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2064.2 }
],
"T": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2116.1 },
  { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 2116.1 },
  { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 2116.1 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2116.1 }
],
"U": [
  { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2168 },
  { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 2168 },
  { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 2168 },
  { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2168 }
],
"V": [
  { "start": 1, "count": 7, "x": 2278.4, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2278.4, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2278.4, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2278.4, "y": 749,  "dy": 45.4 }
],
"W": [
  { "start": 1, "count": 7, "x": 2330.3, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2330.3, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2330.3, "y": 749,  "dy": 45.4 }
],
"X": [
  { "start": 1, "count": 7, "x": 2382.2, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2382.2, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2382.2, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2382.2, "y": 749,  "dy": 45.4 }
],
"Y": [
  { "start": 1, "count": 7, "x": 2434.1, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2434.1, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2434.1, "y": 749,  "dy": 45.4 }
],
"Z": [
  { "start": 1, "count": 7, "x": 2486.0, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2486, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2486, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2486.0, "y": 749,  "dy": 45.4 }
],
"AA": [
  { "start": 1, "count": 7, "x": 2537.9, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2537.9, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2537.9, "y": 749,  "dy": 45.4 }
],
"AB": [
  { "start": 1, "count": 7, "x": 2589.8, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2589.8, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2589.8, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2589.8, "y": 749,  "dy": 45.4 }
],
"AC": [
  { "start": 1, "count": 7, "x": 2641.7, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2641.7, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2641.7, "y": 749,  "dy": 45.4 }
],
"AD": [
  { "start": 1, "count": 7, "x": 2693.6, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2693.6, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2693.6, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2693.6, "y": 749,  "dy": 45.4 }
],
"AE": [
  { "start": 1, "count": 7, "x": 2745.5, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2745.5, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2745.5, "y": 749,  "dy": 45.4 }
],
"AF": [
  { "start": 1, "count": 7, "x": 2797.4, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 5, "x": 2797.4, "y": 1730, "dy": 45.4 },
  { "start": 21, "count": 7, "x": 2797.4, "y": 1138.2, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2797.4, "y": 749,  "dy": 45.4 }
]


};


const studentToSeat = {
  
  };
  
  const groups = [
    ['3428', '3429', '3418', '3441'] ,
    ['1226', '1220', '1224', '1222'] ,
    ['3607', '3603', '3617'] ,
    ['3904', '3915', '3916', '3927', '3905'] ,
    ['3540', '3522', '3115'] ,
    ['3935', '3936'] ,
    ['3901', '3919'] ,
    ['2235', '2223', '2232', '2236'] ,
    ['3826', '3106'] ,
    ['1232', '1208', '1237'] ,
    ['2937', '2930', '2925', '2931'] ,
    ['3419', '3411', '3438', '3437'] ,
    ['3907', '3926', '3928'] ,
    ['1206', '1202', '1238'] ,
    ['2807', '2804', '2811'] ,
    ['1440', '1434', '1433'] ,
    ['1302', '1329'] ,
    ['2827', '2840'] ,
    ['3436', '3839'] ,
    ['2818'] ,
    ['3303', '3307'] ,
    ['3609', '3611', '3628'] ,
    ['2403'] ,
    ['2808', '2826', '2525'] ,
    ['3417', '3404'] ,
    ['2918', '2935'] ,
    ['1320', '1313', '1328'] ,
    ['1311', '1307'] ,
    ['1308', '1326', '1327', '1304', '1341'] ,
    ['2813', '2814', '2831', '2809'] ,
    ['2924', '2916', '2917', '2919'] ,
    ['2433', '2219'] ,
    ['3923', '3921'] ,
    ['3624', '3817', '3215'] ,
    ['3902', '3906', '3914', '3918'] ,
    ['2603', '2609'] ,
    ['1306', '1314', '1312'] ,
    ['1826', '1813', '1812', '1827'] ,
    ['3734', '3710', '3433'] ,
    ['3738', '3729', '3726', '3725'] ,
    ['3737', '3805'] ,
    ['3423', '3407'] ,
    ['1839', '1829', '1823'] ,
    ['2611', '2638'] ,
    ['2130'] ,
    ['1832', '1828', '1825'] ,
    ['2904', '2911', '2914'] ,
    ['2908', '2912', '2934'] ,
    ['1815', '1821', '1804', '1816', '1822'] ,
    ['1239', '1230', '1229', '1240'] ,
    ['1814', '1817'] ,
    ['2607', '2601'] ,
    ['3709', '3736', '3739'] ,
    ['2802', '2832', '2825', '2836'] ,
    ['1437', '1439', '1432'] ,
    ['2615', '2605'] ,
    ['2820', '2815', '2822'] ,
    ['3405', '3412'] ,
    ['2839', '2833', '2830', '2805', '2803'] ,
    ['1801'] ,
    ['1709', '1702'] ,
    ['2620', '2618', '2628', '2629', '2625'] ,
    ['2311', '2314', '2323', '2332'] ,
    ['1411', '1405'] ,
    ['1527'] ,
    ['2909', '2926', '2915', '2902', '2910'] ,
    ['1425', '1431', '1428'] ,
    ['1438', '1338'] ,
    ['1531', '1526'] ,
    ['1502', '1501', '1509'] ,
    ['1305', '1412'] ,
    ['1922', '1903', '1915'] ,
    ['1510', '1511', '1512'] ,
    ['3124', '3127'] ,
    ['1507', '1535'] ,
    ['1831', '1838', '1833', '1834', '1840'] ,
    ['3202', '3223', '3131', '3605'] ,
    ['1324', '1435'] ,
    ['1901', '1930', '1936', '1935'] ,
    ['1322', '1309', '1303', '1310', '1330'] ,
    ['1715', '1729', '1730', '1717'] ,
    ['2338', '2312', '2317', '2321', '2306'] ,
    ['2302', '2303', '2309'] ,
    ['1818', '1837'] ,
    ['3731'] ,
    ['1923', '1919', '1920'] ,
    ['1213', '1233', '1525', '1134'] ,
    ['3434', '3424', '3403'] ,
    ['1830'] ,
    ['1932', '1933', '1934', '1927', '1926'] ,
    ['1515', '1508', '1514'] ,
    ['2337'] ,
    ['3713', '3724', '3838', '3723', '3727'] ,
    ['2203', '2218'] ,
    ['3122', '3110', '3112', '3222', '3230'] ,
    ['2913', '2920', '2903'] ,
    ['1637', '1625', '1634', '1615'] ,
    ['2616', '2415', '2631'] ,
    ['2521', '2529'] ,
    ['1723', '1725', '1720', '1706'] ,
    ['1618', '1617', '1616', '1613', '1635'] ,
    ['2712', '2710'] ,
    ['2310', '2339'] ,
    ['1640', '1627', '1633', '1636'] ,
    ['2213', '2205', '2234', '2206', '2220'] ,
    ['3231', '3207', '3225'] ,
    ['1728', '1727', '1712', '1724'] ,
    ['3721', '3220', '3212', '3820'] ,
    ['2634', '2723', '2425'] ,
    ['1921', '1929'] ,
    ['2231'] ,
    ['1332', '1325'] ,
    ['1519', '1518'] ,
    ['1532'] ,
    ['1120', '1115', '1125', '1130'] ,
    ['3735', '3535', '3306', '3708'] ,
    ['2724', '2537'] ,
    ['1522', '1524', '1506', '1517', '1528'] ,
    ['1108', '1124', '1123', '1106', '1122'] ,
    ['1333', '1809'] ,
    ['1521', '1516', '1530', '1529', '1539'] ,
    ['1907', '1905', '1908'] ,
    ['1739', '1401', '1219', '1133'] ,
    ['3730', '3141', '3439', '3632'] ,
    ['1708', '1701', '1703', '1704'] ,
    ['2713', '2112'] ,
    ['2927'] ,
    ['2301', '2304', '2305', '2333'] ,
    ['2123', '2114'] ,
    ['3701', '3707'] ,
    ['2731', '2732', '2722'] ,
    ['1628', '1622', '1623', '1630', '1631'] ,
    ['3332', '3336', '3323'] ,
    ['2319', '2324', '2617'] ,
    ['2210', '2215'] ,
    ['2735', '2734'] ,
    ['1614', '1608', '1605', '1606', '1611'] ,
    ['1620', '1602', '1626'] ,
    ['3703', '3804'] ,
    ['3113', '3139', '3704', '3128'] ,
    ['2538', '2512'] ,
    ['1914', '1928', '1938', '1939'] ,
    ['3801', '3814', '3821'] ,
    ['1139', '1137', '1135', '1136', '1138'] ,
    ['2824', '2817', '2504', '2837'] ,
    ['3105', '3107', '3114', '3807'] ,
    ['1810', '1819', '1811', '1707'] ,
    ['1918', '1910', '1917', '1902', '1904'] ,
    ['2715', '2733', '2711'] ,
    ['2701', '2704', '2716'] ,
    ['2229', '2835', '2327', '2230'] ,
    ['2336', '2126', '2226', '2709', '2413'] ,
    ['1114', '1126', '1118'] ,
    ['3338', '3339'] ,
    ['2135', '2119', '2125', '2118', '2104'] ,
    ['2622', '2635', '2630', '2621', '2623'] ,
    ['1132', '1110', '1109', '1103'] ,
    ['1111', '1141', '1104'] ,
    ['3539', '3530', '3529', '3524'] ,
    ['1410', '1407', '1409'] ,
    ['1408', '1414'] ,
    ['1201', '1217', '1223', '1205'] ,
    ['1113', '1102', '1334', '1335'] ,
    ['3504', '3510', '3612', '3810'] ,
    ['3616', '3618', '3620', '3622', '3634'] ,
    ['1402', '1925'] ,
    ['3216', '3604', '3201'] ,
    ['3217', '3502', '3432', '3937'] ,
    ['2116', '2308'] ,
    ['3320', '3534'] ,
    ['2619', '2632'] ,
    ['1204', '1216'] ,
    ['2438', '2402', '2122'] ,
    ['1105', '1610', '1612', '1836', '1835'] ,
    ['2408', '2421', '2436', '2437'] ,
    ['2401', '2420', '2435'] ,
    ['3732', '3613'] ,
    ['2636', '2237'] ,
    ['3712', '3929', '3633'] ,
    ['3802', '3420', '3513'] ,
    ['1323', '1331'] ,
    ['3508', '3629', '3637', '3409', '3301'] ,
    ['3521', '3718', '3716'] ,
    ['2606', '2637', '2705', '2329'] ,
    ['1533', '1415', '1236'] ,
    ['3135', '3238', '3315', '3836'] ,
    ['3213', '3835', '3520', '3328'] ,
    ['3815', '3519', '3833'] ,
    ['3402', '3413', '3426'] ,
    ['2124', '2111'] ,
    ['1117', '1805', '1131'] ,
    ['3130', '3304', '3308', '3827'] ,
    ['3406', '3232'] ,
    ['1209', '1227'] ,
    ['3830', '3533'] ,
    ['2821', '2834', '2819'] ,
    ['1808'] ,
    ['3627', '3619', '3537', '3329'] ,
    ['1619', '1609', '1906'] ,
    ['2335', '2901', '2602', '2102', '2109'] ,
    ['3823', '3103'] ,
    ['3831', '3837'] ,
    ['3430', '3506', '3601', '3636'] ,
    ['1940', '1909', '1911', '1913', '1916'] ,
    ['1214', '1207', '1203'] ,
    ['2322'] ,
    ['2428', '2221', '2414'] ,
    ['2738', '2331', '2535', '2528', '2340'] ,
    ['2532', '2202', '2315'] ,
    ['3702', '3706', '3705', '3733'] ,
    ['1520', '1534', '1503', '1504'] ,
    ['2405', '2407', '2417', '2422', '2434'] ,
    ['1337', '1319'] ,
    ['1420', '1403'] ,
    ['2530', '2533', '2511'] ,
    ['2101', '3440'] ,
    ['2505', '2222', '2136', '2204', '2726'] ,
    ['1741', '1737', '1735'] ,
    ['3237', '3813', '3233'] ,
    ['2217'] ,
    ['1731'] ,
    ['2907', '2938', '2940'] ,
    ['2801', '2320'] ,
    ['3610', '3528', '3925'] ,
    ['1235', '1718', '1218', '1221', '1234'] ,
    ['1321', '1317', '1318', '1315'] ,
    ['1607'] ,
    ['3415', '3408'] ,
    ['1505'] ,
    ['3111', '3208', '3312', '3116'] ,
    ['3829', '3808', '3822', '3129'] ,
    ['3138', '3305', '3435', '3920'] ,
    ['3908', '3818'] ,
    ['1705', '1719', '1721'] ,
    ['1738', '1726', '1732', '1736'] ,
    ['1211'] ,
    ['2412', '2624', '2720', '2721', '2129'] ,
    ['1413'] ,
    ['2540', '2539'] ,
    ['2737', '2719', '2233', '2224'] ,
    ['3416', '3241'] ,
    ['3309', '3318', '3331', '3335', '3310'] ,
    ['3229', '3536'] ,
    ['1129', '1127', '1121', '1128', '1101'] ,
    ['2524'] ,
    ['1419', '1427', '1424', '1404'] ,
    ['2120', '2113', '2105'] ,
    ['2933', '2906', '2921'] ,
    ['2707', '2714', '2727', '2729', '2730'] ,
    ['3340', '3317', '3321', '3326'] ,
    ['2708', '2725'] ,
    ['2928', '2929', '2519'] ,
    ['1210'] ,
    ['3214', '3205'] ,
    ['2534', '2502'] ,
    ['2736', '2739', '2728', '2717'] ,
    ['2211', '2214'] ,
    ['2423', '2424', '2431'] ,
    ['2107', '2328'] ,
    ['3518', '3525', '3422'] ,
    ['2427', '2432'] ,
    ['3538', '3532', '3234', '3621'] ,
    ['1601', '1604', '1632'] ,
    ['2240', '2823', '2812'] ,
    ['2334', '2325'] ,
    ['1713', '1714'] ,
    ['2128', '2127'] ,
    ['1436', '1603'] ,
    ['1225', '1228'] ,
    ['2117', '2133', '2121', '2103'] ,
    ['2536', '2513'] ,
    ['1406'] ,
    ['3840', '3541', '3109'] ,
    ['2411', '2410'] ,
    ['3503', '3516', '3211'] ,
    ['2426', '2440', '2404', '2106'] ,
    ['3507', '3531'] ,
    ['1807', '1802'] ,
    ['2140', '3720', '3240', '3509'] ,
    ['3218', '3136'] ,
    ['2515', '2516', '2806'] ,
    ['3132', '3134', '3740'] ,
    ['3313', '3123', '3828', '3501'] ,
    ['3625', '3635', '3511'] ,
    ['2816', '2239', '2702'] ,
    ['3909', '3337'] ,
    ['3203', '3206', '3228'] ,
    ['2509', '2108', '2640'] ,
    ['2110', '2416', '2608'] ,
    ['2216', '2207', '2212'] ,
    ['1301'] ,
    ['3121', '3717'] ,
    ['1621'] ,
    ['1430', '1429', '1422'] ,
    ['3133', '3119'] ,
    ['2510', '2429', '2406'] ,
    ['3639'] ,
    ['3401', '3431'] ,
    ['1112'] ,
    ['3311', '3330', '3421', '3714', '3715'] ,
    ['2520'] ,
    ['1426', '1523'] ,
    ['1140'] ,
    ['1421', '1711'] ,
    ['2507', '2526', '2522', '2508'] ,
    ['3204', '3226'] ,
    ['2626', '2610', '2613', '2614', '2627'] ,
    ['3425'] ,
    ['3314', '3515'] ,
    ['2936'] ,
    ['3324', '3316', '3333', '3334', '3626'] ,
    ['1722', '1716'] ,
    ['1423', '1416'] ,
    ['1116'] ,
    ['1734'] ,
    ['1536'] ,
    ['3322', '3615']
  ];

let highlightBox = null;
let zoomedIn = true;
let fullImageLoaded = false;
let currentSeat = null;
let currentGroup = [];



minimap.addEventListener("click", () => {
  zoomedIn = !zoomedIn;
  drawSeats(currentSeat, currentGroup);
});

function drawSeats(mySeat = null, groupSeats = []) {
  if (!fullImageLoaded) return;

  let highlight = null;
  for (const col in seatData) {
    for (const segment of seatData[col]) {
      for (let i = 0; i < segment.count; i++) {
        const seatNum = segment.start + i;
        const label = `${col}${String(seatNum).padStart(2, '0')}`;
        if (label === mySeat) {
          highlight = { x: segment.x, y: segment.y - segment.dy * i };
        }
      }
    }
  }

  highlightBox = highlight;
  const ratio = window.devicePixelRatio || 1; // 追加: ディスプレイ解像度
  
  const scale = (zoomedIn && highlightBox) ? zoomScale : 1;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  


  if (zoomedIn && highlightBox) {
    const sx = Math.max(0, highlightBox.x - zoomSize / 2);
    const sy = Math.max(0, highlightBox.y - zoomSize / 2);
  
    // キャンバスの内部サイズをratio倍
    canvas.width = zoomSize * zoomScale * ratio;
    canvas.height = zoomSize * zoomScale * ratio;
  
    // CSSの見た目サイズは変えない
    canvas.style.width = (zoomSize * zoomScale) + "px";
    canvas.style.height = (zoomSize * zoomScale) + "px";
  
    // スケール調整
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  
    ctx.drawImage(
      image,
      sx, sy, zoomSize, zoomSize, // 元画像から切り取る部分
      0, 0, zoomSize * zoomScale, zoomSize * zoomScale // キャンバスに描くサイズ
    );
    
    
  } else {
    
   const baseW = image.naturalWidth;
  const baseH = image.naturalHeight;


// スマホ画面の幅に合わせて表示サイズを決める
const maxDisplayWidth = canvas.parentElement.clientWidth || window.innerWidth;
const scale = maxDisplayWidth / baseW;

// CSSの見た目サイズ（ディスプレイ用）
canvas.style.width = (baseW * scale) + "px";
canvas.style.height = (baseH * scale) + "px";

// 内部ピクセルサイズを ratio 倍
canvas.width = baseW * ratio;
canvas.height = baseH * ratio;

// 高DPI対応で拡大描画
ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

// 画像描画（切り出しなし）
ctx.imageSmoothingEnabled = false;
ctx.drawImage(
  image,
  0, 0, baseW, baseH,  // 元画像の全体を
  0, 0, baseW, baseH   // キャンバスにも等倍で描画
);

    

  } 
  
  for (const col in seatData) {
    for (const segment of seatData[col]) {
      for (let i = 0; i < segment.count; i++) {
        const seatNum = segment.start + i;
        const label = `${col}${String(seatNum).padStart(2, '0')}`;
        let x = segment.x;
        let y = segment.y - segment.dy * i;

        if (zoomedIn && highlightBox) {
          x = (x - highlightBox.x + zoomSize / 2) * zoomScale;
          y = (y - highlightBox.y + zoomSize / 2) * zoomScale;
        }

        ctx.beginPath();
        const size = 35 * scale; // 直径と同じサイズ

        if (label === mySeat) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
            ctx.strokeStyle = "rgb(242, 255, 0, 0.6)";
            ctx.lineWidth = 4;
            ctx.strokeRect(x - size/2, y - size/2, size, size);
          } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
        }

        ctx.fillStyle = groupSeats.includes(label) 
        ? "rgba(100, 200, 255, 0.3)"
        : (label === mySeat ? "rgba(190, 70, 255, 0.3)" : "rgba(255, 255, 255, 0)");

        ctx.fillRect(x - size/2, y - size/2, size, size);
      }
    }
  }

  const s = minimap.width / image.width;
  mctx.clearRect(0, 0, minimap.width, minimap.height);
  mctx.drawImage(image, 0, 0, minimap.width, minimap.height);
  if (highlightBox) {
    mctx.strokeStyle = "red";
    mctx.lineWidth = 1;
    mctx.strokeRect(
      (highlightBox.x - zoomSize / 2) * s,
      (highlightBox.y - zoomSize / 2) * s,
      zoomSize * s,
      zoomSize * s
    );
  }
}

function highlightGroup() {
  const inputId = document.getElementById("studentId").value.trim();
  const mySeat = studentToSeat[inputId];
  if (!mySeat) {
    currentSeat = null;
    currentGroup = [];
    output.innerHTML = "<strong>エラー:</strong> HRNOが登録されていません。";
    drawSeats();
    return;
  }

  zoomedIn = true;
  const myGroup = groups.find(g => g.includes(inputId)) || [];
  const groupInfo = myGroup.map(id => ({ id, seat: studentToSeat[id] || "-" }));

  currentSeat = mySeat;
  currentGroup = groupInfo.map(g => g.seat).filter(s => s !== mySeat);

  drawSeats(currentSeat, currentGroup);

  groupInfo.sort((a, b) => {
    const [aCol, aRow] = [a.seat[0], parseInt(a.seat.slice(1))];
    const [bCol, bRow] = [b.seat[0], parseInt(b.seat.slice(1))];
  
    if (aCol !== bCol) return bCol.localeCompare(aCol); // 列を逆順
    return bRow - aRow; // 数字を逆順
  });
  
  output.innerHTML = `
    <strong>あなたの席:</strong> ${mySeat}<br>
    <strong>グループメンバーの席:</strong><br>
    <ul>
      ${groupInfo.map(g => `<li>${g.id} → ${g.seat}${g.id === inputId ? "（あなた）" : ""}</li>`).join("")}
    </ul>
  `;
  
}

function drawOverlay() {
  const ctx = seatCanvas.getContext("2d");
  ctx.clearRect(0, 0, seatCanvas.width, seatCanvas.height);

  for (const col in seatData) {
    for (const segment of seatData[col]) {
      for (let i = 0; i < segment.count; i++) {
        const seatNum = segment.start + i;
        const label = `${col}${String(seatNum).padStart(2, '0')}`;
        let x = segment.x;
        let y = segment.y - segment.dy * i;

        // 通常表示（ズームなし）を想定
        const size = 35; // 等倍描画。CSSで拡大するならここはそのままでOK

        ctx.beginPath();

        if (label === mySeat) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
          ctx.strokeStyle = "rgba(242, 255, 0, 0.6)";
          ctx.lineWidth = 4;
          ctx.strokeRect(x - size / 2, y - size / 2, size, size);
        } else {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }

        ctx.fillStyle = groupSeats.includes(label)
          ? "rgba(100, 200, 255, 0.3)"
          : (label === mySeat ? "rgba(190, 70, 255, 0.3)" : "rgba(22, 22, 62, 0)");

        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
  }
}
