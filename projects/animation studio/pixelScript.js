document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const canvas = document.getElementById('pixel-canvas');
    const ctx = canvas.getContext('2d');
    const colorSelector = document.getElementById('color-selector');
    const colorPalette = document.getElementById('color-palette');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const gridSizeSelect = document.getElementById('grid-size');
    const resizeBtn = document.getElementById('resize-btn');
    const framesContainer = document.getElementById('frames-container');
    const addFrameBtn = document.getElementById('add-frame-btn');
    const deleteFrameBtn = document.getElementById('delete-frame-btn');
    const duplicateFrameBtn = document.getElementById('duplicate-frame-btn');
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const fpsSlider = document.getElementById('fps-slider');
    const fpsValue = document.getElementById('fps-value');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomLevel = document.getElementById('zoom-level');
    const clearBtn = document.getElementById('clear-btn');
    const saveBtn = document.getElementById('save-btn');
    const exportGifBtn = document.getElementById('export-gif-btn');
    const exportModal = document.getElementById('export-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const generateGifBtn = document.getElementById('generate-gif-btn');
    const gifPreview = document.getElementById('gif-preview');
    const downloadGifBtn = document.getElementById('download-gif-btn');
    const exportPngBtn = document.getElementById('export-png-btn');

    // App State
    let currentColor = colorSelector.value;
    let currentTool = 'pencil';
    let isDrawing = false;
    let gridSize = parseInt(gridSizeSelect.value);
    let cellSize = 16;
    let zoom = 1;
    let frames = [];
    let currentFrameIndex = 0;
    let animationInterval = null;
    let fps = parseInt(fpsSlider.value);
    let undoStack = [];
    let redoStack = [];
    
    // Initialize the app
    init();

    function init() {
        setupCanvas();
        setupEventListeners();
        setupDefaultPalette();
        addNewFrame();
        updateZoomDisplay();
    }

    function setupCanvas() {
        canvas.width = gridSize * cellSize;
        canvas.height = gridSize * cellSize;
        drawGrid();
    }

    function drawGrid() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= gridSize; x++) {
            ctx.beginPath();
            ctx.moveTo(x * cellSize, 0);
            ctx.lineTo(x * cellSize, gridSize * cellSize);
            ctx.stroke();
        }
        
        for (let y = 0; y <= gridSize; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * cellSize);
            ctx.lineTo(gridSize * cellSize, y * cellSize);
            ctx.stroke();
        }
    }

    function setupEventListeners() {
        // Color selection
        colorSelector.addEventListener('input', function() {
            currentColor = this.value;
        });

        // Tool selection
        toolButtons.forEach(button => {
            button.addEventListener('click', function() {
                toolButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentTool = this.dataset.tool;
            });
        });

        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        undoBtn.addEventListener('click', undo);
        redoBtn.addEventListener('click', redo);

        // Canvas drawing events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        // Touch support
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);

        // Grid size controls
        resizeBtn.addEventListener('click', resizeCanvas);

        // Frame controls
        addFrameBtn.addEventListener('click', addNewFrame);
        deleteFrameBtn.addEventListener('click', deleteCurrentFrame);
        duplicateFrameBtn.addEventListener('click', duplicateCurrentFrame);

        // Animation controls
        playBtn.addEventListener('click', playAnimation);
        stopBtn.addEventListener('click', stopAnimation);
        fpsSlider.addEventListener('input', updateFps);

        // Zoom controls
        zoomInBtn.addEventListener('click', zoomIn);
        zoomOutBtn.addEventListener('click', zoomOut);

        // Other buttons
        clearBtn.addEventListener('click', clearCurrentFrame);
        saveBtn.addEventListener('click', saveProject);
        exportGifBtn.addEventListener('click', openExportModal);
        closeModalBtn.addEventListener('click', closeExportModal);
        generateGifBtn.addEventListener('click', generateGif);
        exportPngBtn.addEventListener('click', exportAsPng);

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Click outside modal to close
        window.addEventListener('click', function(event) {
            if (event.target === exportModal) {
                closeExportModal();
            }
        });
    }

    function setupDefaultPalette() {
        const defaultColors = [
            '#000000', '#FFFFFF', '#FF0000', '#00FF00', 
            '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF',
            '#C0C0C0', '#808080', '#800000', '#808000',
            '#008000', '#800080', '#008080', '#000080'
        ];

        defaultColors.forEach(color => {
            addColorToPalette(color);
        });
    }

    function addColorToPalette(color = null) {
        const colorToAdd = color || currentColor;
        
        // Check if color already exists in palette
        const existingSwatches = Array.from(colorPalette.querySelectorAll('.color-swatch'));
        const colorExists = existingSwatches.some(swatch => swatch.style.backgroundColor === colorToAdd);
        
        if (colorExists) return;
        
        const colorSwatch = document.createElement('div');
        colorSwatch.className = 'color-swatch';
        colorSwatch.style.backgroundColor = colorToAdd;
        
        colorSwatch.addEventListener('click', function() {
            // Remove active class from all swatches
            document.querySelectorAll('.color-swatch').forEach(swatch => {
                swatch.classList.remove('active');
            });
            
            // Add active class to clicked swatch
            this.classList.add('active');
            
            // Set the current color
            currentColor = this.style.backgroundColor;
            colorSelector.value = rgbToHex(currentColor);
        });
        
        colorPalette.appendChild(colorSwatch);
    }
    function pushUndoState() {
        // Save current canvas state for undo
        const dataUrl = canvas.toDataURL();
        undoStack.push(dataUrl);
        // Limit stack size if needed
        if (undoStack.length > 50) undoStack.shift();
        // Clear redo stack on new action
        redoStack = [];
    }

    function undo() {
        if (undoStack.length === 0) return;
        const lastState = undoStack.pop();
        redoStack.push(canvas.toDataURL());
        restoreCanvasFromDataUrl(lastState);
        saveFrameState();
        updateFrameThumbnail(currentFrameIndex);
    }

    function redo() {
        if (redoStack.length === 0) return;
        const nextState = redoStack.pop();
        undoStack.push(canvas.toDataURL());
        restoreCanvasFromDataUrl(nextState);
        saveFrameState();
        updateFrameThumbnail(currentFrameIndex);
    }

    function restoreCanvasFromDataUrl(dataUrl) {
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = dataUrl;
    }
    function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (cellSize * zoom));
    const y = Math.floor((e.clientY - rect.top) / (cellSize * zoom));

    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;

    // Only push undo state on the first draw of a stroke
    if (isDrawing && !draw.hasDrawn) {
        pushUndoState();
        draw.hasDrawn = true;
    }

    switch (currentTool) {
        case 'pencil':
            drawPixel(x, y, currentColor);
            break;
        case 'eraser':
            drawPixel(x, y, '#FFFFFF');
            break;
    }

    updateFrameThumbnail(currentFrameIndex);
}
draw.hasDrawn = false;

