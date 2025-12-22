// VF5 REVO Pro Gamer Companion App
// Main Application Logic

// Character Frame Data Database
const frameData = {
  akira: {
    name: "Akira Yuki",
    moves: [
      { name: "P (Jab)", notation: "P", startup: 10, block: "+1", hit: "+6", type: "High" },
      { name: "PP", notation: "PP", startup: 10, block: "-2", hit: "+4", type: "High, High" },
      { name: "PPP", notation: "PPP", startup: 10, block: "KD", hit: "KD", type: "High, High, Mid" },
      { name: "6P", notation: "6P", startup: 14, block: "-2", hit: "+6", type: "Mid" },
      { name: "3P", notation: "3P", startup: 12, block: "-5", hit: "KD", type: "Special Mid" },
      { name: "2P", notation: "2P", startup: 10, block: "+1", hit: "+6", type: "Special Mid" },
      { name: "K (Kick)", notation: "K", startup: 14, block: "-5", hit: "0", type: "High" },
      { name: "6K", notation: "6K", startup: 15, block: "-9", hit: "KD", type: "Mid" },
      { name: "3K", notation: "3K", startup: 17, block: "-11", hit: "KD", type: "Low" },
      { name: "2K", notation: "2K", startup: 12, block: "-14", hit: "-3", type: "Low" },
      { name: "Bodycheck", notation: "66P+K", startup: 18, block: "-8", hit: "KD", type: "Mid" },
      { name: "Double Palm", notation: "46P", startup: 16, block: "-9", hit: "Launch", type: "Mid" },
      { name: "SDE", notation: "33P", startup: 17, block: "-16", hit: "Launch", type: "Mid" }
    ]
  },
  pai: {
    name: "Pai Chan",
    moves: [
      { name: "P (Jab)", notation: "P", startup: 10, block: "+1", hit: "+6", type: "High" },
      { name: "PP", notation: "PP", startup: 10, block: "-2", hit: "+4", type: "High, High" },
      { name: "PPP", notation: "PPP", startup: 10, block: "-5", hit: "+3", type: "High, High, High" },
      { name: "6P", notation: "6P", startup: 14, block: "-2", hit: "+6", type: "Mid" },
      { name: "4P", notation: "4P", startup: 12, block: "-6", hit: "+5", type: "Mid" },
      { name: "2P", notation: "2P", startup: 10, block: "+1", hit: "+6", type: "Special Mid" },
      { name: "K (Kick)", notation: "K", startup: 13, block: "-4", hit: "0", type: "High" },
      { name: "6K", notation: "6K", startup: 16, block: "-9", hit: "KD", type: "Mid" },
      { name: "3K", notation: "3K", startup: 16, block: "-12", hit: "KD", type: "Low" },
      { name: "2K", notation: "2K", startup: 12, block: "-13", hit: "-2", type: "Low" },
      { name: "Tenshin", notation: "236P", startup: 19, block: "-14", hit: "Launch", type: "Mid" },
      { name: "Heel Kick", notation: "3K+G", startup: 18, block: "-11", hit: "KD", type: "Mid" }
    ]
  },
  kage: {
    name: "Kage-Maru",
    moves: [
      { name: "P (Jab)", notation: "P", startup: 10, block: "+1", hit: "+6", type: "High" },
      { name: "PP", notation: "PP", startup: 10, block: "-2", hit: "+4", type: "High, High" },
      { name: "PPK", notation: "PPK", startup: 10, block: "-8", hit: "KD", type: "High, High, High" },
      { name: "6P", notation: "6P", startup: 14, block: "-2", hit: "+6", type: "Mid" },
      { name: "3P", notation: "3P", startup: 13, block: "-4", hit: "+7", type: "Special Mid" },
      { name: "2P", notation: "2P", startup: 10, block: "+1", hit: "+6", type: "Special Mid" },
      { name: "K (Kick)", notation: "K", startup: 14, block: "-6", hit: "-1", type: "High" },
      { name: "6K", notation: "6K", startup: 17, block: "-10", hit: "KD", type: "Mid" },
      { name: "3K", notation: "3K", startup: 15, block: "-13", hit: "KD", type: "Low" },
      { name: "2K", notation: "2K", startup: 12, block: "-14", hit: "-3", type: "Low" },
      { name: "Backflip Kick", notation: "4K+G", startup: 16, block: "-11", hit: "KD", type: "Mid" },
      { name: "Jumonji", notation: "9K", startup: 18, block: "-15", hit: "Launch", type: "Mid" }
    ]
  }
};

