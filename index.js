'use strict';

//Variables containing fruit info//////

var strawberryInfo = "The strawberry, scientifically known as Fragaria ananassa, originated in Europe in the 18th century. It is a hybrid of two wild strawberry species from North America and Chile.";
var strawberryPicURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/220px-PerfectStrawberry.jpg";

var bananaInfo = "The banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains, in contrast to dessert bananas.";
var bananaPicURL = "https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg";

var appleInfo = "More than 2,500 varieties of apples are grown in the United States, but only the crabapple is native to North America.";
var applePicURL = "https://pbs.twimg.com/profile_images/3334844732/98a2bda0db2b888bc126c9afe60ad43a_400x400.jpeg";

var fruitInfo = { //Array of fruit info
    "strawberriesDesc": strawberryInfo,
    "strawberriesPic": strawberryPicURL,
    "bananasDesc": bananaInfo,
    "bananasPic": bananaPicURL,
    "applesDesc": appleInfo,
    "applesPic": applePicURL,
};

const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', "Welcome to the Fruit Platter skill for the Echo Show. Name a fruit and I'll tell you more.");
    },
    'AnswerIntent': function() {
        if (this.event.request.intent.slots.fruitName.value &&
            (this.event.request.intent.slots.fruitName.value == "apples" ||
                this.event.request.intent.slots.fruitName.value == "bananas" ||
                this.event.request.intent.slots.fruitName.value == "strawberries")) //Only a few types of fruit are supported in v1 ;)
        {
            var fruit = this.event.request.intent.slots.fruitName.value;
            
            if (supportsDisplay.call(this) || isSimulator.call(this)) { //If on echo show or any device with a screen
                exampleBodyTemplate.call(this, null, "testToken", "BodyTemplate2", "Info about the " + fruit, "PlainText",
                    fruitInfo[fruit + "Desc"], "Picture of fruit", fruitInfo[fruit + "Pic"],
                    "VISIBLE", "<speak>" + fruitInfo[fruit + "Desc"] + " If you'd like to hear about another fruit, please say it." + "</speak>", null, false);
            } 
            else //If on a normal echo, dot, whatever
                this.emit(':ask', fruitInfo[fruit + "Desc"] + " If you'd like to hear about another fruit for the normal echo, please say it.");
        } else
            this.emit(':ask', "Sorry. I'm not quite sure I know that one. Please name a fruit!");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Thanks for using the Fruit Platter skill. Goodbye!");
    },
};

//Handler////////////////////////

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//Helper Functions////////////////////

function supportsDisplay() {
    var hasDisplay =
        this.event.context &&
        this.event.context.System &&
        this.event.context.System.device &&
        this.event.context.System.device.supportedInterfaces &&
        this.event.context.System.device.supportedInterfaces.Display

    return hasDisplay;
}

function isSimulator() {
    var isSimulator = !this.event.context; //simulator doesn't send context
    return isSimulator;
}

function exampleBodyTemplate(pSessionAttributes, pToken, pBodyTemplate, pTitle, pPrimaryTextType,
    pPrimaryTextContent, pImageDesc, pImageURL, pBackButton, pOutputSpeech, pOutputReprompt, pShouldEndSession) {
    var response = {
        "version": "1.0",
        "response": {
            "directives": [{
                    "type": "Hint",
                    "hint": {
                        "type": "PlainText",
                        "text": "tell me about bananas"
                    }
                },
                {
                    "type": "Display.RenderTemplate",
                    "token": pToken,
                    "template": {
                        "type": pBodyTemplate,
                        "title": pTitle,
                        "textContent": {
                            "primaryText": {
                                "type": pPrimaryTextType,
                                "text": pPrimaryTextContent
                            },
                        },
                        "image": {
                            "contentDescription": pImageDesc,
                            "sources": [{
                                "url": pImageURL
                            }]
                        },
                        "backButton": pBackButton
                    }

                }
            ],
            "outputSpeech": {
                "type": "SSML",
                "ssml": pOutputSpeech
            },
            "reprompt": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": pOutputReprompt
                }
            },
            "shouldEndSession": pShouldEndSession,
        },
        "sessionAttributes": pSessionAttributes
    }
    this.context.succeed(response);
}
