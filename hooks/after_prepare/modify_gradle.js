// modify_gradle.js
const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    const platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    const buildGradlePath = path.join(platformRoot, 'app/build.gradle');

    if (fs.existsSync(buildGradlePath)) {
        try {
            let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

            if (!buildGradle.includes("aidl true")) {
                // Insert buildFeatures.aidl=true in build.gradle
                buildGradle = buildGradle.replace(/android\s*{/, `android {\n    buildFeatures {\n        aidl true\n    }`);
                fs.writeFileSync(buildGradlePath, buildGradle, 'utf8');
                console.log('Updated build.gradle with AIDL support.');
            }
        } catch (err) {
            console.error('Failed to modify build.gradle', err);
        }
    }
};
