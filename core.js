(function(root){
  'use strict';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const uid=()=>globalThis.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const localDate=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const dateValid=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(new Date(s+'T12:00:00').getTime())&&localDate(new Date(s+'T12:00:00'))===s;
  const unit=e=>e.unit||e.target?.unit||(e.type==='strength'?'reps':'minutes');
  const initial=seed=>validate({version:1,lang:'de',exercises:clone(seed.exercises),days:clone(seed.days),sessions:[],draft:null,restEnd:null,backupAt:null});
  const validSet=(e,s)=>unit(e)==='reps'?Number.isInteger(s.reps)&&s.reps>0&&(e.type!=='strength'||s.weight!==null):s.minutes>0;
  const remaining=(timer,now=Date.now())=>!timer?0:timer.status==='running'?Math.max(0,Math.ceil((timer.endAt-now)/1000)):timer.remaining;
  const newTimer=(kind,duration,label={de:'',en:''},sessionId=null,entryIndex=null,now=Date.now())=>({kind,duration,remaining:duration,endAt:now+duration*1000,status:'running',label,sessionId,entryIndex});
  const pauseTimer=(timer,now=Date.now())=>({...timer,remaining:remaining(timer,now),endAt:null,status:remaining(timer,now)>0?'paused':'finished'});
  const resumeTimer=(timer,now=Date.now())=>({...timer,endAt:now+timer.remaining*1000,status:'running'});
  const addTimer=(timer,seconds,now=Date.now())=>{const left=Math.min(18000,remaining(timer,now)+seconds);return {...timer,duration:Math.min(18000,timer.duration+seconds),remaining:left,endAt:timer.status==='running'?now+left*1000:null,status:timer.status==='finished'?'paused':timer.status};};
  const completedSets=e=>e.sets.filter(s=>s.done);
  const metric=(e,mode)=>{
    const sets=completedSets(e);
    if(!sets.length)return null;
    if((['reps','volume','e1rm'].includes(mode)&&unit(e)!=='reps')||(['minutes','distance'].includes(mode)&&unit(e)!=='minutes'))return null;
    const loaded=sets.filter(s=>s.weight>0&&s.reps>0);
    switch(mode){
      case 'weight':{const weights=sets.filter(s=>s.weight>0);return weights.length?Math.max(...weights.map(s=>s.weight)):null;}
      case 'volume':return loaded.length?loaded.reduce((n,s)=>n+s.weight*s.reps,0):null;
      case 'reps':return sets.reduce((n,s)=>n+(s.reps||0),0);
      case 'e1rm':{const eligible=loaded.filter(s=>s.reps<=12);return eligible.length?Math.max(...eligible.map(s=>s.weight*(1+s.reps/30))):null;}
      case 'minutes':return sets.reduce((n,s)=>n+(s.minutes||0),0);
      case 'distance':{const valid=sets.filter(s=>s.distance!==null);return valid.length?valid.reduce((n,s)=>n+s.distance,0):null;}
      default:return null;
    }
  };
  const series=(sessions,exerciseId,mode)=>sessions.slice().sort((a,b)=>a.date.localeCompare(b.date)||a.createdAt-b.createdAt).flatMap(s=>{const e=s.entries.find(e=>e.exerciseId===exerciseId);const value=e?metric(e,mode):null;return value===null?[]:[{id:s.id,date:s.date,value,entry:e}];});
  const lastEntry=(sessions,id,before=undefined)=>{const sorted=sessions.filter(s=>!before||s.date<=before).slice().sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);for(const s of sorted){const e=s.entries.find(e=>e.exerciseId===id&&e.sets.some(x=>x.done));if(e)return {entry:e,date:s.date};}return null;};
  const suggest=e=>{
    if(!e||e.type!=='strength'||unit(e)!=='reps')return 'baseline';
    const sets=completedSets(e);
    if(sets.length<e.target.sets)return 'complete';
    if(sets.some(s=>s.rir!==null&&s.rir<1))return 'hold';
    if(sets.every(s=>s.reps>=e.target.max&&s.rir!==null&&s.rir>=1)&&e.target.max>0)return 'increase';
    return 'reps';
  };
  const makeDraft=(day,exercises,sessions)=>({id:uid(),dayId:day.id,name:clone(day.name),date:localDate(),createdAt:Date.now(),startedAt:Date.now(),duration:null,readiness:'3',notes:'',editingId:null,entries:day.entries.map(target=>{
    const e=exercises.find(e=>e.id===target.exerciseId); const last=lastEntry(sessions,e.id);const previous=last?.entry.sets||[];
    return {exerciseId:e.id,name:clone(e.name),type:e.type,unit:target.unit||unit(e),target:{...clone(target),unit:target.unit||unit(e)},notes:'',sets:Array.from({length:(target.unit||unit(e))==='reps'?target.sets:1},(_,i)=>({weight:previous[i]?.weight??previous[0]?.weight??null,reps:null,rir:null,minutes:null,distance:null,rpe:null,done:false}))};
  })});
  const weekStart=(d=new Date())=>{const c=new Date(d);c.setDate(c.getDate()-((c.getDay()+6)%7));return localDate(c);};
  const totalMinutes=(day,exercises)=>day.warmup+day.block+day.entries.filter(e=>(e.unit||unit(exercises.find(x=>x.id===e.exerciseId)))==='minutes').reduce((n,e)=>n+e.minutes,0);
  // Backups are untrusted input. Validate nested fields before using or replacing data.
  function validate(value){
    const fail=()=>{throw new Error('Invalid FORM backup');};
    const obj=x=>{if(!x||typeof x!=='object'||Array.isArray(x))fail();return x;};
    const str=(x,max=10000)=>{if(typeof x!=='string'||x.length>max)fail();return x;};
    const id=x=>{str(x,100);if(!/^[a-zA-Z0-9_-]+$/.test(x))fail();return x;};
    const num=(x,min,max,nullable=false)=>{if(nullable&&x===null)return x;if(typeof x!=='number'||!Number.isFinite(x)||x<min||x>max)fail();return x;};
    const int=(x,min,max)=>{num(x,min,max);if(!Number.isInteger(x))fail();return x;};
    const arr=(x,max)=>{if(!Array.isArray(x)||x.length>max)fail();return x;};
    const lang=x=>{obj(x);return {de:str(x.de,10000),en:str(x.en,10000)};};
    const enumV=(x,values)=>{if(!values.includes(x))fail();return x;};
    const unique=(a)=>{if(new Set(a.map(x=>x.id)).size!==a.length)fail();};
    const date=x=>{if(!dateValid(x))fail();return x;};
    obj(value);if(![1,2].includes(value.version))fail();
    const exercises=arr(value.exercises,500).map(x=>{obj(x);const image=str(x.image||'',1500000);if(image&&!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(image))fail();return {id:id(x.id),name:lang(x.name),type:enumV(x.type,['strength','cardio','mobility']),unit:enumV(x.unit??(x.type==='strength'?'reps':'minutes'),['reps','minutes']),group:enumV(x.group,['legs','back','chest','posterior','shoulders','core','cardio','mobility','other']),equipment:enumV(x.equipment,['machine','dumbbell','barbell','cable','bodyweight','cardio','other']),pattern:enumV(x.pattern,['squat','row','press','hinge','pull','lunge','overhead','curl','fly','bridge','mobility','core','carry','cardio']),guide:lang(x.guide),mistake:lang(x.mistake),alternatives:arr(x.alternatives||[],20).map(id),image};});unique(exercises);
    const target=(x,defaultUnit='minutes')=>{obj(x);const result={exerciseId:id(x.exerciseId),unit:enumV(x.unit??defaultUnit,['reps','minutes']),sets:int(x.sets,1,20),min:int(x.min,0,1000),max:int(x.max,0,1000),group:str(x.group,20),rest:int(x.rest,0,900),minutes:num(x.minutes,0,300)};if(result.max<result.min)fail();return result;};
    const days=arr(value.days,30).map(x=>{obj(x);const entries=arr(x.entries,50).map(p=>target(p,unit(exercises.find(e=>e.id===p.exerciseId)||{})));if(new Set(entries.map(x=>x.exerciseId)).size!==entries.length)fail();if(entries.some(t=>!exercises.some(e=>e.id===t.exerciseId)))fail();return {id:id(x.id),name:lang(x.name),weekday:int(x.weekday,0,6),kind:enumV(x.kind,['strength','mobility']),warmup:num(x.warmup,0,120),block:num(x.block,0,240),entries};});unique(days);
    const set=x=>{obj(x);if(typeof x.done!=='boolean')fail();return {weight:num(x.weight,0,2000,true),reps:num(x.reps,0,1000,true),rir:num(x.rir,0,10,true),minutes:num(x.minutes,0,300,true),distance:num(x.distance,0,1000,true),rpe:num(x.rpe,1,10,true),done:x.done};};
    const session=(x,isDraft)=>{obj(x);const entries=arr(x.entries,50).map(e=>{obj(e);const type=enumV(e.type,['strength','cardio','mobility']);const entryUnit=enumV(e.unit??(type==='strength'?'reps':'minutes'),['reps','minutes']);const sets=arr(e.sets,30).map(set);for(const s of sets){if(s.done&&!validSet({type,unit:entryUnit},s))fail();}return {exerciseId:id(e.exerciseId),name:lang(e.name),type,unit:entryUnit,target:target(e.target,entryUnit),notes:str(e.notes),sets};});if(new Set(entries.map(e=>e.exerciseId)).size!==entries.length)fail();return {id:id(x.id),dayId:id(x.dayId),name:lang(x.name),date:date(x.date),createdAt:num(x.createdAt,0,1e15),startedAt:num(x.startedAt,0,1e15),duration:num(x.duration,0,1440,isDraft),readiness:enumV(x.readiness,['1','2','3','4','5']),notes:str(x.notes),editingId:x.editingId===null?null:id(x.editingId),entries};};
    const sessions=arr(value.sessions,20000).map(x=>session(x,false));unique(sessions);
    let timer=null;
    if(value.timer!=null){const x=obj(value.timer);timer={kind:enumV(x.kind,['exercise','rest']),duration:int(x.duration,1,18000),remaining:int(x.remaining,0,18000),endAt:num(x.endAt,0,1e15,true),status:enumV(x.status,['running','paused','finished']),label:lang(x.label),sessionId:x.sessionId===null?null:id(x.sessionId),entryIndex:x.entryIndex===null?null:int(x.entryIndex,0,49)};if(timer.status==='running'&&timer.endAt===null)fail();}
    else if(value.version===1&&value.restEnd!=null){const end=num(value.restEnd,0,1e15);const seconds=Math.min(18000,Math.max(1,Math.ceil((end-Date.now())/1000)));timer=newTimer('rest',seconds,{de:'Pause',en:'Rest'});timer.endAt=end;}
    return {version:2,theme:enumV(value.theme??'system',['system','light','dark']),timer,lang:enumV(value.lang,['de','en']),exercises,days,sessions,draft:value.draft===null?null:session(value.draft,true),backupAt:value.backupAt===null?null:str(value.backupAt,40)};
  }
  root.FORMCore={unit,validSet,remaining,newTimer,pauseTimer,resumeTimer,addTimer,clone,uid,localDate,dateValid,initial,metric,series,lastEntry,suggest,makeDraft,weekStart,totalMinutes,validate};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.FORMCore;
})(globalThis);