function startDrawing(e) {
    isDrawing = true;
    draw.hasDrawn = false;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    saveFrameState();
}

// Keyboard shortcuts for undo/redo
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
    }
});

    function rgbToHex(rgb) {
        // Handle both rgb(r, g, b) and hex values
        if (rgb.startsWith('#')) return rgb;
        
        const rgbValues = rgb.match(/\d+/g);
        if (!rgbValues || rgbValues.length < 3) return '#000000';
        
        const r = parseInt(rgbValues[0]).toString(16).padStart(2, '0');
        const g = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
        const b = parseInt(rgbValues[2]).toString(16).padStart(2, '0');
        
        return `#${r}${g}${b}`.toUpperCase();
    }

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    }

    function drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        
        // Redraw grid lines
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    function drawGridLines() {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= gridSize; x++) {
            ctx.beginPath();
            ctx.moveTo(x * cellSize, 0);
            ctx.lineTo(x * cellSize, gridSize * cellSize);
            ctx.stroke();
        }
        
        for (let y = 0; y <= gridSize; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * cellSize);
            ctx.lineTo(gridSize * cellSize, y * cellSize);
            ctx.stroke();
        }
    }

    function resizeCanvas() {
        const newSize = parseInt(gridSizeSelect.value);
        
        if (newSize === gridSize) return;
        
        gridSize = newSize;
        setupCanvas();
        
        // Resize all frames
        frames.forEach(frame => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = gridSize * cellSize;
            tempCanvas.height = gridSize * cellSize;
            
            // Draw white background
            tempCtx.fillStyle = '#FFFFFF';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            
            // Draw the old frame content centered
            const oldCanvas = frame.canvas;
            const offsetX = Math.max(0, Math.floor((tempCanvas.width - oldCanvas.width) / 2));
            const offsetY = Math.max(0, Math.floor((tempCanvas.height - oldCanvas.height) / 2));
            tempCtx.drawImage(oldCanvas, offsetX, offsetY);
            
            // Update frame canvas
            frame.canvas = tempCanvas;
        });
        
        // Redraw current frame
        loadFrame(currentFrameIndex);
        updateAllFrameThumbnails();
    }

    function addNewFrame() {
        const newCanvas = document.createElement('canvas');
        newCanvas.width = gridSize * cellSize;
        newCanvas.height = gridSize * cellSize;
        const newCtx = newCanvas.getContext('2d');
        
        // Fill with white
        newCtx.fillStyle = '#FFFFFF';
        newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        drawGridLinesOnCanvas(newCtx, newCanvas.width, newCanvas.height);
        
        const frame = {
            canvas: newCanvas,
            thumbnail: null
        };
        
        frames.push(frame);
        currentFrameIndex = frames.length - 1;
        createFrameThumbnail(frame, frames.length - 1);
        loadFrame(currentFrameIndex);
    }

    function drawGridLinesOnCanvas(context, width, height) {
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 1;
        
        for (let x = 0; x <= gridSize; x++) {
            context.beginPath();
            context.moveTo(x * cellSize, 0);
            context.lineTo(x * cellSize, height);
            context.stroke();
        }
        
        for (let y = 0; y <= gridSize; y++) {
            context.beginPath();
            context.moveTo(0, y * cellSize);
            context.lineTo(width, y * cellSize);
            context.stroke();
        }
    }

    function createFrameThumbnail(frame, index) {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'frame-thumbnail';
        if (index === currentFrameIndex) {
            thumbnailContainer.classList.add('active');
        }
        
        const thumbnailCanvas = document.createElement('canvas');
        thumbnailCanvas.width = gridSize * 4;  // Small thumbnail size
        thumbnailCanvas.height = gridSize * 4;
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        
        // Scale down the frame canvas to thumbnail size
        thumbnailCtx.imageSmoothingEnabled = false;
        thumbnailCtx.drawImage(
            frame.canvas, 
            0, 0, frame.canvas.width, frame.canvas.height,
            0, 0, thumbnailCanvas.width, thumbnailCanvas.height
        );
        
        // Add frame number
        const frameNumber = document.createElement('div');
        frameNumber.className = 'frame-number';
        frameNumber.textContent = index + 1;
        
        thumbnailContainer.appendChild(thumbnailCanvas);
        thumbnailContainer.appendChild(frameNumber);
        frame.thumbnail = thumbnailContainer;
        
        thumbnailContainer.addEventListener('click', () => {
            selectFrame(index);
        });
        
        framesContainer.appendChild(thumbnailContainer);
    }

    function selectFrame(index) {
        if (index < 0 || index >= frames.length) return;
        
        // Update active frame highlight
        document.querySelectorAll('.frame-thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        frames[index].thumbnail.classList.add('active');
        
        currentFrameIndex = index;
        loadFrame(index);
    }

    function loadFrame(index) {
        const frame = frames[index];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame.canvas, 0, 0);
    }

    function updateFrameThumbnail(index) {
        if (index < 0 || index >= frames.length) return;
        
        const frame = frames[index];
        const thumbnailCanvas = frame.thumbnail.querySelector('canvas');
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        
        thumbnailCtx.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
        thumbnailCtx.imageSmoothingEnabled = false;
        thumbnailCtx.drawImage(
            frame.canvas, 
            0, 0, frame.canvas.width, frame.canvas.height,
            0, 0, thumbnailCanvas.width, thumbnailCanvas.height
        );
    }

    function updateAllFrameThumbnails() {
        frames.forEach((frame, index) => {
            updateFrameThumbnail(index);
        });
    }

    function deleteCurrentFrame() {
        if (frames.length <= 1) {
            alert('You must have at least one frame');
            return;
        }
        
        frames.splice(currentFrameIndex, 1);
        framesContainer.innerHTML = '';
        
        // Recreate all thumbnails
        frames.forEach((frame, index) => {
            createFrameThumbnail(frame, index);
        });
        
        // Adjust current frame index if needed
        if (currentFrameIndex >= frames.length) {
            currentFrameIndex = frames.length - 1;
        }
        
        selectFrame(currentFrameIndex);
    }

    function duplicateCurrentFrame() {
        const currentFrame = frames[currentFrameIndex];
        const newCanvas = document.createElement('canvas');
        newCanvas.width = currentFrame.canvas.width;
        newCanvas.height = currentFrame.canvas.height;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(currentFrame.canvas, 0, 0);
        
        const newFrame = {
            canvas: newCanvas,
            thumbnail: null
        };
        
        frames.splice(currentFrameIndex + 1, 0, newFrame);
        framesContainer.innerHTML = '';
        
        // Recreate all thumbnails
        frames.forEach((frame, index) => {
            createFrameThumbnail(frame, index);
        });
        
        selectFrame(currentFrameIndex + 1);
    }

    function saveFrameState() {
        const frameCanvas = frames[currentFrameIndex].canvas;
        const frameCtx = frameCanvas.getContext('2d');
        frameCtx.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
        frameCtx.drawImage(canvas, 0, 0);
    }

    function playAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
        }
        
        playBtn.disabled = true;
        stopBtn.disabled = false;
        
        let currentAnimationFrame = 0;
        
        animationInterval = setInterval(() => {
            loadFrame(currentAnimationFrame);
            currentAnimationFrame = (currentAnimationFrame + 1) % frames.length;
        }, 1000 / fps);
    }

    function stopAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        
        playBtn.disabled = false;
        stopBtn.disabled = true;
        
        loadFrame(currentFrameIndex);
    }

    function updateFps() {
        fps = parseInt(fpsSlider.value);
        fpsValue.textContent = `${fps} FPS`;
        
        if (animationInterval) {
            stopAnimation();
            playAnimation();
        }
    }

    function zoomIn() {
        if (zoom < 4) {
            zoom += 0.5;
            updateCanvasZoom();
        }
    }

    function zoomOut() {
        if (zoom > 0.5) {
            zoom -= 0.5;
            updateCanvasZoom();
        }
    }

    function updateCanvasZoom() {
        const canvasWrapper = canvas.parentElement;
        canvasWrapper.style.transform = `scale(${zoom})`;
        updateZoomDisplay();
    }

    function updateZoomDisplay() {
        zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
    }

    function clearCurrentFrame() {
        if (confirm('Are you sure you want to clear the current frame and delete the saved project?')) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawGridLines();
            saveFrameState();
            updateFrameThumbnail(currentFrameIndex);
            // Remove project from localStorage as well
            localStorage.clear();
        }
    }

    function saveProject() {
        const projectData = {
            gridSize: gridSize,
            cellSize: cellSize,
            frames: frames.map(frame => {
                return {
                    imageData: frame.canvas.toDataURL('image/png')
                };
            }),
            currentFrameIndex: currentFrameIndex,
            palette: Array.from(colorPalette.querySelectorAll('.color-swatch')).map(swatch => {
                return swatch.style.backgroundColor;
            }),
            currentColor: currentColor
        };
        
        const dataStr = JSON.stringify(projectData);
        localStorage.setItem('pixelArtProject', dataStr);
        alert('Project saved successfully!');
    }

    function loadProject() {
        const savedData = localStorage.getItem('pixelArtProject');
        if (!savedData) return false;
        
        try {
            const projectData = JSON.parse(savedData);
            
            // Reset current state
            frames = [];
            framesContainer.innerHTML = '';
            
            // Set basic properties
            gridSize = projectData.gridSize;
            cellSize = projectData.cellSize;
            gridSizeSelect.value = gridSize;
            
            // Load frames
            projectData.frames.forEach((frameData, index) => {
                const img = new Image();
                img.onload = function() {
                    const newCanvas = document.createElement('canvas');
                    newCanvas.width = gridSize * cellSize;
                    newCanvas.height = gridSize * cellSize;
                    const newCtx = newCanvas.getContext('2d');
                    newCtx.drawImage(img, 0, 0);
                    
                    const frame = {
                        canvas: newCanvas,
                        thumbnail: null
                    };
                    
                    frames.push(frame);
                    createFrameThumbnail(frame, index);
                    
                    // If this is the last frame, select it
                    if (index === projectData.frames.length - 1) {
                        currentFrameIndex = projectData.currentFrameIndex || 0;
                        selectFrame(currentFrameIndex);
                    }
                };
                img.src = frameData.imageData;
            });
            
            // Load color palette
            colorPalette.innerHTML = '';
            if (projectData.palette && projectData.palette.length > 0) {
                projectData.palette.forEach(color => {
                    addColorToPalette(color);
                });
            } else {
                setupDefaultPalette();
            }
            
            // Set current color
            if (projectData.currentColor) {
                currentColor = projectData.currentColor;
                colorSelector.value = currentColor;
            }
            
            return true;
        } catch (e) {
            console.error('Error loading project:', e);
            return false;
        }
    }

    function openExportModal() {
        exportModal.style.display = 'flex';
    }

    function closeExportModal() {
        exportModal.style.display = 'none';
        downloadGifBtn.classList.add('hidden');
        gifPreview.innerHTML = '<p>Preview will appear here</p>';
    }

    function generateGif() {
        gifPreview.innerHTML = '<p>Generating GIF... This may take a moment.</p>';
        
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: canvas.width,
            height: canvas.height,
            workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
        });
        
        frames.forEach(frame => {
            gif.addFrame(frame.canvas, { delay: 1000 / fps, copy: true });
        });
        
        gif.on('finished', function(blob) {
            const gifUrl = URL.createObjectURL(blob);
            gifPreview.innerHTML = `<img src="${gifUrl}" alt="Generated GIF" style="max-width:100%;">`;
            downloadGifBtn.href = gifUrl;
            downloadGifBtn.classList.remove('hidden');
        });
        
        gif.render();
    }

    function exportAsPng() {
        const frame = frames[currentFrameIndex];
        const link = document.createElement('a');
        link.download = `pixel-art-frame-${currentFrameIndex + 1}.png`;
        link.href = frame.canvas.toDataURL('image/png');
        link.click();
    }

    function handleKeyboardShortcuts(e) {
        // Don't trigger if typing in an input field
        if (e.target.tagName === 'INPUT') return;
        
        switch (e.key.toLowerCase()) {
            case 'p':
                selectTool('pencil');
                break;
            case 'e':
                selectTool('eraser');
                break;
            case 'b':
                selectTool('bucket');
                break;
            case 'i':
                selectTool('picker');
                break;
            case 'n':
                if (e.ctrlKey) addNewFrame();
                break;
            case 'd':
                if (e.ctrlKey) duplicateCurrentFrame();
                break;
            case 'delete':
            case 'backspace':
                deleteCurrentFrame();
                break;
            case ']':
                zoomIn();
                break;
            case '[':
                zoomOut();
                break;
            case ' ':
                if (animationInterval) {
                    stopAnimation();
                } else {
                    playAnimation();
                }
                break;
        }
    }

    function selectTool(tool) {
        toolButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tool === tool) {
                btn.classList.add('active');
            }
        });
        currentTool = tool;
    }

    // Try to load a saved project on startup
    if (!loadProject()) {
        // No saved project found, start fresh
        addNewFrame();
    }
});