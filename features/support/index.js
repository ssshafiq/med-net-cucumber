/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


 composerSteps = require('composer-cucumber-steps');
 reporter = require('cucumber-html-reporter');
 cucumber = require('cucumber');
 options = {
    theme: 'bootstrap',
    jsonFile: 'test/report/cucumber_report.json',
    output: 'test/report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        'App Version': '0.3.2',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome  54.0.2840.98',
        'Platform': 'Windows 10',
        'Parallel': 'Scenarios',
        'Executed': 'Remote',
    },
};
module.exports = function() {
    composerSteps.call(this);
};
if (cucumber.defineSupportCode) {
    cucumber.defineSupportCode((context) => {
        module.exports.call(context);
    });
}

