import  u  from './utils'
import Cookies from 'js-cookie'
const timeSpan = 120; //seconds
let timerTimeout = 0;
let cssAdded = 0;
const timerSwitcher = () => {
    u.clck(u.q('.timebar_controls > li'), function(e){
        if (this.classList.contains('timer_stop')){
            let bar = u.q('.animated-bar');
            if (bar.length){
                bar[0].remove();
            }
            Cookies.set('timerStopped',1)
            clearTimeout(timerTimeout)
            document.body.classList.add('timerStopped')
        } else {
            Cookies.set('timerStopped',0)
            setRefreshTimer();
            document.body.classList.remove('timerStopped')
        }
    })
};

const setRefreshTimer = () => {
    let i=0, activeButton = 0; 

    const listItems = u.q('.menu > li a');
    listItems.forEach( item=> {
        i+=1
        if (location.href.indexOf(item.href) > -1){
            item.setAttribute('role','button');
            activeButton = i;
        }
    });

    if (Cookies.get('timerStopped') == '1') {
        document.body.classList.add('timerStopped')
        return;
    }

    let div = document.createElement("div");
    div.classList.add('animated-bar')
    document.body.prepend(div);

    if (!cssAdded){
        let cssAddition = `
            .animated-bar{
                height:6px;
                border-radius:3px;
                animation-name: example;
                animation-duration: ${timeSpan}s;
                animation-timing-function: linear;}`;
        u.CSS(cssAddition);
        cssAdded=1;
    }


    let nextButton = activeButton++;
    if (nextButton >= listItems.length){
        nextButton = 0;
    }

    timerTimeout = setTimeout(function(){ 
        document.body.classList.add('faded')
        setTimeout(function(){
            location.href = listItems[nextButton].href;
        },1000);
    },timeSpan * 1000);

    return timerTimeout
}

export { setRefreshTimer,timerSwitcher }
