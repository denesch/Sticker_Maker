import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedShape, setSelectedShape] = useState('round');
  const [selectedDiscount, setSelectedDiscount] = useState('-50%');
  const [selectedSize, setSelectedSize] = useState('2');
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedPaperType, setSelectedPaperType] = useState('round-2');

  const shapes = [
    { id: 'round', name: 'Round', icon: '●' },
    { id: 'square', name: 'Square', icon: '■' },
    { id: 'rectangle', name: 'Rectangle', icon: '▬' }
  ];

  const discounts = ['-10%', '-15%', '-20%', '-25%', '-30%', '-40%', '-50%', '-60%', '-75%'];

  const colors = [
    { id: 'red', name: 'Red', bg: 'bg-red-500', text: 'text-white' },
    { id: 'blue', name: 'Blue', bg: 'bg-blue-500', text: 'text-white' },
    { id: 'green', name: 'Green', bg: 'bg-green-500', text: 'text-white' },
    { id: 'orange', name: 'Orange', bg: 'bg-orange-500', text: 'text-white' },
    { id: 'purple', name: 'Purple', bg: 'bg-purple-500', text: 'text-white' },
    { id: 'yellow', name: 'Yellow', bg: 'bg-yellow-400', text: 'text-black' },
    { id: 'black', name: 'Black', bg: 'bg-black', text: 'text-white' }
  ];

  const sizesOptions = {
    round: [
      { id: '1', name: '1 inch', dimension: '1"' },
      { id: '1.5', name: '1.5 inch', dimension: '1.5"' },
      { id: '2', name: '2 inch', dimension: '2"' },
      { id: '2.5', name: '2.5 inch', dimension: '2.5"' },
      { id: '3', name: '3 inch', dimension: '3"' }
    ],
    square: [
      { id: '1', name: '1×1 inch', dimension: '1"×1"' },
      { id: '1.5', name: '1.5×1.5 inch', dimension: '1.5"×1.5"' },
      { id: '2', name: '2×2 inch', dimension: '2"×2"' },
      { id: '2.5', name: '2.5×2.5 inch', dimension: '2.5"×2.5"' }
    ],
    rectangle: [
      { id: '2.25x1.25', name: '2.25×1.25 inch', dimension: '2.25"×1.25"' },
      { id: '3x2', name: '3×2 inch', dimension: '3"×2"' },
      { id: '4x2', name: '4×2 inch', dimension: '4"×2"' },
      { id: '3x1', name: '3×1 inch', dimension: '3"×1"' }
    ]
  };

  const paperTypes = [
    { id: 'round-1', name: '1" Round Roll', type: 'round', size: '1' },
    { id: 'round-2', name: '2" Round Roll', type: 'round', size: '2' },
    { id: 'round-3', name: '3" Round Roll', type: 'round', size: '3' },
    { id: 'rect-standard', name: '2.25×1.25" Rectangle Roll', type: 'rectangle', size: '2.25x1.25' },
    { id: 'rect-large', name: '3×2" Rectangle Roll', type: 'rectangle', size: '3x2' },
    { id: 'square-2', name: '2×2" Square Roll', type: 'square', size: '2' }
  ];

  const getCurrentColor = () => colors.find(c => c.id === selectedColor);

  const renderSticker = (size = 100, isPreview = true) => {
    const currentColor = getCurrentColor();
    const sizeNum = parseFloat(selectedSize.split('x')[0]);
    const actualSize = isPreview ? size : (sizeNum * 96); // 96 DPI for print

    if (selectedShape === 'round') {
      return (
        <div 
          className={`${currentColor.bg} ${currentColor.text} rounded-full flex flex-col items-center justify-center font-bold relative overflow-hidden`}
          style={{ 
            width: `${actualSize}px`, 
            height: `${actualSize}px`,
            fontSize: `${actualSize * 0.2}px`,
            lineHeight: '1'
          }}
        >
          <div className="text-center">
            <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {/* Decorative border */}
          <div className="absolute inset-1 rounded-full border-2 border-white opacity-30"></div>
        </div>
      );
    }

    if (selectedShape === 'square') {
      return (
        <div 
          className={`${currentColor.bg} ${currentColor.text} flex flex-col items-center justify-center font-bold relative overflow-hidden`}
          style={{ 
            width: `${actualSize}px`, 
            height: `${actualSize}px`,
            fontSize: `${actualSize * 0.2}px`,
            lineHeight: '1'
          }}
        >
          <div className="text-center">
            <div style={{ fontSize: `${actualSize * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${actualSize * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {/* Decorative corner accent */}
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white opacity-50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white opacity-50"></div>
        </div>
      );
    }

    if (selectedShape === 'rectangle') {
      const [width, height] = selectedSize.split('x').map(s => parseFloat(s));
      const widthPx = isPreview ? (width / height) * size : width * 96;
      const heightPx = isPreview ? size : height * 96;

      return (
        <div 
          className={`${currentColor.bg} ${currentColor.text} flex flex-col items-center justify-center font-bold relative overflow-hidden`}
          style={{ 
            width: `${widthPx}px`, 
            height: `${heightPx}px`,
            fontSize: `${heightPx * 0.2}px`,
            lineHeight: '1'
          }}
        >
          <div className="text-center">
            <div style={{ fontSize: `${heightPx * 0.35}px` }}>{selectedDiscount}</div>
            <div style={{ fontSize: `${heightPx * 0.12}px` }} className="mt-1">OFF</div>
          </div>
          {/* Decorative lines */}
          <div className="absolute left-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
          <div className="absolute right-2 top-1/2 w-6 h-0.5 bg-white opacity-50 transform -translate-y-1/2"></div>
        </div>
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePrintLayout = () => {
    const selectedPaper = paperTypes.find(p => p.id === selectedPaperType);
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
          <h1 className="text-3xl font-bold text-gray-900">Discount Sticker Maker</h1>
          <p className="text-gray-600 mt-1">Create professional discount stickers for printing</p>
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
                    onClick={() => setSelectedShape(shape.id)}
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

            {/* Discount Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Amount</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
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

            {/* Size Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                    <div className="font-medium">{size.name}</div>
                    <div className="text-sm text-gray-500">{size.dimension}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
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
                    <div className={`w-8 h-8 ${color.bg} rounded mx-auto mb-2`}></div>
                    <div className="text-xs">{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Type Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticker Roll Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 mb-6">
                {renderSticker(120)}
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div><strong>Shape:</strong> {shapes.find(s => s.id === selectedShape)?.name}</div>
                <div><strong>Discount:</strong> {selectedDiscount}</div>
                <div><strong>Size:</strong> {sizesOptions[selectedShape]?.find(s => s.id === selectedSize)?.dimension}</div>
                <div><strong>Color:</strong> {colors.find(c => c.id === selectedColor)?.name}</div>
                <div><strong>Roll Type:</strong> {paperTypes.find(p => p.id === selectedPaperType)?.name}</div>
              </div>

              <button 
                onClick={handlePrint}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🖨️ Print Stickers
              </button>
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