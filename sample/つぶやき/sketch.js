t=0
draw=_=>{createARCanvas(W=240,W)
background('#58a')
stroke('#つぶやきProcessing')
strokeWeight(2)
for(j=u=13;j--;)for(i=9;i--;)f(x=0,1),f(q),x=p,f(q/2)
t+=.01}
f=(y,s=-1)=>{for(r=3;r--;)line(a=(x+3*i+j%2*(p=1.5)-1)*u,b=(y+p*(q=1.73)*j)*u,a+s*cos(v=r*PI/p*sin(t))*u,b+sin(v)*u)}
