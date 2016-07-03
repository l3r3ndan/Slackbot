/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */
var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }

});


//one word replies

 controller.hears('hello','direct_message,direct_mention', function(whichBot, message) {
  whichBot.reply(message, 'Hi my name is Luigi');

});

 controller.hears('lunch','direct_message,direct_mention',function(whichbot,message) {  
    whichbot.reply(message,"WOOO~ Let's eat!!");
});

 controller.hears('owner','direct_message,direct_mention',function(whichbot,message) {  
    whichbot.reply(message,'Brendan');
});


 //Order Pizza Conversation

 controller.hears(['pizzatime'], 'direct_message,direct_mention', function(whichbot,message) {
    askFlavor = function(response, convo) {
      convo.ask('What flavor of pizza do you want?', function(response, convo) {
        convo.say('Awesome.');
        askSize(response, convo);
        convo.next();
      });
    }
    askSize = function(response, convo) {
      convo.ask('What size do you want?', function(response, convo) {
        convo.say('Ok.')
        askWhereDeliver(response, convo);
        convo.next();
      });
    }
    askWhereDeliver = function(response, convo) {
      convo.ask('So where do you want it delivered?', function(response, convo) {
        convo.say('Ok! Good bye.');
        convo.next();
      });
    }

    whichbot.startConversation(message, askFlavor);
});


// Create a conversation that allows for input that then determines luigi's repsonse.

controller.hears(['question me'], 'direct_message,direct_mention', function(whichbot,message) {

  // start a conversation to handle this response.
  whichbot.startConversation(message,function(err,convo) {

    convo.ask('Shall we proceed Say YES, NO or DONE to quit.',[
      {
        pattern: 'done',
        callback: function(response,convo) {
          convo.say('OK you are done!');
          convo.next();
        }
      },
      {
        pattern: whichbot.utterances.yes,
        callback: function(response,convo) {
          convo.say('Great! I will continue...');
          // do something else...
          convo.next();

        }
      },
      {
        pattern: whichbot.utterances.no,
        callback: function(response,convo) {
          convo.say('Perhaps later.');
          // do something else...
          convo.next();
        }
      },
      {
        default: true,
        callback: function(response,convo) {
          // just repeat the question
          convo.repeat();
          convo.next();
        }
      }
    ]);

  })

});

controller.hears('camel','direct_message,direct_mention',function(whichbot,message) {

    // do something...

    // then respond with a message object
    //
    whichbot.reply(message,{
      text: "Hi I'm Camelman yyeeaahh",
      username: "CamelMan",
      icon_emoji: ":camel:",
    });

})



