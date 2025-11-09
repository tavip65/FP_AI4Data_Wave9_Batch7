import React, { useState, useEffect } from 'react';

// --- Opsi untuk Dropdown Kustomisasi ---
// (Diterjemahkan ke Bahasa Indonesia untuk label, tapi value bisa tetap/campur)
const customizationOptions = {
  gender: [
    { value: '', label: 'Pilih Gender' },
    { value: 'a man', label: 'Pria' },
    { value: 'a woman', label: 'Wanita' },
    { value: 'a non-binary person', label: 'Non-Biner' },
  ],
  expression: [
    { value: '', label: 'Pilih Ekspresi' },
    { value: 'neutral expression', label: 'Netral' },
    { value: 'smiling', label: 'Tersenyum' },
    { value: 'laughing', label: 'Tertawa' },
    { value: 'sad expression', label: 'Sedih' },
    { value: 'angry expression', label: 'Marah' },
    { value: 'surprised expression', label: 'Terkejut' },
  ],
  pose: [
    { value: '', label: 'Pilih Pose' },
    { value: 'standing', label: 'Berdiri' },
    { value: 'sitting', label: 'Duduk' },
    { value: 'walking', label: 'Berjalan' },
    { value: 'running', label: 'Berlari' },
    { value: 'lying down', label: 'Berbaring' },
    { value: 'arms crossed', label: 'Lengan Bersilang' },
    { value: 'fashion pose', label: 'Pose Fashion' },
    { value: 'editorial pose', label: 'Pose Editorial' },
    { value: 'runway walking pose', label: 'Pose Runway (Jalan)' },
    { value: 'hands on hips pose', label: 'Pose Tangan di Pinggul' },
    { value: 'looking over shoulder', label: 'Melihat ke Belakang Bahu' },
  ],
  shotType: [
    { value: '', label: 'Pilih Tipe Bidikan' },
    { value: 'full body shot', label: 'Full Body' },
    { value: 'cowboy shot', label: 'Cowboy (Paha ke atas)' },
    { value: 'medium shot', label: 'Medium (Pinggang ke atas)' },
    { value: 'close-up shot', label: 'Close-up' },
    { value: 'extreme close-up', label: 'Extreme Close-up' },
  ],
  cameraAngle: [
    { value: '', label: 'Pilih Sudut Kamera' },
    { value: 'eye-level shot', label: 'Sejajar Mata' },
    { value: 'high-angle shot', label: 'High-angle (Dari atas)' },
    { value: 'low-angle shot', label: 'Low-angle (Dari bawah)' },
    { value: 'dutch angle', label: 'Dutch Angle (Miring)' },
    { value: 'birds-eye view', label: 'Bird\'s-Eye (Tegak lurus)' },
  ],
  background: [
    { value: '', label: 'Pilih Latar' },
    { value: 'solid color background', label: 'Warna Solid' },
    { value: 'studio background', label: 'Studio' },
    { value: 'in a city', label: 'Perkotaan' },
    { value: 'in nature', label: 'Alam (Hutan/Gunung)' },
    { value: 'at the beach', label: 'Pantai' },
    { value: 'in a room', label: 'Dalam Ruangan' },
    { value: 'bokeh background', label: 'Bokeh (Blur)' },
  ],
  artStyle: [
    { value: '', label: 'Pilih Gaya Seni' },
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'anime style', label: 'Anime/Manga' },
    { value: 'disney pixar style', label: 'Disney/Pixar' },
    { value: '3d render', label: '3D Render' },
    { value: 'oil painting', label: 'Lukisan Cat Minyak' },
    { value: 'watercolor painting', label: 'Lukisan Cat Air' },
    { value: 'fantasy art', label: 'Fantasy' },
    { value: 'cyberpunk style', label: 'Cyberpunk' },
  ],
  lighting: [
    { value: '', label: 'Pilih Pencahayaan' },
    { value: 'studio lighting', label: 'Studio' },
    { value: 'natural light', label: 'Cahaya Alami (Siang)' },
    { value: 'cinematic lighting', label: 'Sinematik' },
    { value: 'backlit', label: 'Backlit (Dari belakang)' },
    { value: 'soft lighting', label: 'Cahaya Lembut' },
    { value: 'hard shadows', label: 'Bayangan Tegas' },
    { value: 'neon lighting', label: 'Neon' },
  ],
  detailLevel: [
     { value: '', label: 'Pilih Detail' },
     { value: 'simple', label: 'Simpel' },
     { value: 'moderately detailed', label: 'Cukup Detail' },
     { value: 'highly detailed', label: 'Sangat Detail' },
     { value: '4k', label: '4K' },
     { value: '8k', label: '8K' },
  ],
  colorScheme: [
     { value: '', label: 'Pilih Skema Warna' },
     { value: 'vibrant colors', label: 'Cerah (Vibrant)' },
     { value: 'muted colors', label: 'Redup (Muted)' },
     { value: 'monochrome', label: 'Monokrom' },
     { value: 'pastel colors', label: 'Pastel' },
     { value: 'warm colors', label: 'Warna Hangat' },
     { value: 'cool colors', label: 'Warna Dingin' },
     { value: 'warm color tone', label: 'Tone Hangat' },
     { value: 'cool color tone', label: 'Tone Dingin' },
  ]
};

