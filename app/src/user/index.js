import { createApp } from "vue";

import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./js/routes.js";

import App from "./js/app.js";

(function (app, c) {
    let initialized = false;

    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
     *
     * @param {object} data
     * @returns {Object}
     */
    function deepFreeze (data)
    {
        // Retrieve the property names defined on object
        const propNames = Object.getOwnPropertyNames(data);

        // Freeze properties before freezing self
        for (let i=0, il=propNames.length; i<il; i++) {
            let value = data[propNames[i]];

            data[propNames[i]] = value && typeof value === "object" ? deepFreeze(value) : value;
        }

        return Object.freeze(data);
    }

    app.init = config =>
    {
        function finalizeInitialization (config)
        {
            // Freeze & expose the application config
            app.config = config;

            deepFreeze(app);

            const router = createRouter({
                history: createWebHistory(),
                routes
            })

            c.app.use(router);
            c.app.mount('#app');
        }

        if (initialized === false) {
            initialized = true;

            finalizeInitialization(config);
        } else {
            console.error("The application can only be initialized once.");
        }
    };

    // Create the app instance
    c.app = createApp(App);

    app.$__ = c.app.config.globalProperties.$__ = (label, data) =>
    {
        let text =
            app.config !== void 0
            app.config.translations !== void 0 &&
            app.config.translations[label] !== void 0
                ? app.config.translations[label]
                : label;

        if (text !== label && "undefined" !== typeof data && Object.keys(data).length > 0) {
            for (const key in data) {
                text = text.replace(new RegExp(`\{${key}\}`, 'g'), data[key]);
            }
        }

        return text;
    };
})(window.app = {}, {});

app.init({});