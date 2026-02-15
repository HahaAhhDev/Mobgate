(function() {
    if (window.quantumGateActive) {
        return;
    }
    window.quantumGateActive = true;

    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        :root {
            --primary-cyan: #00D9FF;
            --primary-purple: #8B5CF6;
            --primary-pink: #FF006E;
            --accent-green: #39FF14;
            --accent-red: #FF4444;
            --dark-bg: #0A0E27;
            --light-text: #F5F5FF;
            --text-secondary: #B0B0D9;

            --font-ui: 'Space Grotesk', -apple-system, sans-serif;
            --font-mono: 'IBM Plex Mono', monospace;
            --font-accent: 'Orbitron', sans-serif;

            --letter-tight: 0.5px;
            --letter-normal: 1px;
            --letter-wide: 2px;
            --letter-ultra-wide: 3px;

            --ease-out: cubic-bezier(0.34, 1.56, 0.64, 1);
            --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .qg-btn, .qg-card, .qg-input, .qg-submit {
                transition: all 0.1s ease;
            }

            .qg-logo, .qg-container::before, .qg-scanline, .qg-particle {
                animation: none !important;
            }
        }

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

        @keyframes qg-fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
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
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-6px);
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

        @keyframes qg-scanline {
            0% {
                transform: translateY(-100%);
            }
            100% {
                transform: translateY(100vh);
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

        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 0 10px rgba(0, 217, 255, 0.2),
                            0 0 20px rgba(139, 92, 246, 0.15),
                            inset 0 0 15px rgba(0, 217, 255, 0.05);
            }
            50% {
                box-shadow: 0 0 20px rgba(0, 217, 255, 0.5),
                            0 0 40px rgba(139, 92, 246, 0.3),
                            inset 0 0 25px rgba(0, 217, 255, 0.1);
            }
        }

        @keyframes entry-scale-fade {
            from {
                opacity: 0;
                transform: scale(0.92);
            }
            to {
                opacity: 1;
                transform: scale(1);
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
            width: 700px;
            max-width: 95vw;
            max-height: 90vh;
            background: linear-gradient(145deg, #0F1535, #050812);
            border: 2px solid var(--primary-cyan);
            border-radius: 18px;
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.2), 0 0 60px rgba(139, 92, 246, 0.1), inset 0 0 40px rgba(0, 217, 255, 0.02);
            animation: qg-slideIn 0.5s var(--ease-out);
            overflow: hidden;
        }

        .qg-container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--primary-cyan), var(--primary-purple), var(--primary-pink), var(--primary-cyan));
            border-radius: 18px;
            z-index: -1;
            animation: qg-rotate 4s linear infinite;
            opacity: 0.15;
        }

        .qg-header {
            background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(139, 92, 246, 0.05));
            border-bottom: 2px solid var(--primary-cyan);
            padding: 18px 24px;
            cursor: move;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            box-shadow: 0 2px 20px rgba(0, 217, 255, 0.1);
        }

        .qg-title {
            font: 700 18px/1 var(--font-ui);
            color: var(--primary-cyan);
            text-transform: uppercase;
            letter-spacing: var(--letter-wide);
            text-shadow: 0 0 15px rgba(0, 217, 255, 0.6), 0 0 30px rgba(139, 92, 246, 0.3);
            animation: none;
        }

        .qg-controls {
            display: flex;
            gap: 8px;
        }

        .qg-btn {
            width: 28px;
            height: 28px;
            border: 2px solid var(--primary-cyan);
            background: rgba(0, 217, 255, 0.05);
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-cyan);
            font-size: 16px;
            transition: all 0.25s var(--ease-smooth);
            animation: gentle-float 4s ease-in-out infinite;
        }

        .qg-btn:nth-child(1) { animation-delay: 0s; }
        .qg-btn:nth-child(2) { animation-delay: 0.2s; }
        .qg-btn:nth-child(3) { animation-delay: 0.4s; }

        .qg-btn:hover {
            background: var(--primary-cyan);
            color: var(--dark-bg);
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.8), inset 0 0 10px rgba(0, 217, 255, 0.3);
        }

        .qg-btn:active {
            transform: scale(0.95);
        }

        @keyframes gentle-float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-6px);
            }
        }

        .qg-content {
            padding: 40px 35px;
            max-height: calc(90vh - 120px);
            overflow-y: auto;
            animation: qg-fadeIn 0.7s ease-out 0.15s both;
        }

        .qg-content::-webkit-scrollbar {
            width: 8px;
        }

        .qg-content::-webkit-scrollbar-track {
            background: rgba(0, 217, 255, 0.05);
            border-radius: 4px;
        }

        .qg-content::-webkit-scrollbar-thumb {
            background: rgba(0, 217, 255, 0.3);
            border-radius: 4px;
            border: 2px solid transparent;
            background-clip: padding-box;
        }

        .qg-content::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 217, 255, 0.5);
            background-clip: padding-box;
        }

        .qg-logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 30px;
            animation: qg-rotate 8s linear infinite, pulse-glow 2s ease-in-out infinite;
        }

        .qg-logo svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.6));
        }

        .qg-main-title {
            font: 900 36px/1.1 var(--font-accent);
            background: linear-gradient(90deg, var(--primary-cyan), var(--primary-purple), var(--primary-pink));
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
            letter-spacing: var(--letter-ultra-wide);
            margin-bottom: 12px;
            text-transform: uppercase;
            animation: qg-shimmer 4s linear infinite;
        }

        .qg-subtitle {
            font: 400 14px/1.5 var(--font-ui);
            color: var(--text-secondary);
            text-align: center;
            letter-spacing: var(--letter-tight);
            margin-bottom: 40px;
            text-transform: uppercase;
            opacity: 0.9;
        }

        .qg-input-group {
            margin-bottom: 28px;
            display: flex;
            flex-direction: column;
            animation: entry-scale-fade 0.4s ease-out 0.4s both;
        }

        .qg-input {
            width: 100%;
            padding: 16px 20px;
            box-sizing: border-box;
            background: rgba(0, 217, 255, 0.05);
            border: 2px solid rgba(0, 217, 255, 0.3);
            border-radius: 10px;
            color: var(--primary-cyan);
            font: 500 14px/1.4 var(--font-mono);
            letter-spacing: var(--letter-normal);
            text-align: center;
            outline: none;
            transition: all 0.3s var(--ease-smooth);
            backdrop-filter: blur(10px);
        }

        .qg-input::placeholder {
            color: rgba(0, 217, 255, 0.4);
            opacity: 0.6;
        }

        .qg-input:focus {
            background: rgba(0, 217, 255, 0.08);
            border-color: var(--primary-cyan);
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.4), inset 0 0 15px rgba(0, 217, 255, 0.05);
            animation: pulse-glow 1.2s ease-in-out infinite;
        }

        .qg-submit {
            width: 100%;
            padding: 16px;
            background: rgba(0, 217, 255, 0.08);
            border: 2px solid var(--primary-cyan);
            border-radius: 10px;
            color: var(--primary-cyan);
            font: 700 13px/1 var(--font-mono);
            letter-spacing: var(--letter-normal);
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s var(--ease-smooth);
            position: relative;
            overflow: hidden;
            animation: entry-scale-fade 0.4s ease-out 0.6s both;
        }

        .qg-submit::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 217, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .qg-submit:hover {
            background: rgba(0, 217, 255, 0.12);
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.5), 0 0 15px rgba(139, 92, 246, 0.2);
            transform: translateY(-2px);
        }

        .qg-submit:active::before {
            width: 300px;
            height: 300px;
        }

        .qg-status {
            text-align: center;
            margin-top: 15px;
            font: 400 12px/1.4 var(--font-mono);
            color: var(--text-secondary);
            letter-spacing: var(--letter-tight);
            min-height: 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .qg-status.show {
            opacity: 1;
            animation: pulse-glow 0.8s ease-in-out infinite;
            color: var(--accent-green);
            text-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
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
            font: 700 28px/1.2 var(--font-ui);
            background: linear-gradient(90deg, var(--primary-cyan), var(--primary-purple), var(--primary-pink), var(--primary-blue), var(--primary-cyan));
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
            letter-spacing: var(--letter-wide);
            margin-bottom: 25px;
            text-transform: uppercase;
            text-shadow: none;
            animation: qg-shimmer 4s linear infinite;
        }

        .qg-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-top: 30px;
            padding: 0 10px;
        }

        .qg-card {
            padding: 32px 28px;
            min-height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: linear-gradient(145deg, rgba(0, 217, 255, 0.08), rgba(139, 92, 246, 0.04));
            border: 2px solid rgba(0, 217, 255, 0.2);
            border-radius: 14px;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s var(--ease-smooth);
            position: relative;
            overflow: hidden;
            animation: entry-scale-fade 0.5s ease-out both;
        }

        .qg-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.15), transparent);
            transition: left 0.5s ease;
        }

        .qg-card:hover::before {
            left: 100%;
        }

        .qg-card:hover {
            background: linear-gradient(145deg, rgba(0, 217, 255, 0.12), rgba(139, 92, 246, 0.08));
            border-color: var(--primary-cyan);
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3), 0 0 40px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(0, 217, 255, 0.05);
        }

        .qg-card h3 {
            font: 700 20px/1.2 var(--font-ui);
            color: var(--primary-cyan);
            letter-spacing: var(--letter-normal);
            margin-bottom: 12px;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0, 217, 255, 0.4);
        }

        .qg-card p {
            font: 400 13px/1.6 var(--font-ui);
            color: var(--text-secondary);
            letter-spacing: var(--letter-tight);
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
            background: var(--primary-cyan);
            border-radius: 50%;
            box-shadow: 0 0 6px rgba(0, 217, 255, 0.6);
            animation: qg-particle 4s linear infinite;
        }

        .qg-scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent);
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
            background: var(--dark-bg);
            z-index: 1000000;
            display: none;
            animation: qg-fadeIn 0.3s ease-out;
        }

        .qg-iframe-container.active {
            display: flex;
            flex-direction: column;
        }

        .qg-iframe-header {
            background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(139, 92, 246, 0.05));
            border-bottom: 2px solid var(--primary-cyan);
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            box-shadow: 0 2px 20px rgba(0, 217, 255, 0.15);
        }

        .qg-iframe-url {
            flex: 1;
            padding: 10px 16px;
            background: rgba(0, 217, 255, 0.05);
            border: 2px solid rgba(0, 217, 255, 0.3);
            border-radius: 8px;
            color: var(--primary-cyan);
            font: 400 12px/1 var(--font-mono);
            margin: 0;
            outline: none;
            transition: all 0.3s var(--ease-smooth);
            max-width: 400px;
        }

        .qg-iframe-url:focus {
            border-color: var(--primary-cyan);
            box-shadow: 0 0 15px rgba(0, 217, 255, 0.4), inset 0 0 10px rgba(0, 217, 255, 0.05);
            background: rgba(0, 217, 255, 0.08);
        }

        .qg-iframe-url.hidden {
            display: none;
        }

        .qg-iframe-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .qg-iframe-btn {
            padding: 10px 14px;
            background: rgba(0, 217, 255, 0.08);
            border: 2px solid var(--primary-cyan);
            border-radius: 8px;
            color: var(--primary-cyan);
            font: 600 11px/1 var(--font-ui);
            letter-spacing: var(--letter-tight);
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s var(--ease-smooth);
            white-space: nowrap;
            flex-shrink: 0;
        }

        .qg-iframe-btn:hover {
            background: var(--primary-cyan);
            color: var(--dark-bg);
            box-shadow: 0 0 15px rgba(0, 217, 255, 0.6);
            transform: translateY(-2px);
        }

        .qg-iframe-btn:active {
            transform: scale(0.95);
        }

        .qg-iframe-close {
            padding: 10px 14px;
            background: rgba(255, 68, 68, 0.08);
            border: 2px solid var(--accent-red);
            border-radius: 8px;
            color: var(--accent-red);
            font: 600 11px/1 var(--font-ui);
            letter-spacing: var(--letter-tight);
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s var(--ease-smooth);
            white-space: nowrap;
            flex-shrink: 0;
        }

        .qg-iframe-close:hover {
            background: var(--accent-red);
            color: #fff;
            box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
            transform: translateY(-2px);
        }

        .qg-iframe-close:active {
            transform: scale(0.95);
        }

        .qg-iframe {
            flex: 1;
            width: 100%;
            border: none;
        }

        .qg-error {
            animation: none;
        }

        @media(max-width: 900px) {
            .qg-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media(max-width: 768px) {
            .qg-container {
                width: 95vw;
            }
            .qg-grid {
                grid-template-columns: 1fr;
            }
            .qg-main-title {
                font-size: 28px;
                letter-spacing: var(--letter-wide);
            }
            .qg-card {
                padding: 24px 20px;
                min-height: auto;
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
                <div class="qg-title">&#9889; MOBASHIR GATE</div>
                <div class="qg-controls">
                    <div class="qg-btn" data-action="fullscreen" title="Fullscreen">&#10230;</div>
                    <div class="qg-btn" data-action="collapse" title="Collapse">&#8722;</div>
                    <div class="qg-btn" data-action="close" title="Close">&#215;</div>
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
                        <input type="password" class="qg-input" id="qg-pass" placeholder="&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226;" autocomplete="off">
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
            <div class="qg-iframe-controls">
                <button class="qg-iframe-btn" id="qg-toggle-url" title="Toggle URL">URL</button>
                <button class="qg-iframe-close">Close [ESC]</button>
            </div>
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

    // Iframe URL toggle button
    iframeContainer.querySelector('#qg-toggle-url').addEventListener('click', () => {
        const urlInput = iframeContainer.querySelector('.qg-iframe-url');
        urlInput.classList.toggle('hidden');
        const btn = iframeContainer.querySelector('#qg-toggle-url');
        btn.textContent = urlInput.classList.contains('hidden') ? 'Show URL' : 'Hide URL';
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
