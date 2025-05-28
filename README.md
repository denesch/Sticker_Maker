# 🇪🇺 EU Professional Discount Sticker Maker

A professional web application for creating EU-compliant discount stickers with metric measurements and European retail standards.

## 🌟 Features

### 🇪🇺 EU Compliance
- **Metric Measurements**: Default millimeters (mm) with cm/inches support
- **EU Standard Sizes**: 15mm-100mm rounds, squares, rectangles
- **16 EU Standard Roll Types**: From 20mm small tags to 70mm supermarket labels
- **A4 Print Format**: Optimized for European A4 paper (210×297mm)
- **EU Retail Standards**: -5% to -95% discount percentages

### 🎨 Professional Design
- **5 Shape Types**: Round, Square, Rectangle, Star (promotional), Burst (special offers)
- **10 Color Themes**: Professional retail colors
- **Border Customization**: 5 colors with thickness options
- **Live Preview**: Real-time updates with all changes

### 📤 Export Options
- **SVG Export**: Vector format for scalability
- **PDF Export**: Print-ready format with exact measurements
- **PNG Export**: High-resolution raster images
- **A4 Print Layout**: Optimized grid for European printing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn
- Modern web browser

### Installation

1. **Extract the application:**
   ```bash
   tar -xzf eu-discount-sticker-maker.tar.gz
   cd eu-discount-sticker-maker
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   yarn install
   ```

3. **Start the application:**
   ```bash
   yarn start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🎯 Usage Guide

### Creating Stickers

1. **Select Shape**: Choose from Round, Square, Rectangle, Star, or Burst
2. **Choose Size**: Pick from EU standard sizes (20mm, 40mm, 50mm, etc.)
3. **Set Discount**: Select percentage from -5% to -95%
4. **Pick Color**: Choose from 10 professional retail colors
5. **Add Border**: Optional borders with color and thickness options
6. **Export**: Download as SVG, PDF, PNG, or print on A4

### EU Standard Sizes

**Round Stickers:**
- Small: 15mm, 20mm, 25mm
- Medium: 30mm, 35mm, 40mm, 45mm, 50mm
- Large: 55mm, 60mm, 65mm, 70mm, 80mm, 90mm, 100mm

**Rectangle Stickers:**
- 30×20mm, 40×25mm, 50×30mm, 60×40mm, 70×45mm
- 80×50mm, 90×50mm, 100×60mm, 120×80mm, 150×100mm

**Square Stickers:**
- 15mm, 20mm, 25mm, 30mm, 35mm, 40mm
- 45mm, 50mm, 60mm, 70mm, 80mm, 100mm

### Recommended Roll Types

- **20mm Round**: Small price tags
- **40mm Round**: Most popular size for retail
- **50mm Round**: Large discount labels
- **70mm Round**: Supermarket use
- **30×20mm Rectangle**: Compact rectangular labels
- **50×30mm Rectangle**: Standard rectangular format

## 💡 Best Practices

### For Retail Use
- Use high contrast colors (red, orange, yellow) for visibility
- 40mm-50mm sizes work best for most products
- Enable borders for premium appearance
- Use star/burst shapes for special promotions

### For Printing
- Export as PDF for exact sizing
- Use A4 print layout for efficient paper use
- Check preview before printing
- Ensure printer supports color printing for full effect

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Export**: jsPDF, html2canvas
- **Measurements**: Precise metric calculations
- **Print**: CSS print media queries optimized for A4

### File Structure
```
eu-discount-sticker-maker/
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Styles with EU print optimization
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies and scripts
│   └── tailwind.config.js  # Tailwind configuration
└── README.md              # This file
```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Customization

### Adding New Sizes
Edit `sizesOptions` in `App.js`:
```javascript
round: [
  { id: '25', mm: 25 },
  { id: '30', mm: 30 },
  // Add new sizes here
]
```

### Adding New Colors
Edit `colors` array in `App.js`:
```javascript
{ id: 'custom', name: 'Custom', bg: 'bg-custom-500', text: 'text-white' }
```

### Custom Discount Values
Edit `discounts` array in `App.js`:
```javascript
const discounts = ['-5%', '-10%', '-15%', /* add custom values */];
```

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop computers
- Tablets (iPad, Android tablets)
- Mobile phones (iOS, Android)
- Touch devices with gesture support

## 🎨 Export Quality

### SVG (Vector)
- Infinite scalability
- Perfect for professional printing
- Small file size
- Editable in design software

### PDF
- Exact measurements preserved
- Print-ready format
- Professional quality
- Compatible with all printers

### PNG
- High resolution (300 DPI equivalent)
- Universal compatibility
- Good for web use
- Transparent background support

## 📞 Support

### Common Issues

**Stickers appear blurry when printed:**
- Use PDF export for best print quality
- Ensure printer settings match A4 format
- Check printer resolution settings

**Colors don't match preview:**
- Enable color printing on printer
- Calibrate monitor colors
- Use PDF export for color accuracy

**Sizes not accurate:**
- Verify printer scaling is set to 100%
- Use PDF export for exact measurements
- Check A4 paper size selection

## 📄 License

This project is created for professional retail use. Feel free to modify and distribute according to your needs.

## 🚀 Future Enhancements

- Multi-language support (German, French, Spanish, etc.)
- Custom text addition
- Batch processing for multiple stickers
- QR code integration
- Barcode support
- Advanced typography options

---

**Made with ❤️ for European retailers**

For questions or support, please refer to the code comments or create an issue in your project repository.