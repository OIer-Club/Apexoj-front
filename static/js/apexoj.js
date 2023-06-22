var _GET = (function () {
  var url = window.document.location.href.toString();
  var u = url.split("?");
  if (typeof (u[1]) == "string") {
    u = u[1].split("&");
    var get = {};
    for (var i in u) {
      var j = u[i].split("=");
      get[j[0]] = j[1];
    }
    return get;
  } else {
    return {};
  }
})();

function user_login() {
  $.post('/api/user/login', {
    "username": document.getElementById("login_username").value,
    "password": document.getElementById("login_password").value
  }, function (data) {
    if (data.code == 'OK') {
      swalx("登入成功", 2);
      location.reload();
    } else if (data.code == 'NO') {
      swalx("账号/密码错误", 2);
      document.getElementById("login_password").value = "";
    } else {
      swalx("未知错误,请重试", 10);
    }
  });
}

function user_login_enter() {
  document.getElementById("userlogin").style.display = "";
}

function user_login_exit() {
  document.getElementById("userlogin").style.display = "none";
}

function user_register() {
  if (document.getElementById("register_password").value != document.getElementById("register_repassword").value) {
    swalx("两次密码不正确", 2);
    document.getElementById("register_password").value = "";
    document.getElementById("register_repassword").value = "";
  } else {
    swalx("验证中，请耐心等待。", 5);
    $.post('/api/user/register', {
      "username": document.getElementById("register_username").value,
      "password": document.getElementById("register_password").value,
      "email": document.getElementById("register_email").value
    }, function (data) {
      if (data.code == 'OK') {
        window.location.href = "/user/email_key?token=" + data.token;
      } else if (data.code == "NO") {
        swalx(data.message, 2);
      } else {
        swalx("未知错误,请重试" + data.message, 10);
      }
    });
  }
}

function user_logout() {
  $.post('/api/user/logout', {}, () => { location.reload() });
}

function swalx(data, time) {
  swal({
    title: data,
    text: String(time) + '秒后自动关闭。',
    timer: 1000 * time
  }).then();
}
