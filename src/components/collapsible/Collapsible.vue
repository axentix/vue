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
  }),
  computed: {
    classes() {
      return {
        active: this.isActive,
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
      console.log(state);
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
    detectChild() {
      setTimeout(() => {
        if (Array.from(this.$el.children).some((child) => child.classList.contains('active'))) {
          this.childIsActive = true;
        }
        if (this.childIsActive && !this.isActive) {
          this.toggle();
        }
      }, 500);
    },
    applyOverflow() {
      this.$el.style.overflow = 'hidden';

      setTimeout(() => {
        if (!this.isAutoClosing) this.$el.style.overflow = '';
      }, this.animationDuration);
    },
    open() {
      if (this.isAnimated) return;

      getInstancesByType('Collapsible').map((collapsible) => {
        if (collapsible !== this) collapsible.autoClosing(collapsible.instance);
      });

      this.$emit('open');

      this.isActive = true;
      this.isAnimated = true;
      this.$el.style.display = 'block';
      this.applyOverflow();
      this.$el.style.maxHeight = this.$el.scrollHeight + 'px';

      setTimeout(() => {
        this.isAnimated = false;
      }, this.animationDuration);
    },
    close(autoClose = false) {
      if (this.isAnimated && !autoClose) return;
      this.$emit('close');

      this.isAnimated = true;
      this.$el.style.maxHeight = '';

      this.applyOverflow();

      setTimeout(() => {
        this.$el.style.display = '';
        this.isAnimated = false;
        this.isActive = false;
      }, this.animationDuration);
    },
    autoClosing(instance) {
      if (this.autoClose && instance !== this && !this.isActive) {
        this.close(true);
        this.isAutoClosing = true;
        setTimeout(() => {
          this.isAutoClosing = false;
        }, this.animationDuration);
      }
    },
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    this.removeListeners();
  },
  updated() {
    // console.log('updated');
  },
};
</script>

<style scoped lang="scss">
.no-overflow {
  overflow: hidden !important;
}
</style>
