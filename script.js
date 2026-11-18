/* ==========================================================================
   Happy Princess Day - Interactive Experience Script
   Dedicated to: Princess Akhsa • November 18
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Default State Tailored to Princess Day & Princess Akhsa ---
  const DEFAULT_CONFIG = {
    sisterName: "Princess Akhsa",
    senderName: "Your Big Sister Always",
    customNote: "",
    hugCount: 142
  };

  const DEFAULT_BUCKET_LIST = [
    { id: "b1", text: "A royal spa & pampering princess day together 🧖‍♀️", done: true, isCustom: false },
    { id: "b2", text: "High tea date at a fancy aesthetic cafe with pastries ☕", done: true, isCustom: false },
    { id: "b3", text: "Get cute matching crown or tiara charm jewelry 👑", done: true, isCustom: false },
    { id: "b4", text: "Surprise delivery of royal flowers & favorite sweet treats 💐", done: false, isCustom: false },
    { id: "b5", text: "Glamorous photoshoot wearing fancy dresses & tiaras 📸", done: false, isCustom: false },
    { id: "b6", text: "Plan a magical vacation to a dreamy fairytale destination ✈️", done: false, isCustom: false }
  ];

  // --- Local Storage Wrapper ---
  const storage = {
    get: (key, fallback) => {
      try {
        const item = localStorage.getItem('princess_akhsa_v1_' + key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem('princess_akhsa_v1_' + key, JSON.stringify(value));
      } catch (e) {
        console.warn("Storage write error:", e);
      }
    }
  };

  // State
  let config = storage.get('config', DEFAULT_CONFIG);
  let bucketList = storage.get('bucket_list', DEFAULT_BUCKET_LIST);

  // --- DOM Elements ---
  const heroSisterName = document.getElementById('heroSisterName');
  const recipientInlineNames = document.querySelectorAll('.recipient-inline-name, .letter-recipient-name');
  const senderNameDisplays = document.querySelectorAll('#senderNameDisplay, #signatureDisplay');
  const editableLetterContent = document.getElementById('editableLetterContent');
  const letterPunchline = document.getElementById('letterPunchline');

  const envelopeCard = document.getElementById('envelopeCard');
  const envelopePrompt = document.getElementById('envelopePrompt');
  const letterParchment = document.getElementById('letterParchment');
  const openLetterCta = document.getElementById('openLetterCta');
  const foldLetterBtn = document.getElementById('foldLetterBtn');
  const printLetterBtn = document.getElementById('printLetterBtn');
  const customizeLetterBtn = document.getElementById('customizeLetterBtn');

  const hugCounterBtn = document.getElementById('hugCounterBtn');
  const hugCountSpan = document.getElementById('hugCount');

  const customizeModal = document.getElementById('customizeModal');
  const customizeForm = document.getElementById('customizeForm');
  const closeCustomizeBtn = document.getElementById('closeCustomizeBtn');
  const inputSisterName = document.getElementById('inputSisterName');
  const inputSenderName = document.getElementById('inputSenderName');
  const inputCustomNote = document.getElementById('inputCustomNote');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  const bucketListItems = document.getElementById('bucketListItems');
  const addBucketItemForm = document.getElementById('addBucketItemForm');
  const newBucketInput = document.getElementById('newBucketInput');
  const bucketProgressBar = document.getElementById('bucketProgressBar');
  const bucketProgressText = document.getElementById('bucketProgressText');

  const confettiBtn = document.getElementById('confettiBtn');
  const hugeConfettiBtn = document.getElementById('hugeConfettiBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const toastContainer = document.getElementById('toastContainer');

  // --- Puzzle Gate DOM Elements & Logic (Passcode: Akki - Step by Step) ---
  const TARGET_LETTERS = ['A', 'K', 'K', 'I'];
  const puzzleGate = document.getElementById('puzzleGate');
  const puzzleForm = document.getElementById('puzzleForm');
  const passcodeBoxes = document.getElementById('passcodeBoxes');
  const passInputs = Array.from(document.querySelectorAll('.pass-char'));
  const puzzleFeedback = document.getElementById('puzzleFeedback');
  const lockVaultBtn = document.getElementById('lockVaultBtn');
  const riddleSteps = [
    document.getElementById('riddleStep0'),
    document.getElementById('riddleStep1'),
    document.getElementById('riddleStep2'),
    document.getElementById('riddleStep3')
  ];
  const blankChars = [
    document.getElementById('blankChar0'),
    document.getElementById('blankChar1'),
    document.getElementById('blankChar2'),
    document.getElementById('blankChar3')
  ];

  let currentStep = 0;

  function resetPuzzleToStep(stepIndex = 0) {
    currentStep = stepIndex;
    passInputs.forEach((input, idx) => {
      if (idx < currentStep) {
        input.value = TARGET_LETTERS[idx];
        input.disabled = true;
        input.classList.remove('error');
        input.classList.add('success');
      } else if (idx === currentStep) {
        input.value = '';
        input.disabled = false;
        input.classList.remove('error', 'success');
      } else {
        input.value = '';
        input.disabled = true;
        input.classList.remove('error', 'success');
      }
    });

    riddleSteps.forEach((stepEl, idx) => {
      if (!stepEl) return;
      if (idx < currentStep) {
        stepEl.className = 'riddle-step solved';
        if (blankChars[idx]) blankChars[idx].textContent = TARGET_LETTERS[idx];
      } else if (idx === currentStep) {
        stepEl.className = 'riddle-step active';
        if (blankChars[idx]) blankChars[idx].textContent = '_';
      } else {
        stepEl.className = 'riddle-step';
        if (blankChars[idx]) blankChars[idx].textContent = '_';
      }
    });

    if (puzzleFeedback) {
      if (currentStep === 0) {
        puzzleFeedback.textContent = "Type the missing letter for clue #1 💡";
        puzzleFeedback.className = "puzzle-feedback";
      }
    }

    setTimeout(() => {
      passInputs[currentStep]?.focus();
    }, 150);
  }

  function unlockVault() {
    currentStep = 4;
    if (puzzleFeedback) {
      puzzleFeedback.textContent = "✨ Secret Passcode Accepted! Welcome, Princess Akhsa! 👑💕";
      puzzleFeedback.className = "puzzle-feedback success";
    }

    playChime();
    triggerConfetti();

    // Auto-update sisterName to Princess Akhsa
    if (!config.sisterName || config.sisterName === "Little Sis" || config.sisterName === "Akki" || config.sisterName === "Princess Akki") {
      config.sisterName = "Princess Akhsa";
      storage.set('config', config);
      applyPersonalization();
    }

    showToast("👑 Happy Princess Day, Princess Akhsa! 💕");

    // Smoothly fade out and completely remove lock overlay from page
    setTimeout(() => {
      if (puzzleGate) {
        puzzleGate.classList.add('is-unlocked');
        document.body.classList.remove('lock-active');
        setTimeout(() => {
          puzzleGate.style.display = 'none';
        }, 600);
      }
    }, 650);
  }

  function initPuzzleGate() {
    document.body.classList.add('lock-active');
    if (puzzleGate) {
      puzzleGate.style.display = 'flex';
      puzzleGate.classList.remove('is-unlocked');
      resetPuzzleToStep(0);
    }
  }

  function handleLetterInput(idx) {
    const input = passInputs[idx];
    const val = (input.value || '').toUpperCase().trim();
    if (!val) return;

    const char = val.slice(-1);
    input.value = char;

    if (char === TARGET_LETTERS[idx]) {
      // Correct letter for this step!
      input.classList.remove('error');
      input.classList.add('success');
      input.disabled = true;

      // Mark riddle step as solved and reveal letter
      if (riddleSteps[idx]) riddleSteps[idx].className = 'riddle-step solved';
      if (blankChars[idx]) blankChars[idx].textContent = char;

      playChime();

      if (idx < TARGET_LETTERS.length - 1) {
        // Advance to next line!
        currentStep = idx + 1;
        const nextStepEl = riddleSteps[currentStep];
        if (nextStepEl) nextStepEl.className = 'riddle-step active';

        const nextInput = passInputs[currentStep];
        if (nextInput) {
          nextInput.disabled = false;
          nextInput.focus();
        }

        if (puzzleFeedback) {
          puzzleFeedback.textContent = `✨ Letter '${char}' correct! Clue #${currentStep + 1} unlocked below ⬇️`;
          puzzleFeedback.className = "puzzle-feedback success";
        }
      } else {
        // ALL 4 LETTERS SOLVED! (A - K - K - I)
        unlockVault();
      }
    } else {
      // Incorrect letter for this step
      input.classList.add('error');
      if (passcodeBoxes) passcodeBoxes.classList.add('shake');
      playTone(220, 0.25, 0.08);

      if (puzzleFeedback) {
        puzzleFeedback.textContent = `❌ Not quite! What letter completes clue #${idx + 1}? 💭`;
        puzzleFeedback.className = "puzzle-feedback error";
      }

      setTimeout(() => {
        if (passcodeBoxes) passcodeBoxes.classList.remove('shake');
        input.value = '';
        input.classList.remove('error');
        input.focus();
      }, 500);
    }
  }

  // Input event listeners for the 4 boxes
  passInputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      handleLetterInput(idx);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        resetPuzzleToStep(idx - 1);
      }
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim().toUpperCase();
      if (pasteData) {
        if (pasteData === "AKKI") {
          for (let i = 0; i < 4; i++) {
            passInputs[i].value = TARGET_LETTERS[i];
            passInputs[i].disabled = true;
            passInputs[i].classList.add('success');
            if (riddleSteps[i]) riddleSteps[i].className = 'riddle-step solved';
            if (blankChars[i]) blankChars[i].textContent = TARGET_LETTERS[i];
          }
          unlockVault();
        } else {
          input.value = pasteData.slice(0, 1);
          handleLetterInput(idx);
        }
      }
    });
  });

  // Submit form
  if (puzzleForm) {
    puzzleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (currentStep < 4) {
        passInputs[currentStep]?.focus();
      }
    });
  }

  // Re-lock Vault Button
  if (lockVaultBtn) {
    lockVaultBtn.addEventListener('click', () => {
      if (puzzleGate) {
        puzzleGate.style.display = 'flex';
        void puzzleGate.offsetWidth; // Force CSS reflow
        puzzleGate.classList.remove('is-unlocked');
        document.body.classList.add('lock-active');
        resetPuzzleToStep(0);
        showToast("🔒 Vault locked! Solve riddle to enter.");
      }
    });
  }

  // --- Sound Synthesizer (Web Audio API) ---
  let audioCtx = null;
  let isMusicPlaying = false;
  let melodyInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration = 0.5, gainValue = 0.08) {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      gain1.gain.setValueAtTime(gainValue, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + duration);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(gainValue * 0.25, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.5);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + duration * 0.5);
    } catch (e) {
      // Audio safely guarded
    }
  }

  function playChime() {
    initAudio();
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((note, idx) => {
      setTimeout(() => playTone(note, 0.6, 0.06), idx * 110);
    });
  }

  function playHugChime() {
    initAudio();
    playTone(523.25, 0.35, 0.07);
    setTimeout(() => playTone(659.25, 0.4, 0.08), 120);
    setTimeout(() => playTone(783.99, 0.55, 0.09), 240);
  }

  function toggleMelody() {
    initAudio();
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
      musicToggleBtn.querySelector('.btn-label').textContent = 'Music: On 🎶';
      musicToggleBtn.setAttribute('aria-pressed', 'true');
      musicToggleBtn.classList.add('primary-glow');
      showToast("🎵 Soft royal princess melody playing");

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 523.25, 392.00];
      let step = 0;
      melodyInterval = setInterval(() => {
        const note = notes[step % notes.length];
        playTone(note, 0.9, 0.035);
        step = (step + 1) % notes.length;
      }, 550);
    } else {
      musicToggleBtn.querySelector('.btn-label').textContent = 'Music: Off';
      musicToggleBtn.setAttribute('aria-pressed', 'false');
      musicToggleBtn.classList.remove('primary-glow');
      if (melodyInterval) clearInterval(melodyInterval);
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // --- Personalization Sync ---
  function applyPersonalization() {
    const rawSisterName = config.sisterName || DEFAULT_CONFIG.sisterName;
    const cleanSisterName = rawSisterName.replace(/^dearest\s+/i, '');

    if (heroSisterName) heroSisterName.textContent = cleanSisterName;
    recipientInlineNames.forEach(el => el.textContent = cleanSisterName);
    senderNameDisplays.forEach(el => el.textContent = config.senderName || DEFAULT_CONFIG.senderName);
    if (hugCountSpan) hugCountSpan.textContent = config.hugCount;

    const existingCustomPara = document.getElementById('customUserParagraph');
    if (config.customNote && config.customNote.trim()) {
      if (!existingCustomPara) {
        const p = document.createElement('p');
        p.id = 'customUserParagraph';
        p.style.fontStyle = 'italic';
        p.style.color = '#e04875';
        p.style.borderLeft = '3px solid #e04875';
        p.style.paddingLeft = '1rem';
        p.textContent = `"${config.customNote}"`;
        if (letterPunchline) {
          editableLetterContent.insertBefore(p, letterPunchline);
        } else {
          editableLetterContent.appendChild(p);
        }
      } else {
        existingCustomPara.textContent = `"${config.customNote}"`;
      }
    } else if (existingCustomPara) {
      existingCustomPara.remove();
    }
  }

  // --- Envelope & Letter Folding/Unfolding ---
  function openEnvelope() {
    playChime();
    envelopeCard.classList.add('is-open');
    letterParchment.classList.add('is-visible');
    if (envelopePrompt) envelopePrompt.textContent = "💌 Letter Unfolded (Tap to Close)";

    setTimeout(() => {
      letterParchment.scrollIntoView({ behavior: 'smooth', block: 'start' });
      triggerConfetti();
    }, 450);
  }

  function closeEnvelope() {
    letterParchment.classList.remove('is-visible');
    envelopeCard.classList.remove('is-open');
    if (envelopePrompt) envelopePrompt.textContent = "💌 Tap Envelope to Open";
    envelopeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast("Envelope neatly folded! 💌");
  }

  function toggleEnvelope() {
    if (envelopeCard.classList.contains('is-open')) {
      closeEnvelope();
    } else {
      openEnvelope();
    }
  }

  if (envelopeCard) {
    envelopeCard.addEventListener('click', toggleEnvelope);
    envelopeCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }

  if (openLetterCta) {
    openLetterCta.addEventListener('click', (e) => {
      e.preventDefault();
      openEnvelope();
    });
  }

  if (foldLetterBtn) foldLetterBtn.addEventListener('click', closeEnvelope);
  if (printLetterBtn) {
    printLetterBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Big Sis Virtual Hugs ---
  if (hugCounterBtn) {
    hugCounterBtn.addEventListener('click', (e) => {
      config.hugCount++;
      storage.set('config', config);
      hugCountSpan.textContent = config.hugCount;
      playHugChime();
      spawnFloatingHeart(e.clientX, e.clientY);

      const hugQuotes = [
        "Royal princess hug sent across town! 👑💕",
        "Happy Princess Day to my Akhsa! ✨",
        "You'll always be my precious little princess! 💖",
        "Best soul sister and princess in the whole universe! 🏆",
        "May your crown never tilt, my darling little sis! 🌸"
      ];
      const randomQuote = hugQuotes[Math.floor(Math.random() * hugQuotes.length)];
      showToast(randomQuote);
    });
  }

  function spawnFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = (x || window.innerWidth / 2) + 'px';
    heart.style.top = (y || window.innerHeight / 2) + 'px';
    heart.style.fontSize = '2.2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease';
    heart.style.transform = `translate(-50%, -50%) scale(0.6)`;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 140;
      const offsetY = -160 - Math.random() * 80;
      heart.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.6) rotate(${Math.random() * 30 - 15}deg)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1050);
  }

  // --- Customize Modal ---
  function openCustomizer() {
    inputSisterName.value = config.sisterName || "";
    inputSenderName.value = config.senderName || "";
    inputCustomNote.value = config.customNote || "";
    if (typeof customizeModal.showModal === 'function') {
      customizeModal.showModal();
    } else {
      customizeModal.setAttribute('open', '');
    }
  }

  function closeCustomizer() {
    if (typeof customizeModal.close === 'function') {
      customizeModal.close();
    } else {
      customizeModal.removeAttribute('open');
    }
  }

  if (heroSisterName) {
    heroSisterName.addEventListener('click', openCustomizer);
    heroSisterName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCustomizer();
      }
    });
  }

  if (customizeLetterBtn) customizeLetterBtn.addEventListener('click', openCustomizer);
  if (closeCustomizeBtn) closeCustomizeBtn.addEventListener('click', closeCustomizer);

  customizeModal.addEventListener('click', (e) => {
    if (e.target === customizeModal) closeCustomizer();
  });

  customizeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    config.sisterName = inputSisterName.value.trim() || DEFAULT_CONFIG.sisterName;
    config.senderName = inputSenderName.value.trim() || DEFAULT_CONFIG.senderName;
    config.customNote = inputCustomNote.value.trim();
    storage.set('config', config);
    applyPersonalization();
    closeCustomizer();
    showToast(`Personalized for ${config.sisterName}! ✨`);
    triggerConfetti();
  });

  resetDefaultsBtn.addEventListener('click', () => {
    config = { ...DEFAULT_CONFIG, hugCount: config.hugCount };
    storage.set('config', config);
    applyPersonalization();
    closeCustomizer();
    showToast("Reset to default names.");
  });

  // --- Sister Bucket List ---
  function renderBucketList() {
    bucketListItems.innerHTML = '';
    const completedCount = bucketList.filter(item => item.done).length;
    const totalCount = bucketList.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    bucketProgressBar.style.width = percentage + '%';
    bucketProgressText.textContent = `${completedCount} of ${totalCount} Completed (${percentage}%)`;

    bucketList.forEach(item => {
      const li = document.createElement('li');
      li.className = `bucket-item ${item.done ? 'completed' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'chk-' + item.id;
      checkbox.checked = item.done;

      const label = document.createElement('label');
      label.className = 'bucket-item-label';
      label.htmlFor = 'chk-' + item.id;
      label.textContent = item.text;

      checkbox.addEventListener('change', () => {
        item.done = checkbox.checked;
        storage.set('bucket_list', bucketList);
        renderBucketList();
        if (item.done) {
          playHugChime();
          showToast("Adventure checked off! 🎉");
          triggerConfetti();
        }
      });

      li.appendChild(checkbox);
      li.appendChild(label);

      if (item.isCustom) {
        const delBtn = document.createElement('button');
        delBtn.className = 'bucket-delete-btn';
        delBtn.innerHTML = '✕';
        delBtn.title = 'Remove this goal';
        delBtn.setAttribute('aria-label', `Remove ${item.text}`);
        delBtn.addEventListener('click', () => {
          bucketList = bucketList.filter(b => b.id !== item.id);
          storage.set('bucket_list', bucketList);
          renderBucketList();
        });
        li.appendChild(delBtn);
      }

      bucketListItems.appendChild(li);
    });
  }

  addBucketItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = newBucketInput.value.trim();
    if (!text) return;

    bucketList.push({
      id: "b-" + Date.now(),
      text: text,
      done: false,
      isCustom: true
    });
    storage.set('bucket_list', bucketList);
    newBucketInput.value = '';
    renderBucketList();
    showToast("New adventure added to your bucket list! 🌟");
  });

  // --- Reasons 3D Flip Card: Click & Key Listeners ---
  const reasonCards = document.querySelectorAll('.reason-card');
  reasonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

  // --- Confetti Engine ---
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#e04875', '#f472b6', '#f59e0b', '#fb923c', '#a855f7', '#38bdf8', '#34d399'];
    const shapes = ['circle', 'rect', 'heart'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.42
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.alpha -= 0.009;

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;

          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          } else {
            ctx.beginPath();
            const topCurveHeight = p.size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, -p.size / 2, 0, -p.size / 2, topCurveHeight);
            ctx.bezierCurveTo(-p.size / 2, (p.size + topCurveHeight) / 2, 0, (p.size + topCurveHeight) / 2, 0, p.size);
            ctx.bezierCurveTo(0, (p.size + topCurveHeight) / 2, p.size / 2, (p.size + topCurveHeight) / 2, p.size / 2, topCurveHeight);
            ctx.bezierCurveTo(p.size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
      }
    }

    render();
  }

  confettiBtn.addEventListener('click', () => {
    playChime();
    triggerConfetti();
    showToast("👑 Happy Princess Day, Princess Akhsa! 🎉");
  });

  hugeConfettiBtn.addEventListener('click', () => {
    playChime();
    triggerConfetti();
    setTimeout(triggerConfetti, 280);
    setTimeout(triggerConfetti, 560);
    showToast("👑 Showering royal love, magic & confetti for Princess Akhsa! ✨");
  });

  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleMelody);

  // --- Background Ambient Floating Canvas ---
  const ambientCanvas = document.getElementById('ambientCanvas');
  if (ambientCanvas) {
    const actx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const petals = [];
    for (let i = 0; i < 24; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.6 + 0.3,
        color: ['rgba(244, 114, 182, 0.25)', 'rgba(251, 146, 60, 0.2)', 'rgba(224, 72, 117, 0.2)', 'rgba(216, 180, 254, 0.25)'][Math.floor(Math.random() * 4)]
      });
    }

    function animateAmbient() {
      actx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        actx.beginPath();
        actx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        actx.fillStyle = p.color;
        actx.fill();
      });
      requestAnimationFrame(animateAmbient);
    }
    animateAmbient();
  }

  // --- Initial Mount ---
  initPuzzleGate();
  applyPersonalization();
  renderBucketList();
});
