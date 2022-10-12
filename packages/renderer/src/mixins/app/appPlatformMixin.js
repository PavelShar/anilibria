export default {
    data() {
        return {
            isFullscreen: false
        }
    },

    computed: {

        /**
         * Check if current windows is on fullscreen
         *
         * @return {boolean}
         */
        isOnFullscreen() {
            return !!this.isFullscreen;
        },

        /**
         * Check if mac os
         *
         * @return {boolean}
         */
        isMac() {
            return import.meta.platform === 'darwin';
        },

        /**
         * Check if windows os
         *
         * @return {boolean}
         */
        isWindows() {
            return import.meta.platform === 'win32';
        },

        /**
         * Is mac and on fullscreen
         *
         * @return {boolean}
         */
        isMacOnFullscreen() {
            return !!(this.isMac && this.isOnFullscreen);
        }
    },

    methods: {

        /**
         * Set fullscreen state
         *
         * @return void
         */
        setFullscreenState() {
           // this.isFullscreen = require('@electron/remote').getCurrentWindow().isFullScreen();
        }

    },

    created() {

        // Check if window is fullscreen
        this.setFullscreenState();

        // Set fullscreen events
       // require('@electron/remote').getCurrentWindow().on('enter-full-screen', this.setFullscreenState);
        //require('@electron/remote').getCurrentWindow().on('leave-full-screen', this.setFullscreenState);
       // require('@electron/remote').getCurrentWindow().on('enter-html-full-screen', this.setFullscreenState);
       // require('@electron/remote').getCurrentWindow().on('leave-html-full-screen', this.setFullscreenState);
    },

    beforeDestroy() {

        // Remove fullscreen events
       // require('@electron/remote').getCurrentWindow().off('enter-full-screen', this.setFullscreenState);
       // require('@electron/remote').getCurrentWindow().off('leave-full-screen', this.setFullscreenState);
       // require('@electron/remote').getCurrentWindow().off('enter-html-full-screen', this.setFullscreenState);
       // require('@electron/remote').getCurrentWindow().off('leave-html-full-screen', this.setFullscreenState);
    }
}
