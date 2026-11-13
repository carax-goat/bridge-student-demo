'use strict';

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const esc = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
  mic:'<rect x="8" y="2" width="8" height="13" rx="4"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
  stop:'<rect x="6" y="6" width="12" height="12" rx="1"/>',
  arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>', back:'<path d="m14 6-6 6 6 6"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  hide:'<path d="m3 3 18 18M10 5.2c.7-.1 1.3-.2 2-.2 6.5 0 10 7 10 7a17 17 0 0 1-3.3 4.1M6.4 6.4A18 18 0 0 0 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.8-1.3M10 10a3 3 0 0 0 4 4"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  chat:'<path d="M20 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z"/><path d="M7 8h9M7 12h6"/>',
  note:'<path d="M13 3H5v18h14V9Z"/><path d="M13 3v6h6M8 13h8m-8 4h5"/>',
  send:'<path d="m3 3 18 9-18 9 3-9-3-9Zm3 9h15"/>',
  hand:'<path d="M8 12V6a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v7-5a2 2 0 0 1 4 0v9a7 7 0 0 1-14 1l-3-5a2 2 0 0 1 3-2l2 3Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>', users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 4 5v1"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
  reset:'<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.2 9a3 3 0 1 1 4.6 2.5c-1.3.6-1.8 1-1.8 2.5m0 3h.01"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8m-4-5v5"/>',
  play:'<path d="m8 4 12 8-12 8Z"/>', pause:'<path d="M8 4v16M16 4v16"/>',
  star:'<path d="m12 2 3.1 6.3L22 9.4l-5 4.9 1.2 6.9L12 18l-6.2 3.3L7 14.3 2 9.4l6.9-1.1Z"/>',
  mask:'<path d="M3 4c6 3 12 3 18 0v7a9 9 0 0 1-18 0V4Z"/><path d="m6 10 4 1m4 0 4-1m-9 6c2-2 4-2 6 0"/>',
  close:'<path d="m5 5 14 14M5 19 19 5"/>', book:'<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1m0-15c4-3 8-2 10-1v15c-4-2-7-1-10 1V5Z"/>',
  spark:'<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6ZM20 2v4m-2-2h4"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
};
const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.star}</svg>`;
const bridge = (size=24) => '<svg width="'+size+'" height="'+size+'" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M4 22V12a10 10 0 0 1 20 0v10M9 22V13a5 5 0 0 1 10 0v9M3 22h22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

const people = [
  {id:0,name:'나',role:'학생회 대표',color:'#b3bfa2',coat:'#607b6d',hair:'#242d26',skin:'#d4b898'},
  {id:1,name:'하린',role:'AI 동아리 학생',color:'#b6a7aa',coat:'#796779',hair:'#343139',skin:'#d4b298'},
  {id:2,name:'민준',role:'국어 교사',color:'#b4b6a1',coat:'#7e806c',hair:'#343930',skin:'#c5a789'},
  {id:3,name:'서윤',role:'학부모',color:'#c5a994',coat:'#967e62',hair:'#4b3b2f',skin:'#d8b89d'},
  {id:4,name:'도윤',role:'정보 교과 교사',color:'#91acaf',coat:'#567c7a',hair:'#252f30',skin:'#c5a688'},
  {id:5,name:'지우',role:'상담 교사',color:'#ada8c0',coat:'#76738d',hair:'#3c3740',skin:'#d0b19e'},
];
function avatar(id, cls='avatar'){
 const colors=['#e8edf3','#eee9e5','#e8ece6','#f1e6e5','#e5eced','#ece8f0'];
 const colorIndex=id===0&&cls==='avatar'?Number(state.selectedAvatar||0):id;
 const name=id===0?String(state.nickname||'유나'):people[id].name;
 return `<svg class="${cls}" viewBox="0 0 80 80" role="img" aria-label="${esc(name)} 프로필"><circle cx="40" cy="40" r="40" fill="${colors[colorIndex%colors.length]}"/><text x="40" y="42" text-anchor="middle" dominant-baseline="middle" fill="#535c68" font-family="system-ui, sans-serif" font-size="27" font-weight="500">${esc(name.slice(0,1))}</text></svg>`;
}
const stages = [
 {id:'entrance',label:'시작',en:'ENTER THE TABLE',desc:'코드와 이름만으로 가볍게 시작'},
 {id:'orientation',label:'이용 안내',en:'GETTING STARTED',desc:'주제 소개 영상과 게임 규칙을 확인하고 입장'},
 {id:'lobby',label:'대기실',en:'TAKE YOUR SEAT',desc:'함께할 사람과 오늘의 주제 확인'},
 {id:'role',label:'내 역할',en:'YOUR SECRET ROLE',desc:'내 역할의 입장과 목표 이해'},
 {id:'briefing',label:'생각 정리',en:'A MOMENT TO THINK',desc:'첫 발언을 준비하는 짧은 시간'},
 {id:'discussion',label:'토론',en:'VOICES AT THE TABLE',desc:'말하는 동안 AI가 핵심 주장·근거 요약'},
 {id:'vote',label:'추리',en:'READ BETWEEN THE LINES',desc:'발언의 근거를 바탕으로 추리'},
 {id:'result',label:'결과',en:'BEHIND THE PERSPECTIVE',desc:'역할과 실제 입장을 함께 확인'},
 {id:'reflection',label:'회고',en:'BEYOND THE GAME',desc:'다른 입장에서 배운 점을 기록'},
];
let topic = '학교 과제에 생성형 AI 사용을 허용해야 할까?';
const storageKey = 'bridge-design-demo-v2-voice';
const defaults = {guideStep:'video',guideCompleted:false,nickname:'유나',selectedAvatar:0,roleRevealed:false,secretHidden:false,ready:false,belief:'조건부 찬성',opening:'',notes:'',vote:null,voteReason:'',voted:false,eventSeen:false,reflection:'',rating:3,saved:false,transcripts:[]};
let state;
try { state = {...defaults,...JSON.parse(localStorage.getItem(storageKey)||'{}')}; } catch { state = {...defaults}; }
let current = stages.some(s => s.id === location.hash.slice(1)) ? location.hash.slice(1) : 'entrance';
if(current==='lobby'&&!state.guideCompleted){current='orientation';history.replaceState(null,'','#orientation');}
let view = 'experience', compact = false, voiceTab = 'voice', handRaised = false, seconds = 222, timerRunning = false, modalReturnFocus = null;
const voice = {active:false,completed:false,partial:'',words:[],cursor:0,interval:null,started:0,revision:0,summaryKey:''};
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{/* Storage can be disabled in private previews. */}}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>$('#toast').classList.remove('show'),3000);}
function userName(){return esc(state.nickname||'유나');}
function mobileNav(){return '';}
function heading(title,sub){const i=stages.findIndex(s=>s.id===current);return `<div class="scene-heading"><div><div class="eyebrow">${stages[i].label}</div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div><span class="scene-count">${i+1}<span> / ${stages.length}</span></span></div>`;}
function strip(){return '';}
function button(text, action, style='', symbol='arrow'){return `<button class="button ${style}" data-action="${action}">${text}${symbol?icon(symbol):''}</button>`;}
function navigate(id,focus=false){
 if(!stages.some(s=>s.id===id))return;
 if(id==='lobby'&&!state.guideCompleted)id='orientation';
 if(id==='orientation'&&current!=='orientation'){state.guideStep='video';persist();}
 stopVoice(true);current=id;view='experience';location.hash=id;timerRunning=false;render();
 if(focus)$('#screen').focus();window.scrollTo({top:0,behavior:'instant'});
}

function render(){
 $('#journey-nav').innerHTML=stages.map((s,i)=>`<button class="journey-link ${current===s.id&&view==='experience'?'active':''}" data-go="${s.id}" ${current===s.id&&view==='experience'?'aria-current="step"':''}><span class="nav-number">${i+1}</span>${s.label}</button>`).join('');
 $$('.demo-tab').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view));});
 $('#scene-number').textContent=String(stages.findIndex(s=>s.id===current)+1);
 $('#screen').className='screen '+(view==='rationale'?'screen-rationale':'screen-'+current);
 $('#screen').innerHTML=view==='rationale'?rationale():screens[current]();
 if(current==='discussion'&&view==='experience')renderVoice();
 document.title=`whose side? — ${view==='rationale'?'디자인 노트':stages.find(s=>s.id===current).label}`;
}
function entrance(){return `<div class="welcome"><div class="welcome-mark">${icon('users',29)}</div><p class="eyebrow">서로 다른 입장에서 시작하는 토론</p><h1>말하면서,<br>서로를 이해해요.</h1><p class="welcome-description">누군가의 역할이 되어 생각을 나눠보세요.<br>말의 핵심은 AI가 정리해줄게요.</p><div class="button-row">${button('방 코드로 입장','join-dialog')}${button('먼저 연습해보기','practice','secondary','play')}</div><p class="welcome-facts">6–8명 <span>·</span> 약 15분 <span>·</span> 회원가입 없이</p><div class="welcome-flow"><div><span>01</span><h2>역할을 받고</h2><p>나와 다른 입장이 되어봐요.</p></div><div><span>02</span><h2>목소리로 나누고</h2><p>대화의 핵심을 함께 읽어요.</p></div><div><span>03</span><h2>새롭게 이해해요</h2><p>친구의 관점을 발견해요.</p></div></div></div>`;}
function orientation(){
 const isVideo=state.guideStep!=='rules';
 const rules=[
  ['역할의 입장에서 생각해요.','각자 비밀 역할 카드를 받아요. 나의 실제 생각과 달라도, 그 역할이 무엇을 바라고 걱정하는지 생각하며 말해요.'],
  ['한 사람씩, 목소리로 이야기해요.','발언을 요청한 뒤 마이크로 말해요. 이야기하는 동안 AI가 핵심을 정리해주고, 원문도 다시 볼 수 있어요.'],
  ['말 속의 단서로 역할을 추리해요.','다른 관점을 숨긴 참가자가 있어요. 말 속의 단서로 한 명을 선택하고 이유를 남겨요. 친구의 성격이나 실제 생각을 평가하지 않아요.'],
  ['정답보다, 다른 관점을 이해해요.','결과를 확인한 뒤 새롭게 이해한 입장을 돌아봐요. 토론을 잘하는 것보다 서로의 이유를 듣는 시간이 중요해요.'],
 ];
 return heading('토론을 시작하기 전에.','주제 소개 영상과 게임 규칙을 확인하고 대기실로 들어가요.')+`<section class="orientation-panel"><ol class="orientation-steps" aria-label="이용 안내 진행"><li class="${isVideo?'active':'done'}" ${isVideo?'aria-current="step"':''}><span>${isVideo?'1':icon('check',13)}</span>주제 소개 영상</li><li class="orientation-step-divider" aria-hidden="true"></li><li class="${isVideo?'':'active'}" ${!isVideo?'aria-current="step"':''}><span>2</span>게임 규칙</li></ol>${isVideo?`<div class="intro-video-placeholder" role="img" aria-label="주제 소개 영상이 들어갈 자리. 데모에서는 영상을 재생하지 않고 진행합니다."><div class="intro-video-mark">${icon('play',28)}</div><h2>주제 소개 영상</h2><p>오늘 함께 이야기할 주제와 배경을 알아봐요.</p><span class="intro-video-demo">데모에서는 영상 없이 진행해요.</span></div><div class="orientation-copy"><h2>${topic}</h2><p>같은 주제에도 서로 다른 생각과 고민이 있어요.<br>어떤 선택이 필요한지, 토론의 배경부터 함께 살펴봐요.</p></div><div class="orientation-actions"><button class="text-button" data-go="entrance">${icon('back',14)}시작 화면으로</button>${button('게임 규칙 확인하기','orientation-rules')}</div>`:`<div class="orientation-rules-header"><h2>이 네 가지만 기억해주세요.</h2><p>약 15분 동안 역할을 맡아 토론하고, 숨은 관점을 추리해요.</p></div><ol class="orientation-rule-list">${rules.map(([title,description],i)=>`<li><span class="orientation-rule-number">${i+1}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join('')}</ol><div class="orientation-privacy">${icon('lock',15)}<span>내 비밀 역할과 개인 메모는 나에게만 보여요.</span></div><div class="orientation-actions"><button class="text-button" data-action="orientation-video">${icon('back',14)}주제 소개로</button>${button('이해했어요, 대기실로','orientation-enter')}</div>`}</section>`;
}

