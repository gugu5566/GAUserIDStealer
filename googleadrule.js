function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getgaCid() {
    var name = "_ga=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length+6, c.length);
            }
    }
    return "";
}

    
function removeScript(){
    var ss=document.getElementsByTagName('script');
    for(i=0;i<ss.length;i++){
        if(ss[i].innerHTML.indexOf("function getgaCid()")!==-1){
            ss[i].parentNode.removeChild(ss[i]);
            //console.log("Remove script done ver4");
            break;
        }
    }
}

function doFlow(){
    var guhappyId=makeid(5);
    var ifrm_c = document.createElement('iframe');
    ifrm_c.setAttribute('id', guhappyId);
    ifrm_c.setAttribute('class', 'guhappy_steal');
    ifrm_c.style.display = "none";
    document.body.appendChild(ifrm_c);

    var cframe=document.getElementById(guhappyId);
    cframe.addEventListener("load",function(){
        setTimeout(function(){
            //console.log("removing guhappy - "+guhappyId);
            cframe.parentNode.removeChild(cframe);
            //console.log("remove guhappy - "+guhappyId+" done");
        }, 5000);
        
    });

    uid=-1
    for(i=0;i<dataLayer.length;i++){
        try{
            if('ga_c_id' in dataLayer[i]){
                uid=dataLayer[i]['ga_c_id'];
                break;
            }
        }catch(e){
            console.log("pass");
        }
    }

    elementUrl=""
    elementClasses=""
    elementId=""
    elementText=""
    tmp_text=""
    dataanalyticsID="null"
    site_domain=window.location.hostname

    for(i=dataLayer.length-1;i>=0;i--){
        if(dataLayer[i]['event']=="gtm.click"){
            //handling eURL
            try{
                if('gtm.elementUrl' in dataLayer[i]){
                    elementUrl=dataLayer[i]['gtm.elementUrl'];
                    if(elementUrl==""){
                        elementUrl="/"
                    }
                    else{
                        fullsite_domain='https://'+site_domain
                        var re=RegExp(fullsite_domain,'g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('https://download.ocms365.com','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?pid.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?_ga.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?version.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('javascript\\:','g');
                        elementUrl=elementUrl.replace(re,"/");
                    }
                }
            }catch(e){
                console.log(e);
            }
            
            //handling eClass
            try{
                if('gtm.elementClasses' in dataLayer[i]){
                    elementClasses=dataLayer[i]['gtm.elementClasses'];
                }
            }catch(e){
                console.log(e);
            }

            //handling eID
            try{
                if('gtm.elementId' in dataLayer[i]){
                    elementId=dataLayer[i]['gtm.elementId'];
                }
            }catch(e){
                console.log(e);
            }

            //handling of eTxt
            try{
                if('gtm.element' in dataLayer[i]){
                    if('innerText' in dataLayer[i]['gtm.element']){
                        tmp_text=dataLayer[i]['gtm.element']["innerText"].replaceAll('\n',' ');
                        var re=RegExp('\\d\\d\\d\\d/\\d\\d\\/\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-DATE-");    
                        var re=RegExp('\\d\\d:\\d\\d:\\d\\d','g'); 
                        tmp_text=tmp_text.replace(re,"-TIME-");    
                        var re=RegExp('\\w+\\*\\*\\*','g');
                        tmp_text=tmp_text.replace(re,"-ACCOUNT-"); 
                        var re=RegExp('??????????????????\\d??????????????????????????????','g');
                        tmp_text=tmp_text.replace(re,"??????????????????-RAND-??????????????????????????????");
                        var re=RegExp('\\d+?????????????????????','g');
                        tmp_text=tmp_text.replace(re,"-RAND-?????????????????????");
                        var re=RegExp('(???|??? )\\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"???-RAND-");
                        var re=RegExp('??????????????????????????????????????? \\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"???????????????????????????????????????-RAND-");
                        if(elementClasses.includes("winner")||elementClasses.includes("rank")){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="price"){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="game-info" || elementClasses=="tabstab"){
                            var re=RegExp('\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        elementText=tmp_text;
                    }else if('textContent' in dataLayer[i]['gtm.element']){
                        tmp_text=dataLayer[i]['gtm.element']["textContent"].replaceAll('\n',' ');
                        var re=RegExp('\\d\\d\\d\\d/\\d\\d\\/\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-DATE-");    
                        var re=RegExp('\\d\\d:\\d\\d:\\d\\d','g'); 
                        tmp_text=tmp_text.replace(re,"-TIME-");    
                        var re=RegExp('\\w+\\*\\*\\*','g');
                        tmp_text=tmp_text.replace(re,"-ACCOUNT-"); 
                        var re=RegExp('??????????????????\\d??????????????????????????????','g');
                        tmp_text=tmp_text.replace(re,"??????????????????-RAND-??????????????????????????????");
                        var re=RegExp('\\d+?????????????????????','g');
                        tmp_text=tmp_text.replace(re,"-RAND-?????????????????????");
                        var re=RegExp('(???|??? )\\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"???-RAND-");
                        var re=RegExp('??????????????????????????????????????? \\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"???????????????????????????????????????-RAND-");
                        if(elementClasses.includes("winner")||elementClasses.includes("rank")){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="price"){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="game-info" || elementClasses=="tabstab"){
                            var re=RegExp('\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        elementText=tmp_text;
                    }
                }
            }catch(e){
                console.log(e);
            }

            //handling dID
            try{
                if('gtm.element' in dataLayer[i]){
                    if('dataset' in dataLayer[i]['gtm.element']){
                        if('analytics' in dataLayer[i]['gtm.element'].dataset){
                            dataanalyticsID=dataLayer[i]['gtm.element'].dataset["analytics"];
                        }
                    }
                }
            }catch(e){
                console.log(e);
            }
            break;

            
        }
    }

    if(elementUrl=="/" && elementClasses=="" && elementId=="" && dataanalyticsID=="null"){
        if(elementText!="" && !isNaN(Number(elementText))){
            var re=RegExp('\\d+\\.\\d+','g');
            elementText=elementText.replace(re,"-RAND-");
        }   
    }
    if(elementClasses.includes("vdatetime")){
        elementText="";
    }
    if(elementClasses.includes("phoneNumber")){
        elementText="";
    }


    cframe.src ="https://gugu5566.github.io/GAUserIDStealer/steal.html?randId=="+guhappyId+"&&domain="+site_domain;
}