// Punishment Guide Data
const punishmentData = {
  akira: {
    name: "Akira Yuki",
    punishers: [
      { frames: "-10", move: "P", damage: "10", notes: "Basic jab punish" },
      { frames: "-12", move: "2P", damage: "10", notes: "Special mid, safer option" },
      { frames: "-13", move: "6P", damage: "25", notes: "Strong mid punish" },
      { frames: "-14", move: "6P", damage: "25", notes: "Most consistent" },
      { frames: "-15", move: "3P", damage: "30", notes: "Knockdown punish" },
      { frames: "-16", move: "46P", damage: "65+", notes: "Launcher, full combo" },
      { frames: "-17+", move: "33P (SDE)", damage: "70+", notes: "Maximum damage launcher" }
    ]
  },
  pai: {
    name: "Pai Chan",
    punishers: [
      { frames: "-10", move: "P", damage: "10", notes: "Basic jab punish" },
      { frames: "-12", move: "2P", damage: "10", notes: "Special mid" },
      { frames: "-13", move: "6P", damage: "23", notes: "Mid punish" },
      { frames: "-14", move: "4P", damage: "20", notes: "Safe mid option" },
      { frames: "-15", move: "236P", damage: "60+", notes: "Tenshin launcher" },
      { frames: "-17+", move: "236P", damage: "65+", notes: "Optimal launcher combo" }
    ]
  },
  kage: {
    name: "Kage-Maru",
    punishers: [
      { frames: "-10", move: "P", damage: "10", notes: "Basic jab punish" },
      { frames: "-12", move: "2P", damage: "10", notes: "Special mid" },
      { frames: "-13", move: "6P", damage: "24", notes: "Mid punish" },
      { frames: "-14", move: "3P", damage: "25", notes: "Strong option" },
      { frames: "-15", move: "4K+G", damage: "35", notes: "Backflip kick knockdown" },
      { frames: "-16+", move: "9K", damage: "70+", notes: "Jumonji launcher for max combo" }
    ]
  }
};

// Combo Data
const comboData = {
  akira: {
    name: "Akira Yuki",
    combos: [
      {
        name: "Basic BnB",
        notation: "46P → P → 6P → 66P+K",
        damage: "75",
        difficulty: "Intermediate",
        notes: "Standard mid-screen launcher combo"
      },
      {
        name: "Wall Combo",
        notation: "Wall Splat → 66P+K → P → 3PPP",
        damage: "85",
        difficulty: "Easy",
        notes: "Guaranteed wall combo"
      },
      {
        name: "SDE Combo",
        notation: "33P → dash → P → 6P → 46P+K",
        damage: "90",
        difficulty: "Advanced",
        notes: "Maximum damage from SDE launcher"
      }
    ],
    strategies: [
      "Use 2P to maintain pressure at advantage",
      "Mix throws with mid attacks to break defensive patterns",
      "Bodycheck (66P+K) is excellent for closing distance",
      "Practice SDE (33P) execution for high damage opportunities"
    ]
  },
  pai: {
    name: "Pai Chan",
    combos: [
      {
        name: "Tenshin Combo",
        notation: "236P → P → 6P → 3K+G",
        damage: "70",
        difficulty: "Intermediate",
        notes: "Standard launcher combo"
      },
      {
        name: "Counter Hit Special",
        notation: "CH 6K → P → 6P → 236P",
        damage: "80",
        difficulty: "Advanced",
        notes: "Counter hit confirm combo"
      },
      {
        name: "Wall Pressure",
        notation: "Wall → PPP → 6K",
        damage: "65",
        difficulty: "Easy",
        notes: "Safe wall combo"
      }
    ],
    strategies: [
      "Use quick strikes to interrupt opponent attacks",
      "Tenshin (236P) is your main launcher, use on punishment",
      "Mix high and low kicks to keep opponents guessing",
      "Excellent poking game with fast frame data"
    ]
  },
  kage: {
    name: "Kage-Maru",
    combos: [
      {
        name: "Jumonji Combo",
        notation: "9K → P → 6P → 6K",
        damage: "78",
        difficulty: "Intermediate",
        notes: "Main launcher combo"
      },
      {
        name: "Backflip Setup",
        notation: "4K+G → Okizeme mixup",
        damage: "Varies",
        difficulty: "Advanced",
        notes: "Knockdown into mixup situation"
      },
      {
        name: "Wall Combo",
        notation: "Wall → PPK → 6K",
        damage: "72",
        difficulty: "Easy",
        notes: "Standard wall combo"
      }
    ],
    strategies: [
      "Use mobility and evasive moves to confuse opponents",
      "Teleport moves can create confusion but are risky",
      "Strong throw game, mix with strikes effectively",
      "Practice Jumonji (9K) timing for optimal punishment"
    ]
  }
};

