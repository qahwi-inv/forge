import React, { useRef, useState, useEffect } from 'react';
import { toArabicWord } from 'number-to-arabic-words/dist/index-node.js'
import CryptoJS from 'crypto-js';

const SECRET = 'i-love-girl-ass';

const App = () => {

const printRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activationCode, setActivationCode] = useState('');
  const [machineCode, setMachineCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);

const initalFormData = {

  p1_1: '', p1_2: '', p1_3: '', 
p1_4: '', p1_5: '', p1_6: '',
p1_7: '', p1_8: '', p1_9: '',
p1_10: '', p1_11: '',

 item1_1: '', item1_2: '', item1_3: '', item1_4: '', item1_5: '', item1_6: '', item1_7: '', item1_8: '', item1_9: '', item1_10: '',
 item2_1: '', item2_2: '', item2_3: '', item2_4: '', item2_5: '', item2_6: '', item2_7: '', item2_8: '', item2_9: '', item2_10: '',

// Row 3
item3_1: '', item3_2: '', item3_3: '', item3_4: '', item3_5: '', 
item3_6: '', item3_7: '', item3_8: '', item3_9: '', item3_10: '',

// Row 4
item4_1: '', item4_2: '', item4_3: '', item4_4: '', item4_5: '', 
item4_6: '', item4_7: '', item4_8: '', item4_9: '', item4_10: '',

// Row 5
item5_1: '', item5_2: '', item5_3: '', item5_4: '', item5_5: '', 
item5_6: '', item5_7: '', item5_8: '', item5_9: '', item5_10: '',

// Row 6
item6_1: '', item6_2: '', item6_3: '', item6_4: '', item6_5: '', 
item6_6: '', item6_7: '', item6_8: '', item6_9: '', item6_10: '',

// Row 7
item7_1: '', item7_2: '', item7_3: '', item7_4: '', item7_5: '', 
item7_6: '', item7_7: '', item7_8: '', item7_9: '', item7_10: '',

// Row 8
item8_1: '', item8_2: '', item8_3: '', item8_4: '', item8_5: '', 
item8_6: '', item8_7: '', item8_8: '', item8_9: '', item8_10: '',

// Row 9
item9_1: '', item9_2: '', item9_3: '', item9_4: '', item9_5: '', 
item9_6: '', item9_7: '', item9_8: '', item9_9: '', item9_10: '',

// Row 10
item10_1: '', item10_2: '', item10_3: '', item10_4: '', item10_5: '', 
item10_6: '', item10_7: '', item10_8: '', item10_9: '', item10_10: '',

// Row 11
item11_1: '', item11_2: '', item11_3: '', item11_4: '', item11_5: '', item11_6: ''
, item11_7: '', item11_8: '', item11_9: '', item11_10: '',

// Row 11
item12_1: '', item12_2: '', item12_3: '', item12_4: '', item12_5: '', item12_6: ''
, item12_7: '', item12_8: '', item12_9: '', item12_10: '',

total_with_tax : '', numt: '',




item13_1: '', item13_2: '', item13_3: '',
item14_1: '', item14_2: '', item14_3: '',
item15_1: '', item15_2: '', item15_3: '',

}

const handlePrint = () => {
 const content = printRef.current.outerHTML;
  window.electronAPI.printSilentLandscape(content);
};
const handleSavePDF = () => {
  const content = printRef.current.outerHTML;
  window.electronAPI.saveAsPDF(content);
};

const handlePrintAndSave = () => {
  const content = printRef.current.innerHTML;
  window.electronAPI.printAndSavePDF(content);
};
const UseArabicNumber = (number) => {
  return toArabicWord(number);
};

