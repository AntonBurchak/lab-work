// jshint esversion:6
import './assets/css/style.scss';

import './assets/css/normalize.css';

import './assets/fonts/stylesheet.css';

// import './assets/css/swiper.min.css';



window.addEventListener('load', () => {

    preload();
    mobClick();
    setTimeout(() => {
    // first entry animation
    animText(document.querySelectorAll('.page')[0]);

    

    structAnim();
    zoomGallery();
    navigation();
    


    let lis = document.querySelectorAll('.text-format .main__section-list li');
    lis.forEach(element => {
        element.addEventListener('click', () => {
            let codetext = element.querySelector('codetext');
            let codeview = element.querySelector('codeview');


            lis.forEach(el => {
                el.classList.remove('active');
                el.querySelector('.result').classList.remove('active');
                element.querySelector('codeview').classList.remove('active');
                if(el.querySelector('div[data-value="Click me!"]')) {
                    el.querySelector('div[data-value="Click me!"]').setAttribute('data-value', '');
                }
            });
            

            if(codetext.textContent.trim() == codetext.getAttribute('data-text')) {
                goAnim(codetext);
            }
            element.classList.add('active');
            element.querySelector('.result').classList.add('active');
            
            setTimeout(() => codeview.classList.add('active'), codetext.getAttribute('data-text').length * 40);
        });
    });
    }, 0); // 5000
    
});


const animText = (page) => {
    let h = page.querySelector('h1'),
        text = page.querySelector('.main__content'),
        ct = document.querySelectorAll('codetext');

    ct.forEach(el => el.textContent = el.innerHTML);

    setTimeout(() => {
        h.classList.add('active');
    }, 1000);

    setTimeout(() => {
        text.classList.add('active');
    }, 2000);
};

const goAnim = (div) => {
    let tmp = div.getAttribute('data-text').trim();
    div.innerHTML = '';
    div.textContent = '';
    let a = 0;
    let b = setInterval(() => {
        div.textContent += tmp[a];
        if(a == tmp.length - 1) {
            clearInterval(b);
        }
        a++;
    }, 40);
    
};

const structAnim = () => {
    let list = document.querySelectorAll('.html-structure .main__section-list li'),
        list_i = document.querySelectorAll('.html-structure .sect-wrap .i');
    
    list.forEach((element, index) => {
        
        element.addEventListener('click', (e) => {
            e.preventDefault();
            list[0].querySelector('a').setAttribute('data-value', '');
            list.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(120%)';
                    item.style.opacity = '0';
                }, index * 40);
            });
            list_i[index].classList.add('active');
            
            document.querySelector('.sect-wrap').classList.add('sw-anim');
        });
       
    });

    let list_cls = document.querySelectorAll('.html-structure .sect-wrap .i .close');

    list_cls.forEach((el) => {
        el.addEventListener('click', () => {
            el.parentElement.classList.remove('active');
            
            list.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, index * 40);
            });
            document.querySelector('.sect-wrap').classList.remove('sw-anim');

        });
    });
};

const navigation = () => {
    // clear opacity
    let mainContent = document.querySelectorAll('.main__content');
    mainContent.forEach(el => el.classList.remove('dont-ready'));

    let nav = document.querySelectorAll('nav ul li a'),
    page = document.querySelectorAll('.page'),
    liss = document.querySelectorAll('.text-format .main__section-list li codetext');

    mainContent.forEach(el => el.classList.add('dont-ready'));

    nav.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();

            page.forEach(el => {
                el.querySelector('h1').classList.remove('active');
                el.querySelector('.main__content').classList.remove('active');
                el.classList.remove('active');
            });
            
            nav.forEach(item => item.classList.remove('active'));

            el.classList.add('active');
            page[index].classList.add('active');

            document.body.classList = '';
        
            animText(page[index]);
            
            switch (index) {
                case 2: {
                    setTimeout(()=> {
                        document.body.classList.add('btrfl');
                    }, 2500);
                }
                case 3: {
                    tableAnimate();
                    let chack = [...document.querySelectorAll('table th'), ...document.querySelectorAll('table td')];
                    chack.forEach(el => el.style.opacity = "0");
                }
                default: {
                    document.body.classList.remove('btrfl');
                }
            }
        
            liss.forEach(element => {
                element.textContent = element.getAttribute('data-text');
            }); 
            
            document.body.classList.add(`style${index + 1}`)
        });
    });
}
let tmp = 0;

