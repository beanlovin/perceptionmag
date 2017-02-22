var myApp=new Framework7();

var $$=Dom7;

var signed_in = "";
var full_name = "";
var signed_in_user = "";
var global_api_user = "";

$$('form.ajax-submit').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
 
  var data = e.detail.data; // Ajax repsonse from action file
  // do something with response data

  console.log(data);
    
    // Preloader
    myApp.showPreloader('Loading...')
    setTimeout(function () {
        myApp.hidePreloader();
    }, 2000);
   
  if(data != "failed")
  {
      myApp.closeModal();
      signed_in = data;
      global_api_user = data;
      
      refresh_data(global_api_user);
      
      $$.get("https://portal.newtown-hs.powys.sch.uk/services/cwmwl/api/app_get_userinfo.php?auth=4f2a3314e46e090675d3d53e1c1d1238&user=" + global_api_user, function( data ) {
          full_name = data;
          $$('span[id=signed_in_fullname]').html(data);
      });
            
      $$('span[id=signed_in_user]').html(data);
      
      $$('span[id=signed_in_avatar]').html("<img src=\"https://portal.newtown-hs.powys.sch.uk/services/cwmwl/api/get_avatar.php?auth=4f2a3314e46e090675d3d53e1c1d1238&user="+data+"\" style=\"border-radius: 50%; max-height: 80px;\">");
      
      //$$('#signed_in_user_block').css("background-image", "url('https://portal.newtown-hs.powys.sch.uk/services/cwmwl/api/get_banner.php?auth=4f2a3314e46e090675d3d53e1c1d1238&user="+data+"')");

      $$('span[id=device_os]').html(myApp.device.os);
      $$('span[id=device_type]').html(myApp.device.osVersion);

  }
    else{
        myApp.alert('Incorrect login details.', 'Failed');
    }
    
});


var view1=myApp.addView('#view-1');

var view2=myApp.addView('#view-2',{dynamicNavbar:true});

var view3=myApp.addView('#view-3');

var view4=myApp.addView('#view-4');

var view5=myApp.addView('#view-5');

var view5=myApp.addView('#view-6');

var view5=myApp.addView('#view-7');

var view5=myApp.addView('#view-8');

var view5=myApp.addView('#view-9');

var view5=myApp.addView('#view-10');

var view5=myApp.addView('#view-11');

var view17=myApp.addView('#view-17');

var view18=myApp.addView('#view-18');

var view18=myApp.addView('#view-1213');

function launchF7Notification(api_title, api_message) {
    myApp.addNotification({
        title: api_title,
        message: api_message
    });
    console.log('notiffired');
}

function launch_full_notif(api_title, api_message, api_icon)
{
    myApp.addNotification({
        title: 'Perception',
        subtitle: api_title,
        message: api_message,
        media: api_icon
    });
}

function refresh()
{
    refresh_data(global_api_user);
    launchF7Notification('Info','The data was refreshed');
}

function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

function refresh_data(username)
{
    // Download more things.
      $$.get("xx" + username, function( data ) {
          $$( "#timetable-ajax" ).html( data );
      });

    console.log('datarefreshed'); 
}

function scan()
{
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          // Get the result
          // Check it is a QR_CODE
          if(result.format == "QR_CODE")
          {
              window.open(result.text, '_system', '');
              $$.get("xx" + signed_in + "&data=" + result.text, function( data ) {});
          }
          else
          {
              //alert("You can only scan QR codes.");
          }
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}