const [formData, setFormData] = useState(initalFormData);



  // Positions for print overlay (you'll adjust these in edit mode)
  const [positions, setPositions] = useState(() => {
  const saved = localStorage.getItem('Positions15');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
  "p1_1"          : {"left": 232,    "top":  22  },
  "p1_2"          : {"left": 215.52, "top":  30.5},
  "p1_3"          : {"left": 144.5,  "top":  34  },
  "p1_4"          : {"left": 226,    "top":  38  },
  "p1_5"          : {"left": 145,    "top":  42  },
  "p1_6"          : {"left": 104,    "top":  42  },
  "p1_7"          : {"left":  54,    "top":  42  },
  "p1_8"          : {"left": -21.5,  "top":   8.5},
  "p1_9"          : {"left": -19.5,  "top":  16  },
  "p1_10"         : {"left": -20,    "top":  24  },
  "p1_11"         : {"left": -20,    "top":  31  },
  "item1_1"       : {"left": 246,    "top":  67  },
  "item1_2"       : {"left": 232.52, "top":  67  },
  "item1_3"       : {"left": 177.5,  "top":  67  },
  "item1_4"       : {"left":  93.5,  "top":  67  },
  "item1_5"       : {"left":  73.5,  "top":  67  },
  "item1_6"       : {"left":  55.5,  "top":  67  },
  "item1_7"       : {"left":  48.5,  "top":  67  },
  "item1_8"       : {"left":  35,    "top":  67  },
  "item1_9"       : {"left":  27.5,  "top":  67  },
  "item1_10"      : {"left":   4,    "top":  67  },
  "item2_1"       : {"left": 246,    "top":  76  },
  "item2_2"       : {"left": 232.52, "top":  76  },
  "item2_3"       : {"left": 177.5,  "top":  76  },
  "item2_4"       : {"left":  93.5,  "top":  76  },
  "item2_5"       : {"left":  73.5,  "top":  76  },
  "item2_6"       : {"left":  55.5,  "top":  76  },
  "item2_7"       : {"left":  48.5,  "top":  76  },
  "item2_8"       : {"left":  35,    "top":  76  },
  "item2_9"       : {"left":  27.5,  "top":  76  },
  "item2_10"      : {"left":   4,    "top":  76  },
  "item3_1"       : {"left": 246,    "top":  84.5},
  "item3_2"       : {"left": 232.52, "top":  84.5},
  "item3_3"       : {"left": 177.5,  "top":  84.5},
  "item3_4"       : {"left":  93.5,  "top":  84.5},
  "item3_5"       : {"left":  73.5,  "top":  84.5},
  "item3_6"       : {"left":  55.5,  "top":  84.5},
  "item3_7"       : {"left":  48.5,  "top":  84.5},
  "item3_8"       : {"left":  35,    "top":  84.5},
  "item3_9"       : {"left":  27.5,  "top":  84.5},
  "item3_10"      : {"left":   4,    "top":  84.5},
  "item4_1"       : {"left": 246,    "top":  93  },
  "item4_2"       : {"left": 232.52, "top":  93  },
  "item4_3"       : {"left": 177.5,  "top":  93  },
  "item4_4"       : {"left":  93.5,  "top":  93  },
  "item4_5"       : {"left":  73.5,  "top":  93  },
  "item4_6"       : {"left":  55.5,  "top":  93  },
  "item4_7"       : {"left":  48.5,  "top":  93  },
  "item4_8"       : {"left":  35,    "top":  93  },
  "item4_9"       : {"left":  27.5,  "top":  93  },
  "item4_10"      : {"left":   4,    "top":  93  },
  "item5_1"       : {"left": 246,    "top": 101.5},
  "item5_2"       : {"left": 232.52, "top": 101.5},
  "item5_3"       : {"left": 177.5,  "top": 101.5},
  "item5_4"       : {"left":  93.5,  "top": 101.5},
  "item5_5"       : {"left":  73.5,  "top": 101.5},
  "item5_6"       : {"left":  55.5,  "top": 101.5},
  "item5_7"       : {"left":  48.5,  "top": 101.5},
  "item5_8"       : {"left":  35,    "top": 101.5},
  "item5_9"       : {"left":  27.5,  "top": 101.5},
  "item5_10"      : {"left":   4,    "top": 101.5},
  "item6_1"       : {"left": 246,    "top": 109.5},
  "item6_2"       : {"left": 232.52, "top": 109.5},
  "item6_3"       : {"left": 177.5,  "top": 109.5},
  "item6_4"       : {"left":  93.5,  "top": 109.5},
  "item6_5"       : {"left":  73.5,  "top": 109.5},
  "item6_6"       : {"left":  55.5,  "top": 109.5},
  "item6_7"       : {"left":  48.5,  "top": 109.5},
  "item6_8"       : {"left":  35,    "top": 109.5},
  "item6_9"       : {"left":  27.5,  "top": 109.5},
  "item6_10"      : {"left":   4,    "top": 109.5},
  "item7_1"       : {"left": 246,    "top": 117.5},
  "item7_2"       : {"left": 232.52, "top": 117.5},
  "item7_3"       : {"left": 177.5,  "top": 117.5},
  "item7_4"       : {"left":  93.5,  "top": 117.5},
  "item7_5"       : {"left":  73.5,  "top": 117.5},
  "item7_6"       : {"left":  55.5,  "top": 117.5},
  "item7_7"       : {"left":  48.5,  "top": 117.5},
  "item7_8"       : {"left":  35,    "top": 117.5},
  "item7_9"       : {"left":  27.5,  "top": 117.5},
  "item7_10"      : {"left":   4,    "top": 117.5},
  "item8_1"       : {"left": 246,    "top": 126  },
  "item8_2"       : {"left": 232.52, "top": 126  },
  "item8_3"       : {"left": 177.5,  "top": 126  },
  "item8_4"       : {"left":  93.5,  "top": 126  },
  "item8_5"       : {"left":  73.5,  "top": 126  },
  "item8_6"       : {"left":  55.5,  "top": 126  },
  "item8_7"       : {"left":  48.5,  "top": 126  },
  "item8_8"       : {"left":  35,    "top": 126  },
  "item8_9"       : {"left":  27.5,  "top": 126  },
  "item8_10"      : {"left":   4,    "top": 126  },
  "item9_1"       : {"left": 246,    "top": 134.5},
  "item9_2"       : {"left": 232.52, "top": 134.5},
  "item9_3"       : {"left": 177.5,  "top": 134.5},
  "item9_4"       : {"left":  93.5,  "top": 134.5},
  "item9_5"       : {"left":  73.5,  "top": 134.5},
  "item9_6"       : {"left":  55.5,  "top": 134.5},
  "item9_7"       : {"left":  48.5,  "top": 134.5},
  "item9_8"       : {"left":  35,    "top": 134.5},
  "item9_9"       : {"left":  27.5,  "top": 134.5},
  "item9_10"      : {"left":   4,    "top": 134.5},
  "item10_1"      : {"left": 246,    "top": 142.5},
  "item10_2"      : {"left": 232.52, "top": 142.5},
  "item10_3"      : {"left": 177.5,  "top": 142.5},
  "item10_4"      : {"left":  93.5,  "top": 142.5},
  "item10_5"      : {"left":  73.5,  "top": 142.5},
  "item10_6"      : {"left":  55.5,  "top": 142.5},
  "item10_7"      : {"left":  48.5,  "top": 142.5},
  "item10_8"      : {"left":  35,    "top": 142.5},
  "item10_9"      : {"left":  27.5,  "top": 142.5},
  "item10_10"     : {"left":   4,    "top": 142.5},
  "item11_1"      : {"left": 246,    "top": 151  },
  "item11_2"      : {"left": 232.52, "top": 151  },
  "item11_3"      : {"left": 177.5,  "top": 151  },
  "item11_4"      : {"left":  93.5,  "top": 151  },
  "item11_5"      : {"left":  73.5,  "top": 151  },
  "item11_6"      : {"left":  55.5,  "top": 151  },
  "item11_7"      : {"left":  48.5,  "top": 151  },
  "item11_8"      : {"left":  35,    "top": 151  },
  "item11_9"      : {"left":  27.5,  "top": 151  },
  "item11_10"     : {"left":   4,    "top": 151  },
  "item12_1"      : {"left": 246,    "top": 159  },
  "item12_2"      : {"left": 232.52, "top": 159  },
  "item12_3"      : {"left": 177.5,  "top": 159  },
  "item12_4"      : {"left":  93.5,  "top": 159  },
  "item12_5"      : {"left":  73.5,  "top": 159  },
  "item12_6"      : {"left":  55.5,  "top": 159  },
  "item12_7"      : {"left":  48.5,  "top": 159  },
  "item12_8"      : {"left":  35,    "top": 159  },
  "item12_9"      : {"left":  27.5,  "top": 159  },
  "item12_10"     : {"left":   4,    "top": 159  },
  "total_with_tax": {"left":  27.5,  "top": 171  },
  "item13_1"      : {"left": 215.5,  "top": 182.5},
  "item13_2"      : {"left": 145.02, "top": 182.5},
  "item13_3"      : {"left":  42.5,  "top": 182.5},
  "item14_1"      : {"left": 216.5,  "top": 189.5},
  "item14_2"      : {"left": 145.5,  "top": 189.5},
  "item14_3"      : {"left":  42.5,  "top": 189.5},
  "item15_1"      : {"left": 216,    "top": 195.5},
  "item15_2"      : {"left": 145.5,  "top": 195.5},
  "item15_3"      : {"left":  42.5,  "top": 195.5},
  "numt"          : {"left": 29, "top": 171},
}

  });


  useEffect(() => {
  localStorage.setItem('Positions15', JSON.stringify(positions));
}, [positions]);


  // Function to get formatted Hijri date (Arabic numerals and names)
