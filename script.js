(function(){
  var f=function(n){return Math.round(n*100)/100};
  var seed=11;
  var rnd=function(){seed=(seed*16807)%2147483647;return seed/2147483647};
  var OUT='rgba(40,12,32,.22)';

  /* ---------- flower knowledge ---------- */
  var TYPES={
    rose:{name:'Rose',mean:'Love and passion',sw:'#C22B3B',layer:5,hit:[0,.85,.85],
      note:'The classic red rose is a declaration of romantic love. It also carries respect and deep admiration.'},
    sun:{name:'Sunflower',mean:'Adoration and loyalty',sw:'#F3B722',layer:3,hit:[0,1.05,1.05],
      note:'Sunflowers follow the sun across the sky, so they stand for faithfulness, warmth and a long, steady happiness.'},
    peony:{name:'Peony',mean:'Romance and good fortune',sw:'#EE93B4',layer:3,hit:[0,.9,.9],
      note:'Given for a happy marriage, prosperity and a bright future. In China the peony is called the king of flowers.'},
    tulip:{name:'Tulip',mean:'Perfect love and cheer',sw:'#F2668E',layer:1,hit:[-.85,.6,.9],
      note:'Red tulips declare love, pink ones say affection and care, and yellow ones wish someone a sunny day.'},
    poppy:{name:'Poppy',mean:'Remembrance and consolation',sw:'#E8492B',layer:4,hit:[0,.85,.85],
      note:'Red poppies honour those who are remembered. They also stand for peace, rest and imagination.'},
    ran:{name:'Ranunculus',mean:'Radiant charm',sw:'#FA8440',layer:5,hit:[0,.85,.85],
      note:'Its many tight petals say "you are radiant". A flower of attraction and admiration.'},
    lily:{name:'Lily',mean:'Purity and renewal',sw:'#F3C6D6',layer:4,hit:[0,1.05,1.05],
      note:'White lilies stand for sincerity, purity and a fresh start. They are also a traditional flower of sympathy.'},
    daisy:{name:'Daisy',mean:'Innocence and new beginnings',sw:'#F5CB2E',layer:6,hit:[0,.85,.85],
      note:'A simple flower for simple joy: purity, loyal love and starting again.'},
    hyd:{name:'Hydrangea',mean:'Gratitude and heartfelt feeling',sw:'#7C9EEA',layer:2,hit:[0,1.1,1.1],
      note:'Full, generous clusters say thank you. They stand for abundance and sincere emotion.'},
    lav:{name:'Lavender',mean:'Devotion and calm',sw:'#8E6ED4',layer:1,hit:[-1.5,.42,1.1],
      note:'Lavender signals quiet devotion and serenity, and its scent has long been tied to rest.'},
    gyp:{name:"Baby's breath",mean:'Everlasting love',sw:'#FFFFFF',layer:0,hit:[-1,1.15,1.05],
      note:'Tiny white blooms for lasting love and innocence. They make every flower beside them look fuller.'},
    euc:{name:'Eucalyptus',mean:'Protection and healing',sw:'#8DB7A3',layer:0,hit:[-1.35,.6,1.3],
      note:'Eucalyptus stands for protection, renewal and abundance, and is known for its clean, calming scent.'}
  };

  /* ---------- drawing (unit coordinates, scaled per flower) ---------- */
  function pet(n,rx,ry,off,fill,rot,sw){
    rot=rot||0; sw=sw==null?.035:sw; var s='';
    for(var i=0;i<n;i++){
      s+='<ellipse cy="'+(-off)+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+OUT+'" stroke-width="'+sw+'" transform="rotate('+f(rot+i*360/n)+')"/>';
    }
    return s;
  }
  function rotv(x,y,deg){var r=deg*Math.PI/180;return [x*Math.cos(r)-y*Math.sin(r),x*Math.sin(r)+y*Math.cos(r)]}

  var seeds='';
  for(var i=0;i<46;i++){
    var r=.46*Math.sqrt((i+.5)/46),a=i*137.508*Math.PI/180;
    seeds+='<circle cx="'+f(r*Math.cos(a))+'" cy="'+f(r*Math.sin(a))+'" r=".035" fill="'+(i%3?'#2E1A0C':'#9B6A32')+'"/>';
  }

  var DRAW={
    rose:function(v){
      var c=[['#B3202E','#C92D3D','#DD4256','#8F1622'],['#9E1B32','#B72544','#CF3A5A','#7C1226']][v%2];
      return pet(6,.5,.46,.5,c[0])+pet(5,.42,.4,.34,c[1],25)+pet(4,.3,.3,.2,c[2],50)+
        '<circle r=".17" fill="'+c[3]+'"/><path d="M-.1 .02 A.1 .1 0 1 1 .06 .09" fill="none" stroke="rgba(255,255,255,.28)" stroke-width=".03" stroke-linecap="round"/>';
    },
    sun:function(){
      return pet(18,.17,.5,.72,'#F0AE1E',0,.03)+pet(18,.16,.46,.66,'#F8CB3F',10,.03)+
        '<circle r=".52" fill="#5A3517"/>'+seeds+'<circle r=".52" fill="none" stroke="#3A210E" stroke-width=".04"/>';
    },
    peony:function(){
      return pet(9,.42,.4,.62,'#F6BCD0')+pet(9,.4,.38,.5,'#F2A2BE',20)+pet(8,.34,.32,.36,'#EB86AC',10)+
        pet(7,.28,.27,.22,'#E06C98',30)+pet(5,.2,.2,.1,'#CC4F80')+'<circle r=".07" fill="#F5D060"/>';
    },
    poppy:function(){
      var s=pet(4,.62,.56,.42,'#D93A22',45)+pet(4,.6,.54,.4,'#EE5B2F',0)+pet(4,.16,.14,.15,'#3B1520',0,.01);
      for(var i=0;i<14;i++){var a=i*360/14*Math.PI/180;s+='<circle cx="'+f(.28*Math.cos(a))+'" cy="'+f(.28*Math.sin(a))+'" r=".035" fill="#2A1A1E"/>'}
      return s+'<circle r=".12" fill="#8A9A7A" stroke="#2A1A1E" stroke-width=".03"/>';
    },
    ran:function(){
      return pet(10,.3,.3,.7,'#FFA260')+pet(10,.28,.28,.58,'#FF8B48',18)+pet(9,.26,.26,.44,'#F97C36',9)+
        pet(8,.22,.22,.3,'#EF6A28',27)+pet(7,.18,.18,.18,'#DF5A20',5)+'<circle r=".08" fill="#B24418"/>';
    },
    lily:function(){
      var o='M0 0 C.34 -.35 .32 -.95 0 -1.42 C-.32 -.95 -.34 -.35 0 0Z',s='',i;
      for(i=0;i<3;i++)s+='<path d="'+o+'" fill="#F7DCE6" stroke="'+OUT+'" stroke-width=".03" transform="rotate('+(i*120+60)+')"/>';
      for(i=0;i<3;i++)s+='<path d="'+o+'" fill="#FFF6F9" stroke="'+OUT+'" stroke-width=".03" transform="rotate('+(i*120)+')"/>';
      for(i=0;i<6;i++)s+='<path d="M0 -.12 L0 -.95" stroke="#E58BB0" stroke-width=".05" stroke-linecap="round" opacity=".75" transform="rotate('+(i*60)+')"/>';
      for(i=0;i<6;i++){
        var a=(i*60+15)*Math.PI/180,x=f(.55*Math.sin(a)),y=f(-.55*Math.cos(a));
        s+='<path d="M0 0 L'+x+' '+y+'" stroke="#F0A0BE" stroke-width=".03"/><ellipse cx="'+x+'" cy="'+y+'" rx=".05" ry=".1" fill="#D9691E" transform="rotate('+(i*60+15)+' '+x+' '+y+')"/>';
      }
      return s;
    },
    daisy:function(){
      return pet(14,.12,.42,.55,'#FFFFFF',0,.03)+'<circle r=".27" fill="#F3BE12" stroke="#D69A0A" stroke-width=".03"/><circle r=".12" fill="#E0A30C"/>';
    },
    hyd:function(){
      var pal=['#7C9EEA','#93B0F2','#6A86D8','#A9BEF5','#B7A6EA','#8AA6EF'],N=34,s='';
      for(var i=N-1;i>=0;i--){
        var r=1.05*Math.sqrt((i+.5)/N),a=i*137.508*Math.PI/180;
        s+='<g transform="translate('+f(r*Math.cos(a))+' '+f(r*Math.sin(a))+') rotate('+((i*47)%90)+')">'+
           pet(4,.15,.16,.12,pal[i%pal.length],0,.02)+'<circle r=".05" fill="#EAF0FF"/></g>';
      }
      return s;
    },
    lav:function(){
      var s='<path d="M0 .1 L0 -2.5" stroke="#5E8C5A" stroke-width=".06" stroke-linecap="round"/>',cols=['#8E6ED4','#A88BE8','#7654B9'];
      for(var i=0;i<14;i++){
        var y=-.5-i*.14,k=1-i*.04,w=.1*k+.02;
        s+='<ellipse cx="'+f(-w)+'" cy="'+f(y)+'" rx=".1" ry=".075" fill="'+cols[i%3]+'" transform="rotate(-25 '+f(-w)+' '+f(y)+')"/>'+
           '<ellipse cx="'+f(w)+'" cy="'+f(y-.06)+'" rx=".1" ry=".075" fill="'+cols[(i+1)%3]+'" transform="rotate(25 '+f(w)+' '+f(y-.06)+')"/>';
      }
      return s+'<ellipse cy="-2.5" rx=".07" ry=".11" fill="#A88BE8"/>';
    },
    tulip:function(v){
      var c=[['#F2668E','#D64A75'],['#F8C630','#E2A61A']][v%2],st='stroke="'+OUT+'" stroke-width=".03"';
      return '<path d="M-.46 0 C-.6 -.8 -.28 -1.4 0 -1.78 C.28 -1.4 .6 -.8 .46 0Z" fill="'+c[1]+'" '+st+'/>'+
        '<path d="M-.5 -.04 C-.78 -.72 -.5 -1.32 -.1 -1.62 C-.02 -1 .02 -.45 .04 -.02Z" fill="'+c[0]+'" '+st+'/>'+
        '<path d="M.5 -.04 C.78 -.72 .5 -1.32 .1 -1.62 C.02 -1 -.02 -.45 -.04 -.02Z" fill="'+c[0]+'" '+st+'/>'+
        '<path d="M-.22 -.3 C-.3 -.7 -.22 -1.1 -.1 -1.35" stroke="rgba(255,255,255,.4)" fill="none" stroke-width=".04" stroke-linecap="round"/>';
    },
    euc:function(){
      var s='<path d="M0 .1 Q.18 -1.3 0 -2.7" fill="none" stroke="#6E9B84" stroke-width=".06" stroke-linecap="round"/>',cols=['#8DB7A3','#A6CBBB','#7AA793'];
      for(var i=0;i<9;i++){
        var y=-.35-i*.26,k=1-i*.055;
        [-1,1].forEach(function(sd,j){
          var x=sd*.26*k,yy=y-(sd>0?.1:0);
          s+='<ellipse cx="'+f(x)+'" cy="'+f(yy)+'" rx="'+f(.27*k)+'" ry="'+f(.21*k)+'" fill="'+cols[(i+j)%3]+'" stroke="#5F8A78" stroke-width=".025" transform="rotate('+(sd*28)+' '+f(x)+' '+f(yy)+')"/>';
        });
      }
      return s+'<ellipse cy="-2.75" rx=".16" ry=".22" fill="#8DB7A3" stroke="#5F8A78" stroke-width=".025"/>';
    },
    gyp:function(){
      var br=[[-58,1.5],[-34,1.9],[-12,2.1],[10,2],[32,1.8],[55,1.45]],lines='',dots='';
      function dot(x,y){
        [[0,0],[.09,.03],[-.07,.07],[.02,-.09]].forEach(function(o){
          dots+='<circle cx="'+f(x+o[0])+'" cy="'+f(y+o[1])+'" r=".065" fill="#FFFFFF" stroke="rgba(120,110,140,.5)" stroke-width=".02"/>';
        });
      }
      br.forEach(function(b){
        var a=b[0]*Math.PI/180,L=b[1],dx=Math.sin(a),dy=-Math.cos(a);
        var E=[dx*L*.72,dy*L*.72],M=[dx*L*.4,dy*L*.4];
        var d1=rotv(dx,dy,28),d2=rotv(dx,dy,-28);
        var F1=[M[0]+d1[0]*L*.32,M[1]+d1[1]*L*.32],F2=[M[0]+d2[0]*L*.32,M[1]+d2[1]*L*.32];
        lines+='<path d="M0 0 L'+f(M[0])+' '+f(M[1])+' L'+f(E[0])+' '+f(E[1])+' M'+f(M[0])+' '+f(M[1])+' L'+f(F1[0])+' '+f(F1[1])+' M'+f(M[0])+' '+f(M[1])+' L'+f(F2[0])+' '+f(F2[1])+'"/>';
        dot(E[0],E[1]);dot(F1[0],F1[1]);dot(F2[0],F2[1]);
      });
      return '<g stroke="#7FA18F" stroke-width=".035" fill="none" stroke-linecap="round">'+lines+'</g>'+dots;
    }
  };

  /* ---------- arrangement: [type, x, y, size, variant] ---------- */
  var B={x:400,y:720};
  var FL=[
    ['gyp',335,185,44],['gyp',470,175,46],['gyp',225,275,42],['gyp',580,270,42],['gyp',150,385,42],['gyp',655,385,42],
    ['euc',125,435,38],['euc',675,440,38],['euc',245,190,40],['euc',560,185,40],['euc',400,155,36],
    ['lav',205,335,44],['lav',600,335,44],['lav',300,255,42],['lav',500,250,42],
    ['tulip',175,515,34,0],['tulip',625,515,34,1],
    ['hyd',215,430,50],['hyd',585,435,50],['hyd',400,560,46],
    ['sun',400,200,44],['sun',445,330,40],
    ['peony',295,225,46],['peony',505,225,44],['peony',500,430,42],
    ['poppy',232,335,36],['poppy',640,320,34],
    ['rose',335,320,44,0],['rose',400,425,46,1],['rose',270,505,40,0],['rose',535,505,40,1],
    ['ran',545,335,38],['ran',300,425,38],['ran',400,515,34],
    ['lily',350,515,36],['lily',455,522,36],
    ['daisy',395,275,24],['daisy',275,290,22],['daisy',560,285,22],['daisy',350,470,24],['daisy',455,475,24]
  ];
  var LONG={lav:1,tulip:1,euc:1,gyp:1};

  var stems=document.getElementById('stems'),leaves=document.getElementById('leaves'),blooms=document.getElementById('blooms');

  /* stems */
  var sHTML='';
  FL.forEach(function(d,i){
    var cx=B.x+(d[1]-B.x)*.25,cy=B.y-(B.y-d[2])*.55;
    d.rot=LONG[d[0]]?Math.atan2(d[1]-cx,cy-d[2])*180/Math.PI:Math.round(rnd()*360);
    sHTML+='<path class="stem '+(i%2?'a':'b')+'" pathLength="1" stroke-width="'+(3+(i%3)*.5)+'" style="animation-delay:'+(i*18)+'ms" d="M'+B.x+' '+B.y+' Q'+f(cx)+' '+f(cy)+' '+d[1]+' '+d[2]+'"/>';
  });
  stems.innerHTML=sHTML;

  /* leaves peeking out of the wrap */
  var LV=[[262,606,-78,120],[292,616,-56,110],[338,626,-30,100],[538,606,78,120],[508,616,56,110],[462,626,30,100],[400,610,-6,105],[380,616,-14,90]];
  var lHTML='';
  LV.forEach(function(l,i){
    var L=l[3],W=L*.22;
    lHTML+='<g transform="translate('+l[0]+','+l[1]+') rotate('+l[2]+')"><path class="leaf '+(i%2?'a':'b')+'" d="M0 0 C'+f(W)+' '+f(-L*.3)+' '+f(W*.6)+' '+f(-L*.8)+' 0 '+(-L)+' C'+f(-W*.6)+' '+f(-L*.8)+' '+f(-W)+' '+f(-L*.3)+' 0 0Z"/><path class="vein" d="M0 -4 L0 '+f(-L*.88)+'"/></g>';
  });
  leaves.innerHTML=lHTML;

  /* blooms: back layers first, lower flowers in front */
  var order=FL.slice().sort(function(a,b){return TYPES[a[0]].layer-TYPES[b[0]].layer||a[2]-b[2]});
  var bHTML='';
  order.forEach(function(d,i){
    var t=TYPES[d[0]],h=t.hit,s=d[3];
    bHTML+='<g transform="translate('+d[1]+','+d[2]+') rotate('+f(d.rot)+')"><g class="pop" style="animation-delay:'+(650+i*32)+'ms">'+
      '<g class="bloom" data-type="'+d[0]+'" tabindex="0" role="img" aria-label="'+t.name+': '+t.mean+'"><g transform="scale('+s+')">'+
      DRAW[d[0]](d[4]||0)+'<ellipse class="hit" cx="0" cy="'+h[0]+'" rx="'+h[1]+'" ry="'+h[2]+'"/></g></g></g></g>';
  });
  blooms.innerHTML=bHTML;

  /* chips */
  var chips=document.getElementById('chips'),cHTML='';
  Object.keys(TYPES).forEach(function(k){
    cHTML+='<button class="chip" type="button" data-type="'+k+'" style="--c:'+TYPES[k].sw+'"><i></i>'+TYPES[k].name+'</button>';
  });
  chips.innerHTML=cHTML;

  /* ---------- interaction ---------- */
  var svg=document.getElementById('bouquet'),tip=document.getElementById('tip');
  var all=[].slice.call(svg.querySelectorAll('.bloom'));
  var tname=tip.querySelector('.tname'),tmean=tip.querySelector('.tmean'),tnote=tip.querySelector('.tnote');
  var cur=null,lastPointer='mouse';
  var coarse=function(){return window.matchMedia('(hover: none)').matches};

  document.addEventListener('pointerdown',function(e){lastPointer=e.pointerType||'mouse'});

  function setOn(list){
    all.forEach(function(b){b.classList.toggle('on',list.indexOf(b)>-1)});
    svg.classList.toggle('has-on',list.length>0);
  }
  function fillTip(type){
    var t=TYPES[type];
    tip.style.setProperty('--c',t.sw);
    tname.textContent=t.name;tmean.textContent=t.mean;tnote.textContent=t.note;
  }
  function place(x,y,above){
    var w=tip.offsetWidth,h=tip.offsetHeight,m=12,left,top;
    left=above?x-w/2:x+18; top=above?y-h-14:y+18;
    if(left+w>innerWidth-m)left=above?innerWidth-w-m:x-w-18;
    if(left<m)left=m;
    if(top+h>innerHeight-m)top=y-h-18;
    if(top<m)top=m;
    tip.style.left=left+'px';tip.style.top=top+'px';
  }
  function show(type,x,y,dock,above){
    fillTip(type);
    tip.classList.toggle('dock',!!dock);
    if(dock){tip.style.left='';tip.style.top=''}else{tip.classList.add('show');place(x,y,above)}
    tip.classList.add('show');
    tip.setAttribute('aria-hidden','false');
  }
  function activateBloom(b,x,y,dock){cur=b;setOn([b]);show(b.dataset.type,x,y,dock)}
  function activateType(type,x,y,dock,above){
    cur=type;setOn(all.filter(function(b){return b.dataset.type===type}));show(type,x,y,dock,above);
  }
  function deactivate(){
    cur=null;setOn([]);tip.classList.remove('show');tip.setAttribute('aria-hidden','true');
  }

  svg.addEventListener('pointermove',function(e){
    if(e.pointerType==='touch')return;
    var b=e.target.closest('.bloom');
    if(b){ if(cur!==b)activateBloom(b,e.clientX,e.clientY,false); else place(e.clientX,e.clientY); }
    else if(cur)deactivate();
  });
  svg.addEventListener('pointerleave',function(e){if(e.pointerType!=='touch')deactivate()});
  svg.addEventListener('click',function(e){
    var touchy=e.pointerType==='touch'||lastPointer==='touch'||coarse();
    if(!touchy)return;
    var b=e.target.closest('.bloom');
    if(b)activateBloom(b,0,0,true);else deactivate();
  });
  svg.addEventListener('focusin',function(e){
    var b=e.target.closest('.bloom');if(!b)return;
    var r=b.getBoundingClientRect();
    activateBloom(b,r.left+r.width/2,r.top+r.height/2,coarse());
  });
  svg.addEventListener('focusout',deactivate);

  [].slice.call(chips.querySelectorAll('.chip')).forEach(function(c){
    var type=c.dataset.type;
    c.addEventListener('pointerenter',function(e){
      if(e.pointerType==='touch')return;
      var r=c.getBoundingClientRect();
      activateType(type,r.left+r.width/2,r.top,coarse(),true);
    });
    c.addEventListener('pointerleave',function(e){if(e.pointerType!=='touch')deactivate()});
    c.addEventListener('focus',function(){
      if(!c.matches(':focus-visible'))return;
      var r=c.getBoundingClientRect();
      activateType(type,r.left+r.width/2,r.top,coarse(),true);
    });
    c.addEventListener('blur',deactivate);
    c.addEventListener('click',function(){
      if(lastPointer==='touch'||coarse())activateType(type,0,0,true);
    });
  });

  document.addEventListener('click',function(e){
    if(!e.target.closest('.bloom,.chip,.tip'))deactivate();
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')deactivate()});
  window.addEventListener('scroll',function(){if(cur&&!tip.classList.contains('dock'))deactivate()},{passive:true});
})();
