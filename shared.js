const SUPABASE_URL='https://qwnwrbbsozegbhwsktsa.supabase.co'
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bndyYmJzb3plZ2Jod3NrdHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjMzMzAsImV4cCI6MjA5NzYzOTMzMH0.UnvN3VHtoSz-DRFCMvnhJ6feoi4ao41sDB_a3GRn8WE'
const SB_HEADERS={'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json','Accept':'application/json'}
const OMAN_DATA={"مسقط":["مسقط","مطرح","العامرات","بوشر","السيب","قريات"],"ظفار":["صلالة","طاقة","مرباط","رخيوت","ثمريت","ضلكوت","المزيونة","مقشن","شليم وجزر الحلانيات","سدح"],"مسندم":["خصب","دبا","بخاء","مدحاء"],"البريمي":["البريمي","محضة","السنينة"],"الداخلية":["نزوى","سمائل","بهلا","أدم","الحمراء","منح","إزكي","بدبد","الجبل الأخضر"],"الظاهرة":["عبري","ينقل","ضنك"],"شمال الباطنة":["صحار","شناص","لوى","صحم","الخابورة","السويق"],"جنوب الباطنة":["الرستاق","المصنعة","بركاء","نخل","وادي المعاول","العوابي"],"شمال الشرقية":["إبراء","المضيبي","بدية","القابل","وادي بني خالد","دماء والطائيين","سناو"],"جنوب الشرقية":["صور","جعلان بني بو علي","جعلان بني بو حسن","الكامل والوافي","مصيرة"],"الوسطى":["هيما","محوت","الدقم","الجازر"]}

async function sbFetch(path,opts={}){
  try{
    const{headers:extraHeaders,...rest}=opts
    const headers={...SB_HEADERS,...extraHeaders}
    const r=await fetch(SUPABASE_URL+'/rest/v1/'+path,{headers,...rest})
    if(!r.ok){const t=await r.text();throw new Error(r.status+': '+(t||r.statusText))}
    if(opts.method==='DELETE')return{data:null,error:null}
    if(opts.method==='PATCH'&&!opts.returnData)return{data:null,error:null}
    return{data:await r.json(),error:null}
  }catch(e){return{data:null,error:e}}
}

function esc(s){if(!s)return'';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function showToast(msg,type){
  const el=document.createElement('div')
  el.style.cssText='position:fixed;top:20px;right:50%;transform:translateX(50%);z-index:99999;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,0.12);animation:slideDown 0.3s ease-out;direction:rtl;'
  if(type==='error'){el.style.background='#fef2f2';el.style.color='#991b1b';el.style.border='1px solid #fecaca'}
  else if(type==='success'){el.style.background='#d1fae5';el.style.color='#065f46';el.style.border='1px solid #a7f3d0'}
  else{el.style.background='#dbeafe';el.style.color='#1e40af';el.style.border='1px solid #bfdbfe'}
  el.textContent=msg
  document.body.appendChild(el)
  setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity 0.3s';setTimeout(()=>el.remove(),300)},3000)
}

function waLink(phone,msg){
  let p=(phone||'').toString().replace(/[^0-9]/g,'')
  if(p.length===8)p='968'+p
  else if(p.length===9&&p[0]==='0')p='968'+p.slice(1)
  return 'https://wa.me/'+p+'?text='+encodeURIComponent(msg)
}

function loading(show){
  let el=document.getElementById('loadingOverlay')
  if(!show){if(el)el.remove();return}
  if(el)return
  el=document.createElement('div')
  el.id='loadingOverlay'
  el.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.7);backdrop-filter:blur(4px);z-index:99998;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;'
  el.innerHTML='<div style="width:40px;height:40px;border:4px solid #e2e8f0;border-top-color:#0f766e;border-radius:50%;animation:spin 0.8s linear infinite;"></div><div style="color:#64748b;font-size:14px;font-weight:500;">جاري التحميل...</div>'
  document.body.appendChild(el)
  if(!document.getElementById('loadingStyle')){
    const s=document.createElement('style');s.id='loadingStyle'
    s.textContent='@keyframes spin{to{transform:rotate(360deg)}}'
    document.head.appendChild(s)
  }
}
