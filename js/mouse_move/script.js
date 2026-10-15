

(function () {
  // ======= CONFIG =======
  const LINE_WIDTH = 50;     // Width of line element (px)
  const LINE_HEIGHT = 50;     // Height of line element (px)
  const GRID_GAP_X = 100;    // Horizontal spacing between centers (px)
  const GRID_GAP_Y = 100;    // Vertical spacing between centers (px)
  const GRID_MARGIN = 50;    // Padding from edges (px)

  // ======= STATE =======
  const wrapper = document.getElementById('lineWrapper');
  let lines = [];            // { element, cx, cy }
  let mouse = { x: 0, y: 0 };// Mouse within wrapper coords
  let requestId = null;      // rAF id
  let mouseDot = null;       // Optional visual

  // ======= UTIL =======
  function scheduleUpdate() {
    if (!requestId) requestId = requestAnimationFrame(update);
  }

  function getWrapperRect() {
    const r = wrapper.getBoundingClientRect();
    return {
      left: r.left + window.scrollX,
      top: r.top + window.scrollY,
      width: r.width,
      height: r.height
    };
  }

  // Build or rebuild the grid to fill wrapper
  function buildGrid() {
    // Clear existing
    for (const line of lines) {
      line.element.remove();
    }
    lines.length = 0;

    // Create mouse dot (once)
    if (!mouseDot) {
      mouseDot = document.createElement('div');
      mouseDot.className = 'mouse-dot';
      wrapper.appendChild(mouseDot);
    }

    const rect = getWrapperRect();
    const w = rect.width;
    const h = rect.height;

    // Calculate placement bounds inside wrapper
    const startX = GRID_MARGIN;
    const startY = GRID_MARGIN;
    const endX = Math.max(GRID_MARGIN, w - GRID_MARGIN - LINE_WIDTH);
    const endY = Math.max(GRID_MARGIN, h - GRID_MARGIN - LINE_HEIGHT);

    // Lay out lines in a grid
    for (let y = startY; y <= endY; y += GRID_GAP_Y) {
      for (let x = startX; x <= endX; x += GRID_GAP_X) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.width = LINE_WIDTH + 'px';
        line.style.height = LINE_HEIGHT + 'px';
        line.style.left = x + 'px';
        line.style.top = y + 'px';
        wrapper.appendChild(line);

        lines.push({
          element: line,
          cx: x + LINE_WIDTH / 2,
          cy: y + LINE_HEIGHT / 2
        });
      }
    }

    scheduleUpdate();
  }

  // Animation step: rotate each line toward mouse
  function update() {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const dx = mouse.x - line.cx;
      const dy = mouse.y - line.cy;
      // Keep transform minimal (only rotation) for perf
      line.element.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    }

    // Move the optional mouse dot
    if (mouseDot) {
      mouseDot.style.left = mouse.x + 'px';
      mouseDot.style.top = mouse.y + 'px';
    }

    requestId = null;
  }

  // Mouse handling: get coords relative to wrapper
  function handlePointerMove(clientX, clientY) {
    const r = wrapper.getBoundingClientRect();
    mouse.x = clientX - r.left;
    mouse.y = clientY - r.top;
    scheduleUpdate();
  }

  // ======= EVENTS =======
  // Pointer/mouse move (support mouse + touch)
  wrapper.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY);
    }
  }, { passive: true });

  // Rebuild grid on wrapper resize
  const ro = new ResizeObserver(() => {
    buildGrid();
  });
  ro.observe(wrapper);

  // Initial build
  buildGrid();
})();
