(function(){
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>[...document.querySelectorAll(s)];
  const fmtMoney = (n)=> (Number(n)||0).toLocaleString('vi-VN',{style:'currency',currency:'VND',maximumFractionDigits:0});

  const form = $('#demo-form');
  const lastMsg = $('#last-msg');
  const wifi = $('#wifi');
  const totalEl = $('#session-total');
  const countEl = $('#session-count');
  const replayBtn = $('#replay');
  const mascotLine = $('#mascot-line');
  const muteBtn = $('#mute-toggle');

  let sessionTotal = 0;
  let sessionCount = 0;
  let lastPayload = null;
  let muted = false;

  function speak(text){
    if(muted) return;
    try{
      const u = new SpeechSynthesisUtterance(text);
      u.lang='vi-VN';
      u.rate = 1;
      window.speechSynthesis.cancel(); // stop previous
      window.speechSynthesis.speak(u);
    }catch(e){/* pass */}
  }

  function bump(el, text){
    el.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:350});
    if(text!==undefined) el.textContent = text;
  }

  function handlePayload(p){
    // update OLED sim
    const line = `${fmtMoney(p.amount)} • ${p.source}${p.note?(' • '+p.note):''}`;
    lastMsg.textContent = line;
    bump(lastMsg);

    // update session
    sessionTotal += Number(p.amount)||0;
    sessionCount += 1;
    bump(totalEl, fmtMoney(sessionTotal));
    bump(countEl, String(sessionCount));

    // mascot
    mascotLine.textContent = `Có chuyển khoản ${fmtMoney(p.amount)} từ ${p.source}${p.note?(' - '+p.note):''}!`;
    bump(mascotLine);

    // voice (nhân hoá)
    speak(`Có chuyển khoản ${Number(p.amount).toLocaleString('vi-VN')} đồng từ ${p.source}. ${p.note?('Nội dung: '+p.note+'.'):''}`);

    // store
    lastPayload = p;
    replayBtn.disabled = false;
    localStorage.setItem('blk:last', JSON.stringify(p));
    localStorage.setItem('blk:session', JSON.stringify({total:sessionTotal,count:sessionCount}));
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const amount = $('#amount').value.trim();
    const source = $('#source').value.trim();
    const note = $('#note').value.trim();
    if(!amount){ alert('Vui lòng nhập số tiền'); return; }
    handlePayload({amount, source, note});
  });

  replayBtn.addEventListener('click', ()=>{
    if(lastPayload) handlePayload(lastPayload);
  });

  muteBtn.addEventListener('click', ()=>{
    muted = !muted;
    muteBtn.setAttribute('aria-pressed', String(muted));
    muteBtn.textContent = muted ? 'Bật tiếng' : 'Tắt tiếng';
    if(muted) window.speechSynthesis.cancel();
  });

  // init from storage
  try{
    const last = JSON.parse(localStorage.getItem('blk:last')||'null');
    const sess = JSON.parse(localStorage.getItem('blk:session')||'null');
    if(sess){ sessionTotal=sess.total||0; sessionCount=sess.count||0; totalEl.textContent=fmtMoney(sessionTotal); countEl.textContent=String(sessionCount); }
    if(last){ lastPayload=last; lastMsg.textContent=`${fmtMoney(last.amount)} • ${last.source}${last.note?(' • '+last.note):''}`; replayBtn.disabled=false; }
  }catch(e){}

  // fake wifi heartbeat
  setInterval(()=>{
    wifi.textContent = Math.random()>0.1 ? 'Đã kết nối' : 'Đang khởi nối lại…';
    wifi.style.opacity = wifi.textContent==='Đã kết nối' ? '1' : '0.8';
  }, 5000);
})();