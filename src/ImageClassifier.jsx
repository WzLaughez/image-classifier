import React, { useState, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import { Camera, Upload, Recycle, Info } from 'lucide-react';

const MODEL_URL = '../tm-my-image-model/';

const plasticInfo = {
  HDPE: {
    pengertian: "High-Density Polyethylene (HDPE) adalah plastik termoplastik yang tahan lama, kuat, dan tahan terhadap bahan kimia serta sinar UV. Sering digunakan dalam produk dengan umur panjang.",
    penanganan: "Dapat didaur ulang dengan efisien. Bersihkan dari sisa makanan atau cairan sebelum dibuang ke tempat sampah daur ulang khusus HDPE.",
    simbol: "♴ (Kode #2)",
    contohProduk: ["Botol susu", "Galon air", "Kemasan deterjen", "Wadah pembersih", "Pipa air", "Tas belanja reusable", "Ember", "Container makanan besar"],
    tingkatDaurUlang: "Tinggi – mudah diolah kembali dan banyak digunakan untuk produk daur ulang seperti bangku taman dan talang air.",
    catatan: "Aman untuk makanan dan minuman, tidak mengandung BPA.",
    karakteristikFisik: {
      densitas: "0.93-0.97 g/cm³",
      titikLeleh: "120-130°C",
      warna: "Biasanya putih susu atau berwarna",
      tekstur: "Keras, kaku, tahan benturan"
    },
    dampakLingkungan: {
      biodegradable: false,
      waktuUrai: "450-1000 tahun",
      emisiKarbon: "1.8 kg CO2/kg produk",
      alternatif: ["Botol kaca", "Wadah stainless steel", "Kemasan kertas berlapis"]
    },
    ekonomiDaurUlang: {
      hargaKilogram: "Rp 3.000-5.000",
      prosesRecycling: "Pencucian → Pemotongan → Peleburan → Pelletizing → Produk baru",
      produkDaurUlang: ["Bangku taman", "Pot tanaman", "Pipa drainase", "Tas belanja"]
    }
  },
  
  PET: {
    pengertian: "Polyethylene Terephthalate (PET) adalah plastik transparan, ringan, dan kuat yang banyak digunakan untuk kemasan makanan dan minuman karena sifat kedap gas dan kelembapannya.",
    penanganan: "Sangat mudah didaur ulang. Bilas sebelum dibuang. Jangan gunakan ulang untuk air minum karena potensi kontaminasi.",
    simbol: "♳ (Kode #1)",
    contohProduk: ["Botol air mineral", "Botol minuman ringan", "Kemasan makanan siap saji", "Wadah minyak goreng", "Botol sampo", "Kemasan obat cair", "Wadah selai"],
    tingkatDaurUlang: "Sangat tinggi – menjadi prioritas dalam program daur ulang karena nilai ekonomisnya.",
    catatan: "Cocok untuk satu kali pakai. Daur ulang dapat menghasilkan serat tekstil (seperti fleece).",
    karakteristikFisik: {
      densitas: "1.33-1.45 g/cm³",
      titikLeleh: "245-265°C",
      warna: "Transparan jernih",
      tekstur: "Ringan, kuat, fleksibel"
    },
    dampakLingkungan: {
      biodegradable: false,
      waktuUrai: "400-1000 tahun",
      emisiKarbon: "2.3 kg CO2/kg produk",
      alternatif: ["Botol kaca", "Kemasan aluminium", "Kemasan kertas tetra pak"]
    },
    ekonomiDaurUlang: {
      hargaKilogram: "Rp 4.000-6.000",
      prosesRecycling: "Sortir → Pencucian → Pemotongan → Hot wash → Pelletizing → Spinning",
      produkDaurUlang: ["Serat polyester", "Karpet", "Jaket fleece", "Tas", "Botol baru"]
    }
  },
  
  PP: {
    pengertian: "Polypropylene (PP) adalah plastik tahan panas dan tahan benturan yang banyak digunakan untuk peralatan makanan, kemasan obat, dan alat medis.",
    penanganan: "Dapat didaur ulang, namun tidak semua fasilitas mendukung. Cek simbol dan aturan lokal.",
    simbol: "♷ (Kode #5)",
    contohProduk: ["Wadah microwave", "Sedotan", "Tutup botol", "Popok sekali pakai", "Kantung saus", "Gelas plastik", "Container makanan", "Kemasan yogurt"],
    tingkatDaurUlang: "Sedang – dapat diproses di fasilitas tertentu dan berguna untuk produk otomotif atau kontainer.",
    catatan: "Aman digunakan untuk makanan panas. Tidak mengandung BPA.",
    karakteristikFisik: {
      densitas: "0.85-0.92 g/cm³",
      titikLeleh: "160-175°C",
      warna: "Bervariasi, sering transparan atau berwarna",
      tekstur: "Fleksibel, tahan panas, ringan"
    },
    dampakLingkungan: {
      biodegradable: false,
      waktuUrai: "20-30 tahun",
      emisiKarbon: "1.9 kg CO2/kg produk",
      alternatif: ["Wadah kaca", "Stainless steel", "Bambu", "Kertas berlapis lilin"]
    },
    ekonomiDaurUlang: {
      hargaKilogram: "Rp 2.500-4.000",
      prosesRecycling: "Sortir warna → Pencucian → Pemotongan → Peleburan → Granulasi",
      produkDaurUlang: ["Komponen otomotif", "Furniture outdoor", "Karpet", "Wadah industri"]
    }
  },
  
  PS: {
    pengertian: "Polystyrene (PS) adalah plastik ringan dan rapuh, sering dalam bentuk busa (styrofoam), digunakan untuk kemasan makanan dan isolasi.",
    penanganan: "Sulit didaur ulang dan seringkali berakhir di tempat pembuangan. Sebaiknya dihindari.",
    simbol: "♸ (Kode #6)",
    contohProduk: ["Styrofoam", "Cangkir kopi sekali pakai", "Kemasan mie instan", "Wadah makanan cepat saji", "Kotak telur", "Kemasan elektronik", "Isolasi bangunan"],
    tingkatDaurUlang: "Rendah – tidak banyak fasilitas yang menerima PS karena biaya dan volume daur ulang tidak efisien.",
    catatan: "Bisa mengeluarkan bahan kimia berbahaya saat dipanaskan. Hindari kontak langsung dengan makanan panas.",
    karakteristikFisik: {
      densitas: "0.96-1.05 g/cm³ (solid), 0.015-0.05 g/cm³ (foam)",
      titikLeleh: "240°C",
      warna: "Putih (foam), transparan (solid)",
      tekstur: "Ringan, rapuh, isolator baik"
    },
    dampakLingkungan: {
      biodegradable: false,
      waktuUrai: "500+ tahun",
      emisiKarbon: "3.2 kg CO2/kg produk",
      alternatif: ["Kemasan kertas", "Kemasan bambu", "Wadah stainless steel", "Kemasan biodegradable"]
    },
    ekonomiDaurUlang: {
      hargaKilogram: "Rp 1.000-2.000",
      prosesRecycling: "Sangat terbatas - hanya fasilitas khusus",
      produkDaurUlang: ["Isolasi bangunan", "Frame foto", "Penggaris", "Komponen dekoratif"]
    }
  }
};

const ImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [inputMode, setInputMode] = useState('');
  
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // Load model once
  React.useEffect(() => {
    const load = async () => {
      const loadedModel = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
      setModel(loadedModel);
    };
    load();
  }, []);

  // Camera handling
    const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (err) {
      alert('Camera access denied or not available');
      console.error(err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  // Handle image upload from camera or file input
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    setImageUrl(imageDataUrl);
    stopCamera(); // optional: stop camera after capture
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
      setPredictions([]);
      setDescription(null);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    if (model && imageRef.current) {
      const prediction = await model.predict(imageRef.current);
      setPredictions(prediction);
      stopCamera(); // stop camera if using it
      const topPrediction = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      if (plasticInfo[topPrediction.className]) {
        setDescription(plasticInfo[topPrediction.className]);
      } else {
        setDescription(null);
      }
      if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null; // ✅ Fully release video
    }
    }
  };

    React.useEffect(() => {
    if (inputMode !== 'camera') {
      stopCamera();
    }
  }, [inputMode]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Plastic Classifier</h1>
                <p className="text-sm text-gray-600">Identifikasi jenis plastik</p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Cara Menggunakan:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Ambil foto atau upload gambar plastik</li>
                <li>• Tekan tombol "Prediksi" untuk mengetahui jenis plastik</li>
                <li>• Dapatkan informasi cara penanganan yang tepat</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => {setInputMode('camera'); startCamera();}}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Camera className="w-5 h-5 mr-2" />
            Gunakan Kamera
          </button>
          <button
            onClick={() => setInputMode('upload')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Gambar
          </button>
        </div>

        {inputMode === 'camera' && (
          <>
          <video
            ref={videoRef}
            autoPlay
            className="w-full max-w-sm rounded shadow mb-4"
            style={{ display: cameraActive ? 'block' : 'none' }}
          />
          <button
            onClick={captureImage}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mb-4"
          >
            Capture Photo
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
        )}
        
        {inputMode === 'upload' && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer"
          />
        )}

        {imageUrl && (
          <>
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Captured or uploaded"
              className="max-w-xs h-auto mb-4 rounded shadow"
            />
            <button
              onClick={classifyImage}
              className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Prediksi
            </button>
          </>
        )}
    
        <div className="w-full max-w-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Predictions:</h3>
          {predictions.length > 0 ? (
            <>
              <ul className="list-disc pl-6 text-gray-700">
                {predictions.map((p, i) => (
                  <li key={i} className="text-lg mb-2">
                    <span className="font-medium">{p.className}</span> - {Math.round(p.probability * 100)}%
                  </li>
                ))}
              </ul>
              {description && (
                <div className="mt-6 bg-white p-6 rounded shadow text-gray-800">
                  <h4 className="text-xl font-semibold mb-2">Pengertian:</h4>
                  <p className="mb-4">{description.pengertian}</p>
                  <h4 className="text-xl font-semibold mb-2">Penanganan:</h4>
                  <p>{description.penanganan}</p>
                  <h4 className="text-xl font-semibold mt-4">Simbol:</h4>
                  <p className="text-lg font-bold">{description.simbol}</p>
                  <h4 className="text-xl font-semibold mt-4">Contoh Produk:</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    {description.contohProduk.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h4 className="text-xl font-semibold mt-4">Tingkat Daur Ulang:</h4>
                  <p>{description.tingkatDaurUlang}</p>
                  <h4 className="text-xl font-semibold mt-4">Catatan:</h4>
                  <p>{description.catatan}</p>
                  <h4 className="text-xl font-semibold mt-4">Karakteristik Fisik:</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Densitas: {description.karakteristikFisik.densitas}</li>
                    <li>Titik Leleh: {description.karakteristikFisik.titikLeleh}</li>
                    <li>Warna: {description.karakteristikFisik.warna}</li>
                    <li>Tekstur: {description.karakteristikFisik.tekstur}</li>
                  </ul>
                  <h4 className="text-xl font-semibold mt-4">Dampak Lingkungan:</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Biodegradable: {description.dampakLingkungan.biodegradable ? 'Ya' : 'Tidak'}</li>
                    <li>Waktu Urai: {description.dampakLingkungan.waktuUrai}</li>
                    <li>Emisi Karbon: {description.dampakLingkungan.emisiKarbon}</li>
                    <li>Alternatif: {description.dampakLingkungan.alternatif.join(', ')}</li>
                  </ul>
                  <h4 className="text-xl font-semibold mt-4">Ekonomi Daur Ulang:</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Harga Kilogram: {description.ekonomiDaurUlang.hargaKilogram}</li>
                    <li>Proses Recycling: {description.ekonomiDaurUlang.prosesRecycling}</li>
                    <li>Produk Daur Ulang: {description.ekonomiDaurUlang.produkDaurUlang.join(', ')}</li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-lg text-gray-500">No predictions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageClassifier;