// Match-up Data
const matchupData = {
  akira: {
    name: "Akira Yuki",
    matchups: {
      pai: { rating: "5-5", notes: "Even matchup. Watch for her quick pokes." },
      kage: { rating: "6-4", notes: "Slight advantage. Punish teleports hard." },
      wolf: { rating: "4-6", notes: "Difficult. Watch for command grabs." },
      jacky: { rating: "5-5", notes: "Even. Spacing is crucial." }
    }
  },
  pai: {
    name: "Pai Chan",
    matchups: {
      akira: { rating: "5-5", notes: "Even matchup. Use speed advantage." },
      kage: { rating: "5-5", notes: "Even. Quick strikes beat his teleports." },
      wolf: { rating: "4-6", notes: "Tough matchup. Avoid being cornered." },
      jacky: { rating: "6-4", notes: "Favorable. Outspeed his pressure." }
    }
  },
  kage: {
    name: "Kage-Maru",
    matchups: {
      akira: { rating: "4-6", notes: "Tough. Akira punishes hard." },
      pai: { rating: "5-5", notes: "Even matchup. Use mixups." },
      wolf: { rating: "5-5", notes: "Even. Mobility helps avoid grabs." },
      jacky: { rating: "5-5", notes: "Even. Technical matchup." }
    }
  }
};

// Navigation System
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('.nav-btn');

