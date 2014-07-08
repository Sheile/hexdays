(function() {

$(function() {
  for(var i = 1900; i <= 2020; i++) {
    $("#year").append($("<option>").text(i));
  }
  for(var i = 1; i <= 12; i++) {
    $("#month").append($("<option>").text(i));
  }
  for(var i = 1; i <= 28; i++) {
    $("#day").append($("<option>").text(i));
  }

  $("#year").val(1980);

  $("#year, #month").on("change", refreshDay);
  $("#year, #month, #day").on("change", calc);

  refreshDay();
  calc();
});

function refreshDay()
{
  $("#day option:nth-child(n + 29)").remove();
  var year = $("#year").val();
  var month = $("#month").val() - 1;
  var maxDay = moment([year, month, 1]).endOf('month').date()
  for(var i = 29; i <= maxDay; i++) {
    $("#day").append($("<option>").text(i));
  }
}

function calc()
{
  var year = $("#year").val();
  var month = $("#month").val() - 1;
  var day = $("#day").val();

  var today = moment().startOf('day');
  var diff = today.diff(moment([year, month, day]), "days");

  if(diff < 0) {
    $("#result").text("まだ生まれていません");
    return;
  }
  var hex = ("0000" + diff.toString(16)).substr(-4);
  $("#result").text("あなたが生まれてからの日数を十六進数で表すと「0x" + hex + "」です。／ #人生を十六進数で http://game.sheile.net/hexdays/");
}

})();
