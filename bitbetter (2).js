(function() {
    if (window.quantumGateActive) {
        return;
    }
    window.quantumGateActive = true;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes qg-slideIn {
            0% {
                transform: translateY(-100%) scale(0.8);
                opacity: 0;
            }
            100% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }

        @keyframes qg-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes qg-glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% {
                box-shadow: 0 0 40px rgba(255, 255, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2);
            }
        }

        @keyframes qg-rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes qg-float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        @keyframes qg-shimmer {
            0% {
                background-position: -200% center;
            }
            100% {
                background-position: 200% center;
            }
        }

        @keyframes qg-fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes qg-borderTrace {
            0% {
                clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            25% {
                clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            }
            50% {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%);
            }
            75% {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
            100% {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
        }

        @keyframes qg-scanline {
            0% {
                transform: translateY(-100%);
            }
            100% {
                transform: translateY(100vh);
            }
        }

        @keyframes qg-glitch {
            0%, 100% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
        }

        @keyframes qg-shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            75% {
                transform: translateX(5px);
            }
        }

        @keyframes qg-expand {
            0% {
                transform: scale(0.95);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes qg-particle {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(1);
                opacity: 0;
            }
        }

        .qg-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: qg-fadeIn 0.3s ease-out;
            backdrop-filter: blur(10px);
        }

        .qg-container {
            position: relative;
            width: 600px;
            max-width: 90vw;
            max-height: 90vh;
            background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
            border: 2px solid #fff;
            border-radius: 16px;
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.05);
            animation: qg-slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            overflow: hidden;
        }

        .qg-container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #fff, #888, #fff);
            border-radius: 16px;
            z-index: -1;
            animation: qg-rotate 4s linear infinite;
            opacity: 0.3;
        }

        .qg-header {
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            border-bottom: 2px solid #fff;
            padding: 15px 20px;
            cursor: move;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            animation: qg-shimmer 3s linear infinite;
            background-size: 200% 100%;
        }

        .qg-title {
            font: 700 18px/1 -apple-system, sans-serif;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            animation: qg-pulse 2s ease-in-out infinite;
        }

        .qg-controls {
            display: flex;
            gap: 8px;
        }

        .qg-btn {
            width: 28px;
            height: 28px;
            border: 2px solid #fff;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;
            transition: all 0.3s ease;
            animation: qg-float 3s ease-in-out infinite;
        }

        .qg-btn:hover {
            background: #fff;
            color: #000;
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }

        .qg-btn:active {
            transform: scale(0.95);
        }

        .qg-content {
            padding: 30px;
            max-height: calc(90vh - 120px);
            overflow-y: auto;
            animation: qg-fadeIn 0.8s ease-out 0.3s both;
        }

        .qg-content::-webkit-scrollbar {
            width: 8px;
        }

        .qg-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }

        .qg-content::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            border: 2px solid transparent;
            background-clip: padding-box;
        }

        .qg-content::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
            background-clip: padding-box;
        }

        .qg-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            animation: qg-rotate 8s linear infinite, qg-glow 2s ease-in-out infinite;
        }

        .qg-logo svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6));
        }

        .qg-main-title {
            font: 700 32px/1.2 -apple-system, sans-serif;
            color: #fff;
            text-align: center;
            letter-spacing: 6px;
            margin-bottom: 8px;
            text-transform: uppercase;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            animation: qg-pulse 3s ease-in-out infinite;
        }

        .qg-subtitle {
            font: 300 12px/1 -apple-system, sans-serif;
            color: #ccc;
            text-align: center;
            letter-spacing: 3px;
            margin-bottom: 30px;
            text-transform: uppercase;
            opacity: 0.8;
        }

        .qg-input-group {
            margin-bottom: 20px;
            animation: qg-expand 0.5s ease-out 0.5s both;
        }

        .qg-input {
            width: 100%;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: #fff;
            font: 400 16px/1 -apple-system, sans-serif;
            letter-spacing: 4px;
            text-align: center;
            outline: none;
            transition: all 0.3s ease;
        }

        .qg-input:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            animation: qg-glow 1.5s ease-in-out infinite;
        }

        .qg-submit {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            border: 2px solid #fff;
            border-radius: 8px;
            color: #fff;
            font: 700 14px/1 -apple-system, sans-serif;
            letter-spacing: 3px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            animation: qg-expand 0.5s ease-out 0.7s both;
        }

        .qg-submit::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .qg-submit:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
            transform: translateY(-2px);
        }

        .qg-submit:active::before {
            width: 300px;
            height: 300px;
        }

        .qg-status {
            text-align: center;
            margin-top: 15px;
            font: 400 12px/1 -apple-system, sans-serif;
            color: #ccc;
            letter-spacing: 2px;
            min-height: 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .qg-status.show {
            opacity: 1;
            animation: qg-pulse 1s ease-in-out infinite;
        }

        .qg-dashboard {
            display: none;
            opacity: 0;
        }

        .qg-dashboard.active {
            display: block;
            animation: qg-fadeIn 0.8s ease-out forwards;
        }

        .qg-dashboard-title {
            font: 700 28px/1.2 -apple-system, sans-serif;
            color: #fff;
            text-align: center;
            letter-spacing: 5px;
            margin-bottom: 25px;
            text-transform: uppercase;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            animation: qg-shimmer 3s linear infinite;
            background: linear-gradient(90deg, #fff, #888, #fff);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .qg-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 20px;
        }

        .qg-card {
            padding: 25px 20px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
            overflow: hidden;
            animation: qg-expand 0.5s ease-out calc(var(--delay) * 0.1s) both;
        }

        .qg-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .qg-card:hover::before {
            left: 100%;
        }

        .qg-card:hover {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
            border-color: #fff;
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 40px rgba(255, 255, 255, 0.4);
            animation: qg-glow 1s ease-in-out infinite;
        }

        .qg-card h3 {
            font: 600 18px/1 -apple-system, sans-serif;
            color: #fff;
            letter-spacing: 2px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .qg-card p {
            font: 400 11px/1.4 -apple-system, sans-serif;
            color: #aaa;
            letter-spacing: 1px;
        }

        .qg-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        }

        .qg-particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
            animation: qg-particle 4s linear infinite;
        }

        .qg-scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: qg-scanline 3s linear infinite;
            pointer-events: none;
            z-index: 2;
        }

        .qg-collapsed .qg-content {
            display: none;
        }

        .qg-collapsed .qg-container {
            height: auto;
        }

        .qg-iframe-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 1000000;
            display: none;
            animation: qg-fadeIn 0.3s ease-out;
        }

        .qg-iframe-container.active {
            display: block;
        }

        .qg-iframe-header {
            background: #000;
            border-bottom: 2px solid #fff;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .qg-iframe-url {
            flex: 1;
            padding: 8px 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            color: #fff;
            font: 400 13px/1 monospace;
            margin-right: 10px;
            outline: none;
        }

        .qg-iframe-url:focus {
            border-color: #fff;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .qg-iframe-close {
            padding: 8px 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #fff;
            border-radius: 6px;
            color: #fff;
            font: 600 12px/1 -apple-system, sans-serif;
            letter-spacing: 2px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .qg-iframe-close:hover {
            background: #fff;
            color: #000;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }

        .qg-iframe {
            width: 100%;
            height: calc(100% - 50px);
            border: none;
        }

        .qg-error {
            animation: qg-shake 0.5s ease-in-out;
        }

        @media(max-width: 768px) {
            .qg-container {
                width: 95vw;
            }
            .qg-grid {
                grid-template-columns: 1fr;
            }
            .qg-main-title {
                font-size: 24px;
                letter-spacing: 4px;
            }
        }
    `;
    document.head.appendChild(style);

    const PASS = 'boisotuff';
    const URLS = {
        imp: 'https://hello.riesgocrediticio.com',
        reds: 'https://quizfox.sbs.cdn.cloudflare.net/',
        space: 'https://outerspace.boiso.ar/',
        velara: 'https://velara.turbo-education.com/',
        rift: 'https://polden.polden.com/',
        infamous: 'https://9k7m2r8f.tuitionplus.sg',
        demon: 'https://learn.turbo-education.com/'
    };

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let isCollapsed = false;
    let isFullscreen = false;

    const overlay = document.createElement('div');
    overlay.className = 'qg-overlay';
    overlay.innerHTML = `
        <div class="qg-container">
            <div class="qg-scanline"></div>
            <div class="qg-particles"></div>
            <div class="qg-header">
                <div class="qg-title">⚡ MOBASHIR GATE</div>
                <div class="qg-controls">
                    <div class="qg-btn" data-action="fullscreen" title="Fullscreen">⛶</div>
                    <div class="qg-btn" data-action="collapse" title="Collapse">−</div>
                    <div class="qg-btn" data-action="close" title="Close">×</div>
                </div>
            </div>
            <div class="qg-content">
                <div id="qg-login">
                    <div class="qg-logo">
                        <svg viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#fff" stroke-width="2" opacity="0.3"/>
                            <circle cx="50" cy="50" r="35" stroke="#fff" stroke-width="2" opacity="0.5"/>
                            <circle cx="50" cy="50" r="25" stroke="#fff" stroke-width="2" opacity="0.7"/>
                            <path d="M50 20 L50 80 M20 50 L80 50" stroke="#fff" stroke-width="2"/>
                            <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.9"/>
                        </svg>
                    </div>
                    <h1 class="qg-main-title">MOBASHIR GATE</h1>
                    <p class="qg-subtitle">Enter Access Credentials</p>
                    <div class="qg-input-group">
                        <input type="password" class="qg-input" id="qg-pass" placeholder="• • • • • • • •" autocomplete="off">
                    </div>
                    <button class="qg-submit" id="qg-unlock">Initialize Sequence</button>
                    <div class="qg-status" id="qg-status"></div>
                </div>
                <div class="qg-dashboard" id="qg-dash">
                    <h2 class="qg-dashboard-title">ACCESS GRANTED</h2>
                    <p class="qg-subtitle">Select Protocol Module</p>
                    <div class="qg-grid">
                        <div class="qg-card" data-url="imp" style="--delay:0">
                            <h3>IMP</h3>
                            <p>Intelligence Management Protocol</p>
                        </div>
                        <div class="qg-card" data-url="reds" style="--delay:1">
                            <h3>Red's Corner</h3>
                            <p>Classified Operations Center</p>
                        </div>
                        <div class="qg-card" data-url="space" style="--delay:2">
                            <h3>Space</h3>
                            <p>Outer Space Exploration</p>
                        </div>
                        <div class="qg-card" data-url="velara" style="--delay:3">
                            <h3>Velara</h3>
                            <p>Tuffy Velara Systems</p>
                        </div>
                        <div class="qg-card" data-url="rift" style="--delay:4">
                            <h3>Rift</h3>
                            <p>Endless Rift Gateway</p>
                        </div>
                        <div class="qg-card" data-url="infamous" style="--delay:5">
                            <h3>Infamous</h3>
                            <p>Restricted Access Zone</p>
                        </div>
                        <div class="qg-card" data-url="demon" style="--delay:6">
                            <h3>Demon</h3>
                            <p>Hell</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'qg-iframe-container';
    iframeContainer.innerHTML = `
        <div class="qg-iframe-header">
            <input type="text" class="qg-iframe-url" placeholder="URL loaded..." readonly>
            <button class="qg-iframe-close">Close [ESC]</button>
        </div>
        <iframe class="qg-iframe"></iframe>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(iframeContainer);

    const container = overlay.querySelector('.qg-container');
    const header = overlay.querySelector('.qg-header');
    const content = overlay.querySelector('.qg-content');
    const passInput = document.getElementById('qg-pass');
    const unlockBtn = document.getElementById('qg-unlock');
    const status = document.getElementById('qg-status');
    const loginDiv = document.getElementById('qg-login');
    const dashDiv = document.getElementById('qg-dash');
    const particles = overlay.querySelector('.qg-particles');

    // Create particles
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'qg-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        p.style.setProperty('--ty', -Math.random() * 500 + 'px');
        p.style.animationDelay = Math.random() * 4 + 's';
        particles.appendChild(p);
    }

    const showStatus = (text, error = false) => {
        status.textContent = text;
        status.classList.add('show');
        if (error) container.classList.add('qg-error');
        setTimeout(() => {
            status.classList.remove('show');
            container.classList.remove('qg-error');
        }, 2000);
    };

    const unlock = () => {
        const val = passInput.value.trim();
        if (val === PASS) {
            showStatus('ACCESS GRANTED');
            setTimeout(() => {
                loginDiv.style.display = 'none';
                dashDiv.classList.add('active');
            }, 1000);
            passInput.value = '';
        } else if (val) {
            showStatus('ACCESS DENIED', true);
            passInput.value = '';
        }
    };

    unlockBtn.addEventListener('click', unlock);
    passInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') unlock();
    });

    overlay.querySelectorAll('.qg-card').forEach(card => {
        card.addEventListener('click', () => {
            const url = URLS[card.dataset.url];
            if (url) {
                iframeContainer.querySelector('.qg-iframe').src = url;
                iframeContainer.querySelector('.qg-iframe-url').value = url;
                iframeContainer.classList.add('active');
            }
        });
    });

    // Dragging functionality
    header.addEventListener('mousedown', e => {
        if (e.target.closest('.qg-controls')) return;
        isDragging = true;
        offsetX = e.clientX - container.offsetLeft;
        offsetY = e.clientY - container.offsetTop;
        container.style.animation = 'none';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        container.style.left = e.clientX - offsetX + 'px';
        container.style.top = e.clientY - offsetY + 'px';
        container.style.position = 'fixed';
        container.style.transform = 'none';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Close button
    overlay.querySelector('[data-action="close"]').addEventListener('click', () => {
        overlay.remove();
        iframeContainer.remove();
        style.remove();
        window.quantumGateActive = false;
    });

    // Collapse button
    overlay.querySelector('[data-action="collapse"]').addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        overlay.classList.toggle('qg-collapsed');
        overlay.querySelector('[data-action="collapse"]').textContent = isCollapsed ? '+' : '−';

        if (isCollapsed) {
            overlay.style.backdropFilter = 'blur(0px)';
        } else {
            overlay.style.backdropFilter = 'blur(10px)';
        }
    });

    // Fullscreen button
    overlay.querySelector('[data-action="fullscreen"]').addEventListener('click', () => {
        if (!isFullscreen) {
            container.style.width = '100vw';
            container.style.maxWidth = '100vw';
            container.style.height = '100vh';
            container.style.maxHeight = '100vh';
            container.style.borderRadius = '0';
            container.style.left = '0';
            container.style.top = '0';
            content.style.maxHeight = 'calc(100vh - 120px)';
        } else {
            container.style.width = '600px';
            container.style.maxWidth = '90vw';
            container.style.height = 'auto';
            container.style.maxHeight = '90vh';
            container.style.borderRadius = '16px';
            container.style.left = '';
            container.style.top = '';
            container.style.position = '';
            container.style.transform = '';
            content.style.maxHeight = 'calc(90vh - 120px)';
        }
        isFullscreen = !isFullscreen;
    });

    // Iframe close button
    iframeContainer.querySelector('.qg-iframe-close').addEventListener('click', () => {
        iframeContainer.classList.remove('active');
        iframeContainer.querySelector('.qg-iframe').src = '';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + J to close
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
            const overlay = document.querySelector('.qg-overlay');
            const iframeContainer = document.querySelector('.qg-iframe-container');
            const styleTag = document.querySelector('style[data-qg-style]');

            if (overlay) overlay.remove();
            if (iframeContainer) iframeContainer.remove();
            if (styleTag) styleTag.remove();

            window.quantumGateActive = false;
        }
    });

    // ESC to close iframe
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && iframeContainer.classList.contains('active')) {
            iframeContainer.classList.remove('active');
            iframeContainer.querySelector('.qg-iframe').src = '';
        }
    });

    // Prevent clicking outside from closing (REMOVED)
    // The overlay click listener has been removed
    // Users must now use the X button or Ctrl+J to close
    
    passInput.focus();
})();