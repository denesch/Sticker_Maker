import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedDiscount, setSelectedDiscount] = useState('-50%');
  const [selectedSize, setSelectedSize] = useState('40');
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedPaperType, setSelectedPaperType] = useState('round-40');
  const [selectedUnit, setSelectedUnit] = useState('mm');
  const [borderEnabled, setBorderEnabled] = useState(true);
  const [borderColor, setBorderColor] = useState('white');
  const [borderThickness, setBorderThickness] = useState('2');
  
  const stickerRef = useRef(null);

  const shapes = [
    { id: 'round', name: 'Round', icon: '●' },
    { id: 'square', name: 'Square', icon: '■' },
    { id: 'rectangle', name: 'Rectangle', icon: '▬' },
    { id: 'star', name: 'Star', icon: '★' },
    { id: 'burst', name: 'Burst', icon: '💥' }
  ];

  // EU standard discount percentages commonly used in European retail
  const discounts = ['-5%', '-10%', '-15%', '-20%', '-25%', '-30%', '-35%', '-40%', '-45%', '-50%', '-55%', '-60%', '-65%', '-70%', '-75%', '-80%', '-85%', '-90%', '-95%'];

  const colors = [
    { id: 'red', name: 'Red', bg: 'bg-red-500', text: 'text-white' },
    { id: 'blue', name: 'Blue', bg: 'bg-blue-500', text: 'text-white' },
    { id: 'green', name: 'Green', bg: 'bg-green-500', text: 'text-white' },
    { id: 'orange', name: 'Orange', bg: 'bg-orange-500', text: 'text-white' },
    { id: 'purple', name: 'Purple', bg: 'bg-purple-500', text: 'text-white' },
    { id: 'yellow', name: 'Yellow', bg: 'bg-yellow-400', text: 'text-black' },
    { id: 'black', name: 'Black', bg: 'bg-black', text: 'text-white' },
    { id: 'pink', name: 'Pink', bg: 'bg-pink-500', text: 'text-white' },
    { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-500', text: 'text-white' },
    { id: 'teal', name: 'Teal', bg: 'bg-teal-500', text: 'text-white' }
  ];

  const borderColors = [
    { id: 'white', name: 'White', color: '#ffffff' },
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'gold', name: 'Gold', color: '#ffd700' },
    { id: 'silver', name: 'Silver', color: '#c0c0c0' },
    { id: 'transparent', name: 'None', color: 'transparent' }
  ];

  const units = [
    { id: 'mm', name: 'Millimeters (mm)', factor: 1 },
    { id: 'cm', name: 'Centimeters (cm)', factor: 0.1 },
    { id: 'in', name: 'Inches (in)', factor: 0.0393701 }
  ];

  // EU Standard sticker sizes in millimeters (based on European retail standards)
  const sizesOptions = {
    round: [
      { id: '15', mm: 15 }, { id: '20', mm: 20 }, { id: '25', mm: 25 },
      { id: '30', mm: 30 }, { id: '35', mm: 35 }, { id: '40', mm: 40 },
      { id: '45', mm: 45 }, { id: '50', mm: 50 }, { id: '55', mm: 55 },
      { id: '60', mm: 60 }, { id: '65', mm: 65 }, { id: '70', mm: 70 },
      { id: '80', mm: 80 }, { id: '90', mm: 90 }, { id: '100', mm: 100 }
    ],
    square: [
      { id: '15', mm: 15 }, { id: '20', mm: 20 }, { id: '25', mm: 25 },
      { id: '30', mm: 30 }, { id: '35', mm: 35 }, { id: '40', mm: 40 },
      { id: '45', mm: 45 }, { id: '50', mm: 50 }, { id: '60', mm: 60 },
      { id: '70', mm: 70 }, { id: '80', mm: 80 }, { id: '100', mm: 100 }
    ],
    rectangle: [
      { id: '30x20', width: 30, height: 20 }, { id: '40x25', width: 40, height: 25 },
      { id: '50x30', width: 50, height: 30 }, { id: '60x40', width: 60, height: 40 },
      { id: '70x45', width: 70, height: 45 }, { id: '80x50', width: 80, height: 50 },
      { id: '90x50', width: 90, height: 50 }, { id: '100x60', width: 100, height: 60 },
      { id: '120x80', width: 120, height: 80 }, { id: '150x100', width: 150, height: 100 }
    ],
    star: [
      { id: '30', mm: 30 }, { id: '40', mm: 40 }, { id: '50', mm: 50 },
      { id: '60', mm: 60 }, { id: '70', mm: 70 }, { id: '80', mm: 80 }
    ],
    burst: [
      { id: '40', mm: 40 }, { id: '50', mm: 50 }, { id: '60', mm: 60 },
      { id: '70', mm: 70 }, { id: '80', mm: 80 }, { id: '90', mm: 90 }
    ]
  };

  // EU Standard sticker roll types (common in European retail)
  const paperTypes = [
    { id: 'round-20', name: '20mm Round Roll', type: 'round', size: '20', description: 'Small price tags' },
    { id: 'round-25', name: '25mm Round Roll', type: 'round', size: '25', description: 'Compact labels' },
    { id: 'round-30', name: '30mm Round Roll', type: 'round', size: '30', description: 'Standard small' },
    { id: 'round-35', name: '35mm Round Roll', type: 'round', size: '35', description: 'Medium labels' },
    { id: 'round-40', name: '40mm Round Roll', type: 'round', size: '40', description: 'Popular size' },
    { id: 'round-50', name: '50mm Round Roll', type: 'round', size: '50', description: 'Large discount' },
    { id: 'round-60', name: '60mm Round Roll', type: 'round', size: '60', description: 'Extra large' },
    { id: 'round-70', name: '70mm Round Roll', type: 'round', size: '70', description: 'Supermarket' },
    { id: 'rect-30x20', name: '30×20mm Rectangle Roll', type: 'rectangle', size: '30x20', description: 'Small rect' },
    { id: 'rect-40x25', name: '40×25mm Rectangle Roll', type: 'rectangle', size: '40x25', description: 'Standard rect' },
    { id: 'rect-50x30', name: '50×30mm Rectangle Roll', type: 'rectangle', size: '50x30', description: 'Medium rect' },
    { id: 'rect-70x45', name: '70×45mm Rectangle Roll', type: 'rectangle', size: '70x45', description: 'Large rect' },
    { id: 'square-25', name: '25×25mm Square Roll', type: 'square', size: '25', description: 'Small square' },
    { id: 'square-30', name: '30×30mm Square Roll', type: 'square', size: '30', description: 'Standard square' },
    { id: 'square-40', name: '40×40mm Square Roll', type: 'square', size: '40', description: 'Large square' },
    { id: 'square-50', name: '50×50mm Square Roll', type: 'square', size: '50', description: 'XL square' }
  ];

  const getCurrentColor = () => colors.find(c => c.id === selectedColor);
  const getCurrentUnit = () => units.find(u => u.id === selectedUnit);
  const getCurrentBorderColor = () => borderColors.find(b => b.id === borderColor);

  const convertSize = (mm) => {
    const unit = getCurrentUnit();
    const converted = mm * unit.factor;
    return selectedUnit === 'mm' ? Math.round(converted) : Math.round(converted * 100) / 100;
  };

  const getSizeDisplay = (sizeObj) => {
    if (selectedShape === 'rectangle') {
      const width = convertSize(sizeObj.width);
      const height = convertSize(sizeObj.height);
      return `${width}×${height} ${selectedUnit}`;
    } else {
      const size = convertSize(sizeObj.mm);
      return `${size} ${selectedUnit}`;
    }
  };

  const renderSticker = (size = 120, isPreview = true, exportMode = false) => {
    const currentColor = getCurrentColor();
    const currentBorderColor = getCurrentBorderColor();
    const sizeData = selectedShape === 'rectangle' 
      ? sizesOptions[selectedShape].find(s => s.id === selectedSize)
      : sizesOptions[selectedShape]?.find(s => s.id === selectedSize);
    
    if (!sizeData) return null;

    const sizeMm = selectedShape === 'rectangle' ? Math.max(sizeData.width, sizeData.height) : sizeData.mm;
    const actualSize = isPreview ? size : (sizeMm * 3.78); // 3.78 pixels per mm at 96 DPI
    const borderWidth = borderEnabled ? parseInt(borderThickness) : 0;

    const stickerStyle = {
      width: selectedShape === 'rectangle' 
        ? `${actualSize * (sizeData.width / sizeData.height)}px`
        : `${actualSize}px`,
      height: `${actualSize}px`,
      fontSize: `${actualSize * 0.2}px`,
      lineHeight: '1',
      border: borderEnabled ? `${borderWidth}px solid ${currentBorderColor.color}` : 'none'
    };

    const baseClasses = `${currentColor.bg} ${currentColor.text} flex flex-col items-center justify-center font-bold relative overflow-hidden`;
    
    const getShapeClasses = () => {
      switch(selectedShape) {
        case 'round': return 'rounded-full';
        case 'star': return 'star-shape';
        case 'burst': return 'burst-shape';
        default: return '';
      }
    };

    if (selectedShape === 'star') {
      return (
        <div className="relative inline-block" style={{ width: `${actualSize}px`, height: `${actualSize}px` }}>
          <svg 
            width={actualSize} 
            height={actualSize} 
            viewBox="0 0 100 100" 
            className="absolute inset-0"
            ref={exportMode ? stickerRef : null}
          >
            <defs>
              <polygon 
                id="star" 
                points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                fill={currentColor.bg.includes('yellow') ? '#facc15' : 
                      currentColor.bg.includes('red') ? '#ef4444' :
                      currentColor.bg.includes('blue') ? '#3b82f6' :
                      currentColor.bg.includes('green') ? '#22c55e' :
                      currentColor.bg.includes('orange') ? '#f97316' :
                      currentColor.bg.includes('purple') ? '#a855f7' :
                      currentColor.bg.includes('black') ? '#000000' :
                      currentColor.bg.includes('pink') ? '#ec4899' :
                      currentColor.bg.includes('indigo') ? '#6366f1' :
                      currentColor.bg.includes('teal') ? '#14b8a6' : '#ef4444'}
                stroke={borderEnabled ? currentBorderColor.color : 'none'}
                strokeWidth={borderWidth}
              />
            </defs>
            <use href="#star" />
            <text 
              x="50" 
              y="45" 
              textAnchor="middle" 
              fill={currentColor.text === 'text-white' ? 'white' : 'black'}
              fontSize={actualSize * 0.25}
              fontWeight="bold"
            >
              {selectedDiscount}
            </text>
            <text 
              x="50" 
              y="65" 
              textAnchor="middle" 
              fill={currentColor.text === 'text-white' ? 'white' : 'black'}
              fontSize={actualSize * 0.12}
              fontWeight="bold"
            >
              OFF
            </text>
          </svg>
        </div>
      );
    }

    if (selectedShape === 'burst') {
      return (
        <div className="relative inline-block" style={{ width: `${actualSize}px`, height: `${actualSize}px` }}>
          <svg 
            width={actualSize} 
            height={actualSize} 
            viewBox="0 0 100 100" 
            className="absolute inset-0"
            ref={exportMode ? stickerRef : null}
          >
            <defs>
              <polygon 
                id="burst" 
                points="50,0 60,20 80,10 70,30 100,25 75,45 95,65 70,60 80,85 55,70 50,100 45,70 20,85 30,60 5,65 25,45 0,25 30,30 20,10 40,20"
                fill={currentColor.bg.includes('yellow') ? '#facc15' : 
                      currentColor.bg.includes('red') ? '#ef4444' :
                      currentColor.bg.includes('blue') ? '#3b82f6' :
                      currentColor.bg.includes('green') ? '#22c55e' :
                      currentColor.bg.includes('orange') ? '#f97316' :
                      currentColor.bg.includes('purple') ? '#a855f7' :
                      currentColor.bg.includes('black') ? '#000000' :
                      currentColor.bg.includes('pink') ? '#ec4899' :
                      currentColor.bg.includes('indigo') ? '#6366f1' :
                      currentColor.bg.includes('teal') ? '#14b8a6' : '#ef4444'}
                stroke={borderEnabled ? currentBorderColor.color : 'none'}
                strokeWidth={borderWidth}
              />
            </defs>
            <use href="#burst" />
            <text 
              x="50" 
              y="45" 
              textAnchor="middle" 
              fill={currentColor.text === 'text-white' ? 'white' : 'black'}
              fontSize={actualSize * 0.2}
              fontWeight="bold"
            >
              {selectedDiscount}
            </text>
            <text 
              x="50" 
              y="60" 
              textAnchor="middle" 
              fill={currentColor.text === 'text-white' ? 'white' : 'black'}
              fontSize={actualSize * 0.1}
              fontWeight="bold"
            >
              OFF
            </text>
          </svg>
        </div>
      );
    }

    // Round, Square, Rectangle shapes
    return (
      <div 
        className={`${baseClasses} ${getShapeClasses()}`}
        style={stickerStyle}
        ref={exportMode ? stickerRef : null}
      >
        <div className="text-center">
          <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
          <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
        </div>
        {!borderEnabled && selectedShape === 'round' && (
          <div className="absolute inset-1 rounded-full border-2 border-white opacity-30"></div>
        )}
        {!borderEnabled && selectedShape === 'square' && (
          <>
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white opacity-50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white opacity-50"></div>
          </>
        )}
        {!borderEnabled && selectedShape === 'rectangle' && (
          <>
            <div className="absolute left-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
            <div className="absolute right-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
          </>
        )}
      </div>
    );
  };

  const generateSVG = () => {
    const currentColor = getCurrentColor();
    const currentBorderColor = getCurrentBorderColor();
    const sizeData = selectedShape === 'rectangle' 
      ? sizesOptions[selectedShape].find(s => s.id === selectedSize)
      : sizesOptions[selectedShape]?.find(s => s.id === selectedSize);
    
    if (!sizeData) return '';

    const width = selectedShape === 'rectangle' ? sizeData.width * 3.78 : sizeData.mm * 3.78;
    const height = selectedShape === 'rectangle' ? sizeData.height * 3.78 : sizeData.mm * 3.78;
    const borderWidth = borderEnabled ? parseInt(borderThickness) : 0;

    const colorMap = {
      'bg-red-500': '#ef4444', 'bg-blue-500': '#3b82f6', 'bg-green-500': '#22c55e',
      'bg-orange-500': '#f97316', 'bg-purple-500': '#a855f7', 'bg-yellow-400': '#facc15',
      'bg-black': '#000000', 'bg-pink-500': '#ec4899', 'bg-indigo-500': '#6366f1', 'bg-teal-500': '#14b8a6'
    };

    const fillColor = colorMap[currentColor.bg] || '#ef4444';
    const textColor = currentColor.text === 'text-white' ? 'white' : 'black';

    let shape;
    if (selectedShape === 'round') {
      const r = (Math.min(width, height) - borderWidth * 2) / 2;
      shape = `<circle cx="${width/2}" cy="${height/2}" r="${r}" fill="${fillColor}" stroke="${borderEnabled ? currentBorderColor.color : 'none'}" stroke-width="${borderWidth}"/>`;
    } else if (selectedShape === 'star') {
      const points = "50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35";
      shape = `<polygon points="${points}" fill="${fillColor}" stroke="${borderEnabled ? currentBorderColor.color : 'none'}" stroke-width="${borderWidth}" transform="scale(${width/100},${height/100})"/>`;
    } else if (selectedShape === 'burst') {
      const points = "50,0 60,20 80,10 70,30 100,25 75,45 95,65 70,60 80,85 55,70 50,100 45,70 20,85 30,60 5,65 25,45 0,25 30,30 20,10 40,20";
      shape = `<polygon points="${points}" fill="${fillColor}" stroke="${borderEnabled ? currentBorderColor.color : 'none'}" stroke-width="${borderWidth}" transform="scale(${width/100},${height/100})"/>`;
    } else {
      shape = `<rect x="${borderWidth/2}" y="${borderWidth/2}" width="${width - borderWidth}" height="${height - borderWidth}" fill="${fillColor}" stroke="${borderEnabled ? currentBorderColor.color : 'none'}" stroke-width="${borderWidth}"/>`;
    }

    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${shape}
        <text x="${width/2}" y="${height/2 - 10}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-weight="bold" font-size="${height * 0.35}">${selectedDiscount}</text>
        <text x="${width/2}" y="${height/2 + height * 0.15}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-weight="bold" font-size="${height * 0.12}">OFF</text>
      </svg>
    `;
  };

  const downloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eu-discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}-${selectedSize}mm.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(stickerRef.current, {
      backgroundColor: null,
      scale: 3
    });
    
    const sizeData = selectedShape === 'rectangle' 
      ? sizesOptions[selectedShape].find(s => s.id === selectedSize)
      : sizesOptions[selectedShape]?.find(s => s.id === selectedSize);
    
    const width = selectedShape === 'rectangle' ? sizeData.width : sizeData.mm;
    const height = selectedShape === 'rectangle' ? sizeData.height : sizeData.mm;
    
    // Convert mm to inches for PDF
    const widthInches = width * 0.0393701;
    const heightInches = height * 0.0393701;
    
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'in',
      format: [widthInches, heightInches]
    });
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, widthInches, heightInches);
    pdf.save(`eu-discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}-${selectedSize}mm.pdf`);
  };

  const downloadPNG = async () => {
    const canvas = await html2canvas(stickerRef.current, {
      backgroundColor: null,
      scale: 3
    });
    
    const link = document.createElement('a');
    link.download = `eu-discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}-${selectedSize}mm.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePrintLayout = () => {
    // EU A4 paper format optimization
    const stickersPerRow = selectedShape === 'rectangle' ? 3 : 4;
    const rows = 6;
    const totalStickers = stickersPerRow * rows;

    return Array.from({ length: totalStickers }, (_, i) => (
      <div key={i} className="print-sticker-item flex items-center justify-center">
        {renderSticker(120, false)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">EU Professional Discount Sticker Maker</h1>
          <p className="text-gray-600 mt-1">Create EU-compliant discount stickers with metric measurements and European retail standards</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shape Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Shape</h3>
              <div className="grid grid-cols-5 gap-3">
                {shapes.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => {
                      setSelectedShape(shape.id);
                      setSelectedSize(sizesOptions[shape.id]?.[3]?.id || sizesOptions[shape.id]?.[0]?.id);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedShape === shape.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{shape.icon}</div>
                    <div className="text-sm font-medium">{shape.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Units Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurement Unit</h3>
              <div className="grid grid-cols-3 gap-3">
                {units.map(unit => (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedUnit === unit.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{unit.id.toUpperCase()}</div>
                    <div className="text-xs text-gray-500">{unit.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EU Standard Sizes</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                {sizesOptions[selectedShape]?.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedSize === size.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{getSizeDisplay(size)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Discount Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Percentage</h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 max-h-48 overflow-y-auto">
                {discounts.map(discount => (
                  <button
                    key={discount}
                    onClick={() => setSelectedDiscount(discount)}
                    className={`p-3 rounded-lg border-2 transition-all font-bold ${
                      selectedDiscount === discount 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {discount}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedColor === color.id 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 ${color.bg} rounded mx-auto mb-1`}></div>
                    <div className="text-xs">{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Border Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Border Options</h3>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={borderEnabled}
                    onChange={(e) => setBorderEnabled(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="font-medium">Enable Border</span>
                </label>
              </div>

              {borderEnabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                    <div className="grid grid-cols-5 gap-2">
                      {borderColors.map(border => (
                        <button
                          key={border.id}
                          onClick={() => setBorderColor(border.id)}
                          className={`p-2 rounded border-2 ${
                            borderColor === border.id 
                              ? 'border-blue-500' 
                              : 'border-gray-200'
                          }`}
                        >
                          <div 
                            className="w-6 h-6 rounded mx-auto border"
                            style={{ backgroundColor: border.color, borderColor: border.color === '#ffffff' ? '#ccc' : border.color }}
                          ></div>
                          <div className="text-xs mt-1">{border.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Thickness</label>
                    <select
                      value={borderThickness}
                      onChange={(e) => setBorderThickness(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="1">Thin (1px)</option>
                      <option value="2">Medium (2px)</option>
                      <option value="3">Thick (3px)</option>
                      <option value="4">Extra Thick (4px)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* EU Paper Type Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EU Standard Sticker Rolls</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {paperTypes.map(paper => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaperType(paper.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedPaperType === paper.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{paper.name}</div>
                    <div className="text-sm text-gray-500">{paper.description}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Preview & Export Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 mb-6">
                {renderSticker(120)}
              </div>

              {/* Hidden export version */}
              <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                {renderSticker(300, false, true)}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div><strong>Shape:</strong> {shapes.find(s => s.id === selectedShape)?.name}</div>
                <div><strong>Discount:</strong> {selectedDiscount}</div>
                <div><strong>Size:</strong> {getSizeDisplay(sizesOptions[selectedShape]?.find(s => s.id === selectedSize) || sizesOptions[selectedShape]?.[0])}</div>
                <div><strong>Color:</strong> {colors.find(c => c.id === selectedColor)?.name}</div>
                <div><strong>Border:</strong> {borderEnabled ? `${borderColors.find(b => b.id === borderColor)?.name} (${borderThickness}px)` : 'None'}</div>
                <div><strong>Roll Type:</strong> {paperTypes.find(p => p.id === selectedPaperType)?.name}</div>
              </div>

              {/* Export Options */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Export Options</h4>
                
                <button 
                  onClick={downloadSVG}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  📄 Download SVG (Vector)
                </button>
                
                <button 
                  onClick={downloadPDF}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  📋 Download PDF
                </button>
                
                <button 
                  onClick={downloadPNG}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  🖼️ Download PNG
                </button>
                
                <button 
                  onClick={handlePrint}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  🖨️ Print (A4 Format)
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EU A4 Print Layout - Hidden on Screen */}
      <div className="print-only">
        <div className="print-layout-eu">
          {generatePrintLayout()}
        </div>
      </div>
    </div>
  );
};

export default App;