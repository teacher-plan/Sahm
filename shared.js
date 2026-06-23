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