const next = () => {
    let images = document.querySelectorAll('.gallery div img'),
        current = document.querySelector('.imgParent img');      
    tmp++;
    if (tmp == images.length) tmp = 0;
    current.src = images[tmp].src;  
};

const prev = () => {
    let images = document.querySelectorAll('.gallery div img'),
        current = document.querySelector('.imgParent img');
    tmp--;
    if (tmp == -1) tmp = images.length - 1;
    current.src = images[tmp].src; 
};

const zoomGallery = () => {
    let imgs = document.querySelectorAll('.gallery div'),
        parent = document.querySelector('.imgParent');

    imgs.forEach((element, index) => {
        element.addEventListener('click', () => {
            parent.querySelector('img').src = element.querySelector('img').src;
            parent.classList.add('active');

            tmp = index;
        });
    });
    
    parent.addEventListener('click', (e) => {
        let target = e.target || e.srtElement;

        if((target.tagName !== "IMG" && target.className !== "next" && target.className !== "prev") || (target.tagName == "DIV" && target.className == 'close')) {
            parent.classList.remove('active');
        }
    });

    let next_btn = document.querySelector('.next');
    next_btn.addEventListener('click', next);

    let prev_btn = document.querySelector('.prev');
    prev_btn.addEventListener('click', prev);
};


const tableAnimate = () => {
    let table = document.querySelector('.tables table'),
        tableFirst = document.querySelectorAll('.tables table tr td:first-child');
    let chack = [...document.querySelectorAll('table th'), ...document.querySelectorAll('table td')];
    
    let time = 60;
    let overtime = chack.length * time;
    table.style.opacity = '1';
    setTimeout(() => {
        chack.forEach((el, index) => {
            setTimeout(() => {
                el.style.background = '#fff';
                el.style.opacity = '1';
                el.style.animation = '.5s tds';
            }, index * time);
            
        });
    
        setTimeout(() => {
            chack.forEach((el, index) => {
                setTimeout(() => {
                    el.style.background = `#000`;
                    el.style.animation = 'none';
                }, index * time);
            });
        }, overtime / 4);
    }, 2500);
};


const preload = () => {
    let pB = document.querySelector('.preload'),  
    pBI = document.querySelector('.preload__inner'),
    pBIH = document.querySelector('.preload__h'),
    pBIHA = document.querySelector('.preload__autor');   
    
    let words = [
        ['«Packaging is just as important as the product. <br> Sometimes even more important»', 'Jack Trout'],
        ['«Simplicity is a prerequisite for beauty»', 'Lev Tolstoy'],
        ['«Good design solves the problem, not creates it»', 'Max Kalinov'],
        ['«People ignore design that ignores people»', 'Chimero'],
    ];

    let randWord = words[(Math.ceil(getRand(0, words.length - 1)))];
    
    pBIH.innerHTML = randWord[0];
    pBIHA.innerHTML = randWord[1];

    pBI.style.opacity = '1';
    setTimeout(() => {
        pB.style.top = '-100%';
    }, 4500);
};

function getRand(min, max) {
  return Math.random() * (max - min) + min;
}

const mobClick = () => {
    let m = document.querySelector('.header__mob');
    let mc = document.querySelector('.header-mob-main .close');
    let v = document.querySelector('.header-mob-main');
    m.addEventListener('click', () => {
        v.classList.toggle('active');
    });
    mc.addEventListener('click', () => {
        v.classList.toggle('active');
    });
    let lis = document.querySelectorAll('.header-mob-main ul li');
    lis.forEach(element => {
        element.addEventListener('click', () => v.classList.toggle('active'))
    });

    navigation();
}

if (document.documentElement.clientWidth <= 980) {
    let d = document.querySelector('.wrapper .header__list');
    d.remove();
}