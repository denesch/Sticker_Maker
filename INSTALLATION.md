# 🛠️ Installation Guide - EU Discount Sticker Maker

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10, macOS 10.14, Ubuntu 18.04 or newer
- **Node.js**: Version 16.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended Setup
- **Node.js**: Latest LTS version (18.x or 20.x)
- **Package Manager**: Yarn (faster than npm)
- **RAM**: 8GB or more
- **Monitor**: 1920×1080 or higher resolution

## 🚀 Step-by-Step Installation

### Step 1: Extract the Application

```bash
# Extract the downloaded file
tar -xzf eu-discount-sticker-maker.tar.gz

# Navigate to the application directory
cd eu-discount-sticker-maker
```

### Step 2: Install Node.js (if not installed)

#### Windows:
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Restart your computer

#### macOS:
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

#### Ubuntu/Debian:
```bash
# Update package list
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Install latest version via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Install Yarn (Recommended)

```bash
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```

### Step 4: Install Project Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
yarn install

# This will install:
# - React and React DOM
# - Tailwind CSS
# - jsPDF for PDF export
# - html2canvas for image export
# - All other required packages
```

### Step 5: Start the Application

```bash
# Start the development server
yarn start

# The application will open automatically at:
# http://localhost:3000
```

## 🔧 Alternative Installation Methods

### Using NPM (if Yarn is not available)

```bash
cd frontend
npm install
npm start
```

### Using Docker (Advanced)

```bash
# Build Docker image
docker build -t eu-sticker-maker .

# Run container
docker run -p 3000:3000 eu-sticker-maker
```

## 📁 Project Structure After Installation

```
eu-discount-sticker-maker/
├── frontend/
│   ├── node_modules/          # Dependencies (created after yarn install)
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js            # Main application
│   │   ├── App.css           # Styles
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Global styles
│   ├── package.json          # Dependencies list
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── postcss.config.js     # PostCSS config
├── README.md                 # Documentation
├── INSTALLATION.md           # This file
└── package-lock.json         # Dependency lock file
```

## ✅ Verification Steps

### 1. Check Node.js Installation
```bash
node --version
# Should return v16.0.0 or higher
```

### 2. Check Yarn Installation
```bash
yarn --version
# Should return 1.22.0 or higher
```

### 3. Verify Application Start
1. Run `yarn start` in the frontend directory
2. Browser should open automatically to `http://localhost:3000`
3. You should see the EU Discount Sticker Maker interface
4. Test by selecting a shape and seeing the preview update

### 4. Test Export Functions
1. Create a sample sticker
2. Try downloading SVG, PDF, and PNG formats
3. Verify files are created correctly

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "yarn: command not found"
```bash
# Solution: Install Yarn
npm install -g yarn
```

#### Issue: "Node.js version too old"
```bash
# Solution: Update Node.js
# Download latest LTS from nodejs.org
# Or use version manager like nvm
```

#### Issue: "Port 3000 already in use"
```bash
# Solution: Use different port
yarn start --port 3001
```

#### Issue: Dependencies installation fails
```bash
# Solution: Clear cache and retry
yarn cache clean
rm -rf node_modules
yarn install
```

#### Issue: Application won't start
```bash
# Check for errors in package.json
# Ensure all dependencies are installed
yarn install --force

# Check Node.js version
node --version
```

#### Issue: Export functions not working
- Ensure browser allows downloads
- Check browser console for errors
- Try different export format (SVG, PDF, PNG)

### Browser-Specific Issues

#### Chrome:
- Allow downloads in settings
- Check popup blocker settings

#### Firefox:
- Enable JavaScript
- Allow file downloads

#### Safari:
- Enable pop-ups for localhost
- Check download preferences

## 🔄 Updates and Maintenance

### Updating Dependencies
```bash
# Check for outdated packages
yarn outdated

# Update all dependencies
yarn upgrade

# Update specific package
yarn upgrade package-name
```

### Clearing Cache
```bash
# Clear Yarn cache
yarn cache clean

# Clear browser cache
# Use Ctrl+F5 or Cmd+Shift+R
```

## 🏗️ Production Build

### Creating Production Build
```bash
# Build optimized version
yarn build

# Serve production build locally
yarn global add serve
serve -s build -l 3000
```

### Deployment Options
1. **Static Hosting**: Netlify, Vercel, GitHub Pages
2. **Traditional Hosting**: Apache, Nginx
3. **Cloud Platforms**: AWS S3, Google Cloud Storage

## 📞 Getting Help

### Documentation
- Check README.md for usage guide
- Review code comments in App.js
- Consult React documentation for framework questions

### Common Commands Reference
```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests (if available)
yarn test

# Install new dependency
yarn add package-name

# Remove dependency
yarn remove package-name
```

## 🎯 Performance Optimization

### For Better Performance
1. **Close unnecessary browser tabs**
2. **Ensure sufficient RAM (8GB+)**
3. **Use latest browser version**
4. **Clear browser cache regularly**
5. **Use SSD storage if available**

### Development Tips
- Keep browser developer tools closed during normal use
- Use production build for final testing
- Monitor memory usage in browser task manager

---

✅ **Installation Complete!** 

Your EU Professional Discount Sticker Maker is now ready to use. Visit `http://localhost:3000` to start creating professional discount stickers with EU standards!