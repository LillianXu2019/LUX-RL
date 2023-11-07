jsPsych.plugins["star-rating"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "star-rating",
        parameters: {
            rows: {
                type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
                default: 1
            },
            columns: {
                type: jsPsych.plugins.parameterType.INT,
                default: 5
            },
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                default: ''
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                default: 'Continue'
            },
            response_required: {
                type: jsPsych.plugins.parameterType.BOOL,
                default: true
            }
        }
    }

    plugin.trial = function(display_element, trial) {

        function starString(numberOfStars) {
            let htmlstring = ''
            for (let i = 1; i <= numberOfStars; i++) {
                htmlstring += '<div data-item=' + i + ' class="star rating-star">&#9733;</div>'
            }
            for (let i = parseInt(numberOfStars) + 1; i <= 15; i++) {
                htmlstring += '<div data-item=' + i + ' class="star rating-star">&#9734;</div>'
            }
            return htmlstring
        }

        var html_content = trial.stimulus;
        html_content += '<br/><div id="starcontainer" style="cursor:pointer;"></div><br/>';
        html_content += '<button id="jspsych-star-rating-next" class="jspsych-btn">'+trial.button_label+'</button>';

        display_element.innerHTML = html_content;
        display_element.querySelector('#starcontainer').innerHTML = starString(0);

        if (trial.response_required) {
            display_element.querySelector('#jspsych-star-rating-next').disabled = true;
        }

        var response = {
            response: null
        }

        display_element.addEventListener('click', function(e){
            let target = e.target;
            if (target.classList.contains('rating-star')) {
                response.response = target.dataset.item;
                // refresh star display
                display_element.querySelector('#starcontainer').innerHTML = starString(response.response);
                if (trial.response_required) {
                    display_element.querySelector('#jspsych-star-rating-next').disabled = false;
                }
            }
        });

        display_element.querySelector('#jspsych-star-rating-next').addEventListener('click', function() {
            // measure response time
            var endTime = performance.now();
            response.rt = endTime - startTime;
            end_trial();
        });

        function end_trial(){
            jsPsych.pluginAPI.clearAllTimeouts();
            // save data
            var trial_data = {
                response: response.response
            };
            display_element.innerHTML = '';
            // next trial
            jsPsych.finishTrial(trial_data);
        }
        var startTime = performance.now();
    };

    return plugin;
})();
