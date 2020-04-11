(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{243:function(e,t,a){e.exports=a(381)},380:function(e,t,a){},381:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),o=a(192),s=a.n(o),i=a(17),c=a.n(i),l=a(132),d=a(23),m=a(21),u=a(207),g=a(206),f=a(97),h=function(){return n.a.createElement("nav",{className:"flex items-center justify-between flex-wrap bg-white py-6 px-6 md:px-16 shadow-sm"},n.a.createElement("div",{className:"flex items-center flex-shrink-0 text-gray-600 mr-6"},n.a.createElement("span",{className:"font-semibold text-xl tracking-tight"},"COVID-19 DASHBOARD")),n.a.createElement("div",{className:"w-full block flex-grow lg:flex lg:items-center lg:w-auto"},n.a.createElement("div",{className:"text-sm lg:flex-grow"}),n.a.createElement("div",null,n.a.createElement("a",{href:"https://datahub.io/core/covid-19",target:"_blank",className:"block mt-4 lg:ml-6 lg:inline-block lg:mt-0 text-sm text-gray-700 hover:text-black"},"RAW DATA"),n.a.createElement("a",{href:"https://www.datopian.com/about/",target:"_blank",className:"block mt-4 lg:ml-6 lg:inline-block lg:mt-0 text-sm text-gray-700 hover:text-black"},"TEAM"),n.a.createElement("a",{href:"https://www.datopian.com/contact/",target:"_blank",className:"block mt-4 lg:ml-6 lg:inline-block lg:mt-0 text-sm text-gray-700 hover:text-black"},"CONTACT"))))},p=function(e){var t=e.totalCases,a=e.totalDeaths,r=e.deathRate,o=e.newCases,s=e.newCaseRate;return n.a.createElement("div",{className:"grid sm:grid-cols-1 lg:grid-cols-5 gap-8 mt-4 mb-4 font-bold text-3xl"},n.a.createElement("div",{className:"border text-center py-16"},t,n.a.createElement("div",{className:"text-xs text-gray-600 font-light"},"Cases Worldwide")),n.a.createElement("div",{className:"border text-center py-16"},a,n.a.createElement("div",{className:"text-xs text-gray-600 font-light"},"Deaths Worldwide")),n.a.createElement("div",{className:"border text-center py-16"},r," %",n.a.createElement("div",{className:"text-xs text-gray-600 font-light"},"Death rate")),n.a.createElement("div",{className:"border text-center py-16"},o,n.a.createElement("div",{className:"text-xs text-gray-600 font-light"},"New cases yesterday")),n.a.createElement("div",{className:"border text-center py-16"},s," %",n.a.createElement("div",{className:"text-xs text-gray-600 font-light"},"New cases rate")))},x=a(193),b=function(e){var t=e.data;return n.a.createElement(x.a,{data:t,margin:{top:20,right:20,bottom:40,left:60},xScale:{type:"time",format:"%Y-%m-%d",precision:"day"},xFormat:"time:%Y-%m-%d",yScale:{type:"linear",min:"auto",max:"auto",stacked:!1,reverse:!1},curve:"cardinal",axisBottom:{format:"%b %d",tickValues:"every 11 days",legend:"Date",legendOffset:35,legendPosition:"middle"},axisLeft:{orient:"left",tickSize:0,tickPadding:0,tickRotation:0,legend:"Confirmed cases",legendOffset:-50,legendPosition:"middle"},enableGridX:!1,colors:{scheme:"nivo"},pointColor:{theme:"background"},pointBorderWidth:2,pointBorderColor:{from:"serieColor"},pointLabel:"y",pointLabelYOffset:-12,pointSize:"2",useMesh:!0,legends:[{anchor:"top-left",direction:"column",justify:!1,translateX:10,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:6,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]})},v=a(205),y=function(e){var t=e.data,a=e.features;return n.a.createElement(v.a,{data:t,value:"Confirmed",features:a,margin:{top:0,right:0,bottom:0,left:0},colors:"oranges",domain:[1e3,4e5],unknownColor:"#666666",label:"properties.name",valueFormat:".2s",projectionTranslation:[.5,.5],projectionRotation:[0,0,0],enableGraticule:!0,graticuleLineColor:"#dddddd",borderWidth:.5,borderColor:"#152538",legends:[{anchor:"bottom-left",direction:"column",justify:!0,translateX:20,translateY:-10,itemsSpacing:0,itemWidth:94,itemHeight:18,itemDirection:"left-to-right",itemTextColor:"#444444",itemOpacity:.85,symbolSize:18,effects:[{on:"hover",style:{itemTextColor:"#000000",itemOpacity:1}}]}]})},w=(a(380),function(e){Object(u.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(d.a)(this,a),(r=t.call(this,e)).state={worldwideData:[],countryData:[],referenceData:[],features:[],isLoading:!1},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a,r,n,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),t="https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv",a="https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv",r="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv",n="https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json",o={isLoading:!1},e.next=8,Promise.all([t,a,r,n].map(function(){var e=Object(l.a)(c.a.mark((function e(s){var i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(s);case 2:if(i=e.sent,s!==t){e.next=12;break}return e.t0=f.parse,e.next=7,i.text();case 7:e.t1=e.sent,e.t2={header:!0},o.worldwideData=(0,e.t0)(e.t1,e.t2).data,e.next=34;break;case 12:if(s!==a){e.next=21;break}return e.t3=f.parse,e.next=16,i.text();case 16:e.t4=e.sent,e.t5={header:!0},o.countryData=(0,e.t3)(e.t4,e.t5).data,e.next=34;break;case 21:if(s!==r){e.next=30;break}return e.t6=f.parse,e.next=25,i.text();case 25:e.t7=e.sent,e.t8={header:!0},o.referenceData=(0,e.t6)(e.t7,e.t8).data,e.next=34;break;case 30:if(s!==n){e.next=34;break}return e.next=33,i.json();case 33:o.features=e.sent.features;case 34:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 8:this.setState(o);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t,a,r,o,s=this.state,i=s.worldwideData,c=s.countryData,l=s.referenceData,d=s.features,m=s.isLoading,u=[],g=[];if(c.length>0){var f=c[c.length-2].Date;c.forEach((function(e){e.Date===f&&u.push(e)})),u.sort((function(e,t){return parseInt(t.Confirmed)-parseInt(e.Confirmed)})),u.slice(0,5).map((function(e){return e.Country})).forEach((function(e){g.push({id:e,data:[]})})),c.forEach((function(e){var t=g.find((function(t){return t.id===e.Country}));t&&t.data.push({x:e.Date,y:parseInt(e.Confirmed)})}))}if(u.length>0&&l.length>0&&u.forEach((function(e){e.id=l.find((function(t){return t.Country_Region===e.Country})).iso3})),i.length>0){var x=i[i.length-2],v=i[i.length-3];e=x.Confirmed,a=((t=x.Deaths)/e*100).toFixed(2),r=e-v.Confirmed,o=parseFloat(x["Increase rate"]).toFixed(2),e=e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),t=t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),r=r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}return m?n.a.createElement("p",null,"Loading ..."):n.a.createElement("div",{className:"h-screen"},n.a.createElement(h,null),n.a.createElement("div",{className:"px-6 md:px-16 h-full"},n.a.createElement(p,{totalCases:e,totalDeaths:t,deathRate:a,newCases:r,newCaseRate:o}),n.a.createElement("div",{className:"grid sm:grid-cols-1 lg:grid-cols-2 gap-8 mt-4 mb-4 h-screen-0.8 md:h-screen-0.5"},n.a.createElement(b,{data:g}),n.a.createElement(y,{data:u,features:d}))))}}]),a}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[243,1,2]]]);
//# sourceMappingURL=main.7acecf2c.chunk.js.map