function lobby(){return heading('당신의 자리를 준비했어요.','함께할 친구들과 주제를 확인하고, 준비가 되면 알려주세요.')+strip()+`<div class="section-grid"><div class="panel room-scene"><div class="panel-heading">함께할 사람들 <span class="tag green">6 / 6 입장 완료</span></div><div class="table-stage"><span class="table-word">함께</span>${people.map((p,i)=>`<div class="table-person">${avatar(i)}<small>${i===0?userName()+' · 나':p.name}</small>${i!==0||state.ready?'<span class="ready-dot">✓</span>':''}</div>`).join('')}</div><div class="topic-card"><div class="eyebrow">오늘의 주제</div><h2>${topic}</h2><div class="button-row"><span class="tag subtle">기술과 일상</span><span class="tag subtle">서로 다른 이해관계</span></div></div><div class="ready-info"><span>${state.ready?'모두 준비되었어요.':'친구 5명이 당신을 기다리고 있어요.'}</span><b>${state.ready?'6':'5'} / 6 준비</b></div></div><div><div class="panel panel-pad"><div class="eyebrow">시작하기 전에</div><h2 class="feature-title ko">좋은 토론의 시작은<br>작은 약속부터.</h2><div class="info-row">${icon('eye')}<span>내 역할은 나만 확인해요.</span></div><div class="info-row">${icon('chat')}<span>사람보다 생각에 질문해요.</span></div><div class="info-row">${icon('hand')}<span>한 사람씩, 끝까지 들어요.</span></div><div class="info-row">${icon('spark')}<span>다른 입장도 이해해 봐요.</span></div><div class="check-grid"><div class="check-box">${icon('clock')}<h3>약 15분</h3><p>짧고 몰입하는<br>한 번의 토론</p></div><div class="check-box">${icon('lock')}<h3>비밀 역할</h3><p>대화 속 단서로<br>관점 찾아내기</p></div></div>${button(state.ready?'비밀 역할 받기':'준비됐어요',state.ready?'go-role':'ready','wide',state.ready?'arrow':'check')}<p class="fine" style="margin-bottom:0;text-align:center">시연에서는 기다리지 않고 다음으로 넘어가요.</p><div class="lobby-guide-link"><button class="text-button" data-go="orientation">영상과 규칙 다시 보기</button></div></div></div></div>`;}
function roleCard(large=false){
 if(large&&!state.roleRevealed)return `<div class="large-role"><div class="card-back"><div class="role-lock">${icon('lock',27)}</div><p>나에게만 보이는 역할</p><span>어떤 입장을 만나게 될까요?</span><small>준비되면 카드를 확인해주세요.</small></div></div>`;
 return `<section class="${large?'large-role':'role-mini'}"><div class="panel-heading"><span>나의 역할</span>${!large?`<button data-action="toggle-secret">${icon(state.secretHidden?'eye':'hide',15)}${state.secretHidden?'보기':'숨기기'}</button>`:''}</div>${!large&&state.secretHidden?`<div class="secret-hidden">${icon('lock',27)}<p>역할을 숨겼어요.</p><span>‘보기’를 누르면 다시 확인할 수 있어요.</span></div>`:`<div class="role-content">${rolePictogram('학생회 대표',large?'role-pictogram-large':'role-pictogram-mini')}<h2>학생회 대표</h2><span class="tag">조건부 찬성</span><blockquote>학생의 선택권을 지키면서,<br>공정한 사용 기준을 만들고 싶어요.</blockquote><div class="role-task-label">토론에서 해볼 일</div><ul class="mission-list"><li>${icon('check',15)}<span>학생의 선택권을 이야기해요.</span></li><li>${icon('check',15)}<span>AI 사용 기준을 제안해요.</span></li></ul></div>`}</section>`;
}
function role(){return heading(state.roleRevealed?'오늘은 학생회 대표의 시선으로.':'오늘은 어떤 입장을 만나게 될까요?','나의 생각과 달라도, 이 사람이 바라는 것을 생각해보세요.')+`<div class="large-role-wrap">${roleCard(true)}<div class="role-explanation"><div class="eyebrow">${state.roleRevealed?'역할 이해하기':'비밀 역할'}</div><h2>${state.roleRevealed?'이 입장에서,<br>어떤 이야기를 할 수 있을까요?':'준비되면<br>내 역할을 확인해요.'}</h2><p class="section-description">${state.roleRevealed?'학생회 대표는 AI를 활용할 기회를 열어두고 싶어요. 동시에 모든 학생에게 공정한 기준이 필요하다고 생각해요.':'역할과 입장, 토론에서 해볼 일이 담겨 있어요. 이 화면은 나에게만 보여요.'}</p>${state.roleRevealed?`<ul class="mission-list"><li>${icon('check')}과제가 많은 학생의 상황을 설명해요.</li><li>${icon('check')}AI 사용 과정과 출처를 밝히는 방법을 제안해요.</li><li>${icon('check')}다른 입장의 걱정도 물어봐요.</li></ul>${button('생각 정리하기','go-briefing')}`:button('내 역할 확인하기','reveal-role','','eye')}<p class="privacy-line">${icon('lock',13)}역할은 나에게만 보여요.</p><p class="fine">역할은 토론 속 가상의 입장이에요.<br>실제 생각을 평가하는 활동은 아니에요.</p></div></div>`;}
function briefing(){return heading('말하기 전에, 잠깐 생각해요.','주제를 읽고 역할의 입장에서 첫 문장을 준비해 보세요.')+strip()+`<div class="section-grid"><article class="panel brief-card"><div class="panel-heading">생각해볼 상황 <span class="tag gold">가상 사례</span></div><h2>${topic}</h2><p>한 학교에서 생성형 AI를 활용한 과제가 늘고 있어요. 어떤 학생은 아이디어를 얻는 도구라고 말하고, 어떤 선생님은 스스로 생각하는 시간이 줄어들까 걱정해요.</p><div class="brief-quote">“도움받는 것과 대신하게 하는 것,<br>그 경계는 어디에 있을까요?”</div><p>학교는 새로운 과제 규칙을 정하려 해요. 학생, 교사, 학부모의 입장에서 어떤 점을 지켜야 할지 함께 이야기해 보세요.</p><div class="brief-source">토론을 위한 가상 상황 · 통계나 실제 보도를 인용한 내용이 아닙니다.</div><div class="rule"></div><div class="button-row"><span class="tag subtle">선택권</span><span class="tag subtle">공정성</span><span class="tag subtle">배움의 과정</span></div></article><form class="panel form-card" id="opening-form"><div class="eyebrow">나의 첫 발언</div><h2 class="feature-title ko" style="font-size:22px">학생회 대표인 나는…</h2><label class="field-label" for="belief-options">어떤 입장으로 시작할까요?</label><div class="choice-row" id="belief-options" role="group" aria-label="역할의 입장 선택">${['찬성','조건부 찬성','반대'].map(v=>`<button type="button" class="choice ${state.belief===v?'selected':''}" data-belief="${v}" aria-pressed="${state.belief===v}">${v}</button>`).join('')}</div><label class="field-label" for="opening">첫 발언 준비하기 <small>선택 · 300자</small></label><textarea class="text-input" id="opening" maxlength="300" placeholder="저는 학생회 대표로서…">${esc(state.opening)}</textarea><button type="button" class="starter-button" data-action="opening-starter">${icon('spark')}첫 문장 힌트 받기</button><p class="fine" style="margin:6px 0 22px">역할의 걱정과 바라는 점을 한 가지씩 떠올려 보세요. 준비한 문장을 보면서 마이크로 첫 발언을 시작할 수 있어요.</p><button class="button wide" type="submit">토론 테이블로 ${icon('arrow')}</button></form></div>`;}
function participants(){const speaker=voice.active?0:1;return `<div class="participants" aria-label="참가자 6명">${people.map((p,i)=>`<div class="person ${i===speaker?'speaking':''}"><div class="person-avatar">${avatar(i)}${i===speaker?'<span class="speaker-dot" aria-hidden="true"></span>':''}</div><b>${i===0?userName():p.name}${i===0?'<span class="person-you"> · 나</span>':''}</b><small>${i===speaker?'말하는 중':'참여 중'}</small></div>`).join('')}</div>`;}
function discussion(){return `<div class="discussion-heading"><div><div class="eyebrow">자유 토론</div><h1>${topic}</h1><p>서로의 이야기를 듣고, 그 생각의 이유를 찾아보세요.</p></div><div class="timer-block"><span>남은 시간</span><div id="timer-time" class="timer-time">${timeText()}</div><button class="timer-control" data-action="timer" aria-label="${timerRunning?'타이머 일시정지':'시연 타이머 재생'}">${icon(timerRunning?'pause':'play',12)}${timerRunning?'일시정지':'시연 재생'}</button></div></div><div class="discussion-grid"><div class="main-stack"><section class="voice-room" aria-label="음성 토론과 요약">${participants()}<div class="conversation-tabs"><div class="tab-buttons" role="tablist" aria-label="토론 도구">${[['voice','대화'],['transcripts','요약 기록'],['notes','내 메모']].map(([id,label])=>`<button role="tab" class="${voiceTab===id?'active':''}" data-voice-tab="${id}" aria-selected="${voiceTab===id}" id="${id}-tab" aria-controls="voice-body">${label}</button>`).join('')}</div></div><div id="voice-body" role="tabpanel" aria-labelledby="${voiceTab}-tab"></div></section></div><aside><div id="role-mini-container">${roleCard()}</div><div class="next-card"><p>대화에서 찾은 단서가 있나요?</p>${button('역할 추리하기','go-vote','secondary wide','arrow')}</div><div class="question-helper"><span>이렇게 물어보세요</span><p>“그 입장에서는<br>무엇이 가장 걱정되나요?”</p></div></aside></div>`;}
function timeText(){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
const initialTranscripts = [
 {person:2,text:'AI가 만든 답을 그대로 내면, 학생이 어디까지 이해했는지 확인하기 어려워요.',time:'14:02'},
 {person:1,text:'AI는 편리하지만, 숙제를 끝낸 뒤 스스로 설명할 수 있어야 하지 않을까요? 도구보다 배우는 과정이 더 걱정돼요.',time:'14:03'},
 {person:3,text:'그런데 모두 같은 도구를 쓸 수 있을까요? 유료 기능 때문에 차이가 생길 수도 있어요.',time:'14:04'},
];
function waveBars(){return Array.from({length:35},(_,i)=>`<i style="--bar:${[8,14,25,17,34,22,42,30,54,38,63,43,72,48,58,37,65,78,57,44,68,51,39,61,43,29,48,33,22,39,25,17,29,14,8][i]}px;--delay:${(i%7)*-.13}s"></i>`).join('');}
function voiceTime(){const s=voice.active?Math.floor((Date.now()-voice.started)/1000):0;return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
const exampleSummaries={
 1:{claim:'AI를 쓰더라도, 학생이 배운 내용을 스스로 설명할 수 있어야 해요.',reason:'도구의 편리함보다 실제로 이해하고 배우는 과정이 중요해요.',keywords:['학습 과정','이해도 확인'],stance:'사용 조건 검토'},
 2:{claim:'AI가 만든 답만으로 학생의 이해도를 판단하기 어려워요.',reason:'답을 그대로 제출하면 어디까지 이해했는지 확인할 수 없어요.',keywords:['학습 평가','이해도 확인'],stance:'평가 기준 우려'},
 3:{claim:'AI 도구를 이용할 수 있는 기회의 차이를 고려해야 해요.',reason:'유료 기능 사용 여부에 따라 과제 결과에 차이가 생길 수 있어요.',keywords:['공정성','도구 접근성'],stance:'접근성 우려'},
};
function summarizeDemo(text,person=0){
 if(person!==0&&exampleSummaries[person])return exampleSummaries[person];
 const clean=String(text||'').trim();
 const summary={claim:'',reason:'',keywords:[],stance:''};
 if(/조건부.*찬성/.test(clean)){
  summary.claim='AI 사용에 조건부로 찬성해요.';summary.stance='조건부 찬성';
 }else if(/반대/.test(clean)){
  summary.claim='AI 사용에 반대해요.';summary.stance='반대';
 }else if(/찬성/.test(clean)){
  summary.claim='AI 사용에 찬성해요.';summary.stance='찬성';
 }
 if(/과정과 출처를 밝히/.test(clean)){
  summary.claim='AI 사용은 허용하되, 과정과 출처를 밝혀야 해요.';summary.keywords.push('사용 과정 공개','출처 표기');
 }
 if(/공통 기준이 필요/.test(clean)){
  summary.claim='AI 사용을 허용하려면 공통 기준이 필요해요.';summary.keywords.push('공통 기준');
 }
 if(/선택권과 공정함을 함께 지킬/.test(clean)){
  summary.reason='학생의 선택권과 공정함을 함께 지킬 수 있어요.';summary.keywords.push('공정한 배움');
 }else if(/스스로 생각할 기회를.*지켜/.test(clean)){
  summary.reason='학생이 스스로 생각할 기회를 지켜야 해요.';summary.keywords.push('스스로 생각하기');
 }else if(/다양한 방법으로 배울/.test(clean)){
  summary.reason='학생이 더 다양한 방법으로 배울 수 있어요.';summary.keywords.push('다양한 학습 방법');
 }else if(/사용한 과정을 밝히/.test(clean)){
  summary.reason='AI를 사용한 과정을 공개하는 기준을 제안해요.';summary.keywords.push('과정 공개');
 }
 if(!summary.claim&&/[.!?。]/.test(clean)){
  const first=clean.split(/(?<=[.!?。])\s+/)[0];
  summary.claim=first.replace(/^저는\s+학생회 대표로서\s*/, '').slice(0,170);
 }
 return summary;
}
function summaryCard(summary,live=false,revision=0){return `<section class="ai-summary ${live?'updating':''}" aria-label="AI 실시간 요약"><div class="ai-summary-header"><h2>지금까지의 이야기</h2><span class="ai-summary-status">${live?'<i class="status-dot"></i>업데이트 중':'AI 요약'}</span></div><div class="ai-summary-content" aria-live="polite" aria-atomic="true"><p class="summary-claim ${summary.claim?'':'summary-pending'}">${esc(summary.claim||'이야기를 듣고 있어요.')}</p><div class="summary-reason"><span>그 이유는</span><p class="${summary.reason?'':'summary-pending'}">${esc(summary.reason||(live?'조금 더 말하면 이유도 함께 정리해요.':'아직 충분한 이야기가 모이지 않았어요.'))}</p></div>${summary.stance?`<span class="summary-stance">${esc(summary.stance)}</span>`:''}</div></section>`;}
function updateLiveSummary(){
 const summary=summarizeDemo(voice.partial);
 const key=JSON.stringify(summary);
 if(key!==voice.summaryKey){
  voice.summaryKey=key;voice.revision++;
  const container=$('#ai-summary-container');if(container)container.innerHTML=summaryCard(summary,true,voice.revision);
 }
}
function renderVoice(){
 const pane=$('#voice-body');if(!pane)return;
 const p=$('.participants');if(p)p.outerHTML=participants();
 $$('[data-voice-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.voiceTab===voiceTab);b.setAttribute('aria-selected',String(b.dataset.voiceTab===voiceTab));});
 pane.setAttribute('aria-labelledby',`${voiceTab}-tab`);
 if(voiceTab==='notes'){
  pane.innerHTML=`<div class="notes-pane"><label class="field-label" for="personal-notes">나만의 메모 <small>나에게만 보여요.</small></label><textarea id="personal-notes" maxlength="2000" placeholder="기억하고 싶은 말이나 다음에 물어볼 질문을 적어보세요.">${esc(state.notes)}</textarea><div class="note-status" id="note-status">이 브라우저에 자동으로 저장해요.</div></div>`;return;
 }
 if(voiceTab==='transcripts'){
  pane.innerHTML=`<div class="transcript-heading"><span>발언별 요약</span><small>최근 발언부터 보여요.</small></div><div class="transcript-list" role="log" aria-label="발언별 AI 요약 기록">${[...initialTranscripts,...state.transcripts].reverse().map(t=>{const s=t.summary||summarizeDemo(t.text,t.person);return `<article class="transcript-entry"><div class="record-avatar">${avatar(t.person)}</div><div class="transcript-content"><div class="transcript-meta"><b>${t.person===0?userName()+' · 나':people[t.person].name}</b><time>${esc(t.time)}</time></div><p class="record-summary-claim">${esc(s.claim||'아직 충분한 발언이 모이지 않았어요.')}</p>${s.reason?`<p class="record-summary-reason">${esc(s.reason)}</p>`:''}<details class="record-original"><summary>발언 원문</summary><p>${esc(t.text)}</p></details></div></article>`;}).join('')}</div>`;return;
 }
 const speaking=voice.active||voice.completed?0:1;
 const caption=voice.active||voice.completed?voice.partial:initialTranscripts[1].text;
 const summary=summarizeDemo(caption,speaking);
 pane.innerHTML=`<div class="voice-stage ${voice.active?'is-capturing':''} ${voice.completed?'is-complete':''}"><div class="voice-speaker"><div class="voice-speaker-portrait">${avatar(speaking)}</div><div><h3>${speaking===0?userName():'하린'}${speaking===0?' · 나':''}</h3><p>${speaking===0?'학생회 대표':'AI 동아리 학생으로 소개했어요.'}</p></div><span class="voice-status" id="voice-status" role="status"><i class="status-dot"></i>${voice.active?'말하는 중':voice.completed?'기록 완료':'말하는 중'}</span></div><div class="voice-wave ${voice.active?'is-live':''}" aria-hidden="true">${waveBars()}</div><div id="ai-summary-container">${summaryCard(summary,voice.active,voice.revision||0)}</div><details class="live-original"><summary><span>발언 원문 보기</span><span id="voice-elapsed">${voice.active?voiceTime():voice.completed?'기록 완료':''}</span></summary><p id="live-transcript">${esc(caption||'목소리를 기다리고 있어요…')}${voice.active?'<span class="recognition-caret" aria-hidden="true"></span>':''}</p></details>${state.opening&&!voice.active&&!voice.completed?`<div class="voice-prompt"><span>준비한 첫 문장</span><p>${esc(state.opening)}</p></div>`:''}</div><div class="voice-controls"><button type="button" class="voice-hand ${handRaised?'active':''}" data-action="raise-hand" aria-pressed="${handRaised}">${icon('hand',18)}<span>${handRaised?'요청 취소':'발언 요청'}</span></button><button type="button" class="voice-mic ${voice.active?'recording':''}" data-action="voice-toggle" aria-pressed="${voice.active}">${icon(voice.active?'stop':'mic',19)}<span>${voice.active?'말하기 마치기':voice.completed?'다시 말하기':'말하기 시작'}</span></button><p class="voice-input-hint"><kbd>Z</kbd> 시작 <span>·</span> <kbd>X</kbd> 완료</p></div><div class="voice-demo-note">예시 음성으로 진행되는 디자인 시연이에요.</div><div class="event-notice">${icon('note',17)}<span>${state.eventSeen?'새로운 상황도 함께 생각해보세요.':'대화에 새로운 상황이 생겼어요.'}</span><button data-action="event-card">상황 보기 ${icon('arrow',13)}</button></div>`;
}
function startVoice(){
 if(voice.active||current!=='discussion')return;
 voiceTab='voice';voice.active=true;voice.completed=false;voice.started=Date.now();voice.revision=0;voice.summaryKey='';handRaised=false;
 voice.words=(state.opening.trim()||'저는 학생회 대표로서 조건부로 찬성해요. AI를 사용한 과정과 출처를 밝히면 학생의 선택권과 공정함을 함께 지킬 수 있다고 생각해요.').split(/\s+/);
 voice.cursor=1;voice.partial=voice.words[0];
 renderVoice();updateLiveSummary();
 voice.interval=setInterval(()=>{
  if(!voice.active)return;
  if(voice.cursor<voice.words.length){voice.cursor++;voice.partial=voice.words.slice(0,voice.cursor).join(' ');}
  const caption=$('#live-transcript');if(caption)caption.innerHTML=esc(voice.partial)+'<span class="recognition-caret" aria-hidden="true"></span>';
  const elapsed=$('#voice-elapsed');if(elapsed)elapsed.textContent=voiceTime();
  updateLiveSummary();
 },350);
}
function stopVoice(save=true){
 if(!voice.active)return;
 clearInterval(voice.interval);voice.interval=null;voice.active=false;voice.completed=save;
 if(save&&voice.partial.trim()){
  state.transcripts.push({person:0,text:voice.partial,summary:summarizeDemo(voice.partial),time:new Intl.DateTimeFormat('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())});
  state.transcripts=state.transcripts.slice(-30);persist();
  toast('발언과 AI 요약을 함께 기록했어요.');
 }
 if(current==='discussion'&&view==='experience')renderVoice();
}

function vote(){const p=state.vote===null?null:people[state.vote];return heading('누구의 시선이었을까요?','소개한 역할과 다르게 느껴졌던 말이 있었나요? 발언을 근거로 생각해보세요.')+`<div class="section-grid"><section class="panel panel-pad"><div class="panel-heading"><span>함께 이야기한 사람들</span><small>나에게만 보이는 선택이에요.</small></div><div class="vote-grid" role="group" aria-label="추리할 참가자 선택">${people.map((p,i)=>`<button class="vote-person ${state.vote===i?'selected':''} ${i===0?'locked':''}" data-vote="${i}" aria-pressed="${state.vote===i}" ${i===0?'disabled':''}><span class="vote-radio"></span>${avatar(i)}<b>${i===0?userName()+' · 나':p.name}</b><span>${p.role}</span></button>`).join('')}</div><p class="fine">친구의 성격이 아니라, 토론 속 역할을 추리하는 활동이에요.</p><button class="text-button" data-go="discussion">${icon('back',14)}대화와 요약 다시 보기</button></section><form id="vote-form" class="panel form-card"><div class="eyebrow">나의 추리</div><h2>${p?esc(p.name)+'의 말에서<br>어떤 단서를 찾았나요?':'어떤 관점이<br>다르게 느껴졌나요?'}</h2>${p?`<div class="selected-person">${avatar(p.id)}<div><strong>${p.name}</strong><span>소개한 역할 · ${p.role}</span></div></div>`:''}<label class="field-label" for="vote-reason">선택한 이유 <small>300자까지</small></label><textarea class="text-input" id="vote-reason" maxlength="300" required placeholder="어떤 발언이 단서였는지 적어주세요.">${esc(state.voteReason)}</textarea><button type="button" class="starter-button" data-action="vote-evidence">문장을 시작하기 어렵다면 ${icon('arrow',13)}</button><p class="field-error" id="vote-error" role="alert"></p><button type="submit" class="button wide" ${state.vote===null?'disabled':''}>추리 제출하기 ${icon('arrow',16)}</button></form></div>`;}
function result(){const chosen=state.vote===null?null:people[state.vote];return heading('같은 주제, 다른 관점.','이제 각자가 어떤 입장에서 이야기했는지 함께 알아봐요.')+`<section class="result-hero"><div class="reveal-main-avatar">${rolePictogram('학부모','role-pictogram-reveal')}</div><p class="eyebrow">하린의 숨은 관점</p><h2>학부모의 시선으로<br>이야기하고 있었어요.</h2><p>AI 동아리 학생으로 소개했지만,<br>배움의 과정과 공정함을 걱정하고 있었어요.</p><div class="result-feedback">${!state.voted?'아래에서 모든 참가자의 역할을 볼 수 있어요.':state.vote===1?'발언에서 다른 관점의 단서를 찾았군요.':`${chosen?esc(chosen.name):'다른 참가자'}을 선택했군요. 어떤 말이 다르게 느껴졌는지 이야기해보세요.`}</div></section><div class="panel-heading" style="margin:30px 0 17px">모두의 역할</div><div class="reveal-grid">${people.map((p,i)=>`<div class="reveal-card ${i===1?'imposter':''}">${rolePictogram(i===1?'학부모':p.role)}<div><b>${i===0?userName()+' · 나':p.name}</b><small>${i===1?'AI 동아리 학생 → 학부모':p.role}</small>${i===1?'<span class="reveal-note">숨은 관점</span>':''}</div></div>`).join('')}</div><div class="result-bottom"><p>새롭게 이해하게 된 입장이 있었나요?</p>${button('한 판 돌아보기','go-reflection')}</div>`;}
function reflection(){return heading('오늘의 대화에서 남은 생각.','다른 입장을 이해하게 된 순간을 나만의 말로 남겨보세요.')+`<div class="section-grid"><form id="reflection-form" class="panel panel-pad"><div class="reflection-intro"><p>같은 문제도,<br>처한 상황에 따라 다르게 보일 수 있어요.</p></div><label class="field-label" for="reflection-text">새롭게 이해한 입장은 무엇인가요?</label><textarea id="reflection-text" class="text-input" maxlength="1000" required placeholder="처음에는 …라고 생각했는데, …의 입장을 듣고 …라고 느꼈어요.">${esc(state.reflection)}</textarea><button type="button" class="starter-button" data-action="reflection-starter">회고 문장 힌트 ${icon('arrow',13)}</button><div class="reflection-question">다른 입장을 얼마나 이해하게 되었나요?</div><div class="rating-row" role="group" aria-label="관점 이해도">${['아직 어려워요','조금 알겠어요','보통이에요','이해했어요','더 궁금해요'].map((t,i)=>`<button type="button" class="rating ${state.rating===i+1?'selected':''}" data-rating="${i+1}" aria-pressed="${state.rating===i+1}">${t}</button>`).join('')}</div><p class="field-error" id="reflection-error" role="alert"></p><div class="button-row"><button class="button" type="submit">내 생각 저장하기 ${icon('check',16)}</button><button type="button" class="button secondary" data-action="download-reflection">내려받기 ${icon('download',16)}</button></div>${state.saved?`<div class="saved-reflection">${icon('check',16)}이 브라우저에 저장했어요. 다시 고칠 수 있어요.</div>`:''}<p class="fine">데모 기록은 이 브라우저에만 남아요.</p></form><aside class="reflection-aside"><h2>오늘 연습한 것</h2><ul class="reflection-learnings"><li>${icon('users',20)}<div><b>다른 시선 이해하기</b><p>그 입장에서는 무엇이 중요했을까요?</p></div></li><li>${icon('chat',20)}<div><b>근거를 들어 설명하기</b><p>생각의 이유를 말해보았나요?</p></div></li><li>${icon('hand',20)}<div><b>경청하고 질문하기</b><p>끝까지 듣고 궁금한 점을 물었나요?</p></div></li></ul>${button('다른 역할로 다시 시작','restart-story','secondary wide','reset')}</aside></div>`;}
function rationale(){return `<div class="rationale-header"><div class="eyebrow">디자인 노트</div><h1>대화가 중심에 남도록.</h1><p>영상에서 다룬 조너선 아이브의 절제와 단순함을 학생의 토론 경험에 적용했습니다. 말하기와 이해하기를 가까이 두고, 나머지 정보는 필요한 순간에 확인하도록 구성했어요.</p></div><div class="principles"><article class="principle"><span>01</span><h2>읽어야 할 내용을 먼저</h2><p>주제와 발언의 핵심을 크게 보여줍니다. 반복되는 단계 표시, 장식, 영문 배지를 줄이고 흰색 바탕과 글자의 위계로 순서를 만듭니다.</p><a href="https://www.youtube.com/watch?v=wCUVGjr9g94&t=697s" target="_blank" rel="noopener">참고 영상 · 화면에 집중하기 11:37 ↗</a></article><article class="principle"><span>02</span><h2>익숙한 동작으로</h2><p>이름을 누르면 선택되고, 마이크를 누르면 말하기가 시작됩니다. 선택·진행·완료 상태를 같은 위치와 일관된 표현으로 알려줘요.</p><a href="https://www.youtube.com/watch?v=wCUVGjr9g94&t=307s" target="_blank" rel="noopener">참고 영상 · 자연스러운 사용 5:07 ↗</a></article><article class="principle"><span>03</span><h2>도움은 필요한 만큼</h2><p>AI 요약은 이야기를 따라가기 위한 보조 수단입니다. 원문·기록·역할은 필요할 때 열어보고, 말하기 버튼은 한눈에 찾을 수 있도록 했어요.</p><a href="https://www.youtube.com/watch?v=wCUVGjr9g94&t=786s" target="_blank" rel="noopener">참고 영상 · 절제와 단순함 13:06 ↗</a></article></div><section class="design-notes-section"><h2>처음부터 끝까지, 한 흐름으로.</h2><div class="journey-map">${stages.map((s,i)=>`<button class="map-step" data-go="${s.id}"><small>${String(i+1).padStart(2,'0')}</small><b>${s.label} ${icon('arrow',13)}</b><p>${s.desc}</p></button>`).join('')}</div></section>${pictogramGallery()}<div class="design-system"><article><h2>일관된 표현</h2><p>흰색과 연한 회색을 기본으로 사용하고, 파란색은 조작할 수 있는 요소에 집중했습니다. 본문과 버튼의 크기, 여백, 모서리를 같은 기준으로 맞췄어요.</p><a class="source-link" href="https://developer.apple.com/design/human-interface-guidelines/design-principles" target="_blank" rel="noopener">Apple Human Interface Guidelines · Design principles ↗</a></article><article><h2>학생에게 확인할 것</h2><p>지금 해야 할 일을 바로 찾을 수 있나요?<br>말하는 동안 요약을 부담 없이 따라갈 수 있나요?<br>토론 후 다른 입장을 이해한 점이 남나요?</p><a class="source-link" href="https://www.youtube.com/watch?v=9T9S3oRNKfE&t=1239s" target="_blank" rel="noopener">이전 참고 강의 · 사용자의 관점에서 생각하기 ↗</a></article></div><div class="limit-note">회의용 디자인 시안입니다. 음성인식과 AI 요약은 예시 발언과 미리 구성한 요약으로 흐름을 보여줍니다. 실제 앱에는 적용하지 않았으며, 기록은 이 브라우저에만 저장해요.</div><div class="button-row" style="margin-top:28px">${button('학생 화면 보기','go-discussion')}${button('처음부터 경험하기','go-entrance','secondary','play')}</div>`;}
const screens={entrance,orientation,lobby,role,briefing,discussion,vote,result,reflection};

function openModal(html){modalReturnFocus=document.activeElement;$('#modal-root').innerHTML=`<div class="modal-overlay"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" aria-label="닫기" data-action="close-modal">${icon('close')}</button>${html}</section></div>`;document.body.style.overflow='hidden';const focusable=$('input,button:not(.modal-close),textarea',$('.modal'));(focusable||$('.modal-close')).focus();}
function closeModal(){$('#modal-root').innerHTML='';document.body.style.overflow='';if(modalReturnFocus?.isConnected)modalReturnFocus.focus();}
function joinDialog(){openModal(`<div class="eyebrow">테이블 입장</div><h2 id="modal-title">함께 이야기해볼까요?</h2><p>선생님이 알려준 방 코드와<br>친구들에게 보여줄 이름만 있으면 돼요.</p><form id="join-form"><label class="field-label" for="room-code">방 코드 <small>시연 코드 · BR2046</small></label><input id="room-code" class="text-input code-input" value="BR2046" maxlength="6" autocomplete="off" autocapitalize="characters" required><label class="field-label" for="nickname">이름 또는 별명 <small>1–10자</small></label><input id="nickname" class="text-input" maxlength="10" value="${esc(state.nickname)}" required placeholder="어떻게 불러드릴까요?"><div class="field-label">나의 프로필</div><div class="avatar-picker" role="group" aria-label="나의 프로필 선택">${people.slice(0,4).map(p=>`<button class="avatar-pick ${state.selectedAvatar===p.id?'selected':''}" type="button" data-avatar="${p.id}" aria-pressed="${state.selectedAvatar===p.id}" aria-label="프로필 ${p.id+1}">${avatar(p.id, 'avatar picker-avatar')}</button>`).join('')}</div><p class="avatar-hint">시연에서는 예시 테이블로 입장해요.</p><p class="field-error" id="join-error" role="alert"></p><button class="button wide" type="submit">내 자리로 입장 ${icon('arrow')}</button></form>`);}
function eventModal(){openModal(`<div class="eyebrow">새로운 상황</div><div style="color:var(--gold);margin-top:24px">${icon('spark',38)}</div><h2 id="modal-title">같은 도구,<br>다른 출발선.</h2><p>학교가 알아보니, AI 도구의 유료 기능을 이용할 수 있는 학생과 그렇지 못한 학생이 있었어요.</p><div class="brief-quote">“AI를 허용하더라도,<br>모두에게 공정한 기회가 될까요?”</div><p>이 상황에서도 역할의 입장은 같나요?<br>다른 친구의 걱정을 묻고 대화를 이어가 보세요.</p><div class="fine">토론을 확장하기 위한 시연용 가상 사건입니다.</div><div class="button-row">${button('이 관점으로 대화 이어가기','event-continue','','chat')}</div>`);}
function guideModal(){openModal(`<div class="eyebrow">이용 안내</div><h2 id="modal-title">다른 입장이 되는<br>15분의 대화.</h2><ol class="modal-list"><li>비밀 역할의 입장과 바라는 점을 읽어요.</li><li>내 실제 생각과 달라도 역할의 시선으로 말해요.</li><li>말하는 동안 바뀌는 AI 요약에서 핵심 주장과 근거를 확인해요.</li><li>다른 관점을 숨긴 사람을 발언으로 추리해요.</li><li>새롭게 이해한 입장을 돌아봐요.</li></ol><p class="fine">회의용 시연에서는 위쪽 메뉴로 모든 화면을 바로 볼 수 있어요. ‘이용 안내’에서 소개 영상과 규칙을 다시 볼 수 있어요. 타이머는 ‘시연 재생’을 누르면 흐릅니다. 토론 화면에서 Z키로 말하기와 실시간 AI 요약 시연을 시작하고 X키로 완료해요.</p><div class="button-row">${button('이해했어요','close-modal','','check')}</div>`);}
function downloadReflection(){const text=$('#reflection-text')?.value.trim()||state.reflection.trim();if(!text){toast('먼저 돌아본 생각을 적어주세요.');$('#reflection-text')?.focus();return;}state.reflection=text;persist();const doc=`whose side? — 한 판을 돌아보며\n\n참가자: ${state.nickname}\n주제: ${topic}\n역할: 학생회 대표\n\n새롭게 이해한 입장\n${text}\n\n관점 이해도: ${['아직 어려워요','조금 알겠어요','보통이에요','이해했어요','더 궁금해요'][state.rating-1]}\n\n회의용 디자인 데모의 개인 회고 기록입니다.\n`;const blob=new Blob(['\ufeff'+doc],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='whose-side-나의-회고.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('회고 기록을 내려받았어요.');}

document.addEventListener('click',e=>{
 const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go,true);return;}
 const viewButton=e.target.closest('[data-view]');if(viewButton){stopVoice(true);view=viewButton.dataset.view;timerRunning=false;render();return;}
 const voteButton=e.target.closest('[data-vote]');if(voteButton){state.vote=Number(voteButton.dataset.vote);state.voteReason=$('#vote-reason')?.value||state.voteReason;persist();render();return;}
 const beliefButton=e.target.closest('[data-belief]');if(beliefButton){state.belief=beliefButton.dataset.belief;state.opening=$('#opening').value;persist();$$('[data-belief]').forEach(b=>{b.classList.toggle('selected',b===beliefButton);b.setAttribute('aria-pressed',String(b===beliefButton));});return;}
 const ratingButton=e.target.closest('[data-rating]');if(ratingButton){state.rating=Number(ratingButton.dataset.rating);state.saved=false;persist();$$('[data-rating]').forEach(b=>{b.classList.toggle('selected',b===ratingButton);b.setAttribute('aria-pressed',String(b===ratingButton));});return;}
 const avatarButton=e.target.closest('[data-avatar]');if(avatarButton){state.selectedAvatar=Number(avatarButton.dataset.avatar);persist();$$('[data-avatar]').forEach(b=>{b.classList.toggle('selected',b===avatarButton);b.setAttribute('aria-pressed',String(b===avatarButton));});return;}
 const tabButton=e.target.closest('[data-voice-tab]');if(tabButton){voiceTab=tabButton.dataset.voiceTab;renderVoice();return;}
 const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;
 if(action.startsWith('go-')){navigate(action.slice(3),true);return;}
 switch(action){
 case 'join-dialog':joinDialog();break;
 case 'practice':state.ready=false;state.guideStep='video';state.guideCompleted=false;persist();navigate('orientation',true);break;
 case 'orientation-rules':state.guideStep='rules';persist();render();$('#screen').focus();window.scrollTo({top:0,behavior:'instant'});break;
 case 'orientation-video':state.guideStep='video';persist();render();$('#screen').focus();window.scrollTo({top:0,behavior:'instant'});break;
 case 'orientation-enter':state.guideCompleted=true;persist();navigate('lobby',true);break;
 case 'close-modal':closeModal();break;
 case 'ready':state.ready=true;persist();render();toast('모두 준비됐어요. 비밀 역할을 받아보세요.');break;
 case 'reveal-role':state.roleRevealed=true;persist();render();break;
 case 'toggle-secret':state.secretHidden=!state.secretHidden;persist();$('#role-mini-container').innerHTML=roleCard();break;
 case 'opening-starter':$('#opening').value=`저는 학생회 대표로서 AI 사용에 ${state.belief=== '반대'?'반대해요. 스스로 생각할 기회를 먼저 지켜야 한다고 생각해요.':state.belief==='찬성'?'찬성해요. 학생이 더 다양한 방법으로 배울 수 있어야 한다고 생각해요.':'조건부로 찬성해요. 사용한 과정을 밝히는 공통 기준이 필요하다고 생각해요.'}`;state.opening=$('#opening').value;persist();$('#opening').focus();break;
 case 'raise-hand':if(voice.active){toast('말하기를 마친 뒤 발언권을 요청할 수 있어요.');break;}handRaised=!handRaised;renderVoice();toast(handRaised?'발언권을 요청했어요. 내 차례가 되면 마이크를 눌러요.':'발언권 요청을 취소했어요.');break;
 case 'voice-toggle':voice.active?stopVoice(true):startVoice();break;
 case 'event-card':eventModal();break;
 case 'event-continue':state.eventSeen=true;persist();closeModal();renderVoice();toast('새로운 사건을 토론에 반영해 보세요.');break;
 case 'timer':timerRunning=!timerRunning;const timerButton=$('[data-action="timer"]');timerButton.innerHTML=icon(timerRunning?'pause':'play')+`<span>${timerRunning?'일시정지':'시연 재생'}</span>`;timerButton.setAttribute('aria-label',timerRunning?'타이머 일시정지':'시연 타이머 재생');break;
 case 'vote-evidence':if(state.vote===null){toast('먼저 추리할 참가자를 선택해주세요.');return;}$('#vote-reason').value=state.vote===1?'하린은 스스로 설명할 수 있어야 한다고 했어요. AI 활용보다 배우는 과정을 걱정하는 관점이 느껴졌어요.':`${people[state.vote].name}의 어떤 발언이 소개한 역할과 다르게 느껴졌나요? 그 이유를 이어서 적어주세요.`;state.voteReason=$('#vote-reason').value;persist();$('#vote-reason').focus();break;
 case 'confirm-vote':state.voted=true;persist();closeModal();navigate('result',true);break;
 case 'reflection-starter':$('#reflection-text').value='처음에는 AI를 쓸 수 있는지가 중요하다고 생각했는데, 학부모의 입장을 듣고 모두에게 공정한 배움의 기회도 함께 생각해야 한다고 느꼈어요.';state.reflection=$('#reflection-text').value;state.saved=false;persist();$('#reflection-text').focus();break;
 case 'download-reflection':downloadReflection();break;
 case 'restart-story':state.guideStep='video';state.guideCompleted=false;stopVoice(false);voice.completed=false;voice.partial='';state.roleRevealed=false;state.ready=false;state.voted=false;state.vote=null;state.transcripts=[];state.eventSeen=false;seconds=222;persist();navigate('entrance',true);break;
 }
});
document.addEventListener('input',e=>{
 if(e.target.id==='personal-notes'){state.notes=e.target.value;persist();$('#note-status').textContent='방금 이 브라우저에 저장했어요.';}
 if(e.target.id==='opening'){state.opening=e.target.value;persist();}
 if(e.target.id==='vote-reason'){state.voteReason=e.target.value;persist();}
 if(e.target.id==='reflection-text'){state.reflection=e.target.value;state.saved=false;persist();$('.saved-reflection')?.remove();}
});
document.addEventListener('submit',e=>{
 if(e.target.id==='join-form'){e.preventDefault();const code=$('#room-code').value.trim().toUpperCase();const name=$('#nickname').value.trim();if(code!==(window.demoRoomCode||'BR2046')){$('#join-error').textContent='시연용 방 코드는 '+(window.demoRoomCode||'BR2046')+'이에요.';$('#room-code').focus();return;}if(!name){$('#join-error').textContent='이름이나 별명을 입력해주세요.';$('#nickname').focus();return;}state.nickname=name;state.ready=false;state.guideStep='video';state.guideCompleted=false;persist();closeModal();navigate('orientation',true);}
 if(e.target.id==='opening-form'){e.preventDefault();state.opening=$('#opening').value.trim();persist();navigate('discussion',true);}
 if(e.target.id==='vote-form'){e.preventDefault();const reason=$('#vote-reason').value.trim();if(state.vote===null||!reason){$('#vote-error').textContent='참가자와 발언 근거를 함께 선택해주세요.';return;}state.voteReason=reason;persist();openModal(`<div class="eyebrow">ONE LAST LOOK</div><h2 id="modal-title">${people[state.vote].name}의 관점으로<br>추리를 마칠까요?</h2><div class="brief-quote">${esc(state.voteReason)}</div><p>선택한 참가자와 근거를 확인해 주세요.<br>제출하면 바로 역할 공개 화면으로 넘어가요.</p><div class="button-row">${button('다시 생각하기','close-modal','secondary','back')}${button('추리 제출하기','confirm-vote','','check')}</div>`);}
 if(e.target.id==='reflection-form'){e.preventDefault();const text=$('#reflection-text').value.trim();if(!text){$('#reflection-error').textContent='오늘 새롭게 이해한 점을 한 문장으로 남겨주세요.';return;}state.reflection=text;state.saved=true;persist();render();toast('내 생각을 이 브라우저에 저장했어요.');}
});
document.addEventListener('keydown',e=>{if(!$('.modal'))return;if(e.key==='Escape'){closeModal();return;}if(e.key==='Tab'){const items=$$('button,input,textarea,a[href]', $('.modal')).filter(el=>!el.disabled);const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
$('#modal-root').addEventListener('click',e=>{if(e.target.classList.contains('modal-overlay'))closeModal();});
$('#device-toggle').addEventListener('click',()=>{compact=!compact;$('#shell').classList.toggle('mobile-shell',compact);$('#device-toggle').innerHTML=icon(compact?'monitor':'phone',14)+`<span>${compact?'데스크톱':'모바일'}</span>`;$('#device-toggle').setAttribute('aria-label',compact?'데스크톱 화면으로 보기':'모바일 화면으로 보기');$('#device-toggle').setAttribute('aria-pressed',String(compact));});
$('#guide-button').addEventListener('click',guideModal);
$('#reset-demo').addEventListener('click',()=>{stopVoice(false);state={...defaults,transcripts:[]};seconds=222;handRaised=false;voiceTab='voice';voice.completed=false;voice.partial='';persist();navigate('entrance',true);toast('데모 기록을 초기화했어요. 처음부터 살펴보세요.');});
window.addEventListener('hashchange',()=>{const hash=location.hash.slice(1);if(stages.some(s=>s.id===hash)&&hash!==current){navigate(hash,true);}});
setInterval(()=>{if(!timerRunning||current!=='discussion'||view!=='experience')return;if(seconds>0)seconds--;const el=$('#timer-time');if(el)el.textContent=timeText();if(seconds===0){timerRunning=false;const b=$('[data-action="timer"]');if(b){b.innerHTML=icon('check')+'<span>토론 시간 완료</span>';b.disabled=true;}toast('토론 시간이 끝났어요. 역할 추리로 넘어가 보세요.');}},1000);
document.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||$('.modal')||current!=='discussion'||view!=='experience'||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target.isContentEditable)return;if(e.code==='KeyZ'){e.preventDefault();startVoice();}if(e.code==='KeyX'){e.preventDefault();stopVoice(true);}});
window.addEventListener('pagehide',()=>stopVoice(false));
$('#brand-symbol').innerHTML=bridge();$('#guide-button').innerHTML=icon('help',15);$('#device-toggle').innerHTML=icon('phone',14)+'<span>모바일</span>';$('#reset-demo').innerHTML=icon('reset',13)+'데모 처음으로';render();
