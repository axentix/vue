<template>
  <div
    class="collapsible"
    ref="collapsible"
    :class="classes"
    :style="style"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
import { addInstance, getInstancesByType } from '../../utils/config';

export default {
  name: 'AxCollapsible',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isInSidenav: {
      //delete this & handle it with the Axel's parent detection method
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    isActive: false,
    isAnimated: false,
    resizeRef: '',
    listenerRef: '',
    isAutoClosing: false,
  }),
  computed: {
    classes() {
      return {
        active: this.isActive,
        'overflow-hidden': this.isAnimated,
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
      this.isActive = state;
      state ? this.open() : this.close();
    },
    isActive(state) {
      this.$emit('input', state);
    },
  },
  methods: {
    setup() {
      addInstance({ type: 'Collapsible', instance: this });

      // this.detectChild();
      this.setupListeners();

      this.$emit('setup');
    },
    setupListeners() {
      this.resizeRef = this.handleResize.bind(this);
      window.addEventListener('resize', this.resizeRef);
    },
    removeListeners() {
      window.removeEventListener('resize', this.resizeRef);
    },
    handleResize() {
      if (this.isActive && !this.isInSidenav) this.$el.style.maxHeight = this.$el.scrollHeight + 'px';
    },
    // detectChild() {
    //   setTimeout(() => {
    //     if (Array.from(this.$el.children).some((child) => child.classList.contains('active'))) {
    //       this.childIsActive = true;
    //     }
    //     if (this.childIsActive && !this.isActive) {
    //       this.toggle();
    //     }
    //   }, 500);
    // },
    open() {
      if (this.isAnimated && !this.autoClosing) return;

      getInstancesByType('Collapsible').map((collapsible) => {
        collapsible.autoClosing(this);
      });

      this.$emit('open');

      this.isActive = true;
      this.isAnimated = true;
      this.$el.style.display = 'block';
      this.$el.style.maxHeight = this.$el.scrollHeight + 'px';

      setTimeout(() => {
        this.isAnimated = false;
      }, this.animationDuration);
    },
    close() {
      if (this.isAnimated && !this.autoClosing) return;
      this.$emit('close');

      this.isAnimated = true;
      this.$el.style.maxHeight = '';

      setTimeout(() => {
        this.$el.style.display = '';
        this.isAnimated = false;
        this.isAutoClosing = false;
      }, this.animationDuration);
    },
    autoClosing(instance) {
      if (this.autoClose && instance !== this) {
        this.isActive = false;
        this.isAutoClosing = true;
      }
    },
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    this.removeListeners();
  },
};
</script>

<style scoped lang="scss">
.no-overflow {
  overflow: hidden !important;
}
</style>
