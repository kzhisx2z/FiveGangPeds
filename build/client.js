var d=(t,e,n)=>{let o=Math.cos(n),a=Math.sin(n),r=e[0]-t[0],i=e[1]-t[1],s=r*o-i*a,u=r*a+i*o;return[s+t[0],u+t[1]]},h=class{constructor(e,n){if(this.points=e,this.minZ=n?.minZ,this.maxZ=n?.maxZ,this.maxZ<this.minZ){let a=this.minZ;this.minZ=this.maxZ,this.maxZ=a}let o=e[this.points.length-1];(e[0][0]!==o[0]||e[0][1]!==o[1])&&this.points.push(e[0])}isPointInside(e){if(this.minZ&&e[2]<this.minZ||this.maxZ&&e[2]>this.maxZ)return!1;let n=this.points.length,o=0,a=e[0],r=e[1];for(let i=0;i<n-1;i++){let s={a:{x:this.points[i][0],y:this.points[i][1]},b:{x:this.points[i+1][0],y:this.points[i+1][1]}},u=s.a.x,m=s.a.y,c=s.b.x,p=s.b.y;m>r!=p>r&&a<(c-u)*(r-m)/(p-m)+u&&o++}return o%2!==0}},x=class extends h{constructor(e,n,o,a){let r=[],s=(a?.heading??0)*Math.PI/180;r.push(d(e,[e[0]-o/2,e[1]-n/2],s)),r.push(d(e,[e[0]-o/2,e[1]+n/2],s)),r.push(d(e,[e[0]+o/2,e[1]+n/2],s)),r.push(d(e,[e[0]+o/2,e[1]-n/2],s)),r.push(d(e,[e[0]-o/2,e[1]-n/2],s)),super(r,a)}};var b=t=>new Promise(e=>setTimeout(e,t));var y=t=>new Promise(async e=>{for(RequestModel(t);!HasModelLoaded(t);)await b(100);e()});var l=[];addEventListener("onResourceStop",t=>{if(GetCurrentResourceName()===t)for(let e of l)DeletePed(e)},!0);var f=async(t,e)=>{let n=PlayerPedId(),o=e?.coords;if(!o){let[p,V,Z]=GetEntityCoords(n,!0);o=[p,V,Z,GetEntityHeading(n)]}await y(t);let[a,r,i,s]=o,[u,m]=GetGroundZFor_3dCoord(a,r,i,!0),c=CreatePed(0,t,a,r,m,s,!0,!0);for(SetModelAsNoLongerNeeded(t),l.push(c);!DoesEntityExist(c);)await b(50);return e?.static&&(SetBlockingOfNonTemporaryEvents(c,!0),SetEntityInvincible(c,!0),FreezeEntityPosition(c,!0)),e?.scenario&&TaskStartScenarioInPlace(c,e.scenario,0,!0),c},P=async(t,e,n=5e3)=>{e||(e=PlayerPedId());let[o,a,r,i]=t;TaskGoStraightToCoord(e,o,a,r,1,n,i,.1);let s=new x(t,1,1),u=500;for(let m=0;m<n-u&&!(s.isPointInside(GetEntityCoords(e,!0))&&Math.abs(GetEntityHeading(e)-i)<5);m+=u)await b(u);await b(u)};exports("spawnPed",f);exports("walkToCoords",P);