// --- Komponen Ikon (SVG) ---

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Komponen Utama Aplikasi ---

export default function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [baseDescription, setBaseDescription] = useState('');
  const [customizations, setCustomizations] = useState({
    gender: '',
    expression: '',
    pose: '',
    shotType: '',
    cameraAngle: '',
    background: '',
    artStyle: '',
    lighting: '',
    detailLevel: '',
    colorScheme: '',
  });
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // 1. Meng-handle upload gambar
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // reader.result berisi base64 string
        setBaseDescription(''); // Reset deskripsi lama
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  // 1b. Meng-handle upload gambar WAJAH (baru)
  const handleFaceImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaceImage(reader.result); // Set state gambar wajah
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Memanggil Gemini API untuk analisis gambar
  const generateDescriptionFromImage = async () => {
    if (!uploadedImage) {
      setErrorMessage('Silakan unggah gambar terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setBaseDescription('');

    // Ekstrak data base64 murni dari string
    const base64Data = uploadedImage.split(',')[1];
    
    // Prompt sistem untuk mengarahkan AI
    const systemPrompt = "Analyze the person in this image. Provide a concise, descriptive prompt for an image generation AI. Focus on key visual elements: subject, appearance, clothing, pose, and background. Start with the most prominent feature. Example: 'A woman with long brown hair, wearing a red dress, standing in a forest.'";
    
    const userQuery = "Describe this person for an AI image generator.";

    try {
      const text = await callGeminiAPI(base64Data, userQuery, systemPrompt);
      setBaseDescription(text);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setErrorMessage(error.message || 'Gagal menganalisis gambar. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Helper untuk memanggil Gemini API dengan retry
  const callGeminiAPI = async (base64ImageData, userQuery, systemPrompt, retries = 3, delay = 1000) => {
    const apiKey = ""; // Biarkan kosong, akan diisi oleh environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: userQuery },
            {
              inlineData: {
                mimeType: "image/jpeg", // Asumsi jpeg, bisa juga png
                data: base64ImageData
              }
            }
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
          return result.candidates[0].content.parts[0].text;
        } else {
          console.warn('Unexpected API response structure:', result);
          throw new Error(result.promptFeedback?.blockReason || 'Respon AI tidak valid atau diblokir.');
        }
      } catch (error) {
        if (i === retries - 1) throw error; // Gagal setelah semua retry
        await new Promise(res => setTimeout(res, delay * Math.pow(2, i))); // Exponential backoff
      }
    }
  };


  // 4. Meng-handle perubahan pada dropdown
  const handleCustomizationChange = (key, value) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 5. [useEffect] Membangun prompt akhir setiap kali deskripsi dasar atau kustomisasi berubah
  useEffect(() => {
    // Mulai dengan deskripsi dasar dari AI
    let promptParts = [baseDescription];

    // Tambahkan semua kustomisasi yang dipilih
    // Kita gunakan Object.values untuk mengambil semua nilai yang dipilih
    const customTags = Object.values(customizations).filter(value => value !== '');
    
    promptParts = [...promptParts, ...customTags];

    // Gabungkan semua bagian dengan koma
    // .filter(Boolean) untuk menghapus string kosong (jika baseDescription awalnya kosong)
    setFinalPrompt(promptParts.filter(Boolean).join(', '));
  }, [baseDescription, customizations]);

  // 6. Menyalin prompt ke clipboard
  const copyToClipboard = () => {
    // Fallback untuk iFrame (menggunakan document.execCommand)
    const textArea = document.createElement('textarea');
    textArea.value = finalPrompt;
    textArea.style.position = 'fixed'; // Hindari lompatan layar
    textArea.style.top = '0';
    textArea.style.left = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess('Tersalin!');
      setTimeout(() => setCopySuccess(''), 2000); // Hapus pesan setelah 2 detik
    } catch (err) {
      console.error('Gagal menyalin:', err);
      setCopySuccess('Gagal menyalin.');
    }
    document.body.removeChild(textArea);
  };
  
  // 7. Render dropdown helper
  const renderDropdown = (label, key, options) => (
    <div key={key}>
      <label htmlFor={key} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={key}
        name={key}
        value={customizations[key]}
        onChange={(e) => handleCustomizationChange(key, e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="text-white bg-gray-800">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  // --- JSX Render ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      
      {/* Bagian Atas: Upload dan Analisis */}
      <div className="w-full p-6 flex flex-col border-b border-gray-700">
        
        {/* Blok Judul - Perubahan di sini */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-2 uppercase">
            Generator Prompt dari Gambar
          </h1>
          <p className="text-xl font-medium text-gray-200 mb-1">
            oleh Tavip Ansyori
          </p>
          <p className="text-md font-light text-blue-200">
            Maju Bareng AI for Data Bersama Hacktiv8 - Wave 9 - Batch 7
          </p>
        </div>
        {/* Akhir Blok Judul */}
        
        {/* Grup Upload 2 Kolom (Perubahan di sini) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          
          {/* Kolom 1: Gambar Utama */}
          <div>
            {/* Kotak Preview 1 */}
            <div className="mb-2 rounded-lg border border-gray-700 shadow-lg h-48 flex items-center justify-center bg-gray-800 overflow-hidden">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Preview Utama" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-500 text-sm px-2 text-center">Preview Gambar Utama</span>
              )}
            </div>
            {/* Tombol Upload 1 */}
            <label 
              htmlFor="image-upload" 
              className="w-full inline-flex items-center justify-center px-4 py-3 border border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <UploadIcon />
              <span>{uploadedImage ? 'Ganti Utama' : 'Unggah Utama'}</span>
            </label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </div>

          {/* Kolom 2: Gambar Wajah */}
          <div>
            {/* Kotak Preview 2 */}
            <div className="mb-2 rounded-lg border border-gray-700 shadow-lg h-48 flex items-center justify-center bg-gray-800 overflow-hidden">
              {faceImage ? (
                <img src={faceImage} alt="Preview Wajah" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-500 text-sm px-2 text-center">Preview Gambar Wajah</span>
              )}
            </div>
            {/* Tombol Upload 2 */}
            <label 
              htmlFor="face-image-upload" 
              className="w-full inline-flex items-center justify-center px-4 py-3 border border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <UploadIcon />
              <span>{faceImage ? 'Ganti Wajah' : 'Unggah Wajah (Ops)'}</span>
            </label>
            <input 
              id="face-image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFaceImageUpload} 
            />
          </div>
        </div>
        {/* Akhir Grup Upload 2 Kolom */}

        {/* Tombol Analisis */}
        {uploadedImage && (
          <button
            onClick={generateDescriptionFromImage}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
          >
            {isLoading ? <LoadingSpinner /> : 'Analisis Gambar & Buat Deskripsi'}
          </button>
        )}
        
        {errorMessage && (
            <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded-lg">
                {errorMessage}
            </div>
        )}

        {/* Deskripsi Dasar */}
        <div className="mt-6">
          <label htmlFor="base-description" className="block text-lg font-semibold text-gray-300 mb-2">
            Deskripsi Dasar (Bisa Diedit)
          </label>
          <textarea
            id="base-description"
            // Hapus 'readOnly' agar bisa diedit
            value={baseDescription}
            onChange={(e) => setBaseDescription(e.target.value)} // Tambahkan ini
            placeholder={isLoading ? "Menganalisis gambar..." : "Deskripsi dasar dari AI akan muncul di sini..."}
            className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bagian Bawah: Kustomisasi dan Hasil */}
      <div className="w-full p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Kustomisasi Prompt</h2>
        
        {/* Grid Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {renderDropdown('Gender', 'gender', customizationOptions.gender)}
          {renderDropdown('Ekspresi', 'expression', customizationOptions.expression)}
          {renderDropdown('Pose', 'pose', customizationOptions.pose)}
          {renderDropdown('Tipe Bidikan', 'shotType', customizationOptions.shotType)}
          {renderDropdown('Sudut Kamera', 'cameraAngle', customizationOptions.cameraAngle)}
          {renderDropdown('Latar Belakang', 'background', customizationOptions.background)}
          {renderDropdown('Gaya Seni', 'artStyle', customizationOptions.artStyle)}
          {renderDropdown('Pencahayaan', 'lighting', customizationOptions.lighting)}
          {renderDropdown('Tingkat Detail', 'detailLevel', customizationOptions.detailLevel)}
          {renderDropdown('Skema Warna', 'colorScheme', customizationOptions.colorScheme)}
        </div>

        {/* Prompt Akhir */}
        <div className="flex-grow flex flex-col">
          <label htmlFor="final-prompt" className="block text-lg font-semibold text-gray-300 mb-2">
            Prompt Akhir (Siap Digunakan)
          </label>
          <textarea
            id="final-prompt"
            readOnly
            value={finalPrompt}
            placeholder="Prompt akhir yang digabungkan akan muncul di sini..."
            className="w-full flex-grow p-4 bg-gray-950 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg leading-relaxed"
          />
          <button
            onClick={copyToClipboard}
            disabled={!finalPrompt}
            className="w-full mt-4 flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
          >
            <CopyIcon />
            {copySuccess || 'Salin Prompt'}
          </button>
        </div>
      </div>

    </div>
  );
}