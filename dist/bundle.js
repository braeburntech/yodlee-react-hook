import { useState, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var useYodlee = function (_a) {
    var containerId = _a.containerId, _b = _a.createScriptTag, createScriptTag = _b === void 0 ? true : _b, _c = _a.fastLinkOptions, fastLinkURL = _c.fastLinkURL, token = _c.token, _d = _c.userExperienceFlow, userExperienceFlow = _d === void 0 ? 'Verification' : _d, onSuccess = _a.onSuccess, onError = _a.onError, onExit = _a.onExit, onEvent = _a.onEvent;
    var _e = useState(false), ready = _e[0], setReady = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState(null), data = _g[0], setData = _g[1];
    var _h = useState(false), active = _h[0], setActive = _h[1];
    useEffect(function () {
        var script;
        if (createScriptTag) {
            script = document.createElement('script');
            script.id = 'yodlee-fastlink-script';
            script.src = 'https://cdn.yodlee.com/fastlink/v3/initialize.js';
            script.async = true;
            script.defer = true;
            script.onload = function () { return setReady(true); };
            script.onerror = function () { return setError('Yodlee FastLink library could not be loaded!'); };
            document.body.appendChild(script);
        }
        return function () {
            var _a;
            (_a = window.fastlink) === null || _a === void 0 ? void 0 : _a.close();
            if (createScriptTag) {
                document.body.removeChild(script);
            }
        };
    }, []);
    var init = function (currentToken) {
        var _a;
        var getTokenString = function (t) {
            switch (t.tokenType) {
                case 'AccessToken': {
                    return { accessToken: "Bearer " + t.tokenValue };
                }
                case 'JwtToken': {
                    return { jwtToken: "Bearer " + t.tokenValue };
                }
            }
        };
        setActive(true);
        (_a = window.fastlink) === null || _a === void 0 ? void 0 : _a.open(__assign(__assign({ fastLinkURL: fastLinkURL, params: { userExperienceFlow: userExperienceFlow } }, getTokenString(currentToken || token)), { onSuccess: function (customerData) {
                setData(customerData);
                onSuccess && onSuccess(customerData);
            }, onError: function (fastLinkError) {
                setError(fastLinkError);
                onError && onError(fastLinkError);
            }, onExit: onExit,
            onEvent: onEvent }), containerId);
    };
    return {
        init: init,
        data: data,
        error: error,
        ready: ready,
        active: active
    };
};

export { useYodlee };