function getHijriDate(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long', // Optional: adds day name like "الأربعاء"
  });
  return formatter.format(date);
}

// Example usage in your component
const hijriToday = getHijriDate(); // e.g., "17 جمادى الآخرة 1447 هـ"

// For numeric format (like 17/06/1447)
function getHijriNumeric(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { // 'umalqura' for more accurate Saudi variant
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatter.format(date).replace(/\u200F/g, ''); // Removes RTL marks if needed
}

/*useEffect(() => {
  const hijriDate = getHijriNumeric();

  setFormData(prev => ({
    ...prev,
    // Only override if empty (same logic, but unconditional call)
    p1_7: prev.p1_7 || hijriDate,
    p1_9: prev.p1_9 || hijriDate,
  }));
}, []); // ← runs once on mount*/



const calculateRowTotali = (row) => {
  const quantity = Number(formData[`item${row}_5`] || 0);
  const price_f    = Number(formData[`item${row}_6`] || 0)*0.01;
  const price_i    = Number(formData[`item${row}_7`] || 0);
  let total = quantity * (price_i + price_f);

  const integerPart = Math.trunc(total);     // 123
const fractionalPart = total - integerPart; // 0.45678

  return integerPart;
};

const calculateRowTotalf = (row) => {
  const quantity = Number(formData[`item${row}_5`] || 0);
  const price_f    = Number(formData[`item${row}_6`] || 0)*0.01;
  const price_i    = Number(formData[`item${row}_7`] || 0);
  let total = quantity * (price_i + price_f);

  const integerPart = Math.trunc(total);     // 123
const fractionalPart = total - integerPart; // 0.45678

  return Math.round((fractionalPart % 1) * 100);;
};

// Assume you have rows 1 to 12 (or however many)
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 1. Calculate total for each row (quantity * unit price)
const rowTotals = ROWS.map(row => {
  const quantity = Number(formData[`item${row}_5`] || 0);
  const price_f    = Number(formData[`item${row}_6`] || 0)*0.01;
  const price_i    = Number(formData[`item${row}_7`] || 0);
  let total = quantity * (price_i + price_f);
  return total;
});
const grandTotalBeforeTax = rowTotals.reduce((sum, total) => sum + total, 0);
const grantAfter = (grandTotalBeforeTax * 0.15 + grandTotalBeforeTax).toFixed(2);

  const [editMode, setEditMode] = useState(true);
  const [previewMode, setPreviewMode] = useState(true);

  const handleChange = (e) => {
   const { name, value } = e.target;
  let newFormData = { ...formData, [name]: value };

  // Parse row number from name, e.g., "item2_5" → row = 2
  const match = name.match(/^item(1[0-2]|[1-9])_[567]$/);
  const match2 = name.match(/^item(1[0-2]|[1-9])_[89]$/);
  const match3 = name.match("total_with_tax");

    if(match3) {
     
  newFormData.numt = toArabicWord(newFormData.total_with_tax);
    }
  else if (match) {
    console.log("in match");
  const row = Number(match[1]);

  // Update the changed field

  // === Recalculate ONLY this row's total ===
  const quantity = Number(newFormData[`item${row}_5`] || 0);
  const price_f  = Number(newFormData[`item${row}_6`] || 0) * 0.01;  // halalas
  const price_i  = Number(newFormData[`item${row}_7`] || 0);         // riyals

  const total = quantity * (price_i + price_f);
  const integerPart = Math.trunc(total);

  newFormData[`item${row}_9`] = integerPart.toString();

  // Optional: halalas in itemX_10
  const halalas = Math.round((total - integerPart) * 100);
  newFormData[`item${row}_8`] = halalas.toString().padStart(2, '0');

  
  let grandTotal = 0;
  [1,2,3,4,5,6,7,8,9,10,11,12].forEach(row => {
    const rowInteger = Number(newFormData[`item${row}_9`] || 0);
    const rowHalalas = Number(newFormData[`item${row}_8`] || 0);
    grandTotal += rowInteger + (rowHalalas / 100);
  });

  const vat15 = grandTotal * 0.15;
  const totalWithTax = grandTotal + vat15;

  // Round properly to avoid floating point issues
  newFormData.total_with_tax = totalWithTax.toFixed(2);
  newFormData.numt = toArabicWord(newFormData.total_with_tax);


   const hijriDate = getHijriNumeric();
  }

  else if(match2) {
        console.log("in match 2");

    const row = Number(match2[1]);


  
  let grandTotal = 0;
  [1,2,3,4,5,6,7,8,9,10,11,12].forEach(row => {
    const rowInteger = Number(newFormData[`item${row}_9`] || 0);
    const rowHalalas = Number(newFormData[`item${row}_8`] || 0);
    grandTotal += rowInteger + (rowHalalas / 100);
  });

  const vat15 = grandTotal * 0.15;
  const totalWithTax = grandTotal + vat15;

  // Round properly to avoid floating point issues
  newFormData.total_with_tax = totalWithTax.toFixed(2);
  newFormData.numt = toArabicWord(newFormData.total_with_tax);

  }
  setFormData(newFormData);


  /*setFormData(prev => ({
    ...prev,
    // Only override if empty (same logic, but unconditional call)
    p1_7: hijriDate,
    p1_9: hijriDate,
  }));*/
  };

  const toArabicNumerals = (str) => {
  if (!str) return str;
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (digit) => arabicDigits[digit]);
};

  const handlePrintDirect = () => {
    console.log("Print Direct button clicked!");
    window.print();
  }
  //const handleSavePDF = () => printRef.current && window.electron.saveAsPDF(printRef.current.outerHTML);

  const newFields = () => {
    setFormData(initalFormData);
  }


