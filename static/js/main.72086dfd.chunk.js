(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{116:function(e,t,a){e.exports=a(154)},121:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(34),r=a.n(o);a(121),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(82);var i,c,s=a(212),d=a(214),u=a(215),m=a(209),f=a(18),p=a(16),b=a(98),E=a.n(b).a.create({withCredentials:!0,headers:{"API-KEY":"64b816f4-c9e0-431f-be44-c151fe573295"},baseURL:"https://social-network.samuraijs.com/api/1.1/"});!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(i||(i={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(c||(c={}));var O=function(){return E.get("todo-lists")},T=function(e){return E.post("todo-lists",{title:e})},h=function(e){return E.delete("todo-lists/".concat(e))},g=function(e,t){return E.put("todo-lists/".concat(e),{title:t})},y=function(e){return E.get("todo-lists/".concat(e,"/tasks"))},I=function(e,t){return E.post("todo-lists/".concat(e,"/tasks"),{title:t})},k=function(e,t){return E.delete("todo-lists/".concat(e,"/tasks/").concat(t))},j=function(e,t,a){return E.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},v=function(e){return E.post("auth/login",e)},C=function(){return E.delete("auth/login")},S=function(){return E.get("auth/me")},A={status:"",error:null,entityStatus:"idle"},L=function(e){return{type:"APP/SET-STATUS",status:e}},w=function(e){return{type:"APP/SET-ERROR",error:e}},D=function(e,t){e(w(t)),e(L("failed"))},N={isLoggedIn:!1,isAuthorized:!1},H=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},_=function(){var e=Object(f.c)((function(e){return e.auth.isLoggedIn})),t=Object(f.b)();return l.a.createElement(s.a,{position:"static"},l.a.createElement(d.a,null,l.a.createElement(u.a,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1,display:{xs:"none",sm:"block"}}},"TODO LIST"),e&&l.a.createElement(m.a,{onClick:function(){t((function(e){C().then((function(t){e(H(!1))}))}))},color:"inherit"},"Logout")))},x=a(219),M=a(14),P=a(211),R=a(67),F=a(15),G=a(4),K={},U=function(e,t){return function(a){a(L("loading")),I(e,t).then((function(n){0===n.data.resultCode?(a(function(e,t,a){return{type:"ADD-TASK",payload:{todolistId:e,title:t,task:a}}}(e,t,n.data.data.item)),a(L("succeeded"))):function(e,t){e(w(t)),e(L("failed"))}(a,n.data.messages[0])})).catch((function(e){D(a,e.message)}))}},B=[],W=function(e,t,a){return{type:"SELECT-ALL-ITEMS",payload:{isChecked:e,todolistId:t,tasksObj:a}}},V=function(e,t){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",entityStatus:e,todolistId:t}},Z=a(100),q=Object(R.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-TODOLISTS":var a=Object(p.a)({},e);return t.payload.todolists.forEach((function(e){a[e.id]=[]})),a;case"REMOVE-TASK":return Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.todolistId,e[t.payload.todolistId].filter((function(e){return e.id!==t.payload.taskId}))));case"ADD-TASK":return Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.task.todoListId,[t.payload.task].concat(Object(F.a)(e[t.payload.task.todoListId]))));case"CHANGE-TASK-STATUS":return Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(p.a)(Object(p.a)({},e),{},{status:t.payload.status}):e}))));case"CHANGE-TASK-TITLE":return console.log(e),console.log(t.payload.todolistId),Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(p.a)(Object(p.a)({},e),{},{title:t.payload.title}):e}))));case"ADD-TODOLIST":return Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.todolistId,[]));case"REMOVE-TODOLIST":var n=Object(p.a)({},e);return delete n[t.payload.todolistId],n;case"SELECT-ALL-ITEMS":return Object(p.a)({},t.payload.tasksObj);case"SET-TASKS":return Object(p.a)(Object(p.a)({},e),{},Object(G.a)({},t.payload.todolistId,t.payload.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.payload.todolistId}));case"ADD-TODOLIST":var a={id:t.payload.todolistId,title:t.payload.title,filter:"all",selectHandler:!1,addedDate:"",order:0};return[a].concat(Object(F.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.payload.todolistId?Object(p.a)(Object(p.a)({},e),{},{title:t.payload.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.payload.todolistId?Object(p.a)(Object(p.a)({},e),{},{filter:t.payload.filter}):e}));case"SELECT-ALL-ITEMS":var n=e.find((function(e){return e.id===t.payload.todolistId}));return n&&(n.selectHandler=t.payload.isChecked,n.selectHandler?t.payload.tasksObj[t.payload.todolistId].map((function(e){return e.status=!0})):!1===n.selectHandler&&t.payload.tasksObj[t.payload.todolistId].map((function(e){return e.status=!1}))),Object(F.a)(e);case"SET-TODOLISTS":return t.payload.todolists.map((function(e){return Object(p.a)(Object(p.a)({},e),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.todolistId?Object(p.a)(Object(p.a)({},e),{},{entityStatus:"loading"}):e}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(p.a)(Object(p.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(p.a)(Object(p.a)({},e),{},{error:t.error});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(p.a)(Object(p.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),z=Object(R.c)(q,Object(R.a)(Z.a)),X=f.c;window.store=z;var Y=a(206),J=a(204),$=n.forwardRef((function(e,t){return n.createElement(J.a,Object.assign({elevation:6,ref:t,variant:"filled"},e))})),Q=function(){var e=X((function(e){return e.app.error})),t=Object(f.b)(),a=function(e,a){"clickaway"!==a&&t(w(null))};return n.createElement(Y.a,{open:null!==e,autoHideDuration:16e3,onClose:a},n.createElement($,{onClose:a,severity:"error",sx:{width:"100%"}},e))},ee=a(210),te=a(205),ae=a(207),ne=a(218),le=a(217),oe=a(199),re=a(202),ie=a(104),ce=function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Field can't be empty",e.password?e.password.length>20?t.password="Must be 20 characters or less":e.password.length<8&&(t.password="Must be 8 characters or more"):t.password="Field can't be empty",t},se=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.auth.isLoggedIn})),a=Object(ie.a)({initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(t){var n;e((n=t,function(e){e(L("loading")),v(n).then((function(t){e(H(0===t.data.resultCode)),e(L("succeeded"))})).catch((function(t){D(e,t.message)}))})),a.resetForm()},validate:ce});return t?l.a.createElement(M.a,{to:"/"}):l.a.createElement(ee.a,{container:!0,justifyContent:"center"},l.a.createElement(ee.a,{item:!0,justifyContent:"center"},l.a.createElement(ae.a,null,l.a.createElement(oe.a,null,l.a.createElement("p",null,"To log in get registered",l.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"}," here")),l.a.createElement("p",null,"or use common test account credentials:"),l.a.createElement("p",null,"Email: free@samuraijs.com"),l.a.createElement("p",null,"Password: free")),l.a.createElement("form",{onSubmit:a.handleSubmit},l.a.createElement(le.a,null,l.a.createElement(re.a,{id:"email",name:"email",type:"email",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.email,label:"Email",margin:"normal"}),a.touched.email&&a.errors.email&&l.a.createElement("div",{style:{color:"red"}},a.errors.email),l.a.createElement(re.a,{id:"password",name:"password",type:"password",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.password,label:"Password",margin:"normal"}),a.touched.password&&a.errors.password&&l.a.createElement("div",{style:{color:"red"}},a.errors.password),l.a.createElement(ne.a,{id:"rememberMe",name:"rememberMe",checked:a.values.rememberMe,onChange:a.handleChange,value:a.values.rememberMe,label:"Remember me",control:l.a.createElement(te.a,null)}),l.a.createElement(m.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},de=a(11),ue=l.a.memo((function(e){console.log("AddItemForm");var t=Object(n.useState)(""),a=Object(de.a)(t,2),o=a[0],r=a[1],i=Object(n.useState)(null),c=Object(de.a)(i,2),s=c[0],d=c[1],u=function(e){var t=e.currentTarget.value.charAt(0).toUpperCase()+e.currentTarget.value.slice(1);r(t)},f=function(t){null!==s&&d(null),"Enter"===t.key&&""!==o.trim()&&o.trim()&&(e.addItem(o.trim()),r(""))};return l.a.createElement("div",null,s?l.a.createElement(re.a,{disabled:e.disabled,error:!0,id:"outlined-error",label:"Text is required",size:"small",value:o,onChange:u,onKeyPress:f,className:"error"}):l.a.createElement(re.a,{disabled:e.disabled,id:"outlined-basic",label:e.label,variant:"outlined",size:"small",value:o,onChange:u,onKeyPress:f,className:""}),l.a.createElement(m.a,{disabled:e.disabled,style:{maxWidth:"40px",maxHeight:"40px",minWidth:"40px",minHeight:"40px",backgroundColor:"black"},variant:"contained",onClick:function(){""!==o.trim()?e.addItem(o.trim()):d("Title is required"),r("")}},"+"))})),me=l.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(de.a)(t,2),o=a[0],r=a[1],i=Object(n.useState)(""),c=Object(de.a)(i,2),s=c[0],d=c[1];return o?l.a.createElement("input",{onChange:function(e){d(e.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&(r(!1),e.onChange(s))},onBlur:function(){r(!1),e.onChange(s)},value:s,autoFocus:!0}):l.a.createElement("span",{onDoubleClick:function(){r(!0),d(e.title)}},e.title)})),fe=a(36),pe=a.n(fe),be=a(216),Ee=a(201),Oe=function(e){return l.a.createElement("li",{key:e.el.id,className:e.el.status===i.Completed?"is-done":""},l.a.createElement("input",{onChange:function(t){var a=t.currentTarget.checked?i.Completed:i.New;e.changeTaskStatus(e.el.id,a,e.id),console.log("onChangeHandler")},type:"checkbox",checked:e.el.status===i.Completed}),l.a.createElement(me,{title:e.el.title,onChange:function(t){e.onCnangeListItemHandler(t,e.el.id,e.id)}}),l.a.createElement(be.a,{disabled:"loading"===e.status,onClick:function(){return e.removeTask(e.el.id,e.id)},"aria-label":"delete"},l.a.createElement(Ee.a,null)))},Te=l.a.memo((function(e){var t=Object(n.useCallback)((function(){return e.filterTasks("all",e.id)}),[e.filterTasks,e.id]),a=Object(n.useCallback)((function(){return e.filterTasks("active",e.id)}),[e.filterTasks,e.id]),o=Object(n.useCallback)((function(){return e.filterTasks("completed",e.id)}),[e.filterTasks,e.id]),r=Object(f.b)();Object(n.useEffect)((function(){var t;r((t=e.id,function(e){e(L("loading")),y(t).then((function(a){e(function(e,t){return{type:"SET-TASKS",payload:{tasks:e,todolistId:t}}}(a.data.items,t)),e(L("succeeded"))})).catch((function(t){D(e,t.message)}))}))}),[]);var c=Object(n.useCallback)((function(t){e.addTask(t,e.id)}),[e.addTask,e.id]),s=Object(n.useCallback)((function(t){e.changeTodolistTitle(t,e.id)}),[e.changeTodolistTitle,e.id]),d=e.tasks;return"active"===e.filter&&(d=d.filter((function(e){return e.status===i.New}))),"completed"===e.filter&&(d=d.filter((function(e){return e.status===i.Completed}))),l.a.createElement("div",{className:pe.a.todolistClass},l.a.createElement("h3",{className:pe.a.todolistHeader},l.a.createElement(me,{title:e.title,onChange:s}),l.a.createElement(be.a,{disabled:"loading"===e.entityStatus,className:pe.a.todolistXBtn,onClick:function(){e.removeTodoList(e.id)},"aria-label":"delete"},l.a.createElement(Ee.a,null))),l.a.createElement(ue,{disabled:"loading"===e.entityStatus,label:"New task",addItem:c}),l.a.createElement("li",{className:pe.a.allItems},l.a.createElement("input",{onChange:function(t){e.selectAllItems(e.id,t.currentTarget.checked,e.tasksArray),console.log("onChangeAllItemsHandler")},className:pe.a.allItemsInput,type:"checkbox",checked:e.allSelectItem})),l.a.createElement("ul",{className:pe.a.todolistItemsWrapper},d.map((function(t){return l.a.createElement(Oe,{el:t,status:e.status,changeTaskStatus:e.changeTaskStatus,onCnangeListItemHandler:e.onChangeListItemHandler,removeTask:e.removeTask,id:e.id,key:t.id})}))),l.a.createElement("div",null,l.a.createElement("button",{className:"all"===e.filter?"active-filter":pe.a.btnFilterClasses,onClick:t},"All"),l.a.createElement("button",{className:"active"===e.filter?"active-filter":pe.a.btnFilterClasses,onClick:a},"Active"),l.a.createElement("button",{className:"completed"===e.filter?"active-filter":pe.a.btnFilterClasses,onClick:o},"Completed")))})),he=a(213);function ge(){var e=Object(f.c)((function(e){return e.auth.isLoggedIn})),t=Object(f.c)((function(e){return e.todolists})),a=Object(f.c)((function(e){return e.tasks})),o=Object(f.b)(),r=X((function(e){return e.app.status})),i=Object(M.g)();Object(n.useEffect)((function(){e?o((function(e){e(L("loading")),O().then((function(t){e({type:"SET-TODOLISTS",payload:{todolists:t.data}}),e(L("succeeded"))})).catch((function(){e(L("succeeded"))}))})):i("login")}),[e]);var c=Object(n.useCallback)((function(e){var t;o((t=e,function(e){e(L("loading")),e(V("loading",t)),h(t).then((function(a){0===a.data.resultCode?(e(function(e){return{type:"REMOVE-TODOLIST",payload:{todolistId:e}}}(t)),e(L("succeeded"))):e(w("some error")),e(L("failed")),e(V("failed",t))})).catch((function(t){D(e,t.message)}))}))}),[o]),s=Object(n.useCallback)((function(e){console.log("add todo"),o(function(e){return function(t){t(L("loading")),T(e).then((function(a){t(function(e,t){return{type:"ADD-TODOLIST",payload:{title:e,todolistId:t}}}(e,a.data.data.item.id)),console.log(a.data.data.item.id),t(L("succeeded"))})).catch((function(e){D(t,e.message)}))}}(e))}),[o]),d=Object(n.useCallback)((function(e,t){o(function(e,t){return{type:"CHANGE-TODOLIST-FILTER",payload:{filter:e,todolistId:t}}}(e,t))}),[o]),u=Object(n.useCallback)((function(e,t){o(function(e,t){return function(a){a(L("loading")),g(e,t).then((function(n){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",payload:{title:t,todolistId:e}}}(e,t)),a(L("succeeded"))})).catch((function(e){D(a,e.message)}))}}(t,e))}),[o]),m=Object(n.useCallback)((function(e,t){o(U(t,e))}),[o]),p=Object(n.useCallback)((function(e,t){var a,n;o((a=t,n=e,function(e){e(L("loading")),k(a,n).then((function(t){e(function(e,t){return{type:"REMOVE-TASK",payload:{taskId:t,todolistId:e}}}(a,n)),e(L("succeeded"))}))}))}),[o]),b=Object(n.useCallback)((function(e,t,a){o(function(e,t,a){return function(n,l){var o=l().tasks[e].find((function(e){return e.id===t})),r={description:o.description,status:a,title:o.title,priority:o.priority,startDate:o.startDate,deadline:o.deadline};n(L("loading")),j(e,t,r).then((function(l){n(function(e,t,a){return{type:"CHANGE-TASK-STATUS",payload:{taskId:t,status:a,todolistId:e}}}(e,t,a)),n(L("succeeded"))})).catch((function(e){D(n,e.message)}))}}(a,e,t))}),[o]),E=Object(n.useCallback)((function(e,t,a){o(function(e,t,a){return function(n,l){var o=l().tasks[a].find((function(t){return t.id===e})),r={description:o.description,status:o.status,title:t,priority:o.priority,startDate:o.startDate,deadline:o.deadline};j(a,e,r).then((function(l){n(function(e,t,a){return{type:"CHANGE-TASK-TITLE",payload:{taskId:e,title:t,todolistId:a}}}(e,t,a))})).catch((function(e){D(n,e.message)}))}}(t,e,a))}),[o]),y=Object(n.useCallback)((function(e,t,a){o(W(t,e,a))}),[o,W,a]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(ee.a,{container:!0,style:{padding:"20px"}},l.a.createElement(ue,{disabled:!1,label:"New todolist",addItem:s})),l.a.createElement(ee.a,{container:!0,spacing:3},t.map((function(e){var t=a[e.id];return l.a.createElement(ee.a,{key:e.id,item:!0},l.a.createElement(he.a,{key:e.id,style:{padding:"10px"}},l.a.createElement(Te,{entityStatus:e.entityStatus,status:r,tasksArray:a,key:e.id,id:e.id,filter:e.filter,title:e.title,tasks:t,changeTaskStatus:b,removeTask:p,filterTasks:d,addTask:m,removeTodoList:c,onChangeListItemHandler:E,changeTodolistTitle:u,selectAllItems:y,allSelectItem:e.selectHandler})))}))))}var ye=function(){var e=X((function(e){return e.app.status})),t=Object(f.b)();return Object(n.useEffect)((function(){t((function(e){S().then((function(t){0===t.data.resultCode&&e(H(!0))}))}))}),[]),l.a.createElement("div",{className:"App"},l.a.createElement(_,null),"loading"===e&&l.a.createElement(P.a,{style:{width:"100%"},color:"secondary"}),l.a.createElement(x.a,{fixed:!0},l.a.createElement(M.d,null,l.a.createElement(M.b,{path:"/",element:l.a.createElement(ge,null)}),l.a.createElement(M.b,{path:"/login",element:l.a.createElement(se,null)}),l.a.createElement(M.b,{path:"/404",element:l.a.createElement("h1",null,"404: PAGE NOT FOUND")}),l.a.createElement(M.b,{path:"*",element:l.a.createElement(M.a,{to:"/404"})}))),l.a.createElement(Q,null))},Ie=a(52);r.a.render(l.a.createElement(f.a,{store:z},l.a.createElement(Ie.a,null,l.a.createElement(ye,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},36:function(e,t,a){e.exports={todolistClass:"Todolist_todolistClass__13CLe",todolistItemsWrapper:"Todolist_todolistItemsWrapper__2V9vo",allItems:"Todolist_allItems__2FCq4",allItemsInput:"Todolist_allItemsInput__fyrQM",todolistHeader:"Todolist_todolistHeader__PNSfR",todolistXBtn:"Todolist_todolistXBtn__23DZF",btnFilterClasses:"Todolist_btnFilterClasses__3RND-"}},82:function(e,t,a){}},[[116,1,2]]]);
//# sourceMappingURL=main.72086dfd.chunk.js.map