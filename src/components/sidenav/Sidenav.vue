<template>
  <div class="sidenav" ref="sidenav" :class="classes" :style="style" v-bind="$attrs" v-on="$listeners">
    <div class="sidenav-header" v-if="!!$slots.header">
      <slot name="header"></slot>
    </div>

    <slot></slot>

    <div class="sidenav-footer" v-if="!!$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { addInstance, getInstancesByType } from '../../utils/config';

export default {
  name: 'AxSidenav',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    bodyScrolling: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    rightAligned: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    layoutEl: '',
    isActive: false,
    isAnimated: false,
    overlayElement: '',
    overlayActive: false,
    resizeRef: '',
    listenerRef: '',
    extraClasses: [
      'sidenav-right',
      'sidenav-both',
      'sidenav-large',
      'sidenav-large-left',
      'sidenav-large-right',
    ],
  }),
  computed: {
    classes() {
      return {
        active: this.isActive,
        fixed: this.fixed,
        'right-aligned': this.rightAligned,
        large: this.large,
      };
    },
    style() {
      return {
        transitionDuration: this.animationDuration + 'ms',
      };
    },
  },
  watch: {
    value(state) {
      if (state === null) return;

      if (this.fixed && window.innerWidth >= 960) {
        this.$emit('input', true);
        return;
      }

      this.isActive = state;
      state ? this.open() : this.close();
    },
    isActive(state) {
      this.$emit('input', state);
    },
    overlay(state) {
      this.updateOverlay(state);
    },
  },
  methods: {
    setup() {
      addInstance({ type: 'Sidenav', instance: this });
      this.layoutEl = this.$refs.sidenav.closest('.layout');

      if (this.overlay) this.createOverlay();

      this.setupListeners();

      this.detectMultipleSidenav();

      if (this.value || (this.fixed && window.innerWidth >= 960)) this.isActive = true;

      this.$emit('setup');
    },
    setupListeners() {
      this.listenerRef = this.onClickTrigger.bind(this);
      this.resizeRef = this.handleResize.bind(this);
      window.addEventListener('resize', this.resizeRef);
    },
    removeListeners() {
      window.removeEventListener('resize', this.resizeRef);
      this.destroyOverlay();
    },
    cleanLayout() {
      this.extraClasses.map((classes) => this.layoutEl.classList.remove(classes));
    },
    handleResize() {
      if (this.fixed && window.innerWidth >= 960) this.isActive = true;
      else this.isActive = false;
    },
    detectMultipleSidenav() {
      const sidenavFixed = getInstancesByType('Sidenav').find((ins) => ins.fixed);
      const firstSidenavInit = sidenavFixed && sidenavFixed === this;

      if (this.layoutEl && firstSidenavInit) this.cleanLayout();

      if (this.layoutEl && this.fixed && firstSidenavInit) this.handleMultipleSidenav();
    },
    handleMultipleSidenav() {
      const sidenavs = Array.from(document.querySelectorAll('.sidenav')).filter((sidenav) =>
        sidenav.classList.contains('fixed')
      );

      const { sidenavsRight, sidenavsLeft } = sidenavs.reduce(
        (acc, sidenav) => {
          sidenav.classList.contains('right-aligned')
            ? acc.sidenavsRight.push(sidenav)
            : acc.sidenavsLeft.push(sidenav);
          return acc;
        },
        { sidenavsRight: [], sidenavsLeft: [] }
      );

      const isBoth = sidenavsLeft.length > 0 && sidenavsRight.length > 0;
      const sidenavRightLarge = sidenavsRight.some((sidenav) => sidenav.classList.contains('large'));
      const sidenavLeftLarge = sidenavsLeft.some((sidenav) => sidenav.classList.contains('large'));
      const isLarge = sidenavRightLarge || sidenavLeftLarge;

      isLarge ? this.layoutEl.classList.add('sidenav-large') : '';

      if (sidenavsRight.length > 0 && !isBoth) {
        this.layoutEl.classList.add('sidenav-right');
      } else if (isBoth) {
        this.layoutEl.classList.add('sidenav-both');
      }

      if (isLarge && isBoth) {
        if (sidenavRightLarge && !sidenavLeftLarge) {
          this.layoutEl.classList.add('sidenav-large-right');
        } else if (!sidenavRightLarge && sidenavLeftLarge) {
          this.layoutEl.classList.add('sidenav-large-left');
        }
      }
    },
    createOverlay() {
      this.overlayElement = document.createElement('div');
      this.overlayElement.classList.add('sidenav-overlay');
    },
    updateOverlay(state) {
      if (this.fixed) return;

      if (this.overlayElement) {
        if (!state) this.destroyOverlay();

        if (this.isActive && state && !this.overlayActive) this.setOverlay(true);
        return;
      }

      if (state) {
        this.createOverlay();

        if (this.isActive) this.setOverlay(true);
      }
    },
    destroyOverlay() {
      if (this.overlay && this.overlayActive) {
        this.overlayElement.removeEventListener('click', this.listenerRef);
        this.overlayElement.remove();
        this.overlayElement = '';
        this.overlayActive = false;
      }
    },
    toggleBodyScroll(state) {
      if (!this.bodyScrolling) {
        state ? (document.body.style.overflow = '') : (document.body.style.overflow = 'hidden');
      }
    },
    onClickTrigger(e) {
      e.preventDefault();
      if (this.fixed && window.innerWidth >= 960) return;

      this.isActive = !this.isActive;
    },
    open() {
      if (this.isAnimated) return;

      this.isActive = true;
      this.$emit('open');
      this.isAnimated = true;
      this.setOverlay(true);

      this.toggleBodyScroll(false);

      setTimeout(() => {
        this.isAnimated = false;
        this.$emit('opened');
      }, this.animationDuration);
    },
    close() {
      if (this.isAnimated) return;

      this.isActive = false;
      this.isAnimated = true;
      this.$emit('close');
      this.setOverlay(false);

      setTimeout(() => {
        this.toggleBodyScroll(true);

        this.isAnimated = false;
        this.$emit('closed');
      }, this.animationDuration);
    },
    setOverlay(state) {
      if (!this.overlay) return;

      this.overlayElement.style.transitionDuration = this.animationDuration + 'ms';

      if (state) {
        this.overlayActive = true;
        this.overlayElement.addEventListener('click', this.listenerRef);
        document.body.appendChild(this.overlayElement);
        setTimeout(() => {
          this.overlayElement.classList.add('active');
        }, 50);
      } else {
        this.overlayElement.classList.remove('active');
        setTimeout(() => {
          this.overlayElement.removeEventListener('click', this.listenerRef);
          this.overlayElement.remove();
          this.overlayActive = false;
        }, this.animationDuration);
      }
    },
  },
  mounted() {
    this.setup();
  },
  beforeUpdate() {
    this.updateOverlay(this.overlay);
  },
  beforeDestroy() {
    this.removeListeners();
  },
};
</script>
