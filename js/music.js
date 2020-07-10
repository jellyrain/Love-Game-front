let music = document.getElementById("lovegame_music");
var music_img = document.getElementById("music_img");
var music_name = document.getElementById("music_name");
var music_user = document.getElementById("music_user");
let music_play = document.getElementById("play");
let music_volume = document.getElementById("volume");
var music_totalProgress = document.getElementById("music_totalProgress");
var music_currentProgress = document.getElementById("music_currentProgress");
var music_volume_totalProgress = document.getElementById("volume_totalProgress");
var music_volume_currentProgress = document.getElementById("volume_currentProgress");
var music_json;
var music_i = 0;
var music_max;

window.onload = function(){
    $.ajax({
        type: "get",
        url: "../js/music.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            music_json = response;
            music_max = music_json.length;
            loading(music_i);
            music.play();
        }
    });
}

setInterval(function(){
    var ratio = music.currentTime / music.duration;
    music_currentProgress.style.width = ratio * 100 + '%';
},100);

music.addEventListener("ended", forward);

function loading(i){
    music_img.style.backgroundImage = "url(" + "https://jellyrain.gitee.io/love-game-back/" + music_json[i].music_img + ")";
    music_img.style.backgroundSize = "100%";
    music_name.innerText = music_json[i].music;
    music_user.innerText = music_json[i].name;
    music.src = "https://jellyrain.gitee.io/love-game-back/" + music_json[i].music_src;
}

function play(){
    if( !music.paused){
        music_play.classList.toggle("fa-play", true);
        music_play.classList.toggle("fa-pause", false);
        music.pause();
    }else{
        music_play.classList.toggle("fa-play", false);
        music_play.classList.toggle("fa-pause", true);
        music.play();
    }
}

function backward(){
    music_i--;
    if(music_i < 0){
        music_i = music_max-1
        loading(music_i);
        music.play();
    }else{
        loading(music_i);
        music.play();
    }
}

function forward(){
    music_i++;
    if(music_i >= music_max)
    {
        music_i = 0;
        loading(music_i);
        music.play();
    }else{
        loading(music_i);
        music.play();
    }
}

function volume(){
    if( !music.muted){
        music_volume.classList.toggle("fa-volume-up", false);
        music_volume.classList.toggle("fa-volume-off", true);
        music.muted = true;
    }else{
        music_volume.classList.toggle("fa-volume-up", true);
        music_volume.classList.toggle("fa-volume-off", false);
        music.muted = false;
    }
}

function totalProgress(){
    var ratio = total_progress();
    music_currentProgress.style.width = ratio * 100 + '%';
    music.currentTime = music.duration * ratio;
}

function total_progress(){
    var ev = event || window.event;
    var totalwidth = music_totalProgress.offsetWidth;
    var totalx = music_totalProgress.offsetLeft;
    var mousex = ev.screenX;
    var ratio = (mousex - totalx) / totalwidth;
    return ratio;
}

function volumetotalProgress(){
    var ratio = volume_totalProgress();
    music_volume_currentProgress.style.width = ratio * 100 + '%';
    music.volume = ratio;
}

function volume_totalProgress(){
    var ev = event || window.event;
    var totalwidth = music_volume_totalProgress.offsetWidth;
    var totalx = music_volume_totalProgress.offsetLeft;
    var mousex = ev.screenX;
    var ratio = (mousex - totalx) / totalwidth;
    return ratio;
}