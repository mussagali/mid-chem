import {bank,questionById,exams} from './questions.js';
import {lessons} from './curriculum.js';
export const STORAGE_KEY='chem101-progress-v1';
export const emptyProgress=()=>({version:1,stats:{},read:[],bookmarks:[],history:[],active:null,savedAt:0});
export function recordAnswer(state,id,choice,mode='practice'){
 const q=questionById[id]; if(!q) return state;
 const previous=state.stats[id]||{attempts:0,wrong:0,skipped:0,correct:0,pending:false};
 const ok=choice===q.answer,skip=choice===null||choice===undefined;
 return {...state,stats:{...state.stats,[id]:{...previous,attempts:previous.attempts+1,wrong:previous.wrong+(!ok&&!skip?1:0),skipped:previous.skipped+(skip?1:0),correct:previous.correct+(ok?1:0),pending:!ok,lastChoice:skip?null:choice,lastMode:mode,lastAt:Date.now()}}};
}
export function finishExam(state,reason='manual',now=Date.now()){
 const active=state.active;if(!active)return state;
 if(state.history.some(h=>h.sessionId===active.sessionId))return {...state,active:null};
 const exam=exams.find(e=>e.id===active.examId);if(!exam)return {...state,active:null};
 let next=state,correct=0,skipped=0;
 for(const id of exam.questionIds){const choice=active.answers[id]??null; if(choice===questionById[id].answer)correct++;if(choice===null)skipped++;next=recordAnswer(next,id,choice,'exam');}
 const result={sessionId:active.sessionId,examId:active.examId,answers:{...active.answers},correct,skipped,wrong:25-correct-skipped,score:correct*4,finishedAt:now,startedAt:active.startedAt,reason};
 return {...next,active:null,history:[result,...state.history]};
}
const validChoices=(answers,ids)=>answers&&typeof answers==='object'&&!Array.isArray(answers)&&Object.entries(answers).every(([id,c])=>ids.includes(id)&&Number.isInteger(c)&&c>=0&&c<4);
export function validateProgress(p){
 if(!p||p.version!==1||!p.stats||typeof p.stats!=='object'||Array.isArray(p.stats))throw new Error('Неподдерживаемый формат прогресса. Нужен экспорт CHEM101 версии 1.');
 const lessonIds=lessons.map(l=>l.id),questionIds=bank.map(q=>q.id);
 if(!Array.isArray(p.read)||!p.read.every(id=>lessonIds.includes(id))||!Array.isArray(p.bookmarks)||!p.bookmarks.every(id=>questionIds.includes(id)))throw new Error('В файле неизвестные уроки или задания.');
 for(const [id,s] of Object.entries(p.stats)){if(!questionById[id]||!s||!['attempts','wrong','skipped','correct'].every(k=>Number.isSafeInteger(s[k])&&s[k]>=0)||s.attempts!==s.wrong+s.skipped+s.correct||typeof s.pending!=='boolean'||!(s.lastChoice===null||(Number.isInteger(s.lastChoice)&&s.lastChoice>=0&&s.lastChoice<4)))throw new Error('Некорректная статистика в файле.');}
 if(!Array.isArray(p.history))throw new Error('Некорректная история.');
 for(const h of p.history){const e=exams.find(e=>e.id===h.examId);if(!e||typeof h.sessionId!=='string'||!Number.isFinite(h.finishedAt)||!validChoices(h.answers,e.questionIds))throw new Error('Некорректный результат пробника.');const count=e.questionIds.filter(id=>h.answers[id]===questionById[id].answer).length;const skip=e.questionIds.filter(id=>h.answers[id]===undefined).length;if(h.correct!==count||h.score!==count*4||h.skipped!==skip||h.wrong!==25-count-skip)throw new Error('Баллы в файле не соответствуют ответам.');}
 if(p.active){const a=p.active,e=exams.find(e=>e.id===a.examId);if(!e||typeof a.sessionId!=='string'||!Number.isFinite(a.deadline)||!Number.isFinite(a.startedAt)||a.deadline!==a.startedAt+e.duration*1000||!validChoices(a.answers,e.questionIds)||!Number.isInteger(a.index)||a.index<0||a.index>=25||!Array.isArray(a.flags)||!a.flags.every(id=>e.questionIds.includes(id)))throw new Error('Некорректный активный пробник.');}
 return {...emptyProgress(),version:1,stats:p.stats,read:p.read,bookmarks:p.bookmarks,history:p.history,active:p.active||null,savedAt:Number(p.savedAt)||0};
}
export function summarize(state){
 const rows=Object.values(state.stats);return {attempts:rows.reduce((a,s)=>a+s.attempts,0),wrong:rows.reduce((a,s)=>a+s.wrong,0),skipped:rows.reduce((a,s)=>a+s.skipped,0),correct:rows.reduce((a,s)=>a+s.correct,0),pending:Object.keys(state.stats).filter(id=>state.stats[id].pending),solved:rows.filter(s=>s.attempts>0&&!s.pending).length};
}