function showView(viewId) {
  views.forEach(view => view.classList.remove('active'));
  navButtons.forEach(btn => btn.classList.remove('active'));
  
  const targetView = document.getElementById(`${viewId}-view`);
  if (targetView) {
    targetView.classList.add('active');
  }
  
  const activeBtn = document.querySelector(`[data-view="${viewId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Navigation button listeners
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    showView(view);
  });
});

// Dashboard card navigation
document.querySelectorAll('.dashboard-card').forEach(card => {
  card.addEventListener('click', () => {
    const view = card.dataset.navigate;
    showView(view);
  });
});

// Frame Data functionality
const frameCharacterSelect = document.getElementById('frame-character');
const frameDataContent = document.getElementById('frame-data-content');

frameCharacterSelect.addEventListener('change', (e) => {
  const character = e.target.value;
  if (character && frameData[character]) {
    displayFrameData(character);
  } else {
    frameDataContent.innerHTML = '<p class="info-text">Select a character to view their frame data</p>';
  }
});

function displayFrameData(character) {
  const data = frameData[character];
  if (!data) {
    frameDataContent.innerHTML = '<p class="info-text">Frame data not available for this character yet.</p>';
    return;
  }
  
  let html = `<h3>${data.name} - Frame Data</h3>`;
  html += '<table class="frame-table"><thead><tr>';
  html += '<th>Move Name</th><th>Notation</th><th>Startup</th><th>On Block</th><th>On Hit</th><th>Type</th>';
  html += '</tr></thead><tbody>';
  
  data.moves.forEach(move => {
    html += '<tr>';
    html += `<td>${move.name}</td>`;
    html += `<td class="notation">${move.notation}</td>`;
    html += `<td>${move.startup}f</td>`;
    html += `<td class="${move.block.includes('-') ? 'negative' : 'positive'}">${move.block}</td>`;
    html += `<td class="${move.hit.includes('-') ? 'negative' : 'positive'}">${move.hit}</td>`;
    html += `<td>${move.type}</td>`;
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  frameDataContent.innerHTML = html;
}

// Punishment Guide functionality
const punishCharacterSelect = document.getElementById('punish-character');
const punishmentContent = document.getElementById('punishment-content');

punishCharacterSelect.addEventListener('change', (e) => {
  const character = e.target.value;
  if (character && punishmentData[character]) {
    displayPunishmentData(character);
  } else {
    punishmentContent.innerHTML = '<p class="info-text">Select your character to see optimal punishers</p>';
  }
});

function displayPunishmentData(character) {
  const data = punishmentData[character];
  if (!data) {
    punishmentContent.innerHTML = '<p class="info-text">Punishment data not available for this character yet.</p>';
    return;
  }
  
  let html = `<h3>${data.name} - Optimal Punishers</h3>`;
  html += '<table class="punish-table"><thead><tr>';
  html += '<th>Frame Disadvantage</th><th>Best Punisher</th><th>Damage</th><th>Notes</th>';
  html += '</tr></thead><tbody>';
  
  data.punishers.forEach(punish => {
    html += '<tr>';
    html += `<td class="frames">${punish.frames}</td>`;
    html += `<td class="notation">${punish.move}</td>`;
    html += `<td>${punish.damage}</td>`;
    html += `<td>${punish.notes}</td>`;
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  punishmentContent.innerHTML = html;
}

// Combo Guide functionality
const comboCharacterSelect = document.getElementById('combo-character');
const comboContent = document.getElementById('combo-content');

comboCharacterSelect.addEventListener('change', (e) => {
  const character = e.target.value;
  if (character && comboData[character]) {
    displayComboData(character);
  } else {
    comboContent.innerHTML = '<p class="info-text">Select a character to view combos and strategies</p>';
  }
});

function displayComboData(character) {
  const data = comboData[character];
  if (!data) {
    comboContent.innerHTML = '<p class="info-text">Combo data not available for this character yet.</p>';
    return;
  }
  
  let html = `<h3>${data.name} - Combos</h3>`;
  html += '<div class="combo-list">';
  
  data.combos.forEach(combo => {
    html += '<div class="combo-card">';
    html += `<h4>${combo.name}</h4>`;
    html += `<p class="notation">${combo.notation}</p>`;
    html += `<p><strong>Damage:</strong> ${combo.damage} | <strong>Difficulty:</strong> ${combo.difficulty}</p>`;
    html += `<p class="combo-notes">${combo.notes}</p>`;
    html += '</div>';
  });
  
  html += '</div>';
  
  html += '<h3>Strategy Tips</h3>';
  html += '<ul class="strategy-list">';
  data.strategies.forEach(strategy => {
    html += `<li>${strategy}</li>`;
  });
  html += '</ul>';
  
  comboContent.innerHTML = html;
}

// Match-up functionality
const matchupCharacterSelect = document.getElementById('matchup-character');
const matchupContent = document.getElementById('matchup-content');

matchupCharacterSelect.addEventListener('change', (e) => {
  const character = e.target.value;
  if (character && matchupData[character]) {
    displayMatchupData(character);
  } else {
    matchupContent.innerHTML = '<p class="info-text">Select a character to view match-up analysis</p>';
  }
});

function displayMatchupData(character) {
  const data = matchupData[character];
  if (!data) {
    matchupContent.innerHTML = '<p class="info-text">Match-up data not available for this character yet.</p>';
    return;
  }
  
  let html = `<h3>${data.name} - Match-Up Chart</h3>`;
  html += '<div class="matchup-grid">';
  
  for (const [opponent, matchup] of Object.entries(data.matchups)) {
    const opponentName = frameData[opponent]?.name || opponent;
    html += '<div class="matchup-card">';
    html += `<h4>vs ${opponentName}</h4>`;
    html += `<p class="matchup-rating">${matchup.rating}</p>`;
    html += `<p>${matchup.notes}</p>`;
    html += '</div>';
  }
  
  html += '</div>';
  matchupContent.innerHTML = html;
}

// Training Mode Calculator
const calcBtn = document.getElementById('calc-advantage');
const advantageResult = document.getElementById('advantage-result');

calcBtn.addEventListener('click', () => {
  const startup = parseInt(document.getElementById('move-startup').value);
  const recovery = parseInt(document.getElementById('move-recovery').value);
  const oppRecovery = parseInt(document.getElementById('opponent-recovery').value);
  
  const advantage = oppRecovery - recovery;
  
  let resultClass = advantage > 0 ? 'positive' : advantage < 0 ? 'negative' : 'neutral';
  let resultText = advantage > 0 ? `+${advantage}` : `${advantage}`;
  
  let html = `<h3>Frame Advantage: <span class="${resultClass}">${resultText}</span></h3>`;
  
  if (advantage > 0) {
    html += '<p>You have frame advantage! It\'s your turn to attack.</p>';
    if (advantage >= 10) {
      html += '<p>Significant advantage - throw or guaranteed attack possible.</p>';
    }
  } else if (advantage < 0) {
    html += '<p>You are at disadvantage. Be ready to defend.</p>';
    if (advantage <= -10) {
      html += '<p><strong>WARNING:</strong> You can be punished! Guard or evade.</p>';
    }
  } else {
    html += '<p>Neutral situation. Both players can act simultaneously.</p>';
  }
  
  advantageResult.innerHTML = html;
});

// Initialize app
console.log('VF5 REVO Pro Gamer Companion App loaded successfully!');
