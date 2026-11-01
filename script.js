// =============================================================
// GraminSeva / KisanMitra - Application Logic & Dynamic Features
// =============================================================

window.tailwind = window.tailwind || {};
window.tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            farmer: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#bbf7d0',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#14532d',
            },
            soil: {
              50: '#fdf8f4',
              100: '#f7ede2',
              500: '#b45309',
              800: '#78350f',
              900: '#451a03',
            }
          }
        }
      }
    }

// -------------------------------------------------------------
    // 1. MULTILINGUAL DICTIONARY & STATE MANAGEMENT
    // -------------------------------------------------------------
    let currentLang = 'hi';

    function getLocalized(val) {
      if (!val) return '';
      if (typeof val === 'string') return val;
      return val[currentLang] || val['en'] || val['hi'] || '';
    }
    let currentActiveCrop = 'wheat';
    let currentActiveDisease = 'rust';
    let isSunlightMode = false;
    let isListening = false;
    let speechRecognitionInstance = null;

    const TRANSLATIONS = {
      hi: {
        brandTitle: "GraminSeva",
        brandTagline: "किसान मित्र एवं ग्रामीण डिजिटल सेवा केंद्र",
        badgeOnline: "ताज़ा मंडी भाव",
        btnSunLabel: "धूप मोड",
        btnMicLabel: "आवाज़ से पूछें",
        navMandi: "मंडी भाव",
        navDoctor: "AI फसल डॉक्टर",
        navEquipment: "किराया यंत्र",
        navEmergency: "आपातकालीन सेवाएं",
        mandiHeadTitle: "कृषि उपज मंडी भाव व शुद्ध मुनाफा गणक",
        mandiHeadSub: "विभिन्न मंडियों की तुलना करें और वाहन भाड़ा काटकर अपना वास्तविक मुनाफा निकालें।",
        btnReadMandi: "भाव बोलकर सुनाएं",
        labelChooseCrop: "फसल चुनें (Choose Crop):",
        calcTitle: "मंडी भाड़ा व शुद्ध मुनाफा कैलकुलेटर (Net Return Estimator)",
        calcSub: "खेत से मंडी दूरी व वाहन खर्च घटाकर प्रति क्विंटल शुद्ध आय निकालें",
        lblCalcCrop: "फसल व अनुमानित भाव",
        lblCalcQty: "उपज मात्रा (क्विंटल)",
        lblCalcDist: "मंडी दूरी (किमी)",
        lblCalcFreight: "वाहन दर (₹/किमी)",
        lblTotalSale: "कुल बिक्री मूल्य:",
        lblTotalTransport: "अनुमानित परिवहन खर्च:",
        lblNetProfit: "शुद्ध जेब में बचत (Net in Hand):",
                headingMandiCards: "आस-पास की प्रमुख एपीएमसी मंडियां (Nearby APMC Mandis)",
        mandiUpdatedTime: "आज का अपडेट (Updated 2 hrs ago)",
        lblModalPrice: "मॉडल भाव (Modal Price):",
        lblPerQuintal: "/क्विंटल",
        lblMin: "न्यूनतम:",
        lblMax: "अधिकतम:",
        lblTotalArrival: "आज की कुल आवक:",
        lblTons: "टन",
        lblBales: "गांठें",
        lblKmAway: "किमी दूर",
        lblMandiStatus: "मंडी स्थिति:",
        btnCalcProfit: "इस मंडी पर मुनाफा जोड़ें",
        lblNetPerQuintal: "प्रति क्विंटल शुद्ध",

        doctorHeadTitle: "फसल रोग निदान एवं जैव-उपचार (Agri-Doctor)",
        doctorHeadSub: "खराब पत्ते की फोटो लगाएं या लक्षण चुनें। ICAR खुराक, देशी काढ़ा व छिड़काव मौसम तुरंत पाएं।",
        btnReadDoc: "सलाह सुनें",
        lblLeafPhoto: "पत्ते या कीट की फोटो अपलोड करें (Photo Diagnosis)",
        btnUploadText: "कैमरे से फोटो खींचें या गैलरी से चुनें",
        lblQuickSymptoms: "या सीधा रोग लक्षण चुनें:",
        lblCustomQuery: "अन्य समस्या लिखें या बोलें:",
        lblSymptomHead: "पहचान और लक्षण (Symptoms):",
        lblIcarRemedy: "आईसीएआर मानक उपचार (ICAR Chemical)",
        lblBioRemedy: "देसी जैव समाधान (Bio / Organic)",
        lblWeatherGuard: "मौसम सुरक्षा चेतावनी (Spray Window)",
        lblOfflineLibrary: "ऑफ़लाइन किसान ज्ञानकोश (Cached Field Guides)",
        equipHeadTitle: "साझा कृषि यंत्र एवं ड्रोन सेवा (Shared Farm Machinery)",
        equipHeadSub: "गांव के सत्यापित किसानों से ट्रैक्टर, रोटावेटर, थ्रेशर और ड्रोन किराए पर लें।",
        btnListMachinery: "+ अपना यंत्र जोड़ें",
        emAlertTitle: "तत्काल ग्रामीण आपातकालीन सेवाएं (Emergency Village Helpline)",
        emAlertSub: "सांप काटने की दवा (Anti-Venom), एम्बुलेंस, पशु चिकित्सक एवं फसल बीमा सहायता",
        emVenomTitle: "सर्पदंश एंटी-वेनम केंद्र (Anti-Venom Stockists)",
        emVetTitle: "राजकीय पशु चिकित्सालय (Veterinary Doctors)",
        emKvkTitle: "कृषि विज्ञान केंद्र व मृदा परीक्षण (KVK Center)",
        emCivicTitle: "ग्राम पंचायत व पटवारी हेल्पलाइन (Civic Portal)"
      },
      en: {
        brandTitle: "GraminSeva",
        brandTagline: "KisanMitra & Rural Digital Logistics Hub",
        badgeOnline: "Live Mandi Sync",
        btnSunLabel: "Sun Mode",
        btnMicLabel: "Ask with Voice",
        navMandi: "Mandi Rates",
        navDoctor: "AI Crop Doctor",
        navEquipment: "Equipment Share",
        navEmergency: "Emergency & Health",
        mandiHeadTitle: "APMC Mandi Tracker & Net Profit Calculator",
        mandiHeadSub: "Compare prices across regional mandis and calculate true earnings after transport costs.",
        btnReadMandi: "Read Rates Aloud",
        labelChooseCrop: "Select Crop:",
        calcTitle: "Net Profit & Transport Freight Calculator",
        calcSub: "Subtract mileage and carrier haulage to compute net realization per quintal.",
        lblCalcCrop: "Crop & Benchmark Rate",
        lblCalcQty: "Yield Quantity (Quintals)",
        lblCalcDist: "Mandi Distance (km)",
        lblCalcFreight: "Transport Rate (₹/km)",
        lblTotalSale: "Gross Mandi Realization:",
        lblTotalTransport: "Haulage Freight Cost:",
        lblNetProfit: "Net Cash-in-Hand:",
                headingMandiCards: "Nearby APMC Market Yards & Arrivals",
        mandiUpdatedTime: "Updated Today (2 hrs ago)",
        lblModalPrice: "Modal Price:",
        lblPerQuintal: "/quintal",
        lblMin: "Min:",
        lblMax: "Max:",
        lblTotalArrival: "Today's Total Arrival:",
        lblTons: "Tons",
        lblBales: "Bales",
        lblKmAway: "km away",
        lblMandiStatus: "Mandi Status:",
        btnCalcProfit: "Calculate Profit at this Mandi",
        lblNetPerQuintal: "net per quintal",

        doctorHeadTitle: "AI Plant Doctor & Pest Advisory (Gemma Powered)",
        doctorHeadSub: "Upload crop photo or pick symptoms for ICAR dosage, bio-extracts, and spray weather suitability.",
        btnReadDoc: "Listen to Advice",
        lblLeafPhoto: "Upload Crop / Pest Photo (Photo Diagnosis)",
        btnUploadText: "Take camera photo or pick file",
        lblQuickSymptoms: "Or Select Known Symptom / Pest:",
        lblCustomQuery: "Type or speak custom symptom query:",
        lblSymptomHead: "Diagnosis & Visible Symptoms:",
        lblIcarRemedy: "ICAR Certified Formulation",
        lblBioRemedy: "Organic & Native Bio-Remedy",
        lblWeatherGuard: "Spray Weather Safety Window",
        lblOfflineLibrary: "Offline Cached Field Reference Guides",
        equipHeadTitle: "Custom Hiring Center & Drone Sharing",
        equipHeadSub: "Rent tractors, rotavators, spray drones, and solar pumps peer-to-peer at standardized rates.",
        btnListMachinery: "+ List Your Equipment",
        emAlertTitle: "Hyperlocal Rural Emergency Logistics",
        emAlertSub: "Immediate access to Anti-Venom vials, 108 ambulances, veterinary surgeons, and KVKs.",
        emVenomTitle: "Snakebite Anti-Venom Stockists",
        emVetTitle: "Government Veterinary Clinics (Pashu Chikitsa)",
        emKvkTitle: "Krishi Vigyan Kendra & Soil Testing",
        emCivicTitle: "Gram Panchayat & Land Registry Helpdesk"
      },
      pa: {
        brandTitle: "GraminSeva",
        brandTagline: "ਕਿਸਾਨ ਮਿੱਤਰ ਅਤੇ ਪੇਂਡੂ ਡਿਜੀਟਲ ਸੇਵਾ",
        badgeOnline: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
        btnSunLabel: "ਧੁੱਪ ਮੋਡ",
        btnMicLabel: "ਬੋਲ ਕੇ ਪੁੱਛੋ",
        navMandi: "ਮੰਡੀ ਦੇ ਭਾਅ",
        navDoctor: "AI ਫਸਲ ਡਾਕਟਰ",
        navEquipment: "ਮਸ਼ੀਨਰੀ ਕਿਰਾਇਆ",
        navEmergency: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
        mandiHeadTitle: "ਖੇਤੀ ਮੰਡੀ ਭਾਅ ਅਤੇ ਅਸਲ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ",
        mandiHeadSub: "ਵੱਖ-ਵੱਖ ਮੰਡੀਆਂ ਦੀ ਤੁਲਨਾ ਕਰੋ ਅਤੇ ਟਰਾਂਸਪੋਰਟ ਖਰਚ ਕੱਢ ਕੇ ਆਪਣਾ ਅਸਲ ਮੁਨਾਫਾ ਜਾਣੋ।",
        btnReadMandi: "ਭਾਅ ਸੁਣੋ",
        labelChooseCrop: "ਫਸਲ ਚੁਣੋ:",
        calcTitle: "ਟਰਾਂਸਪੋਰਟ ਅਤੇ ਸ਼ੁੱਧ ਆਮਦਨ ਕੈਲਕੁਲੇਟਰ",
        calcSub: "ਮੰਡੀ ਦੀ ਦੂਰੀ ਅਤੇ ਕਿਰਾਇਆ ਕੱਢ ਕੇ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਸ਼ੁੱਧ ਬਚਤ ਜਾਣੋ",
        lblCalcCrop: "ਫਸਲ ਅਤੇ ਭਾਅ",
        lblCalcQty: "ਮਾਤਰਾ (ਕੁਇੰਟਲ)",
        lblCalcDist: "ਦੂਰੀ (ਕਿਲੋਮੀਟਰ)",
        lblCalcFreight: "ਕਿਰਾਇਆ ਦਰ (₹/ਕਿ.ਮੀ.)",
        lblTotalSale: "ਕੁੱਲ ਵਿਕਰੀ ਮੁੱਲ:",
        lblTotalTransport: "ਟਰਾਂਸਪੋਰਟ ਖਰਚਾ:",
        lblNetProfit: "ਸ਼ੁੱਧ ਬਚਤ (ਹੱਥ ਵਿੱਚ ਰਕਮ):",
                headingMandiCards: "ਨੇੜਲੀਆਂ ਏਪੀਐਮਸੀ ਮੰਡੀਆਂ ਅਤੇ ਆਮਦ",
        mandiUpdatedTime: "ਅੱਜ ਦਾ ਅਪਡੇਟ (2 ਘੰਟੇ ਪਹਿਲਾਂ)",
        lblModalPrice: "ਮਾਡਲ ਭਾਅ (Modal Price):",
        lblPerQuintal: "/ਕੁਇੰਟਲ",
        lblMin: "ਘੱਟੋ-ਘੱਟ:",
        lblMax: "ਵੱਧ ਤੋਂ ਵੱਧ:",
        lblTotalArrival: "ਅੱਜ ਦੀ ਕੁੱਲ ਆਮਦ:",
        lblTons: "ਟਨ",
        lblBales: "ਗੰਢਾਂ",
        lblKmAway: "ਕਿ.ਮੀ. ਦੂਰ",
        lblMandiStatus: "ਮੰਡੀ ਸਥਿਤੀ:",
        btnCalcProfit: "ਇਸ ਮੰਡੀ 'ਤੇ ਮੁਨਾਫਾ ਜੋੜੋ",
        lblNetPerQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਸ਼ੁੱਧ",

        doctorHeadTitle: "ਫਸਲ ਰੋਗ ਜਾਂਚ ਅਤੇ ਦੇਸੀ ਇਲਾਜ",
        doctorHeadSub: "ਪੱਤੇ ਦੀ ਫੋਟੋ ਲਗਾਓ ਜਾਂ ਲੱਛਣ ਚੁਣੋ। ਸਹੀ ਦਵਾਈ ਅਤੇ ਨਿੰਮ ਦੇ ਘੋਲ ਦੀ ਜਾਣਕਾਰੀ ਪਾਓ।",
        btnReadDoc: "ਸਲਾਹ ਸੁਣੋ",
        lblLeafPhoto: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
        btnUploadText: "ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਗੈਲਰੀ ਚੁਣੋ",
        lblQuickSymptoms: "ਜਾਂ ਰੋਗ ਦੇ ਲੱਛਣ ਚੁਣੋ:",
        lblCustomQuery: "ਹੋਰ ਸਵਾਲ ਲਿਖੋ ਜਾਂ ਬੋਲੋ:",
        lblSymptomHead: "ਪਛਾਣ ਅਤੇ ਲੱਛਣ:",
        lblIcarRemedy: "ਸਰਕਾਰੀ ਪ੍ਰਮਾਣਿਤ ਦਵਾਈ",
        lblBioRemedy: "ਦੇਸੀ ਅਤੇ ਜੈਵਿਕ ਘੋਲ",
        lblWeatherGuard: "ਮੌਸਮ ਚਿਤਾਵਨੀ",
        lblOfflineLibrary: "ਆਫਲਾਈਨ ਗਿਆਨ ਕੋਸ਼",
        equipHeadTitle: "ਸਾਂਝੀ ਖੇਤੀ ਮਸ਼ੀਨਰੀ ਅਤੇ ਡਰੋਨ ਸੇਵਾ",
        equipHeadSub: "ਟਰੈਕਟਰ, ਰੋਟਾਵੇਟਰ ਅਤੇ ਡਰੋਨ ਕਿਰਾਏ 'ਤੇ ਲਵੋ ਜਾਂ ਆਪਣਾ ਸੰਦ ਸਾਂਝਾ ਕਰੋ।",
        btnListMachinery: "+ ਆਪਣਾ ਸੰਦ ਸ਼ਾਮਲ ਕਰੋ",
        emAlertTitle: "ਤੁਰੰਤ ਪੇਂਡੂ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
        emAlertSub: "ਸੱਪ ਦੇ ਡੰਗਣ ਦਾ ਟੀਕਾ, ਐਂਬੂਲੈਂਸ ਅਤੇ ਪਸ਼ੂ ਡਾਕਟਰ ਸੰਪਰਕ",
        emVenomTitle: "ਐਂਟੀ-ਵੈਨਮ ਸੈਂਟਰ (ਸੱਪ ਕੱਟਣ ਦਾ ਇਲਾਜ)",
        emVetTitle: "ਸਰਕਾਰੀ ਪਸ਼ੂ ਹਸਪਤਾਲ",
        emKvkTitle: "ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ",
        emCivicTitle: "ਪੰਚਾਇਤ ਅਤੇ ਮਾਲ ਵਿਭਾਗ"
      },
      mr: {
        brandTitle: "GraminSeva",
        brandTagline: "शेतकरी मित्र आणि ग्रामीण डिजिटल सेवा",
        badgeOnline: "थेट बाजार भाव",
        btnSunLabel: "उष्णता मोड",
        btnMicLabel: "बोलून विचारा",
        navMandi: "बाजार भाव",
        navDoctor: "AI पीक डॉक्टर",
        navEquipment: "अवजारे भाडेतत्त्व",
        navEmergency: "आपत्कालीन सेवा",
        mandiHeadTitle: "कृषी उत्पन्न बाजार भाव व निव्वळ नफा गणक",
        mandiHeadSub: "विविध बाजारांची तुलना करा आणि वाहतूक खर्च वजा करून निव्वळ नफा जाणा.",
        btnReadMandi: "भाव ऐका",
        labelChooseCrop: "पीक निवडा:",
        calcTitle: "वाहतूक भाडे आणि निव्वळ परतावा कॅल्क्युलेटर",
        calcSub: "मंडी अंतर आणि भाडे वजा करून प्रति क्विंटल निव्वळ शिल्लक रक्कम काढा",
        lblCalcCrop: "पीक आणि सरासरी भाव",
        lblCalcQty: "उत्पादन (क्विंटल)",
        lblCalcDist: "अंतर (किमी)",
        lblCalcFreight: "वाहतूक दर (₹/किमी)",
        lblTotalSale: "एकूण विक्री मूल्य:",
        lblTotalTransport: "एकूण वाहतूक खर्च:",
        lblNetProfit: "निव्वळ हातात उरणारी रक्कम:",
                headingMandiCards: "जवळपासच्या कृषी उत्पन्न बाजार समित्या (APMC)",
        mandiUpdatedTime: "आजचे अपडेट (२ तासांपूर्वी)",
        lblModalPrice: "सरासरी भाव (Modal Price):",
        lblPerQuintal: "/क्विंटल",
        lblMin: "किमान:",
        lblMax: "कमाल:",
        lblTotalArrival: "आजची एकूण आवक:",
        lblTons: "टन",
        lblBales: "गाठी",
        lblKmAway: "किमी लांब",
        lblMandiStatus: "बाजार स्थिती:",
        btnCalcProfit: "या बाजारानुसार नफा काढा",
        lblNetPerQuintal: "प्रति क्विंटल निव्वळ",

        doctorHeadTitle: "पीक रोग निदान आणि जैविक उपाय",
        doctorHeadSub: "पानाचा फोटो काढा किंवा लक्षणे निवडा. योग्य औषध फवारणी व दशपर्णी अर्क माहिती मिळवा.",
        btnReadDoc: "सल्ला ऐका",
        lblLeafPhoto: "पानाचा फोटो अपलोड करा",
        btnUploadText: "कॅमेरा किंवा गॅलरीतून फोटो घ्या",
        lblQuickSymptoms: "किंवा रोग लक्षणे निवडा:",
        lblCustomQuery: "इतर समस्या विचारा:",
        lblSymptomHead: "ओळख आणि लक्षणे:",
        lblIcarRemedy: "प्रमाणित रासायनिक फवारणी",
        lblBioRemedy: "गावरान व जैविक उपाय",
        lblWeatherGuard: "हवामान फवारणी इशारा",
        lblOfflineLibrary: "ऑफलाइन शेती माहिती संच",
        equipHeadTitle: "सामायिक कृषी यंत्रे व ड्रोन सेवा",
        equipHeadSub: "ट्रॅक्टर, रोटाव्हेटर, हार्वेस्टर आणि ड्रोन भाड्याने मिळवा किंवा आपले यंत्र नोंदवा.",
        btnListMachinery: "+ आपले यंत्र जोडा",
        emAlertTitle: "तातडीच्या ग्रामीण आपत्कालीन सेवा",
        emAlertSub: "सर्पदंश लस, रुग्णवाहिका आणि पशु वैद्यकीय सेवा",
        emVenomTitle: "सर्पदंश अँटी-व्हेनम केंद्र",
        emVetTitle: "शासकीय पशुवैद्यकीय दवाखाना",
        emKvkTitle: "कृषी विज्ञान केंद्र (KVK)",
        emCivicTitle: "ग्रामपंचायत व तलाठी कक्ष"
      },
      te: {
        brandTitle: "GraminSeva",
        brandTagline: "రైతు మిత్ర మరియు గ్రామీణ డిజిటల్ కేంద్రం",
        badgeOnline: "లైవ్ మార్కెట్ ధరలు",
        btnSunLabel: "ఎండ మోడ్",
        btnMicLabel: "మాట్లాడి అడగండి",
        navMandi: "మార్కెట్ ధరలు",
        navDoctor: "AI పంట డాక్టర్",
        navEquipment: "యంత్రాల అద్దె",
        navEmergency: "అత్యవసర సేవలు",
        mandiHeadTitle: "వ్యవసాయ మార్కెట్ ధరలు & నికర లాభ కాలిక్యులేటర్",
        mandiHeadSub: "వివిధ మార్కెట్ల ధరలను పోల్చి రవాణా ఖర్చులు పోను అసలైన నికర లాభాన్ని తెలుసుకోండి.",
        btnReadMandi: "ధరలు వినండి",
        labelChooseCrop: "పంటను ఎంచుకోండి:",
        calcTitle: "రవాణా ఖర్చు & నికర లాభ గణన",
        calcSub: "మార్కెట్ దూరం మరియు రవాణా ఖర్చులు తీసివేసి క్వింటాల్ నికర ఆదాయాన్ని లెక్కించండి",
        lblCalcCrop: "పంట & మార్కెట్ ధర",
        lblCalcQty: "దిగుబడి (క్వింటాళ్ళు)",
        lblCalcDist: "మార్కెట్ దూరం (కిమీ)",
        lblCalcFreight: "వాహనం చార్జ్ (₹/కిమీ)",
        lblTotalSale: "మొత్తం అమ్మకం విలువ:",
        lblTotalTransport: "రవాణా ఖర్చు:",
        lblNetProfit: "నికరంగా మిగిలే మొత్తం:",
                headingMandiCards: "సమీప వ్యవసాయ మార్కెట్లు & రాకలు (Nearby APMC)",
        mandiUpdatedTime: "ఈరోజు అప్‌డేట్ (2 గంటల క్రితం)",
        lblModalPrice: "మోడల్ ధర (Modal Price):",
        lblPerQuintal: "/క్వింటాల్",
        lblMin: "కనిష్ట:",
        lblMax: "గరిష్ట:",
        lblTotalArrival: "ఈరోజు మొత్తం రాక:",
        lblTons: "టన్నులు",
        lblBales: "బేళ్లు",
        lblKmAway: "కి.మీ. దూరం",
        lblMandiStatus: "మార్కెట్ స్థితి:",
        btnCalcProfit: "ఈ మార్కెట్‌లో లాభాన్ని లెక్కించండి",
        lblNetPerQuintal: "క్వింటాలుకు నికర ఆదాయం",

        doctorHeadTitle: "పంట తెగుళ్ల గుర్తింపు & సేంద్రీయ నివారణ",
        doctorHeadSub: "ఆకు ఫోటో తీయండి లేదా లక్షణాలు ఎంచుకోండి. సరైన మందుల మోతాదు మరియు కషాయాల సమాచారం పొందండి.",
        btnReadDoc: "సలహా వినండి",
        lblLeafPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
        btnUploadText: "కెమెరా ఫోటో లేదా గ్యాలరీ ఎంచుకోండి",
        lblQuickSymptoms: "లేదా తెగులు లక్షణాన్ని ఎంచుకోండి:",
        lblCustomQuery: "సమస్యను టైప్ చేయండి లేదా మాట్లాడండి:",
        lblSymptomHead: "గుర్తింపు మరియు లక్షణాలు:",
        lblIcarRemedy: "సిఫార్సు చేసిన మందులు",
        lblBioRemedy: "సేంద్రీయ & వేప కషాయం",
        lblWeatherGuard: "వాతావరణ పిచికారీ హెచ్చరిక",
        lblOfflineLibrary: "ఆఫ్‌లైన్ వ్యవసాయ సమాచారం",
        equipHeadTitle: "ఉమ్మడి వ్యవసాయ యంత్రాలు & డ్రోన్ సేవలు",
        equipHeadSub: "ట్రాక్టర్లు, డ్రోన్లు, హార్వెస్టర్లు తక్కువ అద్దెకు పొందండి లేదా మీ యంత్రాన్ని చేర్చండి.",
        btnListMachinery: "+ యంత్రాన్ని చేర్చండి",
        emAlertTitle: "తక్షణ గ్రామీణ అత్యవసర సేవలు",
        emAlertSub: "పాముకాటు మందులు (యాంటీ-వీనమ్), అంబులెన్స్ మరియు పశువైద్య సహాయం",
        emVenomTitle: "యాంటీ-వీనమ్ కేంద్రాలు (పాముకాటు ఔషధం)",
        emVetTitle: "ప్రభుత్వ పశువైద్యశాల",
        emKvkTitle: "వ్యవసాయ విజ్ఞాన కేంద్రం (KVK)",
        emCivicTitle: "గ్రామ పంచాయతీ కార్యాలయం"
      }
    };

    // -------------------------------------------------------------
    // 2. MANDI DATA & DYNAMIC CROPS
    // -------------------------------------------------------------
        const CROPS_DATA = [
      { id: 'wheat', name: { hi: 'गेहूं (Wheat)', en: 'Wheat', pa: 'ਕਣਕ (Wheat)', mr: 'गहू (Wheat)', te: 'గోధుమ (Wheat)' }, nameHi: 'गेहूं (Wheat)', nameEn: 'Wheat', benchmarkRate: 2420, unit: 'क्विंटल' },
      { id: 'onion', name: { hi: 'प्याज (Onion)', en: 'Onion', pa: 'ਪਿਆਜ਼ (Onion)', mr: 'कांदा (Onion)', te: 'ఉల్లిపాయ (Onion)' }, nameHi: 'प्याज (Onion)', nameEn: 'Onion', benchmarkRate: 1850, unit: 'क्विंटल' },
      { id: 'cotton', name: { hi: 'कपास (Cotton)', en: 'Cotton', pa: 'ਕਪਾਹ (Cotton)', mr: 'कापूस (Cotton)', te: 'పత్తి (Cotton)' }, nameHi: 'कपास (Cotton)', nameEn: 'Cotton', benchmarkRate: 7120, unit: 'क्विंटल' },
      { id: 'paddy', name: { hi: 'धान (Paddy/Basmati)', en: 'Paddy / Basmati', pa: 'ਝੋਨਾ (Paddy)', mr: 'भात (Paddy)', te: 'వరి (Paddy)' }, nameHi: 'धान (Paddy/Basmati)', nameEn: 'Paddy', benchmarkRate: 3100, unit: 'क्विंटल' },
      { id: 'mustard', name: { hi: 'सरसों (Mustard)', en: 'Mustard', pa: 'ਸਰ੍ਹੋਂ (Mustard)', mr: 'मोहरी (Mustard)', te: 'ఆవాలు (Mustard)' }, nameHi: 'सरसों (Mustard)', nameEn: 'Mustard', benchmarkRate: 5400, unit: 'क्विंटल' },
      { id: 'potato', name: { hi: 'आलू (Potato)', en: 'Potato', pa: 'ਆਲੂ (Potato)', mr: 'बटाटा (Potato)', te: 'బంగాళాదుంప (Potato)' }, nameHi: 'आलू (Potato)', nameEn: 'Potato', benchmarkRate: 1250, unit: 'क्विंटल' },
      { id: 'soybean', name: { hi: 'सोयाबीन (Soybean)', en: 'Soybean', pa: 'ਸੋਇਆਬੀਨ (Soybean)', mr: 'सोयाबीन (Soybean)', te: 'సోయాబీన్ (Soybean)' }, nameHi: 'सोयाबीन (Soybean)', nameEn: 'Soybean', benchmarkRate: 4680, unit: 'क्विंटल' },
    ];

        const MANDIS_DATA = [
      {
        id: 'm1',
        name: {
          hi: 'मेरठ मुख्य मंडी (Meerut APMC)',
          en: 'Meerut APMC Market Yard',
          pa: 'ਮੇਰਠ ਮੁੱਖ ਮੰਡੀ (Meerut APMC)',
          mr: 'मेरठ मुख्य बाजार समिती (Meerut APMC)',
          te: 'మీరట్ ప్రధాన మార్కెట్ (Meerut APMC)'
        },
        distanceKm: 18,
        crop: 'wheat',
        cropName: {
          hi: 'गेहूं (Wheat शरबती)',
          en: 'Wheat (Sharbati Grade-A)',
          pa: 'ਕਣਕ (ਸ਼ਰਬਤੀ ਗ੍ਰੇਡ-ਏ)',
          mr: 'गहू (शरबती ग्रेड-ए)',
          te: 'గోధుమ (శర్బతి గ్రేడ్-ఎ)'
        },
        modalPrice: 2460,
        minPrice: 2380,
        maxPrice: 2520,
        arrivalQuantity: '420',
        arrivalUnit: 'tons',
        trend: 'up',
        trendLabel: {
          hi: '+₹40 बढ़त',
          en: '+₹40 rise',
          pa: '+₹40 ਵਾਧਾ',
          mr: '+₹40 वाढ',
          te: '+₹40 పెరుగుదల'
        },
        district: {
          hi: 'मेरठ, उत्तर प्रदेश',
          en: 'Meerut, Uttar Pradesh',
          pa: 'ਮੇਰਠ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
          mr: 'मेरठ, उत्तर प्रदेश',
          te: 'మీరట్, ఉత్తరప్రదేశ్'
        },
        status: {
          hi: 'नीलामी चालू (Active Auction)',
          en: 'Active Auction',
          pa: 'ਬੋਲੀ ਚਾਲੂ (Active Auction)',
          mr: 'लिलाव सुरू (Active Auction)',
          te: 'వేలం నడుస్తోంది (Active Auction)'
        }
      },
      {
        id: 'm2',
        name: {
          hi: 'हापुड़ गल्ला मंडी (Hapur APMC)',
          en: 'Hapur Grain Market (Hapur APMC)',
          pa: 'ਹਾਪੁੜ ਦਾਣਾ ਮੰਡੀ (Hapur APMC)',
          mr: 'हापूड धान्य बाजार (Hapur APMC)',
          te: 'హాపూర్ ధాన్యపు మార్కెట్ (Hapur APMC)'
        },
        distanceKm: 34,
        crop: 'wheat',
        cropName: {
          hi: 'गेहूं (Wheat देशी 148)',
          en: 'Wheat (Native Desi 148)',
          pa: 'ਕਣਕ (ਦੇਸੀ 148)',
          mr: 'गहू (गावरान देशी 148)',
          te: 'గోధుమ (దేశీ 148)'
        },
        modalPrice: 2490,
        minPrice: 2410,
        maxPrice: 2560,
        arrivalQuantity: '580',
        arrivalUnit: 'tons',
        trend: 'up',
        trendLabel: {
          hi: '+₹65 उछाल',
          en: '+₹65 surge',
          pa: '+₹65 ਉਛਾਲ',
          mr: '+₹65 उसळी',
          te: '+₹65 భారీ పెరుగుదల'
        },
        district: {
          hi: 'हापुड़, उत्तर प्रदेश',
          en: 'Hapur, Uttar Pradesh',
          pa: 'ਹਾਪੁੜ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
          mr: 'हापूड, उत्तर प्रदेश',
          te: 'హాపూర్, ఉత్తరప్రదేశ్'
        },
        status: {
          hi: 'उच्च मांग (High Demand)',
          en: 'High Demand',
          pa: 'ਭਾਰੀ ਮੰਗ (High Demand)',
          mr: 'जास्त मागणी (High Demand)',
          te: 'అధిక డిమాండ్ (High Demand)'
        }
      },
      {
        id: 'm3',
        name: {
          hi: 'मुरादनगर उप-मंडी (Muradnagar Yard)',
          en: 'Muradnagar Sub-Yard (Muradnagar Yard)',
          pa: 'ਮੁਰਾਦਨਗਰ ਸਬ-ਯਾਰਡ (Muradnagar Yard)',
          mr: 'मुरादनगर उप-बाजार (Muradnagar Yard)',
          te: 'మురాద్‌నగర్ సబ్-యార్డ్ (Muradnagar Yard)'
        },
        distanceKm: 12,
        crop: 'wheat',
        cropName: {
          hi: 'गेहूं (Wheat मिल क्वालिटी)',
          en: 'Wheat (Mill Quality)',
          pa: 'ਕਣਕ (ਮਿੱਲ ਕੁਆਲਿਟੀ)',
          mr: 'गहू (मिल क्वालिटी)',
          te: 'గోధుమ (మిల్లు క్వాలిటీ)'
        },
        modalPrice: 2390,
        minPrice: 2320,
        maxPrice: 2420,
        arrivalQuantity: '190',
        arrivalUnit: 'tons',
        trend: 'stable',
        trendLabel: {
          hi: 'स्थिर भाव',
          en: 'Stable',
          pa: 'ਸਥਿਰ ਭਾਅ',
          mr: 'स्थिर भाव',
          te: 'స్థిరమైన ధర'
        },
        district: {
          hi: 'गाजियाबाद, उत्तर प्रदेश',
          en: 'Ghaziabad, Uttar Pradesh',
          pa: 'ਗਾਜ਼ੀਆਬਾਦ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
          mr: 'गाझियाबाद, उत्तर प्रदेश',
          te: 'ఘజియాబాద్, ఉత్తరప్రదేశ్'
        },
        status: {
          hi: 'सामान्य आवक (Normal Arrival)',
          en: 'Normal Arrival',
          pa: 'ਸਧਾਰਨ ਆਮਦ (Normal Arrival)',
          mr: 'साधारण आवक (Normal Arrival)',
          te: 'సాధారణ రాక (Normal Arrival)'
        }
      },
      {
        id: 'm4',
        name: {
          hi: 'आज़ादपुर फल व सब्जी मंडी',
          en: 'Azadpur Fruit & Vegetable Mandi',
          pa: 'ਆਜ਼ਾਦਪੁਰ ਫਲ ਅਤੇ ਸਬਜ਼ੀ ਮੰਡੀ',
          mr: 'आझादपूर फळे व भाजीपाला बाजार',
          te: 'ఆజాద్‌పూర్ పండ్లు & కూరగాయల మార్కెట్'
        },
        distanceKm: 48,
        crop: 'onion',
        cropName: {
          hi: 'लाल प्याज (Red Onion Grade-A)',
          en: 'Red Onion (Grade-A)',
          pa: 'ਲਾਲ ਪਿਆਜ਼ (ਗ੍ਰੇਡ-ਏ)',
          mr: 'लाल कांदा (ग्रेड-ए)',
          te: 'ఎర్ర ఉల్లిపాయ (గ్రేడ్-ఎ)'
        },
        modalPrice: 1980,
        minPrice: 1650,
        maxPrice: 2150,
        arrivalQuantity: '1,200',
        arrivalUnit: 'tons',
        trend: 'down',
        trendLabel: {
          hi: '-₹50 मंदी',
          en: '-₹50 drop',
          pa: '-₹50 ਗਿਰਾਵਟ',
          mr: '-₹50 घसरण',
          te: '-₹50 తగ్గుదల'
        },
        district: {
          hi: 'नई दिल्ली',
          en: 'New Delhi',
          pa: 'ਨਵੀਂ ਦਿੱਲੀ',
          mr: 'नवी दिल्ली',
          te: 'న్యూఢిల్లీ'
        },
        status: {
          hi: 'बड़ी आवक (Heavy Inflow)',
          en: 'Heavy Inflow',
          pa: 'ਵੱਡੀ ਆਮਦ (Heavy Inflow)',
          mr: 'मोठी आवक (Heavy Inflow)',
          te: 'భారీ రాక (Heavy Inflow)'
        }
      },
      {
        id: 'm5',
        name: {
          hi: 'साहिबाबाद सब्जी मंडी',
          en: 'Sahibabad Vegetable Mandi',
          pa: 'ਸਾਹਿਬਾਬਾਦ ਸਬਜ਼ੀ ਮੰਡੀ',
          mr: 'साहिबाबाद भाजीपाला बाजार',
          te: 'సాహిబాబాద్ కూరగాయల మార్కెట్'
        },
        distanceKm: 26,
        crop: 'onion',
        cropName: {
          hi: 'मध्यम प्याज (Medium Onion)',
          en: 'Medium Onion (Grade-B)',
          pa: 'ਦਰਮਿਆਨਾ ਪਿਆਜ਼ (ਗ੍ਰੇਡ-ਬੀ)',
          mr: 'मध्यम कांदा (ग्रेड-बी)',
          te: 'మధ్యస్థ ఉల్లిపాయ (గ్రేడ్-బి)'
        },
        modalPrice: 1840,
        minPrice: 1550,
        maxPrice: 1950,
        arrivalQuantity: '350',
        arrivalUnit: 'tons',
        trend: 'stable',
        trendLabel: {
          hi: 'स्थिर भाव',
          en: 'Stable',
          pa: 'ਸਥਿਰ',
          mr: 'स्थिर',
          te: 'స్థిరమైన'
        },
        district: {
          hi: 'गाजियाबाद, उत्तर प्रदेश',
          en: 'Ghaziabad, Uttar Pradesh',
          pa: 'ਗਾਜ਼ੀਆਬਾਦ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
          mr: 'गाझियाबाद, उत्तर प्रदेश',
          te: 'ఘజియాబాద్, ఉత్తరప్రదేశ్'
        },
        status: {
          hi: 'सामान्य आवक (Normal Arrival)',
          en: 'Normal Arrival',
          pa: 'ਸਧਾਰਨ ਆਮਦ',
          mr: 'साधारण आवक',
          te: 'సాధారణ రాక'
        }
      },
      {
        id: 'm6',
        name: {
          hi: 'सिरसा कॉटन मंडी (Sirsa APMC)',
          en: 'Sirsa Cotton Market (Sirsa APMC)',
          pa: 'ਸਿਰਸਾ ਕਪਾਹ ਮੰਡੀ (Sirsa APMC)',
          mr: 'सिरसा कापूस बाजार (Sirsa APMC)',
          te: 'సిర్సా పత్తి మార్కెట్ (Sirsa APMC)'
        },
        distanceKm: 180,
        crop: 'cotton',
        cropName: {
          hi: 'नरमा कपास (Medium Staple)',
          en: 'Narma Cotton (Medium Staple)',
          pa: 'ਨਰਮਾ ਕਪਾਹ (ਮੀਡੀਅਮ ਸਟੈਪਲ)',
          mr: 'नरमा कापूस (मध्यम स्टेपल)',
          te: 'నర్మా పత్తి (మీడియం స్టేపుల్)'
        },
        modalPrice: 7280,
        minPrice: 6900,
        maxPrice: 7450,
        arrivalQuantity: '940',
        arrivalUnit: 'bales',
        trend: 'up',
        trendLabel: {
          hi: '+₹110 उछाल',
          en: '+₹110 surge',
          pa: '+₹110 ਉਛਾਲ',
          mr: '+₹110 उसळी',
          te: '+₹110 భారీ పెరుగుదల'
        },
        district: {
          hi: 'सिरसा, हरियाणा',
          en: 'Sirsa, Haryana',
          pa: 'ਸਿਰਸਾ, ਹਰਿਆਣਾ',
          mr: 'सिरसा, हरियाणा',
          te: 'సిర్సా, హర్యానా'
        },
        status: {
          hi: 'CCI खरीद चालू (CCI Active Buying)',
          en: 'CCI Active Buying',
          pa: 'CCI ਖਰੀਦ ਚਾਲੂ',
          mr: 'CCI खरेदी सुरू',
          te: 'CCI కొనుగోలు చురుగ్గా'
        }
      },
      {
        id: 'm7',
        name: {
          hi: 'भरतपुर तेलहन मंडी',
          en: 'Bharatpur Oilseed Mandi',
          pa: 'ਭਰਤਪੁਰ ਤੇਲ ਬੀਜ ਮੰਡੀ',
          mr: 'भरतपुर गळीतधान्य बाजार',
          te: 'భరత్‌పూర్ నూనెగింజల మార్కెట్'
        },
        distanceKm: 110,
        crop: 'mustard',
        cropName: {
          hi: 'काली सरसों (42% तेल)',
          en: 'Black Mustard (42% Oil Content)',
          pa: 'ਕਾਲੀ ਸਰ੍ਹੋਂ (42% ਤੇਲ)',
          mr: 'काळी मोहरी (४२% तेल)',
          te: 'నల్ల ఆవాలు (42% నూనె)'
        },
        modalPrice: 5650,
        minPrice: 5350,
        maxPrice: 5780,
        arrivalQuantity: '610',
        arrivalUnit: 'tons',
        trend: 'up',
        trendLabel: {
          hi: '+₹80 बढ़त',
          en: '+₹80 rise',
          pa: '+₹80 ਵਾਧਾ',
          mr: '+₹80 वाढ',
          te: '+₹80 పెరుగుదల'
        },
        district: {
          hi: 'भरतपुर, राजस्थान',
          en: 'Bharatpur, Rajasthan',
          pa: 'ਭਰਤਪੁਰ, ਰਾਜਸਥਾਨ',
          mr: 'भरतपुर, राजस्थान',
          te: 'భరత్‌పూర్, రాజస్థాన్'
        },
        status: {
          hi: 'मजबूत लिवाली (Strong Buying)',
          en: 'Strong Buying',
          pa: 'ਮਜ਼ਬੂਤ ਖਰੀਦ',
          mr: 'मजबूत मागणी',
          te: 'బలమైన కొనుగోలు'
        }
      },
      {
        id: 'm8',
        name: {
          hi: 'आगरा आलू मंडी (Khandauli)',
          en: 'Agra Potato Mandi (Khandauli)',
          pa: 'ਆਗਰਾ ਆਲੂ ਮੰਡੀ (ਖੰਡੌਲੀ)',
          mr: 'आग्रा बटाटा बाजार (खंडौली)',
          te: 'ఆగ్రా బంగాళాదుంప మార్కెట్ (ఖండౌలి)'
        },
        distanceKm: 130,
        crop: 'potato',
        cropName: {
          hi: 'पुखराज / चिप्सोना आलू',
          en: 'Pukhraj / Chipsona Potato',
          pa: 'ਪੁਖਰਾਜ / ਚਿਪਸੋਨਾ ਆਲੂ',
          mr: 'पुखराज / चिप्सोना बटाटा',
          te: 'పుఖరాజ్ / చిప్సోనా ఆలు'
        },
        modalPrice: 1320,
        minPrice: 1100,
        maxPrice: 1410,
        arrivalQuantity: '1,450',
        arrivalUnit: 'tons',
        trend: 'stable',
        trendLabel: {
          hi: 'स्थिर भाव',
          en: 'Stable',
          pa: 'ਸਥਿਰ',
          mr: 'स्थिर',
          te: 'స్థిరమైన'
        },
        district: {
          hi: 'आगरा, उत्तर प्रदेश',
          en: 'Agra, Uttar Pradesh',
          pa: 'ਆਗਰਾ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
          mr: 'आग्रा, उत्तर प्रदेश',
          te: 'ఆగ్రా, ఉత్తరప్రదేశ్'
        },
        status: {
          hi: 'कोल्ड स्टोर आवक (Cold Storage Inflow)',
          en: 'Cold Storage Inflow',
          pa: 'ਕੋਲਡ ਸਟੋਰ ਆਮਦ',
          mr: 'कोल्ड स्टोरेज आवक',
          te: 'కోల్డ్ స్టోరేజ్ రాక'
        }
      },
      {
        id: 'm9',
        name: {
          hi: 'करनाल अनाज मंडी (Karnal)',
          en: 'Karnal Grain Mandi (Karnal APMC)',
          pa: 'ਕਰਨਾਲ ਅਨਾਜ ਮੰਡੀ (Karnal)',
          mr: 'कर्नाल धान्य बाजार (Karnal)',
          te: 'కర్నాల్ ధాన్యపు మార్కెట్ (Karnal)'
        },
        distanceKm: 95,
        crop: 'paddy',
        cropName: {
          hi: 'बासमती 1121 (Paddy Basmati)',
          en: 'Paddy Basmati 1121',
          pa: 'ਬਾਸਮਤੀ ਝੋਨਾ 1121',
          mr: 'बासमती भात 1121',
          te: 'బాస్మతి వరి 1121'
        },
        modalPrice: 3850,
        minPrice: 3400,
        maxPrice: 4100,
        arrivalQuantity: '820',
        arrivalUnit: 'tons',
        trend: 'up',
        trendLabel: {
          hi: '+₹90 बढ़त',
          en: '+₹90 rise',
          pa: '+₹90 ਵਾਧਾ',
          mr: '+₹90 वाढ',
          te: '+₹90 పెరుగుదల'
        },
        district: {
          hi: 'करनाल, हरियाणा',
          en: 'Karnal, Haryana',
          pa: 'ਕਰਨਾਲ, ਹਰਿਆਣਾ',
          mr: 'कर्नाल, हरियाणा',
          te: 'కర్నాల్, హర్యానా'
        },
        status: {
          hi: 'एक्सपोर्टर मांग (Exporter Demand)',
          en: 'Exporter Demand',
          pa: 'ਨਿਰਯਾਤਕ ਮੰਗ',
          mr: 'निर्यातदार मागणी',
          te: 'ఎగుమతిదారుల డిమాండ్'
        }
      },
      {
        id: 'm10',
        name: {
          hi: 'कोटा तेलहन मंडी (Kota)',
          en: 'Kota Oilseed Mandi (Kota)',
          pa: 'ਕੋਟਾ ਤੇਲ ਬੀਜ ਮੰਡੀ (ਕੋਟਾ)',
          mr: 'कोटा गळीतधान्य बाजार (कोटा)',
          te: 'కోటా నూనెగింజల మార్కెట్ (కోటా)'
        },
        distanceKm: 240,
        crop: 'soybean',
        cropName: {
          hi: 'पीला सोयाबीन (Yellow Seed)',
          en: 'Yellow Soybean (Standard Seed)',
          pa: 'ਪੀਲਾ ਸੋਇਆਬੀਨ',
          mr: 'पिवळी सोयाबीन',
          te: 'పసుపు సోయాబీన్'
        },
        modalPrice: 4780,
        minPrice: 4500,
        maxPrice: 4920,
        arrivalQuantity: '730',
        arrivalUnit: 'tons',
        trend: 'down',
        trendLabel: {
          hi: '-₹40 नरमी',
          en: '-₹40 soft',
          pa: '-₹40 ਨਰਮੀ',
          mr: '-₹40 घसरण',
          te: '-₹40 తగ్గుదల'
        },
        district: {
          hi: 'कोटा, राजस्थान',
          en: 'Kota, Rajasthan',
          pa: 'ਕੋਟਾ, ਰਾਜਸਥਾਨ',
          mr: 'कोटा, राजस्थान',
          te: 'కోటా, రాజస్థాన్'
        },
        status: {
          hi: 'प्लांट खरीद (Plant Buying)',
          en: 'Plant Buying',
          pa: 'ਪਲਾਂਟ ਖਰੀਦ',
          mr: 'प्लांट खरेदी',
          te: 'ప్లాంట్ కొనుగోలు'
        }
      }
    ];

    // -------------------------------------------------------------
    // 3. AI AGRI-DOCTOR KNOWLEDGE BASE (GEMMA AGRI CORPUS)
    // -------------------------------------------------------------
    const DISEASES_DB = {
      rust: {
        id: 'rust',
        title: 'गेहूं का पीला रतुआ (Yellow Rust / Stripe Rust)',
        scientific: 'Puccinia striiformis f. sp. tritici',
        crop: 'गेहूं (Wheat)',
        urgency: 'अति-गंभीर (Immediate ICAR Intervention)',
        symptoms: 'पत्तियों की ऊपरी सतह पर कतारबद्ध चमकदार पीले दाने या धारियां। पत्तियों को छूने पर हाथों में पीले रंग का पाउडर/हल्दी जैसा चूर्ण लगना। फसल का प्रकाश संश्लेषण रुकना।',
        chemicalName: 'प्रोपिकोनाजोल 25% ईसी (Tilt 25 EC / Propiconazole)',
        chemicalDose: '200 मिलीलीटर दवा को 200 लीटर पानी में प्रति एकड़ स्प्रेयर द्वारा घोलकर छिड़कें। रोग दोबारा दिखने पर 12-15 दिन बाद दोबारा छिड़काव करें।',
        chemicalNote: 'रोग के प्रारंभिक लक्षण दिखते ही हवा शांत होने पर दोपहर में छिड़कें।',
        organicName: 'खट्टी छाछ तांबा काढ़ा + नीम तेल 10000 PPM',
        organicRecipe: '5 लीटर पुरानी खट्टी छाछ को तांबे के बर्तन में 4 दिन रखें। 150 लीटर पानी में 500 मिली नीम तेल मिलाकर प्रति एकड़ छिड़काव करें। कवक विरोधी प्रतिरोध विकसित होता है।',
        weatherSafe: 'अगले 36 घंटे बारिश नहीं है। हवा 10 किमी/घंटा है। छिड़काव के लिए आदर्श समय है।'
      },
      bollworm: {
        id: 'bollworm',
        title: 'गुलाबी सुंडी / अमेरिकन बॉलवर्म (Pink Bollworm)',
        scientific: 'Pectinophora gossypiella',
        crop: 'कपास (Cotton)',
        urgency: 'मध्यम से गंभीर (Monitoring Required)',
        symptoms: 'कपास के फूल रोसेट (गुलाब की पंखुड़ी जैसे मुड़े हुए) दिखना। डोडे (Bolls) में छोटा छिद्र और अंदर रेशों का सड़ा हुआ होना। कच्चा डोडा समय से पहले गिरना।',
        chemicalName: 'एमामेक्टिन बेंजोएट 5% एसजी (Emamectin Benzoate)',
        chemicalDose: '100 ग्राम प्रति 200 लीटर पानी प्रति एकड़ अथवा प्रोफेनोफॉस 50% ईसी 400 मिली प्रति एकड़।',
        chemicalNote: 'शाम के समय कीट की सक्रियता के समय छिड़काव सबसे प्रभावी है।',
        organicName: 'दशपर्णी अर्क + फेरोमोन ट्रैप (Pheromone Traps)',
        organicRecipe: 'प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं। 5 लीटर दशपर्णी अर्क (10 कड़वे पत्तों का सत्त) 150 लीटर पानी में मिलाकर साप्ताहिक छिड़काव करें।',
        weatherSafe: 'हल्की धूप है, छिड़काव शाम 4 बजे के बाद करें।'
      },
      blight: {
        id: 'blight',
        title: 'आलू और टमाटर का अगेती/पछेती झुलसा (Late Blight)',
        scientific: 'Phytophthora infestans',
        crop: 'आलू व टमाटर (Potato & Tomato)',
        urgency: 'अति-संवेदनशील (Rapid Spread in Fog)',
        symptoms: 'पत्तियों के किनारों पर गहरे भूरे-काले पानी जैसे धब्बे। पत्ती के नीचे सफेद फफूंद दिखना। कोहरे और नमी में 48 घंटे में पूरा खेत झुलस जाना।',
        chemicalName: 'साइमोक्सानिल + मैंकोजेब (Curzate M8 / Sectin)',
        chemicalDose: '600 ग्राम प्रति 200 लीटर पानी प्रति एकड़ अथवा कॉपर ऑक्सीक्लोराइड 500 ग्राम प्रति एकड़।',
        chemicalNote: 'कोहरे के मौसम में रोग आने से पूर्व भी कवच रूपी छिड़काव आवश्यक है।',
        organicName: 'ट्राइकोडर्मा विरिडी (Trichoderma viride) + चूना बोर्डो मिश्रण',
        organicRecipe: '1% बोर्डो मिश्रण (1 किग्रा नीला थोथा + 1 किग्रा चूना 100 लीटर पानी में) का पत्तियों पर समान छिड़काव करें।',
        weatherSafe: 'ओस सूखने के बाद दिन में 11 से 3 बजे के बीच छिड़कें।'
      },
      stemborer: {
        id: 'stemborer',
        title: 'धान का तना छेदक (Yellow Stem Borer)',
        scientific: 'Scirpophaga incertulas',
        crop: 'धान (Paddy)',
        urgency: 'गंभीर (Loss of Tillers)',
        symptoms: 'पौधों के बीच की नई पत्ती सूखना जिसे "डेड हार्ट" (Dead Heart) कहते हैं। बाली निकलने पर सफेद थोथी बाली (White Head) दिखना जिसमें दाना नहीं भरता।',
        chemicalName: 'क्लोरेंट्रानिलिप्रोल 0.4% जीआर (Ferterra / Coragen)',
        chemicalDose: '4 किलोग्राम दानेदार दवा को 10 किग्रा सूखी रेत में मिलाकर प्रति एकड़ खेत में छिड़कें और 2-3 इंच पानी रखें।',
        chemicalNote: 'रोपाई के 20 से 30 दिन के भीतर प्रयोग सर्वोत्तम परिणाम देता है।',
        organicName: 'ट्राइकोग्रामा कार्ड (Trichogramma Chilonis parasitoid)',
        organicRecipe: 'प्रति एकड़ 2 ट्राइको-कार्ड (लगभग 40,000 परजीवी मित्र कीट) 10 दिन के अंतराल पर 3 बार पत्तियों पर स्टेपल करें।',
        weatherSafe: 'खेत में स्थिर पानी होना जरूरी है।'
      },
      aphids: {
        id: 'aphids',
        title: 'सरसों व सब्जी का चेपा / माहू (Aphids Pest)',
        scientific: 'Lipaphis erysimi',
        crop: 'सरसों, चना, सब्जियां',
        urgency: 'मध्यम (Sap Sucking)',
        symptoms: 'टहनियों और फूलों पर हरे, पीले या काले नन्हें कीटों का चिपका होना। पौधे का रस चूसना जिससे फलियां नहीं बनती और पत्तों पर चिपचिपा मधु-रस दिखता है।',
        chemicalName: 'इमिडाक्लोप्रिड 17.8% एसएल (Confidor / Imidacloprid)',
        chemicalDose: '50 से 70 मिली दवा को 150 लीटर पानी में प्रति एकड़ छिड़कें।',
        chemicalNote: 'मधुमक्खियों की गतिविधि वाले सुबह के समय छिड़काव से बचें, दोपहर बाद करें।',
        organicName: '5% नीम बीज अर्क (NSKE) + साबुन घोल',
        organicRecipe: '5 किग्रा नीम की निंबोली कूटकर 100 लीटर पानी में घोलें और 50 ग्राम सर्फ/साबुन घोलकर छिड़कें। रसचूसक कीट तुरंत भागते हैं।',
        weatherSafe: 'मौसम अनुकूल है।'
      }
    };

    // -------------------------------------------------------------
    // 4. COMMUNITY EQUIPMENT SHARING DATA
    // -------------------------------------------------------------
    let EQUIPMENT_DATA = [
      {
        id: 'eq1',
        title: 'महिंद्रा 575 DI (45 HP) + 7 फीट रोटावेटर',
        type: 'tractor',
        category: 'tractor',
        rate: '₹550 / घंटा (डीजल किसान का)',
        owner: 'सरदार गुरमीत सिंह',
        village: 'रामपुर मजरा',
        distanceKm: 2.4,
        phone: '98721 00000',
        rating: '4.9 ★ (38 जुताई संपन्न)',
        available: true,
        tag: 'डीजल बचत मॉडल'
      },
      {
        id: 'eq2',
        title: 'एग्री-ड्रोन स्प्रेयर 10L (AI जीपीएस मैपिंग)',
        type: 'drone',
        category: 'drone',
        rate: '₹350 / एकड़ (पायलट व बैटरी सहित)',
        owner: 'विकास ड्रोन सेवा केंद्र',
        village: 'दौराला चौराहा',
        distanceKm: 4.8,
        phone: '94120 00000',
        rating: '4.8 ★ (120 एकड़ छिड़काव)',
        available: true,
        tag: '7 मिनट में 1 एकड़'
      },
      {
        id: 'eq3',
        title: 'करतार 4000 कंबाइन हार्वेस्टर (गेहूं व धान)',
        type: 'harvest',
        category: 'harvest',
        rate: '₹1,800 / घंटा (ऑपरेटर सहित)',
        owner: 'चौधरी चरण सिंह फार्म',
        village: 'जागृति विहार देहात',
        distanceKm: 6.1,
        phone: '98371 00000',
        rating: '4.7 ★ (220 घंटे कार्यरत)',
        available: true,
        tag: 'स्ट्रॉ रीपर अटैचमेंट'
      },
      {
        id: 'eq4',
        title: 'शक्तिमान मल्टी-क्रॉप थ्रेशर (गेहूं, सरसों, चना)',
        type: 'harvest',
        category: 'harvest',
        rate: '₹700 / घंटा',
        owner: 'रामपाल त्यागी',
        village: 'मुरादनगर ग्रामीण',
        distanceKm: 3.1,
        phone: '97580 00000',
        rating: '4.9 ★',
        available: false,
        tag: 'कल उपलब्ध होगा'
      },
      {
        id: 'eq5',
        title: 'सोलर पोर्टेबल 5 HP सबमर्सिबल पंपिंग सेट',
        type: 'irrigation',
        category: 'irrigation',
        rate: '₹400 / दिन',
        owner: 'हरि किशन शर्मा',
        village: 'शाहपुर',
        distanceKm: 1.8,
        phone: '94560 00000',
        rating: '5.0 ★',
        available: true,
        tag: 'जीरो बिजली बिल'
      },
      {
        id: 'eq6',
        title: 'लेजर लैंड लेवलर (कंप्यूटर गोड़ी)',
        type: 'tractor',
        category: 'tractor',
        rate: '₹750 / घंटा',
        owner: 'कुलदीप वर्मा',
        village: 'सिवाल खास',
        distanceKm: 5.5,
        phone: '96340 00000',
        rating: '4.9 ★',
        available: true,
        tag: '30% पानी की बचत'
      }
    ];

    // -------------------------------------------------------------
    // 5. CIVIC & EMERGENCY LOGISTICS DATA
    // -------------------------------------------------------------
    const EMERGENCY_VENOM_CENTERS = [
      {
        name: 'सामुदायिक स्वास्थ्य केंद्र (CHC) दौराला',
        vials: '14 शीशियां एंटी-वेनम उपलब्ध (Stocked)',
        distance: '4.2 किमी',
        phone: '0121-288210',
        type: 'Govt Hospital - 24 Hr'
      },
      {
        name: 'लाला लाजपत राय मेडिकल कॉलेज (LLRM Trauma)',
        vials: 'पूर्ण आईसीयू व 45 शीशियां स्टॉक',
        distance: '14.0 किमी',
        phone: '0121-2760888',
        type: 'Regional Emergency Trauma'
      },
      {
        name: 'प्राथमिक स्वास्थ्य केंद्र (PHC) रोहटा',
        vials: '8 शीशियां पॉलीवैलेंट एंटी-वेनम',
        distance: '7.5 किमी',
        phone: '94121 10811',
        type: 'Rural Dispensary'
      }
    ];

    const VET_CENTERS = [
      {
        name: 'राजकीय पशु चिकित्सालय (पशु अस्पताल) दौराला',
        doctor: 'डॉ. अमित यादव (वरिष्ठ पशु चिकित्सक)',
        phone: '94112 34567',
        service: 'टीकाकरण, खुरपका-मुंहपका इलाज, कृत्रिम गर्भाधान',
        distance: '3.8 किमी'
      },
      {
        name: 'मोबाइल पशु चिकित्सा इकाई (1962 एम्बुलेंस)',
        doctor: 'ऑन-कॉल आपातकालीन वैन (Doorstep Clinic)',
        phone: '1962',
        service: 'गंभीर स्थिति में सीधे खलिहान/घर पर उपचार',
        distance: 'ब्लॉक स्तर पर उपलब्ध'
      }
    ];

    const KVK_CENTERS = [
      {
        name: 'कृषि विज्ञान केंद्र (ICAR - KVK) हस्तिनापुर',
        officer: 'प्रधान वैज्ञानिक एवं मृदा विशेषज्ञ',
        phone: '01233-254210',
        distance: '21 किमी',
        service: 'मृदा स्वास्थ्य कार्ड (Soil Health), उच्च गुणवत्ता वाले बीज'
      },
      {
        name: 'जिला कृषि रक्षा इकाई (Plant Protection Office)',
        officer: 'उप-कृषि निदेशक (पौध संरक्षण)',
        phone: '0121-2640192',
        distance: '16 किमी',
        service: 'कीटनाशक सब्सिडी व प्रमाणित छिड़काव यंत्र जांच'
      }
    ];

    const CIVIC_CENTERS = [
      {
        name: 'ग्राम पंचायत सचिवालय एवं जन सेवा केंद्र (CSC)',
        role: 'ग्राम विकास अधिकारी (VDO) / पंचायत सहायक',
        phone: '98370 12345',
        service: 'खसरा-खतौनी नकल, पीएम किसान सम्मान निधि ई-केवाईसी'
      },
      {
        name: 'ग्रामीण विद्युत शिकायत केंद्र (Bijli Sahayak)',
        role: 'सब-स्टेशन जेई (JE Electricity)',
        phone: '1912',
        service: 'ट्यूबवेल बिजली फॉल्ट, ट्रांसफार्मर खराबी शिकायत'
      }
    ];

    // -------------------------------------------------------------
    // 6. INITIALIZATION & RENDERING
    // -------------------------------------------------------------
    window.addEventListener('DOMContentLoaded', () => {
      // Initialize Lucide icons
      if (window.lucide) {
        lucide.createIcons();
      }
      
      // Set default booking date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      const dateInput = document.getElementById('book-date');
      if (dateInput) dateInput.value = dateStr;

      // Render all dynamic components
      renderCropFilterChips();
      renderMandiCards();
      renderDiseasePresets();
      selectPresetDisease('rust'); // default
      renderEquipmentList(EQUIPMENT_DATA);
      renderEmergencyLists();
      calculateNetReturn();
      setupVoiceRecognition();
    });

    // -------------------------------------------------------------
    // 7. TAB NAVIGATION
    // -------------------------------------------------------------
    function switchTab(tabId) {
      const tabs = ['mandi', 'doctor', 'equipment', 'emergency'];
      tabs.forEach(t => {
        const content = document.getElementById(`tab-content-${t}`);
        const btn = document.getElementById(`tab-btn-${t}`);
        if (content && btn) {
          if (t === tabId) {
            content.classList.remove('hidden');
            btn.classList.remove('bg-stone-100', 'text-stone-700');
            btn.classList.add('bg-farmer-600', 'text-white');
          } else {
            content.classList.add('hidden');
            btn.classList.remove('bg-farmer-600', 'text-white');
            btn.classList.add('bg-stone-100', 'text-stone-700');
          }
        }
      });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    // -------------------------------------------------------------
    // 8. MANDI FILTERING & PROFIT CALCULATOR
    // -------------------------------------------------------------
    function renderCropFilterChips() {
      const container = document.getElementById('crop-filter-chips');
      if (!container) return;

      container.innerHTML = CROPS_DATA.map(crop => {
        const isSelected = crop.id === currentActiveCrop;
        const cropName = getLocalized(crop.name) || (currentLang === 'en' ? crop.nameEn : crop.nameHi);
        return `
          <button onclick="selectCrop('${crop.id}')" class="px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
            isSelected
              ? 'bg-farmer-700 text-white shadow-sm ring-2 ring-farmer-500'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }">
            <span>${cropName}</span>
          </button>
        `;
      }).join('');
    }

    function selectCrop(cropId) {
      currentActiveCrop = cropId;
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
      renderCropFilterChips();
      renderMandiCards();
      
      const cropObj = CROPS_DATA.find(c => c.id === cropId);
      if (cropObj) {
        const cropName = getLocalized(cropObj.name) || (currentLang === 'en' ? cropObj.nameEn : cropObj.nameHi);
        document.getElementById('calc-display-rate').innerText = `${cropName} : ₹${cropObj.benchmarkRate.toLocaleString('en-IN')} ${dict.lblPerQuintal || '/क्विंटल'}`;
        document.getElementById('calc-display-rate').dataset.rate = cropObj.benchmarkRate;
      }
      calculateNetReturn();
      const cropTitle = cropObj ? (getLocalized(cropObj.name) || cropObj.nameHi) : cropId;
      showToast(`${dict.labelChooseCrop || 'फसल'}: ${cropTitle}`);
    }

        function renderMandiCards() {
      const container = document.getElementById('mandi-grid-container');
      if (!container) return;

      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
      const filtered = MANDIS_DATA.filter(m => m.crop === currentActiveCrop);
      const listToDisplay = filtered.length > 0 ? filtered : MANDIS_DATA.slice(0, 3);

      container.innerHTML = listToDisplay.map(mandi => {
        const trendBg = mandi.trend === 'up' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : (mandi.trend === 'down' ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-stone-700 bg-stone-100 border-stone-200');
        const trendIcon = mandi.trend === 'up' ? 'trending-up' : (mandi.trend === 'down' ? 'trending-down' : 'minus');

        const name = getLocalized(mandi.name);
        const district = getLocalized(mandi.district);
        const cropName = getLocalized(mandi.cropName);
        const trendLabel = getLocalized(mandi.trendLabel);
        const status = getLocalized(mandi.status);
        const unit = mandi.arrivalUnit === 'bales' ? (dict.lblBales || 'गांठें') : (dict.lblTons || 'टन');
        const arrivalText = `${mandi.arrivalQuantity || mandi.arrivalTon} ${unit}`;
        const distanceText = `${mandi.distanceKm} ${dict.lblKmAway || 'km away'}`;

        return `
          <div class="bg-white rounded-2xl border-2 border-stone-200 hover:border-farmer-500 transition p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span class="text-[10px] font-bold text-farmer-800 bg-farmer-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    ${district} • ${distanceText}
                  </span>
                  <h4 class="font-black text-stone-900 text-base leading-tight">${name}</h4>
                  <p class="text-xs text-stone-500 font-medium">${cropName}</p>
                </div>
                <span class="text-xs font-black px-2 py-1 rounded-lg border flex items-center gap-1 shrink-0 ${trendBg}">
                  <i data-lucide="${trendIcon}" class="w-3.5 h-3.5"></i>
                  <span>${trendLabel}</span>
                </span>
              </div>

              <!-- Price highlights -->
              <div class="my-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
                <div class="flex items-baseline justify-between">
                  <span class="text-xs text-stone-600 font-bold">${dict.lblModalPrice || 'Modal Price:'}</span>
                  <span class="text-xl font-black text-farmer-900">₹${mandi.modalPrice.toLocaleString('en-IN')}<span class="text-xs font-normal text-stone-500"> ${dict.lblPerQuintal || '/quintal'}</span></span>
                </div>
                <div class="flex justify-between text-[11px] text-stone-500 mt-1.5 pt-1.5 border-t border-amber-200/60">
                  <span>${dict.lblMin || 'Min:'} ₹${mandi.minPrice}</span>
                  <span>${dict.lblMax || 'Max:'} ₹${mandi.maxPrice}</span>
                </div>
              </div>

              <div class="text-xs text-stone-600 space-y-1 mb-3">
                <div class="flex justify-between">
                  <span>${dict.lblTotalArrival || "Today's Total Arrival:"}</span>
                  <span class="font-bold text-stone-800">${arrivalText}</span>
                </div>
                <div class="flex justify-between">
                  <span>${dict.lblMandiStatus || 'Mandi Status:'}</span>
                  <span class="font-semibold text-emerald-700">${status}</span>
                </div>
              </div>
            </div>

            <!-- Action: Compare & Calculate -->
            <button onclick="setMandiInCalculator(${mandi.modalPrice}, ${mandi.distanceKm}, '${name.replace(/'/g, "\\'")}')" class="w-full bg-stone-100 hover:bg-farmer-700 hover:text-white text-farmer-900 font-black py-2 rounded-xl text-xs border border-stone-300 transition flex items-center justify-center gap-1.5 cursor-pointer">
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
              <span>${dict.btnCalcProfit || 'Calculate Profit at this Mandi'}</span>
            </button>
          </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

        function setMandiInCalculator(rate, dist, name) {
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
      document.getElementById('calc-dist').value = dist;
      document.getElementById('calc-display-rate').innerText = `${name} : ₹${rate} ${dict.lblPerQuintal || '/क्विंटल'}`;
      document.getElementById('calc-display-rate').dataset.rate = rate;
      calculateNetReturn();
      window.scrollTo({ top: 320, behavior: 'smooth' });
      showToast(`${name}: ${dist} ${dict.lblKmAway || 'km away'}, ₹${rate}`);
    }

    function calculateNetReturn() {
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
      const qty = parseFloat(document.getElementById('calc-qty').value) || 1;
      const dist = parseFloat(document.getElementById('calc-dist').value) || 1;
      const freightPerKm = parseFloat(document.getElementById('calc-freight').value) || 20;
      
      const storedRate = parseFloat(document.getElementById('calc-display-rate').dataset.rate);
      const cropObj = CROPS_DATA.find(c => c.id === currentActiveCrop);
      const ratePerQuintal = storedRate || (cropObj ? cropObj.benchmarkRate : 2420);

      const grossSale = qty * ratePerQuintal;
      const transportCost = Math.round(dist * freightPerKm);
      const netProfit = grossSale - transportCost;
      const netPerQuintal = Math.round(netProfit / qty);

      document.getElementById('res-gross').innerText = `₹${grossSale.toLocaleString('en-IN')}`;
      document.getElementById('res-transport').innerText = `- ₹${transportCost.toLocaleString('en-IN')}`;
      document.getElementById('res-net').innerText = `₹${netProfit.toLocaleString('en-IN')}`;
      document.getElementById('res-per-q').innerText = `₹${netPerQuintal.toLocaleString('en-IN')} ${dict.lblNetPerQuintal || 'प्रति क्विंटल शुद्ध'}`;
    }

    // -------------------------------------------------------------
    // 9. AI CROP DOCTOR LOGIC & PRESET SYMPTOMS
    // -------------------------------------------------------------
    function renderDiseasePresets() {
      const container = document.getElementById('disease-quick-buttons');
      if (!container) return;

      const keys = Object.keys(DISEASES_DB);
      container.innerHTML = keys.map(key => {
        const item = DISEASES_DB[key];
        const isSelected = key === currentActiveDisease;
        return `
          <button onclick="selectPresetDisease('${key}')" class="w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-xs font-bold ${
            isSelected 
              ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm' 
              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
          }">
            <span>${item.title}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-600">${item.crop}</span>
          </button>
        `;
      }).join('');
    }

    function selectPresetDisease(key) {
      if (!DISEASES_DB[key]) return;
      currentActiveDisease = key;
      const data = DISEASES_DB[key];

      document.getElementById('diag-name').innerText = data.title;
      document.getElementById('diag-scientific').innerText = data.scientific;
      document.getElementById('diag-severity').innerText = data.urgency;
      document.getElementById('diag-symptoms').innerText = data.symptoms;
      document.getElementById('diag-chemical-name').innerText = data.chemicalName;
      document.getElementById('diag-chemical-dose').innerText = data.chemicalDose;
      document.getElementById('diag-chemical-note').innerText = data.chemicalNote;
      document.getElementById('diag-organic-name').innerText = data.organicName;
      document.getElementById('diag-organic-recipe').innerText = data.organicRecipe;
      document.getElementById('diag-weather-warning').innerText = data.weatherSafe;

      renderDiseasePresets();
    }

    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.getElementById('image-preview');
        preview.src = e.target.result;
        document.getElementById('upload-placeholder').classList.add('hidden');
        document.getElementById('image-preview-wrapper').classList.remove('hidden');
        
        // Simulate Gemma AI Vision processing
        showToast("Gemma Agri AI: फोटो का विश्लेषण किया जा रहा है...");
        setTimeout(() => {
          selectPresetDisease('rust');
          showToast("निदान पूर्ण: गेहूं में पीला रतुआ के लक्षण पाए गए!");
          speakText("फोटो विश्लेषण पूर्ण हुआ। गेहूं की पत्ती पर पीला रतुआ रोग के लक्षण हैं। प्रोपिकोनाजोल 1 मिली प्रति लीटर का छिड़काव करें।");
        }, 1200);
      };
      reader.readAsDataURL(file);
    }

    // -------------------------------------------------------------
    // GEMMA AI CROP DISEASE DIAGNOSIS & REMEDY
    // -------------------------------------------------------------
    const GEMMA_API_KEY = "AQ.Ab8RN6LAuruJAoaOpGG_KmX-RqrOuvDagCqwRrGmRqrB4FQlCA";
    let lastGemmaResponseText = "";

    function setGemmaLoading(isLoading) {
      const btn = document.getElementById('btn-ask-gemma');
      const loadingEl = document.getElementById('gemma-loading');
      const idleEl = document.getElementById('gemma-idle-state');
      const errorEl = document.getElementById('gemma-error');
      const renderedEl = document.getElementById('gemma-response-rendered');

      if (isLoading) {
        if (loadingEl) loadingEl.classList.remove('hidden');
        if (idleEl) idleEl.classList.add('hidden');
        if (errorEl) errorEl.classList.add('hidden');
        if (renderedEl) renderedEl.classList.add('hidden');
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Analyzing with Gemma AI...</span>`;
        }
      } else {
        if (loadingEl) loadingEl.classList.add('hidden');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i><span>Ask Gemma AI</span>`;
        }
      }
      if (window.lucide) lucide.createIcons();
    }

    function showGemmaError(errMsg) {
      const loadingEl = document.getElementById('gemma-loading');
      const errorEl = document.getElementById('gemma-error');
      const errorMsgEl = document.getElementById('gemma-error-msg');
      const idleEl = document.getElementById('gemma-idle-state');
      const renderedEl = document.getElementById('gemma-response-rendered');

      if (loadingEl) loadingEl.classList.add('hidden');
      if (renderedEl) renderedEl.classList.add('hidden');
      if (idleEl) idleEl.classList.add('hidden');
      if (errorEl) {
        errorEl.classList.remove('hidden');
        if (errorMsgEl) errorMsgEl.innerText = errMsg || "Gemma AI सेवा से संपर्क नहीं हो सका। कृपया इंटरनेट जांचें और पुनः प्रयास करें।";
      }
      showToast("Gemma AI त्रुटि: " + (errMsg || "अनुरोध विफल हुआ"));
    }

    function renderGemmaResponse(text, symptoms) {
      const container = document.getElementById('gemma-response-rendered');
      const bodyEl = document.getElementById('gemma-response-body');
      const idleEl = document.getElementById('gemma-idle-state');
      const errorEl = document.getElementById('gemma-error');
      const queryBadge = document.getElementById('gemma-queried-symptoms');
      const speakBtn = document.getElementById('btn-speak-gemma');

      if (idleEl) idleEl.classList.add('hidden');
      if (errorEl) errorEl.classList.add('hidden');
      if (queryBadge) queryBadge.innerText = symptoms;
      if (speakBtn) speakBtn.classList.remove('hidden');

      const formatMarkdown = (str) => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`([^`]+)`/g, '<code class="bg-stone-100 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>')
          .replace(/\n\s*[\*\-]\s+(.*)/g, '<li class="ml-4 list-disc text-stone-700">$1</li>')
          .replace(/\n+/g, '<br>');
      };

      // Split by numbered points (1., 2., 3. or Point 1, Point 2, Point 3, etc.)
      const splitPoints = text
        .split(/(?:^|\n)(?=(?:\*{0,2}(?:Point|बिंदु|ਨੁਕਤਾ|मुद्दा|పాయింట్)?\s*[1-3][\.\:\-\)]|\b[1-3][\.\:\-\)]))/gi)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      if (splitPoints.length >= 3) {
        const pointStyles = [
          {
            title: "Point 1: रोग निदान (Disease Diagnosis)",
            icon: "stethoscope",
            bg: "bg-amber-50/90 border-amber-200 text-amber-950",
            badge: "bg-amber-100 text-amber-800 border-amber-300"
          },
          {
            title: "Point 2: आईसीएआर मानक उपचार (ICAR Chemical Remedy)",
            icon: "flask-conical",
            bg: "bg-blue-50/90 border-blue-200 text-blue-950",
            badge: "bg-blue-100 text-blue-800 border-blue-300"
          },
          {
            title: "Point 3: देसी व जैविक समाधान (Organic & Bio Remedy)",
            icon: "leaf",
            bg: "bg-emerald-50/90 border-emerald-200 text-emerald-950",
            badge: "bg-emerald-100 text-emerald-800 border-emerald-300"
          }
        ];

        bodyEl.innerHTML = splitPoints.slice(0, 3).map((pt, idx) => {
          const style = pointStyles[idx] || pointStyles[0];
          return `
            <div class="p-3.5 rounded-xl border ${style.bg} shadow-sm transition">
              <div class="flex items-center gap-1.5 mb-1.5">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black border ${style.badge}">
                  <i data-lucide="${style.icon}" class="w-3 h-3 mr-1"></i>
                  ${style.title}
                </span>
              </div>
              <div class="text-xs text-stone-800 leading-relaxed">
                ${formatMarkdown(pt)}
              </div>
            </div>
          `;
        }).join('');

        if (splitPoints.length > 3) {
          bodyEl.innerHTML += `
            <div class="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
              ${splitPoints.slice(3).map(pt => formatMarkdown(pt)).join('<br>')}
            </div>
          `;
        }
      } else {
        bodyEl.innerHTML = `
          <div class="p-4 rounded-xl bg-teal-50/50 border border-teal-200 text-xs text-stone-800 leading-relaxed shadow-sm">
            ${formatMarkdown(text)}
          </div>
        `;
      }

      container.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();

      const card = document.getElementById('gemma-response-card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    async function askGemmaAI() {
      const input = document.getElementById('custom-symptom-input') || document.getElementById('ai-symptom-input');
      const symptoms = input ? input.value.trim() : '';

      if (!symptoms) {
        showToast("कृपया फसल के रोग लक्षण लिखें! (Please enter crop symptoms)");
        if (input) input.focus();
        return;
      }

      const langMap = {
        hi: "हिन्दी (Hindi)",
        en: "English",
        pa: "ਪੰਜਾਬੀ (Punjabi)",
        mr: "मराठी (Marathi)",
        te: "తెలుగు (Telugu)"
      };
      const langName = langMap[currentLang] || "Hindi";

      const prompt = `You are an expert ICAR agricultural specialist and plant pathologist.
A farmer has described the following crop symptoms: "${symptoms}".

Please provide a concise, practical 3-point crop disease diagnosis and remedy in ${langName}:
Point 1: Disease Diagnosis (संभावित फसल रोग का नाम और मुख्य लक्षण)
Point 2: ICAR Recommended Remedy (आईसीएआर अनुशंसित रासायनिक/मानक उपचार और सटीक मात्रा प्रति लीटर या प्रति एकड़)
Point 3: Organic & Bio Remedy (देसी जैविक समाधान जैसे नीम तेल, दशपर्णी काढ़ा या छाछ-हींग घोल)

Keep the answer practical, direct, farmer-friendly, and formatted as 3 distinct numbered points in ${langName}. Do not include internal thoughts, preambles, or meta-commentary.`;

      setGemmaLoading(true);

      const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMMA_API_KEY}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      };

      try {
        let response = await fetch(primaryUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        // Fallback to gemma-4-26b-a4b-it if gemma-3-27b-it endpoint is not found or fails
        if (!response.ok) {
          console.warn(`gemma-3-27b-it returned ${response.status}. Attempting fallback to gemma-4-26b-a4b-it...`);
          const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent?key=${GEMMA_API_KEY}`;
          response = await fetch(fallbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
          throw new Error("Gemma AI द्वारा कोई उत्तर प्राप्त नहीं हुआ। कृपया दोबारा प्रयास करें।");
        }

        lastGemmaResponseText = rawText;
        renderGemmaResponse(rawText, symptoms);
        showToast("Gemma AI: 3-बिंदु फसल निदान व उपचार तैयार!");
      } catch (err) {
        console.error("Gemma AI Request Error:", err);
        showGemmaError(err.message);
      } finally {
        setGemmaLoading(false);
      }
    }

    function speakGemmaResponse() {
      if (!lastGemmaResponseText) return;
      const speechClean = lastGemmaResponseText
        .replace(/[*#_`]/g, '')
        .replace(/\n+/g, '। ');
      speakText(speechClean);
    }

    function clearCustomSymptom() {
      const input = document.getElementById('custom-symptom-input');
      if (input) {
        input.value = '';
        input.focus();
      }
    }

    function startVoiceForCustomSymptom() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'pa' ? 'pa-IN' : (currentLang === 'mr' ? 'mr-IN' : (currentLang === 'te' ? 'te-IN' : 'en-IN')));
        recog.onstart = () => showToast("बोलें... लक्षण सुने जा रहे हैं (Listening...)");
        recog.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          const input = document.getElementById('custom-symptom-input');
          if (input) {
            input.value = transcript;
            showToast(`आवाज़ दर्ज: "${transcript}"`);
          }
        };
        recog.onerror = () => showToast("आवाज़ नहीं सुनी जा सकी। कृपया टाइप करें।");
        recog.start();
      } else {
        showToast("ब्राउज़र में वॉइस सपोर्ट उपलब्ध नहीं है, कृपया टाइप करें।");
      }
    }

    function diagnoseCustomQuery() {
      askGemmaAI();
    }

    function speakDiseaseAdvice() {
      const data = DISEASES_DB[currentActiveDisease];
      const speech = `${data.title}। लक्षण हैं: ${data.symptoms}। उपचार के लिए: ${data.chemicalName}, मात्रा: ${data.chemicalDose}। अथवा देसी उपचार में: ${data.organicName} का प्रयोग करें।`;
      speakText(speech);
    }

    function readDoctorSummary() {
      speakDiseaseAdvice();
    }

    // -------------------------------------------------------------
    // 10. COMMUNITY EQUIPMENT HIRING & BOOKING
    // -------------------------------------------------------------
    function renderEquipmentList(dataList) {
      const container = document.getElementById('equipment-grid-container');
      if (!container) return;

      container.innerHTML = dataList.map(item => {
        const availBadge = item.available 
          ? '<span class="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">उपलब्ध (Available)</span>'
          : '<span class="text-[10px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded">कल खाली (Booked Today)</span>';

        return `
          <div class="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-500 transition p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-2">
                <div>
                  <span class="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    ${item.village} • ${item.distanceKm} किमी
                  </span>
                  <h4 class="font-black text-stone-900 text-base leading-tight">${item.title}</h4>
                </div>
                ${availBadge}
              </div>

              <!-- Rental cost -->
              <div class="my-2.5 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span class="text-xs text-stone-500 block font-semibold">किराया दर (Standard Rate):</span>
                <span class="text-base font-black text-amber-800">${item.rate}</span>
                <span class="text-[11px] text-stone-600 block mt-0.5 font-medium">${item.tag}</span>
              </div>

              <div class="text-xs text-stone-600 space-y-1 mb-3">
                <div class="flex justify-between">
                  <span>मालिक / संचालक:</span>
                  <span class="font-bold text-stone-800">${item.owner}</span>
                </div>
                <div class="flex justify-between">
                  <span>किसान रेटिंग:</span>
                  <span class="font-bold text-emerald-700">${item.rating}</span>
                </div>
              </div>
            </div>

            <!-- Booking and Call buttons -->
            <div class="grid grid-cols-2 gap-2 pt-2 border-t">
              <button onclick="openBookingModal('${item.id}')" class="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                <span>बुकिंग करें</span>
              </button>
              <a href="tel:${item.phone}" class="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-stone-300">
                <i data-lucide="phone" class="w-3.5 h-3.5 text-farmer-700"></i>
                <span>सीधा फोन</span>
              </a>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    function filterEquipment(type) {
      // Update button styling
      document.querySelectorAll('.equip-filter-btn').forEach(b => {
        b.classList.remove('bg-stone-800', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-800');
      });
      event.target.classList.remove('bg-stone-100', 'text-stone-800');
      event.target.classList.add('bg-stone-800', 'text-white');

      if (type === 'all') {
        renderEquipmentList(EQUIPMENT_DATA);
      } else {
        const filtered = EQUIPMENT_DATA.filter(item => item.category === type);
        renderEquipmentList(filtered);
      }
    }

    function openBookingModal(machineId) {
      const machine = EQUIPMENT_DATA.find(m => m.id === machineId);
      if (!machine) return;

      const detailsBox = document.getElementById('booking-machine-details');
      detailsBox.innerHTML = `
        <div class="font-black text-stone-900 text-sm">${machine.title}</div>
        <div class="text-amber-800 font-bold mt-0.5">${machine.rate}</div>
        <div class="text-stone-500 mt-1">मालिक: ${machine.owner} • ${machine.village} (${machine.distanceKm} किमी)</div>
      `;
      document.getElementById('booking-modal').classList.remove('hidden');
      document.getElementById('booking-modal').classList.add('flex');
    }

    function closeBookingModal() {
      document.getElementById('booking-modal').classList.add('hidden');
      document.getElementById('booking-modal').classList.remove('flex');
    }

    function confirmBooking() {
      const name = document.getElementById('book-farmer-name').value;
      const duration = document.getElementById('book-duration').value;
      closeBookingModal();
      showToast(`धन्यवाद ${name}! बुकिंग का संदेश यंत्र मालिक को भेज दिया गया है।`);
      speakText(`बुकिंग स्वीकार कर ली गई है। मालिक आपसे जल्द संपर्क करेंगे।`);
    }

    function openAddEquipmentModal() {
      document.getElementById('add-equipment-modal').classList.remove('hidden');
      document.getElementById('add-equipment-modal').classList.add('flex');
    }

    function closeAddEquipmentModal() {
      document.getElementById('add-equipment-modal').classList.add('hidden');
      document.getElementById('add-equipment-modal').classList.remove('flex');
    }

    function saveNewEquipment() {
      const name = document.getElementById('new-eq-name').value.trim();
      const rate = document.getElementById('new-eq-rate').value.trim();
      const loc = document.getElementById('new-eq-location').value.trim();
      const owner = document.getElementById('new-eq-owner').value.trim();
      const cat = document.getElementById('new-eq-category').value;

      if (!name || !rate) {
        showToast("कृपया यंत्र का नाम और किराया दर्ज करें!");
        return;
      }

      const newObj = {
        id: 'eq_' + Date.now(),
        title: name,
        type: cat,
        category: cat,
        rate: rate,
        owner: owner || 'ग्राम किसान',
        village: loc || 'स्थानीय गांव',
        distanceKm: 2.1,
        phone: '9876543210',
        rating: 'नया सूचीबद्ध',
        available: true,
        tag: 'ग्राम पंचायत सत्यापित'
      };

      EQUIPMENT_DATA.unshift(newObj);
      renderEquipmentList(EQUIPMENT_DATA);
      closeAddEquipmentModal();
      showToast("आपका कृषि यंत्र सफलतापूर्वक पोर्टल पर जुड़ गया!");
    }

    // -------------------------------------------------------------
    // 11. CIVIC & EMERGENCY LOGISTICS
    // -------------------------------------------------------------
    function renderEmergencyLists() {
      // 1. Venom
      const venomContainer = document.getElementById('venom-centers-list');
      if (venomContainer) {
        venomContainer.innerHTML = EMERGENCY_VENOM_CENTERS.map(c => `
          <div class="p-3 bg-rose-50/70 border border-rose-200 rounded-xl flex items-center justify-between">
            <div>
              <h5 class="text-xs font-black text-stone-900">${c.name}</h5>
              <p class="text-[11px] text-rose-800 font-bold">${c.vials}</p>
              <span class="text-[10px] text-stone-500">${c.distance} • ${c.type}</span>
            </div>
            <a href="tel:${c.phone}" class="bg-rose-700 hover:bg-rose-800 text-white font-black px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow">
              <i data-lucide="phone-call" class="w-3 h-3"></i>
              <span>कॉल</span>
            </a>
          </div>
        `).join('');
      }

      // 2. Vet
      const vetContainer = document.getElementById('vet-centers-list');
      if (vetContainer) {
        vetContainer.innerHTML = VET_CENTERS.map(c => `
          <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <h5 class="text-xs font-black text-stone-900">${c.name}</h5>
              <p class="text-[11px] text-stone-700 font-semibold">${c.doctor}</p>
              <span class="text-[10px] text-emerald-800 font-bold">${c.service} (${c.distance})</span>
            </div>
            <a href="tel:${c.phone}" class="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow">
              <i data-lucide="phone-call" class="w-3 h-3"></i>
              <span>कॉल</span>
            </a>
          </div>
        `).join('');
      }

      // 3. KVK
      const kvkContainer = document.getElementById('kvk-centers-list');
      if (kvkContainer) {
        kvkContainer.innerHTML = KVK_CENTERS.map(c => `
          <div class="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
            <div>
              <h5 class="text-xs font-black text-stone-900">${c.name}</h5>
              <p class="text-[11px] text-stone-700 font-semibold">${c.officer} • ${c.distance}</p>
              <span class="text-[10px] text-amber-900 font-bold">${c.service}</span>
            </div>
            <a href="tel:${c.phone}" class="bg-amber-700 hover:bg-amber-800 text-white font-black px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow">
              <i data-lucide="phone-call" class="w-3 h-3"></i>
              <span>कॉल</span>
            </a>
          </div>
        `).join('');
      }

      // 4. Civic
      const civicContainer = document.getElementById('civic-centers-list');
      if (civicContainer) {
        civicContainer.innerHTML = CIVIC_CENTERS.map(c => `
          <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
            <div>
              <h5 class="text-xs font-black text-stone-900">${c.name}</h5>
              <p class="text-[11px] text-stone-700 font-semibold">${c.role}</p>
              <span class="text-[10px] text-blue-900 font-bold">${c.service}</span>
            </div>
            <a href="tel:${c.phone}" class="bg-blue-700 hover:bg-blue-800 text-white font-black px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow">
              <i data-lucide="phone-call" class="w-3 h-3"></i>
              <span>संपर्क</span>
            </a>
          </div>
        `).join('');
      }

      if (window.lucide) lucide.createIcons();
    }

    // -------------------------------------------------------------
    // 12. VOICE ASSISTANT & SPEECH SYNTHESIS / RECOGNITION
    // -------------------------------------------------------------
    function setupVoiceRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        speechRecognitionInstance = new SpeechRecognition();
        speechRecognitionInstance.continuous = false;
        speechRecognitionInstance.interimResults = false;
        speechRecognitionInstance.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'pa' ? 'pa-IN' : 'en-IN');

        speechRecognitionInstance.onstart = function() {
          isListening = true;
          document.getElementById('voice-status-box').classList.remove('hidden');
          document.getElementById('master-mic-btn').classList.add('listening-pulse');
        };

        speechRecognitionInstance.onresult = function(event) {
          const transcript = event.results[0][0].transcript;
          handleVoiceCommand(transcript);
        };

        speechRecognitionInstance.onerror = function(event) {
          stopVoiceCommand();
          showToast("आवाज़ नहीं सुनी जा सकी, कृपया दोबारा बोलें।");
        };

        speechRecognitionInstance.onend = function() {
          stopVoiceCommand();
        };
      }
    }

    function startVoiceCommand() {
      if (speechRecognitionInstance) {
        try {
          speechRecognitionInstance.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'pa' ? 'pa-IN' : (currentLang === 'mr' ? 'mr-IN' : 'en-IN'));
          speechRecognitionInstance.start();
        } catch (e) {
          // If already listening, simulate prompt
          simulateVoiceFallback();
        }
      } else {
        simulateVoiceFallback();
      }
    }

    function simulateVoiceFallback() {
      document.getElementById('voice-status-box').classList.remove('hidden');
      document.getElementById('voice-status-text').innerText = "माइक्रोफोन सक्रिय: 'गेहूं भाव' या 'दवा' का नमूना परखा जा रहा है...";
      setTimeout(() => {
        handleVoiceCommand("गेहूं का भाव बताओ");
      }, 2000);
    }

    function stopVoiceCommand() {
      isListening = false;
      document.getElementById('voice-status-box').classList.add('hidden');
      document.getElementById('master-mic-btn').classList.remove('listening-pulse');
      if (speechRecognitionInstance) {
        try { speechRecognitionInstance.stop(); } catch(e){}
      }
    }

    function handleVoiceCommand(text) {
      stopVoiceCommand();
      showToast(`आपने कहा: "${text}"`);
      const t = text.toLowerCase();

      if (t.includes('भाव') || t.includes('मंडी') || t.includes('रेट') || t.includes('price')) {
        switchTab('mandi');
        if (t.includes('प्याज')) selectCrop('onion');
        else if (t.includes('कपास')) selectCrop('cotton');
        else if (t.includes('सरसों')) selectCrop('mustard');
        else if (t.includes('आलू')) selectCrop('potato');
        else selectCrop('wheat');
        speakMandiSummary();
      } else if (t.includes('रोग') || t.includes('दवा') || t.includes('छिड़काव') || t.includes('कीड़ा') || t.includes('doctor')) {
        switchTab('doctor');
        const customInput = document.getElementById('custom-symptom-input');
        if (customInput && !customInput.value) {
          customInput.value = text;
        }
        diagnoseCustomQuery();
      } else if (t.includes('ट्रैक्टर') || t.includes('किराया') || t.includes('ड्रोन') || t.includes('मशीन')) {
        switchTab('equipment');
        speakText("सामुदायिक किराया केंद्र खोला गया है। ट्रैक्टर ₹550 घंटा और ड्रोन ₹350 एकड़ पर उपलब्ध है।");
      } else if (t.includes('सांप') || t.includes('इमरजेंसी') || t.includes('एम्बुलेंस') || t.includes('डॉक्टर')) {
        switchTab('emergency');
        speakText("आपातकालीन सेवा सक्रिय की गई है। 108 एम्बुलेंस और नजदीकी एंटी-वेनम केंद्र स्क्रीन पर उपलब्ध हैं।");
      } else {
        speakText(`आपने पूछा: ${text}। मैं आपकी सहायता के लिए प्रस्तुत हूँ।`);
      }
    }

    function speakText(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95; // comfortable village tempo
        utterance.pitch = 1.0;
        
        // Match language voice if available
        const voices = window.speechSynthesis.getVoices();
        const langCode = currentLang === 'hi' ? 'hi' : (currentLang === 'pa' ? 'pa' : (currentLang === 'mr' ? 'mr' : 'en'));
        const matchedVoice = voices.find(v => v.lang.startsWith(langCode));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        window.speechSynthesis.speak(utterance);
      } else {
        showToast("ऑडियो संदेश: " + text);
      }
    }

    function speakMandiSummary() {
      const cropObj = CROPS_DATA.find(c => c.id === currentActiveCrop);
      const filtered = MANDIS_DATA.filter(m => m.crop === currentActiveCrop);
      const mandi = filtered[0] || MANDIS_DATA[0];
      const text = `${cropObj ? cropObj.nameHi : 'फसल'} का आज मेरठ और हापुड़ मंडी में मॉडल भाव ₹${mandi.modalPrice} प्रति क्विंटल है। बाजार में तेजी का रुख है।`;
      speakText(text);
    }

    // -------------------------------------------------------------
    // 13. LANGUAGE TRANSLATION & TOGGLE
    // -------------------------------------------------------------
        function changeLanguage(langKey) {
      currentLang = langKey;
      const dict = TRANSLATIONS[langKey] || TRANSLATIONS['hi'];

      // Update all elements with data-i18n attributes automatically
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerText = dict[key];
        }
      });

      // Update static text nodes across the UI
      const updateText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text !== undefined) el.innerText = text;
      };

      updateText('brand-title', dict.brandTitle);
      updateText('brand-tagline', dict.brandTagline);
      updateText('badge-online', dict.badgeOnline);
      updateText('btn-sun-label', dict.btnSunLabel);
      updateText('btn-mic-label', dict.btnMicLabel);
      
      updateText('nav-mandi', dict.navMandi);
      updateText('nav-doctor', dict.navDoctor);
      updateText('nav-equipment', dict.navEquipment);
      updateText('nav-emergency', dict.navEmergency);

      updateText('mandi-head-title', dict.mandiHeadTitle);
      updateText('mandi-head-sub', dict.mandiHeadSub);
      updateText('btn-read-mandi', dict.btnReadMandi);
      updateText('label-choose-crop', dict.labelChooseCrop);

      updateText('calc-title', dict.calcTitle);
      updateText('calc-sub', dict.calcSub);
      updateText('lbl-calc-crop', dict.lblCalcCrop);
      updateText('lbl-calc-qty', dict.lblCalcQty);
      updateText('lbl-calc-dist', dict.lblCalcDist);
      updateText('lbl-calc-freight', dict.lblCalcFreight);
      updateText('lbl-total-sale', dict.lblTotalSale);
      updateText('lbl-total-transport', dict.lblTotalTransport);
      updateText('lbl-net-profit', dict.lblNetProfit);
      updateText('heading-mandi-cards', dict.headingMandiCards);

      updateText('doctor-head-title', dict.doctorHeadTitle);
      updateText('doctor-head-sub', dict.doctorHeadSub);
      updateText('btn-read-doc', dict.btnReadDoc);
      
      const leafPhotoEl = document.getElementById('lbl-leaf-photo');
      if (leafPhotoEl) leafPhotoEl.innerHTML = `<i data-lucide="camera" class="w-4 h-4 text-farmer-700"></i> ${dict.lblLeafPhoto}`;

      updateText('btn-upload-text', dict.btnUploadText);
      updateText('lbl-quick-symptoms', dict.lblQuickSymptoms);
      updateText('lbl-custom-query', dict.lblCustomQuery);

      const customInput = document.getElementById('custom-symptom-input');
      if (customInput) {
        const placeholders = {
          hi: "जैसे: गेहूं की पत्तियां पीली पड़ रही हैं और तने पर भूरा पाउडर है...",
          en: "e.g., Wheat leaves turning yellow with brown powdery pustules...",
          pa: "ਜਿਵੇਂ: ਕਣਕ ਦੇ ਪੱਤੇ ਪੀਲੇ ਪੈ ਰਹੇ ਹਨ ਅਤੇ ਤਣੇ 'ਤੇ ਭੂਰਾ ਪਾਊਡਰ ਹੈ...",
          mr: "उदा. गव्हाची पाने पिवळी पडत आहेत आणि खोडावर तपकिरी भुकटी आहे...",
          te: "ఉదా: గోధుమ ఆకులు పసుపు రంగులోకి మారుతున్నాయి మరియు కాండంపై పొడి ఉంది..."
        };
        customInput.placeholder = placeholders[langKey] || placeholders['hi'];
      }

      const symptomHeadEl = document.getElementById('lbl-symptom-head');
      if (symptomHeadEl) symptomHeadEl.innerHTML = `<i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-700"></i> ${dict.lblSymptomHead}`;

      updateText('lbl-icar-remedy', dict.lblIcarRemedy);
      updateText('lbl-bio-remedy', dict.lblBioRemedy);
      updateText('lbl-weather-guard', dict.lblWeatherGuard);
      updateText('lbl-offline-library', dict.lblOfflineLibrary);

      updateText('equip-head-title', dict.equipHeadTitle);
      updateText('equip-head-sub', dict.equipHeadSub);
      updateText('btn-list-machinery', dict.btnListMachinery);

      updateText('em-alert-title', dict.emAlertTitle);
      updateText('em-alert-sub', dict.emAlertSub);
      updateText('em-venom-title', dict.emVenomTitle);
      updateText('em-vet-title', dict.emVetTitle);
      updateText('em-kvk-title', dict.emKvkTitle);
      updateText('em-civic-title', dict.emCivicTitle);

      // Dynamically re-render Mandi Cards and Crop selector chips in the newly selected language
      renderMandiCards();
      renderCropFilterChips();

      // Update active calculator rate display
      const cropObj = CROPS_DATA.find(c => c.id === currentActiveCrop);
      if (cropObj) {
        const cropTitle = getLocalized(cropObj.name) || (currentLang === 'en' ? cropObj.nameEn : cropObj.nameHi);
        const rate = document.getElementById('calc-display-rate')?.dataset?.rate || cropObj.benchmarkRate;
        const rateEl = document.getElementById('calc-display-rate');
        if (rateEl) {
          rateEl.innerText = `${cropTitle} : ₹${Number(rate).toLocaleString('en-IN')} ${dict.lblPerQuintal || '/क्विंटल'}`;
        }
      }
      calculateNetReturn();

      if (window.lucide) lucide.createIcons();
      showToast(`भाषा बदली गई: ${document.getElementById('lang-select').selectedOptions[0].text}`);
    }

    // -------------------------------------------------------------
    // 14. SUNLIGHT FIELD MODE & UTILITIES
    // -------------------------------------------------------------
    function toggleSunlightMode() {
      isSunlightMode = !isSunlightMode;
      const body = document.body;
      if (isSunlightMode) {
        body.classList.add('sunlight-high-contrast', 'bg-yellow-50');
        showToast("धूप मोड सक्रिय: खेतों में तेज रोशनी के लिए उच्च कंट्रास्ट सक्षम!");
      } else {
        body.classList.remove('sunlight-high-contrast', 'bg-yellow-50');
        showToast("सामान्य दृश्य मोड बहाल किया गया।");
      }
    }

    let toastTimer;
    function showToast(message) {
      const toast = document.getElementById('toast');
      const msg = document.getElementById('toast-message');
      msg.innerText = message;
      toast.classList.remove('translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 3500);
    }
