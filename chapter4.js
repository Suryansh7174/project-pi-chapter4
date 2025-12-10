/* Chapter 4 — The Convergence
   - particle collision ambience
   - 14 questions (riddles, story, combined puzzles)
   - scoring & reveal
   - global submitAnswers()
*/

(function(){
  // particle engine
  const pCount = 44;
  function spawnParticles(){
    const layer = document.getElementById('particles');
    if(!layer) return;
    layer.innerHTML = '';
    for(let i=0;i<pCount;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      const size = (Math.random()*4+1).toFixed(2);
      el.style.width = el.style.height = size + 'px';
      el.style.left = (Math.random()*100) + '%';
      el.style.top = (Math.random()*100) + '%';
      el.style.opacity = (Math.random()*0.6+0.04).toString();
      const r = Math.random();
      el.style.background = r<0.5 ? 'rgba(255,75,75,0.08)' : 'rgba(87,200,255,0.08)';
      layer.appendChild(el);
      const dx = (Math.random()-0.5)*140;
      const dy = (Math.random()-0.5)*140;
      el.animate([{transform:'translate(0,0)'},{transform:`translate(${dx}px,${dy}px)`}],{duration:10000+Math.random()*14000,iterations:Infinity,direction:'alternate'});
    }
  }
  spawnParticles();

  const questions = [
    { q:"Riddle — I grow from two to three to five; petals and galaxies know my drive. Which sequence am I?", A:"Arithmetic", B:"Fibonacci", C:"Prime", D:"Factorial", correct:"B" },
    { q:"Story — At the convergence point which two colours merged into a single hum?", A:"Green & Yellow", B:"Red & Blue", C:"Purple & White", D:"Orange & Black", correct:"B" },
    { q:"Story — Who felt the auditorium's chair vibrate under them?", A:"Vaishnav", B:"Suryansh", C:"Aarav", D:"Sia", correct:"A" },
    { q:"Observation — The overlapping patterns repeated with period 5. If a cycle has 5 beats, what fraction of the cycle is 2 beats?", A:"2/5", B:"1/2", C:"2/3", D:"1/5", correct:"A" },
    { q:"Logic — Convert binary 1101 to decimal.", A:"11", B:"13", C:"14", D:"15", correct:"B" },
    { q:"Pattern — Two sequences overlap: 1,1,2,3,5 and 2,4,8,16. A number present in both sequences is?", A:"2", B:"3", C:"4", D:"8", correct:"A" },
    { q:"Riddle — Break me and I still count the same; my shape encloses but never ends. What am I?", A:"Circle", B:"Arc", C:"Sector", D:"Line", correct:"A" },
    { q:"Inference — The convergence node showed symmetry of order 4. How many repeats in 360°?", A:"2", B:"4", C:"6", D:"8", correct:"B" },
    { q:"Critical — The note read: 'Combine the sutra (Fibo) with the double (power of two) to get the key at index ___.' Fill the index: 6", A:"8", B:"13", C:"21", D:"34", correct:"C" },
    { q:"Observation — Which character shouted 'It matches the mirror!'?", A:"Sia", B:"Aarav", C:"Suryansh", D:"Vaishnav", correct:"B" },
    { q:"Pattern — The auditorium's pulse measured 3, 1, 4 — which famous constant begins with 3.14?", A:"e", B:"pi", C:"phi", D:"gamma", correct:"B" },
    { q:"Logic — If f(n)=2^n, f(3)=8, what is f(5)?", A:"25", B:"32", C:"10", D:"64", correct:"B" },
    { q:"Wrap — The convergence glyph resembled two circles overlapped — what is the common name for this shape?", A:"Vesica Piscis", B:"Ellipse", C:"Oval", D:"Torus", correct:"A" },
    { q:"Final — To unlock, sum the correct answers' letters (A=1,B=2,C=3,D=4) for questions 1–3. If answers are B, B, A => 2+2+1 = ?", A:"4", B:"5", C:"3", D:"6", correct:"B" }
  ];

  // render questions
  function render(){
    const area = document.getElementById('questionArea');
    if(!area) return;
    area.innerHTML = '';
    questions.forEach((it, idx)=>{
      const block = document.createElement('div');
      block.className = 'question';
      let html = `<p>${it.q}</p>`;
      ['A','B','C','D'].forEach(letter=>{
        html += `<label><input type="radio" name="q${idx}" value="${letter}"> ${letter}) ${it[letter]}</label>`;
      });
      block.innerHTML = html;
      area.appendChild(block);
    });
  }

  // begin behaviour
  const beginBtn = document.getElementById('beginBtn');
  const intro = document.getElementById('intro');
  const quiz = document.getElementById('quiz');
  if(beginBtn){
    beginBtn.addEventListener('click', ()=>{
      if(intro) intro.classList.add('hidden');
      if(quiz) quiz.classList.remove('hidden');
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  } else {
    render();
  }

  // scoring
  function computeScore(){
    let s=0;
    questions.forEach((it, idx)=>{
      const sel = document.querySelector(`input[name="q${idx}"]:checked`);
      if(sel && sel.value === it.correct) s++;
    });
    return s;
  }

  function revealFact(){
    const facts = [
      "Convergence means overlapping clues — combine Fibonacci and powers-of-two to find composite keys.",
      "The Vesica Piscis (two overlapping circles) is a classical geometrical motif with deep symbolic history.",
      "Pi, Fibonacci, powers-of-two appear repeatedly together in different natural and computational patterns."
    ];
    const ft = document.getElementById('factText');
    if(ft) ft.innerText = facts[Math.floor(Math.random()*facts.length)];
    const factSection = document.getElementById('fact');
    if(factSection) factSection.classList.remove('hidden');
    const next = document.getElementById('nextLink');
    if(next) next.style.display = 'inline-block';
    try{ localStorage.setItem('projectpi_ch4_solved','1'); }catch(e){}
  }

  // expose global submitAnswers
  window.submitAnswers = function(){
    const score = computeScore();
    const txt = document.getElementById('scoreText');
    if(txt) txt.innerText = `Score: ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%)`;
    if(score >= Math.ceil(questions.length * 0.6)){
      revealFact();
    } else {
      if(txt) txt.style.color = '#ffd1d1';
      const g = document.querySelector('.glitch');
      if(g) g.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:420,iterations:1});
    }
  };

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn) submitBtn.addEventListener('click', ()=>{ window.submitAnswers(); });

  // reset
  const resetBtn = document.getElementById('resetBtn');
  if(resetBtn) resetBtn.addEventListener('click', ()=>{
    document.querySelectorAll('input[type=radio]').forEach(el=>el.checked=false);
    const t = document.getElementById('scoreText');
    if(t){ t.innerText=''; t.style.color=''; }
  });

  // auto-load solved
  try{
    if(localStorage.getItem('projectpi_ch4_solved') === '1'){
      render();
      if(intro) intro.classList.add('hidden');
      if(quiz) quiz.classList.remove('hidden');
      revealFact();
    }
  }catch(e){}
})();
