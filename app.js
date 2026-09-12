const board=document.getElementById('board');
const statusEl=document.getElementById('status');
const roomCode=document.getElementById('roomCode');
const nameEl=document.getElementById('name');
const chat=document.getElementById('chat');
let state={board:null,turn:'w',selected:null,local:true};

const pieces={r:'♜',n:'♞',b:'♝',q:'♛',k:'♚',p:'♟',R:'♖',N:'♘',B:'♗',Q:'♕',K:'♔',P:'♙'};
function startBoard(){return[
['r','n','b','q','k','b','n','r'],Array(8).fill('p'),Array(8).fill(''),Array(8).fill(''),
Array(8).fill(''),Array(8).fill(''),Array(8).fill('P'),['R','N','B','Q','K','B','N','R']]}
function draw(){board.innerHTML='';for(let r=0;r<8;r++)for(let c=0;c<8;c++){let d=document.createElement('div');d.className='cell '+((r+c)%2?'dark':'light');if(state.selected?.[0]===r&&state.selected?.[1]===c)d.classList.add('selected');let p=state.board[r][c];d.textContent=pieces[p]||'';d.onclick=()=>clickCell(r,c);board.appendChild(d)}}
function color(p){return p&&p===p.toUpperCase()?'w':'b'}
function clickCell(r,c){let p=state.board[r][c];if(state.selected){let [sr,sc]=state.selected;if(sr===r&&sc===c){state.selected=null;draw();return}state.board[r][c]=state.board[sr][sc];state.board[sr][sc]='';state.turn=state.turn==='w'?'b':'w';state.selected=null;statusEl.textContent='Ход '+(state.turn==='w'?'белых':'чёрных');draw();return}if(p&&color(p)===state.turn){state.selected=[r,c];draw()}}
function newLocal(){state.board=startBoard();state.turn='w';state.selected=null;state.local=true;roomCode.textContent='ЛОКАЛЬНО';statusEl.textContent='Локальная партия';draw()}
function addMsg(t){let d=document.createElement('div');d.className='msg';d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
document.getElementById('local').onclick=newLocal;
document.getElementById('create').onclick=()=>{roomCode.textContent=Math.random().toString(36).slice(2,8).toUpperCase();newLocal();addMsg('Комната создана: '+roomCode.textContent)}
document.getElementById('join').onclick=()=>{roomCode.textContent=document.getElementById('room').value.toUpperCase()||'—';newLocal();addMsg('Подключение к комнате '+roomCode.textContent)}
document.getElementById('send').onclick=()=>{let x=document.getElementById('message');if(x.value.trim()){addMsg((nameEl.value||'Игрок')+': '+x.value);x.value=''}}
document.getElementById('message').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('send').click()});
newLocal();
