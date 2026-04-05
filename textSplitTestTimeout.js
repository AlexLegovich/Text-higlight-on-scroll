
window.addEventListener('load', () => {
  setTimeout(() => {
    document.fonts.ready.then(() => {
      
      splits.forEach((settings) => {
        const splitElements = document.querySelectorAll(settings.selector)
        if (!splitElements.length) return

        splitElements.forEach((element) => {
          new SplitText(element, {
            type: 'words,chars,lines',
            mask: settings.mask ? 'lines' : false,
            autoSplit: true,
            wordsClass: settings.wordsClass,

            onSplit(self) {
              // resolve trigger string to actual element
              const triggerEl =
                typeof settings.trigger === 'string'
                  ? document.querySelector(settings.trigger)
                  : settings.trigger
              const gsapConfig = {
                opacity: settings.opacity,
                filter: settings.filter,
                rotate: settings.rotate,
                stagger: settings.stagger,
                duration: settings.duration,
                delay: settings.delay,
                ease: settings.ease,

                scrollTrigger: {
                  trigger: triggerEl,
                  start: settings.start,
                  end: settings.end,
                  scrub: settings.onScroll,
                  markers: settings.markers,
                  invalidateOnRefresh: true, // ensures ScrollTrigger recalculates
                },
              }

              if (settings.color) gsapConfig.color = settings.color
              if (settings.yPercent) gsapConfig.yPercent = settings.yPercent

              return gsap.from(self[settings.target], gsapConfig)
            },
          })
        })
      })

      ScrollTrigger.refresh()
    })
  }, 300)
})
