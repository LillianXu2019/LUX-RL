	/// LUX_main.js
	
	// define the site that hosts stimuli images
	// usually https://<your-github-username>.github.io/<your-experiment-name>/
	var repo_site = "https://LillianXu2019.github.io/LUX-RL/";

	let timeline = [];

	// enter full screen
	        var welcome = {
	            type: "fullscreen",
	            message: "Now you are entering the full screen mode.<br>",
	            button_label: "Click here to proceed.",
	            delay_after: 500
	        }
	        
	        timeline.push(welcome);
	        
	        let inst = {
	        type: 'instructions',
	        pages: [
	            'Welcome to this game! Please click next or press the right arrow key to begin.',
	            '<img src= ' + repo_site + "images/instructions/Slide2.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide3.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide4.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide5.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide6.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide7.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide8.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide9.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide10.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide11.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide12.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide13.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide14.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide15.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide16.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide17.png"></img>',
	            '<img src= ' + repo_site + "images/instructions/Slide18.png"></img>'],
	            show_clickable_nav: true
	        };
	        
	        timeline.push(inst);

	        let display_boxes = function (val1, val2, opt1Left, reward_total, selected, feedback) {
	            let valLeft;
	            let valRight;
	            let classLeft;
	            let classRight;
	            if(opt1Left === "1"){
	                valLeft = val1;
	                valRight = val2;
	                classLeft = 'box1';
	                classRight = 'box2';
	            } else {
	                valLeft = val2;
	                valRight = val1;
	                classLeft = 'box2';
	                classRight = 'box1';
	            }

	            let string_parts = []
	            string_parts.push('<div class="container"><div class="' + classLeft + ' box');
	            if (selected === 'left') string_parts.push(' selected ');
	            if (feedback === 'left') string_parts.push(' highlight ');
	            string_parts.push('">' + valLeft + '</div><div class="' + classRight + ' box');
	            if (selected === 'right') string_parts.push(' selected ');
	            if (feedback === 'right') string_parts.push(' highlight ');
	            string_parts.push('">' + valRight + '</div></div>');
	            string_parts.push('<div class="reward_points">' + reward_total + '</div>');
	            string_parts.push('<div class="reward_bar_border"><div class="reward_bar" style="width:');
	            string_parts.push(reward_total / possible_total * 100);
	            string_parts.push('%;"></div></div>');
	            return string_parts.join('')
	        }

	        /* a trial consists of three steps:
	            1. display boxes with values (ends with keypress)
	            2. display boxes with chosen option indicated (gray border) for 1 s
	            3. display boxes with correct side highlighted for 1 s
	        */

	        let step1;
	        if(timeout_mode === 'once') {
	            // timeout once, then wait for response indefinitely
	            step1 = {
	                timeline: [
	                    {
	                        type: 'html-keyboard-response',
	                        stimulus: function() {
	                            let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                            let val1 = jsPsych.timelineVariable('magOpt1', true);
	                            let val2 = jsPsych.timelineVariable('magOpt2', true);
	                            let reward_total = jsPsych.data.get().select('reward').sum();
	                            return display_boxes(val1, val2, opt1Left, reward_total);
	                        },
	                        choices: [37, 39],
	                        on_finish: function (data) {
	                            let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
	                            let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                            let val1 = jsPsych.timelineVariable('magOpt1', true);
	                            let val2 = jsPsych.timelineVariable('magOpt2', true);
	                            if((opt1Rewarded === '1') !== (opt1Left === '1')) {
	                                // right response should be rewarded
	                                data.rewarded_side = 'right';
	                                data.correct = data.key_press === 39;
	                            } else {
	                                // left response should be rewarded
	                                data.rewarded_side = 'left';
	                                data.correct = data.key_press === 37;
	                            }

	                            // Store the reward
	                            if(data.correct) {
	                                if((data.rewarded_side === 'left') === (opt1Left === '1')) {
	                                    data.reward = parseInt(val1);
	                                } else {
	                                    data.reward = parseInt(val2);
	                                }
	                            } else {
	                                data.reward = 0;
	                            }

	                            if (data.key_press === 37) {
	                                data.selected_side = 'left';
	                            } else {
	                                data.selected_side = 'right';
	                            }
	                        },
	                        trial_duration: response_duration
	                    },
	                    {
	                        timeline: [
	                            // display warning icon and apply penalty to points
	                            {
	                                type: 'html-keyboard-response',
	                                stimulus: '<img class="timeout-image" alt="warning icon" src=' + repo_site + "images/timeout2.jpg">',
	                                choices: jsPsych.NO_KEYS,
	                                trial_duration: warning_duration,
	                                on_finish: function(data) {
	                                    data.reward = timeout_penalty;
	                                }
	                            },

	                            // standard response, but with no timeout
	                            {
	                                type: 'html-keyboard-response',
	                                stimulus: function() {
	                                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                                    let reward_total = jsPsych.data.get().select('reward').sum();
	                                    return display_boxes(val1, val2, opt1Left, reward_total);
	                                },
	                                choices: [37, 39],
	                                on_finish: function (data) {
	                                    let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
	                                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                                    if((opt1Rewarded === '1') !== (opt1Left === '1')) {
	                                        // right response should be rewarded
	                                        data.rewarded_side = 'right';
	                                        data.correct = data.key_press === 39;
	                                    } else {
	                                        // left response should be rewarded
	                                        data.rewarded_side = 'left';
	                                        data.correct = data.key_press === 37;
	                                    }

	                                    // Store the reward
	                                    if(data.correct) {
	                                        if((data.rewarded_side === 'left') === (opt1Left === '1')) {
	                                            data.reward = parseInt(val1);
	                                        } else {
	                                            data.reward = parseInt(val2);
	                                        }
	                                    } else {
	                                        data.reward = 0;
	                                    }

	                                    if (data.key_press === 37) {
	                                        data.selected_side = 'left';
	                                    } else {
	                                        data.selected_side = 'right';
	                                    }
	                                }
	                            },
	                        ],
	                        conditional_function: function() {
	                            // only display feedback if there was no response in the previous trial
	                            return !jsPsych.data.get().last(1).values()[0].key_press
	                        }
	                    }
	                ]
	            }

	        } else if(timeout_mode === 'infinite') {
	            // timeout with looping (timeout is repeatedly applied if no response)
	            step1 = {
	                timeline: [
	                    {
	                        type: 'html-keyboard-response',
	                        stimulus: function() {
	                            let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                            let val1 = jsPsych.timelineVariable('magOpt1', true);
	                            let val2 = jsPsych.timelineVariable('magOpt2', true);
	                            let reward_total = jsPsych.data.get().select('reward').sum();
	                            return display_boxes(val1, val2, opt1Left, reward_total);
	                        },
	                        choices: [37, 39],
	                        on_finish: function (data) {
	                            let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
	                            let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                            let val1 = jsPsych.timelineVariable('magOpt1', true);
	                            let val2 = jsPsych.timelineVariable('magOpt2', true);
	                            if((opt1Rewarded === '1') !== (opt1Left === '1')) {
	                                // right response should be rewarded
	                                data.rewarded_side = 'right';
	                                data.correct = data.key_press === 39;
	                            } else {
	                                // left response should be rewarded
	                                data.rewarded_side = 'left';
	                                data.correct = data.key_press === 37;
	                            }

	                            // Store the reward
	                            if(data.correct) {
	                                if((data.rewarded_side === 'left') === (opt1Left === '1')) {
	                                    data.reward = parseInt(val1);
	                                } else {
	                                    data.reward = parseInt(val2);
	                                }
	                            } else {
	                                data.reward = 0;
	                            }

	                            if (data.key_press === 37) {
	                                data.selected_side = 'left';
	                            } else {
	                                data.selected_side = 'right';
	                            }
	                        },
	                        trial_duration: response_duration
	                    },
	                    {
	                        timeline: [
	                            {
	                                type: 'html-keyboard-response',
	                                stimulus: '<img class="timeout-image" alt="warning icon" src=' + repo_site + "images/timeout2.jpg">',
	                                choices: jsPsych.NO_KEYS,
	                                trial_duration: warning_duration,
	                                on_finish: function(data) {
	                                    data.reward = timeout_penalty;
	                                }
	                            }
	                        ],
	                        conditional_function: function() {
	                            // only display feedback if there was no response in the previous trial
	                            return !jsPsych.data.get().last(1).values()[0].key_press
	                        }
	                    }
	                ],
	                loop_function: function(data) {
	                    // loop if there was no key press
	                    return !data.values()[0].key_press;
	                }
	            }
	        } else {
	            // no timeout mode or looping
	            step1 =             {
	                type: 'html-keyboard-response',
	                stimulus: function() {
	                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                    let reward_total = jsPsych.data.get().select('reward').sum();
	                    return display_boxes(val1, val2, opt1Left, reward_total);
	                },
	                choices: [37, 39],
	                on_finish: function (data) {
	                    let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
	                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                    if((opt1Rewarded === '1') !== (opt1Left === '1')) {
	                        // right response should be rewarded
	                        data.rewarded_side = 'right';
	                        data.correct = data.key_press === 39;
	                    } else {
	                        // left response should be rewarded
	                        data.rewarded_side = 'left';
	                        data.correct = data.key_press === 37;
	                    }

	                    // Store the reward
	                    if(data.correct) {
	                        if((data.rewarded_side === 'left') === (opt1Left === '1')) {
	                            data.reward = parseInt(val1);
	                        } else {
	                            data.reward = parseInt(val2);
	                        }
	                    } else {
	                        data.reward = 0;
	                    }

	                    if (data.key_press === 37) {
	                        data.selected_side = 'left';
	                    } else {
	                        data.selected_side = 'right';
	                    }
	                }
	            }

	        }


	        var trial = [
	            // show prompt and collect response.  Handle timeout appropriately, depending on settings.
	            step1,

	            // display response without indicating which side is rewarded
	            {
	                type: 'html-keyboard-response',
	                stimulus: function () {
	                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                    let d = jsPsych.data.get().last(1).values()[0];

	                    // don't include the most recent reward yet
	                    let reward_total = jsPsych.data.get().select('reward').sum();
	                    let current_reward = jsPsych.data.get().last(1).values()[0].reward;
	                    return display_boxes(val1, val2, opt1Left, reward_total - current_reward, d.selected_side);
	                },
	                choices: jsPsych.NO_KEYS,
	                trial_duration: display_choice_duration
	            },

	            // display response and rewarded side, along with updated points total
	            {
	                type: 'html-keyboard-response',
	                stimulus: function () {
	                    let opt1Left = jsPsych.timelineVariable('opt1Left', true);
	                    let val1 = jsPsych.timelineVariable('magOpt1', true);
	                    let val2 = jsPsych.timelineVariable('magOpt2', true);
	                    let d = jsPsych.data.get().last(2).values()[0];
	                    let reward_total = jsPsych.data.get().select('reward').sum();
	                    return display_boxes(val1, val2, opt1Left, reward_total, d.selected_side, d.rewarded_side)
	                },
	                choices: jsPsych.NO_KEYS,
	                trial_duration: feedback_duration
	            },
	        ]

	        // Manipulation check
	        var manipulation_check_procedure = {
	            timeline: [
	                {
	                    type: 'survey-multi-choice',
	                    questions: [
	                        {
	                            prompt: "Which box earns you more points?",
	                            name: 'BetterBox',
	                            options: ["blue", "green", "I don't know"],
	                            required: true,
	                            data: {task: 'check_response'}
	                        }
	                    ]
	                },
	                {
	                    type: 'survey-multi-choice',
	                    questions: [
	                        {
	                            prompt: "Last time you said the [blank] box earns you more points. Did it switch?",
	                            name: 'BetterBoxSwitched',
	                            options: ["Yes", "No", "I don't know"],
	                            required: true
	                        }
	                    ]
	                },
	                {
	                    type: 'html-slider-response',
	                    stimulus: "<p>Based on what you see, what number will you get from the box that earns you point?</p>",
	                    labels: ['0', '30'],
	                    min: 0,
	                    max: 30,
	                    slider_start: 0,
	                    step: 1,
	                    require_movement: true,
	                    prompt: '<p>Move the slider to select a value</p>',
	                    slider_number: true,
	                },
	                {
	                    type: 'survey-multi-choice',
	                    questions: [
	                        {
	                            prompt: "How sure are you that your guess is around the actual number?",
	                            name: 'Confidence',
	                            options: ['I have no idea at all', 'Somewhat confident', 'Moderately confident', 'Mostly confident'],
	                            required: true
	                        }
	                    ]
	                },
	            ]
	        }


	        // 210 trials split into blocks of 20 or 15 with manipulation checks after each block.
	        var blocks = [0, 15, 35, 55, 70, 90, 105, 125, 140, 155, 175, 190, 210];

	        for (let i=1; i < blocks.length; i++){
	            timeline.push({
	                timeline: trial,
	                timeline_variables: box_vals.slice(blocks[i-1], blocks[i])
	            });
	            timeline.push(manipulation_check_procedure);

	            if(blocks[i] % 70 === 0){
	                // display motivational slide
	            }
	        }


