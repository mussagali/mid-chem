import test from 'node:test';
import assert from 'node:assert/strict';
import {bank,exams,questionById,numericFamilies} from '../src/questions.js';
import {lessons,modules} from '../src/curriculum.js';
import {emptyProgress,recordAnswer,finishExam,validateProgress,summarize} from '../src/engine.js';
test('all bank questions are complete and have one distinct keyed choice',()=>{
 assert.equal(bank.length,420);assert.equal(numericFamilies.length,35);assert.equal(new Set(bank.map(q=>q.id)).size,420);
 for(const q of bank){assert.ok(lessons.some(l=>l.id===q.lesson),q.id);assert.ok(modules.some(m=>m.id===q.module));assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4,q.id);assert.equal(q.reasons.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.steps.length);assert.ok(q.prompt.length>10);assert.ok(q.options.every(x=>!x.includes('NaN')&&!x.includes('Infinity')),q.id);}
});
test('ten fixed 25-question mock exams: 18 calculations, 7 concepts, 90 minutes',()=>{
 assert.equal(exams.length,10);const all=new Set();
 for(const e of exams){assert.equal(e.duration,5400);assert.equal(e.questionIds.length,25);assert.equal(new Set(e.questionIds).size,25);assert.equal(e.questionIds.filter(id=>questionById[id].kind==='calculation').length,18);for(const id of e.questionIds){assert.ok(questionById[id]);assert.ok(!all.has(id),`Duplicate exam ID ${id}`);all.add(id);}}
 assert.equal(all.size,250);
});
const value=id=>Number.parseFloat(questionById[id].options[questionById[id].answer]);
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<=Math.abs(expected)*.006+1e-14,`${actual} differs from ${expected}`);
test('independent benchmark calculations against supplied Mid and Quiz methods',()=>{
 const checks={'pressure-0':2.446,'mass-0':.01511,'added-0':1.121,'combined-0':11.127,'partial-0':82250,'wet-0':.6245,'density-0':31.136,'effusion-0':8,'effusion-time-0':37.607,'rms-0':515.34,'vdw-0':16848165,'path-0':8e-8,'first-law-0':30,'heat-rise-0':2.7887,'mix-heat-0':26.6667,'snow-0':2423.76,'bomb-0':-1680,'pv-work-0':-1823.85,'helium-0':1.87065,'hess-calc-0':127.975,'fuel-0':1129.31,'lattice-0':787,'ice-calc-0':.48,'kp-0':22.5657,'weak-acid-0':3.00217,'weak-base-0':10.973,'buffer-mix-0':4.35206,'buffer-add-0':4.58391,'salt-0':8.30989,'polyprotic-0':4.533333e-10,'threshold-0':466.6667,'boiling-0':63.0405,'gibbs-pressure-0':-208.623,'isothermal-0':-1.72885,'gibbs-0':-2};
 for(const [id,expected] of Object.entries(checks)){try{near(value(id),expected)}catch(err){throw new Error(`${id}: ${err.message}`)}}
});
test('mistakes persist as history but are resolved by correct retry',()=>{
 const q=bank[0];let s=recordAnswer(emptyProgress(),q.id,(q.answer+1)%4);assert.equal(s.stats[q.id].wrong,1);assert.equal(summarize(s).pending.length,1);s=recordAnswer(s,q.id,q.answer);assert.equal(s.stats[q.id].wrong,1);assert.equal(s.stats[q.id].attempts,2);assert.equal(summarize(s).pending.length,0);assert.equal(validateProgress(JSON.parse(JSON.stringify(s))).stats[q.id].correct,1);
});
function active(answers={}){return {...emptyProgress(),active:{sessionId:'session-1',examId:1,answers,index:0,flags:[],startedAt:1000,deadline:5401000}};}
test('perfect and empty submissions score correctly, with no double counting',()=>{
 const answers=Object.fromEntries(exams[0].questionIds.map(id=>[id,questionById[id].answer]));let perfect=finishExam(active(answers));assert.equal(perfect.history[0].score,100);assert.equal(summarize(perfect).correct,25);assert.deepEqual(finishExam(perfect),perfect);let empty=finishExam(active(),'timeout');assert.equal(empty.history[0].score,0);assert.equal(empty.history[0].skipped,25);assert.equal(summarize(empty).wrong,0);assert.equal(summarize(empty).skipped,25);assert.equal(summarize(empty).pending.length,25);
});
test('partial exam persists and contributes exactly once on submission',()=>{const ids=exams[0].questionIds;let s=active({[ids[0]]:questionById[ids[0]].answer,[ids[1]]:(questionById[ids[1]].answer+1)%4});s=validateProgress(JSON.parse(JSON.stringify(s)));assert.equal(s.active.answers[ids[0]],questionById[ids[0]].answer);s=finishExam(s);assert.equal(s.history[0].score,4);assert.equal(s.history[0].wrong,1);assert.equal(s.history[0].skipped,23);assert.equal(validateProgress(s).history.length,1)});
test('imports reject malformed structures and fabricated scores',()=>{assert.throws(()=>validateProgress({version:2}));let s=emptyProgress();s.read=['unknown'];assert.throws(()=>validateProgress(s));s=active({bad:0});assert.throws(()=>validateProgress(s));s=finishExam(active());s.history[0].score=100;assert.throws(()=>validateProgress(s));s=active();s.active.index=30;assert.throws(()=>validateProgress(s));});
