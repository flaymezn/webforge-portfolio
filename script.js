document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FORMULÁRIO DE CONTATO (CORRIGIDO) ---
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const btnNewMessage = document.getElementById('btn-new-message');

    if(contactForm && contactSuccess) {
        // ENVIO
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = "ENCRIPTANDO DADOS...";
            btn.style.background = "var(--neon-green)";
            btn.style.color = "black";
            btn.disabled = true;
            btn.style.cursor = "wait";

            setTimeout(() => {
                contactForm.style.transition = "opacity 0.5s ease";
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    contactSuccess.style.display = 'block';
                    contactSuccess.style.opacity = '0';
                    contactSuccess.style.transition = "opacity 0.5s ease";
                    requestAnimationFrame(() => { contactSuccess.style.opacity = '1'; });
                }, 500);
            }, 1500);
        });

        // NOVA MENSAGEM (RESET SEM RELOAD)
        if(btnNewMessage) {
            btnNewMessage.addEventListener('click', (e) => {
                e.preventDefault(); 
                contactSuccess.style.opacity = '0';
                setTimeout(() => {
                    contactSuccess.style.display = 'none';
                    contactForm.reset();
                    const btnSend = contactForm.querySelector('button');
                    btnSend.innerText = "TRANSMITIR DADOS";
                    btnSend.style.background = ""; 
                    btnSend.style.color = "";
                    btnSend.disabled = false;
                    btnSend.style.cursor = "pointer";
                    contactForm.style.display = 'flex';
                    requestAnimationFrame(() => { contactForm.style.opacity = '1'; });
                }, 500);
            });
        }
    }

    // --- 2. CONFIGURAÇÕES GLOBAIS ---
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        document.documentElement.classList.add('is-scrolling');
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.documentElement.classList.remove('is-scrolling');
            document.body.classList.remove('is-scrolling');
        }, 150);
    });

    // --- 3. TYPEWRITER ---
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const subtitleWrapper = document.querySelector('.subtitle-wrapper');
        const text = "Forjando o Futuro com Código Puro.";
        let index = 0;
        let typingTimeout;
        function startTyping() {
            clearTimeout(typingTimeout);
            typewriterElement.textContent = "";
            index = 0;
            function type() {
                if (index < text.length) {
                    typewriterElement.textContent += text.charAt(index);
                    index++;
                    typingTimeout = setTimeout(type, Math.random() * (100 - 30) + 30);
                }
            }
            type();
        }
        setTimeout(startTyping, 1000);
        if(subtitleWrapper) subtitleWrapper.addEventListener('click', startTyping);
    }

    // --- 4. PARTICLES ---
    const canvasPart = document.getElementById('canvas-particles');
    if (canvasPart) {
        const ctxPart = canvasPart.getContext('2d');
        let mouse = { x: null, y: null, radius: 150 };
        window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
        window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
        function resizeCanvas() { canvasPart.width = window.innerWidth; canvasPart.height = window.innerHeight; }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        const particles = [];
        for(let i=0; i<350; i++) {
            particles.push({
                x: Math.random() * canvasPart.width, y: Math.random() * canvasPart.height,
                vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
                size: Math.random()*2 + 1, color: Math.random()>0.5 ? 'rgba(0, 217, 255, 0.7)' : 'rgba(255, 60, 0, 0.7)',
                density: (Math.random() * 30) + 1
            });
        }
        function animateParticles() {
            ctxPart.clearRect(0,0,canvasPart.width, canvasPart.height);
            particles.forEach(p => {
                let dx = mouse.x - p.x; let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    p.x -= (dx / distance) * force * p.density;
                    p.y -= (dy / distance) * force * p.density;
                } else { p.x += p.vx; p.y += p.vy; }
                if(p.x < 0) p.x = canvasPart.width; if(p.x > canvasPart.width) p.x = 0;
                if(p.y < 0) p.y = canvasPart.height; if(p.y > canvasPart.height) p.y = 0;
                ctxPart.fillStyle = p.color; ctxPart.beginPath(); ctxPart.arc(p.x, p.y, p.size, 0, Math.PI*2); ctxPart.fill();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- 5. TERMINAL & YOUTUBE ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                const newLine = document.createElement('div');
                newLine.innerHTML = `<span class="prompt">guest@webforge:~$</span> ${this.value}`;
                terminalOutput.appendChild(newLine);
                let response = "";
                switch(command) {
                    case 'help': response = "Comandos: help, clear, about, contact, date, cloud"; break;
                    case 'clear': terminalOutput.innerHTML = ""; response = ""; break;
                    case 'about': response = "WebForge v1.0 - Portfólio Full Stack."; break;
                    case 'contact': response = "jovitorzn@gmail.com | LinkedIn: /in/jvictor-carvalho-dev"; break;
                    case 'cloud': response = "Stack: AWS, Docker, Kubernetes, Terraform."; break;
                    case 'date': response = new Date().toString(); break;
                    case '': response = ""; break;
                    default: response = `Erro: Comando '${command}' não reconhecido.`;
                }
                if (response) {
                    const respLine = document.createElement('div');
                    respLine.style.color = "#ccc"; respLine.style.marginBottom = "10px"; respLine.textContent = response;
                    terminalOutput.appendChild(respLine);
                }
                this.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    if (document.getElementById('youtube-audio-player')) {
        let youtubePlayer;
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = function() {
            youtubePlayer = new YT.Player('youtube-audio-player', {
                height: '0', width: '0', videoId: 'vR7jQYrqr6c',
                playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': 'vR7jQYrqr6c' },
                events: { 'onReady': (event) => event.target.setVolume(30) }
            });
        };
        window.playBackgroundMusic = function() { if(youtubePlayer && youtubePlayer.playVideo && youtubePlayer.getPlayerState() !== 1) youtubePlayer.playVideo(); }
        window.pauseBackgroundMusic = function() { if(youtubePlayer && youtubePlayer.pauseVideo && youtubePlayer.getPlayerState() === 1) youtubePlayer.pauseVideo(); }
    } else { window.playBackgroundMusic = function() {}; window.pauseBackgroundMusic = function() {}; }

    // --- 6. TETRIS ENGINE ---
    const canvas = document.getElementById('tetris');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const nextCanvas = document.getElementById('next-piece');
        const nextCtx = nextCanvas.getContext('2d');
        const modeIndicator = document.getElementById('mode-indicator');
        
        const menuOverlay = document.getElementById('game-menu-overlay');
        const gameOverOverlay = document.getElementById('game-over-overlay');
        const initialPlayBtnContainer = document.getElementById('initial-play-btn-container');
        const difficultySelection = document.getElementById('difficulty-selection');
        const btnInitialPlay = document.getElementById('btn-initial-play');
        const btnPause = document.getElementById('btn-pause-game');
        const btnRestart = document.getElementById('btn-restart-game');
        const btnTryAgain = document.getElementById('btn-try-again');
        const finalScoreDisplay = document.getElementById('final-score-display');
        const scoreVal = document.getElementById('score');
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function synthTetrisSound() {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.5);
        }

        function triggerTetrisVisual() {
            const popup = document.getElementById('tetris-popup');
            popup.classList.remove('tetris-boom');
            void popup.offsetWidth;
            popup.classList.add('tetris-boom');
        }

        function triggerGameOverVisual() {
            const popup = document.getElementById('game-over-popup');
            popup.classList.remove('tetris-boom');
            void popup.offsetWidth;
            popup.classList.add('tetris-boom');
        }

        ctx.scale(30, 30);
        nextCtx.scale(20, 20);

        function createPiece(type) {
            if (type === 'I') return [[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0]];
            if (type === 'L') return [[0, 2, 0],[0, 2, 0],[0, 2, 2]];
            if (type === 'J') return [[0, 3, 0],[0, 3, 0],[3, 3, 0]];
            if (type === 'O') return [[4, 4],[4, 4]];
            if (type === 'Z') return [[5, 5, 0],[0, 5, 5],[0, 0, 0]];
            if (type === 'S') return [[0, 6, 6],[6, 6, 0],[0, 0, 0]];
            if (type === 'T') return [[0, 7, 0],[7, 7, 7],[0, 0, 0]];
            return [[0]];
        }
        const colors = [null,'#00d9ff','#ff3c00','#0033ff','#ffcc00','#ff003c','#00ff33','#cc00ff'];
        const arena = createMatrix(12, 20);
        const player = { pos: {x: 0, y: 0}, matrix: null, score: 0, next: null };

        let piecesBag = [];
        function getPieceFromBag() {
            if (piecesBag.length === 0) {
                const pieces = 'ILJOTSZ'.split('');
                for (let i = pieces.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
                }
                piecesBag = pieces;
            }
            return createPiece(piecesBag.pop());
        }

        let dropCounter = 0;
        let dropInterval = 1000;
        let lastTime = 0;
        let isPaused = true;
        let animationId = null;
        let currentDifficulty = 'easy';
        let floorFlashIntensity = 0;

        function createMatrix(w, h) {
            const matrix = [];
            while (h--) matrix.push(new Array(w).fill(0));
            return matrix;
        }
        function collide(arena, player) {
            const m = player.matrix;
            const o = player.pos;
            for (let y = 0; y < m.length; ++y) {
                for (let x = 0; x < m[y].length; ++x) {
                    if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) return true;
                }
            }
            return false;
        }

        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (floorFlashIntensity > 0) {
                ctx.save(); 
                const glowOpacity = floorFlashIntensity * 0.8;
                ctx.shadowColor = `rgba(0, 230, 255, ${glowOpacity})`;
                ctx.shadowBlur = 30 * floorFlashIntensity; 
                ctx.shadowOffsetY = 0; 
                ctx.fillStyle = `rgba(255, 255, 255, ${glowOpacity})`;
                arena.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) ctx.fillRect(x - 0.05, y - 0.05, 1.1, 1.1);
                    });
                });
                ctx.fillRect(0, arena.length - 0.1, arena[0].length, 0.2);
                ctx.restore(); 
            }

            drawMatrix(arena, {x: 0, y: 0}, ctx);
            drawMatrix(player.matrix, player.pos, ctx);
        }

        function drawMatrix(matrix, offset, context) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        context.shadowColor = colors[value];
                        context.shadowBlur = 20; 
                        context.fillStyle = colors[value];
                        context.fillRect(x + offset.x, y + offset.y, 1, 1);
                        context.shadowBlur = 0; 
                        context.lineWidth = 0.08;
                        context.strokeStyle = 'rgba(255,255,255,0.8)';
                        context.strokeRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
            context.shadowBlur = 0;
        }

        function drawNext() {
            nextCtx.fillStyle = '#000';
            nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
            const offset = { x: 2.5 - player.next[0].length / 2, y: 2.5 - player.next.length / 2 };
            drawMatrix(player.next, offset, nextCtx);
        }

        function merge(arena, player) {
            player.matrix.forEach((row, y) => {
                row.forEach((value, x) => { if (value !== 0) arena[y + player.pos.y][x + player.pos.x] = value; });
            });
        }
        function rotate(matrix, dir) {
            for (let y = 0; y < matrix.length; ++y) {
                for (let x = 0; x < y; ++x) [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
            if (dir > 0) matrix.forEach(row => row.reverse()); else matrix.reverse();
        }
        function updateSpeed() {
            let baseSpeed = 1000;
            if (currentDifficulty === 'medium') baseSpeed = 600;
            if (currentDifficulty === 'hard') baseSpeed = 200;
            const level = Math.floor(player.score / 100);
            const decrease = currentDifficulty === 'hard' ? 10 : 100; 
            let newInterval = baseSpeed - (level * decrease);
            if (newInterval < 100) newInterval = 100;
            dropInterval = newInterval;
        }
        function arenaSweep() {
            let rowsCleared = 0;
            outer: for (let y = arena.length -1; y > 0; --y) {
                for (let x = 0; x < arena[y].length; ++x) { if (arena[y][x] === 0) continue outer; }
                const row = arena.splice(y, 1)[0].fill(0);
                arena.unshift(row);
                ++y;
                rowsCleared++;
            }
            if (rowsCleared > 0) {
                const scoreTable = [0, 10, 30, 60, 100]; 
                player.score += scoreTable[rowsCleared];
                if(rowsCleared === 4) { synthTetrisSound(); triggerTetrisVisual(); }
                updateScore(); updateSpeed();
            }
        }
        
        function showGameOver() {
            isPaused = true;
            cancelAnimationFrame(animationId);
            triggerGameOverVisual(); 
            finalScoreDisplay.innerText = player.score;
            gameOverOverlay.style.display = 'flex'; 
        }

        function resetGameUI() {
            isPaused = true;
            cancelAnimationFrame(animationId);
            window.pauseBackgroundMusic();
            
            arena.forEach(row => row.fill(0));
            player.score = 0;
            updateScore();
            modeIndicator.innerText = "--";
            
            draw();
            nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

            btnPause.innerText = "PAUSAR";
            btnPause.disabled = true;
            btnRestart.disabled = true;

            menuOverlay.style.display = 'flex';
            gameOverOverlay.style.display = 'none';
            initialPlayBtnContainer.style.display = 'block';
            difficultySelection.style.display = 'none';
            piecesBag = [];
        }

        function playerReset() {
            if (player.next === null) player.next = getPieceFromBag();
            player.matrix = player.next;
            player.next = getPieceFromBag();
            drawNext();
            player.pos.y = 0;
            player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
            if (collide(arena, player)) showGameOver();
        }

        function playerDrop() {
            player.pos.y++;
            if (collide(arena, player)) {
                player.pos.y--;
                merge(arena, player);
                floorFlashIntensity = 1.0; 
                playerReset();
                arenaSweep();
            }
            dropCounter = 0;
        }

        function playerMove(dir) {
            player.pos.x += dir;
            if (collide(arena, player)) player.pos.x -= dir;
        }
        function playerRotate(dir) {
            const pos = player.pos.x;
            let offset = 1;
            rotate(player.matrix, dir);
            while (collide(arena, player)) {
                player.pos.x += offset; offset = -(offset + (offset > 0 ? 1 : -1));
                if (offset > player.matrix[0].length) { rotate(player.matrix, -dir); player.pos.x = pos; return; }
            }
        }
        function updateScore() { document.getElementById('score').innerText = player.score; }

        function update(time = 0) {
            if(isPaused) return;
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > dropInterval) playerDrop();
            if (floorFlashIntensity > 0) { floorFlashIntensity -= 0.03; if (floorFlashIntensity < 0) floorFlashIntensity = 0; }
            draw();
            animationId = requestAnimationFrame(update);
        }

        document.addEventListener('keydown', event => {
            if(isPaused) return;
            if([32, 37, 38, 39, 40].includes(event.keyCode)) event.preventDefault();
            if (event.keyCode === 37 || event.keyCode === 65) playerMove(-1);
            else if (event.keyCode === 39 || event.keyCode === 68) playerMove(1);
            else if (event.keyCode === 40 || event.keyCode === 83) playerDrop();
            else if (event.keyCode === 38 || event.keyCode === 87) playerRotate(1);
        });

        btnInitialPlay.addEventListener('click', () => { initialPlayBtnContainer.style.display = 'none'; difficultySelection.style.display = 'flex'; });
        
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentDifficulty = e.target.getAttribute('data-level');
                menuOverlay.style.display = 'none';
                window.playBackgroundMusic();
                arena.forEach(row => row.fill(0));
                player.score = 0; updateScore(); updateSpeed();
                piecesBag = []; 
                player.next = null;
                playerReset();
                modeIndicator.innerText = currentDifficulty.toUpperCase();
                btnPause.disabled = false; btnRestart.disabled = false;
                isPaused = false; update();
            });
        });

        btnPause.addEventListener('click', () => {
            if (isPaused) { isPaused = false; btnPause.innerText = "PAUSAR"; window.playBackgroundMusic(); update(); }
            else { isPaused = true; cancelAnimationFrame(animationId); btnPause.innerText = "CONTINUAR"; window.pauseBackgroundMusic(); }
        });
        btnRestart.addEventListener('click', resetGameUI);
        btnTryAgain.addEventListener('click', resetGameUI);

        resetGameUI();
    }
});