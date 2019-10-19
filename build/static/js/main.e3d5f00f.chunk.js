(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),l=t(2),c=function(e){var n=e.handleFilterInput,t=e.filterValue;return r.a.createElement("div",null,"Filter:",r.a.createElement("input",{value:t,onChange:n}))},i=function(e){var n=e.handleNameInput,t=e.handleNumberInput,a=e.header,o=e.numberForm,u=e.nameForm,l=e.addPerson;return r.a.createElement("div",null,r.a.createElement("h2",null,a),r.a.createElement("form",{onSubmit:l},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:u,onChange:n}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:o,onChange:t})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.person,t=e.onClick;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{type:"submit",onClick:t,value:n.name},"delete"))},d=function(e){var n=e.filter,t=e.persons,a=e.onClick;return""===n?r.a.createElement("ul",null,t.map((function(e){return r.a.createElement(m,{key:e.name,person:e,onClick:a})}))):r.a.createElement("ul",null,t.filter((function(e){return e.name.toLocaleLowerCase().includes(n.toLocaleLowerCase())})).map((function(e){return r.a.createElement("div",{key:e.id},r.a.createElement(m,{key:e.name,person:e,onClick:a}))})))},f={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,margin:20},s={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,margin:20},b=function(e){var n=e.message;return null===n?null:n.includes("Error:")?r.a.createElement("div",{style:s},n):r.a.createElement("div",{style:f},n)},p=t(3),h=t.n(p),E="/api/persons",v=function(){return h.a.get(E).then((function(e){return e.data}))},g=function(e){return h.a.post(E,e).then((function(e){return e.data}))},k=function(e){return h.a.delete("".concat(E,"/").concat(e)).then((function(e){return e.status}))},w=function(e,n){return h.a.put("".concat(E,"/").concat(e),n).then((function(e){return e.data}))},y=function(){var e=Object(a.useState)(""),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)([]),m=Object(l.a)(u,2),f=m[0],s=m[1],p=Object(a.useState)(""),h=Object(l.a)(p,2),E=h[0],y=h[1],C=Object(a.useState)(0),j=Object(l.a)(C,2),O=j[0],S=j[1],L=Object(a.useState)(null),F=Object(l.a)(L,2),I=F[0],N=F[1],D=function(e,n){n&&(e.number=O,w(e.id,e).then((function(n){console.log(n),s(f.map((function(t){return t.id!==e.id?t:n}))),z("updated",e.name)})).catch((function(n){N("Error: ".concat(e.name," has already been removed from the server")),setTimeout((function(){N(null)}),5e3)}))),y(""),S(0)},P=function(){var e=f.filter((function(e){return e.name.toLocaleLowerCase()===E.toLocaleLowerCase()}));if(e.length>0)return e[0]},z=function(e,n){N("".concat(n," ").concat(e)),setTimeout((function(){N(null)}),5e3),y(""),S(0)};return Object(a.useEffect)((function(){v().then((function(e){return s(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(b,{message:I}),r.a.createElement(c,{handleFilterInput:function(e){o(e.target.value)},filterValue:t}),r.a.createElement(i,{handleNumberInput:function(e){S(e.target.value)},handleNameInput:function(e){y(e.target.value)},numberForm:0===O?"":O,nameForm:E,addPerson:function(e){e.preventDefault();var n=P(),t={name:E,number:O};void 0===n?(g(t).then((function(e){console.log(e),s(f.concat(e)),z("added",t.name)})).catch((function(e){N("Error: ".concat(e.message))})),S(0)):O!==n.number?D(n,window.confirm("".concat(E," is already added to phonebook, replace old number?"))):window.alert("".concat(E," is already added to phonebook")),y("")},header:"add a person"}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{filter:t,persons:f,onClick:function(e){e.preventDefault();var n=f.find((function(n){return n.name===e.target.value}));window.confirm("Delete ".concat(n.name,"?"))&&(k(n.id).then((function(e){if(204===e){var t=f.filter((function(e){return e.name!==n.name}));s(t)}})),z("deleted",n.name))}}))};u.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.e3d5f00f.chunk.js.map