/**
 * @description Redesign of the Scan page with AR-style visual elements
 * @author Senior iOS Engineer
 * @version 1.2.0
 */
(function() {
    console.log('Scan page redesign script loaded');
    
    // Avoid duplicate application
    let hasApplied = false;
    
    // 添加一个安全计时器，防止页面一直保持隐藏状态
    let safetyTimer = null;

    // Execute after DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, preparing to redesign Scan page');
        
        // Attempt to execute redesign immediately
        redesignScanPage();
        
        // Set up MutationObserver to monitor DOM changes
        setupMutationObserver();
    });
    
    /**
     * Set up MutationObserver to monitor DOM changes
     */
    function setupMutationObserver() {
        console.log('Setting up DOM mutation observer');
        
        // Use debounce function to limit trigger frequency
        let debounceTimer;
        
        const observer = new MutationObserver(function(mutations) {
            // Clear previous timer
            clearTimeout(debounceTimer);
            
            // Check if there are screen changes
            const screensChanged = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.classList && (node.classList.contains('screen') || 
                     node.querySelector('.screen')))
                );
            });
            
            if (screensChanged) {
                // Set a short delay to execute redesign
                debounceTimer = setTimeout(function() {
                    console.log('Screen changes detected, attempting to redesign Scan page');
                    hasApplied = false; // Reset flag to allow reapplication
                    redesignScanPage();
                }, 50);
            }
        });
        
        // Observe changes in the entire document
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true
        });
    }

    /**
     * Redesign the Scan page
     */
    function redesignScanPage() {
        // Prevent duplicate application
        if (hasApplied) {
            console.log('Scan page design already applied, skipping');
            return;
        }
        
        console.log('Attempting to redesign Scan page');
        
        // 清除之前可能存在的安全计时器
        if (safetyTimer) {
            clearTimeout(safetyTimer);
        }
        
        // 立即隐藏旧界面元素，防止闪烁
        const scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (scanScreen) {
            // 保存原始显示状态，以便失败时可以恢复
            const originalDisplay = scanScreen.style.display;
            const originalOpacity = scanScreen.style.opacity;
            
            try {
                // 立即隐藏旧版UI，避免闪烁
                scanScreen.style.opacity = "0";
                scanScreen.style.transition = "none";
                
                // 设置安全计时器，10秒后强制恢复可见性，防止界面永久消失
                safetyTimer = setTimeout(function() {
                    console.log('安全计时器触发 - 强制恢复scan界面可见性');
                    const scanScreenCheck = document.querySelector('.screen[data-page="scan"]');
                    if (scanScreenCheck && scanScreenCheck.style.opacity === "0") {
                        scanScreenCheck.style.opacity = "1";
                        scanScreenCheck.style.transition = "opacity 0.5s ease-in-out";
                    }
                }, 10000);
                
                // 移除所有可能的旧版UI
                const oldContent = scanScreen.querySelector('.scrollable-content');
                if (oldContent) {
                    scanScreen.removeChild(oldContent);
                }
                
                // 移除旧版底部导航
                const oldNavBottom = scanScreen.querySelector('.nav-bottom');
                if (oldNavBottom) {
                    scanScreen.removeChild(oldNavBottom);
                }
            
                // Find Scan page
                const processedScanScreen = findScanScreen();
                if (!processedScanScreen) {
                    console.log('Scan page not found');
                    // 恢复原始显示状态
                    scanScreen.style.opacity = originalOpacity || "1";
                    scanScreen.style.display = originalDisplay || "flex";
                    return;
                }
                
                console.log('Found Scan page with data-page attribute: ' + processedScanScreen.getAttribute('data-page'));
                
                // Check if the page already contains our designed elements
                if (processedScanScreen.querySelector('.scan-redesigned-container')) {
                    console.log('Scan page has already been redesigned, skipping');
                    // 确保页面可见
                    processedScanScreen.style.opacity = "1";
                    processedScanScreen.style.transition = "opacity 0.2s ease-in-out";
                    hasApplied = true;
                    return;
                }
                
                console.log('Found Scan page, preparing redesign');
                
                // Apply fullscreen mode
                makeFullscreen(processedScanScreen);
                
                // Clear Scan page content, preserving necessary structure
                clearScanContent(processedScanScreen);
                
                // Add newly designed content
                addScanContent(processedScanScreen);
                
                // Mark as applied
                hasApplied = true;
                
                console.log('Scan page redesign complete');
                
                // 确保页面在设计完成后是可见的
                setTimeout(() => {
                    processedScanScreen.style.opacity = "1";
                    processedScanScreen.style.transition = "opacity 0.3s ease-in-out";
                    // 清除安全计时器
                    clearTimeout(safetyTimer);
                }, 100);
            } catch (error) {
                console.error('Error during scan page redesign process:', error);
                // 发生错误时恢复页面可见性
                scanScreen.style.opacity = originalOpacity || "1";
                scanScreen.style.display = originalDisplay || "flex";
                // 清除安全计时器
                clearTimeout(safetyTimer);
                
                // 尝试恢复最小的可见内容，确保页面不会完全消失
                if (!scanScreen.hasChildNodes()) {
                    const tempContent = document.createElement('div');
                    tempContent.className = 'scrollable-content p-4';
                    tempContent.innerHTML = `
                        <div class="ios-status-bar bg-white w-full h-7 flex items-center justify-between px-4">
                            <div class="text-xs">9:41</div>
                            <div class="flex items-center">
                                <span class="mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                </span>
                                <span class="mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.95-.68l1.64-3.69a1 1 0 00-1.9-.63L12.2 8H10V4a1 1 0 00-1-1H3z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <h1 class="text-xl font-bold">Menu Scanner</h1>
                            <p class="text-gray-500 mt-2">Scan food for nutrition analysis</p>
                        </div>
                        <div class="flex justify-center mt-6">
                            <div class="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                                <p>相机界面加载中...</p>
                            </div>
                        </div>
                    `;
                    scanScreen.appendChild(tempContent);
                }
            }
        } else {
            console.log('Scan screen not found, cannot redesign');
        }
    }
    
    /**
     * Make the scan screen fullscreen by removing navigation bar and adjusting styles
     * @param {HTMLElement} scanScreen - Scan page element
     */
    function makeFullscreen(scanScreen) {
        // Set the screen to be fixed and full viewport
        scanScreen.style.position = 'fixed';
        scanScreen.style.top = '0';
        scanScreen.style.left = '0';
        scanScreen.style.right = '0';
        scanScreen.style.bottom = '0';
        scanScreen.style.zIndex = '9999';
        scanScreen.style.backgroundColor = '#000';
        
        // Remove bottom navigation if it exists
        const bottomNav = scanScreen.querySelector('.nav-bottom');
        if (bottomNav) {
            bottomNav.style.display = 'none';
        }
        
        // Remove any existing status bars or headers
        const existingStatusBars = document.querySelectorAll('.status-bar, .ios-status-bar, .header');
        existingStatusBars.forEach(bar => {
            if (bar && scanScreen.contains(bar)) {
                bar.style.display = 'none';
            }
        });
        
        // Add fullscreen class for additional styling
        scanScreen.classList.add('fullscreen-scan');
        
        // Prevent default double click behavior that might trigger fullscreen
        scanScreen.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Double-click prevented on scan screen');
            return false;
        });
    }
    
    /**
     * Find the Scan page
     * @returns {HTMLElement|null} Scan page element or null
     */
    function findScanScreen() {
        // Try multiple methods to find the Scan page
        
        // Method 1: Find by data-page attribute - most accurate method
        let scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (scanScreen) {
            console.log('Found Scan page through data-page attribute');
            return scanScreen;
        }
        
        // Method 2: Find scan button and related screen
        const scanNavItem = document.querySelector('.nav-item[data-page="scan"]');
        if (scanNavItem) {
            console.log('Found Scan button in navigation bar');
            // Find corresponding screen index through showScreen event
            const navItems = Array.from(scanNavItem.parentNode.children);
            const scanIndex = navItems.indexOf(scanNavItem);
            
            if (scanIndex >= 0) {
                // Get all hidden screens
                const hiddenScreens = Array.from(document.querySelectorAll('.screen:not([style*="display: block"])'));
                if (scanIndex < hiddenScreens.length) {
                    console.log('Found Scan page through navigation button position');
                    return hiddenScreens[scanIndex];
                }
            }
        }
        
        // Method 3: Find Menu Scanner title - unique to Scan page
        const screens = document.querySelectorAll('.screen');
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            const menuScannerTitle = screen.querySelector('h1.text-xl.font-bold');
            
            if (menuScannerTitle && menuScannerTitle.textContent.trim() === 'Menu Scanner') {
                console.log('Found Scan page through "Menu Scanner" title');
                return screen;
            }
        }
        
        // Method 4: Find camera viewfinder elements - unique to Scan page
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            // Check if it contains camera viewfinder characteristic elements
            if (screen.querySelector('.relative.h-96.bg-gray-900.rounded-2xl.overflow-hidden')) {
                console.log('Found Scan page through camera viewfinder elements');
                return screen;
            }
        }
        
        // Method 5: Find by scan area border markers - very specific to Scan page
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            // Look for elements with border corners
            if (screen.querySelector('.border-2.border-white.rounded-lg.relative')) {
                console.log('Found Scan page through scan frame border');
                return screen;
            }
        }
        
        // Method 6: Process of elimination - check if visible screen is not home, log, profile page
        const visibleScreens = Array.from(document.querySelectorAll('.screen'));
        for (let i = 0; i < visibleScreens.length; i++) {
            const screen = visibleScreens[i];
            const dataPage = screen.getAttribute('data-page');
            
            // Make sure it's not another known page
            if (dataPage && dataPage !== 'home' && dataPage !== 'log' && dataPage !== 'profile' && dataPage !== 'community') {
                // Further verify if it has Scan page characteristics
                if (screen.innerHTML.includes('Scanner') || 
                    screen.innerHTML.includes('scan') || 
                    screen.innerHTML.includes('camera')) {
                    console.log('Found possible Scan page through elimination');
                    return screen;
                }
            }
        }
        
        console.log('Unable to determine Scan page location, abandoning redesign');
        return null;
    }
    
    /**
     * Clear Scan page content, preserving necessary structure
     * @param {HTMLElement} scanScreen - Scan page element
     */
    function clearScanContent(scanScreen) {
        // Save page's data-page attribute
        const dataPage = scanScreen.getAttribute('data-page');
        
        // Optimization: Create a hidden container for style cleanup
        scanScreen.style.opacity = "0";
        
        // Replace content, clear all child elements
        while (scanScreen.firstChild) {
            scanScreen.removeChild(scanScreen.firstChild);
        }
        
        // Restore data-page attribute
        if (dataPage) {
            scanScreen.setAttribute('data-page', dataPage);
        } else {
            // If no data-page attribute, add one
            scanScreen.setAttribute('data-page', 'scan');
        }
        
        // Keep essential classes but remove others
        scanScreen.className = 'screen fullscreen-scan';
    }
    
    /**
     * Add newly designed Scan page content
     * @param {HTMLElement} scanScreen - Scan page element
     */
    function addScanContent(scanScreen) {
        // Create main container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'flex flex-col h-full scan-redesigned-container relative';
        
        // Create camera viewfinder - full-screen background
        const cameraViewfinder = createCameraViewfinder();
        
        // Create back button - moved up to avoid status bar
        const backButton = createBackButton();
        
        // Create top control buttons (flash, history) - moved up to avoid status bar
        const topControls = createTopControls();
        
        // Create capture button and gallery button
        const captureControls = createCaptureControls();
        
        // Create mode selection bar - 现在放在底部按钮下方
        const modeSelectionBar = createModeSelectionBar();
        
        // Combine page elements (removed status bar)
        mainContainer.appendChild(cameraViewfinder);
        mainContainer.appendChild(backButton);
        mainContainer.appendChild(topControls);
        mainContainer.appendChild(captureControls);
        mainContainer.appendChild(modeSelectionBar);
        
        // Add main container to Scan page
        scanScreen.appendChild(mainContainer);
        
        // Restore visibility after all content is loaded to prevent flickering
        setTimeout(() => {
            scanScreen.style.opacity = "1";
            scanScreen.style.transition = "opacity 0.2s ease-in-out";
        }, 10);
    }
    
    /**
     * Create camera viewfinder
     * @returns {HTMLElement} Camera viewfinder element
     */
    function createCameraViewfinder() {
        const viewfinder = document.createElement('div');
        viewfinder.className = 'absolute inset-0 bg-black z-0';
        
        // Use high-quality food photo as camera preview image
        const cameraPreview = document.createElement('div');
        cameraPreview.className = 'absolute inset-0 z-0';
        cameraPreview.style.backgroundImage = 'url("frontend/resource/food_photo.jpg")';
        cameraPreview.style.backgroundSize = 'cover';
        cameraPreview.style.backgroundPosition = 'center';
        
        // Add camera UI overlay elements
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 z-5';
        overlay.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)';
        
        // Add camera lens vignette effect (dark corners)
        const vignette = document.createElement('div');
        vignette.className = 'absolute inset-0 z-6';
        vignette.style.boxShadow = 'inset 0 0 150px rgba(0,0,0,0.8)';
        
        // Add subtle camera lens reflection/flare
        const lensFlare = document.createElement('div');
        lensFlare.className = 'absolute w-20 h-20 rounded-full bg-white bg-opacity-10 blur-xl z-6';
        lensFlare.style.top = '20%';
        lensFlare.style.right = '15%';
        
        // Add camera grid overlay (rule of thirds)
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'absolute inset-0 grid grid-cols-3 grid-rows-3 z-7';
        
        // Create the grid lines
        for (let i = 1; i < 3; i++) {
            // Vertical lines
            const verticalLine = document.createElement('div');
            verticalLine.className = 'col-start-' + i + ' col-span-1 border-l border-white border-opacity-30 h-full';
            gridOverlay.appendChild(verticalLine);
            
            // Horizontal lines
            const horizontalLine = document.createElement('div');
            horizontalLine.className = 'row-start-' + i + ' row-span-1 border-t border-white border-opacity-30 w-full';
            gridOverlay.appendChild(horizontalLine);
        }
        
        // Add camera UI elements - viewfinder frame with scanning effect
        const scanFrame = document.createElement('div');
        scanFrame.className = 'absolute inset-0 flex items-center justify-center z-10';
        
        // Create food analysis scanning frame
        const frame = document.createElement('div');
        frame.className = 'w-4/5 h-3/5 relative flex items-center justify-center';
        
        // Add corner brackets - more tech-like scanning frame
        const corners = [
            { position: 'top-0 left-0', classes: 'border-t-2 border-l-2' },
            { position: 'top-0 right-0', classes: 'border-t-2 border-r-2' },
            { position: 'bottom-0 left-0', classes: 'border-b-2 border-l-2' },
            { position: 'bottom-0 right-0', classes: 'border-b-2 border-r-2' }
        ];
        
        corners.forEach(corner => {
            const cornerElement = document.createElement('div');
            cornerElement.className = `absolute ${corner.position} w-8 h-8 ${corner.classes} border-white`;
            frame.appendChild(cornerElement);
        });
        
        // Add scanning animation
        const scanLine = document.createElement('div');
        scanLine.className = 'absolute left-0 right-0 h-0.5 bg-white bg-opacity-60 z-15';
        scanLine.style.top = '30%';
        scanLine.style.animation = 'scan-line 2s ease-in-out infinite';
        frame.appendChild(scanLine);
        
        // Add scanning animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scan-line {
                0% { top: 5%; }
                50% { top: 95%; }
                100% { top: 5%; }
            }
        `;
        document.head.appendChild(style);
        
        // Add food detection points/markers
        const detectionPoints = [
            { top: '40%', left: '30%', size: 'w-8 h-8' },
            { top: '60%', left: '65%', size: 'w-6 h-6' },
            { top: '35%', left: '75%', size: 'w-7 h-7' }
        ];
        
        detectionPoints.forEach(point => {
            const marker = document.createElement('div');
            marker.className = `absolute ${point.size} z-15`;
            marker.style.top = point.top;
            marker.style.left = point.left;
            
            // Outer ring pulsing
            const outerRing = document.createElement('div');
            outerRing.className = 'absolute inset-0 rounded-full border border-green-400 animate-ping';
            
            // Inner ring
            const innerRing = document.createElement('div');
            innerRing.className = 'absolute inset-2 rounded-full border border-green-400';
            
            // Center point
            const centerPoint = document.createElement('div');
            centerPoint.className = 'absolute inset-3 rounded-full bg-green-400 bg-opacity-50';
            
            marker.appendChild(outerRing);
            marker.appendChild(innerRing);
            marker.appendChild(centerPoint);
            frame.appendChild(marker);
        });
        
        // Add AI recognition text markers (simulating real-time analysis)
        const foodLabels = [
            { text: 'Grilled Salmon: 207 cal', top: '40%', left: '20%' },
            { text: 'Broccoli: 34 cal', top: '65%', left: '60%' },
            { text: 'Sweet Potato: 115 cal', top: '25%', left: '55%' }
        ];
        
        foodLabels.forEach(label => {
            const foodLabel = document.createElement('div');
            foodLabel.className = 'absolute bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-sm z-20';
            foodLabel.style.top = label.top;
            foodLabel.style.left = label.left;
            foodLabel.style.transform = 'translateY(15px)';
            foodLabel.style.whiteSpace = 'nowrap';  // Prevent text wrapping
            foodLabel.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';  // Add subtle shadow for legibility
            foodLabel.style.borderLeft = '2px solid #4ADE80';  // Green left border to connect with markers
            foodLabel.textContent = label.text;
            
            // Add max-width constraint and prevent overflow
            foodLabel.style.maxWidth = 'calc(100% - 20px)';
            foodLabel.style.textOverflow = 'ellipsis';
            foodLabel.style.overflow = 'hidden';
            
            frame.appendChild(foodLabel);
            
            // Add connecting line from label to detection point
            const connector = document.createElement('div');
            connector.className = 'absolute bg-green-400 opacity-60 z-15';
            connector.style.height = '1px';
            connector.style.width = '15px';
            connector.style.top = `calc(${label.top} + 12px)`;  // Center with the label
            
            // Position the connector to the left of the label
            const labelLeft = parseInt(label.left);
            connector.style.left = `calc(${labelLeft - 5}%)`;
            
            // Adjust connector position for Sweet Potato to point toward the detection point
            if (label.text.includes('Sweet Potato')) {
                connector.style.width = '20px';
                connector.style.left = `calc(${labelLeft + 20}%)`;
                connector.style.transform = 'rotate(45deg)';
            }
            
            frame.appendChild(connector);
        });
        
        scanFrame.appendChild(frame);
        
        // Add camera focus indicators
        const focusIndicator = document.createElement('div');
        focusIndicator.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-8';
        
        // Square focus box
        const focusBox = document.createElement('div');
        focusBox.className = 'absolute inset-0 border border-yellow-400 opacity-60';
        
        // Focus confirmed animation
        const focusConfirmed = document.createElement('div');
        focusConfirmed.className = 'absolute inset-0 border-2 border-green-400 opacity-0';
        focusConfirmed.style.animation = 'focus-confirm 1.5s ease-out forwards';
        
        // Add focus animation
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            @keyframes focus-confirm {
                0% { opacity: 0; transform: scale(1.2); }
                50% { opacity: 0.8; transform: scale(0.95); }
                100% { opacity: 0; transform: scale(1); }
            }
        `;
        document.head.appendChild(focusStyle);
        
        focusIndicator.appendChild(focusBox);
        focusIndicator.appendChild(focusConfirmed);
        
        // Add exposure meter
        const exposureMeter = document.createElement('div');
        exposureMeter.className = 'absolute left-6 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-black bg-opacity-50 rounded-full flex flex-col justify-center items-center z-20';
        
        const exposureIndicator = document.createElement('div');
        exposureIndicator.className = 'w-3 h-3 bg-white rounded-full';
        exposureIndicator.style.transform = 'translateX(4px)';
        
        exposureMeter.appendChild(exposureIndicator);
        
        // Assemble all elements
        viewfinder.appendChild(cameraPreview);
        viewfinder.appendChild(overlay);
        viewfinder.appendChild(vignette);
        viewfinder.appendChild(lensFlare);
        viewfinder.appendChild(gridOverlay);
        viewfinder.appendChild(scanFrame);
        viewfinder.appendChild(focusIndicator);
        viewfinder.appendChild(exposureMeter);
        
        return viewfinder;
    }
    
    /**
     * Create back button
     * @returns {HTMLElement} Back button element
     */
    function createBackButton() {
        const backButton = document.createElement('div');
        backButton.className = 'absolute top-4 left-5 z-50';  // Moved closer to top edge
        
        const button = document.createElement('button');
        button.className = 'w-10 h-10 bg-black bg-opacity-40 backdrop-filter backdrop-blur-md rounded-full flex items-center justify-center shadow-md';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        `;
        
        // Add click event to go back to previous page
        button.addEventListener('click', function() {
            console.log('Back button clicked');
            
            // Option 1: Use history API to go back
            // window.history.back();
            
            // Option 2: Hide current screen and show previous screen
            const scanScreen = document.querySelector('.screen[data-page="scan"]');
            if (scanScreen) {
                // Hide the scan screen
                scanScreen.style.display = 'none';
                
                // Remove fullscreen styles
                scanScreen.style.position = '';
                scanScreen.style.top = '';
                scanScreen.style.left = '';
                scanScreen.style.right = '';
                scanScreen.style.bottom = '';
                scanScreen.style.zIndex = '';
                
                // Show the previous screen (usually home)
                const homeScreen = document.querySelector('.screen[data-page="home"]');
                if (homeScreen) {
                    homeScreen.style.display = 'block';
                    
                    // Show navigation bar if it was hidden
                    const navBottom = document.querySelector('.nav-bottom');
                    if (navBottom) {
                        navBottom.style.display = 'flex';
                    }
                }
            }
        });
        
        backButton.appendChild(button);
        return backButton;
    }
    
    /**
     * Create top control buttons (flash, history)
     * @returns {HTMLElement} Top controls container
     */
    function createTopControls() {
        const topControls = document.createElement('div');
        topControls.className = 'absolute top-4 right-5 flex space-x-4 z-50';  // Moved closer to top edge
        
        // Create flash button
        const flashButton = document.createElement('button');
        flashButton.className = 'w-10 h-10 bg-black bg-opacity-40 backdrop-filter backdrop-blur-md rounded-full flex items-center justify-center shadow-md';
        
        // Flash off icon (default)
        flashButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        `;
        
        // Flash state tracking
        let flashState = 'off'; // off, on, auto
        
        // Add click event to toggle flash modes
        flashButton.addEventListener('click', function() {
            if (flashState === 'off') {
                // Switch to flash on
                flashState = 'on';
                flashButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                `;
            } else if (flashState === 'on') {
                // Switch to flash auto
                flashState = 'auto';
                flashButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        <text x="18" y="18" class="text-xs font-bold" fill="white">A</text>
                    </svg>
                `;
            } else {
                // Switch back to flash off
                flashState = 'off';
                flashButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                `;
            }
            
            console.log(`Flash state changed to: ${flashState}`);
        });
        
        // Create history button
        const historyButton = document.createElement('button');
        historyButton.className = 'w-10 h-10 bg-black bg-opacity-40 backdrop-filter backdrop-blur-md rounded-full flex items-center justify-center shadow-md';
        historyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
        
        // Add click event for history
        historyButton.addEventListener('click', function() {
            console.log('History button clicked');
            // Show scanning history here
        });
        
        topControls.appendChild(flashButton);
        topControls.appendChild(historyButton);
        
        return topControls;
    }
    
    /**
     * Create mode selection bar with recipe and dish modes
     * @returns {HTMLElement} Mode selection bar element
     */
    function createModeSelectionBar() {
        const modeBar = document.createElement('div');
        modeBar.className = 'absolute bottom-2 left-0 right-0 flex justify-center items-center z-30';
        
        const barContainer = document.createElement('div');
        barContainer.className = 'bg-black bg-opacity-60 backdrop-filter backdrop-blur-md rounded-full px-5 py-1 flex items-center space-x-10';
        barContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        
        // Create menu mode (book icon)
        const recipeMode = document.createElement('div');
        recipeMode.className = 'flex flex-col items-center cursor-pointer relative group py-1';
        
        const recipeModeIcon = document.createElement('div');
        recipeModeIcon.className = 'w-5 h-5 rounded-full bg-white flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
        recipeModeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        `;
        
        const recipeModeLabel = document.createElement('span');
        recipeModeLabel.className = 'text-[8px] text-white font-medium';
        recipeModeLabel.textContent = 'Menu Mode';
        
        // Create dish mode (plate icon)
        const dishMode = document.createElement('div');
        dishMode.className = 'flex flex-col items-center cursor-pointer relative group py-1';
        
        const dishModeIcon = document.createElement('div');
        dishModeIcon.className = 'w-5 h-5 rounded-full bg-white bg-opacity-70 flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
        dishModeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        `;
        
        const dishModeLabel = document.createElement('span');
        dishModeLabel.className = 'text-[8px] text-white font-medium';
        dishModeLabel.textContent = 'Dish Mode';
        
        // Add underline indicator instead of dot
        const recipeActiveIndicator = document.createElement('div');
        recipeActiveIndicator.className = 'absolute -bottom-0.5 w-full h-0.5 bg-white rounded-full transform transition-all duration-300';
        recipeActiveIndicator.style.width = '80%';
        recipeActiveIndicator.style.opacity = '0.9';
        
        // Add active state and events
        let activeMode = 'recipe'; // Default active mode
        
        recipeMode.addEventListener('click', function() {
            if (activeMode !== 'recipe') {
                activeMode = 'recipe';
                updateActiveStates();
                console.log('Menu mode activated');
                
                // Add subtle visual feedback
                recipeModeIcon.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    recipeModeIcon.style.transform = '';
                }, 150);
            }
        });
        
        dishMode.addEventListener('click', function() {
            if (activeMode !== 'dish') {
                activeMode = 'dish';
                updateActiveStates();
                console.log('Dish mode activated');
                
                // Add subtle visual feedback
                dishModeIcon.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    dishModeIcon.style.transform = '';
                }, 150);
            }
        });
        
        function updateActiveStates() {
            // Update icons based on active state
            if (activeMode === 'recipe') {
                recipeModeIcon.className = 'w-5 h-5 rounded-full bg-white flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
                dishModeIcon.className = 'w-5 h-5 rounded-full bg-white bg-opacity-70 flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
                
                // Move indicator with animation
                if (dishMode.contains(recipeActiveIndicator)) {
                    dishMode.removeChild(recipeActiveIndicator);
                }
                recipeMode.appendChild(recipeActiveIndicator);
                
                // Update text opacity
                recipeModeLabel.style.opacity = '1';
                dishModeLabel.style.opacity = '0.7';
            } else {
                recipeModeIcon.className = 'w-5 h-5 rounded-full bg-white bg-opacity-70 flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
                dishModeIcon.className = 'w-5 h-5 rounded-full bg-white flex items-center justify-center mb-1 transition-all transform group-hover:scale-110';
                
                // Move indicator with animation
                if (recipeMode.contains(recipeActiveIndicator)) {
                    recipeMode.removeChild(recipeActiveIndicator);
                }
                dishMode.appendChild(recipeActiveIndicator);
                
                // Update text opacity
                recipeModeLabel.style.opacity = '0.7';
                dishModeLabel.style.opacity = '1';
            }
        }
        
        // Assemble recipe mode
        recipeMode.appendChild(recipeModeIcon);
        recipeMode.appendChild(recipeModeLabel);
        recipeMode.appendChild(recipeActiveIndicator); // Add indicator to recipe mode by default
        
        // Assemble dish mode
        dishMode.appendChild(dishModeIcon);
        dishMode.appendChild(dishModeLabel);
        
        // Add modes to container
        barContainer.appendChild(recipeMode);
        barContainer.appendChild(dishMode);
        modeBar.appendChild(barContainer);
        
        // Initial state
        recipeModeLabel.style.opacity = '1';
        dishModeLabel.style.opacity = '0.7';
        
        return modeBar;
    }
    
    /**
     * Create capture button and gallery button
     * @returns {HTMLElement} Capture controls container
     */
    function createCaptureControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'absolute bottom-28 left-0 right-0 z-30';
        
        // 创建主容器，采用flex布局
        const mainContainer = document.createElement('div');
        mainContainer.className = 'w-full flex items-center justify-center relative';
        
        // 创建拍照按钮容器 - 居中
        const captureContainer = document.createElement('div');
        captureContainer.className = 'flex items-center justify-center';
        
        // 创建照片选择按钮容器 - 左侧
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'absolute left-20';
        
        // Create gallery button
        const galleryButton = createGalleryButton();
        
        // Create capture button
        const captureButton = createCaptureButton();
        
        // 添加按钮到各自的容器
        captureContainer.appendChild(captureButton);
        galleryContainer.appendChild(galleryButton);
        
        // 组装容器结构
        mainContainer.appendChild(galleryContainer);
        mainContainer.appendChild(captureContainer);
        controlsContainer.appendChild(mainContainer);
        
        return controlsContainer;
    }
    
    /**
     * Create gallery button for photo upload
     * @returns {HTMLElement} Gallery button
     */
    function createGalleryButton() {
        const button = document.createElement('button');
        button.className = 'w-10 h-10 rounded-full flex items-center justify-center relative focus:outline-none';
        
        // iOS-style outer circle
        const outerCircle = document.createElement('div');
        outerCircle.className = 'absolute inset-0 rounded-full';
        outerCircle.style.background = 'rgba(255, 255, 255, 0.2)';
        outerCircle.style.backdropFilter = 'blur(4px)';
        outerCircle.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        
        // Image icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-6 h-6 flex items-center justify-center relative';
        
        // iOS-style image icon (using SVG)
        iconContainer.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" stroke-width="1.5"/>
                <path d="M3 15L7.5 11L10.6 13.8L14.5 9L21 15" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
            </svg>
        `;
        
        // Create hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Only accept images
        fileInput.multiple = false; // iPhone photo selection is typically single
        fileInput.className = 'hidden';
        fileInput.id = 'gallery-upload';
        
        // Add ripple effect on click
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 rounded-full bg-white bg-opacity-30 scale-0';
        ripple.style.transformOrigin = 'center';
        ripple.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        
        // Add click event
        button.addEventListener('click', (e) => {
            // Show ripple animation
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0.5';
            
            setTimeout(() => {
                ripple.style.transform = 'scale(0)';
                ripple.style.opacity = '0';
            }, 300);
            
            // Show iOS-style photo selector
            showIOSStylePhotoSelector();
            
            console.log('Gallery button clicked');
        });
        
        // Assemble components
        button.appendChild(outerCircle);
        button.appendChild(ripple);
        button.appendChild(iconContainer);
        button.appendChild(fileInput);
        
        return button;
    }
    
    /**
     * Create capture button
     * @returns {HTMLElement} Capture button
     */
    function createCaptureButton() {
        const button = document.createElement('button');
        button.className = 'w-14 h-14 rounded-full flex items-center justify-center relative focus:outline-none';
        
        // Create shine animation for the button
        const shine = document.createElement('div');
        shine.className = 'absolute inset-0 rounded-full';
        shine.style.animation = 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
        shine.style.boxShadow = '0 0 8px 2px rgba(255, 255, 255, 0.3)';
        shine.style.opacity = '0';
        
        // Create pulse animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse-ring {
                0% { transform: scale(0.95); opacity: 0; }
                25% { opacity: 0.5; }
                50% { transform: scale(1.05); opacity: 0; }
                100% { opacity: 0; }
            }
            @keyframes capture-click {
                0% { transform: scale(1); }
                50% { transform: scale(0.92); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(pulseStyle);
        
        // Outer ring with gradient
        const outerRing = document.createElement('div');
        outerRing.className = 'absolute inset-0 rounded-full';
        outerRing.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(255,255,255,0.8))';
        outerRing.style.padding = '2px';
        
        // Inner circular background
        const innerBg = document.createElement('div');
        innerBg.className = 'absolute inset-0.5 rounded-full bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm';
        
        // Inner button
        const innerButton = document.createElement('div');
        innerButton.className = 'w-10 h-10 rounded-full bg-white transform transition-transform duration-200';
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            shine.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            shine.style.opacity = '0';
        });
        
        // Add click event
        button.addEventListener('click', function() {
            console.log('Capture button clicked');
            
            // Add visual feedback - animate the entire button
            button.style.animation = 'capture-click 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Reset animation
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
        });
        
        // Assemble components
        button.appendChild(shine);
        button.appendChild(outerRing);
        outerRing.appendChild(innerBg);
        button.appendChild(innerButton);
        
        return button;
    }
    
    /**
     * Display iOS style photo selector
     */
    function showIOSStylePhotoSelector() {
        // Get scan screen element
        const scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (!scanScreen) return;
        
        // Create bottom sheet container
        const sheetContainer = document.createElement('div');
        sheetContainer.className = 'absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end z-50';
        sheetContainer.style.animation = 'fadeIn 0.2s ease-out forwards';
        
        // Create animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            @keyframes slideDown {
                from { transform: translateY(0); }
                to { transform: translateY(100%); }
            }
            @keyframes scaleIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Create bottom sheet with light theme
        const sheet = document.createElement('div');
        sheet.className = 'bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl rounded-t-3xl overflow-hidden border-t border-[#FFBE98]/30';
        sheet.style.animation = 'slideUp 0.3s ease-out forwards';
        
        // Add drag indicator
        const dragIndicator = document.createElement('div');
        dragIndicator.className = 'w-10 h-1 bg-gray-300 rounded-full mx-auto my-3 opacity-60';
        
        // Create grid container for recent photos
        const gridContainer = document.createElement('div');
        gridContainer.className = 'px-4 pt-1 pb-4';
        
        // Add section title
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex justify-between items-center mb-4';
        
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'text-base font-medium text-gray-800';
        sectionTitle.textContent = 'Recent Photos';
        
        const viewAllButton = document.createElement('button');
        viewAllButton.className = 'text-sm text-[#FFBE98]';
        viewAllButton.textContent = 'View All';
        viewAllButton.addEventListener('click', () => {
            closeSheet();
            setTimeout(() => {
                console.log('View all photos');
                // Navigate to photo library
                showPhotoProcessingUI();
            }, 300);
        });
        
        titleContainer.appendChild(sectionTitle);
        titleContainer.appendChild(viewAllButton);
        
        // Create photo grid with nice shadow and rounded corners
        const photoGrid = document.createElement('div');
        photoGrid.className = 'grid grid-cols-4 gap-2';
        
        // Add placeholder recent photos (4x2 grid)
        const photoCount = 8;
        const photoSources = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
            'https://images.unsplash.com/photo-1568625502536-f92fe28c2ce8',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543'
        ];
        
        for (let i = 0; i < photoCount; i++) {
            const photoItem = document.createElement('div');
            photoItem.className = 'aspect-square rounded-xl overflow-hidden relative shadow-md transform transition-transform duration-200 active:scale-95';
            photoItem.style.animation = `scaleIn 0.3s ease-out forwards ${0.05 * i}s`;
            photoItem.style.opacity = '0';
            
            const photoContainer = document.createElement('div');
            photoContainer.className = 'h-full w-full relative group';
            
            const photo = document.createElement('img');
            photo.src = photoSources[i % photoSources.length] + '?w=300&h=300&fit=crop&q=90';
            photo.className = 'w-full h-full object-cover';
            photo.loading = 'lazy';
            
            // Add hover overlay
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-gradient-to-t from-[#FFBE98]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity';
            
            photoContainer.appendChild(photo);
            photoContainer.appendChild(overlay);
            photoItem.appendChild(photoContainer);
            photoGrid.appendChild(photoItem);
            
            // Add click event for each photo
            photoItem.addEventListener('click', () => {
                // Add selection effect
                photoItem.style.animation = 'pulse 0.3s ease-out';
                
                setTimeout(() => {
                    closeSheet();
                    setTimeout(() => {
                        showPhotoProcessingUI(photoSources[i % photoSources.length]);
                    }, 300);
                }, 150);
            });
        }
        
        // Create quick actions section with light theme
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'flex justify-center space-x-2 pt-4 pb-6 px-4 border-t border-gray-200';
        
        // Define quick actions
        const quickActions = [
            {
                name: 'Library',
                icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3 14l4-4 3 3 5-5 6 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                </svg>`,
                action: () => {
                    closeSheet();
                    setTimeout(() => {
                        showPhotoProcessingUI();
                    }, 300);
                }
            },
            {
                name: 'Browse',
                icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M3 12h18M3 18h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`,
                action: () => {
                    const fileInput = document.getElementById('gallery-upload');
                    if (fileInput) {
                        fileInput.click();
                        fileInput.addEventListener('change', () => {
                            if (fileInput.files.length > 0) {
                                closeSheet();
                                setTimeout(() => {
                                    showPhotoProcessingUI();
                                }, 300);
                            }
                        }, { once: true });
                    }
                }
            }
        ];
        
        // Create action buttons with light theme
        quickActions.forEach(action => {
            const actionButton = document.createElement('button');
            actionButton.className = 'flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 flex flex-col items-center justify-center transform transition-all duration-200 active:scale-95';
            
            const iconContainer = document.createElement('div');
            iconContainer.className = 'text-[#FFBE98] mb-1.5';
            iconContainer.innerHTML = action.icon;
            
            const actionName = document.createElement('span');
            actionName.className = 'text-xs font-medium';
            actionName.textContent = action.name;
            
            actionButton.appendChild(iconContainer);
            actionButton.appendChild(actionName);
            
            actionButton.addEventListener('click', action.action);
            
            actionsContainer.appendChild(actionButton);
        });
        
        // Add cancel button with light theme
        const cancelButton = document.createElement('button');
        cancelButton.className = 'w-full py-4 text-[#FFBE98] font-medium bg-gray-50 active:bg-gray-100 mb-safe';
        cancelButton.textContent = 'Cancel';
        cancelButton.style.marginBottom = 'env(safe-area-inset-bottom)'; // For iPhone X and newer
        
        // Add cancel button click event
        cancelButton.addEventListener('click', closeSheet);
        
        // Add background click event
        sheetContainer.addEventListener('click', (e) => {
            if (e.target === sheetContainer) {
                closeSheet();
            }
        });
        
        // Function to close the sheet
        function closeSheet() {
            sheetContainer.style.animation = 'fadeOut 0.2s ease-in forwards';
            sheet.style.animation = 'slideDown 0.2s ease-in forwards';
            
            setTimeout(() => {
                if (sheetContainer.parentNode) {
                    sheetContainer.parentNode.removeChild(sheetContainer);
                }
            }, 200);
        }
        
        // Assemble all components
        gridContainer.appendChild(titleContainer);
        gridContainer.appendChild(photoGrid);
        
        sheet.appendChild(dragIndicator);
        sheet.appendChild(gridContainer);
        sheet.appendChild(actionsContainer);
        sheet.appendChild(cancelButton);
        sheetContainer.appendChild(sheet);
        
        // Add to scan screen container
        const scanContainer = scanScreen.querySelector('.scan-redesigned-container');
        if (scanContainer) {
            scanContainer.appendChild(sheetContainer);
        } else {
            scanScreen.appendChild(sheetContainer);
        }
    }
    
    /**
     * Display photo processing UI
     * @param {string} photoSrc - Source URL of the photo to process
     */
    function showPhotoProcessingUI(photoSrc = 'frontend/resource/food_photo.jpg') {
        // Get scan screen element
        const scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (!scanScreen) return;
        
        // Create fullscreen container
        const container = document.createElement('div');
        container.className = 'absolute inset-0 bg-white z-50 flex flex-col';
        container.style.animation = 'fadeIn 0.3s ease-out forwards';
        
        // Create top navigation bar with light theme
        const topBar = document.createElement('div');
        topBar.className = 'flex items-center justify-between px-4 py-3 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md border-b border-gray-100';
        
        // Cancel button
        const cancelButton = document.createElement('button');
        cancelButton.className = 'text-gray-700 font-medium bg-gray-100 px-3 py-1.5 rounded-lg text-sm active:bg-gray-200';
        cancelButton.textContent = 'Cancel';
        
        // Use photo button
        const useButton = document.createElement('button');
        useButton.className = 'bg-[#FFBE98] text-white px-4 py-1.5 rounded-lg font-medium text-sm active:bg-[#EDA987] transition-all disabled:opacity-50 disabled:bg-[#FFBE98]/50';
        useButton.textContent = 'Use Photo';
        useButton.disabled = true;
        
        // Photo preview area
        const previewArea = document.createElement('div');
        previewArea.className = 'flex-grow flex items-center justify-center p-4 bg-gray-50';
        
        // Photo preview image with fade-in animation
        const previewImage = document.createElement('img');
        previewImage.src = photoSrc;
        previewImage.className = 'max-w-full max-h-full object-contain rounded-lg shadow-md';
        previewImage.style.opacity = '0';
        previewImage.style.transition = 'opacity 0.5s ease-in-out';
        
        // Load animation for image
        previewImage.onload = () => {
            setTimeout(() => {
                previewImage.style.opacity = '1';
            }, 100);
        };
        
        // Bottom progress container with light theme
        const progressContainer = document.createElement('div');
        progressContainer.className = 'p-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md border-t border-gray-100';
        
        const statusContainer = document.createElement('div');
        statusContainer.className = 'flex justify-between items-center mb-3';
        
        const statusText = document.createElement('div');
        statusText.className = 'text-gray-800 text-sm font-medium';
        statusText.textContent = 'Analyzing food...';
        
        const statusPercent = document.createElement('div');
        statusPercent.className = 'text-gray-500 text-xs';
        statusPercent.textContent = '0%';
        
        statusContainer.appendChild(statusText);
        statusContainer.appendChild(statusPercent);
        
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'w-full h-1 bg-gray-200 rounded-full overflow-hidden';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full bg-[#FFBE98] rounded-full w-0';
        progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        progressBarContainer.appendChild(progressBar);
        
        // Assemble components
        progressContainer.appendChild(statusContainer);
        progressContainer.appendChild(progressBarContainer);
        
        previewArea.appendChild(previewImage);
        
        topBar.appendChild(cancelButton);
        topBar.appendChild(useButton);
        
        container.appendChild(topBar);
        container.appendChild(previewArea);
        container.appendChild(progressContainer);
        
        // Add to scan screen container
        const scanContainer = scanScreen.querySelector('.scan-redesigned-container');
        if (scanContainer) {
            scanContainer.appendChild(container);
        } else {
            scanScreen.appendChild(container);
        }
        
        // Animation sequence
        setTimeout(() => {
            // Start progress animation
            progressBar.style.width = '100%';
            
            // Update percentage during animation
            let percent = 0;
            const percentInterval = setInterval(() => {
                percent += 5;
                statusPercent.textContent = `${percent}%`;
                if (percent >= 100) {
                    clearInterval(percentInterval);
                }
            }, 75);
            
            // Update status after 2 seconds
            setTimeout(() => {
                statusText.textContent = 'Analysis complete';
                statusPercent.textContent = '100%';
                useButton.disabled = false;
                
                // Show detection result with light theme
                const resultOverlay = document.createElement('div');
                resultOverlay.className = 'absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm';
                resultOverlay.style.animation = 'fadeIn 0.3s ease-out forwards';
                
                const resultBox = document.createElement('div');
                resultBox.className = 'bg-white p-5 rounded-xl max-w-xs text-left shadow-lg border border-gray-200';
                resultBox.style.animation = 'scaleIn 0.3s ease-out forwards';
                
                const resultTitle = document.createElement('div');
                resultTitle.className = 'text-xl font-semibold mb-3 text-gray-800';
                resultTitle.textContent = 'Detected Food';
                
                const resultContent = document.createElement('div');
                resultContent.className = 'text-gray-700 space-y-3';
                
                const foodItem = document.createElement('div');
                foodItem.className = 'flex justify-between border-b border-gray-200 pb-2';
                foodItem.innerHTML = '<span class="font-medium">Salmon Salad</span><span>356 calories</span>';
                
                const macrosContainer = document.createElement('div');
                macrosContainer.className = 'pt-2';
                
                const macrosTitle = document.createElement('div');
                macrosTitle.className = 'text-gray-500 text-xs mb-2';
                macrosTitle.textContent = 'NUTRITIONAL INFORMATION';
                
                const macrosInfo = document.createElement('div');
                macrosInfo.className = 'grid grid-cols-3 gap-2';
                
                const macros = [
                    { name: 'Protein', value: '28g', color: 'bg-[#FFBE98]' },
                    { name: 'Carbs', value: '18g', color: 'bg-[#A8E6CF]' },
                    { name: 'Fat', value: '12g', color: 'bg-[#FFD3B6]' }
                ];
                
                macros.forEach(macro => {
                    const macroItem = document.createElement('div');
                    macroItem.className = 'bg-gray-100 p-2 rounded-lg';
                    
                    const macroValue = document.createElement('div');
                    macroValue.className = 'text-base font-bold text-gray-800';
                    macroValue.textContent = macro.value;
                    
                    const macroIndicator = document.createElement('div');
                    macroIndicator.className = `h-1 ${macro.color} rounded-full my-1`;
                    
                    const macroName = document.createElement('div');
                    macroName.className = 'text-xs text-gray-500';
                    macroName.textContent = macro.name;
                    
                    macroItem.appendChild(macroValue);
                    macroItem.appendChild(macroIndicator);
                    macroItem.appendChild(macroName);
                    
                    macrosInfo.appendChild(macroItem);
                });
                
                const actionButton = document.createElement('button');
                actionButton.className = 'w-full bg-[#FFBE98] text-white py-2.5 rounded-lg mt-4 font-medium active:bg-[#EDA987] transition-colors';
                actionButton.textContent = 'Add to Log';
                
                actionButton.addEventListener('click', () => {
                    resultOverlay.style.animation = 'fadeOut 0.3s ease-in forwards';
                    setTimeout(() => {
                        if (resultOverlay.parentNode) {
                            resultOverlay.parentNode.removeChild(resultOverlay);
                        }
                    }, 300);
                });
                
                macrosContainer.appendChild(macrosTitle);
                macrosContainer.appendChild(macrosInfo);
                
                resultContent.appendChild(foodItem);
                resultContent.appendChild(macrosContainer);
                
                resultBox.appendChild(resultTitle);
                resultBox.appendChild(resultContent);
                resultBox.appendChild(actionButton);
                resultOverlay.appendChild(resultBox);
                
                previewArea.appendChild(resultOverlay);
            }, 2000);
        }, 200);
        
        // Cancel button event
        cancelButton.addEventListener('click', () => {
            container.style.animation = 'fadeOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }, 300);
        });
        
        // Use photo button event
        useButton.addEventListener('click', () => {
            container.style.animation = 'fadeOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }, 300);
        });
    }

    // 添加重试机制，如果扫描界面消失了可以重新尝试
    document.addEventListener('pageChanged', function(event) {
        if (event.detail && event.detail.pageId === 'scan') {
            console.log('检测到切换到scan页面，检查页面状态');
            
            setTimeout(function() {
                const scanScreen = document.querySelector('.screen[data-page="scan"]');
                if (scanScreen && scanScreen.style.opacity === "0" || !scanScreen.hasChildNodes()) {
                    console.log('发现scan页面可能已经消失，尝试恢复');
                    hasApplied = false; // 重置标记以允许重新应用
                    redesignScanPage();
                }
            }, 500);
        }
    });
})(); 