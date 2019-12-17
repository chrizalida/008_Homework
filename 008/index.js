 window.onload = function() {
  function showCover() {
      var coverDiv = document.createElement('div');
      coverDiv.id = 'cover-div';
      document.body.style.overflowY = 'hidden';
      document.body.append(coverDiv);
    }

    function hideCover() {
      document.getElementById('cover-div').remove();
      document.body.style.overflowY = '';
    }

    function showPrompt(text, callback) {
      showCover();
      var form = document.getElementById('prompt-form');
      var container = document.getElementById('prompt-form-container');
      document.getElementById('prompt-message').innerHTML = text;
      form.text.value = '';

      function complete(value) {
        if (value==null){
          alert("Enter to system failed!");
        }
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
      }

      form.onsubmit = function() {
        var value = form.text.value;
        if (value == '') {
          alert("Enter name of user!");
          return false; 
         }
        if (getCookis() === "Admin" || getCookis() === "admin" ) {
            resLogin();
        }
        else {
          if (value == "Admin" || value == "admin") {
                setCookis(value);
                resLogin();
            }  else {

              complete(null);
            } 
        }
        complete(value);
        return false;
      };

      function resLogin () {
          var userName = getCookis();
          alert ("UserLogin: "+userName);
          var space  = document.getElementById("wb_Text1");
          var out  = document.getElementById("wb_Text2");
          var span  = document.getElementById("sout");
              space.style.display = "none";
              span.innerHTML+=" "+userName;
              out.style.display = "block";
          var logOutbtn = document.getElementById("logout");
              logOutbtn.addEventListener("click", function () {
                delCookis();
                location.reload();
              });
      };

      form.cancel.onclick = function() {
        complete(null);
      };

      document.onkeydown = function(e) {
        if (e.key == 'Escape') {
          complete(null);
        }
      };

      var lastElem = form.elements[form.elements.length - 1];
      var firstElem = form.elements[0];

      lastElem.onkeydown = function(e) {
        if (e.key == 'Tab' && !e.shiftKey) {
          firstElem.focus();
          return false;
        }
      };

      firstElem.onkeydown = function(e) {
        if (e.key == 'Tab' && e.shiftKey) {
          lastElem.focus();
          return false;
        }
      };

      container.style.display = 'block';
      form.elements.text.focus();
    }

    document.getElementById('show-button').onclick = function() {
        showPrompt("Enter name of user", function(value) {
        alert("You entered: " + value);        
      });
    };

      function getCookis (){
        var result;
        if (document.cookie !=""){
           var arr1,arr2;
           var obj={};
           var cookis = document.cookie;
           alert("cookie: "+document.cookie);
           if (cookis.indexOf(";")!=-1){
               arr1 =cookis.split("; ");
               for (var i = 0; i < arr1.length; i++) {
                 arr2 = arr1[i].split("=");
                 obj[arr2[0]] = arr2[1];
                 alert("cookie2: "+obj[arr2[0]]);
               }
           }
           else {
            arr2 = cookis.split("=");
            obj[arr2[0]] = arr2[1];
           }
           result = decodeURIComponent(obj.login);
        }
       else {
        result = "";
       } 
       return result;
      }
      
      function setCookis (value){
        var d = new Date();
        d.setTime(d.getTime()+3600000);
        var endDate = d.toGMTString();
        var cookis = "login="+encodeURIComponent(value);
            cookis+=";expires="+endDate+";";
        document.cookie = cookis;
        alert(cookis);
        value = "";
      }    

    function delCookis(){
      if (document.cookie !=""){
       var d = new Date();
       d.setTime(1000);
       var endDate = d.toGMTString();
       document.cookie = "login=; expires="+endDate+";";
      }
    }

}