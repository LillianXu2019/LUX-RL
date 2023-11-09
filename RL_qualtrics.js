Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 2: Defining and load required resources */
    var task_github = "https://LillianXu2019.github.io/LUX-RL/"; // https://<your-github-username>.github.io/<your-experiment-name>

    // requiredResources must include all the JS files that the task uses.
    var requiredResources = [
        "https://d3js.org/d3.v6.min.js",
        task_github + "lib/vendors/jspsych-6.1.0/jspsych.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-html-button-response.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-fullscreen.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-instructions.js",
        task_github + "lib/vendors/jspsych-6.1.0/plugins/jspsych-survey-multi-choice.js",
        task_github + "jspsych-html-slider-response-with-number.js",
        task_github + "jspsych-star-rating.js",
        task_github + "LUX_main.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 3: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');


    var task_name = "reward-learning";
    var save_url = "https://experiment.childemotion.waisman.wisc.edu/save_data.php";
    var subject_id = "${e://Field/participantID}";
    var data_dir = task_name;
    var file_name = task_name + '_' + subject_id;



    function save_data_json() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.json', // the file type should be added
                exp_data: jsPsych.data.get().json()
            }
        });
    }

    function save_data_csv() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.csv', // the file type should be added
                exp_data: jsPsych.data.get().csv()
            }
        });
    }

    /* Change 4: Wrapping jsPsych.init() in a function */
    function initExp() {

        //debugger;
        generate_schedules();
        build_and_run_experiment();

        jsPsych.init({
            timeline: timeline,
            preload_images: preload_images,
            display_element: 'display_stage',
            on_finish: function (data) {

                jsPsych.data.get().addToLast({participant: subject_id});
                save_data_csv();


                /* Change 5: Summarizing and save the results to Qualtrics */
                // summarize the results
                /*
                               var trials = jsPsych.data.get().filter({
                                   test_part: 'test'
                               });

                               var correct_trials = trials.filter({
                                  correct: true
                               });
                               var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
                               var rt = Math.round(correct_trials.select('rt').mean());

                               // save to qualtrics embedded data
                               Qualtrics.SurveyEngine.setEmbeddedData("accuracy", accuracy);
                               Qualtrics.SurveyEngine.setEmbeddedData("rt", rt);
               */
                /* Change 6: Adding the clean up and continue functions.*/
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});