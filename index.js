// 文件路径: /js/index.js
// 功能: 自动播放背景音乐，并兼容浏览器自动播放策略

// 文件路径: /js/index.js
// 功能: 自动播放背景音乐，失败时显示提示按钮，点击后播放

$(document).ready(function() {
    // 创建音频对象
    var audio = new Audio('mp3/一定要爱你.mp3');
    audio.loop = true;      // 循环播放
    audio.volume = 0.6;     // 音量 0.6

    // 创建提示元素（初始隐藏）
    var $tip = $('<div id="music-tip">🎵 点击可播放音乐 🎵</div>');
    $tip.css({
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: '#ffd966',
        padding: '10px 18px',
        borderRadius: '40px',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        zIndex: '10000',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        display: 'none'
    });
    $('body').append($tip);

    // 播放音乐并隐藏提示
    function playMusicAndHideTip() {
        audio.play().then(function() {
            console.log('音乐开始播放');
            $tip.fadeOut(300);
            // 移除全局点击监听（如果有）
            $(document).off('click', playMusicAndHideTip);
        }).catch(function(e) {
            console.log('播放失败:', e);
        });
    }

    // 点击提示时播放
    $tip.on('click', playMusicAndHideTip);

    // 尝试自动播放
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function() {
            // 自动播放成功，无需显示提示
            console.log('背景音乐自动播放成功');
        }).catch(function(error) {
            // 自动播放被阻止，显示提示按钮
            console.log('自动播放被阻止，显示提示');
            $tip.fadeIn(400);

            // 同时监听整个页面的首次点击（以防用户点击其他地方而非提示）
            $(document).one('click', function() {
                if (audio.paused) {
                    playMusicAndHideTip();
                }
            });
        });
    }
});

$(document).snowfall({
    flakeCount: 100
})