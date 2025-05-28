import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedDiscount, setSelectedDiscount] = useState('-50%');
  const [selectedSize, setSelectedSize] = useState('2');
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedPaperType, setSelectedPaperType] = useState('round-2');
  const [selectedUnit, setSelectedUnit] = useState('cm');
  const [borderEnabled, setBorderEnabled] = useState(true);
  const [borderColor, setBorderColor] = useState('white');
  const [borderThickness, setBorderThickness] = useState('2');
  
  const stickerRef = useRef(null);

  const shapes = [
    { id: 'round', name: 'Round', icon: '●' },
    { id: 'square', name: 'Square', icon: '■' },
    { id: 'rectangle', name: 'Rectangle', icon: '▬' }
  ];

  const discounts = ['-5%', '-10%', '-15%', '-20%', '-25%', '-30%', '-35%', '-40%', '-45%', '-50%', '-55%', '-60%', '-65%', '-70%', '-75%', '-80%', '-85%', '-90%'];

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
    { id: 'cm', name: 'Centimeters (cm)', factor: 2.54 },
    { id: 'mm', name: 'Millimeters (mm)', factor: 25.4 },
    { id: 'in', name: 'Inches (in)', factor: 1 }
  ];

  // Enhanced size options with more granular choices
  const sizesOptions = {
    round: [
      { id: '0.5', inches: 0.5 }, { id: '0.75', inches: 0.75 }, { id: '1', inches: 1 },
      { id: '1.25', inches: 1.25 }, { id: '1.5', inches: 1.5 }, { id: '1.75', inches: 1.75 },
      { id: '2', inches: 2 }, { id: '2.25', inches: 2.25 }, { id: '2.5', inches: 2.5 },
      { id: '2.75', inches: 2.75 }, { id: '3', inches: 3 }, { id: '3.5', inches: 3.5 },
      { id: '4', inches: 4 }, { id: '5', inches: 5 }
    ],
    square: [
      { id: '0.5', inches: 0.5 }, { id: '0.75', inches: 0.75 }, { id: '1', inches: 1 },
      { id: '1.25', inches: 1.25 }, { id: '1.5', inches: 1.5 }, { id: '2', inches: 2 },
      { id: '2.5', inches: 2.5 }, { id: '3', inches: 3 }, { id: '4', inches: 4 }
    ],
    rectangle: [
      { id: '2x1', width: 2, height: 1 }, { id: '2.25x1.25', width: 2.25, height: 1.25 },
      { id: '3x1', width: 3, height: 1 }, { id: '3x1.5', width: 3, height: 1.5 },
      { id: '3x2', width: 3, height: 2 }, { id: '4x1', width: 4, height: 1 },
      { id: '4x2', width: 4, height: 2 }, { id: '4x3', width: 4, height: 3 },
      { id: '5x2', width: 5, height: 2 }, { id: '5x3', width: 5, height: 3 }
    ]
  };

  const paperTypes = [
    { id: 'round-1', name: '1" Round Roll', type: 'round', size: '1' },
    { id: 'round-1.5', name: '1.5" Round Roll', type: 'round', size: '1.5' },
    { id: 'round-2', name: '2" Round Roll', type: 'round', size: '2' },
    { id: 'round-2.5', name: '2.5" Round Roll', type: 'round', size: '2.5' },
    { id: 'round-3', name: '3" Round Roll', type: 'round', size: '3' },
    { id: 'rect-standard', name: '2.25×1.25" Rectangle Roll', type: 'rectangle', size: '2.25x1.25' },
    { id: 'rect-large', name: '3×2" Rectangle Roll', type: 'rectangle', size: '3x2' },
    { id: 'rect-wide', name: '4×2" Rectangle Roll', type: 'rectangle', size: '4x2' },
    { id: 'square-1.5', name: '1.5×1.5" Square Roll', type: 'square', size: '1.5' },
    { id: 'square-2', name: '2×2" Square Roll', type: 'square', size: '2' },
    { id: 'square-2.5', name: '2.5×2.5" Square Roll', type: 'square', size: '2.5' }
  ];

  const getCurrentColor = () => colors.find(c => c.id === selectedColor);
  const getCurrentUnit = () => units.find(u => u.id === selectedUnit);
  const getCurrentBorderColor = () => borderColors.find(b => b.id === borderColor);

  const convertSize = (inches) => {
    const unit = getCurrentUnit();
    const converted = inches * unit.factor;
    return selectedUnit === 'mm' ? Math.round(converted) : Math.round(converted * 10) / 10;
  };

  const getSizeDisplay = (sizeObj) => {
    if (selectedShape === 'rectangle') {
      const width = convertSize(sizeObj.width);
      const height = convertSize(sizeObj.height);
      return `${width}×${height} ${selectedUnit}`;
    } else {
      const size = convertSize(sizeObj.inches);
      return `${size} ${selectedUnit}`;
    }
  };

  const renderSticker = (size = 120, isPreview = true, exportMode = false) => {
    const currentColor = getCurrentColor();
    const currentBorderColor = getCurrentBorderColor();
    const sizeNum = selectedShape === 'rectangle' 
      ? sizesOptions[selectedShape].find(s => s.id === selectedSize)?.width || 2
      : sizesOptions[selectedShape].find(s => s.id === selectedSize)?.inches || 2;
    
    const actualSize = isPreview ? size : (sizeNum * 96); // 96 DPI for print
    const borderWidth = borderEnabled ? parseInt(borderThickness) : 0;

    const stickerStyle = {
      width: selectedShape === 'rectangle' 
        ? `${actualSize * (sizesOptions[selectedShape].find(s => s.id === selectedSize)?.width / sizesOptions[selectedShape].find(s => s.id === selectedSize)?.height || 1)}px`
        : `${actualSize}px`,
      height: `${actualSize}px`,
      fontSize: `${actualSize * 0.2}px`,
      lineHeight: '1',
      border: borderEnabled ? `${borderWidth}px solid ${currentBorderColor.color}` : 'none'
    };

    const baseClasses = `${currentColor.bg} ${currentColor.text} flex flex-col items-center justify-center font-bold relative overflow-hidden`;
    const shapeClasses = selectedShape === 'round' ? 'rounded-full' : '';

    if (selectedShape === 'round') {
      return (
        <div 
          className={`${baseClasses} ${shapeClasses}`}
          style={stickerStyle}
          ref={exportMode ? stickerRef : null}
        >
          <div className="text-center">
            <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {!borderEnabled && (
            <div className="absolute inset-1 rounded-full border-2 border-white opacity-30"></div>
          )}
        </div>
      );
    }

    if (selectedShape === 'square') {
      return (
        <div 
          className={baseClasses}
          style={stickerStyle}
          ref={exportMode ? stickerRef : null}
        >
          <div className="text-center">
            <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {!borderEnabled && (
            <>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white opacity-50"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white opacity-50"></div>
            </>
          )}
        </div>
      );
    }

    if (selectedShape === 'rectangle') {
      return (
        <div 
          className={baseClasses}
          style={stickerStyle}
          ref={exportMode ? stickerRef : null}
        >
          <div className="text-center">
            <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {!borderEnabled && (
            <>
              <div className="absolute left-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
              <div className="absolute right-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
            </>
          )}
        </div>
      );
    }
  };

  const generateSVG = () => {
    const currentColor = getCurrentColor();
    const currentBorderColor = getCurrentBorderColor();
    const sizeData = selectedShape === 'rectangle' 
      ? sizesOptions[selectedShape].find(s => s.id === selectedSize)
      : { inches: sizesOptions[selectedShape].find(s => s.id === selectedSize)?.inches };
    
    const width = selectedShape === 'rectangle' ? sizeData.width * 96 : sizeData.inches * 96;
    const height = selectedShape === 'rectangle' ? sizeData.height * 96 : sizeData.inches * 96;
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
    a.download = `discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}.svg`;
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
      : { inches: sizesOptions[selectedShape].find(s => s.id === selectedSize)?.inches };
    
    const width = selectedShape === 'rectangle' ? sizeData.width : sizeData.inches;
    const height = selectedShape === 'rectangle' ? sizeData.height : sizeData.inches;
    
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'in',
      format: [width, height]
    });
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}.pdf`);
  };

  const downloadPNG = async () => {
    const canvas = await html2canvas(stickerRef.current, {
      backgroundColor: null,
      scale: 3
    });
    
    const link = document.createElement('a');
    link.download = `discount-sticker-${selectedDiscount.replace('%', 'percent')}-${selectedShape}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePrintLayout = () => {
    const stickersPerRow = selectedShape === 'rectangle' ? 2 : 3;
    const rows = 8;
    const totalStickers = stickersPerRow * rows;

    return Array.from({ length: totalStickers }, (_, i) => (
      <div key={i} className="print-sticker-item flex items-center justify-center">
        {renderSticker(150, false)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Professional Discount Sticker Maker</h1>
          <p className="text-gray-600 mt-1">Create, customize, and export high-quality discount stickers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shape Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Shape</h3>
              <div className="grid grid-cols-3 gap-3">
                {shapes.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => {
                      setSelectedShape(shape.id);
                      setSelectedSize(sizesOptions[shape.id][2]?.id || sizesOptions[shape.id][0]?.id);
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Amount</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-48 overflow-y-auto">
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

            {/* Paper Type Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Roll Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
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
                    <div className="text-sm text-gray-500">Standard roll format</div>
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
                <div><strong>Size:</strong> {getSizeDisplay(sizesOptions[selectedShape]?.find(s => s.id === selectedSize) || sizesOptions[selectedShape][0])}</div>
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
                  🖨️ Print Stickers
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Layout - Hidden on Screen */}
      <div className="print-only">
        <div className="print-layout">
          {generatePrintLayout()}
        </div>
      </div>
    </div>
  );
};

export default App;