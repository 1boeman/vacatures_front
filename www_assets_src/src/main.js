//import { refresh } from './refresh_partial'
import { setRefreshTimer,timerSwitcher } from './refresh_page'
import { q, parents, clck, ready, u } from './utils'

const feather = require('feather-icons')
feather.replace()

ready(function () {
  document.body.classList.remove('faded');
//  refresh()
  setRefreshTimer();
  timerSwitcher();
  q('.news').forEach(li => {
    clck(li, function (e) {
      e.preventDefault()
      if (this.classList.contains('open')) {
        this.classList.remove('open')
      } else {
        this.classList.add('open')
      }
    })
  })

  q('.article_body').forEach(a => {
    clck(a, function (e) {
      e.stopPropagation()
    })
  })

  q('.expand_button').forEach(b => {
    clck(b, function () {
      this.classList.add('hidden')
      const newsBlock = parents(this, '.news_block').pop()
      const expandable = newsBlock.querySelectorAll('.expandable')
      expandable.forEach(el => {
        el.classList.remove('expandable')
      })
    })
  })

  // hamburger
  clck(q('#hamburger')[0], function () {
    q('#menu-small')[0].classList.toggle('show')
  });

  // scroll to top button
  (function () {
    const scrollToTopBtns = q('#scrollToTopBtn')
    if (scrollToTopBtns.length) {
      const scrollToTopBtn = scrollToTopBtns[0]
      scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })

      document.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
          scrollToTopBtn.classList.add('showBtn')
        } else {
          scrollToTopBtn.classList.remove('showBtn')
        }
      })
    }
  })()
})
