(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{212:function(e,a,t){"use strict";var n=t(19),i=t(63),c=t(1),r=t.n(c),o=t(43),s=t(89),u=t(11);a.a=function(){var e=Object(o.c)(),a=Object(o.d)((function(e){return e.snackbar.notifications})),t=Object(c.useCallback)((function(a){return e(u.G(a))}),[e]),l=Object(c.useState)([]),d=Object(i.a)(l,2),b=d[0],m=d[1],j=Object(s.b)(),h=j.enqueueSnackbar,g=j.closeSnackbar,f=Object(c.useCallback)((function(e){m(b.concat(e))}),[b]),p=Object(c.useCallback)((function(e){m(b.filter((function(a){return e!==a})))}),[b]);return r.a.useEffect((function(){a.forEach((function(e){var a=e.key,i=e.message,c=e.options,r=void 0===c?{}:c,o=e.dismissed;void 0!==o&&o?g(a):b.includes(a)||(h(i,Object(n.a)(Object(n.a)({key:a},r),{},{onClose:function(e,a,t){r.onClose&&r.onClose(e,a,t)},onExited:function(e,a){t(a),p(a)}})),f(a))}))}),[a,g,h,e,b,t,p,f]),null}},257:function(e,a,t){"use strict";t.r(a);var n=t(85),i=t(63),c=t(1),r=t.n(c),o=t(253),s=t(241),u=t(255),l=t(242),d=t(223),b=t(166),m=t(216),j=t(222),h=t(225),g=t(243),f=t(224),p=t.n(f),v=t(201),O=t(43),x=t(26),k=t(11),C=t(13),y=t.p+"static/media/sustainable-building-background.1dcfc4fe.jpg",S=t(212),R=t(6),w=Object(v.a)((function(e){return{rootLogin:{height:"91vh"},image:{backgroundImage:"url(".concat(y,")"),backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"left"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},circularProgress:{display:"flex",alignItems:"center"}}}));a.default=Object(O.b)((function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,authRedirectPath:e.auth.authRedirectPath}}),(function(e){return{onAuth:function(a,t){return e(k.a(a,t))},onAuthUserSignUp:function(a,t,n){return e(k.l(a,t,n))},onSetAuthRedirectPath:function(){return e(k.H("/posts"))}}}))((function(e){var a=w(),t=e.onAuth,f=e.onAuthUserSignUp,v=e.onAuthRememberMe,O=e.loading,k=e.isAuthenticated,y=Object(c.useState)({email:{elementConfig:{type:"email",placeholder:"Correo Electr\xf3nico"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},name:{elementConfig:{type:"name",placeholder:"Nombre de Usuario"},value:"",validation:{required:!0},valid:!1,touched:!1},password:{elementConfig:{type:"password",placeholder:"Contrase\xf1a"},value:"",validation:{required:!0,minLength:5},valid:!1,touched:!1}}),A=Object(i.a)(y,2),N=A[0],P=A[1],I=Object(c.useState)(!1),q=Object(i.a)(I,2),E=q[0],U=q[1],L=e.authRedirectPath,D=e.onSetAuthRedirectPath;Object(c.useEffect)((function(){"/posts"!==L&&D()}),[L,D]);var F=function(e,a){var t=Object(C.g)(N,Object(n.a)({},a,Object(C.g)(N[a],{value:e.target.value,valid:Object(C.a)(e.target.value,N[a].validation),touched:!0})));P(t)},J=[];for(var W in N)J.push({id:W,config:N[W]});var z=J.map((function(e){return E||["email","password"].includes(e.id)&&!E?Object(R.jsx)(o.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:e.id,label:e.config.elementConfig.placeholder,type:e.config.elementConfig.type,id:e.id,error:!e.config.valid&&e.config.touched,onChange:function(a){return F(a,e.id)}},e.id):null})),G=Object(R.jsxs)(r.a.Fragment,{children:[z,E?null:Object(R.jsx)(s.a,{control:Object(R.jsx)(u.a,{value:"remember",color:"primary"}),label:"Remember me",onChange:function(e){v(e.target.checked)}})]});return O&&(G=Object(R.jsx)("div",{className:"circularProgress",children:Object(R.jsx)(l.a,{})})),k?Object(R.jsx)(x.a,{to:"/posts"}):Object(R.jsxs)(r.a.Fragment,{children:[Object(R.jsx)(S.a,{}),Object(R.jsxs)(d.a,{container:!0,component:"main",className:a.rootLogin,children:[Object(R.jsx)(d.a,{item:!0,xs:!1,sm:4,md:7,className:a.image}),Object(R.jsx)(d.a,{item:!0,xs:12,sm:8,md:5,component:b.a,elevation:6,square:!0,children:Object(R.jsxs)("div",{className:a.paper,children:[Object(R.jsx)(m.a,{className:a.avatar,children:Object(R.jsx)(p.a,{})}),Object(R.jsx)(j.a,{component:"h1",variant:"h5",children:E?"Registrar":"Iniciar Sesi\xf3n"}),Object(R.jsx)(j.a,{component:"h1",variant:"h6",children:E?"Crear una cuenta":"Iniciar sesi\xf3n en una cuenta"}),Object(R.jsxs)("form",{className:a.form,onSubmit:function(e){e.preventDefault(),E?f(N.email.value,N.name.value,N.password.value):t(N.email.value,N.password.value),function(){var e=Object(C.g)(N,{email:Object(C.g)(N.email,{value:"",valid:!1,touched:!1}),name:Object(C.g)(N.name,{value:"",valid:!1,touched:!1}),password:Object(C.g)(N.password,{value:"",valid:!1,touched:!1})});P(e)}()},children:[G,Object(R.jsx)(h.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,children:E?"Registrar":"Iniciar Sesi\xf3n"}),Object(R.jsx)(d.a,{container:!0,children:Object(R.jsx)(d.a,{item:!0,children:Object(R.jsx)(g.a,{href:"#",variant:"body2",onClick:function(){U(!E)},children:E?"\xbfYa tienes una cuenta? Iniciar Sesi\xf3n":"\xbfNo tienes una cuenta? Reg\xedstrate"})})})]})]})})]})]})}))}}]);
//# sourceMappingURL=10.15aa8223.chunk.js.map