useEffect(() => {
  const loadTemplate = async () => {
    try {
      let url;

      if (import.meta.env.DEV) {
        // Vite dev → public/template.json
        url = '/template.json';
      } else {
        // Production → next to exe
        const templatePath = await window.electronAPI.getTemplatePath();
        url = `file://${templatePath}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Template not found');

      const data = await response.json();
      setPositions(data);
      console.log('Loaded template:', data);
    } catch (err) {
      console.error('Failed to load template:', err);
    }
  };

  loadTemplate();
}, []);
useEffect(() => {
    const checkActivation = async () => {
      const license = await window.electronAPI.getLicense();
      const rawId = await window.electronAPI.getMachineId();

      // Generate 5-char machine code (alphanumeric, uppercase)
      const hash = CryptoJS.SHA256(rawId + SECRET).toString(CryptoJS.enc.Hex);
      const shortCode = hash.substring(0, 5).toUpperCase(); // First 5 chars
      setMachineCode(shortCode);

      if (license) {
        // Expected activation key (5 chars)
        const expectedKey = CryptoJS.SHA256(shortCode + SECRET).toString(CryptoJS.enc.Hex).substring(0, 5).toUpperCase();
        if (license === expectedKey) {
          setIsActivated(true);
        }
      }
    };
    checkActivation();
  }, []);

  const handleActivate = async () => {
    const expectedKey = CryptoJS.SHA256(machineCode + SECRET).toString(CryptoJS.enc.Hex).substring(0, 5).toUpperCase();
    
    if (activationCode.toUpperCase() === expectedKey) {
      await window.electronAPI.saveLicense(expectedKey);
      setIsActivated(true);
      alert('تم التفعيل بنجاح! البرنامج جاهز للاستخدام.');
    } else {
      alert('كود التفعيل غير صحيح. تأكد من الكود وحاول مرة أخرى.');
    }
  };

  if (!isActivated) {
    return (
      <div style={{ 
        direction: 'rtl', 
        textAlign: 'center', 
        padding: '60px', 
        fontFamily: 'Arial', 
        background: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>تفعيل البرنامج</h1>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontSize: '20px' }}>كود الجهاز الخاص بك:</p>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            letterSpacing: '10px', 
            background: '#e9ecef', 
            padding: '20px', 
            borderRadius: '10px', 
            margin: '30px 0' 
          }}>
            {machineCode}
          </div>
      
          <input
            type="text"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
            placeholder="أدخل كود التفعيل هنا"
            maxLength={5}
            style={{ 
              width: '200px', 
              padding: '15px', 
              fontSize: '24px', 
              textAlign: 'center', 
              letterSpacing: '8px',
              margin: '20px 0'
            }}
          />
          <br />
          <button 
            onClick={handleActivate}
            style={{ 
              padding: '15px 40px', 
              fontSize: '20px', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            تفعيل البرنامج
          </button>
        </div>
      </div>
    );
  }


  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple hardcoded check (replace with real auth later)
    if (username === '56280-2' && password === '56280-2') {
      setIsLoggedIn(true);
    } else {
      setError('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '350px'
        }}>
          
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>شعبة الصيانة حدا</h2>
          
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label>اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label>كلمة المرور</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1em',
                cursor: 'pointer'
              }}
            >
              دخول
            </button>
          </form>
          <div style={{textAlign:'left', marginTop:'30px'}}>تصميم ريان الجابري</div>
        </div>
      </div>
    );
  }





  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', direction: 'rtl', fontSize: '16px', background: '#f8f9fa' }}>
      <div style={{ padding: '30px', fontFamily: 'Arial', direction: 'rtl', fontSize: '16px', background: '#f8f9fa' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
    
    {/* Button on the left */}
    <button 
      onClick={newFields} 
      style={{ 
        padding: '20px 50px', 
        fontSize: '22px', 
        margin: '20px', 
        background: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '12px',
        position: 'absolute',
        left: 0
      }}
    >
      جديد
    </button>

    {/* Centered H1 */}
    <h1 style={{ textAlign: 'center', fontSize: '28px', width: '100%' }}>
      محضر استلام
    </h1>

  </div>
</div>



      {/* Toggles */}
      <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '18px', display:'none'}}>
        <label style={{ margin: '0 30px' }}>
          <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
          وضع التعديل (خلفية + إحداثيات)
        </label>
        <label>
          <input type="checkbox" checked={previewMode} onChange={() => setPreviewMode(!previewMode)} />
          عرض المعاينة
        </label>
      </div>

      {/* Input Form - Exact layout like your image */}
      <div style={{ margin: '0 auto', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>

<div style={{ padding: '30px', fontFamily: 'Arial', direction: 'rtl', fontSize: '16px', background: '' }}>
  <div style={{ 
    display: 'flex', 
    gap: '30px', 
    alignItems: 'flex-start',
    flexWrap: 'wrap'  // Makes it responsive on resize
  }}>

        {/* ========== RIGHT COLUMN: Form Fields ========== */}
    <div style={{ 
      flex: '2 1 500px'  // Takes more space, responsive
    }}>
      {/* Row 1: 2 fields */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '24px'
      }}>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>وزارة</span>
          <input
            name="p1_1"
            value={formData.p1_1 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

      </div>

      {/* Row 2: 2 fields */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '24px'
      }}>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>إدارة مستودعات</span>
          <input
            name="p1_2"
            value={formData.p1_2 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>المورد</span>
          <input
            name="p1_3"
            value={formData.p1_3 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Row 3: 4 fields */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px'
      }}>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>مستودع</span>
          <input
            name="p1_4"
            value={formData.p1_4 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>مستند</span>
          <input
            name="p1_5"
            value={formData.p1_5 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>رقم</span>
          <input
            name="p1_6"
            value={formData.p1_6 || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <span style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>تاريخ</span>
          <input
            name="p1_7"
            
            value={formData.p1_7 || ''}
            onChange={(e) => {
      const converted = toArabicNumerals(e.target.value);
      handleChange({ target: { name: 'p1_7', value: converted } });
    }}
    dir="rtl"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </div>
    
    {/* ========== LEFT COLUMN: Company Info Fields ========== */}
    <div style={{
      flex: '1 1 300px',  // Responsive: minimum 300px, grows/shrinks as needed
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>الرقم الخاص</label>
        <input
          type="text"
          name="p1_8"
          value={formData.p1_8 || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>تاريخ الاستلام</label>
        <input
          name="p1_9"
            value={formData.p1_9 || ''}
             onChange={(e) => {
      const converted = toArabicNumerals(e.target.value);
      handleChange({ target: { name: 'p1_9', value: converted } });
    }}
    dir="rtl"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>عدد الصفحات</label>
        <input
          type="text"
          name="p1_10"
          value={formData.p1_10 || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>المرفقات</label>
        <input
          type="text"
          name="p1_11"
          value={formData.p1_11 || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>
    </div>


  </div>
</div>

        {/* Lower Section: Table layout */}
        <div>


        {/* Earnings Table - 8 columns, 10 fully connected rows */}
<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', tableLayout: 'fixed' }}>
  <thead>
    {/* First header row */}
    <tr style={{ background: '#dee2e6'}}>
  
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '5%'  // Wider for notes
        }}
      >
        الرقم
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '10%'  // Wider for notes
        }}
      >
        رقم الصنف
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '30%'  // Wider for notes
        }}
      >
        اسم الصنف ووصفه
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '5%'  // Wider for notes
        }}
      >
        الوحدة
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '5%'  // Wider for notes
        }}
      >
        الكمية
      </th>
          <th
        colSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          fontWeight: 'bold',
          width: '10%'  // Total for both sub-columns
        }}
      >
        سعر الوحدة
      </th>
      
          <th
        colSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          fontWeight: 'bold',
          width: '10%'  // Total for both sub-columns
        }}
      >
        مجموع القيمة
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '7%'  // Wider for notes
        }}
      >
       ملاحضات
      </th>
    </tr>

    {/* Second header row - sub-labels */}
    <tr style={{ background: '#e9ecef' }}>
      <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center'}}>
        هـ
      </th>
      <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center'}}>
        ريال
      </th>

      <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center'}}>
        هـ
      </th>
      <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center'}}>
        ريال
      </th>
    </tr>
  </thead>
  <tbody>
    {/* Row 1 */}
    <tr>
     <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_1" value={formData.item1_1 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_2" value={formData.item1_2 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_3" value={formData.item1_3 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_4" value={formData.item1_4 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_5" value={formData.item1_5 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_6" value={formData.item1_6 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_7" value={formData.item1_7 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_8" value={formData.item1_8 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_9" value={formData.item1_9 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item1_10" value={formData.item1_10 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      
    </tr>

    {/* Row 2 */}
    <tr>
     <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_1" value={formData.item2_1 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_2" value={formData.item2_2 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_3" value={formData.item2_3 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_4" value={formData.item2_4 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_5" value={formData.item2_5 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_6" value={formData.item2_6 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_7" value={formData.item2_7 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_8" value={formData.item2_8 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_9" value={formData.item2_9 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name="item2_10" value={formData.item2_10 || ''} onChange={handleChange}
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>  
    </tr>

    {/* Row 1 */}
      <tr>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_1" value={formData.item3_1 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_2" value={formData.item3_2 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_3" value={formData.item3_3 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_4" value={formData.item3_4 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_5" value={formData.item3_5 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_6" value={formData.item3_6 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_7" value={formData.item3_7 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_8" value={formData.item3_8 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_9" value={formData.item3_9 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>
    <td style={{ padding: '0', border: '1px solid #ccc'}}>
      <input name="item3_10" value={formData.item3_10 || ''} onChange={handleChange}
        style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
    </td>  
  </tr>
      
    {/* Row 1 */}
    <tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_1" value={formData.item4_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_2" value={formData.item4_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_3" value={formData.item4_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_4" value={formData.item4_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_5" value={formData.item4_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_6" value={formData.item4_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_7" value={formData.item4_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_8" value={formData.item4_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_9" value={formData.item4_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item4_10" value={formData.item4_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

    {/* Row 1 */}
    {/* Row 5 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_1" value={formData.item5_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_2" value={formData.item5_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_3" value={formData.item5_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_4" value={formData.item5_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_5" value={formData.item5_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_6" value={formData.item5_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_7" value={formData.item5_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_8" value={formData.item5_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_9" value={formData.item5_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item5_10" value={formData.item5_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 6 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_1" value={formData.item6_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_2" value={formData.item6_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_3" value={formData.item6_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_4" value={formData.item6_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_5" value={formData.item6_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_6" value={formData.item6_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_7" value={formData.item6_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_8" value={formData.item6_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_9" value={formData.item6_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item6_10" value={formData.item6_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>
{/* Row 7 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_1" value={formData.item7_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_2" value={formData.item7_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_3" value={formData.item7_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_4" value={formData.item7_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_5" value={formData.item7_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_6" value={formData.item7_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_7" value={formData.item7_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_8" value={formData.item7_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_9" value={formData.item7_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item7_10" value={formData.item7_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 8 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_1" value={formData.item8_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_2" value={formData.item8_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_3" value={formData.item8_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_4" value={formData.item8_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_5" value={formData.item8_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_6" value={formData.item8_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_7" value={formData.item8_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_8" value={formData.item8_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_9" value={formData.item8_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item8_10" value={formData.item8_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 9 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_1" value={formData.item9_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_2" value={formData.item9_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_3" value={formData.item9_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_4" value={formData.item9_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_5" value={formData.item9_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_6" value={formData.item9_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_7" value={formData.item9_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_8" value={formData.item9_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_9" value={formData.item9_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item9_10" value={formData.item9_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 10 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_1" value={formData.item10_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_2" value={formData.item10_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_3" value={formData.item10_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_4" value={formData.item10_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_5" value={formData.item10_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_6" value={formData.item10_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_7" value={formData.item10_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_8" value={formData.item10_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_9" value={formData.item10_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item10_10" value={formData.item10_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 11 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_1" value={formData.item11_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_2" value={formData.item11_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_3" value={formData.item11_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_4" value={formData.item11_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_5" value={formData.item11_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_6" value={formData.item11_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_7" value={formData.item11_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_8" value={formData.item11_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_9" value={formData.item11_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item11_10" value={formData.item11_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

{/* Row 12 */}
<tr>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_1" value={formData.item12_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_2" value={formData.item12_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_3" value={formData.item12_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_4" value={formData.item12_4 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_5" value={formData.item12_5 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_6" value={formData.item12_6 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_7" value={formData.item12_7 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_8" value={formData.item12_8 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_9" value={formData.item12_9 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item12_10" value={formData.item12_10 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

   <tr style={{ background: '#ced4da', fontWeight: 'bold' }}>
   <td style={{ padding: '12px', border: '1px solid #ccc', textAlign:'center' }} colSpan={5}>
     <input
      name="numt"
      value={formData.numt || ''}
      onChange={ (e) => {
        const value = e.target.value;
        // Update the field
        setFormData(prev => ({
          ...prev,
          numt: value,
        }));
        if (value === '') {
          handleChange();
        }
      }      
      }
      style={{
        width: '100%',
        padding: '16px 12px',  // Balanced for bigger feel without breaking text start
        border: 'none',
        fontWeight: 'bold',
        textAlign: 'center',   // Centers the total (pro look)
        boxSizing: 'border-box',
        direction: 'ltr',      // Ensures numbers flow left-to-right, no RTL weirdness
        background: '#ced4da',
      }}
    />
  </td>

  <td style={{ padding: '12px', border: '1px solid #ccc', textAlign:'center' }} colSpan={2}>
    القيمة الإجمالية
  </td>
  <td colSpan={2} style={{ padding: '0', border: '1px solid #ccc' }}>
    <input
      name="total_with_tax"
      value={formData.total_with_tax || ''}
      onChange={handleChange}      
      
      style={{
        width: '100%',
        padding: '16px 12px',  // Balanced for bigger feel without breaking text start
        border: 'none',
        fontWeight: 'bold',
        textAlign: 'center',   // Centers the total (pro look)
        boxSizing: 'border-box',
        direction: 'ltr',      // Ensures numbers flow left-to-right, no RTL weirdness
      }}
    />
  </td>
  <td colSpan={1} style={{ border: '1px solid #ccc' }}></td>
</tr>

  </tbody>
</table>

<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', tableLayout: 'fixed' }}>
  <thead>
    {/* First header row */}
    <tr style={{ background: '#dee2e6'}}>
  
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '10%'  // Wider for notes
        }}
      >
        
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '30%'  // Wider for notes
        }}
      >
       المستلم
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '30%'  // Wider for notes
        }}
      >
       العضو الفني
      </th>
      <th
        rowSpan={2}
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
          width: '30%'  // Wider for notes
        }}
      > الرئيس المسؤول
      </th>
      </tr>
</thead>
  <tbody>
    {/* Row 1 */}
    <tr>
     <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name=""  value="الاسم" readOnly
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item13_1" value={formData.item13_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item13_2" value={formData.item13_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item13_3" value={formData.item13_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

<tr>
     <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name=""  value="التوقيع" readOnly
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item14_1" value={formData.item14_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item14_2" value={formData.item14_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item14_3" value={formData.item14_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>

<tr>
     <td style={{ padding: '0', border: '1px solid #ccc'}}>
        <input name=""  value="التاريخ" readOnly
          style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
      </td>
      <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item15_1" value={formData.item15_1 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item15_2" value={formData.item15_2 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
  <td style={{ padding: '0', border: '1px solid #ccc'}}>
    <input name="item15_3" value={formData.item15_3 || ''} onChange={handleChange}
      style={{width: '100%', padding: '10px', border: 'none', background: 'white', boxSizing: 'border-box'}}/>
  </td>
</tr>
</tbody>
</table>

{/* Coordinate Editors - Shows only in Edit Mode */}
{editMode && (
  <div style={{
    marginTop: '40px',
    padding: '20px',
    background: '#f0f0f0',
    border: '2px dashed #666',
    borderRadius: '10px',
    maxHeight: '600px',
    overflowY: 'auto',
    display:'none'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>تعديل الإحداثيات (بالمليمتر)</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px' }}>
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row) => 
    [...Array(10)].map((_, i) => {
      const n = i + 1;
      const key = `item${row}_${n}`;
      return (
        <div key={key}>
          <strong>item{row} {n}</strong><br/>
          يسار: <input type="number" step="0.5" value={positions[key].left} onChange={(e) => setPositions({...positions, [key]: {...positions[key], left: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
          أعلى: <input type="number" step="0.5" value={positions[key].top} onChange={(e) => setPositions({...positions, [key]: {...positions[key], top: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
          <br/>
        </div>
      );
    })
  )}

  {/* Special rows 11, 12, 13: only 4 fields each */}
      {[13, 14, 15].map((row) => 
        [...Array(3)].map((_, i) => {  // Only 4 columns
          const n = i + 1;
          const key = `item${row}_${n}`;
          return (
            <div key={key}>
              <strong>item{row} {n}</strong><br/>
              يسار: <input type="number" step="0.5" value={positions[key]?.left ?? 0} onChange={(e) => setPositions({...positions, [key]: {...(positions[key] || {}), left: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              أعلى: <input type="number" step="0.5" value={positions[key]?.top ?? 0} onChange={(e) => setPositions({...positions, [key]: {...(positions[key] || {}), top: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              <br/>
            </div>
          );
        })
      )}

      <div>
              <strong>total with tax</strong><br/>
              يسار: <input type="number" step="0.5" value={positions.total_with_tax.left} onChange={(e) => setPositions({...positions, total_with_tax: {...(positions.total_with_tax || {}), left: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              أعلى: <input type="number" step="0.5" value={positions.total_with_tax.top} onChange={(e) => setPositions({...positions, total_with_tax: {...(positions.total_with_tax|| {}), top: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              <br/>
            </div>

            <div>
              <strong>numt</strong><br/>
              يسار: <input type="number" step="0.5" value={positions.numt.left} onChange={(e) => setPositions({...positions, numt: {...(positions.numt || {}), left: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              أعلى: <input type="number" step="0.5" value={positions.numt.top} onChange={(e) => setPositions({...positions, numt: {...(positions.numt|| {}), top: parseFloat(e.target.value) || 0}})} style={{ width: '80px', margin: '5px' }} />
              <br/>
            </div>

       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
  const key = `p1_${index}`;  // → p1_1, p1_2, ..., p1_11

  return (
    <div key={key}>
      <strong>p1_{index}</strong><br/>
      يسار: <input 
        type="number" 
        step="0.5" 
        value={positions[key]?.left ?? 0} 
        onChange={(e) => setPositions({
          ...positions, 
          [key]: { 
            ...(positions[key] || { top: 0 }), 
            left: parseFloat(e.target.value) || 0 
          }
        })} 
        style={{ width: '80px', margin: '5px' }} 
      />
      أعلى: <input 
        type="number" 
        step="0.5" 
        value={positions[key]?.top ?? 0} 
        onChange={(e) => setPositions({
          ...positions, 
          [key]: { 
            ...(positions[key] || { left: 0 }), 
            top: parseFloat(e.target.value) || 0 
          }
        })} 
        style={{ width: '80px', margin: '5px' }} 
      />
      <br/>
    </div>
  );
})}

</div>
  </div>

  
)}



        </div>
      </div>

      {/* Print Preview */}
      {previewMode && (
                <div style={{ marginTop: '50px', textAlign: 'center', display:'none' }}>

       <div
       className="print-area"
  ref={printRef}
  style={{
    position: 'relative',
    width: '297mm',
    height: '210mm',
    margin: '0 auto',
    background: 'url("/blank-form.jpg") center/cover no-repeat',

    overflow: 'hidden',
    fontSize: '12pt',
    fontWeight: 'bold',
    boxSizing: 'border-box',
  }}
>
  {/* Define how many rows you want to render */}
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((rowNumber) => {
    return [...Array(10)].map((_, i) => {
      const index = i + 1;
      const itemKey = `item${rowNumber}_${index}`;

      return (
        <div
          key={itemKey}
          style={{
            position: 'absolute',
            left: `${positions[itemKey]?.left ?? 0}mm`,
            top: `${positions[itemKey]?.top ?? 0}mm`,
            width: `${positions[itemKey]?.width ?? 50}mm`,
            textAlign: 'right',
            direction: 'ltr',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {formData[itemKey] || ''}
        </div>
      );
    });
  })}

  {/* Additional rows: 13, 14, 15 — only 4 fields each */}
      {[13, 14, 15].map((rowNumber) => {
        return [...Array(3)].map((_, i) => {  // Only 4 columns
          const index = i + 1;
          const itemKey = `item${rowNumber}_${index}`;

          return (
            <div
              key={itemKey}
              style={{
                position: 'absolute',
                left: `${positions[itemKey]?.left ?? 0}mm`,
                top: `${positions[itemKey]?.top ?? 0}mm`,
                width: `${positions[itemKey]?.width ?? 50}mm`,
                textAlign: 'right',
                direction: 'ltr',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {formData[itemKey] || ''}
            </div>
          );
        });
      })}

      <div
           
              style={{
                position: 'absolute',
                left: `${positions.total_with_tax?.left ?? 0}mm`,
                top: `${positions.total_with_tax?.top ?? 0}mm`,
                width: `${positions.total_with_tax?.width ?? 50}mm`,
                textAlign: 'right',
                direction: 'ltr',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {formData.total_with_tax || ''}


            </div>

            
      <div
           
              style={{
                position: 'absolute',
                left: `${positions.numt?.left ?? 0}mm`,
                top: `${positions.numt?.top ?? 0}mm`,
                width: `${positions.numt?.width ?? 50}mm`,
                textAlign: 'right',
                direction: 'ltr',
                whiteSpace: 'nowrap',
                overflow: '',
              }}
            >
              {formData.numt || ''}


            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
  const itemKey = `p1_${index}`;

  return (
    <div
      key={itemKey}
      style={{
        position: 'absolute',
        left: `${positions[itemKey]?.left ?? 0}mm`,
        top: `${positions[itemKey]?.top ?? 0}mm`,
        width: `${positions[itemKey]?.width ?? 50}mm`,
        textAlign: 'right',
        direction: 'ltr',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      {formData[itemKey] || ''}
    </div>
  );
})}

</div>
</div>
      )}

      

      {/* Print Buttons */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={handlePrintAndSave} style={{ padding: '20px 50px', fontSize: '22px', margin: '20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px' }}>
طباعة وحفظ تلقائي
        </button>
 


      </div>
    

      <button
  onClick={() => {
    // Get the saved positions from localStorage
    const savedPositions = localStorage.getItem('Positions15'); // or whatever key you used

    if (!savedPositions) {
      alert('No positions found in localStorage');
      return;
    }

    // Parse it back to object
    const positionsObj = JSON.parse(savedPositions);

    // Create a JSON blob
    const blob = new Blob([JSON.stringify(positionsObj, null, 2)], { type: 'application/json' });

    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.json'; // filename
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  }}
  style={{ padding: '10px 20px', fontSize: '16px', margin: '20px 0', display:'none'}}
>
  Download template.json
</button>

    </div>
  );
};

export default App;