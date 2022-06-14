import anime from 'animejs';

const GridLoading = () => {
  /**
   * GridLoaderFx obj.
   */
  function GridLoaderFx(el: HTMLElement) {
    this.el = el;
    this.items = this?.el?.querySelectorAll('#GridItem > #gridItemImg');
  }

  /**
   * Effects.
   */
  GridLoaderFx.prototype.effects = {
    lineDrawing: true,
    animeLineDrawingOpts: {
      duration: 800,
      delay: function (t: never, i: number) {
        return i * 150;
      },
      easing: 'easeInOutSine',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [
        { value: [0, 1] },
        { value: [1, 0], duration: 200, easing: 'linear', delay: 500 },
      ],
    },
    animeOpts: {
      duration: 800,
      easing: 'cubicBezier(0.2, 1, 0.3, 1)',
      delay: function (t: never, i: number) {
        return i * 150 + 800;
      },
      opacity: {
        value: [0, 1],
        easing: 'linear',
      },
      scale: [0.5, 1],
    },
    animeVisible: {
      duration: 500,
      delay: function (t: never, i: number) {
        return i * 150 + 1550;
      },
      opacity: {
        value: [0, 1],
        easing: 'linear',
      },
    },
  };

  GridLoaderFx.prototype._render = function () {
    // Reset styles.
    this._resetStyles();

    // GridLoaderFx.prototype..call(this);
    const prototype = Object.getPrototypeOf(this);

    let effectSettings = prototype.effects,
      animeOpts = effectSettings.animeOpts,
      animeVisible = effectSettings.animeVisible;

    if (effectSettings.perspective !== undefined) {
      [].slice.call(this.items).forEach(function (item) {
        item.parentNode.style.WebkitPerspective =
          item.parentNode.style.perspective = effectSettings.perspective + 'px';
      });
    }

    if (effectSettings.origin !== undefined) {
      [].slice.call(this.items).forEach(function (item) {
        item.style.WebkitTransformOrigin = item.style.transformOrigin =
          effectSettings.origin;
      });
    }
    //Draw lines.
    if (effectSettings.lineDrawing !== undefined) {
      [].slice.call(this.items).forEach(function (item) {
        // Create SVG.
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
          itemW = item.offsetWidth,
          itemH = item.offsetHeight;

        svg.setAttribute('width', itemW + 'px');
        svg.setAttribute('height', itemH + 'px');
        svg.setAttribute('viewBox', '0 0 ' + itemW + ' ' + itemH);
        svg.setAttribute('class', 'grid__deco');
        path.setAttribute(
          'd',
          'M0,0 l' + itemW + ',0 0,' + itemH + ' -' + itemW + ',0 0,-' + itemH
        );
        path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
        svg.appendChild(path);
        item.parentNode.appendChild(svg);
      });

      let animeLineDrawingOpts = effectSettings.animeLineDrawingOpts;
      animeLineDrawingOpts.targets =
        this?.el?.querySelectorAll('.grid__deco > path');
      anime.remove(animeLineDrawingOpts.targets);
      anime(animeLineDrawingOpts);
    }

    if (effectSettings.revealer !== undefined) {
      [].slice.call(this.items).forEach(function (item) {
        let revealer = document.createElement('div');
        revealer.className = 'grid__reveal';
        if (effectSettings.revealerOrigin !== undefined) {
          revealer.style.transformOrigin = effectSettings.revealerOrigin;
        }
        if (effectSettings.revealerColor !== undefined) {
          revealer.style.backgroundColor = effectSettings.revealerColor;
        }
        item.parentNode.appendChild(revealer);
      });

      let animeRevealerOpts = effectSettings.animeRevealerOpts;
      animeRevealerOpts.targets = this?.el?.querySelectorAll('.grid__reveal');
      animeRevealerOpts.begin = function (obj) {
        for (let i = 0, len = obj.animatables.length; i < len; ++i) {
          obj.animatables[i].target.style.opacity = 1;
        }
      };
      anime.remove(animeRevealerOpts.targets);
      anime(animeRevealerOpts);
    }

    if (effectSettings.itemOverflowHidden) {
      [].slice.call(this.items).forEach(function (item) {
        item.parentNode.style.overflow = 'hidden';
      });
    }

    animeOpts.targets =
      effectSettings.sortTargetsFn &&
      typeof effectSettings.sortTargetsFn === 'function'
        ? [].slice.call(this.items).sort(effectSettings.sortTargetsFn)
        : this.items;

    anime.remove(animeOpts.targets);
    anime(animeOpts);

    animeVisible.targets = document.querySelectorAll(
      '#GridItem > [data-hidden]'
    );
    anime.remove(animeVisible.targets);
    anime(animeVisible);
  };

  GridLoaderFx.prototype._resetStyles = function () {
    this.el.style.WebkitPerspective = this.el.style.perspective = 'none';
    [].slice.call(this.items).forEach(function (item) {
      let gItem = item.parentNode;
      item.style.opacity = 0;
      item.style.WebkitTransformOrigin = item.style.transformOrigin = '50% 50%';
      item.style.transform = 'none';
      let svg = item.parentNode.querySelector('svg.grid__deco');
      if (svg) {
        gItem.removeChild(svg);
      }
      let revealer = item.parentNode.querySelector('.grid__reveal');
      if (revealer) {
        gItem.removeChild(revealer);
      }
      gItem.style.overflow = '';
    });
  };

  window.GridLoaderFx = GridLoaderFx;

  let body = document.getElementById('AnimeList'),
    grids = [].slice.call(document.querySelectorAll('#AnimeList')),
    currentGrid = 0,
    // The GridLoaderFx instances.
    loaders: HTMLElement[] = [],
    loadingTimeout: NodeJS.Timeout;

  async function init() {
    loaders.push(new GridLoaderFx(grids[0]));
    AnimationFired();
  }
  init();
  function applyFx() {
    // Simulate loading grid to show the effect.
    clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(
      function () {
        // Apply effect.
        // GridLoaderFx.prototype._render.call(loaders[currentGrid]);
        loaders[currentGrid]._render();
      },
      window.innerWidth > 900 ? 200 : 1800
    );
  }

  // Initialize the animation with scrollmagic
  async function AnimationFired() {
    const ScrollReveal = (await import('scrollreveal')).default;
    if (window.innerWidth > 900) {
      ScrollReveal({
        reset: false,
        container: document.querySelector('[data-scroll-container]'),
      }).reveal('#AnimeList', {
        beforeReveal: () => applyFx(),
      });
    } else {
      ScrollReveal({
        reset: false,
        container: document.querySelector('[data-scroll-container]'),
      }).reveal('#AnimeList', {
        delay: 1600,
        beforeReveal: () => applyFx(),
      });
    }
  }
};

export default GridLoading;
