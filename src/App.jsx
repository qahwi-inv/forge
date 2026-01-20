import React, { useRef, useState, useEffect } from 'react';
import { toArabicWord } from 'number-to-arabic-words/dist/index-node.js'
import CryptoJS from 'crypto-js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Basic style (optional)
import requestLetter from '/request_letter.jpg';

const SECRET = 'i-love-girl-ass';

const App = () => {
const [activeForm, setActiveForm] = useState(0); // Current form index (0-6 for 7 forms)
const printRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [formsConfig, setFormsConfig] = useState([]);
const [activeFormId, setActiveFormId] = useState(1);
const [formData, setFormData] = useState({});

  const [activationCode, setActivationCode] = useState('');
  const [machineCode, setMachineCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);


const [tableData, setTableData] = useState({}); // { formId: [{item: '', amount: ''}, ...] }
  const [allFormData, setAllFormData] = useState({}); // { 1: {field1: value}, 2: {...}, ... }
  const [positions, setPositions] = useState({}); // for current form


const initalFormData = {

  p1_1: '', p1_2: '', p1_3: '', 

}
useEffect(() => {
  if (activeFormId) {
    const form = formsConfig.find(f => f.id === activeFormId);
    if (form && form.table?.enabled) {
      // Initialize empty rows if not exist
      if (!tableData[activeFormId]) {
        const initialRows = Array(form.table.defaultRows || 10).fill().map(() => {
          const row = {};
          form.table.rowFields.forEach(key => row[key] = '');
          return row;
        });
        setTableData(prev => ({ ...prev, [activeFormId]: initialRows }));
      }
    }
  }
}, [activeFormId, formsConfig]);
const getBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

useEffect(() => {
    fetch('/forms-config.json')
      .then(r => r.json())
      .then(data => {
        setFormsConfig(data);
        // Initialize empty formData for each form
        const initialData = {};
        data.forEach(form => {
          initialData[form.id] = {};
        });
        setAllFormData(initialData);
      });
  }, []);

  // Load positions when form changes
  useEffect(() => {
    if (activeFormId) {
      const form = formsConfig.find(f => f.id === activeFormId);
      if (form) {
        fetch(form.template)
          .then(r => r.json())
          .then(data => setPositions(data));
      }
    }
  }, [activeFormId, formsConfig]);

  // Updated handleChange: works for any active form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAllFormData(prev => ({
      ...prev,
      [activeFormId]: {
        ...prev[activeFormId],
        [name]: value,
      },
    }));
  };
const handlePrint = async () => {
  const content = printRef.current.innerHTML;
  const url = currentForm.background // your helper

  window.electronAPI.printPortrait({ content, url });
};

const loadForm = (form) => {
  setActiveFormId(form.id);
  setFormData({}); // reset data for new form

  // Load positions (template)
  fetch(form.template)
    .then(r => r.json())
    .then(data => setPositions(data));

  // Optional: pre-fill defaults if any
};

const handleSavePDF = () => {
  const content = printRef.current.outerHTML;
  window.electronAPI.saveAsPDF(content);
};


const UseArabicNumber = (number) => {
  return toArabicWord(number);
};







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



  // Handle change for current form

  const toArabicNumerals = (str) => {
  if (!str) return str;
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (digit) => arabicDigits[digit]);
};

 
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
        url = '/template1.json';
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

console.log(tableData);
const currentForm = formsConfig.find(f => f.id === activeFormId);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', direction: 'ltr', fontSize: '16px', background: '#f8f9fa' }}>
      <div style={{ padding: '30px', fontFamily: 'Arial', direction: 'ltr', fontSize: '16px', background: '#f8f9fa' }}>
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

<div style={{ padding: '30px', fontFamily: 'Arial', direction: 'ltr', fontSize: '16px', background: '' }}>
  <div style={{ 
    display: 'flex', 
    gap: '30px', 
    alignItems: 'flex-start',
    flexWrap: 'wrap'  // Makes it responsive on resize
  }}>
    {/* Dropdown to select form */}
      <select
        value={activeFormId}
        onChange={(e) => setActiveFormId(parseInt(e.target.value))}
        style={{ padding: '10px', fontSize: '18px', marginBottom: '20px' }}
      >
        {formsConfig.map(form => (
          <option key={form.id} value={form.id}>
            {form.name}
          </option>
        ))}
      </select>

      {currentForm && (
        <div>
          <h2>{currentForm.name}</h2>

          {/* Dynamic inputs */}
          {currentForm.fields.map(field => (
            <div key={field.key} style={{ marginBottom: '15px' }}>
              <label>{field.label}</label>
              <input
                name={field.key}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={allFormData[activeFormId]?.[field.key] || ''}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px' }}
              />
            </div>
          ))}

          {/* Optional Table */}
    {currentForm.table?.enabled && (
      <div style={{ marginTop: '30px' }}>
        <h3>جدول البيانات</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {currentForm.table.columns.map(col => (
                <th key={col.key} style={{ border: '1px solid #ccc', padding: '10px' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData[activeFormId]?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {currentForm.table.rowFields.map(key => (
                  <td key={key} style={{ border: '1px solid #ccc' }}>
                    <input
                      value={row[key] || ''}
                      onChange={(e) => {
                        const newRows = [...tableData[activeFormId]];
                        newRows[rowIndex][key] = e.target.value;
                        setTableData(prev => ({ ...prev, [activeFormId]: newRows }));
                      }}
                      style={{ width: '100%', border: 'none', padding: '8px' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add row button */}
        <button onClick={() => {
          const newRow = {};
          currentForm.table.rowFields.forEach(key => newRow[key] = '');
          setTableData(prev => ({
            ...prev,
            [activeFormId]: [...prev[activeFormId], newRow]
          }));
        }}>
          إضافة صف
        </button>
      </div>
    )}

          {/* Preview for current form */}
          <div ref={printRef} style={{
            width: '210mm',
            height: '297mm',
            position: 'relative',
            backgroundImage: `url(${currentForm.background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            margin: '0 auto',
            border: editMode ? '1px solid gray' : 'none',  // only show border when editing
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            {/* Normal fields (non-table) */}
            {currentForm.fields.map(field => (
              <div key={field.key} style={{
                position: 'absolute',
                left: `${positions.normalFields[field.key]?.left || 0}mm`,
                top: `${positions.normalFields[field.key]?.top || 0}mm`,
                fontWeight: 'bold',
                fontSize: '14px', // adjust as needed
                whiteSpace: 'nowrap', // prevents text wrapping in weird places
                color: '#000' // ensure visibility
              }}>
                {allFormData[activeFormId]?.[field.key] || ''}
              </div>
            ))}

            {/* Table cells — only if table enabled */}
            {currentForm.table?.enabled &&
            tableData[activeFormId]?.map((row, rowIndex) =>
              currentForm.table.rowFields.map((key, colIndex) => {
                const cell =
                  positions.table?.cells?.[rowIndex]?.[colIndex];

                if (!cell) return null;

                return (
                  <div
                    key={`${rowIndex}-${key}`}
                    style={{
                      position: 'absolute',
                      left: `${positions.table.startLeft + cell.left}mm`,
                      top: `${positions.table.startTop + cell.top}mm`,
                      fontWeight: 'normal',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                      color: '#000'
                    }}
                  >
                    {row[key] || ''}
                  </div>
                );
              })
            )}

          </div>

      

        <button onClick={handlePrint}>طباعة</button>
      </div>
    )}
{/* Tabs for navigation */}
    </div>



        </div>
      </div>

    </div>
  );
};

export default App;